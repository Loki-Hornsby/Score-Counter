from flask import Flask
import logging, sys
import Database

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

# -- General

# Test
@WebServer.route("/Test/<int:a>+<int:b>")
def Test(a, b):
    c = a + b
    return str(c)

# Opcodes Used
space = "_"
joiner = "+"

@WebServer.route("/Opcode/space")
def spaces():
    return space

@WebServer.route("/Opcode/joiner")
def joiners():
    return joiner

# SQl
@WebServer.route("/SQL/<string:s>", methods=['GET', 'POST'])
def SQL(s):
    query = s.replace("_", " ")
    arr = Database.PerformQuery(query, False)
    
    return ('*'.join(map(str, arr))).replace("(", "").replace(")", "").replace("'", "")
   
# -- Run Web Server
# Load
while not Database.exists:
    pass

# Run
WebServer.run(debug=True)