from crypt import methods
from flask import Flask, request
from db import SQLDatabase
import account_functions
import friend_functions
import message_functions
import key_functions
import group_message_functions
import post_functions
import threading 

app = Flask(__name__)
t = threading.local()

# ----------------------------------------------------------------------------
# Setup Database
db = SQLDatabase("file:info2222?cache=shared")
db.database_setup()
account_functions.register(db, "jack", "jack")
account_functions.register(db, 'a', 'a')
friend_functions.send_friend_request(db, 'jack', 'a')
friend_functions.accept_friend_request(db, 'a', 'jack', 'accept')
account_functions.register(db, 'b', 'b')
friend_functions.send_friend_request(db, 'jack', 'b')
friend_functions.accept_friend_request(db, 'b', 'jack', 'accept')

# message_functions.send_message(db, 'a', 'jack', 'Hey jack its a')
# message_functions.get_messages(db, 'jack')
account_functions.register(db, 'c', 'c')

del db

# key_functions.set_keys(db, "a", "pubkey1", 'verifykey1')
# key_functions.set_keys(db, "b", "pubkey2", 'verifykey2')

# key_functions.get_friends_keys(db, "jack")
# print(friend_functions.get_friend_list(db, 'jack'))


@app.before_request
def load_db():
    if getattr(t, 'db', None) is None:
        t.db = SQLDatabase("file:info2222?cache=shared")



# ----------------------------------------------------------------------------
# Login Functions
@app.route("/api/login", methods=["POST"])
def login():
    data = request.get_json()
    username = data['username']
    password = data['password']

    return account_functions.login(t.db, username, password)

@app.route("/api/register", methods=["POST"])
def register():
    data = request.get_json()
    username = data['username']
    password = data['password']
    
    return account_functions.register(t.db, username, password)

# @app.route("/api/get_username_from_session", methods=["GET"])
# def get_username_from_session():
#     session_key = request.cookies.get("session_key")
#     username = account_functions.get_username_from_session(t.db, session_key)



# ----------------------------------------------------------------------------
# Post functions

@app.route("/api/get_post_tags", methods=["GET"])
def get_post_tags():
    return post_functions.get_tags(t.db)

    """
    Returns list of JSON
    'tags': [{
        tagID: 112
        tag: "assignment2"
    }]
    """

@app.route("/api/create_post", methods=["POST"])
def create_post():
    """
    Expected JSON:
    {
        title: "Question about assignment 1"
        body: "How do i submit?",
        tags: ['assignment1', 'urgent']
    }
    """
    session_key = request.cookies.get("session_key")
    author = account_functions.get_username_from_session(t.db, session_key)
    title = request.get_json()['title']
    body = request.get_json()['body']
    tags = request.get_json()['tags']
    return post_functions.create_post(t.db, title, author, body, tags)

    

@app.route("/api/get_all_posts", methods=["GET"])
def get_post_list():
    """
    Expected JSON:
    {
        sort_order: 'latest'    // Could also be 'earliest' or 'relevant' or 'upvotes
        tags: []    // Empty for no tags filter
    }
    """
    sort_order = request.get_json()['sort_order']
    tags = request.get_json()['tags']
    return post_functions.get_post_list(t.db, sort_order, tags)
    """
    Returns list of JSON in response
    'posts' : [{
        postID: 112
        title: "Assignemtn 2 help!!!"
    }]
    """

@app.route("/api/get_post", methods=["GET"])
def get_post():
    """
    Expected JSON:
    {
        postID: 223, // Post to retrieve
    }
    """
    postID = request.get_json()['postID']
    return post_functions.get_post(t.db, postID)
    """
    Returns  JSON obj in response
    'post' : {
        postID: 112
        title: "Assignemtn 2 help!!!"
        body: "<post body here>"
        author: "john"
        createdOn: "2022-05-06 09:56:12"
        upvotes: 20
        comments: [
            {
                commentID: 23
                parentCommentID: null
                author: 'jack'
                body: '<comment body>'
                createdOn: "2022-05-06 09:56:12"
            },
            // ... more comments here
        ]
    }
    """

@app.route("/api/upvote", methods=["POST"])
def upvote():
    """
    Expected JSON:
    {
        postID: 223,
    }
    """
    postID = request.get_json()['postID']
    return post_functions.upvote(t.db, postID)

