import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '../dist/public/css/main.css';

import Game from './game.js';
import Swal from 'sweetalert2';

let player1;
let player2;
let personaje1 = "";
let personaje2 = "";
let turno = 1;



let historial = [];
let victoriasJugador1 = 0;
let victoriasJugador2 = 0;


let btn_py1 = document.getElementById("btn_py1");
let btn_py2 = document.getElementById("btn_py2");
let seleccion1 = document.getElementById("seleccion_personaje1");
let seleccion2 = document.getElementById("seleccion_personaje2");

//Audios
const audio = {
  background: new Audio('./public/audio/background.mp3'),
  seleccion: new Audio('./public/audio/SELECCION.mp3'),
  atk_basico: new Audio('./public/audio/atk_basico.mp3'),
  atk_especial: new Audio('./public/audio/atk_especial.mp3'),
  ki: new Audio('./public/audio/ki.mp3'),
  ermi: new Audio('./public/audio/ermi.mp3'),
  goku: new Audio('./public/audio/GOKU.mp3'),
  veguetta: new Audio('./public/audio/VEGUETTA.mp3'),
  gohan: new Audio('./public/audio/Gohan.mp3'),
  cell: new Audio('./public/audio/Cell.mp3'),
  veguito: new Audio('./public/audio/VEGITO.mp3'),
  trunks: new Audio('./public/audio/Trunks.mp3'),
  gogueta: new Audio('./public/audio/gogeta.mp3'),
  pikoro: new Audio('./public/audio/pikoro.mp3'),
  buu: new Audio('./public/audio/correbu.mp3'),
  freezer: new Audio('./public/audio/freezer.mp3'),
};

//Escenarios
const escenarios = [
  "fundo2.jpeg",
  "fondo1.jpg",
  "fondo3.jpeg",
  "fondo4.jpeg",
  "fondo5.jpeg",
  "torneo.jpg",
  "TorneoPoder.jpg"
];



const accionesPersonaje = {
  "Cell": {
    "basico": {
      img: "Cell/basico.png",
      msj: "¡Perfecto!"
    },
    "especial": {
      img: "Cell/especial.png",
      msj: "¡Kamehameha!"
    },
    "semilla": {
      img: "Cell/curar.png",
      msj: "¡Mi poder aumenta!"
    },
    "ki": {
      img: "Cell/energia.png",
      msj: "¡Aaahhhh!"
    }
  },
  "Gogueta": {
    "basico": {
      img: "Gogueta/basico.png",
      msj: "¡Fusionar es poder!"
    },
    "especial": {
      img: "Gogueta/especial.png",
      msj: "¡Final Kamehameha!"
    },
    "semilla": {
      img: "Gogueta/curar.png",
      msj: "¡Estamos listos para pelear!"
    },
    "ki": {
      img: "Gogueta/energia.png",
      msj: "¡Aaahhhh!"
    }
  },
  "Gohan": {
    "basico": {
      img: "Gohan/basico.png",
      msj: "¡No me subestimes!"
    },
    "especial": {
      img: "Gohan/especial.png",
      msj: "¡Kamehameha!"
    },
    "semilla": {
      img: "Gohan/curar.png",
      msj: "¡Mi poder ha despertado!"
    },
    "ki": {
      img: "Gohan/energia.png",
      msj: "¡Aaahhhh!"
    }
  },
  "Goku": {
    "basico": {
      img: "Goku/basico.png",
      msj: "¡Vamos a divertirnos!"
    },
    "especial": {
      img: "Goku/especial.png",
      msj: "¡Kamehamehaaa!"
    },
    "semilla": {
      img: "Goku/curar.png",
      msj: "¡Siento mi energía fluir!"
    },
    "ki": {
      img: "Goku/energia.png",
      msj: "¡Aaahhhh!"
    }
  },
  "Pikoro": {
    "basico": {
      img: "Pikoro/basico.png",
      msj: "¡Makankosappo!"
    },
    "especial": {
      img: "Pikoro/especial.png",
      msj: "¡Cuidado!"
    },
    "semilla": {
      img: "Pikoro/curar.png",
      msj: "¡Mi poder aumenta!"
    },
    "ki": {
      img: "Pikoro/energia.png",
      msj: "¡Aaahhhh!"
    }
  },
  "Trunks": {
    "basico": {
      img: "Trunks/basico.png",
      msj: "¡Adelante!"
    },
    "especial": {
      img: "Trunks/especial.png",
      msj: "¡Final Flash!"
    },
    "semilla": {
      img: "Trunks/curar.png",
      msj: "¡Mi poder está listo!"
    },
    "ki": {
      img: "Trunks/energia.png",
      msj: "¡Aaahhhh!"
    }
  },
  "Veguetta": {
    "basico": {
      img: "Veguetta/basico.png",
      msj: "¡No eres rival para mí!"
    },
    "especial": {
      img: "Veguetta/especial.png",
      msj: "¡Galick Gun!"
    },
    "semilla": {
      img: "Veguetta/curacion.png",
      msj: "¡Ahora sí estoy fuerte!"
    },
    "ki": {
      img: "Veguetta/energia.png",
      msj: "¡Aaahhhh!"
    }
  },
  "Veguito": {
    "basico": {
      img: "Veguito/basico.png",
      msj: "¡Ni en tus sueños!"
    },
    "especial": {
      img: "Veguito/especial.png",
      msj: "¡Final Kamehameha!"
    },
    "semilla": {
      img: "Veguito/curar.png",
      msj: "¡Fusionando poder!"
    },
    "ki": {
      img: "Veguito/energia.png",
      msj: "¡Aaahhhh!"
    }
  },
  "Buu": {
  "basico": {
    "img": "Buu/basico.png",
    "msj": "¡Buu aplasta!"
  },
  "especial": {
    "img": "Buu/especial.png",
    "msj": "¡Chocolate Beam!"
  },
  "semilla": {
    "img": "Buu/curar.png",
    "msj": "¡No me duele!"
  },
  "ki": {
    "img": "Buu/energia.png",
    "msj": "¡Majin Buu es el mejor!"
  }
},
"Freezer": {
  "basico": {
    "img": "Freezer/basico.png",
    "msj": "¡Morirás a mis manos!"
  },
  "especial": {
    "img": "Freezer/especial.png",
    "msj": "¡Es solo tu sangre!"
  },
  "semilla": {
    "img": "Freezer/curar.png",
    "msj": "¡No necesito ayuda!"
  },
  "ki": {
    "img": "Freezer/energia.png",
    "msj": "¡Me vengaré!"
  }
}
}


