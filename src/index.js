///
/// VARIABLES - CLASES - OBJETOS - IMPORT
///
import { Alumno, Leccion, Intento } from "./classes.js";

let students = []; // array donde se irán acumulando los estudiantes.
let allLessons    = []; // array donde se guardan todas las lecciones.
let filterLessons = []; // array donde se guardan todas las lecciones filtradas de la lección en curso.
let randomLessons = []; // array donde se guardan todas las lecciones filtradas de la lección en curso deseordenadas.
let attempts = []; // array donde se irán acumulando los intentos al realizar una lección.

let currentWord = 0; // En esta variable guardo la palabra actual de la lección seleccionada.
let currentStudent;  // En esta variable guardo el alumno seleccionado.
let currentLesson;   // En esta variable guardo la lección seleccionada.
let currentAttempt;  // En esta variable guardo el número de intento de una lección.

let darkMode = JSON.parse(localStorage.getItem('darkMode')) ?? false; // Verifico si en el local Storage está almacenada la opción de darkmode.
//
// Creo e inicializo las variales para interactuar con el DOM
//
const $btnDarkMode       = document.getElementById('switchDarkMode');
const $formAlumno        = document.getElementById('formAlumno');
const $btnMostrarAlumnos = document.getElementById('btnMostrarAlumnos');
const $divWrapper        = document.getElementById('divWrapper');
const $pillsAnimalsTab   = document.getElementById('pills-animals-tab');
const $pillsColoursTab   = document.getElementById('pills-colours-tab');
const $pillsMonthsTab    = document.getElementById('pills-months-tab');

/// ----------------------------------------------------------------------------------
/// Modificación del DOM y detección de eventos de usuario.
/// ----------------------------------------------------------------------------------

// Programo el evento submit en el formAlumno. Ingreso los datos de un alumno nuevo al array students[] mediante el método push.
$formAlumno.addEventListener('submit', (e) => {
  e.preventDefault();
  let datForm = new FormData(e.target);
  if(validEmail(datForm.get('email')))
  {
    let maxIndice = 0;
    if (students.length > 0) 
      maxIndice = Math.max(...students.map(alumno => alumno.id));
    maxIndice++;
    let alumno = new Alumno(maxIndice, datForm.get('nombres'), datForm.get('apellidos'), datForm.get('email'), datForm.get('comentario'));
    students.push(alumno);
    localStorage.setItem('alumnos', JSON.stringify(students)); // Almacenar datos (clave-valor) en el Storage y recuperarlos.
    $formAlumno.reset();
    Toastify({
        text: "El alumno ha sido registrado.",
        duration: 3000,
        gravity: "top",
        position: "right",
        style: {
            background: "linear-gradient(to right, #00b09b, #96c93d)",
          }
      }).showToast();
  } else {
    showSweetAlert('error', `Ya existe otro alumno registrado con este email.`);
  }
})

