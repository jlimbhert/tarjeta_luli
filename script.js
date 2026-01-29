// ===== CONTADOR PRINCIPAL =====
const fechaInicio = new Date(2025,10,13,0,0,0);
function actualizarContador() {
    const ahora = new Date();
    let diff = ahora - fechaInicio;
    let seg = Math.floor(diff/1000),
        min = Math.floor(seg/60),
        hrs = Math.floor(min/60),
        diasTot = Math.floor(hrs/24);
    const años = Math.floor(diasTot/365),
          meses = Math.floor((diasTot%365)/30),
          dias = (diasTot%365)%30;
    const hrsR = hrs%24, minR = min%60, segR = seg%60;
    document.getElementById('tiempo-principal').innerText=
        `${años} años, ${meses} meses y ${dias} días`;
    document.getElementById('reloj-secundario').innerText=
        `${hrsR.toString().padStart(2,'0')}:${minR.toString().padStart(2,'0')}:${segR.toString().padStart(2,'0')}`;
}
setInterval(actualizarContador,1000);
actualizarContador();

// ===== MÚSICA =====
const musica = new Audio('assets/audio/cancion.mp3');
const btnPlay = document.getElementById('btn-play');
const barraProgreso = document.getElementById('progreso-cancion');

musica.addEventListener("timeupdate",()=>{
    const porcentaje = (musica.currentTime/musica.duration)*100;
    barraProgreso.style.width = porcentaje + "%";
});

// ===== VERSO =====
const verso = document.getElementById("verso");
const texto = verso.innerText;
verso.innerHTML="";
let i=0, versoIniciado=false;
function escribirVerso(){
    if(i<texto.length){
        const span=document.createElement("span");
        span.innerText=texto[i];
        span.style.opacity=0;
        span.style.transition="opacity 0.6s ease,text-shadow 0.6s ease";
        span.style.textShadow="0 0 2px rgba(224,247,250,0.2)";
        verso.appendChild(span);
        setTimeout(()=>{span.style.opacity=1; span.style.textShadow="0 0 10px rgba(224,247,250,0.6)";},50);
        i++; setTimeout(escribirVerso,80);
    }
}

// ===== PORTADA =====
const portada = document.getElementById('portada');
const corazon = document.getElementById('corazon-inicio');
const fotoPrincipal = document.getElementById('foto-principal');

corazon.addEventListener('click',()=>{
    musica.play(); 
    btnPlay.innerText='⏸ Pausa';
    if(!versoIniciado){escribirVerso(); versoIniciado=true;}
    portada.style.opacity=0;
    fotoPrincipal.classList.add("brillo");
    setTimeout(()=>{portada.style.display='none';},800);
});

// ===== BOTÓN PLAY =====
btnPlay.addEventListener('click',()=>{
    if(musica.paused){
        musica.play(); 
        btnPlay.innerText='⏸ Pausa';
        if(!versoIniciado){escribirVerso(); versoIniciado=true;}
        fotoPrincipal.classList.add("brillo");
    } else{
        musica.pause(); 
        btnPlay.innerText='▶ Play';
        fotoPrincipal.classList.remove("brillo");
    }
});

// ===== CONTADOR PAREJA =====
const btnChica = document.getElementById("btn-chica");
const btnChico = document.getElementById("btn-chico");
const contadorPareja = document.getElementById("contador-pareja");
const bloquePareja = document.getElementById("bloque-pareja");

// SONIDO CLICK
const sonidoClick = new Audio('assets/audio/click.mp3');
sonidoClick.preload = "auto";

let diasJuntos = parseInt(localStorage.getItem("diasJuntos"))||0;
let clicksHoy = JSON.parse(localStorage.getItem("clicksHoy"))||{chica:false,chico:false};
let ultimaFecha = localStorage.getItem("ultimaFecha")||new Date().toDateString();

function reiniciarSiNuevoDia(){
    const hoy = new Date().toDateString();
    if(ultimaFecha!==hoy){
        clicksHoy={chica:false,chico:false};
        localStorage.setItem("clicksHoy",JSON.stringify(clicksHoy));
        ultimaFecha=hoy;
        localStorage.setItem("ultimaFecha",ultimaFecha);
        bloquePareja.style.borderColor='transparent';
        btnChica.classList.remove("activo");
        btnChico.classList.remove("activo");
    }
}

function actualizarContadorPareja(){
    contadorPareja.innerText=`${diasJuntos}`;
}

// ===== CREAR CONFETI =====
function crearConfeti(){
    const cont=document.getElementById("confeti-container");
    for(let i=0;i<30;i++){
        const c=document.createElement("div");
        const size = Math.random()*8 + 4;
        const hue = Math.random()*360;
        c.style.position="fixed";
        c.style.width=c.style.height=size+"px";
        c.style.background=`hsl(${hue},80%,70%)`;
        c.style.left=Math.random()*100+"%";
        c.style.top="-20px";
        c.style.opacity=Math.random()*0.9+0.3;
        c.style.borderRadius="50%";
        c.style.zIndex="999";
        c.style.pointerEvents="none";
        c.style.transform=`rotate(${Math.random()*360}deg)`;
        c.style.animation=`caerConfeti ${2+Math.random()*3}s linear forwards`;
        cont.appendChild(c);
        setTimeout(()=>c.remove(),5000);
    }
}

// ===== POP ANIM MULTICOLOR =====
function crearPop(x,y){
    const pop = document.createElement("div");
    pop.className="pop-anim";
    pop.style.position="fixed";
    pop.style.left = x+"px";
    pop.style.top = y+"px";
    const color = `hsl(${Math.random()*360},80%,70%)`;
    pop.style.color = color;
    pop.style.zIndex="9999";
    pop.style.pointerEvents="none";
    pop.innerText="✨";
    pop.style.opacity="1";
    pop.style.transform="scale(0.5)";
    document.body.appendChild(pop);
    setTimeout(()=>{
        pop.style.transform="scale(1.5)";
        pop.style.opacity="0";
    },50);
    setTimeout(()=>pop.remove(),800);
}

// ===== CLICK PAREJA =====
function clickPareja(tipo, evento){
    reiniciarSiNuevoDia();
    sonidoClick.currentTime = 0;
    sonidoClick.play();

    const rect = evento.target.getBoundingClientRect();
    crearPop(rect.left + rect.width/2, rect.top);

    if(!clicksHoy[tipo]){
        clicksHoy[tipo]=true; 
        localStorage.setItem("clicksHoy",JSON.stringify(clicksHoy));
        if(tipo==="chica"){ 
            bloquePareja.style.borderTopColor='red'; 
            bloquePareja.style.borderLeftColor='red'; 
            btnChica.classList.add("activo");
        }
        if(tipo==="chico"){ 
            bloquePareja.style.borderBottomColor='purple'; 
            bloquePareja.style.borderRightColor='purple'; 
            btnChico.classList.add("activo");
        }
    }

    if(clicksHoy.chica && clicksHoy.chico){
        diasJuntos++;
        localStorage.setItem("diasJuntos",diasJuntos);
        crearConfeti();
        clicksHoy={chica:false,chico:false};
        localStorage.setItem("clicksHoy",JSON.stringify(clicksHoy));
        bloquePareja.style.borderColor='transparent';
        btnChica.classList.remove("activo");
        btnChico.classList.remove("activo");
    }

    actualizarContadorPareja();
}

btnChica.addEventListener("click",(e)=>clickPareja("chica", e));
btnChico.addEventListener("click",(e)=>clickPareja("chico", e));

reiniciarSiNuevoDia();
actualizarContadorPareja();
setInterval(reiniciarSiNuevoDia,60*1000);