const alertaAtk = (personaje, accion) => {
  let timerInterval;
  Swal.fire({
    title: accionesPersonaje[personaje][accion].msj,
    imageUrl: `./public/img/${accionesPersonaje[personaje][accion].img}`,
    imageWidth: 400,
    imageHeight: 400,
    showCancelButton: false,
    showConfirmButton: false,
    background: "rgba(0, 0, 0, 0.3)",
    backdrop: "rgba(0, 0, 0, 0.2)",
    html: "<b></b>",
    timer: 4000,
    willClose: () => clearInterval(timerInterval)
  });
};


const cambiarSeleccion = (botones, seleccionado, color) => {
  botones.forEach(btn => {
    if (btn.querySelector("img").title === seleccionado) {
      btn.classList.remove(color);
      btn.classList.add("btn-warning");
    }
    else {
      btn.classList.remove("btn-warning");
      btn.classList.add(color);
    }
  });
};

seleccion1.querySelectorAll("button").forEach(btn => {
  btn.addEventListener("click", (evento) => {
    const personaje = evento.target.title;
    cambiarSeleccion(seleccion1.querySelectorAll("button"), personaje, "btn-danger");
    personaje1 = personaje;

    if (audio[personaje.toLowerCase()]) {
      audio[personaje.toLowerCase()].currentTime = 0;
      audio[personaje.toLowerCase()].play();
    }
  });
});

const ocultarSeleccion1 = () => {
  if (player1 != "" && personaje1 != "") {
    document.getElementById("jugador1").classList.add("d-none");
    document.getElementById("nombre_personaje1").innerText = personaje1;

  }
}
const ocultarSeleccion2 = () => {
  if (player2 != "" && personaje2 != "") {
    document.getElementById("jugador2").classList.add("d-none");
    document.getElementById("nombre_personaje2").innerText = personaje2;
  }
}
seleccion2.querySelectorAll("button").forEach(btn => {
  btn.addEventListener("click", (evento) => {
    const personaje = evento.target.title;
    cambiarSeleccion(seleccion2.querySelectorAll("button"), personaje, "btn-primary");
    personaje2 = personaje;

    if (audio[personaje.toLowerCase()]) {
      audio[personaje.toLowerCase()].currentTime = 0;
      audio[personaje.toLowerCase()].play();
    }
  });
});