// Programo el evento click en el botón btnMostrarAlumnos del formAlumno. Ingreso los datos de un alumno nuevo al array students[] mediante el método push.
$btnMostrarAlumnos.addEventListener('click', () => {
  // let alumnos = JSON.parse(localStorage.getItem('alumnos'))
  $divWrapper.innerHTML = ""
  if(students.length != 0) {
    students.forEach((alumno) => {
      $divWrapper.innerHTML += `
        <div class="card bg-light mb-3" id="alumno${alumno.id}" style="max-width: 22rem;">
        <div class="card-header">Datos del Alumno</div>
          <div class="card-body">
            <p class="card-text"> Id:         ${alumno.id}</p>
            <p class="card-text"> Nombres:    ${alumno.nombres}</p>
            <p class="card-text"> Apellidos:  ${alumno.apellidos}</p>
            <p class="card-text"> EMail:      ${alumno.email}</p>
            <p class="card-text"> Comentario: ${alumno.comentario}</p>
            <button type="button" id="btnSeleccionarAlumno${alumno.id}" class="btn btn-success">Seleccionar Alumno</button>
            <button type="button" id="btnEliminarAlumno${alumno.id}"    class="btn btn-danger"><i class="fas fa-trash-alt"></i></button>
          </div>
        </div>`
    })
    // Programo el evento click en el botón de Seleccionar Alumno.
    students.forEach((alumno) => {
      document.getElementById(`btnSeleccionarAlumno${alumno.id}`).addEventListener('click', () => {
        currentStudent = alumno.id; 
      })
    })
    // Programo el evento click en el botón de Eliminar Alumno.
    students.forEach((alumno) => {
      document.getElementById(`btnEliminarAlumno${alumno.id}`).addEventListener('click', () => {
        document.getElementById(`alumno${alumno.id}`).remove();
        let index = students.findIndex(stu => stu.id == alumno.id);
        students.splice(index,1);
        localStorage.setItem('alumnos', JSON.stringify(students));
      })
    })
  } else {
    // UTILIZACIÓN DE LA LIBRERÍA SWEETALERT 2
    swal("ALUMNOS REGISTRADOS", "No existen alumnos registrados para mostrar.");
  }
})

//Evento que se ejecuta para validar si la respuesta es correcta o incorrecta
$pillsAnimalsTab.addEventListener('click', function (e) {
  initLesson('animals');
})

//Evento que se ejecuta para validar si la respuesta es correcta o incorrecta
$pillsColoursTab.addEventListener('click', function (e) {
  initLesson('colours');
})

//Evento que se ejecuta para validar si la respuesta es correcta o incorrecta
$pillsMonthsTab.addEventListener('click', function (e) {
  initLesson('months');
})

//Evento que se ejecuta para validar si la respuesta es correcta o incorrecta
document.getElementById('btnValidar').addEventListener('click', function (e) {
  validateChosenWord(currentWord);
})

//Evento que se ejecuta para avanzar de leccion
document.getElementById('btnSiguiente').addEventListener('click', function (e) {
  // Se incrementa la leccion actual para poder dibujar la tarjeta y para no dejar avanzar mas allá de las lecciones posibles.
  currentWord++;
  if (currentWord < randomLessons.length){
    renderWord(currentWord);
  } else {
    showAlertToastify('exito','Ya no quedan mas preguntas en esta lección.');    
    let suma = 0;
    let filterAttempt =  [];
    attempts.forEach(intento =>{
      if(intento.attempt == currentAttempt && intento.alumno == currentStudent && intento.lesson == currentLesson){
        filterAttempt.push(intento);
        suma += intento.value;
      }
    })
    if(filterAttempt.length > 0){
      const porcentaje = ((suma / filterAttempt.length).toFixed(2) * 100);
      if(porcentaje > 70){
        showSweetAlert('success', `Excelente trabajo ${filterAttempt.alumno}, continua así! porcentaje = ${porcentaje} %`);
      } else if (porcentaje > 50){
        showSweetAlert('warning', `Muy bién ${filterAttempt.alumno}, continua esforzandote! porcentaje = ${porcentaje} %`);
      } else {
        showSweetAlert('error', `No te fue tan bién ${filterAttempt.alumno}, continua esforzandote! porcentaje = ${porcentaje} %`);
      }
    }
  }
})

/// ----------------------------------------------------------------------------------
/// FUNCIONES - FUNCIONES - FUNCIONES - FUNCIONES - FUNCIONES - FUNCIONES - FUNCIONES  
/// ----------------------------------------------------------------------------------

// Función que determina en que intento se encuentra un estudiante para una lección .
const validEmail = (email) => {
  return students.includes(stu => stu.email === email);
}

