import "./style.css";

import reto from "../contenidos/grado11/unidad01_logica_conjuntos_numeros_reales/contenidos/00_actividades_recordar/reto01.json";

const app = document.querySelector("#app");

let preguntaActual = 0;
let puntaje = 0;
let respondida = false;

function mostrarPregunta() {
  const pregunta = reto.preguntas[preguntaActual];

  const porcentaje =
    ((preguntaActual + 1) / reto.preguntas.length) * 100;

  app.innerHTML = `
  <div class="libro">
  <aside class="libro__menu">

    <div class="marca">
      <div class="marca__grado">Matemáticas</div>
      <div class="marca__numero">11</div>
    </div>

    <div class="unidad-menu">
      <span>UNIDAD 1</span>
      <strong>Lógica, conjuntos y números reales</strong>
    </div>

    <nav class="navegacion">

      <button class="nav-item activo">
        <span>🧠</span>
        Actividades para recordar
      </button>

      <button class="nav-item">
        <span>💬</span>
        Proposiciones
      </button>

      <button class="nav-item">
        <span>◯</span>
        Conjuntos
      </button>

      <button class="nav-item">
        <span>ℝ</span>
        Números reales
      </button>

      <button class="nav-item">
        <span>📖</span>
        Lectura matemática
      </button>

      <button class="nav-item">
        <span>🎯</span>
        Refuerzo
      </button>

    </nav>

  </aside>

  <section class="libro__pagina">
    <main class="actividad">

      <header class="actividad__encabezado">
        <p class="actividad__seccion">
          Actividades para recordar
        </p>

        <h1>${reto.titulo}</h1>

        <p class="actividad__descripcion">
          ${reto.descripcion}
        </p>
      </header>

      <section class="progreso">
        <div class="progreso__datos">
          <span>
            Pregunta ${preguntaActual + 1}
            de ${reto.preguntas.length}
          </span>

          <span>
            Puntaje: ${puntaje}
          </span>
        </div>

        <div class="progreso__barra">
          <div
            class="progreso__avance"
            style="width:${porcentaje}%"
          ></div>
        </div>
      </section>

      <section class="pregunta">

        <div class="pregunta__numero">
          Reto ${preguntaActual + 1}
        </div>

        <div class="situacion">
          <h2>Analiza la situación</h2>

          <p>
            ${pregunta.situacion}
          </p>
        </div>

        <h2 class="pregunta__texto">
          ${pregunta.pregunta}
        </h2>

        <div class="opciones">

          ${pregunta.opciones
            .map(
              (opcion) => `
              <button
                class="opcion"
                data-opcion="${opcion}"
              >
                ${opcion}
              </button>
            `,
            )
            .join("")}

        </div>

        <div
          id="retroalimentacion"
          class="retroalimentacion oculto"
        ></div>

        <button
          id="siguiente"
          class="boton-siguiente oculto"
        >
          ${
            preguntaActual === reto.preguntas.length - 1
              ? "Ver resultado"
              : "Siguiente pregunta →"
          }
        </button>

      </section>

    </main>

  </section>
</div>
`;

  document.querySelectorAll(".opcion").forEach((boton) => {
    boton.addEventListener("click", () => {
      responder(boton.dataset.opcion);
    });
  });

  document
    .querySelector("#siguiente")
    .addEventListener("click", siguientePregunta);
}

function responder(respuestaSeleccionada) {
  if (respondida) return;

  respondida = true;

  const pregunta = reto.preguntas[preguntaActual];

  const esCorrecta =
    respuestaSeleccionada === pregunta.respuestaCorrecta;

  const retroalimentacion =
    document.querySelector("#retroalimentacion");

  const botones = document.querySelectorAll(".opcion");

  botones.forEach((boton) => {
    boton.disabled = true;

    if (boton.dataset.opcion === pregunta.respuestaCorrecta) {
      boton.classList.add("correcta");
    }

    if (
      boton.dataset.opcion === respuestaSeleccionada &&
      !esCorrecta
    ) {
      boton.classList.add("incorrecta");
    }
  });

  if (esCorrecta) {
    puntaje += reto.puntajePorPregunta;

    retroalimentacion.innerHTML = `
      <h3>✅ ¡Muy bien!</h3>
      <p>${pregunta.retroalimentacionCorrecta}</p>
    `;

    retroalimentacion.classList.add("respuesta-correcta");
  } else {
    retroalimentacion.innerHTML = `
      <h3>🔎 Revisemos</h3>
      <p>${pregunta.retroalimentacionIncorrecta}</p>
    `;

    retroalimentacion.classList.add("respuesta-incorrecta");
  }

  retroalimentacion.classList.remove("oculto");

  document
    .querySelector("#siguiente")
    .classList.remove("oculto");
}

function siguientePregunta() {
  if (preguntaActual < reto.preguntas.length - 1) {
    preguntaActual++;
    respondida = false;

    mostrarPregunta();
  } else {
    mostrarResultado();
  }
}

function mostrarResultado() {
  const porcentaje =
    (puntaje /
      (reto.preguntas.length * reto.puntajePorPregunta)) *
    100;

  let mensaje = "";

  if (porcentaje >= 80) {
    mensaje =
      "Excelente. Tienes muy claros estos conocimientos previos.";
  } else if (porcentaje >= 60) {
    mensaje =
      "Buen trabajo. Hay algunos conceptos que conviene reforzar.";
  } else {
    mensaje =
      "Conviene repasar algunos conocimientos antes de continuar.";
  }

  app.innerHTML = `
    <main class="actividad resultado">

      <h1>Resultado del reto</h1>

      <div class="resultado__puntaje">
        ${puntaje} / 100
      </div>

      <h2>
        ${Math.round(porcentaje)} %
      </h2>

      <p>
        ${mensaje}
      </p>

      <button id="reiniciar" class="boton-siguiente">
        🔄 Intentar nuevamente
      </button>

    </main>
  `;

  document
    .querySelector("#reiniciar")
    .addEventListener("click", reiniciar);
}

function reiniciar() {
  preguntaActual = 0;
  puntaje = 0;
  respondida = false;

  mostrarPregunta();
}

mostrarPregunta();