btn_py1.addEventListener("click", () => {
  let user_py1 = document.getElementById("username_py1").value.trim();

  if (user_py1 === "") {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'El nombre del jugador 1 no puede estar vacío.'
    });
    return;
  }

  if (personaje1 === "") {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Debe seleccionar un personaje para el jugador 1.'
    });
    return;
  }

  player1 = new Game(user_py1);
  document.getElementById("username1").innerText = user_py1;
  document.getElementById("img_personaje1").src = `./public/img/${personaje1}/base.png`;
  ocultarSeleccion1();
  batalla();
});

const voladoInicio = async () => {
  await Swal.fire({
    title: "¡Decidiendo quién comienza!",
    text: "Lanzando la moneda...",
    // imageUrl: "./public/img/volado.gif",
    imageWidth: 200,
    background: "rgba(0,0,0,0.6)",
    color: "#fff",
    showConfirmButton: false,
    timer: 2500
  });

  const resultado = Math.random() < 0.5 ? 1 : 2;

  if (resultado === 1) {
    await Swal.fire({
      icon: "info",
      title: " ¡Cara!",
      text: `${player1.username} comenzará la batalla.`,
      background: "rgba(0,0,0,0.6)",
      color: "#fff",
      confirmButtonText: "¡A luchar!"
    });
  } else {
    await Swal.fire({
      icon: "info",
      title: "¡Cruz!",
      text: `${player2.username} comenzará la batalla.`,
      background: "rgba(0,0,0,0.6)",
      color: "#fff",
      confirmButtonText: "¡A luchar!"
    });
  }

  turno = resultado;
  actualizarTurno();
};


const batalla = async () => {
  if (!player1 || !player2 || personaje1 === "" || personaje2 === "") {
    Swal.fire({
      icon: 'error',
      title: 'Faltan datos para comenzar',
      text: 'Ambos jugadores deben tener nombre y personaje seleccionados.',
      confirmButtonText: 'Entendido'
    });
    return;
  }

  const fondoAleatorio = obtenerEscenarioAleatorio();
  document.body.style.backgroundImage = `url('./public/img/Plataformas/${fondoAleatorio}')`;
  document.body.style.backgroundSize = "cover";
  document.body.style.backgroundPosition = "center";
  document.body.style.backgroundRepeat = "no-repeat";

  document.getElementById("batalla").classList.remove("d-none");
  document.getElementById("seleccion_jugadores").classList.add("d-none");

  audio.background.volume = 0.3;
  audio.background.loop = true;
  audio.background.play();

  await voladoInicio();
};




btn_py2.addEventListener("click", () => {
  let user_py2 = document.getElementById("username_py2").value.trim();

  if (user_py2 === "") {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'El nombre del jugador 2 no puede estar vacío.'
    });
    return;
  }

  if (personaje2 === "") {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Debe seleccionar un personaje para el jugador 2.'
    });
    return;
  }

  player2 = new Game(user_py2);
  document.getElementById("username2").innerText = user_py2;
  document.getElementById("img_personaje2").src = `./public/img/${personaje2}/base.png`;

  ocultarSeleccion2();
  batalla();
});


document.getElementById("btn_ak_basico1").addEventListener("click", () => {
  if (turno !== 1) return;
  audio.atk_basico.play();

  if (player1.getEnergia() < 150 || player1.getKi() < 200) {
    Swal.fire({
      icon: 'warning',
      title: '¡Sin Energía o Ki!',
      text: 'Necesitas cargar Ki o usar una semilla del ermitaño antes de atacar.',
      timer: 2500,
      showConfirmButton: false
    });
    return;
  }

  alertaAtk(personaje1, "basico");

  player1.atk_basico(player2);
  document.getElementById("vida2").style.width = `${(player2.getVida() / 10)}%`;
  document.getElementById("vida2").innerText = `${player2.getVida()}`;
  verificarGanador();

  document.getElementById("energia1").style.width = `${(player1.getEnergia() / 10)}%`;
  document.getElementById("energia1").innerText = `${player1.getEnergia()}`;

  document.getElementById("ki1").style.width = `${(player1.getKi() / 10)}%`;
  document.getElementById("ki1").innerText = `${player1.getKi()}`;

  cambiarTurno();
});

