/// <reference types="vite/client" />
import { app, BrowserWindow, Tray, Menu, screen } from "electron";
import * as path from "path";
const runPath = path.join(path.resolve(__dirname, ""), "../../");
import url from "node:url";

var /** 是否开启开发模式 */ dev: boolean;
// 自动开启开发者模式
if (process.argv.includes("-d") || import.meta.env.DEV) {
    dev = true;
} else {
    dev = false;
}

const isFirstInstance = app.requestSingleInstanceLock();
if (!isFirstInstance) {
    app.quit();
}

app.commandLine.appendSwitch("enable-experimental-web-platform-features", "enable");
app.commandLine.appendSwitch("disable-web-security");

app.whenReady().then(() => {
    createMainWindow();
});

var theIcon = null;
if (process.platform === "win32") {
    theIcon = path.join(runPath, "assets/logo/icon.ico");
} else {
    theIcon = path.join(runPath, "assets/logo/1024x1024.png");
}

/** 加载网页 */
function rendererPath(window: BrowserWindow | Electron.WebContents, fileName: string, q?: Electron.LoadFileOptions) {
    if (!q) {
        q = { query: { userPath: app.getPath("userData") } };
    } else if (!q.query) {
        q.query = { userPath: app.getPath("userData") };
    } else {
        q.query["userPath"] = app.getPath("userData");
    }
    if (!app.isPackaged && process.env["ELECTRON_RENDERER_URL"]) {
        let mainUrl = `${process.env["ELECTRON_RENDERER_URL"]}/${fileName}`;
        let x = new url.URL(mainUrl);
        if (q) {
            if (q.search) x.search = q.search;
            if (q.query) {
                for (let i in q.query) {
                    x.searchParams.set(i, q.query[i]);
                }
            }
            if (q.hash) x.hash = q.hash;
        }
        window.loadURL(x.toString());
    } else {
        window.loadFile(path.join(__dirname, "../renderer", fileName), q);
    }
}

app.setLoginItemSettings({ openAtLogin: true });

let isIgnoreMouseEvents = true;
const width = 150;

function createMainWindow() {
    let mainWindow = new BrowserWindow({
        icon: theIcon,
        show: true,
        transparent: true,
        frame: false,
        skipTaskbar: true,
        width: width,
        height: 300,
        x: screen.getPrimaryDisplay().workAreaSize.width - width,
        y: 0,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            webSecurity: false,
        },
    });

    mainWindow.setIgnoreMouseEvents(true);
    mainWindow.setAlwaysOnTop(true, "screen-saver");

    // 自定义界面
    rendererPath(mainWindow, "main.html");

    if (dev) mainWindow.webContents.openDevTools();

    // 创建系统托盘
    let tray = new Tray(theIcon);

    // 创建右键菜单
    let contextMenu = Menu.buildFromTemplate([
        {
            label: "置于顶层",
            type: "checkbox",
            checked: mainWindow.isAlwaysOnTop(),
            click: () => {
                mainWindow.setAlwaysOnTop(!mainWindow.isAlwaysOnTop(), "screen-saver");
            },
        },
        {
            label: "鼠标穿透",
            type: "checkbox",
            checked: isIgnoreMouseEvents,
            click: () => {
                mainWindow.setIgnoreMouseEvents(!isIgnoreMouseEvents);
                isIgnoreMouseEvents = !isIgnoreMouseEvents;
            },
        },
        {
            label: "退出",
            click: () => {
                app.quit();
            },
        },
    ]);

    // 设置系统托盘的右键菜单
    tray.setContextMenu(contextMenu);
}
