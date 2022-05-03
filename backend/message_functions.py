import json

def send_message(db, sender, recipient, message, signature, verifyKey):
    """
        Send message from client-username to other-username

        Return success or failed
    """
    if sender == None:
        return {'result': 'failed', 'error': 'Invalid session key'}

    sql_cmd = """
        INSERT INTO Messages(sender, recipient, message, signature, verify_key)
        VALUES(:sender, :recipient, :message, :signature, :verify_key)
    """
    with db: 
        # print(message)
        # print("----------")
        # print(signature)
        # print("--------")
        # print(verifyKey)
        db.execute(sql_cmd, params={'sender': sender, 'recipient': recipient, 'message': message, 'signature': signature, "verify_key": json.dumps(verifyKey) })
        db.commit()

    return {'result': 'success', 'sender': sender}

def get_messages(db, username):
    """
        Get all messages sent to client-username

        SELECT sender, message FROM Messages WHERE recipient=client-username

        Return List of messages - [(sender, message), (sender, message)]
    """
    if username == None:
        return {'result': 'failed', 'error': 'Invalid session key', 'messages': []}

    sql_cmd = """
        SELECT sender, message, signature, verify_key
        FROM Messages
        WHERE recipient=:username
    """
    with db:
        resp = db.execute(sql_cmd, params={'username': username})
        if resp == None:
            return {'result': 'success', 'messages': []}
        resp = resp.fetchall()
        messages=[]
        for group in resp:
            messages.append([group[0], group[1], group[2], group[3]])
        
        sql_cmd = """
            DELETE FROM Messages
            WHERE recipient=:username
        """
        db.execute(sql_cmd, params={'username': username})
        db.commit()

    return {'result': 'success', 'messages': messages}
