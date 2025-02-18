// Exemple : src/main.js

import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

document.addEventListener("DOMContentLoaded", () => {
  console.log("ViteJS script loaded (no jQuery)!");

  // ------------------------------------------
  // 1) Frame Items : Initial states + Hover
  // ------------------------------------------
  const frameItems = document.querySelectorAll(".frame-item");

  // Set initial states
  frameItems.forEach((frameItem) => {
    gsap.set(frameItem, { yPercent: -20, opacity: 0 });
    const frameImage = frameItem.querySelector(".frame-image img");
    if (frameImage) {
      gsap.set(frameImage, { opacity: 0.5 });
    }
  });

  // Hover animation
  frameItems.forEach((frameItem) => {
    frameItem.addEventListener("mouseenter", () => {
      const frameImage = frameItem.querySelector(".frame-image img");
      const frameEyebrow = frameItem.querySelector(".frame-eyebrow");

      gsap.killTweensOf([frameItem, frameImage, frameEyebrow]); // Stop old tweens

      gsap.to(frameItem, { yPercent: -10, duration: 0.25, ease: "power4.out" });
      gsap.to(frameImage, { opacity: 1, duration: 0.2, delay: 0.2, ease: "power4.out" });
      gsap.to(frameEyebrow, { opacity: 1, duration: 0.2, delay: 0.2, ease: "power4.out" });
    });

    frameItem.addEventListener("mouseleave", () => {
      const frameImage = frameItem.querySelector(".frame-image img");
      const frameEyebrow = frameItem.querySelector(".frame-eyebrow");

      gsap.killTweensOf([frameItem, frameImage, frameEyebrow]); // Stop old tweens

      gsap.to(frameItem, { yPercent: 30, duration: 0.25, ease: "power4.in" });
      gsap.to(frameImage, { opacity: 0.5, duration: 0.2, ease: "power4.in" });
      gsap.to(frameEyebrow, { opacity: 0, duration: 0.2, ease: "power4.in" });
    });
  });

  // ------------------------------------------
  // 2) More Info button (clipPath)
  // ------------------------------------------
  const infoButtons = document.querySelectorAll(".info-button");
  infoButtons.forEach((infoButton) => {
    infoButton.addEventListener("click", (e) => {
      e.stopPropagation(); // Empêche d'interagir avec la vidéo si c'est le cas
      const infoContent = infoButton.nextElementSibling; // Suppose .info-content est juste après .info-button
      const textEl = infoButton.querySelector("p");

      if (!infoContent || !textEl) return;

      if (textEl.textContent === "DÉTAILS") {
        textEl.textContent = "FERMER";
        gsap.to(infoContent, {
          opacity: 1,
          clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
          duration: 1,
          ease: "power4.inOut",
          onComplete: () => {
            infoContent.style.clipPath = "polygon(0 0, 100% 0, 100% 100%, 0 100%)";
          },
        });
      } else {
        textEl.textContent = "DÉTAILS";
        gsap.to(infoContent, {
          opacity: 1,
          clipPath: "polygon(100% 100%, 100% 100%, 100% 100%, 100% 100%)",
          duration: 1,
          ease: "power4.inOut",
          onComplete: () => {
            infoContent.style.clipPath = "polygon(0 0, 0 0, 0 0, 0 0)";
          },
        });
      }
    });
  });

  // ------------------------------------------
  // 3) Vidéo et timeline
  // ------------------------------------------
  const video = document.getElementById("mainVideo");
  if (video) {
    const timestamp = document.querySelector(".timestamp");
    const timestampWrapper = document.querySelector(".video-timestamp");
    const overlay = document.querySelector(".overlay");
    const videoFrames = document.querySelector(".video-frames");
    const videoMarker = document.querySelector(".video-marker");
    const cursor = document.querySelector(".cursor");
    const cursorText = cursor?.querySelector("p");
    const muteSpan = document.querySelector(".mute-span");
    const videoPlayback = document.querySelector(".video-playback");
    const timeline = document.querySelector(".video-timeline");

    let markerTween;
    let isPlaying = false;

    function formatTime(seconds) {
      const minutes = Math.floor(seconds / 60);
      const secs = Math.floor(seconds % 60);
      return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
    }

    function updateTimestamp() {
      const remainingTime = video.duration - video.currentTime;
      if (timestamp) {
        timestamp.textContent = formatTime(remainingTime);
      }
    }

    function startMarkerTween() {
      if (markerTween) markerTween.kill();
      markerTween = gsap.fromTo(
        videoMarker,
        { width: `${(video.currentTime / video.duration) * 100}vw` },
        { width: "100vw", duration: video.duration - video.currentTime, ease: "linear" }
      );
      if (video.paused) {
        markerTween.pause();
      }
    }

    function moveMarkerToPosition() {
      gsap.to(videoMarker, {
        width: `${(video.currentTime / video.duration) * 100}vw`,
        duration: 0.5,
        ease: "power4.inOut",
      });
    }

    function introAnimation() {
      const videoDuration = video.duration;
      const introTimeline = gsap.timeline({
        onComplete: () => {
          // Move timestamp to top
          gsap.to(timestampWrapper, {
            duration: 0.5,
            delay: 0.5,
            onComplete: () => {
              // Fade in overlay & start video
              gsap.to(overlay, { opacity: 1, duration: 1 });
              gsap.delayedCall(0.5, () => {
                video.play();
                startMarkerTween();
                // Fade in marker, cursor, playback, info-button
                gsap.to(videoMarker, { opacity: 1, duration: 1, delay: 1 });
                gsap.to(cursor, { opacity: 1, duration: 1, delay: 1 });
                gsap.to(videoPlayback, { opacity: 1, duration: 1, delay: 1 });
                gsap.to(".info-button", { opacity: 1, duration: 1, delay: 1 });
                gsap.to(".info-content", { opacity: 1, duration: 1, delay: 1 });
                // Fade in borders
                gsap.to(videoFrames, {
                  borderTopColor: "rgba(255, 255, 255, 1)",
                  borderBottomColor: "rgba(255, 255, 255, 1)",
                  duration: 1,
                  delay: 1,
                });
              });
            },
          });
        },
      });

      // Count up timestamp & move it
      introTimeline.to(timestampWrapper, {
        duration: 1.5,
        ease: "linear",
        onUpdate: () => {
          const elapsed = introTimeline.time() * (videoDuration / 1.5);
          if (timestamp) timestamp.innerText = formatTime(elapsed);
        },
        onStart: () => {
          // Fade in frame items
          gsap.to(".frame-item", {
            opacity: 1,
            duration: 0.5,
            stagger: 0.2,
          });
        },
        onComplete: () => {
          // Hold final count
          gsap.delayedCall(0.5, () => {
            // Animate frame items from yPercent: -20 to yPercent: 30
            gsap.to(".frame-item", {
              yPercent: 30,
              duration: 0.5,
              stagger: 0.1,
            });
          });
        },
      });
    }

    function updateMuteStatus() {
      if (muteSpan) {
        muteSpan.textContent = video.muted ? "OFF" : "ON";
      }
    }

    // Load metadata => run intro
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

    // Timeline click => Seek
    timeline?.addEventListener("click", (e) => {
      e.stopPropagation();
      const rect = timeline.getBoundingClientRect();
      const clickPosition = e.clientX - rect.left;
      const percentage = clickPosition / rect.width;
      video.currentTime = percentage * video.duration;
      moveMarkerToPosition();
      updateTimestamp();
    });

    // Toggle play/pause by clicking outside timeline
    document.addEventListener("click", (e) => {
      if (timeline && timeline.contains(e.target)) return;
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
    });

    // Cursor move
    document.addEventListener("mousemove", (e) => {
      if (cursor) {
        cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
      }
    });

    // Play/Pause events
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
      if (!video.paused) {
        startMarkerTween();
      }
    });

    video.addEventListener("ended", () => {
      video.currentTime = 0;
      video.play();
      startMarkerTween();
    });

    // Toggle mute
    videoPlayback?.addEventListener("click", (e) => {
      e.stopPropagation();
      video.muted = !video.muted;
      updateMuteStatus();
    });

    // Seek using .video-timestamp
    const videoTimestamp = document.querySelector(".video-timestamp");
    videoTimestamp?.addEventListener("click", (e) => {
      const rect = videoTimestamp.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const newTime = (clickX / rect.width) * video.duration;
      video.currentTime = newTime;
      updateTimestamp();
      moveMarkerToPosition();
      if (!video.paused) {
        startMarkerTween();
      }
    });

    // Seek using .video-frames
    const videoFramesEl = document.querySelector(".video-frames");
    videoFramesEl?.addEventListener("click", (e) => {
      const rect = videoFramesEl.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const newTime = (clickX / rect.width) * video.duration;
      video.currentTime = newTime;
      updateTimestamp();
      moveMarkerToPosition();
      if (!video.paused) {
        startMarkerTween();
      }
    });

    // Initial mute status
    updateMuteStatus();
  }
});
