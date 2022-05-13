import secrets
import hashlib

def login(db, username, password):
    """
        Verify a username and salted/hashed password match

        Return - success with session cookie, or failed if invalid username/password
    """

    sql_cmd = """
        SELECT username, password, salt
        FROM Users
        WHERE username=:username
    """
    with db:
        user = db.execute(sql_cmd, params={'username': username})
        user = user.fetchone()
        # Check if username exists
        if user == None:
            return {"result": 'Invalid Credentials'}
        
        # Check if password is correct
        salted_password = password + user[2]
        hashed_password = hashlib.sha256(salted_password.encode('utf-8')).hexdigest()
        if hashed_password != user[1]:
            return {"result": "Invalid Credentials"}

    # Create Session Cookie
    session_cookie = create_user_session(db, username)
    # print(session_cookie)

    return {"result": "success", "session_cookie": session_cookie, "username": username}


def register(db, username, password):
    """
        Register a new user

        Return - success if created, or failed if username taken
    """
    # Check if username already exists
    sql_cmd = """
        SELECT COUNT(username) 
        FROM Users
        WHERE username=:username
    """
    with db:
        resp = db.execute(sql_cmd, params={"username": username})
        count = resp.fetchone()[0]

    if count != 0:
        return {"result": "username already exists"}
    
    # Salt and hash password for storage
    salt = secrets.token_hex(32)
    salted_password = password + salt
    hashed_password = hashlib.sha256(salted_password.encode('utf-8')).hexdigest()

    # Add user to Database
    sql_cmd = """
        INSERT INTO Users(username, password, salt)
        VALUES (:username, :hashed_password, :salt)
    """
    with db:
        db.execute(sql_cmd, params={"username":username, "hashed_password":hashed_password, "salt": salt})
        db.commit()

    return {"result": "success"}

# --------------------------------------------------------------------------

# --------------------------------------------------------------------------

# --------------------------------------------------------------------------
# Session Functions
def create_user_session(db, username):
    """
        Generate unqiue session cookie to identify client-username

        Insert into the Sessions Table

        Return session_cookie
    """
    remove_old_sessions(db) 

    # Generate session key
    session_key = secrets.token_hex(32)
    sql_cmd = """
        INSERT INTO Sessions(session_key, username, createdOn, lastValidated)
        VALUES (:session_key, :username, datetime('now'), datetime('now'))
    """
    with db:
        db.execute(sql_cmd, params={'session_key': session_key, 'username': username})
        db.commit()
        # resp = db.execute("SELECT * FROM Sessions") # check and see if session has been created
        # print(resp.fetchall())

    return session_key

def get_username_from_session(db, session_key):
    """
        Check session cookie to identify client-username

        Return client-username
    """
    remove_old_sessions(db)

    sql_cmd = """
        SELECT  username
        FROM Sessions
        WHERE session_key=:session_key
    """
    with db:
        db.execute(sql_cmd, params={"session_key": session_key})
        resp = db.cur.fetchone()
    
    if resp != None:
        return resp[0]
    else:
        return None # {'result': "Invalid Session Cookie - Log in Again"}

def remove_old_sessions(db):
    """
        Delete Sessons where session cookie has expired
    """
    sql_cmd = """
        DELETE FROM Sessions 
        WHERE createdOn <= datetime('now', '-1 days') 
            OR lastValidated <= datetime('now', '-1 days')
    """
    with db:
        db.execute(sql_cmd)
        db.commit()
    return "Old sessions have been deleted"
