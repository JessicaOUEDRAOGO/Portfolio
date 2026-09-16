const P = {
  classroom: { name: "Classroom Collaborative", tech: "Unity · Netcode · XR Toolkit", tag: "Unity / VR", tc: "bx",
    descKey: "proj-classroom-desc",
    gif: "https://github.com/user-attachments/assets/26591270-33df-4bfa-af63-5d0ca5c7b92b",
    link: "https://github.com/JessicaOUEDRAOGO/Portfolio/tree/main/unity/classRoomCollaborative" },
  parkinson: { name: "Parkinson Awareness", tech: "Unity · VR · Blender", tag: "Unity / VR", tc: "bx",
    descKey: "proj-parkinson-desc",
    gif: "https://github.com/user-attachments/assets/d3f08d9e-338a-41f6-a803-ce86bf8624b3",
    link: "https://github.com/JessicaOUEDRAOGO/Portfolio/tree/main/unity/Parkinson" },
  firearm: { name: "Real-Time Firearm Detection", tech: "Python · YOLOv8 · OpenCV · AR", tag: "Computer Vision", tc: "bx",
    descKey: "proj-firearm-desc",
    gif: "https://github.com/user-attachments/assets/8469fc1f-2440-4a14-ab0a-9b8e2f4aea3a",
    link: "https://github.com/JessicaOUEDRAOGO/Portfolio/tree/main/Computer-Vision/Real-Time%20Firearm%20Detection" },
  quality: { name: "Industrial Quality Control", tech: "Python · OpenCV · AI", tag: "Computer Vision", tc: "bx",
    descKey: "proj-quality-desc",
    gif: "https://raw.githubusercontent.com/JessicaOUEDRAOGO/Portfolio/main/Computer-Vision/AI-for-Industrial-Quality-Control/AI.gif",
    link: "https://github.com/JessicaOUEDRAOGO/Portfolio/tree/main/Computer-Vision/AI-for-Industrial-Quality-Control" },
  unreal: { name: "House — Arch Visualisation", tech: "Unreal Engine · 3ds Max", tag: "Unreal Engine", tc: "be",
    descKey: "proj-unreal-desc",
    gif: null,
    slides: ["https://raw.githubusercontent.com/JessicaOUEDRAOGO/Portfolio/main/unreal/House/Rendu_1.png", "https://raw.githubusercontent.com/JessicaOUEDRAOGO/Portfolio/main/unreal/House/Rendu_2.png", "https://raw.githubusercontent.com/JessicaOUEDRAOGO/Portfolio/main/unreal/House/Rendu_3.png"],
    captions: ["Front view — winter evening lighting", "Depth of field — bokeh through the trees", "Low-angle view — warm golden hour"],
    fbx: "https://github.com/JessicaOUEDRAOGO/Portfolio/tree/main/unreal/House",
    link: "https://github.com/JessicaOUEDRAOGO/Portfolio/tree/main/unreal/House" },
  intellcap: { name: "Connected Sport Vest — IoT", tech: "Unity · MQTT · Node-RED", tag: "IoT / Unity", tc: "be",
    descKey: "proj-intellcap-desc",
    gif: "https://raw.githubusercontent.com/JessicaOUEDRAOGO/Portfolio/main/unity/gilet/gilet-demo.gif",
    link: "https://github.com/JessicaOUEDRAOGO/Portfolio" },
  grdf: { name: "VR Safety — Construction Site", tech: "Unity · Blender · VR Headset", tag: "Unity / VR", tc: "bx",
    descKey: "proj-grdf-desc",
    gif: null,
    video: "https://raw.githubusercontent.com/JessicaOUEDRAOGO/Portfolio/main/grdf/Terrarisk_VR1.mp4",
    poster: "https://raw.githubusercontent.com/JessicaOUEDRAOGO/Portfolio/main/grdf/slide_1.jpg",
    slides: ["https://raw.githubusercontent.com/JessicaOUEDRAOGO/Portfolio/main/grdf/slide_1.jpg", "https://raw.githubusercontent.com/JessicaOUEDRAOGO/Portfolio/main/grdf/slide_2.jpg", "https://raw.githubusercontent.com/JessicaOUEDRAOGO/Portfolio/main/grdf/slide_3.jpg", "https://raw.githubusercontent.com/JessicaOUEDRAOGO/Portfolio/main/grdf/slide_4.jpg", "https://raw.githubusercontent.com/JessicaOUEDRAOGO/Portfolio/main/grdf/slide_5.jpg", "https://raw.githubusercontent.com/JessicaOUEDRAOGO/Portfolio/main/grdf/slide_6.jpg", "https://raw.githubusercontent.com/JessicaOUEDRAOGO/Portfolio/main/grdf/slide_7.jpg"],
    captions: ["A day on the construction site", "Insufficient shoring for surface loads", "A passing vehicle triggers the trench collapse", "With non-compliant shoring", "You are exposed to trench collapse", "With compliant shoring", "A full accident-free workday"],
    link: "https://github.com/JessicaOUEDRAOGO/Portfolio" }
};

