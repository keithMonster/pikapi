// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
import { contextBridge, ipcRenderer } from 'electron';
// import api from './api';
// console.log('api: ', api);

// contextBridge.exposeInMainWorld('API', api);

// const { contextBridge, ipcRenderer } = require('electron/renderer')

contextBridge.exposeInMainWorld('electronAPI', {
  img2code: (...arg: unknown[]) =>
    ipcRenderer.invoke('api', 'img2code', ...arg),
});
