// Mobile menu toggle
const menuBtn = document.getElementById('menuBtn');
const navLinks = document.getElementById('navLinks');
if (menuBtn && navLinks) {
  menuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('hidden');
  });

  // Hamburger toggle
const menuBtn = document.getElementById("menuBtn");
const navbar = document.getElementById("navbar");

menuBtn.addEventListener("click", () => {
  menuBtn.classList.toggle("active");
  navbar.classList.toggle("active");
});

document.addEventListener('DOMContentLoaded', () => {
  const menuBtn = document.getElementById('menuBtn');
  const navbar  = document.getElementById('navbar');

  if (!menuBtn || !navbar) return;

  // Scroll glow
  const header = document.querySelector('header.nav');
  const onScroll = () => {
    if (window.scrollY > 10) header.classList.add('scrolled');
    else header.classList.remove('scrolled');
  };
  onScroll();
  window.addEventListener('scroll', onScroll);

  // Menu toggle
  menuBtn.addEventListener('click', () => {
    menuBtn.classList.toggle('active');
    navbar.classList.toggle('active');
    document.body.classList.toggle('menu-open');
  });

  // Close menu when a link is clicked
  navbar.querySelectorAll('a').forEach(a =>
    a.addEventListener('click', () => {
      menuBtn.classList.remove('active');
      navbar.classList.remove('active');
      document.body.classList.remove('menu-open');
    })
  );
});

  // Start hidden on small screens
  if (window.innerWidth < 640) navLinks.classList.add('hidden');
  window.addEventListener('resize', () => {
    if (window.innerWidth >= 640) navLinks.classList.remove('hidden');
  });
}
// Add glow effect to navbar on scroll
window.addEventListener("scroll", () => {
  const nav = document.querySelector(".nav");
  if (window.scrollY > 20) {
    nav.classList.add("scrolled");
  } else {
    nav.classList.remove("scrolled");
  }
});

// Navbar under-glow effect on scroll
window.addEventListener("scroll", () => {
  const nav = document.querySelector("header.nav");
  if (window.scrollY > 10) {
    nav.classList.add("scrolled");
  } else {
    nav.classList.remove("scrolled");
  }
});



// --- Contact Form Submit with Popup ---
const form = document.getElementById("contactForm");
const popup = document.getElementById("successPopup");
const closeBtn = document.getElementById("closePopup");

if (form) {
  form.addEventListener("submit", async (e) => {
    e.preventDefault(); // prevent normal form reload

    let formData = new FormData(form);

    try {
      let response = await fetch(form.action, {
        method: "POST",
        body: formData,
        headers: { 'Accept': 'application/json' }
      });

      if (response.ok) {
        form.reset(); // clear inputs
        popup.style.display = "block";

        // Auto-hide after 4 seconds
        setTimeout(() => {
          popup.style.display = "none";
        }, 4000);
      } else {
        showErrorPopup("❌ Something went wrong. Try again!");
      }
    } catch (err) {
      showErrorPopup("⚠️ Network error. Please try again.");
      console.error(err);
    }
  });
}

// --- Close popup manually with X button ---
if (closeBtn) {
  closeBtn.addEventListener("click", () => {
    popup.style.display = "none";
  });
}

// --- Optional error popup handler (same style as success) ---
function showErrorPopup(message) {
  popup.innerHTML = `<span id="closePopup" class="close-btn">✖</span><p>${message}</p>`;
  popup.style.display = "block";

  // Auto-hide after 4s
  setTimeout(() => {
    popup.style.display = "none";
  }, 4000);
}

const audioPlayer = document.getElementById("audioPlayer");
const playPauseBtn = document.getElementById("playPause");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const seekBar = document.getElementById("seekBar");
const volumeBar = document.getElementById("volumeBar");
const trackTitle = document.getElementById("trackTitle");
const trackArtist = document.getElementById("trackArtist");
const albumCover = document.getElementById("albumCover");
const currentTimeEl = document.getElementById("currentTime");
const durationEl = document.getElementById("duration");
const playlist = document.querySelectorAll("#playlist li");

let currentTrack = 0;



// Load track
function loadTrack(index) {
  const track = playlist[index];
  playlist.forEach(li => li.classList.remove("active"));
  track.classList.add("active");
  audioPlayer.src = track.getAttribute("data-src");
  trackTitle.textContent = track.textContent;
  trackArtist.textContent = track.getAttribute("data-artist");
  albumCover.src = track.getAttribute("data-cover");
  audioPlayer.load();
  albumCover.onload = () => {
  getDominantColor(albumCover, (color) => {
    dynamicBg.style.background = `radial-gradient(circle at center, ${color}, #0a001a, black)`;
  });
};

}
loadTrack(currentTrack);