function card(id) {
  const p = P[id];
  return `<div class="pc" onclick="openMod('${id}')" tabindex="0" role="button" aria-label="${p.name}" onkeydown="if(event.key==='Enter'||event.key===' ')openMod('${id}')">
    <div class="pt">${p.video && p.poster ? `<img src="${p.poster}" alt="${p.name}" loading="lazy"><div class="pov"><div class="plc"><svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg></div></div>` : p.gif ? `<img src="${p.gif}" alt="${p.name}" loading="lazy"><div class="pov"><div class="plc"><svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg></div></div>` : p.slides ? `<img src="${p.slides[0]}" alt="${p.name}" loading="lazy"><div class="pov"><div class="plc"><svg viewBox="0 0 24 24"><path d="M4 6h16M4 10h16M4 14h8" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round"/></svg></div></div>` : `<div class="pte">${p.video ? '▶ Watch demo' : 'Demo coming soon'}</div>`}</div>
    <div class="pi"><p class="pn">${p.name}</p><p class="ptc">${p.tech}</p></div>
  </div>`;
}

/* Helper utilisé par les pages pour injecter les cartes présentes dans leur DOM */
function renderCards(map) {
  Object.entries(map).forEach(([elId, projId]) => {
    const el = document.getElementById(elId);
    if (el) el.innerHTML = card(projId);
  });
}

let slideIdx = 0, slideData = null;

function openMod(id) {
  const p = P[id];
  document.getElementById('m-tag').textContent = p.tag;
  document.getElementById('m-tag').className = 'mtag ' + p.tc;
  document.getElementById('m-title').textContent = p.name;
  const lang = typeof currentLang !== 'undefined' ? currentLang : 'en';
  document.getElementById('m-desc').textContent = p.descKey ? TRANSLATIONS[lang][p.descKey] : p.desc;
  document.getElementById('m-link').href = p.link;
  const fbxBtn = document.getElementById('m-fbx');
  if (p.fbx) { fbxBtn.style.display = 'inline-flex'; fbxBtn.href = p.fbx; } else { fbxBtn.style.display = 'none'; }
  const med = document.getElementById('m-media');
  if (p.gif) {
    med.innerHTML = `<img src="${p.gif}" alt="${p.name}">`;
    slideData = null;
  } else if (p.video) {
    med.innerHTML = `<video controls style="width:100%;height:100%;object-fit:contain;background:#000" preload="metadata">
      <source src="${p.video}" type="video/mp4">
    </video>`;
    slideData = null;
  } else {
    med.innerHTML = `<div style="color:#888;font-size:.85rem;padding:2rem;text-align:center">Demo not yet available</div>`;
    slideData = null;
  }
  document.getElementById('modal').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function renderSlide(med) {
  const p = slideData;
  med.style.position = 'relative';
  med.innerHTML = `
    <img src="${p.slides[slideIdx]}" alt="${p.captions[slideIdx]}" style="width:100%;height:100%;object-fit:contain">
    <div style="position:absolute;bottom:0;left:0;right:0;background:rgba(0,0,0,.55);color:#fff;font-size:.78rem;padding:.5rem 1rem;text-align:center">${p.captions[slideIdx]}</div>
    <button onclick="prevSlide()" style="position:absolute;left:.6rem;top:50%;transform:translateY(-50%);width:34px;height:34px;border-radius:50%;background:rgba(255,255,255,.85);border:none;cursor:pointer;font-size:1.1rem;display:flex;align-items:center;justify-content:center">‹</button>
    <button onclick="nextSlide()" style="position:absolute;right:.6rem;top:50%;transform:translateY(-50%);width:34px;height:34px;border-radius:50%;background:rgba(255,255,255,.85);border:none;cursor:pointer;font-size:1.1rem;display:flex;align-items:center;justify-content:center">›</button>
    <div style="position:absolute;top:.6rem;right:.6rem;background:rgba(0,0,0,.45);color:#fff;font-size:.7rem;padding:2px 7px;border-radius:10px">${slideIdx + 1}/${p.slides.length}</div>`;
}
function nextSlide() { if (!slideData) return; slideIdx = (slideIdx + 1) % slideData.slides.length; renderSlide(document.getElementById('m-media')); }
function prevSlide() { if (!slideData) return; slideIdx = (slideIdx - 1 + slideData.slides.length) % slideData.slides.length; renderSlide(document.getElementById('m-media')); }
function closeMBG(e) { if (e.target === document.getElementById('modal')) closeMod(); }
function closeMod() { document.getElementById('modal').classList.remove('open'); document.body.style.overflow = ''; }
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeMod() });
