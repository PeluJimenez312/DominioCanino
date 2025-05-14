// Variables de juego
let jugadores = JSON.parse(localStorage.getItem("jugadores")) || [];
let turnos = JSON.parse(localStorage.getItem("turnos")) || {};
let turnoActual = 0;
let tiempoRestante = 120;
let intervaloTiempo;

// Guardar jugadores en localStorage
function guardarJugadores() {
    localStorage.setItem("jugadores", JSON.stringify(jugadores));
    localStorage.setItem("turnos", JSON.stringify(turnos));
}

// Función para iniciar el juego
function iniciarJuego() {
    let nombre = document.getElementById("nombreJugador").value;

    if (nombre.trim() !== "") { 
        jugadores.push(nombre);
        turnos[nombre] = 1500;
        guardarJugadores();

        let listaJugadores = document.getElementById("listaJugadores");
        let nuevoJugador = document.createElement("li");
        nuevoJugador.innerText = `${nombre} - 💰 $${turnos[nombre]}`;
        listaJugadores.appendChild(nuevoJugador);

        if (jugadores.length === 1) {
            document.getElementById("turnoJugador").innerText = jugadores[0];
            iniciarTemporizador();
        }

        document.getElementById("nombreJugador").value = "";
    } else {
        alert("Debes ingresar un nombre antes de iniciar.");
    }
}

// Función para iniciar el temporizador
function iniciarTemporizador() {
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

// Función para cambiar de turno
function siguienteTurno() {
    if (jugadores.length > 0) {
        turnoActual++;
        turnoActual = turnoActual % jugadores.length;
        document.getElementById("turnoJugador").innerText = jugadores[turnoActual];
        iniciarTemporizador();
    } else {
        alert("Agrega jugadores antes de iniciar la partida.");
    }
}

// Función para actualizar dinero de los jugadores en pantalla
function actualizarDineroJugadores() {
    let listaJugadores = document.getElementById("listaJugadores");
    listaJugadores.innerHTML = "";

    jugadores.forEach(jugador => {
        let nuevoJugador = document.createElement("li");
        nuevoJugador.innerText = `${jugador} - 💰 $${turnos[jugador]}`;
        listaJugadores.appendChild(nuevoJugador);
    });
}

// Recargar la lista de jugadores al cargar `index.html`
document.addEventListener("DOMContentLoaded", function () {
    actualizarDineroJugadores();
});
