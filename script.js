// Theme Toggle
const themeToggle = document.querySelector('.theme-toggle');
themeToggle.addEventListener('click', () => {
  const html = document.documentElement;
  const current = html.getAttribute('data-theme');
  const next = current === 'light'? 'dark' : 'light';
  html.setAttribute('data-theme', next);
  themeToggle.querySelector('span').textContent = next === 'light'? '☀️' : '🌙';
});

// CV Modal
const cvModal = document.getElementById('cvModal');
document.getElementById('openCV').addEventListener('click', () => cvModal.classList.add('open'));
document.querySelector('.close-modal').addEventListener('click', () => cvModal.classList.remove('open'));
cvModal.addEventListener('click', (e) => e.target === cvModal && cvModal.classList.remove('open'));

// CV Edit/Save
let editing = false;
document.getElementById('editToggle').addEventListener('click', () => {
  editing =!editing;
  document.querySelectorAll('[contenteditable]').forEach(el => el.contentEditable = editing);
  document.getElementById('editToggle').style.display = editing? 'none' : 'block';
  document.getElementById('saveCV').style.display = editing? 'block' : 'none';
});
document.getElementById('saveCV').addEventListener('click', () => {
  editing = false;
  document.querySelectorAll('[contenteditable]').forEach(el => el.contentEditable = false);
  document.getElementById('editToggle').style.display = 'block';
  document.getElementById('saveCV').style.display = 'none';
  alert('Changes saved locally!');
});

// Export CV
document.getElementById('exportCV').addEventListener('click', () => {
  const data = {
    name: document.getElementById('cvName').innerText,
    role: document.getElementById('cvRole').innerText,
    education: document.getElementById('cvEducation').innerText,
    projects: document.getElementById('cvProjects').innerText,
    skills: document.getElementById('cvSkills').innerText,
    contact: document.getElementById('cvContact').innerText
  };
  const blob = new Blob([JSON.stringify(data, null, 2)], {type: 'application/json'});
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = 'Ayesha_CV.json'; a.click();
});

// Scroll Progress Bar
window.addEventListener('scroll', () => {
  const scrollTop = document.documentElement.scrollTop;
  const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const progress = (scrollTop / scrollHeight) * 100;
  document.querySelector('.progress-bar').style.width = progress + '%';
});

// Hide loader
window.addEventListener('load', () => {
  setTimeout(() => document.querySelector('.loader').classList.add('hidden'), 800);
});

// Scroll Reveal
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => entry.isIntersecting && entry.target.classList.add('visible'));
}, {threshold: 0.1});
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// Back to top
const backBtn = document.querySelector('.back-to-top');
window.addEventListener('scroll', () => {
  backBtn.classList.toggle('show', window.scrollY > 400);
});
backBtn.addEventListener('click', () => window.scrollTo({top: 0, behavior: 'smooth'}));

// Mouse glow
document.addEventListener('mousemove', (e) => {
  const glow = document.querySelector('.mouse-glow');
  glow.style.left = e.clientX + 'px';
  glow.style.top = e.clientY + 'px';
});