import sys, os
from stat import S_IREAD, S_IRGRP, S_IROTH, S_IWUSR 
import sqlite3

'''
# Make Read Only
    os.chmod(file, S_IREAD|S_IRGRP|S_IROTH)

    # Make Writable
    # os.chmod(filename, S_IWUSR|S_IREAD)
'''
############################################################### USE A CLASS!

# Variables
ROOT_DIR = os.getcwd()
name = "Store.db"
path = ROOT_DIR + "\Store.db"
exists = os.path.exists(os.path.join(os.getcwd(), name))

# Make file read only or writable
def ReadOnly(x):
    if x:
        # Make Read Only
        os.chmod(path, S_IREAD|S_IRGRP|S_IROTH)
    else:
        # Make Writable
        os.chmod(path, S_IWUSR|S_IREAD)

def PerformQuery(q, multiple = False):
    # Make Writable
    #ReadOnly(False)

    # Connect
    conn = sqlite3.connect(name)

    # Cursor
    cursor = conn.cursor()

    # Execute Query
    if (multiple):
        cursor.executescript(q)
    else:
        cursor.execute(q)

    # Get Cursor data
    Cdata = cursor.fetchall()

    # Save (commit) the changes
    conn.commit()
 
    # Close Cursor
    cursor.close()

    # End Session
    conn.close()

    # Make ReadOnly
    #ReadOnly(True)

    '''
    for result in Cdata:
        print(result)

    sys.stdout.flush()
    '''

    return Cdata


def Init():
    if not exists:
        PerformQuery("""
            CREATE TABLE matches (game, date, winners, losers);
            CREATE TABLE players (name);
            CREATE TABLE games (games);

            INSERT INTO matches VALUES ("SystemTest1", "DataTest1", "Loki", "System");
            INSERT INTO matches VALUES ("SystemTest2", "DataTest2", "Jared", "Loki");
            INSERT INTO matches VALUES ("SystemTest3", "DataTest3", "System", "Jared");
            INSERT INTO matches VALUES ("SystemTest4", "DataTest4", "Loki", "System");
            INSERT INTO matches VALUES ("SystemTest5", "DataTest5", "Jared", "Loki");
            INSERT INTO matches VALUES ("SystemTest6", "DataTest6", "System", "Jared");

            INSERT INTO games VALUES ("Zelda");
            INSERT INTO games VALUES ("Minecraft");
            INSERT INTO games VALUES ("Nuclear Throne");
            INSERT INTO games VALUES ("Noita");

            INSERT INTO players VALUES ("SYSTEM");
            INSERT INTO players VALUES ("loki");
            INSERT INTO players VALUES ("jared");
        """, True)
