
// Modules to control application life and create native browser window
const {app, BrowserWindow, shell} = require('electron');
const path = require('path');

function createWindow () {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 1300,
    height: 900,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true,
      preload: path.join(__dirname, 'src/backend/electron/preload.js')
    }
  });

  // and load the index.html of the app.
  //mainWindow.loadFile('src/frontend/index.html');
  mainWindow.loadFile('src/playground/bootstrap/Getting_Started/index.html');
  //mainWindow.loadFile('src/playground/bootstrap/OpenBYOND_launcher/index.html');

  // Open the DevTools.
  mainWindow.webContents.openDevTools();

  mainWindow.webContents.on('new-window', function(e, url) {
    e.preventDefault();
    shell.openExternal(url);
  });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
