

// Function to load HTML includes
async function loadInclude(selector, file) {
  const response = await fetch(file);
  const html = await response.text();
  document.querySelector(selector).innerHTML = html;
}

// Load navigation
loadInclude('#con-nav', '/partials/nav.html');

// import GSAP
import { gsap } from 'https://cdn.jsdelivr.net/npm/gsap@3.12.2/index.js';

import { Application } from 'https://unpkg.com/@splinetool/runtime@1.9.82/build/runtime.js';


const canvas = document.querySelector('#canvas3d') || document.createElement('canvas');
canvas.id = 'canvas3d';
const app = new Application(canvas);
app.load('/scene.splinecode');

const canvas_contact = document.querySelector('#canvas3d_contact') || document.createElement('canvas');
canvas_contact.id = 'canvas3d';
const app_contact = new Application(canvas_contact);
app_contact.load('/scene_contact.splinecode');

// create a function that plays an audio file when called
function playAudio(url) {
  const audio = new Audio(url);
  audio.play();
}

// Add event listener to play sound on canvas click check to see if canvas exists first
if (canvas) {
  canvas.addEventListener('click', () => {
    playAudio('/sounds/click.mp3');
  });
}

