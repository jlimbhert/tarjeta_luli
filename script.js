// script.js

const sky = document.getElementById('sky');
const numStars = 200; // más estrellas si quieres

for (let i = 0; i < numStars; i++) {
    const star = document.createElement('div');
    star.classList.add('star');

    // posición aleatoria dentro del contenedor
    star.style.top = Math.random() * 100 + 'vh';   // usando vh para pantalla completa
    star.style.left = Math.random() * 100 + 'vw';  // usando vw para pantalla completa

    // tamaño aleatorio
    const size = Math.random() * 2 + 1; // de 1px a 3px
    star.style.width = size + 'px';
    star.style.height = size + 'px';

    // velocidad de parpadeo aleatoria
    star.style.animationDuration = (Math.random() * 2 + 1) + 's';

    sky.appendChild(star);
}
