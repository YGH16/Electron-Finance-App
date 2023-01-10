const { app, BrowserWindow } = require("electron");
const path = require("path");

// Creates Browser Window
const createWindow = () => {
    // Create new BrowserWindow and set width and height
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, "preload.js")
        }
    });

    // Load the index.html file on creation of BrowserWindow
    win.loadFile('index.html');
}

// Fire createWindow when the app resolves the promise
app.whenReady().then(() => {
    createWindow();

    // Open a window if all windows are closed (IOS _ SPECIFIC)
    app.on("activate", () => {
        if (BrowserWindow.getAllWindows().length === 0 ) createWindow();
    })
});

// Close applicate when all windows are closed
app.on("window-all-closed", () => {
    if(process.platform !== "darwin") app.quit();
})
