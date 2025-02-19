import { gsap } from "gsap";
export function initWorkStarter() {
  console.log("Home Component Starter Initialized");

  gsap.set(".timestamp", {
    color: "#FF0000",
    fontWeight: "bold",
    textShadow: "0 0 2px rgba(255,0,0,0.3)"
});
}
