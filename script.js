let jugadores = [];
let turnos = {};
let turnoActual = 0;
let tiempoRestante = 120;
let añoActual = 2013;
let intervaloTiempo;
let intervaloAño;

function iniciarJuego() {
    let nombre = document.getElementById("nombreJugador").value;
    if (nombre) {
        jugadores.push(nombre);
        turnos[nombre] = 1500; // Cada jugador empieza con $1,500
        document.getElementById("listaJugadores").innerHTML += `<li>${nombre} - 💰 $${turnos[nombre]}</li>`;
        
        if (jugadores.length === 1) {
            document.getElementById("turnoJugador").innerText = jugadores[0];
            iniciarRelojTiempo();
            iniciarRelojAño();
        }
        
        document.getElementById("nombreJugador").value = "";
    }
}

function iniciarRelojTiempo() {
    tiempoRestante = 120;
    document.getElementById("relojTiempo").innerText = tiempoRestante;

    clearInterval(intervaloTiempo);
    intervaloTiempo = setInterval(() => {
        if (tiempoRestante > 0) {
            tiempoRestante--;
            document.getElementById("relojTiempo").innerText = tiempoRestante;
        } else {
            siguienteTurno();
        }
    }, 1000);
}

function iniciarRelojAño() {
    document.getElementById("relojAño").innerText = añoActual;

    intervaloAño = setInterval(() => {
        añoActual++;
        if (añoActual > 3000) {
            añoActual = 2013;
        }
        document.getElementById("relojAño").innerText = añoActual;
    }, 120000);
}

function siguienteTurno() {
    if (jugadores.length > 0) {
        turnoActual = (turnoActual + 1) % jugadores.length;
        document.getElementById("turnoJugador").innerText = jugadores[turnoActual];
        iniciarRelojTiempo();
    } else {
        alert("Agrega jugadores antes de iniciar la partida.");
    }
}
