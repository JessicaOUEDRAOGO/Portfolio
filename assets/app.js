/*
  APP.JS — logique de rendu et de navigation.
  Tu n'as normalement pas besoin de toucher ce fichier pour mettre à jour
  du contenu : ça se passe dans data.js.
*/

const el = id => document.getElementById(id);

function renderIdentity(){
  const s = SITE;
  el('identity-name').textContent = s.identity.name;
  el('identity-role').textContent = s.identity.role;
  el('identity-bio').textContent = s.identity.bio;
  el('identity-motivation').textContent = s.identity.motivation;

  const avatar = el('avatar');
  if(s.identity.photo){
    avatar.innerHTML = `<img src="${s.identity.photo}" alt="${s.identity.name}" onerror="this.parentNode.textContent='${s.identity.initials}'">`;
  } else {
    avatar.textContent = s.identity.initials;
  }

  const skillsList = el('skills-list');
  skillsList.innerHTML = s.skills.map(sk =>
    `<li><b>${sk.name}</b><span>${sk.desc}</span></li>`
  ).join('');

  const formList = el('formation-list');
  formList.innerHTML = s.formation.map(f =>
    `<li>${f.logo ? `<div class="formation-logo"><img src="${f.logo}" alt="" onerror="this.parentNode.style.display='none'"></div>` : ''}<div><b>${f.name}</b><span>${f.place}</span></div></li>`
  ).join('');

  el('contact-github').href = s.contact.github;
  el('contact-linkedin').href = s.contact.linkedin;
  el('contact-email').href = 'mailto:' + s.contact.email;
  el('contact-email').innerHTML = `<span class="dot"></span>${s.contact.email}`;
}

function renderHome(){
  const home = el('view-home');
  home.innerHTML = '';
  let i = 1;
  for (const key in SITE.themes){
    const t = SITE.themes[key];
    const btn = document.createElement('button');
    btn.className = 'theme-panel';
    btn.dataset.accent = t.accent || 'cyan';
    btn.innerHTML = `
      <video autoplay muted loop playsinline preload="none">
        <source src="${t.video}" type="video/mp4">
      </video>
      <div class="panel-veil"></div>
      <div class="panel-index">0${i} / ${key}</div>
      <h3>${t.title}</h3>
      <p>${t.tagline}</p>
      <div class="panel-cta">Voir les projets →</div>`;
    btn.addEventListener('click', () => { location.hash = `#/theme/${key}`; });
    home.appendChild(btn);
    i++;
  }
}

function renderTheme(key){
  const t = SITE.themes[key];
  if(!t){ location.hash = '#/'; return; }
  el('theme-title').textContent = t.title;
  el('theme-tagline').textContent = t.tagline;
  const list = el('project-list');
  list.innerHTML = '';
  t.projects.forEach(p=>{
    const row = document.createElement('button');
    row.className = 'project-row';
    row.innerHTML = `<div class="row-left"><div class="proj-title">${p.title}</div><div class="proj-context">${p.meta}</div></div><div class="row-arrow">→</div>`;
    row.addEventListener('click', ()=>{ location.hash = `#/theme/${key}/${p.id}`; });
    list.appendChild(row);
  });
}