@app.route("/api/downvote", methods=["POST"])
def downvote():
    """
    Expected JSON:
    {
        postID: 223,
    }
    """
    postID = request.get_json()['postID']
    return post_functions.downvote(t.db, postID)

@app.route("/api/create_comment", methods=["POST"])
def create_comment():
    """
    Expected JSON:
    {
        postID: 223,    // Post ID that this comment belongs in
        body: "Here;s rhw answer to your question...",
        parentCommentID: null   // null if replying to post, otherwise parent comment
    }
    """
    session_key = request.cookies.get("session_key")
    author = account_functions.get_username_from_session(t.db, session_key)
    body = request.get_json()['body']
    postID = request.get_json()['postID']
    parentCommentID = request.get_json()['parentCommentID']
    return post_functions.create_comment(t.db, author, body, postID, parentCommentID)


# ----------------------------------------------------------------------------
# Group message functions

@app.route("/api/send_group_message", methods=["POST"])
def send_group_message():
    """
    Expected json:
    {
        group: info2222,
        message: "This is a test message
    }
    """
    session_key = request.cookies.get("session_key")
    sender = account_functions.get_username_from_session(t.db, session_key)
    group = request.get_json()['group']
    message = request.get_json()['message']

    return group_message_functions.send_message(t.db, group, sender, message)


@app.route("/api/get_group_messages", methods=["GET"])
def get_group_messages():
    """
    Expected json:
    {
        group: info2222,
        page: 1
    }
    """
    session_key = request.cookies.get("session_key")
    user = account_functions.get_username_from_session(t.db, session_key)
    group = request.get_json()['group']
    try:
        page = int(request.get_json()['page'])
    except:
        page = 1

    return group_message_functions.get_messages(t.db, user, group, page_no=page)




# ----------------------------------------------------------------------------
# Message Functions
@app.route("/api/send_message", methods=["POST"])
def send_message():
    session_key = request.cookies.get("session_key")
    sender = account_functions.get_username_from_session(t.db, session_key)
    recipient = request.get_json()['recipient']
    message = request.get_json()['message']
    signature = request.get_json()['signature']
    verifyKey = request.get_json()['verify_key']

    return message_functions.send_message(t.db, sender, recipient, message, signature, verifyKey)


@app.route("/api/get_messages", methods=["GET"])
def get_messages():
    session_key = request.cookies.get("session_key")
    username = account_functions.get_username_from_session(t.db, session_key)

    return message_functions.get_messages(t.db, username)


# ----------------------------------------------------------------------------
# Friend Functions
@app.route("/api/get_friend_list", methods=["GET"])
def get_friend_list():
    session_key = request.cookies.get("session_key")
    username = account_functions.get_username_from_session(t.db, session_key)

    return friend_functions.get_friend_list(t.db, username)

@app.route("/api/send_friend_request", methods=["POST"])
def send_friend_request():
    session_key = request.cookies.get("session_key")
    username = account_functions.get_username_from_session(t.db, session_key)
    othername = request.get_json()['recipient']

    return friend_functions.send_friend_request(t.db, username, othername)

@app.route("/api/accept_friend_request", methods=["POST"])
def accept_friend_requests():
    session_key = request.cookies.get("session_key")
    username = account_functions.get_username_from_session(t.db, session_key)
    othername = request.get_json()['recipient']
    action = request.get_json()['action']

    return friend_functions.accept_friend_requests(t.db, username, othername, action)

@app.route("/api/check_for_friend_requests", methods=["GET"])
def check_for_friend_request():
    session_key = request.cookies.get("session_key")
    username = account_functions.get_username_from_session(t.db, session_key)

    return friend_functions.check_for_friend_requests(t.db, username)

# Key Functions
@app.route("/api/get_friends_keys", methods=["GET"])
def get_friends_keys():
    session_key = request.cookies.get("session_key")
    username = account_functions.get_username_from_session(t.db, session_key)

    return key_functions.get_friends_keys(t.db, username)

@app.route("/api/set_keys", methods=["POST"])
def set_keys():
    session_key = request.cookies.get("session_key")
    username = account_functions.get_username_from_session(t.db, session_key)
    publicKey = request.get_json()['public_key']
    verifyKey = request.get_json()['verify_key']

    return key_functions.set_keys(t.db, username, publicKey, verifyKey)

if __name__ == '__main__':
    # import sys
    # for p in sys.path:
    #     print(p)
    app.run(host="localhost", port=8080)
