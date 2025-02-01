import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
gsap.registerPlugin(SplitText, ScrollTrigger);

const subt_3_elements = document.querySelectorAll('[data-filter]');
const previewWrapper = document.querySelector(".preview-wrapper");

subt_3_elements.forEach(element => {
    const subt_3_split = new SplitText(element, {
        type: "lines,words",
        linesClass: "lines-js",
        wordsClass: "word-js"
    });

    gsap.from(subt_3_split.words, {
        scrollTrigger: {
            trigger: element,
            start: 'top 85%',
        },
        duration: 1.8,
        yPercent: 100,
        ease: 'expo.out',
        stagger: {each: '0.05', from: 'random'}
    });
});

document.querySelectorAll('[data-red]').forEach(element => {
  const split = new SplitText(element, {
      type: "chars,words",
      charsClass: "char-js",
      wordsClass: "word-js"
  });

  const chars = split.chars;

  gsap.set(chars, { scale: 0.85 });

  gsap.timeline({
      scrollTrigger: {
          trigger: element,
          start: 'top 95%'
      }
  })
  .from(chars, { duration: 1, x: 25, yPercent: 20, ease: 'power3.inOut', stagger: 0.03 })
  .to(chars,  { duration: 0.5, scale: 1.5, color: "red", ease: 'linear', stagger: 0.03 }, 0)
  .to(chars,  { delay: 0.5, duration: 0.5, scale: 1, color: "#f4f3e3", ease: 'linear', stagger: 0.03 }, 0);
});




document.querySelectorAll(".row-2").forEach(row => {
  const previewWrapper = row.querySelector(".preview-wrapper");

  ScrollTrigger.create({
      trigger: row,
      start: "top 50%",
      end: "bottom 50%",
      onEnter: () => {
          previewWrapper.style.display = "block";
          row.classList.add('active');
      },
      onLeave: () => {
          previewWrapper.style.display = "none";
          row.classList.remove('active');
      },
      onEnterBack: () => {
          previewWrapper.style.display = "block";
          row.classList.add('active');
      },
      onLeaveBack: () => {
          previewWrapper.style.display = "none";
          row.classList.remove('active');
      }
  });
});


// const races = document.querySelector(".races");

// function getScrollAmount() {
//   let racesWidth = races.scrollWidth;
//   return -(racesWidth - window.innerWidth);
// }

// ScrollTrigger.create({
//   trigger: ".raceswrapper",
//   start: "top 15%",
//   end: () => `+=${getScrollAmount() * -1}`,
//   pin: true,
//   scrub: 1,
//   invalidateOnRefresh: true,
//   // markers: true,
//   animation: gsap.to(races, {
//     x: getScrollAmount,
//     ease: "none"
//   })
// });
