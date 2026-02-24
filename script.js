const sky = document.getElementById('sky');
const cover = document.getElementById('cover');
const mainContent = document.getElementById('main-content');
const mainAudio = document.getElementById('mainAudio');
const musicDisk = document.getElementById('musicDisk');
const clickSound = document.getElementById('clickSound');

const startDate = new Date('2025-11-13T00:00:00');

// GENERACIÓN DE ESTRELLAS
for (let i = 0; i < 150; i++) {
const star = document.createElement('div');
star.className = 'star';
star.style.top = Math.random() * 100 + 'vh';
star.style.left = Math.random() * 100 + 'vw';
const size = Math.random() * 2 + 1;
star.style.width = size + 'px';
star.style.height = size + 'px';
star.style.animationDuration = (Math.random() * 3 + 2) + 's';
sky.appendChild(star);
}

// MANEJO DE LA PORTADA Y AUDIO
cover.addEventListener('click', () => {
// Intentar reproducir audio principal
if (mainAudio) {
mainAudio.play()
.then(() => {
musicDisk.classList.add('playing');
})
.catch(err => console.log("Audio bloqueado por el navegador:", err));
}

// Sonido de clic opcional
if (clickSound) clickSound.play();

// Efecto de explosión y cambio de bloque
cover.classList.add('explode');

setTimeout(() => {
cover.style.display = 'none';
mainContent.classList.remove('hidden');
startTypewriter();
}, 800);
});

// CONTROL MANUAL DEL DISCO
musicDisk.addEventListener('click', (e) => {
e.stopPropagation(); // Evita que el clic en el disco active la portada si sigue ahí
if (mainAudio.paused) {
mainAudio.play();
musicDisk.classList.add('playing');
} else {
mainAudio.pause();
musicDisk.classList.remove('playing');
}
});

function startTypewriter() {
const textContainer = document.getElementById('typewriter-text');
const verso = "Eres la luz que ilumina mis noches,\nel sueño del que no quiero despertar.\nMi pequeña Luli,\ncontigo el mundo es un lugar mejor.";
let i = 0;
textContainer.innerHTML = "";

function type() {
if (i < verso.length) {
textContainer.innerHTML += verso.charAt(i) === "\n" ? "<br>": verso.charAt(i);
i++;
setTimeout(type, 100);
} else {
const btn = document.createElement('button');
btn.className = "btn-continue";
btn.innerHTML = "Ver nuestro tiempo juntos ❤️";
btn.onclick = () => {
mainContent.classList.add('hidden');
document.getElementById('block-2-container').classList.remove('hidden');
startCounter();
setInterval(createCelebration, 400);
};
textContainer.appendChild(document.createElement('br'));
textContainer.appendChild(btn);
}
}
type();
}

function startCounter() {
setTimeout(() => {
const btnGal = document.getElementById('btn-to-gallery');
if (btnGal) btnGal.classList.remove('hidden');
}, 5000);

setInterval(() => {
const now = new Date();
let years = now.getFullYear() - startDate.getFullYear();
let months = now.getMonth() - startDate.getMonth();
let days = now.getDate() - startDate.getDate();

if (days < 0) {
months--;
days += new Date(now.getFullYear(), now.getMonth(), 0).getDate();
}
if (months < 0) { years--; months += 12; }

let html = "";
html += `<div class="counter-box"><span>${months.toString().padStart(2, '0')}</span><label>Meses</label></div>`;
html += `<div class="counter-box"><span>${days.toString().padStart(2, '0')}</span><label>Días</label></div>`;
document.getElementById('main-counter').innerHTML = html;

const nextDay = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
const diff = nextDay - now;
const h = Math.floor((diff / 3600000) % 24);
const m = Math.floor((diff / 60000) % 60);
const s = Math.floor((diff / 1000) % 60);
document.getElementById('next-day-text').innerHTML = `Faltan <b>${h}h ${m}m ${s}s</b> para agregar un día más a nuestra historia`;
}, 1000);
}

function showGallery() {
document.getElementById('block-2-container').classList.add('hidden');
document.getElementById('block-3-container').classList.remove('hidden');
}

function createCelebration() {
const p = document.createElement('div');
p.innerHTML = Math.random() > 0.5 ? '❤️': '✨';
p.style.position = 'fixed';
p.style.left = Math.random() * 100 + 'vw';
p.style.top = '100vh';
p.style.fontSize = '20px';
p.style.zIndex = '500';
document.body.appendChild(p);
p.animate([{ transform: 'translateY(0)', opacity: 1 }, { transform: 'translateY(-110vh)', opacity: 0 }], { duration: 4000 });
setTimeout(() => p.remove(), 4000);
}