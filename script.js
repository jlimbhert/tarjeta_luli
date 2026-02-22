document.addEventListener("DOMContentLoaded", () => {

    /* =====================================
       CONFIGURACIÓN
    ===================================== */

    const fechaInicio = new Date(2025, 10, 13, 0, 0, 0); // OJO: Mes 10 = Noviembre

    const musica = new Audio("assets/audio/cancion.mp3");
    const sonidoClick = new Audio("assets/audio/click.mp3");
    sonidoClick.preload = "auto";

    /* =====================================
       SELECTORES
    ===================================== */

    const tiempoPrincipal = document.getElementById("tiempo-principal");
    const relojSecundario = document.getElementById("reloj-secundario");
    const btnPlay = document.getElementById("btn-play");
    const barraProgreso = document.getElementById("progreso-cancion");
    const verso = document.getElementById("verso");
    const portada = document.getElementById("portada");
    const corazon = document.getElementById("corazon-inicio");
    const fotoPrincipal = document.getElementById("foto-principal");

    const btnChica = document.getElementById("btn-chica");
    const btnChico = document.getElementById("btn-chico");
    const contadorPareja = document.getElementById("contador-pareja");
    const bloquePareja = document.getElementById("bloque-pareja");

    /* =====================================
       CONTADOR PRINCIPAL
    ===================================== */

    function actualizarContador() {

        const ahora = new Date();
        const diff = ahora - fechaInicio;

        const totalSeg = Math.floor(diff / 1000);
        const totalMin = Math.floor(totalSeg / 60);
        const totalHrs = Math.floor(totalMin / 60);
        const totalDias = Math.floor(totalHrs / 24);

        const años = Math.floor(totalDias / 365);
        const meses = Math.floor((totalDias % 365) / 30);
        const dias = (totalDias % 365) % 30;

        const hrs = totalHrs % 24;
        const min = totalMin % 60;
        const seg = totalSeg % 60;

        tiempoPrincipal.textContent =
            `${años} años, ${meses} meses y ${dias} días`;

        relojSecundario.textContent =
            `${String(hrs).padStart(2, "0")}:` +
            `${String(min).padStart(2, "0")}:` +
            `${String(seg).padStart(2, "0")}`;
    }

    setInterval(actualizarContador, 1000);
    actualizarContador();

    /* =====================================
       MÚSICA
    ===================================== */

    musica.addEventListener("timeupdate", () => {
        if (!musica.duration) return;
        const porcentaje = (musica.currentTime / musica.duration) * 100;
        barraProgreso.style.width = porcentaje + "%";
    });

    btnPlay.addEventListener("click", toggleMusica);

    function toggleMusica() {
        if (musica.paused) {
            musica.play();
            btnPlay.textContent = "⏸ Pausa";
            iniciarVerso();
            fotoPrincipal.classList.add("brillo");
        } else {
            musica.pause();
            btnPlay.textContent = "▶ Play";
            fotoPrincipal.classList.remove("brillo");
        }
    }

    /* =====================================
       VERSO ANIMADO
    ===================================== */

    let versoIniciado = false;

    function iniciarVerso() {
        if (versoIniciado) return;
        versoIniciado = true;

        const texto = verso.textContent;
        verso.textContent = "";

        let i = 0;

        function escribir() {
            if (i >= texto.length) return;

            const span = document.createElement("span");
            span.textContent = texto[i];
            span.style.opacity = "0";
            span.style.transition = "opacity 0.6s ease";

            verso.appendChild(span);

            requestAnimationFrame(() => {
                span.style.opacity = "1";
            });

            i++;
            setTimeout(escribir, 80);
        }

        escribir();
    }

    /* =====================================
       PORTADA
    ===================================== */

    corazon.addEventListener("click", () => {
        toggleMusica();
        portada.style.opacity = 0;
        setTimeout(() => portada.style.display = "none", 800);
    });

    /* =====================================
       CONTADOR PAREJA
    ===================================== */

    let diasJuntos = parseInt(localStorage.getItem("diasJuntos")) || 0;
    let clicksHoy = JSON.parse(localStorage.getItem("clicksHoy")) || {
        chica: false,
        chico: false
    };
    let ultimaFecha = localStorage.getItem("ultimaFecha") || new Date().toDateString();

    function reiniciarSiNuevoDia() {
        const hoy = new Date().toDateString();

        if (ultimaFecha !== hoy) {
            clicksHoy = { chica: false, chico: false };
            ultimaFecha = hoy;

            localStorage.setItem("clicksHoy", JSON.stringify(clicksHoy));
            localStorage.setItem("ultimaFecha", ultimaFecha);

            limpiarEstadosVisuales();
        }
    }

    function limpiarEstadosVisuales() {
        bloquePareja.style.borderColor = "transparent";
        [btnChica, btnChico].forEach(btn =>
            btn.classList.remove("activo")
        );
    }

    function actualizarContadorPareja() {
        contadorPareja.textContent = diasJuntos;
    }

    function clickPareja(tipo, evento) {

        reiniciarSiNuevoDia();

        sonidoClick.currentTime = 0;
        sonidoClick.play();

        crearPop(evento);

        if (!clicksHoy[tipo]) {
            clicksHoy[tipo] = true;
            localStorage.setItem("clicksHoy", JSON.stringify(clicksHoy));
            evento.target.classList.add("activo");
        }

        if (clicksHoy.chica && clicksHoy.chico) {
            diasJuntos++;
            localStorage.setItem("diasJuntos", diasJuntos);

            crearConfeti();
            clicksHoy = { chica: false, chico: false };
            localStorage.setItem("clicksHoy", JSON.stringify(clicksHoy));

            limpiarEstadosVisuales();
        }

        actualizarContadorPareja();
    }

    btnChica.addEventListener("click", e => clickPareja("chica", e));
    btnChico.addEventListener("click", e => clickPareja("chico", e));

    reiniciarSiNuevoDia();
    actualizarContadorPareja();
    setInterval(reiniciarSiNuevoDia, 60000);

    /* =====================================
       EFECTOS
    ===================================== */

    function crearConfeti() {
        const cont = document.getElementById("confeti-container");

        for (let i = 0; i < 30; i++) {
            const c = document.createElement("div");
            const size = Math.random() * 8 + 4;

            c.style.position = "fixed";
            c.style.width = c.style.height = size + "px";
            c.style.background = `hsl(${Math.random() * 360},80%,70%)`;
            c.style.left = Math.random() * 100 + "%";
            c.style.top = "-20px";
            c.style.borderRadius = "50%";
            c.style.animation = `caerConfeti ${2 + Math.random() * 3}s linear forwards`;

            cont.appendChild(c);
            setTimeout(() => c.remove(), 5000);
        }
    }

    function crearPop(evento) {
        const rect = evento.target.getBoundingClientRect();

        const pop = document.createElement("div");
        pop.className = "pop-anim";
        pop.style.left = rect.left + rect.width / 2 + "px";
        pop.style.top = rect.top + "px";
        pop.style.color = `hsl(${Math.random() * 360},80%,70%)`;
        pop.textContent = "✨";

        document.body.appendChild(pop);
        setTimeout(() => pop.remove(), 800);
    }

});
