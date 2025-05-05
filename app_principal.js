
let preguntas = [];

function cargarModulo(modulo) {
  const script = document.createElement('script');
  script.src = `preguntas_${modulo}.js`;
  script.onload = () => {
    if (modulo === 'bloque1_navegacion') preguntas = preguntas_navegacion;
    else if (modulo === 'bloque3_meteorologia') preguntas = preguntas_meteorologia;
    else if (modulo === 'bloque4_ingles') preguntas = preguntas_ingles;
    generarPreguntas();
  };
  document.body.appendChild(script);
}

function generarPreguntas() {
  const contenedor = document.getElementById('testForm');
  contenedor.innerHTML = '';
  const seleccionadas = preguntas.sort(() => 0.5 - Math.random()).slice(0, 10);
  seleccionadas.forEach((q, index) => {
    const div = document.createElement('div');
    div.className = 'question';
    div.innerHTML = `<strong>${index + 1}. ${q.pregunta}</strong><br>` +
      q.opciones.map((op, i) =>
        `<label><input type="radio" name="q${index}" value="${i}"> ${op}</label><br>`).join('');
    contenedor.appendChild(div);
  });
  contenedor.dataset.seleccionadas = JSON.stringify(seleccionadas);
}

function verificarRespuestas() {
  const contenedor = document.getElementById('testForm');
  const seleccionadas = JSON.parse(contenedor.dataset.seleccionadas);
  seleccionadas.forEach((q, index) => {
    const radios = document.getElementsByName(`q${index}`);
    let respuesta = -1;
    radios.forEach(r => { if (r.checked) respuesta = parseInt(r.value); });
    const div = radios[0].closest('div');
    const mensaje = document.createElement('div');
    if (respuesta === q.correcta) {
      mensaje.innerText = '✔ Correcta';
      mensaje.className = 'correct';
    } else {
      mensaje.innerText = `✘ Incorrecta. Respuesta correcta: ${q.opciones[q.correcta]}`;
      mensaje.className = 'incorrect';
    }
    div.appendChild(mensaje);
  });
}
