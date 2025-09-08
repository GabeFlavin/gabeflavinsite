import "https://unpkg.com/es-module-shims@1.3.6/dist/es-module-shims.js";
import { Application } from 'https://unpkg.com/@splinetool/runtime@1.9.82/build/runtime.js';



const canvasScan = document.getElementById('canvas3dScan');
const scan = new Application(canvasScan);
scan.load('/scene.splinecode2');
