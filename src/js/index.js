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

// import { VFX } from "@vfx-js/core";

// const imgs = document.querySelectorAll("img");
// const vfx = new VFX();

// imgs.forEach((img) => {
//   vfx.add(img, { shader: "glitch", overflow: 100 });
// });
