def get_tags(db):
    """
        gets all tags available
    """
    sql_cmd = """
        SELECT tagID, tag
        FROM Tags
    """
    resp = db.execute(sql_cmd, params={})
    if resp == None:
        return {'result': 'success', 'tags': []}

    resp = resp.fetchall()
    tags=[]

    for group in resp:
        tags.append({'tag': group[1], 'tagID': group[0]})


    return {'result': 'success', 'tags': tags}

def get_tag_id(db, tag):
    sql_cmd = """
        SELECT tagID 
        FROM Tags
        WHERE tag = :tag
    """
    resp = db.execute(sql_cmd, params={'tag': tag})
    resp = resp.fetchone()
    if resp == None:
        return None
    return resp[0]

def create_tag_helper(db, tag):
    '''
        creates a tag
    '''
    sql_cmd = """
        INSERT INTO Tags(tag)
        VALUES (:tag)
    """
    resp = db.execute(sql_cmd, params={'tag': tag})
    db.commit()

    return get_tag_id(db, tag)

def create_post(db, title, author, body, tags):
    '''
        creates a post
    '''
    tagids = []
    for tag in tags:
        tid = get_tag_id(db, tag)
        if tid is None:
            tid = create_tag_helper(db, tag)
        if tid is not None:
            tagids.append(tid)

    sql_cmd = """
        INSERT INTO Posts(title, author, body, createdOn)
        VALUES (:title, :author, :body, datetime('now'))
    """
    resp = db.execute(sql_cmd, params={'title': title, 'author': author, 'body': body})

    db.commit()

    sql_cmd = """
        SELECT postID
        FROM Posts
        WHERE title = :title AND author = :author and body = :body
        ORDER BY createdOn DESC
        LIMIT 1
    """
    
    resp = db.execute(sql_cmd, params={'title': title, 'author': author, 'body': body})
    if resp == None:
        return {'result': 'failure'}

    postID = resp.fetchone()[0]

    for tagID in tagids:
        sql_cmd = """
            INSERT INTO PostTags(postID, tagID)
            VALUES (:postID, :tagID)
        """
        db.execute(sql_cmd, params={'postID': postID, 'tagID': tagID})
    
    db.commit()

    return {'result': 'success', 'postID': postID, 'title': title}

def get_post_list(db, sort_order, tags):
    """
        gets all posts available, filtering by tags, in sort_order provided
    """
    SORT_ORDER = {
        'relevant': 'relevance ASC, p.createdOn DESC', 
        'latest': 'p.createdOn DESC', 
        'earliest': 'p.createdOn ASC', 
        'upvotes': 'p.upvotes ASC, p.createdOn DESC'
    }
    if sort_order in SORT_ORDER:
        sort_order = SORT_ORDER[sort_order]
    else:
        sort_order = "p.createdOn DESC"
    
    tagids = []
    for tag in tags:
        tid = get_tag_id(db, tag)
        if tid is not None:
            tagids.append(tid)
    tags = tagids

    if len(tags) > 0:
        sql_cmd = f"""
            SELECT result.postID, result.title 
            FROM (
                SELECT p.*, EXP(-((p.createdOn-datetime('now'))/24*60*60)/5)*p.upvotes as relevance
                FROM (  SELECT pt.postID, pt.tagID
                        FROM PostTags pt
                        WHERE pt.tagID IN ({','.join(('?' for i in range(len(tags))))})
                        GROUP BY pt.postID
                        HAVING COUNT(*) = {len(tags)}
                    ) t
                JOIN Posts p
                ON p.postID = t.postID
                ORDER BY {sort_order}
            ) result
        """
    else:
        a = "(EXP(-0.2*((p.createdOn-datetime('now'))/24*60*60)*p.upvotes)"
        sql_cmd = f"""
            SELECT result.postID, result.title 
            FROM (
                SELECT p.*, EXP(-((p.createdOn-datetime('now'))/24*60*60)/5)*p.upvotes as relevance
                FROM Posts p
                ORDER BY {sort_order}
            ) result
        """

    resp = db.execute(sql_cmd, params=tags)
    if resp == None:
        return {'result': 'success', 'posts': []}

    resp = resp.fetchall()
    posts=[]

    for group in resp:
        posts.append({'post_id': group[0], 'title': group[1]})


    return {'result': 'success', 'posts': posts}

def create_comment(db, postID, parentCommentID, author, body):
    sql_cmd = """
        INSERT INTO Comments(postID, parentCommentID, author, body, createdOn)
        VALUES (:postID, :parentCommentID, :author, :body, datetime('now'))
    """
    resp = db.execute(sql_cmd, params={
        'postID': postID, 
        'parentCommentID':parentCommentID, 
        'author': author, 
        'body': body})
    
    db.commit()

    return {'result': 'success'}

def get_post(db, postID):
    sql_cmd = f"""
        SELECT postID, title, author, body, createdOn, upvotes
        FROM Posts
        WHERE postID = :postID
    """
    resp = db.execute(sql_cmd, params={'postID': postID})
    if resp is None:
        return {'result': 'failure'}
    resp = resp.fetchone()

    if resp is None:
        return {'result': 'failure'}

    post_obj = {
        'postID': resp[0], 
        'title': resp[1],
        'author': resp[2],
        'body': resp[3],
        'createdOn': resp[4],
        'upvotes': resp[5],
        'comments': []
    }

    sql_cmd = f"""
        SELECT commentID, parentCommentID, author, body, createdOn
        FROM Comments
        WHERE postID = :postID
    """

    resp = db.execute(sql_cmd, params={'postID': postID})
    resp = resp.fetchall()
    if resp is None:
        return {'result': 'failure'}

    for comment in resp:
        comment_obj = {
            'commentID': comment[0],
            'parentCommentID': comment[1],
            'author': comment[2],
            'body': comment[3],
            'createdOn': comment[4]
        }
        post_obj['comments'].append(comment_obj)
    
    return {'result': 'success', 'post': post_obj}

def upvote(db, postID):
    sql_cmd = """
        UPDATE Posts SET upvotes = upvotes+1 WHERE postID = :postID
    """
    resp = db.execute(sql_cmd, params={'postID': postID})
    
    db.commit()

    return {'result': 'success'}

def downvote(db, postID):
    sql_cmd = """
        UPDATE Posts SET upvotes = upvotes-1 WHERE postID = :postID
    """
    resp = db.execute(sql_cmd, params={'postID': postID})
    
    db.commit()

    return {'result': 'success'}