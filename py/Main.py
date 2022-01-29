from flask import Flask
import sys
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

# Init Database
Database.Init()

# App
app = Flask(__name__)

# Test
@app.route("/Test/<int:a>+<int:b>")
def Test(a, b):
    c = a + b
    return str(c)

# SQl
@app.route("/SQL/<string:s>", methods=['GET', 'POST'])
def SQL(s):
    query = s.replace("_", " ")
    arr = Database.PerformQuery(query, False)
    
    return ', '.join(map(str, arr))

if __name__ == "__main__":
    app.run(debug=True)