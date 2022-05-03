def get_friend_list(db, username):
    """
        Retrieve usernames' list of friends 
    """
    if username == None:
        return {'result': 'failed', 'error': 'Invalid session key', 'friends': []}

    sql_cmd = """
        SELECT A, B
        FROM Friends
        WHERE (A=:username OR B=:username) AND friend_status='friends'
    """
    with db: 
        resp = db.execute(sql_cmd, params={'username': username})
        if resp == None:
            return {'result': 'success', 'friends': []}
        resp = resp.fetchall() #returns list of tuples - [('jack', 'a')]
        # filter data into list of friends - ['a', 'b']
        friends = []
        for group in resp:
            if group[0] == username: # if first name is username then second name must be friend
                friends.append(group[1])
            else:
                friends.append(group[0])
    
    return {'result': 'success', 'friends': friends}

def send_friend_request(db, username, othername):
    """
        Send friend request from client-username to other-username

        Add entry in Friend DB to (
            client-username, other-username, accept-pending
        )

        Return success of failed
    """
    if username == None:
        return {'result': 'failed', 'error': 'Invalid session key'}

    # Check that othername exists
    sql_cmd = """
        SELECT 1
        FROM Users
        WHERE username=:othername
    """
    with db:
        resp = db.execute(sql_cmd, params={'othername': othername})
        if resp.fetchone() == None:
            return {'result': "failed - user does not exist"}

    # Check that they are not already friends
    sql_cmd = """
        SELECT 1
        FROM Friends
        WHERE (A=:username AND B=:othername) OR (A=:othername AND B=:username)
    """
    with db:
        resp = db.execute(sql_cmd, params={'username': username, 'othername': othername})
        if resp.fetchone() != None:
            return {'result': 'failed - you are already friends'}

    # Passed previous checks so
    # Insert friend request into Friends table
    sql_cmd = """
        INSERT INTO Friends(A, B, friend_status)
        VALUES (:username, :othername, 'pending')
    """
    with db:
        db.execute(sql_cmd, params={'username': username, 'othername': othername})
        db.commit()

    return {'result': 'success'}

def accept_friend_request(db, username, othername, action):
    """
        Accept friend request from other-username

        Update entry in Friend DB to (
            other-username, client-username, friends
        )

        Return success
    """
    if username == None:
        return {'result': 'failed', 'error': 'Invalid session key'}

    # If friend request was accepted update entry
    if action == "accept":
        sql_cmd = """
            UPDATE Friends
            SET friend_status='friends'
            WHERE A=:othername AND B=:username AND friend_status='pending'
        """
        with db: 
            db.execute(sql_cmd, params={'username': username, 'othername': othername})
            db.commit()

        return {'result': 'success'}

    # If friend request was rejected delete entry 
    elif action == "decline":
        sql_cmd = """
            DELETE FROM Friends
            WHERE A=:othername AND B=:username AND friend_status='pending'
        """
        with db:
            db.execute(sql_cmd, params={'username': username, 'othername': othername})
            db.commit()

        return {'result': 'success'}

def check_for_friend_requests(db, username):
    """
        Check for friend requests sent to client-username

        SELECT * FROM Friends WHERE B=client-username AND friend_status='pending'
    
        Return a list of usernames who have sent a friend request to client-username
    """
    if username == None:
        return {'result': 'failed', 'error': 'Invalid session key'}

    sql_cmd = """
        SELECT A
        FROM Friends
        WHERE B=:username AND friend_status='pending'
    """
    with db:
        resp = db.execute(sql_cmd, params={'username':username})
        resp = resp.fetchall()
    
    return {'result': 'success', 'requests': resp}