document.getElementById("btn_ak_especial1").addEventListener("click", () => {
  if (turno !== 1) return;
  audio.atk_especial.play();

  if (player1.getEnergia() < 300 || player1.getKi() < 500) {
    Swal.fire({
      icon: 'warning',
      title: '¡No tienes suficiente poder!',
      text: 'Carga Ki o usa una semilla antes de lanzar un ataque especial.',
      timer: 2500,
      showConfirmButton: false
    });
    return;
  }

  alertaAtk(personaje1, "especial");

  player1.atk_especial(player2);
  document.getElementById("vida2").style.width = `${(player2.getVida() / 10)}%`;
  document.getElementById("vida2").innerText = `${player2.getVida()}`;
  verificarGanador();

  document.getElementById("energia1").style.width = `${(player1.getEnergia() / 10)}%`;
  document.getElementById("energia1").innerText = `${player1.getEnergia()}`;

  document.getElementById("ki1").style.width = `${(player1.getKi() / 10)}%`;
  document.getElementById("ki1").innerText = `${player1.getKi()}`;

  cambiarTurno();
});

document.getElementById("btn_ak_basico2").addEventListener("click", () => {
  if (turno !== 2) return;
  audio.atk_basico.play();

  if (player2.getEnergia() < 150 || player2.getKi() < 200) {
    Swal.fire({
      icon: 'warning',
      title: '¡Sin Energía o Ki!',
      text: 'Necesitas cargar Ki o usar una semilla del ermitaño antes de atacar.',
      timer: 2500,
      showConfirmButton: false
    });
    return;
  }

  alertaAtk(personaje2, "basico");

  player2.atk_basico(player1);
  document.getElementById("vida1").style.width = `${(player1.getVida() / 10)}%`;
  document.getElementById("vida1").innerText = `${player1.getVida()}`;
  verificarGanador();

  document.getElementById("energia2").style.width = `${(player2.getEnergia() / 10)}%`;
  document.getElementById("energia2").innerText = `${player2.getEnergia()}`;

  document.getElementById("ki2").style.width = `${(player2.getKi() / 10)}%`;
  document.getElementById("ki2").innerText = `${player2.getKi()}`;

  cambiarTurno();
});

document.getElementById("btn_ak_especial2").addEventListener("click", () => {
  if (turno !== 2) return;
  audio.atk_especial.play();

  if (player2.getEnergia() < 300 || player2.getKi() < 500) {
    Swal.fire({
      icon: 'warning',
      title: '¡No tienes suficiente poder!',
      text: 'Carga Ki o usa una semilla antes de lanzar un ataque especial.',
      timer: 2500,
      showConfirmButton: false
    });
    return;
  }

  alertaAtk(personaje2, "especial");

  player2.atk_especial(player1);
  document.getElementById("vida1").style.width = `${(player1.getVida() / 10)}%`;
  document.getElementById("vida1").innerText = `${player1.getVida()}`;
  verificarGanador();

  document.getElementById("energia2").style.width = `${(player2.getEnergia() / 10)}%`;
  document.getElementById("energia2").innerText = `${player2.getEnergia()}`;

  document.getElementById("ki2").style.width = `${(player2.getKi() / 10)}%`;
  document.getElementById("ki2").innerText = `${player2.getKi()}`;

  cambiarTurno();
});

//Tarea
document.getElementById("btn_cargar_ki1").addEventListener("click", () => {
  if (turno !== 1) return;

  if (player1.getKi() === 1000 && player2.getKi() === 1000) {
    Swal.fire({
      icon: "info",
      title: "⚡ Ambos tienen el Ki completo",
      text: "Ninguno puede cargar más Ki hasta que se reduzca.",
      timer: 2500,
      showConfirmButton: false
    });
    return;
  }

  if (player1.getKi() === 1000) {
    Swal.fire({
      icon: "warning",
      title: "Ki al máximo",
      text: "Tu Ki ya está al máximo, no puedes cargar más.",
      timer: 2000,
      showConfirmButton: false
    });
    return;
  }

  alertaAtk(personaje1, "ki");
  audio.ki.play();

  player1.cargarKi();
  document.getElementById("energia1").style.width = `${player1.getEnergia() / 10}%`;
  document.getElementById("energia1").innerText = player1.getEnergia();
  document.getElementById("ki1").style.width = `${player1.getKi() / 10}%`;
  document.getElementById("ki1").innerText = player1.getKi();

  cambiarTurno();
});