// Play/Pause
playPauseBtn.addEventListener("click", () => {
  if (audioPlayer.paused) {
    audioPlayer.play();
    playPauseBtn.textContent = "⏸";
  } else {
    audioPlayer.pause();
    playPauseBtn.textContent = "▶";
  }
});

// Next/Prev
nextBtn.addEventListener("click", () => {
  currentTrack = (currentTrack + 1) % playlist.length;
  loadTrack(currentTrack);
  audioPlayer.play();
});
prevBtn.addEventListener("click", () => {
  currentTrack = (currentTrack - 1 + playlist.length) % playlist.length;
  loadTrack(currentTrack);
  audioPlayer.play();
});

// Playlist click
playlist.forEach((track, index) => {
  track.addEventListener("click", () => {
    currentTrack = index;
    loadTrack(currentTrack);
    audioPlayer.play();
  });
});

// Seek bar
audioPlayer.addEventListener("timeupdate", () => {
  seekBar.value = (audioPlayer.currentTime / audioPlayer.duration) * 100;
  currentTimeEl.textContent = formatTime(audioPlayer.currentTime);
  durationEl.textContent = formatTime(audioPlayer.duration);
});
seekBar.addEventListener("input", () => {
  audioPlayer.currentTime = (seekBar.value / 100) * audioPlayer.duration;
});

// Volume
volumeBar.addEventListener("input", () => {
  audioPlayer.volume = volumeBar.value;
});

// Format time
function formatTime(sec) {
  if (isNaN(sec)) return "0:00";
  let m = Math.floor(sec / 60);
  let s = Math.floor(sec % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
}

// Create dynamic background element
const dynamicBg = document.createElement("div");
dynamicBg.classList.add("dynamic-bg");
document.body.prepend(dynamicBg);

// Function to extract average color from album art
function getDominantColor(image, callback) {
  const img = new Image();
  img.crossOrigin = "anonymous"; 
  img.src = image.src;

  img.onload = function () {
    const canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let r = 0, g = 0, b = 0, count = 0;

    for (let i = 0; i < imageData.data.length; i += 4) {
      r += imageData.data[i];
      g += imageData.data[i + 1];
      b += imageData.data[i + 2];
      count++;
    }

    r = Math.floor(r / count);
    g = Math.floor(g / count);
    b = Math.floor(b / count);

    callback(`rgb(${r}, ${g}, ${b})`);
  };
}
// Trading page

function seedItems() {
  const base = [
    {id:'PX-001', name:'Neon Sprite', rarity:'common', price:120, image:'images/instagram.svg'},
    {id:'PX-002', name:'Quantum Bloom', rarity:'common', price:140, image:'images/quantum-bloom.png'},
    {id:'PX-101', name:'Phase Shard', rarity:'rare', price:450, image:'images/phase-shard.png'},
    {id:'PX-102', name:'Aether Seed', rarity:'rare', price:520, image:'images/aether-seed.png'},
    {id:'PX-201', name:'Nova Core', rarity:'epic', price:1600, image:'images/nova-core.png'},
    {id:'PX-202', name:'Singularity Petal', rarity:'epic', price:1850, image:'images/singularity-petal.png'},
    {id:'PX-301', name:'Mythic Prism', rarity:'legendary', price:6200, image:'images/mythic-prism.png'},
    {id:'PX-302', name:'Oracle Flame', rarity:'legendary', price:7100, image:'images/oracle-flame.png'}
  ];
  return base.map(x=>({...x, prev:x.price}));
}



// Render function
function renderPCSpecs() {
  const container = document.getElementById("pcspec-list");
  container.innerHTML = "";

  pcProducts.forEach(product => {
    const item = document.createElement("div");
    item.classList.add("pcspec-item");

    item.innerHTML = `
      <img src="${product.image}" alt="${product.name}">
      <div class="pcspec-info">
        <h2>${product.name}</h2>
        <p>${product.description}</p>
        <span class="price">${product.price}</span>
      </div>
    `;

    container.appendChild(item);
  });
}

// Run render
renderPCSpecs();


// Run render
renderPCSpecs();

// Year in footer
const y = document.getElementById('year');
if (y) y.textContent = new Date().getFullYear();

// Portfolio filters
const buttons = document.querySelectorAll('.filter-btn');
const items = document.querySelectorAll('.p-item');

buttons.forEach(btn => {
  btn.addEventListener('click', () => {
    buttons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const f = btn.dataset.filter;
    items.forEach(it => {
      if (f === 'all' || it.dataset.cat === f) {
        it.style.display = '';
      } else {
        it.style.display = 'none';
      }
    });
  });
});
