const electron = require('electron');
const getPort = require('get-port');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const jsBitcoin = require('../js.bitcoin/src/server');

let PORT = '';

getPort().then(port => {
  const server = jsBitcoin.app.listen(port);
  PORT=port;
  jsBitcoin.startP2PServer(server);
})

const path = require('path');
const url = require('url');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    resizable: false,
    title: `js.bitcoin Wallet at PORT: ${PORT}`
  });

  const startUrl = process.env.ELECTRON_START_URL || url.format({
    pathname: path.join(__dirname, '/../build/index.html'),
    protocol: 'file:',
    slashes: true
  });
  
  mainWindow.loadURL(startUrl);

  // mainWindow.webContents.openDevTools();

  mainWindow.on('closed', function () {
    mainWindow = null;
  });
}

app.on('ready', createWindow);

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', function () {
  if (mainWindow === null) {
    createWindow();
  }
});