document.getElementById("btn_semilla1").addEventListener("click", () => {
  if (turno !== 1) {
    Swal.fire({
      icon: "warning",
      title: "No es tu turno",
      text: "Es turno del jugador 2"
    });
    return;
  }

  if (
    player1.getVida() === 1000 &&
    player1.getEnergia() === 1000 &&
    player1.getKi() === 1000
  ) {
    Swal.fire({
      icon: "info",
      title: "No puedes usar la semilla",
      text: "Tu vida, energía y ki ya están al máximo.",
      timer: 2000,
      showConfirmButton: false
    });
    return;
  }

  alertaAtk(personaje1, "semilla");
  audio.ermi.play();

  if (player1.usarSemilla()) {
    document.getElementById("vida1").style.width = "100%";
    document.getElementById("vida1").innerText = "1000 / 1000";
    document.getElementById("energia1").style.width = "100%";
    document.getElementById("energia1").innerText = "1000 / 1000";
    document.getElementById("ki1").style.width = "100%";
    document.getElementById("ki1").innerText = "1000 / 1000";

    const semillasRestantes = player1.getsemillas();
    const barraSemilla = document.getElementById("semillas1");
    barraSemilla.style.width = `${(semillasRestantes / 2) * 100}%`;
    barraSemilla.innerText = `${semillasRestantes} / 2`;
  } else {
    Swal.fire({
      icon: 'warning',
      title: 'Sin semillas',
      text: 'Ya no tienes más semillas del ermitaño.',
      timer: 2000,
      showConfirmButton: false
    });
  }

  cambiarTurno();
});




document.getElementById("btn_cargar_ki2").addEventListener("click", () => {
  if (turno !== 2) return;

  if (player1.getKi() === 1000 && player2.getKi() === 1000) {
    Swal.fire({
      icon: "info",
      title: " Ambos tienen el Ki completo",
      text: "Ninguno puede cargar más Ki hasta que se reduzca.",
      timer: 2500,
      showConfirmButton: false
    });
    return;
  }

  if (player2.getKi() === 1000) {
    Swal.fire({
      icon: "warning",
      title: "Ki al máximo",
      text: "Tu Ki ya está al máximo, no puedes cargar más.",
      timer: 2000,
      showConfirmButton: false
    });
    return;
  }

  alertaAtk(personaje2, "ki");
  audio.ki.play();

  player2.cargarKi();
  document.getElementById("energia2").style.width = `${player2.getEnergia() / 10}%`;
  document.getElementById("energia2").innerText = player2.getEnergia();
  document.getElementById("ki2").style.width = `${player2.getKi() / 10}%`;
  document.getElementById("ki2").innerText = player2.getKi();

  cambiarTurno();
});

document.getElementById("btn_semilla2").addEventListener("click", () => {
  if (turno !== 2) {
    Swal.fire({
      icon: "warning",
      title: "No es tu turno",
      text: "Es turno del jugador 1"
    });
    return;
  }

  if (
    player2.getVida() === 1000 &&
    player2.getEnergia() === 1000 &&
    player2.getKi() === 1000
  ) {
    Swal.fire({
      icon: "info",
      title: "No puedes usar la semilla",
      text: "Tu vida, energía y ki ya están al máximo.",
      timer: 2000,
      showConfirmButton: false
    });
    return;
  }

  alertaAtk(personaje2, "semilla");
  audio.ermi.play();

  if (player2.usarSemilla()) {
    document.getElementById("vida2").style.width = "100%";
    document.getElementById("vida2").innerText = "1000 / 1000";
    document.getElementById("energia2").style.width = "100%";
    document.getElementById("energia2").innerText = "1000 / 1000";
    document.getElementById("ki2").style.width = "100%";
    document.getElementById("ki2").innerText = "1000 / 1000";

    const semillasRestantes = player2.getsemillas();
    const barraSemilla = document.getElementById("semillas2");
    barraSemilla.style.width = `${(semillasRestantes / 2) * 100}%`;
    barraSemilla.innerText = `${semillasRestantes} / 2`;
  } else {
    Swal.fire({
      icon: 'warning',
      title: 'Sin semillas',
      text: 'Ya no tienes más semillas del ermitaño.',
      timer: 2000,
      showConfirmButton: false
    });
  }

  cambiarTurno();
});


