import { gsap } from 'gsap';

export function flickerOnLoad(element, delay = 0) {
  const flickerTl = gsap.timeline({ delay: delay });
  

  
  flickerTl.set(element, { opacity: 0 });
  
  const flickerCount = 30;
  
  for (let i = 0; i < flickerCount; i++) {
    // Exponential slowdown - flickers get much longer towards the end
    const progress = i / (flickerCount - 1); // 0 to 1
    const duration = 0.02 + (Math.pow(progress, 2) * 0.3); // 0.02s to 0.32s
    
    // More dramatic opacity swings at first, more subtle towards the end
    const opacityRange = 1 - (progress * 0.7); // 1.0 to 0.3 range
    const baseOpacity = 0.5 + (progress * 0.5); // 0.5 to 1.0 base
    const opacity = baseOpacity + ((Math.random() - 0.5) * opacityRange);
    
    flickerTl.to(element, {
      opacity: Math.max(0.1, Math.min(1, opacity)), // Clamp between 0.1-1
      duration: duration,
      ease: "sine.inOut"
    });
  }
  
  // Final stabilization
  flickerTl.to(element, {
    opacity: 1,
    duration: 4.2,
    ease: "power4.out"
  });
}