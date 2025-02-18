import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
gsap.registerPlugin(SplitText, ScrollTrigger);

document.querySelectorAll(".row-2").forEach(row => {
  const previewWrapper = row.querySelector(".preview-wrapper");

  gsap.set(previewWrapper, { scale: 0, display: "none" });

  ScrollTrigger.create({
    trigger: row,
    start: "top 50%",
    end: "bottom 50%",
    onEnter: () => {
      gsap.set(previewWrapper, { display: "block" });
      gsap.fromTo(previewWrapper,
        { scale: 0 },
        { scale: 1, duration: 0.15, ease: "power1.out" }
      );
      row.classList.add('active');
    },
    onLeave: () => {
      gsap.to(previewWrapper, {
        scale: 0,
        duration: 0.15,
        ease: "power1.in",
        onComplete: () => gsap.set(previewWrapper, { display: "none" })
      });
      row.classList.remove('active');
    },
    onEnterBack: () => {
      gsap.set(previewWrapper, { display: "block" });
      gsap.fromTo(previewWrapper,
        { scale: 0 },
        { scale: 1, duration: 0.15, ease: "power1.out" }
      );
      row.classList.add('active');
    },
    onLeaveBack: () => {
      gsap.to(previewWrapper, {
        scale: 0,
        duration: 0.15,
        ease: "power1.in",
        onComplete: () => gsap.set(previewWrapper, { display: "none" })
      });
      row.classList.remove('active');
    }
  });
});

console.log('workkkkkkkkkkkksssss');
