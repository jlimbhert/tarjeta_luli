const sky = document.getElementById('sky');
const cover = document.getElementById('cover');
const mainIcon = document.getElementById('mainIcon');
const mainContent = document.getElementById('main-content');
const mainAudio = document.getElementById('mainAudio');
const clickSound = document.getElementById('clickSound');
const numStars = 150;

// Crear botón de música
const musicBtn = document.createElement('div');
musicBtn.className = 'music-control';
musicBtn.innerHTML = '🎵';
document.body.appendChild(musicBtn);

// 1. GENERAR ESTRELLAS
for (let i = 0; i < numStars; i++) {
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

// 2. ESTRELLAS FUGACES
setInterval(() => {
const sStar = document.createElement('div');
sStar.className = 'shooting-star';
sStar.style.top = Math.random() * 40 + 'vh';
sStar.style.left = (Math.random() * 40 + 60) + 'vw';
sky.appendChild(sStar);
setTimeout(() => sStar.remove(), 5000);
}, 6000);

// 3. EXPLOSIÓN Y MÚSICA (CORREGIDO)
function handleExplosion(e) {
if (e) e.preventDefault();

// Música primero para evitar bloqueos
if (mainAudio) {
mainAudio.play().then(() => {
musicBtn.classList.add('visible', 'playing');
}).catch(() => musicBtn.classList.add('visible'));
}

if (clickSound) {
clickSound.currentTime = 0;
clickSound.play();
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

// 4. MÁQUINA DE ESCRIBIR
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
}
}
type();
}

// 5. CONTROL DE MÚSICA
musicBtn.addEventListener('click', (e) => {
e.stopPropagation();
if (mainAudio.paused) {
mainAudio.play();
musicBtn.classList.add('playing');
} else {
mainAudio.pause();
musicBtn.classList.remove('playing');
}
});

mainIcon.addEventListener('click', handleExplosion);