// Función que inicializa la lección seleccionada y la por defecto al cargar la página.
const initLesson = (nombre) => {
  let index = 0;
  currentWord = 0;
  currentLesson = nombre;
  filterLessons = allLessons.filter(less => less.nombre == currentLesson); // Filtro de todas las lecciones la seleccionada
  // Genero un array aleatorio para que no aparezcan las palabras siempre en el mismo orden.
  randomLessons = [];
  do{
    index = parseInt(Math.random() * (filterLessons.length));
    if(!randomLessons.includes(filterLessons[index]))
      randomLessons.push(filterLessons[index]);
  } while (randomLessons.length < filterLessons.length)
  renderWord(currentWord);
  calculateAttempt();
}

// Función que determina en que intento se encuentra un estudiante para una lección .
const calculateAttempt = () => {
  let arraytAttempt = [];
  attempts.forEach(intento =>{
    if(intento.alumno == currentStudent && intento.lesson == currentLesson){
      arraytAttempt.push(intento);
    }
  })
  if (arraytAttempt.length > 0)
    currentAttempt = (Math.max(...arraytAttempt.attempt) + 1);
  else
    currentAttempt = 1;
}

// Función que se encarga de validar la respuesta seleccionada por el alumno en cada palabra de cada lección.
const validateChosenWord = (numero) => {
  if(currentStudent != undefined){
    let intento 
    let palabra = randomLessons[numero];
    let opcion_elegida = document.querySelector(`input[name="leccionRadio${numero}"]:checked`);
    if (opcion_elegida !== null){
      if (opcion_elegida.value === palabra.palabraI){
        showAlertToastify('exito','La opción elegida es la correcta. Puedes avanzar!')
        document.querySelector('#btnSiguiente').disabled = false;
        intento = new Intento(currentAttempt, currentStudent, palabra.nombre, opcion_elegida.value, 1);
      } else {
        showAlertToastify('error','La opción elegida no es la correcta');
        document.querySelector('#btnSiguiente',).disabled = true;
        intento = new Intento(currentAttempt, currentStudent, palabra.nombre, opcion_elegida.value, 0);
      }
      attempts.push(intento);
    } else {
        showAlertToastify('alerta','Debe seleccionar una opción para poder validar');
    }
  }else{
    swal("ALUMNO SELECCIONADO", "No hay un alumno seleccionado para continuar.");
  }
}

/// Función que se encarga de dibujar la tarjeta con las opciones posibles.
const renderWord = (numero) => { 
  let html;
  let palabra = randomLessons[numero];
  let randomOptions = randomLessons[numero].getRandomOptions(); // genero un array aleatorio de las opciones.

  if(palabra.nombre == 'colours'){
    let color;
    switch  (palabra.palabraI) {
      case 'black': 
        color = '#000000';
        break;
      case 'blue': 
        color = '#0000FF';
        break;
      case 'brown': 
        color = '#A52A2A';
        break;
	    case 'gray': 
        color = '#808080';
        break;
      case 'green': 
        color = '#008000';
        break;
      case 'light blue': 
        color = '#ADD8E6';
        break;
      case 'orange': 
        color = '#FFA500';
        break;
      case 'pink': 
        color = '#FFC0CB';
        break;
      case 'purple': 
        color = '#800080';
        break;
      case 'red': 
        color = '#FF0000';
        break;
      case 'violet': 
        color = '#EE82EE';
        break;
      case 'white': 
        color = '#FFFFFF';
        break;
      case 'yellow': 
        color = '#FFFF00';
        break;
    }

    html = `
    <div class="card bg-light mb-3" id="card${palabra.palabraI}" style="max-width: 22rem;">
      <div class="card-header">${((String)(palabra.nombre)).toUpperCase()}
      </div>
        <div class="row g-0">
          <div class="col-md-4">
            <input type="color" class="form-control form-control-color" id="exampleColorInput" value="${color}"></input>  
            <img src="../img/${palabra.imagen}" class="img-fluid rounded-start">
          </div>
          <div class="col-md-8">
            <div class="card-body">
              <h5 class="card-title">${palabra.palabraE}</h5>`;
  }else{
    html = `
    <div class="card bg-light mb-3" id="card${palabra.palabraI}" style="max-width: 22rem;">
      <div class="card-header">${((String)(palabra.nombre)).toUpperCase()}
      </div>
        <div class="row g-0">
          <div class="col-md-4">
            <img src="../img/${palabra.imagen}" class="img-fluid rounded-start">
          </div>
          <div class="col-md-8">
            <div class="card-body">
              <h5 class="card-title">${palabra.palabraE}</h5>`;
  }
  randomOptions.forEach(function (option, indice) {
    html += `<div class="form-check">
              <input class="form-check-input" type="radio" name="leccionRadio${numero}" id="leccionRadio${numero}_${indice}" value="${option}">
              <label class="form-check-label" for="leccionRadio${numero}_${indice}">${option}</label>
            </div>`
  });
  html += `
          </div>
        </div>
      </div>    
  </div>`;
  document.querySelector('#divLeccion').innerHTML  = html;
  document.querySelector('#btnSiguiente').disabled = true;
}

