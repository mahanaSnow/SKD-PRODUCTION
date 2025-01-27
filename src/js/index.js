// main entry point (e.g., src/js/index.js)

import "../styles/index.css";
import { initPageRouter } from "./utils/pageRouter";

document.addEventListener("DOMContentLoaded", () => {
  initPageRouter();
});

// import { VFX } from "@vfx-js/core";

// const imgs = document.querySelectorAll("img");
// const vfx = new VFX();

// imgs.forEach((img) => {
//   vfx.add(img, { shader: "glitch", overflow: 100 });
// });

console.log('hello')
