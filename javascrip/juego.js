const cuadro = document.getElementById("cuadro");
const puntosText = document.getElementById("puntos");
const mensaje = document.getElementById("mensaje");
const juego = document.getElementById("juego");

let puntos = 0;
let velocidad = 1000;

function moverCuadro() {
  const maxX = juego.clientWidth - cuadro.offsetWidth;
  const maxY = juego.clientHeight - cuadro.offsetHeight;
  const nuevoX = Math.floor(Math.random() * maxX);
  const nuevoY = Math.floor(Math.random() * maxY);
  cuadro.style.left = nuevoX + "px";
  cuadro.style.top = nuevoY + "px";
}

function perder() {
  mensaje.textContent = "¡Perdiste! Puntos: " + puntos;
  cuadro.style.display = "none";
  clearInterval(intervalo);
}

cuadro.addEventListener("click", () => {
  puntos++;
  puntosText.textContent = "Puntos: " + puntos;
  moverCuadro();
  velocidad *= 0.95;
  clearInterval(intervalo);
  intervalo = setInterval(() => {
    moverCuadro();
    perder(); 
  }, velocidad);
});

let intervalo = setInterval(() => {
  moverCuadro();
  perder();
}, velocidad);
