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

    // Reproducción de audio al primer clic
    if (mainAudio) {
        mainAudio.load();
        mainAudio.play()
            .then(() => {
                musicDisk.classList.add('playing');
                musicDisk.classList.add('visible'); // Muestra el disco de música
            })
            .catch(err => {
                console.error("Error de audio:", err);
                musicDisk.classList.add('visible');
            });
    }

    if (clickSound) clickSound.play();

    // Animación de salida de portada
    cover.classList.add('explode');

    setTimeout(() => {
        cover.style.display = 'none';
        mainContent.classList.remove('hidden');
        startTypewriter(); // Inicia el Bloque 1
    }, 800);
});

/* =========================================
   4. BLOQUE 1: EFECTO MÁQUINA DE ESCRIBIR
   ========================================= */
function startTypewriter() {
    const textContainer = document.getElementById('typewriter-text');
    const verso = "Eres la luz que ilumina mis noches,\nel sueño del que no quiero despertar.\nMi pequeña Luli,\ncontigo el mundo es un lugar mejor.";
    let i = 0;
    textContainer.innerHTML = "";

    function type() {
        if (i < verso.length) {
            textContainer.innerHTML += verso.charAt(i) === "\n" ? "<br>" : verso.charAt(i);
            i++;
            setTimeout(type, 100);
        } else {
            // Aparición del botón después del texto
            const btn = document.createElement('button');
            btn.className = "btn-continue";
            btn.innerHTML = "Ver nuestro tiempo juntos ❤️";
            btn.onclick = () => {
                mainContent.classList.add('hidden');
                document.getElementById('block-2-container').classList.remove('hidden');
                startCounter(); // Inicia el Bloque 2
                setInterval(createCelebration, 400); // Inicia corazones flotantes
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
    // Muestra el botón de la galería después de 5 segundos
    setTimeout(() => {
        const btnGal = document.getElementById('btn-to-gallery');
        if (btnGal) btnGal.classList.remove('hidden');
    }, 5000);

    setInterval(() => {
        const now = new Date();
        let months = now.getMonth() - startDate.getMonth() + (12 * (now.getFullYear() - startDate.getFullYear()));
        let days = now.getDate() - startDate.getDate();

        if (days < 0) {
            months--;
            days += new Date(now.getFullYear(), now.getMonth(), 0).getDate();
        }

        // Renderizado del contador en el HTML
        let html = "";
        html += `<div class="counter-box"><span>${months.toString().padStart(2, '0')}</span><label>Meses</label></div>`;
        html += `<div class="counter-box"><span>${days.toString().padStart(2, '0')}</span><label>Días</label></div>`;
        document.getElementById('main-counter').innerHTML = html;

        // Lógica del "Siguiente Día" (Reloj inverso)
        const nextDay = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
        const diff = nextDay - now;
        const h = Math.floor((diff / 3600000) % 24);
        const m = Math.floor((diff / 60000) % 60);
        const s = Math.floor((diff / 1000) % 60);
        document.getElementById('next-day-text').innerHTML = `Faltan <b>${h}h ${m}m ${s}s</b> para agregar un día más a nuestra historia`;
    }, 1000);
}

/* =========================================
   6. BLOQUE 3: GALERÍA Y NAVEGACIÓN
   ========================================= */
function showGallery() {
    document.getElementById('block-2-container').classList.add('hidden');
    document.getElementById('block-3-container').classList.remove('hidden');
}

/* =========================================
   7. UTILIDADES Y CONTROLES (MÚSICA, CELEBRACIÓN)
   ========================================= */

// Control manual del disco de música
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

// Generador de corazones y brillos flotantes
function createCelebration() {
    const p = document.createElement('div');
    p.innerHTML = Math.random() > 0.5 ? '❤️' : '✨';
    p.style.position = 'fixed';
    p.style.left = Math.random() * 100 + 'vw';
    p.style.top = '100vh';
    p.style.fontSize = '20px';
    p.style.zIndex = '500';
    p.style.pointerEvents = 'none'; // Para que no estorben al hacer clic
    document.body.appendChild(p);
    
    p.animate([
        { transform: 'translateY(0)', opacity: 1 },
        { transform: 'translateY(-110vh)', opacity: 0 }
    ], { duration: 4000 });

    setTimeout(() => p.remove(), 4000);
}
