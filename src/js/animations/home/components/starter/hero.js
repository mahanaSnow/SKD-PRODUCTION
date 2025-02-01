import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";
import { Draggable } from "gsap/Draggable";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(SplitText, ScrollTrigger, Draggable);
document.addEventListener("DOMContentLoaded", (event) => {
const splitHeading = new SplitText(".hero-heading", { type: "chars" });
const splitSub = new SplitText(".hero-sub", { type: "chars" });

//----------------- HERO LOADER ---------------------//

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

//------------------ Kinetic ----------------//

const n = 19
const rots = [
  { ry: 270, a:0.6 },
  { ry: 0,   a:0.9 },
  { ry: 90,  a:0.45 },
  { ry: 180, a:0.0 }
]

gsap.set(".face", {
  z: 200,
  rotateY: i => rots[i].ry,
  transformOrigin: "50% 50% -201px"
});

for (let i=0; i<n; i++){
  let die = document.querySelector('.die')
  let cube = die.querySelector('.cube')

  if (i>0){
    let clone = document.querySelector('.die').cloneNode(true);
    document.querySelector('.tray').append(clone);
    cube = clone.querySelector('.cube')
  }

  gsap.timeline({repeat:-1, yoyo:true, defaults:{ease:'power3.inOut', duration:1}})
  .fromTo(cube, {
    rotateY:-90
  },{
    rotateY:90,
    ease:'power1.inOut',
    duration:2
  })
  .fromTo(cube.querySelectorAll('.face'), {
    color: (j) => 'rgb(19, 19, 21, ' + (100 * [rots[3].a, rots[0].a, rots[1].a][j]) + '%)'  // Noir #131315
  }, {
    color: (j) => 'rgb(244, 243, 227, ' + (100 * [rots[0].a, rots[1].a, rots[2].a][j]) + '%)' // Blanc #f4f3e3
  }, 0)
  .to(cube.querySelectorAll('.face'), {
    color: (j) => 'rgb(248, 244, 235, ' + (100 * [rots[1].a, rots[2].a, rots[3].a][j]) + '%)' // Blanc principal #f8f4eb
  }, 1)
  .progress(i/n)
}

gsap.timeline()
  .from('.tray', {yPercent:-3, duration:1, ease:'power1.inOut', yoyo:true, repeat:-1}, 0)
  .fromTo('.tray', {rotate:-1},{rotate:1, duration:1, ease:'power1.inOut', yoyo:true, repeat:-1}, 0)
  .from('.die', {duration:0.01, opacity:0.3, stagger:{each:-0.05, ease:'power1.in'}}, 0)
  .to('.tray', {scale:1.2, duration:3, ease:'power3.inOut', yoyo:true, repeat:-1}, 0)

window.onload = window.onresize = ()=> {
  const h = n*66
  gsap.set('.tray', {height:h})
  gsap.set('.pov', {scale:innerHeight/h})
}

//----------------- DRAG --------------//
gsap.utils.toArray("#Drag").forEach((drag) => {
  let moodboard = document.querySelector(".inner-moodboard");


  Draggable.create(drag, {
    bounds:moodboard,
    inertia: true,
    dragClickables: true,
  });
});

// --------------DRAG-Animation-ScrollTrigger-------------//

gsap.from("#Drag", {
  scrollTrigger: {
    trigger: ".mood-wrapper",
    start:"top 40%",
    // markers:'true',
  },
  duration: 1,
  left: "25%",
   top: "25%",
  scale: 0,
  opacity: 0,
  stagger:0.03,
  ease: "power2.out",

});



function initTextureReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !entry.target.classList.contains('revealed')) {
        const element = entry.target;
        const text = element.textContent.trim();
        const slices = element.dataset.slices || 10;
        const color = element.dataset.color || 'white';
        const className = element.dataset.class || 'null';

        element.textContent = '';
        makeWordInElement(text, parseInt(slices), element, color, 0, className);
        element.classList.add('revealed');
      }
    });
  }, {
    threshold: 0.5
  });

  document.querySelectorAll('[data-texture]').forEach(element => observer.observe(element));
}

function makeWordInElement(word, slices, targetElement, color = 'white', offset = 0, className = 'null') {
  const wrapper = document.createElement('div');
  wrapper.classList.add('wrapper');

  const template = document.createElement('div');
  template.classList.add('template');
  template.textContent = word;
  wrapper.appendChild(template);

  for (let i = 0; i < slices; i++) {
    const slice = document.createElement('div');
    slice.classList.add('slice', `slice-${i}`, className);
    slice.style.color = color;
    slice.style.animationDelay = `${0.1 * i + offset}s`;

    const mask = document.createElement('div');
    mask.classList.add('mask');

    mask.style.height = `${(100 / slices) + 0.01}%`;
    mask.style.top = `${(i / slices * 100)}%`;

    const content = document.createElement('div');
    content.classList.add('content');
    content.textContent = word;
    content.style.transform = `translate3d(0, -${i / slices * 100}%, 0)`;

    mask.appendChild(content);
    slice.appendChild(mask);
    wrapper.appendChild(slice);
  }

  targetElement.appendChild(wrapper);
}


document.addEventListener('DOMContentLoaded', initTextureReveal);
console.log("dragagarrrr");
