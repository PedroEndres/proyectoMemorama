let selecciones = [];
let movimientos = 0;
let temporizador = false;
let timer = 0;
let aciertos = 0;
let tiempoSucesivoId = null;
let cantidadTarjetas = 12;

let mostrarMovimientos = document.getElementById("movimientos");
let mostrarTiempo = document.getElementById("tiempo");
let backgroundBody = document.querySelector("body");
mostrarTiempo.style.display = "none";
mostrarMovimientos.style.display = "none";
function generarTablero() {
  mostrarTiempo.style.display = "block";
  mostrarMovimientos.style.display = "block";
  let iconos = [
    '<img class="img-caratrasera" src="img/batman.png" alt="Imagen de Batman"/>',
    '<img class="img-caratrasera" src="img/superman.png" alt="Imagen de Superman"/>',
    '<img class="img-caratrasera" src="img/wonderWoman.png" alt="Imagen de Mujer Maravilla"/>',
    '<img class="img-caratrasera" src="img/joker.png" alt="Imagen de Guasón/Joker"/>',
    '<img class="img-caratrasera" src="img/flash.png" alt="Imagen de Flash"/>',
    '<img class="img-caratrasera" src="img/deathStroke.png" alt="Imagen de Deathstroke"/>',
  ];
  backgroundBody.style.backdropFilter = "brightness(0.3)";
  backgroundBody.style.transition = "2s";
  selecciones = [];
  movimientos = 0;
  mostrarMovimientos.innerHTML = `Movimientos: ${movimientos}`;
  aciertos = 0;
  temporizador = false;
  timer = 0;
  mostrarTiempo.innerHTML = `Tiempo: ${timer} segundos`;
  let tablero = document.getElementById("tablero");
  let tarjetas = [];
  for (let i = 0; i < cantidadTarjetas; i++) {
    tarjetas.push(`
    <div class="area-tarjeta" onclick="seleccionarTarjeta(${i})">
    <div class="tarjeta" id="tarjeta${i}">
      <div class="cara trasera" id="trasera${i}">
        ${iconos[0]}
      </div>
      <div class="cara superior"></div>
      <img
        class="img-carasuperior"
        src="img/backCardDCComics.png"
        alt="Imagen del logo de la carta"
      />
    </div>
  </div>`);
    if (i % 2 == 1) {
      iconos.splice(0, 1);
    }
  }
  tarjetas.sort(() => Math.random() - 0.5);
  tablero.innerHTML = tarjetas.join(" ");
}

function contarTiempo() {
  tiempoSucesivoId = setInterval(() => {
    timer++;
    mostrarTiempo.innerHTML = `Tiempo: ${timer} segundos`;
    if (aciertos == cantidadTarjetas / 2) {
      clearInterval(tiempoSucesivoId);
    }
  }, 1000);
}

function seleccionarTarjeta(i) {
  let tarjeta = document.getElementById("tarjeta" + i);
  if (tarjeta.style.transform != "rotateY(180deg)") {
    tarjeta.style.transform = "rotateY(180deg)";
    selecciones.push(i);
  }
  if (selecciones.length == 2) {
    deseleccionar(selecciones);
    selecciones = [];
    movimientos++;
    mostrarMovimientos.innerHTML = `Movimientos: ${movimientos}`;
  }
  if (temporizador == false) {
    contarTiempo(selecciones);
    temporizador = true;
  }
}

function deseleccionar(selecciones) {
  setTimeout(() => {
    let trasera1 = document.getElementById("trasera" + selecciones[0]);
    let trasera2 = document.getElementById("trasera" + selecciones[1]);
    if (trasera1.innerHTML != trasera2.innerHTML) {
      let tarjeta1 = document.getElementById("tarjeta" + selecciones[0]);
      let tarjeta2 = document.getElementById("tarjeta" + selecciones[1]);
      tarjeta1.style.transform = "rotateY(0deg)";
      tarjeta2.style.transform = "rotateY(0deg)";
    } else {
      trasera1.style.background = "#3a89c9";
      trasera2.style.background = "#3a89c9";
      aciertos++;
    }
    if (fin()) {
      swal.fire({
        title: `El juego ha finalizado`,
        text: `Felicitaciones! Movimientos: ${movimientos}, Tiempo: ${
          timer + 1
        } segundos`,
        icon: `success`,
      });
    }
  }, 800);
}

function fin() {
  if (aciertos != cantidadTarjetas / 2) {
    return false;
  }
  return true;
}
