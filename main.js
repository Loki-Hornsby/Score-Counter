const { app, BrowserWindow } = require('electron')
const x = "HI"

function createWindow () {
    // Create Python Child Process
    var python = require('child_process').spawn('py', ['./py/Main.py']);

    python.stdout.on('data', function (data) {
        console.log("data: ", data.toString('utf8'));
    });

    python.stderr.on('data', (data) => {
        console.log(`stderr: ${data}`); 
    });
    
    // Create the browser window.
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        minWidth: 800/4,
        minHeight: 600/4,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        }
    })

    // Hide Menu Bar
    //win.setMenu(null)

    // Load the app visual.
    win.loadFile('src/index.html')

    // Open the DevTools
    win.webContents.openDevTools()
}

// Create App Window
app.whenReady().then(createWindow)

// Windows + Linux Quit
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

// MacOS quit
app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow()
    }
})
