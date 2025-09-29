import { contextBridge, ipcRenderer } from 'electron';

// Expose les APIs de façon sécurisée au renderer
contextBridge.exposeInMainWorld('electronAPI', {
    // Vous pouvez ajouter des fonctions IPC ici si nécessaire plus tard
    platform: process.platform,
});