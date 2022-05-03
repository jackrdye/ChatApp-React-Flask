import friend_functions
import json

def get_friends_keys(db, username):
    """
        Take in a username and return all friends keys 

        Return a Dictionary of (friend: [publicKey, verifyKey])
    """
    keys = {} # {"bob": [publicKey, verifyKey], "alice": [publicKey, verifyKey]}

    friends = friend_functions.get_friend_list(db, username)['friends']
    friends = tuple(friends)

    sql_cmd = """
        SELECT username, public_key, verify_key 
        FROM Users 
        WHERE username IN ({}) 
    """.format(', '.join(':{}'.format(i) for i in range(len(friends)))) 

    params = {} 
    params.update({str(i): id for i, id in enumerate(friends)}) 

    with db:
        resp = db.execute(sql_cmd, params=params)
        if resp == None:
            return {'result': 'success', 'keys': {}}
        resp = resp.fetchall()

        for group in resp:
            keys[group[0]] = [group[1], group[2]]
        
        # print(keys)
    return {'result': 'success', 'keys': keys}


def set_keys(db, username, publicKey, verifyKey):
    sql_cmd = """
        UPDATE Users
        SET public_key=:publicKey, verify_key=:verifyKey
        WHERE username=:username 
    """

    with db:
        db.execute(sql_cmd, params={'username': username, 'publicKey': json.dumps(publicKey), 'verifyKey': json.dumps(verifyKey)})
        db.commit()

    return {'result': 'success'}
