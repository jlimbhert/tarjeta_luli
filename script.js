// script.js

const sky = document.getElementById('sky');
const cover = document.getElementById('cover');
const mainIcon = document.getElementById('mainIcon');
const numStars = 150;

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
setInterval(createShootingStar, 5000); // Una cada 5 segundos

// 3. LOGICA DE LA PORTADA (EXPLOSIÓN)
function explode() {
    mainIcon.style.transform = 'scale(0.8)'; // Efecto visual de presión
    setTimeout(() => {
        cover.classList.add('explode'); // Activa la animación CSS
        setTimeout(() => {
            cover.style.display = 'none'; // Desaparece del todo
        }, 1000);
    }, 150);
}

mainIcon.addEventListener('click', explode);
mainIcon.addEventListener('touchstart', (e) => {
    e.preventDefault();
    explode();
});
