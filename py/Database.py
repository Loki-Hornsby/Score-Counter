# Made By Loki Hornsby
# Under GPL-3.0 License

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

def PerformQuery(q):
    # Make Writable
    #ReadOnly(False)

    # Connect
    conn = sqlite3.connect(name)

    # Cursor
    cursor = conn.cursor()

    # Create Base Table
    cursor.execute(q)

    # Save (commit) the changes if wanted
    conn.commit()

    # Close Cursor
    cursor.close()

    # End Session
    conn.close()

    # Make ReadOnly
    #ReadOnly(True)
