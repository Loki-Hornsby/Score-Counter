from flask import Flask
import logging, sys
import Database
import secrets, random

#query = '''INSERT INTO Scores (Winner, Date) VALUES ("XX", "YY")'''
#query = "SELECT * FROM Scores"
#File.cursor.execute(query)
#print(File.cursor.fetchall())

"""
x = input("--> ")
if (x == "1"):
    Database.PerformQuery('''INSERT INTO Players (Name, Wins, Losses) VALUES ("Jared", "0", "0")''')
    Database.PerformQuery('''INSERT INTO Players (Name, Wins, Losses) VALUES ("Loki", "0", "0")''')

    Database.PerformQuery('''INSERT INTO Matches (Game, Date, Winner, Loser) VALUES ("Pokemon TCG", "21.01.22", "Loki", "Jared")''')
"""

# -- Init Database
Database.Init()

# -- Server
WebServer = Flask(__name__)

# -- Validation
class K:
    key = str(secrets.token_urlsafe(16)) + str(random.randint(50,5000))
    decoded = str(''.join(filter(str.isdigit, key)))
    state = "Closed"

def ChangeKey():
    K.decoded = str(''.join(filter(str.isdigit, K.key)))
    K.key = str(secrets.token_urlsafe(16)) + str(random.randint(50,5000))

def Validate(k):
    if (k == K.decoded):
        return True <-- Add back in change key
    else:
        #ChangeKey()
        return False

# Get key
@WebServer.route("/GetKey/")
def Get():
    #if K.state == "Open":
        #ChangeKey()

    return K.key

# Set Key to Open/Closed
@WebServer.route("/ToggleKey/<string:k>")
def Toggle(k):
    if Validate(k):
        if (K.state == "Closed"):
            K.state = "Open"
        else:
            K.state = "Closed"

            #ChangeKey()
        
        return "Set Key to " + str(K.state)
    else:
        return str(secrets.token_urlsafe(15)) + str(random.randint(50,5000))

# -- General

# Test
@WebServer.route("/Test/<string:k>+<int:a>+<int:b>")
def Test(k, a, b):
    if Validate(k):
        c = a + b
        return str(c)
    else:
        return str(secrets.token_urlsafe(15)) + str(random.randint(50,5000))

# SQl
@WebServer.route("/SQL/<string:k>+<string:s>", methods=['GET', 'POST'])
def SQL(k, s):
    if Validate(k):
        query = s.replace("_", " ")
        arr = Database.PerformQuery(query, False)
        
        return ('*'.join(map(str, arr))).replace("(", "").replace(")", "")
    else:
        return str(secrets.token_urlsafe(15)) + str(random.randint(50,5000))

# -- Run Web Server
# Load
while not Database.exists:
    pass

# Run
if __name__ == "__main__":
    WebServer.run(debug=True)