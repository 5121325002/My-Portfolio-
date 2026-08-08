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
document.getElementById('openCV').addEventListener('click', () => cvModal.classList.add('show'));
document.querySelector('.close-modal').addEventListener('click', () => cvModal.classList.remove('show'));
cvModal.addEventListener('click', (e) => e.target === cvModal && cvModal.classList.remove('show'));

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
    certs: document.getElementById('cvCerts').innerText,
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
  setTimeout(() => document.querySelector('.loader').classList.add('fade-out'), 800);
});

// Scroll Reveal
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => entry.isIntersecting && entry.target.classList.add('show'));
}, {threshold: 0.1});
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// Back to top
document.querySelector('.back-to-top').addEventListener('click', () => window.scrollTo({top: 0, behavior: 'smooth'}));

// Sparkle effect on button click
document.querySelectorAll('.sparkle-btn').forEach(button => {
  button.addEventListener('click', function(e) {
    const rect = button.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const sparkle = document.createElement('span');
    sparkle.className = 'sparkle-effect';
    sparkle.style.left = `${x}px`;
    sparkle.style.top = `${y}px`;
    sparkle.style.width = sparkle.style.height = `${Math.max(rect.width, rect.height)}px`;
    button.appendChild(sparkle);
    setTimeout(() => sparkle.remove(), 600);
  });
});