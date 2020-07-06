const { app, BrowserWindow } = require('electron')

function createWindow () {
  // Cree la fenetre du navigateur.
  let win = new BrowserWindow({
    width: 900,
    height: 800,
    webPreferences: {
      nodeIntegration: true
    }
  })

  // and load the index.html of the app.
  win.loadFile('html/index.html')
}

app.whenReady().then(createWindow)

const {Pool, Client} = require('pg')
client = new Client({
    host: 'localhost',
    user: 'yohan',
    password: 'logitech',
    database: 'veleos',
});

