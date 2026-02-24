/* =========================================
   1. VARIABLES GLOBALES Y CONFIGURACIÓN
   ========================================= */
const sky = document.getElementById('sky');
const cover = document.getElementById('cover');
const mainIcon = document.getElementById('mainIcon');
const mainContent = document.getElementById('main-content');
const mainAudio = document.getElementById('mainAudio');
const musicDisk = document.getElementById('musicDisk');
const clickSound = document.getElementById('clickSound');

// Fecha de inicio para el contador
const startDate = new Date('2025-11-13T00:00:00');

/* =========================================
   2. SISTEMA DE ESTRELLAS (FONDO)
   ========================================= */
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

/* =========================================
   3. LÓGICA DE PORTADA (EVENTO INICIAL)
   ========================================= */
mainIcon.addEventListener('click', (e) => {
e.stopPropagation();

if (mainAudio) {
mainAudio.load();
mainAudio.play()
.then(() => {
musicDisk.classList.add('playing');
musicDisk.classList.add('visible');
})
.catch(err => {
console.error("Error de audio:", err);
musicDisk.classList.add('visible');
});
}

if (clickSound) clickSound.play();
cover.classList.add('explode');

setTimeout(() => {
cover.style.display = 'none';
mainContent.classList.remove('hidden');
startTypewriter();
}, 800);
});

/* =========================================
   4. BLOQUE 1: EFECTO MÁQUINA DE ESCRIBIR
   ========================================= */
