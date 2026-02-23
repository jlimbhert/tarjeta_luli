/* script.js - VERSIÓN FINAL CON CLIC Y MÚSICA */

const sky = document.getElementById('sky');
const cover = document.getElementById('cover');
const mainIcon = document.getElementById('mainIcon');
const mainContent = document.getElementById('main-content');
const numStars = 150;

// ELEMENTOS DE AUDIO
const mainAudio = document.getElementById('mainAudio'); // Canción principal
const clickSound = document.getElementById('clickSound'); // Efecto de sonido clic
const musicBtn = document.createElement('div');

// Configuración del botón flotante de música
musicBtn.className = 'music-control';
musicBtn.innerHTML = '<span>🎵</span>';
document.body.appendChild(musicBtn);

// --- FUNCIÓN PARA EL EFECTO DE SONIDO CLIC ---
function playClick() {
if (clickSound) {
clickSound.currentTime = 0; // Reinicia el sonido si se pulsa rápido
clickSound.play();
}
}

// 1. GENERAR ESTRELLAS
const starColors = ['#ffffff', '#fff4e6', '#e6f2ff'];

for (let i = 0; i < numStars; i++) {
const star = document.createElement('div');
star.className = 'star';
star.style.top = Math.random() * 100 + 'vh';
star.style.left = Math.random() * 100 + 'vw';
const size = Math.random() * 2 + 1;
star.style.width = size + 'px';
star.style.height = size + 'px';
star.style.backgroundColor = starColors[Math.floor(Math.random() * starColors.length)];
star.style.animationDuration = (Math.random() * 3 + 2) + 's';
star.style.animationDelay = Math.random() * 5 + 's';
sky.appendChild(star);
}

// 2. ESTRELLAS FUGACES
function createShootingStar() {
const sStar = document.createElement('div');
sStar.className = 'shooting-star';
sStar.style.top = Math.random() * 40 + 'vh';
sStar.style.left = (Math.random() * 40 + 60) + 'vw';
sStar.style.animationDuration = (Math.random() * 2 + 3) + 's';
sky.appendChild(sStar);
setTimeout(() => { sStar.remove(); }, 5000);
}
setInterval(createShootingStar, 6000);

// 3. LOGICA DE LA EXPLOSIÓN, CLIC Y MÚSICA
function handleExplosion(e) {
if (e) e.preventDefault();

// Suena el clic inmediatamente al tocar la portada
playClick();

// Iniciar la música principal
if (mainAudio) {
mainAudio.play().then(() => {
musicBtn.classList.add('visible', 'playing');
}).catch(error => {
musicBtn.classList.add('visible');
console.log("Esperando interacción para música.");
});
}

mainIcon.style.transform = 'scale(0.9)';

setTimeout(() => {
cover.classList.add('explode');
setTimeout(() => {
cover.style.display = 'none';
mainContent.classList.remove('hidden');
setTimeout(() => {
mainContent.classList.add('active');
setTimeout(startTypewriter, 1000);
}, 50);
}, 800);
}, 150);
}

// 4. FUNCIÓN MÁQUINA DE ESCRIBIR
function startTypewriter() {
const textContainer = document.querySelector('.verse-container');
const verso = "Eres la luz que ilumina mis noches,\nel sueño del que no quiero despertar.\nMi pequeña Luli,\ncontigo el mundo es un lugar mejor.";

let i = 0;
textContainer.innerHTML = "";

function type() {
if (i < verso.length) {
if (verso.charAt(i) === "\n") {
textContainer.innerHTML += "<br>";
} else {
textContainer.innerHTML += verso.charAt(i);
}
i++;
setTimeout(type, 100);
}
}
type();
}

// 5. CONTROL DEL BOTÓN FLOTANTE (Play/Pause con sonido Clic)
musicBtn.addEventListener('click', (e) => {
e.stopPropagation();

// Suena el clic al tocar el reproductor
playClick();

if (mainAudio.paused) {
mainAudio.play();
musicBtn.classList.add('playing');
} else {
mainAudio.pause();
musicBtn.classList.remove('playing');
}
});

// Eventos de inicio corregidos
mainIcon.addEventListener('mousedown', handleExplosion);
mainIcon.addEventListener('touchstart', handleExplosion, {passive: false});