/* --- lightbox --- */
function openLightbox(type, src, poster){
  const inner = el('lightbox-inner');
  if(type === 'image'){
    inner.innerHTML = `<img src="${src}" alt="">`;
  } else if(type === 'video'){
    inner.innerHTML = `<video src="${src}" ${poster ? `poster="${poster}"` : ''} controls autoplay></video>`;
  }
  el('lightbox').classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeLightbox(e){
  if(e && e.target && e.target.id !== 'lightbox' && !e.target.classList.contains('lightbox-close')) return;
  el('lightbox').classList.remove('open');
  el('lightbox-inner').innerHTML = '';
  document.body.style.overflow = '';
}
document.addEventListener('keydown', e=>{ if(e.key === 'Escape') closeLightbox({target:{id:'lightbox'}}); });

/* --- rendu du bloc média selon son type --- */
function renderMedia(media){
  if(!media || media.type === 'pending'){
    return `<p class="placeholder">Démonstration à venir</p>`;
  }
  if(media.type === 'gif'){
    return `<div class="media-wrap"><img class="media-gif" src="${media.src}" alt="Démonstration" loading="lazy" onclick="openLightbox('image','${media.src}')"></div>`;
  }
  if(media.type === 'video'){
    return `<div class="media-wrap">
      <video controls preload="none" ${media.poster ? `poster="${media.poster}"` : ''}>
        <source src="${media.src}" type="video/mp4"></video>
      <button class="expand-btn" onclick="openLightbox('video','${media.src}','${media.poster || ''}')">⤢ Agrandir</button>
    </div>`;
  }
  if(media.type === 'youtube'){
    return `<div class="yt-links">${media.urls.map(u=>`<a href="${u.href}" target="_blank" rel="noopener">${u.label} →</a>`).join('')}</div>`;
  }
  if(media.type === 'slides'){
    const uid = 'sl' + Math.random().toString(36).slice(2,8);
    window.__slides = window.__slides || {};
    window.__slides[uid] = { items: media.items, idx: 0 };
    return `<div class="slides" id="${uid}">${slideInner(uid)}</div>`;
  }
  if(media.type === 'combo'){
    return `<div class="combo">${media.items.map(m=>`<div>${renderMedia(m)}</div>`).join('')}</div>`;
  }
  return '';
}

function slideInner(uid){
  const s = window.__slides[uid];
  const item = s.items[s.idx];
  return `
    <img src="${item.src}" alt="${item.caption || ''}" onclick="openLightboxGallery('${uid}')">
    ${item.caption ? `<div class="cap">${item.caption}</div>` : ''}
    ${s.items.length > 1 ? `
      <button class="nav-btn prev" onclick="event.stopPropagation(); slideNav('${uid}',-1)">‹</button>
      <button class="nav-btn next" onclick="event.stopPropagation(); slideNav('${uid}',1)">›</button>
      <div class="count">${s.idx+1}/${s.items.length}</div>` : ''}
  `;
}
function slideNav(uid, dir){
  const s = window.__slides[uid];
  s.idx = (s.idx + dir + s.items.length) % s.items.length;
  const inlineEl = document.getElementById(uid);
  if(inlineEl) inlineEl.innerHTML = slideInner(uid);
}

/* --- diaporama agrandi dans la lightbox, navigable sans avoir à ressortir --- */
function openLightboxGallery(uid){
  el('lightbox-inner').innerHTML = renderLightboxSlide(uid);
  el('lightbox').classList.add('open');
  document.body.style.overflow = 'hidden';
}
function renderLightboxSlide(uid){
  const s = window.__slides[uid];
  const item = s.items[s.idx];
  return `<div class="slides lb-slides">
    <img src="${item.src}" alt="${item.caption || ''}">
    ${item.caption ? `<div class="cap">${item.caption}</div>` : ''}
    ${s.items.length > 1 ? `
      <button class="nav-btn prev" onclick="event.stopPropagation(); gallerySlideNav('${uid}',-1)">‹</button>
      <button class="nav-btn next" onclick="event.stopPropagation(); gallerySlideNav('${uid}',1)">›</button>
      <div class="count">${s.idx+1}/${s.items.length}</div>` : ''}
  </div>`;
}
function gallerySlideNav(uid, dir){
  const s = window.__slides[uid];
  s.idx = (s.idx + dir + s.items.length) % s.items.length;
  el('lightbox-inner').innerHTML = renderLightboxSlide(uid);
  const inlineEl = document.getElementById(uid);
  if(inlineEl) inlineEl.innerHTML = slideInner(uid);
}

function renderProject(themeKey, projectId){
  const t = SITE.themes[themeKey];
  const p = t ? t.projects.find(x=>x.id===projectId) : null;
  if(!p){ location.hash = `#/theme/${themeKey}`; return; }

  const logoHtml = p.logo ? `<img class="meta-logo" src="${p.logo}" alt="" onerror="this.style.display='none'">` : '';
  el('detail-meta').innerHTML = logoHtml + `<span>${p.meta}</span>`;
  el('detail-title').textContent = p.title;

  const isLite = p.type === 'lite';
  el('block-description').classList.toggle('hidden', !isLite);
  el('block-problem').classList.toggle('hidden', isLite);
  el('block-solution').classList.toggle('hidden', isLite);
  el('block-result').classList.toggle('hidden', isLite);

  if(isLite){
    el('detail-description').textContent = p.description;
  } else {
    el('detail-problem').textContent = p.problem;
    el('detail-solution').textContent = p.solution;
    el('detail-result').textContent = p.result;
  }

  const tools = p.tools || [];
  el('detail-tools').innerHTML = tools.map(x=>`<span>${x}</span>`).join('');
  el('detail-tools').classList.toggle('hidden', tools.length===0);

  el('detail-media').innerHTML = renderMedia(p.media);

  const linkEl = el('detail-link');
  if(p.link){ linkEl.href = p.link; linkEl.classList.remove('hidden'); }
  else { linkEl.classList.add('hidden'); }
}

function renderCrumbs(themeKey, project){
  const c = el('crumbs');
  let html = `<button data-hash="#/">Accueil</button>`;
  if(themeKey){
    const t = SITE.themes[themeKey];
    html += `<span class="sep">/</span>`;
    if(project){
      html += `<button data-hash="#/theme/${themeKey}">${t.title}</button>`;
      html += `<span class="sep">/</span><span class="current">${project.title}</span>`;
    } else {
      html += `<span class="current">${t.title}</span>`;
    }
  }
  c.innerHTML = html;
  c.querySelectorAll('button').forEach(b=>{
    b.addEventListener('click', ()=>{ location.hash = b.dataset.hash; });
  });
}

function route(){
  const hash = location.hash.replace(/^#\/?/, '');
  const parts = hash.split('/').filter(Boolean);

  const viewHome = el('view-home'), viewTheme = el('view-theme'), viewDetail = el('view-detail');
  viewHome.classList.add('hidden'); viewTheme.classList.add('hidden'); viewDetail.classList.add('hidden');

  if(parts[0] === 'theme' && parts[1]){
    const themeKey = parts[1];
    if(parts[2]){
      const t = SITE.themes[themeKey];
      const p = t ? t.projects.find(x=>x.id===parts[2]) : null;
      renderProject(themeKey, parts[2]);
      renderCrumbs(themeKey, p);
      viewDetail.classList.remove('hidden');
      el('back-to-theme-end').onclick = ()=>{ location.hash = `#/theme/${themeKey}`; };
    } else {
      renderTheme(themeKey);
      renderCrumbs(themeKey, null);
      viewTheme.classList.remove('hidden');
      el('back-to-home-end').onclick = ()=>{ location.hash = '#/'; };
    }
  } else {
    renderCrumbs(null, null);
    viewHome.classList.remove('hidden');
  }

  // scroll to the top of the STAGE content, not the top of the page —
  // on mobile the sidebar sits above the stage in normal flow, so scrolling
  // to page-top would force the visitor back past the whole bio/About section.
  const crumbs = el('crumbs');
  if(crumbs){ crumbs.scrollIntoView({block:'start'}); }
}

document.addEventListener('DOMContentLoaded', ()=>{
  renderIdentity();
  renderHome();
  route();
});
window.addEventListener('hashchange', route);
