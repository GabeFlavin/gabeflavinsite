
// Function to load HTML partials
async function loadInclude(selector, file) {
  const response = await fetch(file);
  const html = await response.text();
  document.querySelector(selector).innerHTML = html;
}

// Load navigation and initialize magnetic buttons after it's loaded
async function loadNavigation() {
  await loadInclude('#con-nav', '/partials/nav.html');
  // Initialize magnetic buttons after navigation is loaded
  setTimeout(() => {
    initMagneticButtons();
  }, 100); // Small delay to ensure DOM is updated
}

loadNavigation();

// import GSAP
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Application } from 'https://unpkg.com/@splinetool/runtime@1.9.82/build/runtime.js';

import { flickerOnLoad } from './animations.js';

import Lenis from 'lenis'

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// Declare lenis variable - will be initialized after Unicorn Studio loads
let lenis = null;

// Initialize Lenis with configuration to prevent conflicts
function initLenis() {
    lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        direction: 'vertical',
        gestureDirection: 'vertical',
        smooth: true,
        mouseMultiplier: 1,
        smoothTouch: false,
        touchMultiplier: 2,
        infinite: false,
    });

    // Animation loop
    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    console.log('Lenis initialized');
}





// Magnetic Buttons
// Found via: https://codepen.io/tdesero/pen/RmoxQg

function initMagneticButtons() {


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
      var magnetsStrength = 100;
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
  }
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

    navLinks.forEach(link => {
        // Remove any existing active class first
        link.classList.remove('active');

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
        // Home page special case - check for root path or index.html
        else if (currentPath === '/' && (linkPath === '/' || linkPath === '/index.html')) {
            isActive = true;
        }
        // Mark index.html as active when on root path (no specific HTML page)
        else if ((currentPath === '/' || currentPath === '') && linkPath.endsWith('/index.html')) {
            isActive = true;
        }
        // Check if link points to index.html and current path is root
        else if (linkPath.includes('index.html') && (currentPath === '/' || currentPath === '')) {
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
  hoverTl.to(rollTarget, { width: '70px', borderWidth: 0, padding: 0, background: '#ffffffbf', gap: '10px', ease: 'power4.out', duration: 0.3 }, 0);

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
       y: '250%'
      });
      
      gsap.fromTo(nav, 
        { y: '-10%' }, 
        { 
          duration: 0.5, 
          opacity: 1, 
          y: '0%', 
          ease: 'power4.out', 
          onComplete: () => {
            // Animate all spans inside the nav links after nav animation completes
            gsap.fromTo(nav.querySelectorAll('a span'),
              {
                y: '250%'
              },
              {
                duration: 0.6,
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
      y: '250%',
      stagger: 0.05,
      ease: 'power4.in',
      onComplete: () => {
        // Then close the nav
        gsap.to(nav, { 
          duration: 0.5, 
          opacity: 0,
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
document.addEventListener('DOMContentLoaded', () => {
  setActiveNavByPath();
  initLenis();
  
  // Initialize animations after a short delay to ensure DOM is ready
  setTimeout(() => {
    initParallax();
    initFadeIn();
  }, 100);
});

// flickerOnLoad(document.querySelector('#con-floater'), 2);

    



// GSAP ScrollTrigger Parallax for all elements with 'parallax' class
function initParallax() {
  const parallaxSections = document.querySelectorAll('.parallax');
  
  parallaxSections.forEach((section) => {
    const backgrounds = section.querySelectorAll('.parallax-target');
    
    backgrounds.forEach((bg, index) => {
      // Get speed from rel attribute, or use default calculation
      const relAttribute = bg.getAttribute('rel');
      let speed;
      
      if (relAttribute && !isNaN(parseFloat(relAttribute))) {
        // Use custom speed from rel attribute
        speed = parseFloat(relAttribute);
      } else {
        // Fallback to index-based calculation
        speed = 1.9 + (index * 0.2); // 1.9, 2.1, 2.3, etc.
      }
      
      gsap.fromTo(bg, {
        y: 100 * speed
      }, {
        y: -100 * speed,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top bottom",
          end: "bottom top",
          scrub: 1, // Smooth scrubbing
          invalidateOnRefresh: true
        }
      });
    });
  });
}

// GSAP ScrollTrigger Fade In for all elements with 'fade-in' class
function initFadeIn() {
  const fadeElements = document.querySelectorAll('.fade-in');
  
  fadeElements.forEach((element, index) => {
    // Staggered delay for multiple elements
    const delay = index * 0.1; // 0, 0.1, 0.2, etc seconds
    // gsap set fade in 
    gsap.set(element, {
      opacity: 0,
      y: 10
    });



    gsap.fromTo(element, {
      opacity: 0,
      y: 10 // Start 50px below final position
    }, {
      opacity: 1,
      y: 0,
      duration: 1.8,
      delay: delay,
      ease: "power4.out",
      scrollTrigger: {
        trigger: element,
        start: "top 80%", // Trigger when element is 80% down the viewport
        end: "bottom 20%", // End when element is 20% from bottom
        toggleActions: "play none none reverse", // Play on enter, reverse on leave
        invalidateOnRefresh: true
      }
    });
  });
}



