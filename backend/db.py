import sqlite3
import hashlib
import math

# This class is a simple handler for all of our SQL database actions
# Practicing a good separation of concerns, we should only ever call 
# These functions from our models

class SQLDatabase():
    '''
        Our SQL Database
    '''
    # Get the database running
    def __init__(self, database_arg=':memory:'):
        self.database_arg = database_arg
        self.depth = 0
        self.conn = sqlite3.connect(self.database_arg, uri=True, check_same_thread=True)
        self.conn.create_function('EXP', 1, math.exp)
        self.cur = self.conn.cursor()
    
    # def __enter__(self):
    #     if self.depth == 0:
    #         self.conn = sqlite3.connect(self.database_arg, uri=True, check_same_thread=False)
    #         self.cur = self.conn.cursor()
    #     self.depth += 1
    
    # def __exit__(self, exc_type, exc_value, tb):
    #     if exc_type is not None:
    #         raise exc_value
    #     self.depth -= 1
    #     if self.depth == 0:
    #         self.conn.close()

    def __enter__(self):
        pass
    def __exit__(self, *args):
        pass

    # SQLite 3 does not natively support multiple commands in a single statement
    # Using this handler restores this functionality
    # This only returns the output of the last command
    def execute(self, sql_string, params={}):
        out = None
        for string in sql_string.split(";"):
            try:
                out = self.cur.execute(string, params)
            except Exception as e:
                print("failed:", e)
                print(sql_string)
                pass
        return out

    # Commit changes to the database
    def commit(self):
        self.conn.commit()

        
    # Sets up the database
    # Default admin password
    def database_setup(self, admin_password='admin'):
        # with self:
            # Clear the database if needed
            self.execute("DROP TABLE IF EXISTS Users")
            self.execute("DROP TABLE IF EXISTS Sessions")
            self.execute("DROP TABLE IF EXISTS Friends")
            self.execute("DROP TABLE IF EXISTS Messages")
            self.execute("DROP TABLE IF EXISTS GroupMessages")
            self.execute("DROP TABLE IF EXISTS Posts")
            self.execute("DROP TABLE IF EXISTS Tags")
            self.execute("DROP TABLE IF EXISTS PostTags")
            self.execute("DROP TABLE IF EXISTS Comments")
            self.commit()

            # Create the users table
            self.execute("""CREATE TABLE Users(
                username TEXT Primary Key UNIQUE,
                password TEXT,
                salt TEXT,
                admin INTEGER DEFAULT 0,
                public_key TEXT,
                verify_key TEXT
            )""")

            # Create the friends table
            self.execute("""CREATE TABLE Friends(
                A TEXT, 
                B TEXT, 
                friend_status TEXT
            )""")

            self.execute("""CREATE TABLE Sessions(
                session_key TEXT,
                username TEXT,
                createdOn DATETIME,
                lastValidated DATETIME
            )""")

            self.execute("""CREATE TABLE Messages(
                sender TEXT,
                recipient TEXT,
                message TEXT,
                signature TEXT,
                verify_key TEXT
            )""")

            self.execute("""CREATE TABLE GroupMessages(
                message_group TEXT,
                sender TEXT,
                message TEXT,
                createdOn DATETIME
            )""")

            self.execute("""CREATE TABLE Posts(
                postID INTEGER Primary Key AUTOINCREMENT,
                title TEXT,
                author TEXT,
                body TEXT,
                createdOn DATETIME,
                upvotes INTEGER DEFAULT 0
            )""")

            self.execute("""CREATE TABLE Tags(
                tagID INTEGER Primary Key AUTOINCREMENT,
                tag TEXT
            )""")

            self.commit()

            self.execute("""CREATE TABLE PostTags(
                postID INTEGER,
                tagID INTEGER, 
                FOREIGN KEY(postID) REFERENCES Posts(postID),
                FOREIGN KEY(tagID) REFERENCES Tags(tagID)
            )""")

            self.commit()

            self.execute("""CREATE TABLE Comments(
                commentID INTEGER PRIMARY KEY,
                postID INTEGER,
                parentCommentID INTEGER,
                author TEXT,
                body TEXT,
                createdOn DATETIME,
                FOREIGN KEY(postID) REFERENCES Posts(postID),
                FOREIGN KEY(parentCommentID) REFERENCES Comments(commentID)
            )""")

            self.commit()


            print("Database has been established")

            # Add our admin user
            # self.add_user('admin', admin_password, "aaa", admin=1)
            # self.add_user('a', 'a', "aaa", admin=0)
            # self.add_user('b', 'b', "aaa", admin=0)
            # self.add_user('hi', 'bye', 'aaa')
            # self.send_friend_request('a', 'b')
            # self.accept_friend_request('b', 'a')







