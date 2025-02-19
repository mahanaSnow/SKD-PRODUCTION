import { gsap } from "gsap";


export function initWorkStarter() {
  // Assurez-vous que le DOM est entièrement chargé
  function init() {
    /* ------------------------------------------
     * INITIALISATION & ANIMATIONS DES .frame-item
     * ------------------------------------------ */
    const frameItems = document.querySelectorAll('.frame-item');
    frameItems.forEach(frameItem => {
      // Initialisation
      gsap.set(frameItem, { yPercent: -20, opacity: 0 });
      const img = frameItem.querySelector('.frame-image img');
      if (img) {
        gsap.set(img, { opacity: 0.5 });
      }

      // Gestion du hover
      frameItem.addEventListener("mouseenter", () => {
        const frameImage = frameItem.querySelector('.frame-image img');
        const frameEyebrow = frameItem.querySelector('.frame-eyebrow');
        gsap.killTweensOf([frameItem, frameImage, frameEyebrow]);
        gsap.to(frameItem, { yPercent: -10, duration: 0.25, ease: "power4.out" });
        gsap.to(frameImage, { opacity: 1, duration: 0.2, delay: 0.2, ease: "power4.out" });
        gsap.to(frameEyebrow, { opacity: 1, duration: 0.2, delay: 0.2, ease: "power4.out" });
      });
      frameItem.addEventListener("mouseleave", () => {
        const frameImage = frameItem.querySelector('.frame-image img');
        const frameEyebrow = frameItem.querySelector('.frame-eyebrow');
        gsap.killTweensOf([frameItem, frameImage, frameEyebrow]);
        gsap.to(frameItem, { yPercent: 30, duration: 0.25, ease: "power4.in" });
        gsap.to(frameImage, { opacity: 0.5, duration: 0.2, ease: "power4.in" });
        gsap.to(frameEyebrow, { opacity: 0, duration: 0.2, ease: "power4.in" });
      });
    });

    /* ------------------------------------------
     * GESTION DU BOUTON "MORE INFO"
     * ------------------------------------------ */
    const infoButtons = document.querySelectorAll('.info-button');
    infoButtons.forEach(infoButton => {
      infoButton.addEventListener("click", (e) => {
        e.stopPropagation();
        // On cherche le .info-content dans le même parent
        const infoContent = infoButton.parentElement.querySelector('.info-content');
        const p = infoButton.querySelector("p");
        if (p && p.textContent.trim() === "DÉTAILS") {
          p.textContent = "FERMER";
          gsap.to(infoContent, {
            opacity: 1,
            clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
            duration: 1,
            ease: "power4.inOut",
            onComplete: () => {
              infoContent.style.clipPath = "polygon(0 0, 100% 0, 100% 100%, 0 100%)";
            }
          });
        } else {
          if (p) p.textContent = "DÉTAILS";
          gsap.to(infoContent, {
            opacity: 1,
            clipPath: "polygon(100% 100%, 100% 100%, 100% 100%, 100% 100%)",
            duration: 1,
            ease: "power4.inOut",
            onComplete: () => {
              infoContent.style.clipPath = "polygon(0 0, 0 0, 0 0, 0 0)";
            }
          });
        }
      });
    });

    /* ------------------------------------------
     * GESTION DE LA VIDÉO ET DES ANIMATIONS ASSOCIÉES
     * ------------------------------------------ */
    const video = document.getElementById("mainVideo");
    const timestamp = document.querySelector(".timestamp");
    const timestampWrapper = document.querySelector(".video-timestamp");
    const overlay = document.querySelector(".overlay");
    const videoFrames = document.querySelector(".video-frames");
    const videoMarker = document.querySelector(".video-marker");
    const cursor = document.querySelector(".cursor");
    const cursorText = cursor ? cursor.querySelector("p") : null;
    const muteSpan = document.querySelector(".mute-span");
    const videoPlayback = document.querySelector(".video-playback");
    const timeline = document.querySelector(".video-timeline");

    let markerTween;
    let isPlaying = false;

    function formatTime(seconds) {
      const minutes = Math.floor(seconds / 60);
      const secs = Math.floor(seconds % 60);
      return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
    }

    function updateTimestamp() {
      if (video && timestamp) {
        const remainingTime = video.duration - video.currentTime;
        timestamp.textContent = formatTime(remainingTime);
      }
    }

    function startMarkerTween() {
      if (!video || !videoMarker) return;
      if (markerTween) markerTween.kill();
      markerTween = gsap.fromTo(videoMarker,
        { width: `${(video.currentTime / video.duration) * 100}vw` },
        { width: '100vw', duration: video.duration - video.currentTime, ease: 'linear' }
      );
      if (video.paused) markerTween.pause();
    }

    function moveMarkerToPosition() {
      if (!video || !videoMarker) return;
      gsap.to(videoMarker, {
        width: `${(video.currentTime / video.duration) * 100}vw`,
        duration: 0.5,
        ease: "power4.inOut"
      });
    }

    function introAnimation() {
      if (!video || !timestampWrapper) return;
      const videoDuration = video.duration;
      const introTimeline = gsap.timeline({
        onComplete: () => {
          gsap.to(timestampWrapper, {
            duration: 0.5,
            delay: 0.5,
            onComplete: () => {
              gsap.to(overlay, { opacity: 1, duration: 1 });
              gsap.delayedCall(0.5, () => {
                video.play();
                startMarkerTween();
                gsap.to(videoMarker, { opacity: 1, duration: 1, delay: 1 });
                gsap.to(cursor, { opacity: 1, duration: 1, delay: 1 });
                gsap.to(videoPlayback, { opacity: 1, duration: 1, delay: 1 });
                gsap.to(document.querySelectorAll(".info-button"), { opacity: 1, duration: 1, delay: 1 });
                gsap.to(document.querySelectorAll(".info-content"), { opacity: 1, duration: 1, delay: 1 });
                gsap.to(videoFrames, {
                  borderTopColor: "rgba(255, 255, 255, 1)",
                  borderBottomColor: "rgba(255, 255, 255, 1)",
                  duration: 1, delay: 1
                });
              });
            }
          });
        }
      });

      // Animation "dummy" sur timestampWrapper pour piloter la timeline
      introTimeline.fromTo(timestampWrapper, { dummy: 0 }, {
        dummy: 1,
        duration: 1.5,
        ease: "linear",
        onUpdate: () => {
          const elapsed = introTimeline.time() * (videoDuration / 1.5);
          timestamp.textContent = formatTime(elapsed);
        },
        onStart: () => {
          gsap.to(document.querySelectorAll(".frame-item"), { opacity: 1, duration: 0.5, stagger: 0.2 });
        },
        onComplete: () => {
          gsap.delayedCall(0.5, () => {
            gsap.to(document.querySelectorAll(".frame-item"), { yPercent: 30, duration: 0.5, stagger: 0.1 });
          });
        }
      });
    }

    function updateMuteStatus() {
      if (muteSpan && video) {
        muteSpan.textContent = video.muted ? "OFF" : "ON";
      }
    }

    if (video) {
      video.addEventListener("loadedmetadata", () => {
        video.muted = true;
        updateTimestamp();
        video.currentTime = 0;
        introAnimation();
      });

      video.addEventListener("timeupdate", () => {
        updateTimestamp();
        if (!video.paused && videoMarker) {
          const percentage = (video.currentTime / video.duration) * 100;
          videoMarker.style.width = `${percentage}vw`;
        }
      });

      if (timeline) {
        timeline.addEventListener("click", (e) => {
          e.stopPropagation();
          const rect = timeline.getBoundingClientRect();
          const clickPosition = e.clientX - rect.left;
          const percentage = clickPosition / rect.width;
          video.currentTime = percentage * video.duration;
          moveMarkerToPosition();
          updateTimestamp();
        });
      }

      document.addEventListener("click", (e) => {
        if (!timeline.contains(e.target)) {
          if (isPlaying) {
            video.pause();
            if (cursorText) cursorText.textContent = "Play";
            if (markerTween) markerTween.pause();
          } else {
            video.play();
            if (cursorText) cursorText.textContent = "Pause";
            if (markerTween) markerTween.play();
          }
          isPlaying = !isPlaying;
        }
      });

      document.addEventListener("mousemove", (e) => {
        if (cursor) {
          cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
        }
      });

      video.addEventListener("play", () => {
        if (cursorText) cursorText.textContent = "Pause";
        isPlaying = true;
        startMarkerTween();
      });

      video.addEventListener("pause", () => {
        if (cursorText) cursorText.textContent = "Play";
        isPlaying = false;
        if (markerTween) markerTween.pause();
      });

      video.addEventListener("seeked", () => {
        updateTimestamp();
        moveMarkerToPosition();
        if (!video.paused) startMarkerTween();
      });

      video.addEventListener("ended", () => {
        video.currentTime = 0;
        video.play();
        startMarkerTween();
      });

      if (videoPlayback) {
        videoPlayback.addEventListener("click", (e) => {
          e.stopPropagation();
          video.muted = !video.muted;
          if (muteSpan) {
            muteSpan.textContent = muteSpan.textContent === "ON" ? "OFF" : "ON";
          }
        });
      }

      document.querySelector(".video-timestamp")?.addEventListener("click", (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const newTime = (clickX / rect.width) * video.duration;
        video.currentTime = newTime;
        updateTimestamp();
        moveMarkerToPosition();
        if (!video.paused) startMarkerTween();
      });

      document.querySelector(".video-frames")?.addEventListener("click", (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const newTime = (clickX / rect.width) * video.duration;
        video.currentTime = newTime;
        updateTimestamp();
        moveMarkerToPosition();
        if (!video.paused) startMarkerTween();
      });

      updateMuteStatus();
    }
  } // fin de init()

  // On appelle init() dès que le DOM est prêt
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
}

// Pour tester, vous pouvez appeler initWorkStarter() dans votre module principal
// Exemple dans main.js :
// import { initWorkStarter } from './workStarter.js';
// initWorkStarter();
