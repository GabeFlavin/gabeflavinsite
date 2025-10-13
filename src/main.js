
// Function to load HTML partials
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


// Magnetic Buttons
// Found via: https://codepen.io/tdesero/pen/RmoxQg

function initMagneticButtons() {

console.log('Initializing Magnetic Buttons');

  // Magnetic Buttons
  // Found via: https://codepen.io/tdesero/pen/RmoxQg
  var magnets = document.querySelectorAll(".gf-magnetic");
  var strength = 50;

  // START : If screen is bigger as 540 px do magnetic
  if (window.innerWidth > 540) {
    // Mouse Reset
    magnets.forEach((magnet) => {
      magnet.addEventListener("mousemove", moveMagnet);

      magnet.addEventListener("mouseleave", function (event) {
        gsap.to(event.currentTarget, 1.5, {
          x: 0,
          y: 0,
          ease: 'elastic.out(1,0.3)',
        });
        /*
        gsap.to($(this).find(".btn-text"), 1.5, {
          x: 0,
          y: 0,
          ease: Elastic.easeOut,
        });
        */
      });
    });

    // Mouse move
    function moveMagnet(event) {
      var magnetButton = event.currentTarget;
      var bounding = magnetButton.getBoundingClientRect();
      //var magnetsStrength = magnetButton.getAttribute("data-strength");
      var magnetsStrength = 300;
      //var magnetsStrengthText = magnetButton.getAttribute("data-strength-text");

      gsap.to(magnetButton, 1.5, {
        x: ((event.clientX - bounding.left) / magnetButton.offsetWidth - 0.5) *
          magnetsStrength,
        y: ((event.clientY - bounding.top) / magnetButton.offsetHeight - 0.5) *
          magnetsStrength,
        rotate: "0.001deg",
        ease: 'power3.easeOut',
      });
      /*
      gsap.to($(this).find(".btn-text"), 1.5, {
        x:
          ((event.clientX - bounding.left) / magnetButton.offsetWidth - 0.5) *
          magnetsStrengthText,
        y:
          ((event.clientY - bounding.top) / magnetButton.offsetHeight - 0.5) *
          magnetsStrengthText,
        rotate: "0.001deg",
        ease: Power4.easeOut,
      });
      */
    }
  } // END : If screen is bigger as 540 px do magnetic
}













// Add event listener to play sound on canvas click check to see if canvas exists first
if (canvas) {
  canvas.addEventListener('click', () => {
    playAudio('/sounds/click.mp3');
  });
}


// Function to set active nav link based on current path

function setActiveNavByPath() {
    const currentPath = window.location.pathname;
    const currentPathParts = currentPath.split('/').filter(part => part !== '');
    const navLinks = document.querySelectorAll('#con-nav a');

        // If no links found, try again after a short delay
    if (navLinks.length === 0) {
        console.log('No nav links found, retrying in 500ms...');
        setTimeout(setActiveNavByPath, 500);
        return;
    }

    initMagneticButtons();
    
    navLinks.forEach(link => {

        if (!link.href) return;
        
        const linkUrl = new URL(link.href);
        const linkPath = linkUrl.pathname;
        const linkPathParts = linkPath.split('/').filter(part => part !== '');
        
        // Check different matching scenarios
        let isActive = false;
        
        // Exact path match
        if (currentPath === linkPath) {
            isActive = true;
        }
        // Home page special case
        else if (currentPath === '/' && linkPath === '/') {
            isActive = true;
        }
        // Partial match - current path starts with link path (for parent pages)
        else if (currentPath.startsWith(linkPath) && linkPath !== '/') {
            isActive = true;
        }
        
        if (isActive) {
            link.classList.add('active');
            console.log('Active link set:', link.href);
        }
    });

    const menuButton = document.getElementById('con-menu');
const nav = document.getElementById('con-buttons');
const close = document.getElementById('con-close');



if (menuButton && nav && close) {

  const rollTarget = document.getElementById('con-roll');

const hoverTl = gsap.timeline({ paused: true });
hoverTl.to(rollTarget, { width: "50px", borderWidth: 0, padding: 0, gap: "10px", ease: 'power4.out', duration: 0.3 }, 0);

menuButton.addEventListener('mouseenter', () => hoverTl.play());
menuButton.addEventListener('mouseleave', () => hoverTl.reverse());






  menuButton.addEventListener('click', () => {
    if (nav.style.display === 'flex') {
      // Already open
    } else {
      nav.style.display = 'flex';
      menuButton.style.display = 'none';

      // SET INITIAL STATE OF SPANS IMMEDIATELY
      gsap.set(nav.querySelectorAll('a span'), {
        opacity: 0,
        y: '150%'
      });
      
      gsap.fromTo(nav, 
        { opacity: 0, y: '-10%' }, 
        { 
          duration: 0.5, 
          opacity: 1, 
          y: '0%', 
          ease: 'power4.out', 
          onComplete: () => {
            // Animate all spans inside the nav links after nav animation completes
            gsap.fromTo(nav.querySelectorAll('a span'),
              {
                opacity: 0,
                y: '100%'
              },
              {
                duration: 0.6,
                opacity: 1,
                y: '0%',
                stagger: 0.1, // Stagger each span by 0.1 seconds
                ease: 'back.out(1.2)'
              }
            );
          }
        }
      );
    }
  });
  
  close.addEventListener('click', () => {
    menuButton.style.display = 'flex';
    
    // Reverse the span animations first
    gsap.to(nav.querySelectorAll('a span'), {
      duration: 0.3,
      opacity: 0,
      y: '100%',
      stagger: 0.05,
      ease: 'power4.in',
      onComplete: () => {
        // Then close the nav
        gsap.to(nav, { 
          opacity: 0, 
          duration: 0.5, 
          y: '-10%', 
          ease: 'power4.out', 
          onComplete: () => {
            nav.style.display = 'none';
          }
        });
      }
    });
  });
}
}

// Run when page loads
document.addEventListener('DOMContentLoaded', setActiveNavByPath);







