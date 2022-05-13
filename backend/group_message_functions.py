from email import message
import json

def send_message(db, group, sender, message):
    """
        Send message from sender to group chat

        Return success or failed
    """
    if sender == None:
        return {'result': 'failed', 'error': 'Invalid session key'}

    sql_cmd = """
        INSERT INTO GroupMessages(message_group, sender, message, createdOn)
        VALUES(:group, :sender, :message, datetime('now'))
    """

    db.execute(sql_cmd, params={'sender': sender, 'message': message, 'group': group })
    db.commit()

    return {'result': 'success', 'sender': sender, 'message': message} #Can add {createdOn:...}

def get_messages(db, user, group, page_no = 1):
    """
        Get all messages sent to group

        Return List of messages - [(sender, message), (sender, message)] ------ EDIT - make it return [{sender:..., message:...}, ...]
    """
    if group == None:
        return {'result': 'failed', 'error': 'Invalid session key', 'messages': []}

    sql_cmd = """
        SELECT sender, message, createdOn
        FROM GroupMessages
        WHERE message_group = :group
        ORDER BY createdOn DESC
        LIMIT 100
        OFFSET :offset
    """
    resp = db.execute(sql_cmd, params={'group': group, 'offset': (page_no - 1) * 100})
    if resp == None:
        return {'result': 'success', 'messages': []}

    resp = resp.fetchall()
    messages=[]

    for group in resp:
        messages.append({'sender': group[0], 'message': group[1], 'createdOn': group[2]})

    messages = messages[::-1]

    return {'result': 'success', 'messages': messages}
