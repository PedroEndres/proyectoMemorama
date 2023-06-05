let selecciones = [];
let movimientos = 0;
let temporizador = false;
let timer = 0;
let aciertos = 0;
let tiempoSucesivoId = null;
let cantidadTarjetas = 0;

let mostrarMovimientos = document.getElementById("movimientos");
let mostrarTiempo = document.getElementById("tiempo");
let backgroundBody = document.querySelector("body");
let newGame = document.querySelector(".nuevo-juego");
let tablero = document.getElementById("tablero");

mostrarTiempo.style.display = "none";
mostrarMovimientos.style.display = "none";
newGame.style.display = "none";

function generarTablero(x) {
  let iconos = [
    '<img class="img-caratrasera" src="img/batman.png" alt="Imagen de Batman"/>',
    '<img class="img-caratrasera" src="img/superman.png" alt="Imagen de Superman"/>',
    '<img class="img-caratrasera" src="img/wonderWoman.png" alt="Imagen de Mujer Maravilla"/>',
    '<img class="img-caratrasera" src="img/joker.png" alt="Imagen de Guasón/Joker"/>',
    '<img class="img-caratrasera" src="img/flash.png" alt="Imagen de Flash"/>',
    '<img class="img-caratrasera" src="img/deathStroke.png" alt="Imagen de Deathstroke"/>',
    '<img class="img-caratrasera" src="img/acertijo.png" alt="Imagen de Acertijo"/>',
    '<img class="img-caratrasera" src="img/aquaman.png" alt="Imagen de Aquaman"/>',
    '<img class="img-caratrasera" src="img/catWoman.png" alt="Imagen de Gatubela"/>',
    '<img class="img-caratrasera" src="img/cyborg.png" alt="Imagen de Cyborg"/>',
    '<img class="img-caratrasera" src="img/greenLantern.png" alt="Imagen de Linterna verde"/>',
    '<img class="img-caratrasera" src="img/penguin.png" alt="Imagen del Pinguino"/>',
  ];
  selecciones = [];
  movimientos = 0;
  aciertos = 0;
  timer = 0;
  cantidadTarjetas = x;
  temporizador = false;
  let tarjetas = [];

  mostrarMovimientos.innerHTML = `Movimientos: ${movimientos}`;
  mostrarTiempo.innerHTML = `Tiempo: ${timer} segundos`;

  newGame.style.display = "flex";
  mostrarTiempo.style.display = "flex";
  mostrarMovimientos.style.display = "flex";
  backgroundBody.style.backdropFilter = "brightness(0.3)";
  backgroundBody.style.transition = "2s";

  detenerTiempo();

  if (x === 6) {
    newGame.setAttribute("onclick", "generarTablero(6)");
  } else if (x === 12) {
    newGame.setAttribute("onclick", "generarTablero(12)");
  } else if (x === 24) {
    newGame.setAttribute("onclick", "generarTablero(24)");
  }

  for (let i = 0; i < x; i++) {
    tarjetas.push(`
    <div class="area-tarjeta" onclick="seleccionarTarjeta(${i})">
    <div class="tarjeta" id="tarjeta${i}">
      <div class="cara trasera" id="trasera${i}">
        ${iconos[0]}
      </div>
      <div class="cara superior"></div>
      <img
        class="img-carasuperior"
        src="img/fondoCartaSuperior.png"
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

function detenerTiempo() {
  clearInterval(tiempoSucesivoId);
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
    contarTiempo();
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
      trasera1.style.background = "#11baac";
      trasera2.style.background = "#11baac";
      aciertos++;
    }
    if (fin()) {
      if (timer < 15) {
        Swal.fire({
          title: "Sweet!",
          text: "Modal with a custom image.",
          imageUrl: "img/christianBaleAgree.gif",
          imageWidth: 400,
          imageHeight: 350,
          title: `El juego ha finalizado`,
          text: `Felicitaciones! Movimientos: ${movimientos}, Tiempo: ${
            timer + 1
          } segundos`,
        });
      } else if (timer < 30) {
        Swal.fire({
          title: "Sweet!",
          text: "Modal with a custom image.",
          imageUrl: "img/christianBaleApproves.jpg",
          imageWidth: 350,
          imageHeight: 350,
          title: `El juego ha finalizado`,
          text: `Felicitaciones! Movimientos: ${movimientos}, Tiempo: ${
            timer + 1
          } segundos`,
        });
      } else {
        Swal.fire({
          title: "Sweet!",
          text: "Modal with a custom image.",
          imageUrl: "img/jokerAplauso.gif",
          imageWidth: 400,
          imageHeight: 350,
          title: `El juego ha finalizado`,
          text: `Felicitaciones! Movimientos: ${movimientos}, Tiempo: ${
            timer + 1
          } segundos`,
        });
      }
    }
  }, 800);
}

function fin() {
  if (aciertos != cantidadTarjetas / 2) {
    return false;
  }
  return true;
}
