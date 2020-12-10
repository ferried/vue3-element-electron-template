/*
 * @Author: ferried
 * @Email: harlancui@outlook.com
 * @Date: 2020-12-10 11:21:49
 * @LastEditTime: 2020-12-10 16:29:57
 * @LastEditors: ferried
 * @Description: Basic description
 * @FilePath: /nebula-iot-helper/src/background.js
 * @LICENSE: Apache-2.0
 */

"use strict";

import { app, protocol, BrowserWindow, Menu, ipcMain } from "electron";
import {
  createProtocol,
  installVueDevtools,
} from "vue-cli-plugin-electron-builder/lib";

let win;
const isDevelopment = process.env.NODE_ENV !== "production";

protocol.registerSchemesAsPrivileged([
  {
    scheme: "app",
    privileges: {
      secure: true,
      standard: true,
    },
  },
]);

function createWindow() {
  win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      // cross
      webSecurity: false,
      nodeIntegration: true,
      nodeIntegrationInWorker: true,
    },
  });

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    win.loadURL(process.env.WEBPACK_DEV_SERVER_URL);
    if (!process.env.IS_TEST) win.webContents.openDevTools();
  } else {
    createProtocol("app");
    win.loadURL("app://./index.html");
  }
  win.on("closed", () => {
    win = null;
  });
  createMenu();
}

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (win === null) {
    createWindow();
  }
});

app.on("ready", async () => {
  if (isDevelopment && !process.env.IS_TEST) {
    try {
      await installVueDevtools(true);
    } catch (e) {
      console.error("Vue Devtools failed to install:", e.toString());
    }
  }
  createWindow();
});

if (isDevelopment) {
  if (process.platform === "win32") {
    process.on("message", (data) => {
      if (data === "graceful-exit") {
        app.quit();
      }
    });
  } else {
    process.on("SIGTERM", () => {
      app.quit();
    });
  }
}

function createMenu() {
  if (process.platform === "darwin") {
    const template = [
      {
        label: "App Demo",
        submenu: [
          {
            role: "about",
          },
          {
            role: "quit",
          },
        ],
      },
    ];
    let menu = Menu.buildFromTemplate(template);
    Menu.setApplicationMenu(menu);
  } else {
    Menu.setApplicationMenu(null);
  }
}