# Spotify Web Player Clone 🎵

A fully interactive, frontend-only Spotify Web Player clone built using HTML, CSS, and Vanilla JavaScript.This project dynamically loads playlists and song metadata from local directories via an asynchronous JSON manifest andhandles audio control natively in the browser.

## 🚀 Live Demo
https://spotify-livid-one.vercel.app/

---

## ✨ Features
* Fully Responsive Design : Seamless layout adjustments across all screen sizes (Mobile, Tablet, Desktop) using fluid grids,flexible flexbox rules, and breakpoints.
* Sliding Mobile Sidebar Drawer: A hidden responsive navigation drawer that slides in on mobile devices when clicking the hamburger menu andslides out when clicking the close button.
* Dynamic Playlist Loading: Fetches playlists and album metadata asynchronously from a JSON manifest.
* Custom Audio Playbar: Fully styled audio player controls (Play, Pause, Previous, Next, Seekbar).
* Custom Seekbar: Drag or click on the progress bar to skip to any part of the song.
* Interactive Volume Controls: Smooth volume adjustment slider with a one-click mute/unmute toggle.
* Premium Dark Mode Theme: Modeled closely after Spotify's signature black and green user interface.

---

## 🛠️ Tech Stack
* **Markup**: HTML5 (semantic layout)
* **Styling**: Vanilla CSS3 (custom layouts, scrollbars, media queries)
* **Logic**: JavaScript ES6 (Asynchronous Fetch API, HTML5 Audio API, event delegation)

---

## 📂 Project Structure
```text
├── Css/
│   ├── style.css       # Main stylesheet (layout, theme, card grid)
│   └── utility.css     # Utility classes (flex, spacing, custom scrollbar)
├── img/                # Icon and UI assets (SVG format)
├── JavaScript/
│   └── script.js       # Core audio engine and player logic
├── songs/              # Audio directories grouped by album
|
├── index.html          # Main HTML page structure
├── favicon.ico         # Page favicon
└── README.md           # Project documentation
