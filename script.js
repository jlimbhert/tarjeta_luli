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
    const verso = "Eres la luz que ilumina mis noches,\nel sueño del que no quiero despertar.\nMi pequeña Luli,\ncontigo el mundo es un lugar mejor.";
    let i = 0;
    textContainer.innerHTML = "";

    function type() {
        if (i < verso.length) {
            textContainer.innerHTML += verso.charAt(i) === "\n" ? "<br>" : verso.charAt(i);
            i++;
            setTimeout(type, 100);
        } else {
            const btn = document.createElement('button');
            btn.className = "btn-continue";
            btn.innerHTML = "Ver nuestro tiempo juntos ❤️";
            btn.onclick = () => {
                mainContent.classList.add('hidden');
                document.getElementById('block-2-container').classList.remove('hidden');
                startCounter(); // Inicia el Bloque 2
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
   6. BLOQUE 3: GALERÍA Y NAVEGACIÓN
   ========================================= */
function showGallery() {
    document.getElementById('block-2-container').classList.add('hidden');
    document.getElementById('block-3-container').classList.remove('hidden');

    // Muestra el botón para el Bloque 4 después de 6 segundos
    setTimeout(() => {
        const btn4 = document.getElementById('btn-to-block4');
        if (btn4) btn4.classList.remove('hidden');
    }, 6000);
}

// Función para ir al Bloque 4
function showBlock4() {
    const b3 = document.getElementById('block-3-container');
    const b4 = document.getElementById('block-4-container');
    
    if (b3) b3.classList.add('hidden');
    if (b4) b4.classList.remove('hidden');
}

/* =========================================
   7. UTILIDADES (MÚSICA Y CELEBRACIÓN)
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
    p.innerHTML = Math.random() > 0.5 ? '❤️' : '✨';
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
