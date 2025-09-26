import "https://unpkg.com/es-module-shims@1.3.6/dist/es-module-shims.js";
// import { Application } from 'https://unpkg.com/@splinetool/runtime@1.9.82/build/runtime.js';
import { Application } from '/runtime.js';


const canvas = document.querySelector('#canvas3d') || document.createElement('canvas');
canvas.id = 'canvas3d';
const app = new Application(canvas);
app.load('/scene.splinecode');

// Function to load HTML includes
async function loadInclude(selector, file) {
  const response = await fetch(file);
  const html = await response.text();
  document.querySelector(selector).innerHTML = html;
}

// Load navigation
loadInclude('#con-nav', '/partials/nav.html');