function startTypewriter() {
const textContainer = document.getElementById('typewriter-text');
const verso = "\nEra tu historia\nSe cruzó con la mía\nTanta gente, tanta gente\nAhí fuera\ny coincidir aquel día...";
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

/* =========================================
   5. BLOQUE 2: CONTADOR DE TIEMPO
   ========================================= */
function startCounter() {
setTimeout(() => {
const btnGal = document.getElementById('btn-to-gallery');
if (btnGal) btnGal.classList.remove('hidden');
}, 5000);

setInterval(() => {
const now = new Date();
let years = now.getFullYear() - startDate.getFullYear();
let months = (years * 12) + (now.getMonth() - startDate.getMonth());
let days = now.getDate() - startDate.getDate();

if (days < 0) {
months--;
const prevMonthLastDay = new Date(now.getFullYear(), now.getMonth(), 0).getDate();
days += prevMonthLastDay;
}

let html = "";
html += `<div class="counter-box"><span>${months.toString().padStart(2, '0')}</span><label>Meses</label></div>`;
html += `<div class="counter-box"><span>${days.toString().padStart(2, '0')}</span><label>Días</label></div>`;

const counterElement = document.getElementById('main-counter');
if (counterElement) counterElement.innerHTML = html;

const nextDay = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
const diff = nextDay - now;
const h = Math.floor((diff / 3600000) % 24);
const m = Math.floor((diff / 60000) % 60);
const s = Math.floor((diff / 1000) % 60);

const clockElement = document.getElementById('next-day-text');
if (clockElement) {
clockElement.innerHTML = `Faltan <b>${h}h ${m}m ${s}s</b> para agregar un día más a nuestra historia`;
}
}, 1000);
}

/* =========================================
   6. BLOQUE 3: GALERÍA
   ========================================= */
function showGallery() {
document.getElementById('block-2-container').classList.add('hidden');
document.getElementById('block-3-container').classList.remove('hidden');

setTimeout(() => {
const btn4 = document.getElementById('btn-to-block4');
if (btn4) btn4.classList.remove('hidden');
}, 6000);
}

/* =========================================
   7. BLOQUE 4: BOTELLA
   ========================================= */
function showBlock4() {
document.getElementById('block-3-container').classList.add('hidden');
document.getElementById('block-4-container').classList.remove('hidden');
}

function openBottle() {
const bottle = document.getElementById('bottle-img');
const paper = document.getElementById('message-paper');

bottle.style.transform = "scale(2)";
bottle.style.opacity = "0";

setTimeout(() => {
bottle.classList.add('hidden');
paper.classList.remove('hidden');
}, 500);
}

/* =========================================
   8. BLOQUE 5: JUEGO ATREVIDO (NUEVO)
   ========================================= */
function showBlock5() {
document.getElementById('block-4-container').classList.add('hidden');
document.getElementById('block-5-container').classList.remove('hidden');
}

const spicyOptions = [
{ emoji: "🤫", text: "Cuéntame un secreto que nadie más sepa..." },
{ emoji: "📸", text: "Envíame una foto que me deje sin palabras (ahora mismo)." },
{ emoji: "🔥", text: "RETO: Dime qué me harías si me tuvieras en frente ahora." },
{ emoji: "🍀", text: "¡Te salvaste! Por ahora no hay castigo..." },
{ emoji: "🎭", text: "VERDAD: ¿Cuál es tu fantasía más recurrente conmigo?" },
{ emoji: "🍷", text: "RETO: Cuéntame tu sueño más atrevido que me incluya." },
{ emoji: "💋", text: "VERDAD: ¿Qué es lo que más te gusta que te diga al oído?" }
// Puedes seguir agregando hasta completar los 25 aquí...
];

function playGame() {
const numDisplay = document.getElementById('lucky-number');
const btnSpin = document.getElementById('btn-spin');
const card = document.getElementById('spicy-card');
let counter = 0;

btnSpin.disabled = true;
card.classList.add('hidden');

const interval = setInterval(() => {
numDisplay.innerText = Math.floor(Math.random() * 25) + 1;
counter++;
if (counter > 20) {
clearInterval(interval);
const finalIndex = Math.floor(Math.random() * spicyOptions.length);
numDisplay.innerText = finalIndex + 1;
revealResult(finalIndex);
}
}, 50);
}

function revealResult(index) {
const card = document.getElementById('spicy-card');
const cardEmoji = document.getElementById('card-emoji');
const cardText = document.getElementById('card-text');
const btnClosing = document.getElementById('btn-to-closing');

cardEmoji.innerText = spicyOptions[index].emoji;
cardText.innerText = spicyOptions[index].text;

setTimeout(() => {
card.classList.remove('hidden');
btnClosing.classList.remove('hidden');
}, 500);
}

function resetGame() {
document.getElementById('spicy-card').classList.add('hidden');
document.getElementById('btn-spin').disabled = false;
document.getElementById('lucky-number').innerText = "?";
}

/* =========================================
   9. BLOQUE FINAL: DESPEDIDA
   ========================================= */
function showClosing() {
// Cerramos el Bloque 5 (Juego) para mostrar el final
document.getElementById('block-5-container').classList.add('hidden');
document.getElementById('block-closing-container').classList.remove('hidden');
}

function closeApp() {
alert("¡Gracias por visitar nuestra historia! Ahora puedes cerrar esta pestaña.");
}

/* =========================================
   10. UTILIDADES GLOBALES
   ========================================= */
musicDisk.addEventListener('click', (e) => {
e.stopPropagation();
if (mainAudio.paused) {
mainAudio.play();
musicDisk.classList.add('playing');
} else {
mainAudio.pause();
musicDisk.classList.remove('playing');
}
});

function createCelebration() {
const p = document.createElement('div');
p.innerHTML = Math.random() > 0.5 ? '❤️': '✨';
p.style.position = 'fixed';
p.style.left = Math.random() * 100 + 'vw';
p.style.top = '100vh';
p.style.fontSize = '20px';
p.style.zIndex = '500';
p.style.pointerEvents = 'none';
document.body.appendChild(p);

p.animate([
{ transform: 'translateY(0)', opacity: 1 },
{ transform: 'translateY(-110vh)', opacity: 0 }
], { duration: 4000 });

setTimeout(() => p.remove(), 4000);
}