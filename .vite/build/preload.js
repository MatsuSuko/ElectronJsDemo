"use strict";
const electron = require("electron");
electron.contextBridge.exposeInMainWorld("electronAPI", {
  // Vous pouvez ajouter des fonctions IPC ici si nécessaire plus tard
  platform: process.platform
});
