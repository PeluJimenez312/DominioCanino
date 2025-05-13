let turno = 1;
let jugadores = [];
let tiempoRestante = 60;
let añoActual = 2013;
let intervaloTiempo;
let intervaloAño;

function iniciarRelojTiempo() {
    tiempoRestante = 60;
    document.getElementById("relojTiempo").innerText = tiempoRestante;

    clearInterval(intervaloTiempo);
    intervaloTiempo = setInterval(() => {
        if (tiempoRestante > 0) {
            tiempoRestante--;
            document.getElementById("relojTiempo").innerText = tiempoRestante;
        } else {
            siguienteTurno();
        }
    }, 1000); // Se actualiza cada segundo
}

function iniciarRelojAño() {
    document.getElementById("relojAño").innerText = añoActual;

    intervaloAño = setInterval(() => {
        añoActual++;
        if (añoActual > 3000) {
            añoActual = 2013; // Reinicia el año al llegar a 3000
        }
        document.getElementById("relojAño").innerText = añoActual;
    }, 120000); // Se actualiza cada 120 segundos (2 minutos)
}

function siguienteTurno() {
    turno++;
    document.getElementById("turno").innerText = turno;
    iniciarRelojTiempo();
}

function agregarJugador() {
    let nombre = document.getElementById("nombreJugador").value;
    let raza = document.getElementById("razaJugador").value;

    if (nombre) {
        jugadores.push({ nombre, raza });

        let lista = document.getElementById("listaJugadores");
        let nuevoJugador = document.createElement("li");
        nuevoJugador.innerText = `${nombre} (${raza})`;
        lista.appendChild(nuevoJugador);

        document.getElementById("nombreJugador").value = "";
    }
}

// Iniciar relojes al cargar la página
window.onload = () => {
    iniciarRelojTiempo();
    iniciarRelojAño();
};
