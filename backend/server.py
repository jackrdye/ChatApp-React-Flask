from crypt import methods
from flask import Flask, request
from db import SQLDatabase
import account_functions
import friend_functions
import message_functions
import key_functions


app = Flask(__name__)

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

# key_functions.set_keys(db, "a", "pubkey1", 'verifykey1')
# key_functions.set_keys(db, "b", "pubkey2", 'verifykey2')

# key_functions.get_friends_keys(db, "jack")
# print(friend_functions.get_friend_list(db, 'jack'))


# ----------------------------------------------------------------------------
# Login Functions
@app.route("/api/login", methods=["POST"])
def login():
    data = request.get_json()
    username = data['username']
    password = data['password']

    return account_functions.login(db, username, password)

@app.route("/api/register", methods=["POST"])
def register():
    data = request.get_json()
    username = data['username']
    password = data['password']

    return account_functions.register(db, username, password)

# @app.route("/api/get_username_from_session", methods=["GET"])
# def get_username_from_session():
#     session_key = request.cookies.get("session_key")
#     username = account_functions.get_username_from_session(db, session_key)



# ----------------------------------------------------------------------------
# Message Functions
@app.route("/api/send_message", methods=["POST"])
def send_message():
    session_key = request.cookies.get("session_key")
    sender = account_functions.get_username_from_session(db, session_key)
    recipient = request.get_json()['recipient']
    message = request.get_json()['message']
    signature = request.get_json()['signature']
    verifyKey = request.get_json()['verify_key']

    return message_functions.send_message(db, sender, recipient, message, signature, verifyKey)


@app.route("/api/get_messages", methods=["GET"])
def get_messages():
    session_key = request.cookies.get("session_key")
    username = account_functions.get_username_from_session(db, session_key)

    return message_functions.get_messages(db, username)


# ----------------------------------------------------------------------------
# Friend Functions
@app.route("/api/get_friend_list", methods=["GET"])
def get_friend_list():
    session_key = request.cookies.get("session_key")
    username = account_functions.get_username_from_session(db, session_key)

    return friend_functions.get_friend_list(db, username)

@app.route("/api/send_friend_request", methods=["POST"])
def send_friend_request():
    session_key = request.cookies.get("session_key")
    username = account_functions.get_username_from_session(db, session_key)
    othername = request.get_json()['recipient']

    return friend_functions.send_friend_request(db, username, othername)

@app.route("/api/accept_friend_request", methods=["POST"])
def accept_friend_requests():
    session_key = request.cookies.get("session_key")
    username = account_functions.get_username_from_session(db, session_key)
    othername = request.get_json()['recipient']
    action = request.get_json()['action']

    return friend_functions.accept_friend_requests(db, username, othername, action)

@app.route("/api/check_for_friend_requests", methods=["GET"])
def check_for_friend_request():
    session_key = request.cookies.get("session_key")
    username = account_functions.get_username_from_session(db, session_key)

    return friend_functions.check_for_friend_requests(db, username)

# Key Functions
@app.route("/api/get_friends_keys", methods=["GET"])
def get_friends_keys():
    session_key = request.cookies.get("session_key")
    username = account_functions.get_username_from_session(db, session_key)

    return key_functions.get_friends_keys(db, username)

@app.route("/api/set_keys", methods=["POST"])
def set_keys():
    session_key = request.cookies.get("session_key")
    username = account_functions.get_username_from_session(db, session_key)
    publicKey = request.get_json()['public_key']
    verifyKey = request.get_json()['verify_key']

    return key_functions.set_keys(db, username, publicKey, verifyKey)

if __name__ == '__main__':
    # import sys
    # for p in sys.path:
    #     print(p)
    app.run(host="localhost", port=8080)
