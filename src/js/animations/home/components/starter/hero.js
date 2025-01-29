// import { gsap } from "gsap";
// import { SplitText } from "gsap/SplitText";
// gsap.registerPlugin(SplitText);
// document.addEventListener("DOMContentLoaded", (event) => {
//   const $counter_loader = document.querySelector(".counter-preloader");
//   const $imgs = document.querySelectorAll(".content__each img");
//   const length_imgs = $imgs.length;
//   const $splitHeading = new SplitText(".hero-heading", { type: "chars" });
//   const $splitSub = new SplitText(".hero-sub", { type: "chars" });
//   let to_load = 0

//   const tl_loaded = gsap.timeline()
//     .to($counter_loader, { duration: .6, autoAlpha: 0, ease: 'power2.inOut' })
//     .from(splitSub.chars, {
//       duration: 0.5,
//       y: '100%',
//       filter: "blur(25px)",
//       autoAlpha: 0,
//       stagger: {
//         each: 0.02,
//         from: "start",
//       }
//     })
//     .from(splitHeading.chars, {
//       duration: 1.,
//       filter: "blur(18px)",
//       scale: 0.9,
//       autoAlpha: 0,
//       stagger: {
//         each: 0.01,
//         from: "random",
//       }
//     }, "<")


//     .from('.hero-background-video', {
//       duration: 1.5,
//       y: '100%',
//       scale: 0,
//       ease: 'power3.out',
//       clipPath: 'inset(50% round 200rem)',
//     }, "<38%")

//     .from('.hero-top-block > *', {
//       duration: 0.9,
//       opacity: 0, ease: 'power3.out'
//     })

//   function itemLoaded() {
//     to_load++;
//     const percentage_loaded = ((to_load / length_imgs) * 100).toFixed(0);
//     $counter_loader.textContent = `${percentage_loaded}%`;
//     console.log(percentage_loaded);

//     if (to_load == length_imgs) {
//       console.log('Website is fully loaded')
//       tl_loaded.play(0)
//     }
//   }

//   function preloadImage(image) {
//     return new Promise((resolve) => {
//       image.onload = resolve;
//     });
//   }

//   $imgs.forEach(img => {
//     img.src = `${img.dataset.src}`;
//     preloadImage(img).then(() => {
//       // Image have loaded.
//       console.log(img.src);
//       itemLoaded();
//     });
//   });


//   document.querySelector(".master_preloader").remove();

// });
import { gsap } from "gsap";
document.addEventListener("DOMContentLoaded", (event) => {
    const $counter_loader = document.querySelector(".counter-preloader");
    const $imgs = document.querySelectorAll(".content__each img");
    const length_imgs = $imgs.length;
    let to_load = 0;


    const tl_loaded = gsap.timeline({ paused: true })
        .to($counter_loader, { duration: .6, autoAlpha: 0, ease: 'power2.inOut' })
        .from('.hero-section', { duration: 3.6, background: 'green', clipPath: 'inset(calc(50% - 4vw) round 3rem)', ease: 'expo.inOut' }, "<30%")
        // .from('.bg', { duration: 3.6, clipPath: 'inset(50% round 1rem)', ease: 'expo.inOut' }, "<")
        // .from('.content__each', {
        //     duration: 2.5, scale: 0, ease: 'power3.out', stagger: {
        //         each: 0.15, from: 'center', grid: [4, 8]
        //     }
        // }, "<38%")
        // .from('.texts > *', { duration: 2, opacity: 0, y: 150, ease: 'power3.out', stagger: 0.15 }, "<25%")

    function itemLoaded() {
        to_load++;
        const percentage_loaded = ((to_load / length_imgs) * 100).toFixed(0);
        $counter_loader.textContent = `${percentage_loaded}%`;
        console.log(percentage_loaded);

        if (to_load == length_imgs) {
            console.log('Website is fully loaded')
            tl_loaded.play(0)
        }
    }

    function preloadImage(image) {
        return new Promise((resolve) => {
            image.onload = resolve;
        });
    }

    $imgs.forEach(img => {
        img.src = `${img.dataset.src}`;
        preloadImage(img).then(() => {
            // Image have loaded.
            console.log(img.src);
            itemLoaded();
        });
    });


    document.querySelector(".master_preloader").remove();
});
