import Database

#query = '''INSERT INTO Scores (Winner, Date) VALUES ("XX", "YY")'''
#query = "SELECT * FROM Scores"
#File.cursor.execute(query)
#print(File.cursor.fetchall())

def Init():
    if not Database.exists:
        query = '''CREATE TABLE Matches (Game, Date, Winner, Loser)'''
        Database.PerformQuery(query)

        query = '''CREATE TABLE Players (Name, Wins, Losses)'''
        Database.PerformQuery(query)

    """
    x = input("--> ")
    if (x == "1"):
        Database.PerformQuery('''INSERT INTO Players (Name, Wins, Losses) VALUES ("Jared", "0", "0")''')
        Database.PerformQuery('''INSERT INTO Players (Name, Wins, Losses) VALUES ("Loki", "0", "0")''')

        Database.PerformQuery('''INSERT INTO Matches (Game, Date, Winner, Loser) VALUES ("Pokemon TCG", "21.01.22", "Loki", "Jared")''')
    """
