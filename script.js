let jugadores = []; // Lista de jugadores
let turnoActual = 0; // Índice del jugador en turno
let tiempoRestante = 120;
let añoActual = 2013;
let intervaloTiempo;
let intervaloAño;

function iniciarJuego() {
    let nombre = document.getElementById("nombreJugador").value;
    if (nombre) {
        jugadores.push(nombre); // Agregar el jugador a la lista
        document.getElementById("listaJugadores").innerHTML += `<li>${nombre}</li>`;
        
        // Si es el primer jugador, inicia el juego con su nombre en turno
        if (jugadores.length === 1) {
            document.getElementById("turnoJugador").innerText = jugadores[0];
            iniciarRelojTiempo();
            iniciarRelojAño();
        }

        document.getElementById("nombreJugador").value = ""; // Limpiar el campo de entrada
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
            añoActual = 2013; // Reinicia el año al llegar a 3000
        }
        document.getElementById("relojAño").innerText = añoActual;
    }, 120000); // Cambia de año cada 2 minutos
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

// Iniciar relojes al cargar la página si ya hay jugadores registrados
window.onload = () => {
    if (jugadores.length > 0) {
        iniciarRelojTiempo();
        iniciarRelojAño();
    }
};