const actualizarTurno = () => {
  if (turno === 1) {
    document.querySelectorAll("#botones_jugador1 button").forEach(btn => btn.disabled = false);
    document.querySelectorAll("#botones_jugador2 button").forEach(btn => btn.disabled = true);
  } else {
    document.querySelectorAll("#botones_jugador1 button").forEach(btn => btn.disabled = true);
    document.querySelectorAll("#botones_jugador2 button").forEach(btn => btn.disabled = false);
  }
};

const cambiarTurno = () => {
  turno = turno === 1 ? 2 : 1;
  actualizarTurno();
};
actualizarTurno();

const verificarGanador = () => {
  if (player1.getVida() <= 0 || player2.getVida() <= 0) {
    const ganador = player1.getVida() > 0 ? player1 : player2;
    const perdedor = player1.getVida() <= 0 ? player1 : player2;
    
    const nombreGanador = ganador === player1
      ? document.getElementById("username1").innerText
      : document.getElementById("username2").innerText;

    const nombrePerdedor = perdedor === player1
      ? document.getElementById("username1").innerText
      : document.getElementById("username2").innerText;

    
    historial.push({ ganador: nombreGanador, perdedor: nombrePerdedor });

    if (ganador === player1) victoriasJugador1++;
    else victoriasJugador2++;

    
    Swal.fire({
      title: ` ¡${nombreGanador} ha ganado la batalla!`,
      text: "¿Qué deseas hacer ahora?",
      icon: 'success',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: ' Revancha',
      denyButtonText: 'Ver historial',
      cancelButtonText: ' Nuevo juego',
      allowOutsideClick: false
    }).then((result) => {
      if (result.isConfirmed) {
        iniciarRevancha();
      } else if (result.isDenied) {
        mostrarHistorial();
      } else {
        reiniciarJuego();
      }
    });
  }
};


const iniciarRevancha = () => {
  player1 = new Game(player1.username);
  player2 = new Game(player2.username);

  ["vida1", "energia1", "ki1", "vida2", "energia2", "ki2"].forEach(id => {
    document.getElementById(id).style.width = "100%";
    document.getElementById(id).innerText = "1000 / 1000";
  });
  document.getElementById("semillas1").style.width = "0%";
  document.getElementById("semillas1").innerText = "0 / 2";
  document.getElementById("semillas2").style.width = "0%";
  document.getElementById("semillas2").innerText = "0 / 2";

  turno = 1;
  actualizarTurno();

  Swal.fire({
    icon: 'info',
    title: 'Nueva Revancha',
    text: '¡Ambos jugadores están listos para luchar de nuevo!',
    timer: 2000,
    showConfirmButton: false
  });
};

const reiniciarJuego = () => {
  Swal.fire({
    icon: 'info',
    title: 'Reiniciando...',
    text: 'Volviendo a la selección de personajes',
    timer: 1500,
    showConfirmButton: false
  }).then(() => {
    window.location.reload();
  });
};


const obtenerEscenarioAleatorio = () => {
  const randomIndex = Math.floor(Math.random() * escenarios.length);
  return escenarios[randomIndex];
};

const mostrarHistorial = () => {

  document.getElementById("batalla").classList.add("d-none");

  document.getElementById("vista_historial").classList.remove("d-none");

  const tabla = document.getElementById("tabla_historial");
  tabla.innerHTML = "";

  historial.forEach((ronda, index) => {
    const fila = document.createElement("tr");
    fila.innerHTML = `
      <td>${index + 1}</td>
      <td class="text-success">${ronda.ganador}</td>
      <td class="text-danger">${ronda.perdedor}</td>
    `;
    tabla.appendChild(fila);
  });

  document.getElementById("total1").innerText = `Jugador 1: ${victoriasJugador1} victorias`;
  document.getElementById("total2").innerText = `Jugador 2: ${victoriasJugador2} victorias`;
};
document.getElementById("btn_volver_menu").addEventListener("click", () => {
  document.getElementById("vista_historial").classList.add("d-none");
  document.getElementById("seleccion_jugadores").classList.remove("d-none");
   reiniciarJuego();
});

localStorage.setItem("historial", JSON.stringify(historial));


window.addEventListener("load", () => {
  const dataGuardada = localStorage.getItem("historial");
  if (dataGuardada) historial = JSON.parse(dataGuardada);
});