//
// Esta función se encarga de mostrar el alerta utilizando la librería de Toastify
//
const showSweetAlert = (tipo, texto) => {
  switch(tipo){
    case 'success':
      swal("Excellent, good job!", texto, tipo);
      break;
    case 'warning':
      swal("Keep getting better!", texto, tipo);
      break;
    case 'error':
      swal("Oops something went wrong!", texto, tipo);
      break;
  }
}

//
// Esta función se encarga de mostrar el alerta utilizando la librería de Toastify
//
const showAlertToastify = (tipo, texto) => {
  let background = '';
  if (tipo === 'exito'){
      background = '#00b09b, #96c93d';
  }
  if (tipo === 'error'){
    background = '#ff5f6d, #ffc371';
  }
  if (tipo === 'alerta'){
    background = '#ff5f6d, #ffc371';
  }

  Toastify({
    text:     texto,
    duration: 2000,
    gravity:  "top",
    position: "right",
    style: {
        background: `linear-gradient(to right, ${background})`
    }
  }).showToast();
}

//Función que cargar las lecciones filtradas por tema (Animals / Colours / Months)
const loadLessons = async (path) => {
  const response = await fetch(path);
  const jsonLessons = await response.json();
  jsonLessons.forEach(less => {
    let leccion = new Leccion(less.nombre, less.palabraE, less.palabraI, less.imagen, less.opciones);
    allLessons.push(leccion);
  })
  initLesson('animals');
  return response.status === 200 ? true : false;
}

// Función que permite activar el darkmode
const switchDarkMode = (checkedDarkMode) => {
  const body = document.querySelector('body');
  if(checkedDarkMode)
      body.classList.add('darkmode');
  else 
      body.classList.remove('darkmode');
  $btnDarkMode.checked = checkedDarkMode;
  localStorage.setItem('darkMode', JSON.stringify(checkedDarkMode));
}

// Función inicial
window.addEventListener("DOMContentLoaded", (event) => {
  // Implementación con uso de JSON y local Storage.
  if(localStorage.getItem('alumnos')){
    let alumnos = JSON.parse(localStorage.getItem('alumnos'));
    alumnos.forEach(alumno => {
      students.push(new Alumno(alumno.id, alumno.nombres, alumno.apellidos, alumno.email, alumno.comentario));
    })  
  } else {
    localStorage.setItem('alumnos', JSON.stringify(students))
  }

  // Programo el evento click en el botón btnDarkMode con onclick. Una alternativa al addEventListener.
  $btnDarkMode.onclick = (e) => {
    const checkedDarkMode = $btnDarkMode.checked;
    switchDarkMode(checkedDarkMode);
  };
  // Ejecutamos por primera vez el darkmode
  switchDarkMode(darkMode);
  loadLessons('..//assets/lessons.json')
    .then(result => console.log(`${result}`))
    .catch(e => console.error(`${e}`));
});
