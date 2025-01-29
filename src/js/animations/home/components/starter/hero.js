import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";
gsap.registerPlugin(SplitText);
document.addEventListener("DOMContentLoaded", (event) => {
const splitHeading = new SplitText(".hero-heading", { type: "chars" });
const splitSub = new SplitText(".hero-sub", { type: "chars" });

  const tl_loaded = gsap.timeline()
  .from('.nav-bar', { duration: 1, y:"-100", clipPath: 'inset(calc(50% - 4vw) round 4rem)', ease: 'power3.out' })
    .from('.hero-section', { duration: 3.6, clipPath: 'inset(calc(50% - 4vw) round 1rem)', ease: 'expo.inOut' }, "<")
    .from('.hero-background-video', { duration: 3.6, clipPath: 'inset(50% round 1rem)', ease: 'expo.inOut' }, "<")
    .from(splitSub.chars, {
      duration: 1,
      opacity: "0",
      scale: 0.9,
      autoAlpha: 0,
      stagger: {
        each: 0.015,
        from: "start",
      }
    }, "<59%")
    .from(splitHeading.chars, {
      duration: 1,
      filter: "blur(18px)",
      scale: 0.9,
      autoAlpha: 0,
      stagger: {
        each: 0.01,
        from: "random",
      }
    }, "<25%")
    .from('.hero-top-block > *', { duration: 2, opacity: 0, ease: 'power3.out' },"<79%")
    document.querySelector(".loader").remove();

});
