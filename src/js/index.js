// main entry point (e.g., src/js/index.js)

import "../styles/index.css";
import { initPageRouter } from "./utils/pageRouter";
import { ScrollSmoother } from "gsap/ScrollSmoother";
gsap.registerPlugin(ScrollSmoother);
document.addEventListener("DOMContentLoaded", () => {
  initPageRouter();
  const smoother = ScrollSmoother.create({
    smooth: 30,
});
});
console.log('prouttttt')
