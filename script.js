const sky = document.getElementById('sky');
const cover = document.getElementById('cover');
const mainIcon = document.getElementById('mainIcon');
const mainContent = document.getElementById('main-content');
const mainAudio = document.getElementById('mainAudio');
const clickSound = document.getElementById('clickSound');

const startDate = new Date('2025-11-13T00:00:00');

// 1. GENERAR ESTRELLAS
for (let i = 0; i < 150; i++) {
    const star = document.createElement('div');
    star.className = 'star';
    star.style.top = Math.random() * 100 + 'vh';
    star.style.left = Math.random() * 100 + 'vw';
    const size = Math.random() * 2 + 1;
    star.style.width = size + 'px'; star.style.height = size + 'px';
    star.style.animationDuration = (Math.random() * 3 + 2) + 's';
    sky.appendChild(star);
}

// 2. EXPLOSIÓN Y MÚSICA
mainIcon.addEventListener('click', () => {
    if (mainAudio) mainAudio.play();
    if (clickSound) clickSound.play();
    cover.classList.add('explode');
    setTimeout(() => {
        cover.style.display = 'none';
        mainContent.classList.remove('hidden');
        setTimeout(() => {
            mainContent.classList.add('active');
            startTypewriter();
        }, 50);
    }, 800);
});

// 3. MÁQUINA DE ESCRIBIR
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
                // Oculta el Bloque 1 y muestra el Contenedor del Bloque 2
                document.getElementById('main-content').classList.add('hidden');
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

// 4. CONTADOR INTELIGENTE
function startCounter() {
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
        if (years > 0) {
            html += `<div class="counter-box"><span>${years.toString().padStart(2, '0')}</span><label>Años</label></div>`;
        }
        html += `<div class="counter-box"><span>${months.toString().padStart(2, '0')}</span><label>Meses</label></div>`;
        html += `<div class="counter-box"><span>${days.toString().padStart(2, '0')}</span><label>Días</label></div>`;
        
        document.getElementById('main-counter').innerHTML = html;

        const nextDay = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
        const diff = nextDay - now;
        const h = Math.floor((diff / 3600000) % 24);
        const m = Math.floor((diff / 60000) % 60);
        const s = Math.floor((diff / 1000) % 60);
        document.getElementById('next-day-text').innerHTML = `Faltan <b>${h}h ${m}m ${s}s</b> para sumarle un día más a nuestra historia`;
    }, 1000);
}

// 5. EFECTO CELEBRACIÓN
function createCelebration() {
    const p = document.createElement('div');
    p.innerHTML = Math.random() > 0.5 ? '❤️' : '✨';
    p.style.position = 'fixed';
    p.style.left = Math.random() * 100 + 'vw';
    p.style.top = '100vh';
    p.style.fontSize = (Math.random() * 20 + 10) + 'px';
    p.style.zIndex = '1000';
    document.body.appendChild(p);

    p.animate([
        { transform: 'translateY(0) rotate(0deg)', opacity: 1 },
        { transform: 'translateY(-110vh) rotate(360deg)', opacity: 0 }
    ], { duration: 4000 });

    setTimeout(() => p.remove(), 4000);
}
