// Requirements
const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const dialog = electron.dialog;

// Create Python Child Process
var childProcess = require('child_process');
var python = childProcess.spawn('py', ['./py/Main.py'], { detached: false });

python.stdout.on('data', function (data) {
    console.log("data: ", data.toString('utf8'));
});

python.stderr.on('data', (data) => {
    console.log(`stderr: ${data}`); 
});

// Lock app to single instance
const gotTheLock = app.requestSingleInstanceLock()
    
if (!gotTheLock) {
    console.log("Warning! instance already running! .... quitting application ....")
    app.quit()
} else {
    // Create electron window
    function createWindow () {
        // Measurements
        var mainScreen = electron.screen.getPrimaryDisplay();
        var dimensions = mainScreen.size;
        
        // Create the browser window.
        // Remember to set [width] and [height] to be larger than [minWidth] and [minHeight] otherwise these parameters will not work
        const win = new BrowserWindow({
            width: dimensions.width/1.5,
            height: dimensions.height/1.5,
            minWidth: dimensions.width/2,
            minHeight: dimensions.height/2,
            webPreferences: {
                nodeIntegration: true,
                contextIsolation: false
            }
        })

        // Hide Menu Bar
        //win.setMenu(null)

        // Load the app visual.
        win.loadFile('src/index.html');

        // Open the DevTools
        win.webContents.openDevTools();
    }

    // Create App Window
    app.whenReady().then(createWindow);

    // Windows + Linux Quit
    app.on("window-all-closed", () => {
        if (process.platform !== 'darwin') {
            python.kill('SIGINT');
            app.quit();
        }
    })

    // MacOS quit
    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    })
};
