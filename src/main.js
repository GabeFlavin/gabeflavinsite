import "https://unpkg.com/es-module-shims@1.3.6/dist/es-module-shims.js";
import { Application } from 'https://unpkg.com/@splinetool/runtime@1.9.82/build/runtime.js';

const canvas = document.getElementById('canvas3d');
const app = new Application(canvas);
app.load('/scene.splinecode');

