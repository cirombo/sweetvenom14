// STARDUST BBS — index page behavior

document.addEventListener("DOMContentLoaded", () => {
  // Fake hit counter, persisted per-browser via localStorage.
  // Swap this later for a real counter/API if you want actual visitor stats.
  const hitNumberEl = document.getElementById("hitNumber");
  if (hitNumberEl) {
    const STORAGE_KEY = "stardust_hits";
    let hits = parseInt(localStorage.getItem(STORAGE_KEY), 10);
    if (isNaN(hits)) hits = 41200; // starting "vintage" number, feel free to change
    hits += 1;
    localStorage.setItem(STORAGE_KEY, hits);
    hitNumberEl.textContent = String(hits).padStart(6, "0");
  }

  // Duplicate the marquee content once so the CSS scroll loop has no visible seam.
  const track = document.querySelector(".marquee-track");
  if (track && !track.dataset.doubled) {
    track.innerHTML += track.innerHTML;
    track.dataset.doubled = "true";
  }
});
