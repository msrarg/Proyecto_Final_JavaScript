///
/// VARIABLES - CLASES - OBJETOS
///
import { Alumno, Leccion, Intento } from "./src/classes.js";

let students = []; // array donde se irán acumulando los estudiantes.
let lessons  = []; // array donde se irán acumulando las lecciones.
let filterLessons = [];
let attempts = []; // array donde se irán acumulando los intentos de realizar uin lección.

let palabraActual = 0;        // En esta variable guardo la palabra actual de la lección seleccionada.
let alumnoSeleccionado = 0;   // En esta variable guardo el alumno seleccionado.
let leccionSeleccionada = ""; // En esta variable guardo la lección seleccionada.

let darkMode = JSON.parse(localStorage.getItem('darkMode')) ?? false;
// botón darkmode
const btnDarkMode = document.getElementById('switchDarkMode');

// Función que habilita / deshabilita el darkmode
const switchDarkMode = (checkDarkMode) => {
  const body = document.querySelector('body');
  // console.log(checkDarkMode);
  if(checkDarkMode){
      body.classList.add('darkmode');
  }
  else {
      body.classList.remove('darkmode');
  }
  btnDarkMode.checked = checkDarkMode;
  localStorage.setItem('darkMode', JSON.stringify(checkDarkMode));
}

//
// Creo e inicializo las variales para interactuar con el DOM
//
const $formAlumno        = document.getElementById('formAlumno');
const $btnMostrarAlumnos = document.getElementById('btnMostrarAlumnos');
const $divAlumnos        = document.getElementById('divAlumnos');

const $pillsAnimalsTab = document.getElementById('pills-animals-tab');
const $pillsColoursTab = document.getElementById('pills-colours-tab');
const $pillsMonthsTab  = document.getElementById('pills-months-tab');

///
///
///

attempts.push(new Intento (1, students[0], "colours", "blue",   1));
attempts.push(new Intento (1, students[0], "colours", "brown",  1));
attempts.push(new Intento (1, students[0], "colours", "green",  1));
attempts.push(new Intento (1, students[0], "colours", "orange", 1));
attempts.push(new Intento (1, students[0], "colours", "pink",   1));
attempts.push(new Intento (1, students[0], "colours", "purple", 1));
attempts.push(new Intento (1, students[0], "colours", "red",    1));
attempts.push(new Intento (1, students[0], "colours", "yellow", 1));

attempts.push(new Intento (1, students[1], "colours", "blue",   1));
attempts.push(new Intento (1, students[1], "colours", "bron",   0));
attempts.push(new Intento (1, students[1], "colours", "green",  1));
attempts.push(new Intento (1, students[1], "colours", "orange", 1));
attempts.push(new Intento (1, students[1], "colours", "pink",   1));
attempts.push(new Intento (1, students[1], "colours", "purple", 1));
attempts.push(new Intento (1, students[1], "colours", "red",    1));
attempts.push(new Intento (1, students[1], "colours", "yellow", 1));

attempts.push(new Intento (1, students[2], "colours", "blue",   1));
attempts.push(new Intento (1, students[2], "colours", "brown",  1));
attempts.push(new Intento (1, students[2], "colours", "gren",   0));
attempts.push(new Intento (1, students[2], "colours", "orange", 1));
attempts.push(new Intento (1, students[2], "colours", "pink",   1));
attempts.push(new Intento (1, students[2], "colours", "purple", 1));
attempts.push(new Intento (1, students[2], "colours", "red",    1));
attempts.push(new Intento (1, students[2], "colours", "yelow",  0));

attempts.push(new Intento (2, students[2], "colours", "blue",   1));
attempts.push(new Intento (2, students[2], "colours", "brown",  1));
attempts.push(new Intento (2, students[2], "colours", "green",  1));
attempts.push(new Intento (2, students[2], "colours", "orange", 1));
attempts.push(new Intento (2, students[2], "colours", "pink",   1));
attempts.push(new Intento (2, students[2], "colours", "purple", 1));
attempts.push(new Intento (2, students[2], "colours", "red",    1));
attempts.push(new Intento (2, students[2], "colours", "yellow", 1));

attempts.push(new Intento (1, students[2], "months", "January",   1));
attempts.push(new Intento (1, students[2], "months", "February",  1));
attempts.push(new Intento (1, students[2], "months", "March",     1));
attempts.push(new Intento (1, students[2], "months", "April",     1));
attempts.push(new Intento (1, students[2], "months", "May",       1));
attempts.push(new Intento (1, students[2], "months", "June",      1));
attempts.push(new Intento (1, students[2], "months", "July",      1));
attempts.push(new Intento (1, students[2], "months", "August",    1));
attempts.push(new Intento (1, students[2], "months", "September", 1));
attempts.push(new Intento (1, students[2], "months", "October",   1));
attempts.push(new Intento (1, students[2], "months", "November",  1));
attempts.push(new Intento (1, students[2], "months", "December",  1));

attempts.push(new Intento (1, students[3], "colours", "blue",   1));
attempts.push(new Intento (1, students[3], "colours", "brown",  1));
attempts.push(new Intento (1, students[3], "colours", "green",  1));
attempts.push(new Intento (1, students[3], "colours", "orange", 1));
attempts.push(new Intento (1, students[3], "colours", "pink",   1));
attempts.push(new Intento (1, students[3], "colours", "porple", 0));
attempts.push(new Intento (1, students[3], "colours", "red",    1));
attempts.push(new Intento (1, students[3], "colours", "yellow", 1));
//
// Modificación del DOM y detección de eventos de usuario.
//

// Programo el evento submit en el formAlumno. Ingreso los datos de un alumno nuevo al array students[] mediante el método push.
$formAlumno.addEventListener('submit', (e) => {
  e.preventDefault();
  let datForm = new FormData(e.target);
  if(datForm.get('nombres') != "" && datForm.get('apellidos') != "" && datForm.get('email') != ""){
    let maxIndice = 0;
    if (students.length > 0) {
      maxIndice = Math.max(...students.map(alumno => alumno.id));
    }
    maxIndice++;
    let alumno = new Alumno(maxIndice, datForm.get('nombres'), datForm.get('apellidos'), datForm.get('email'), datForm.get('comentario'));
    students.push(alumno);
    localStorage.setItem('alumnos', JSON.stringify(students)); // Almacenar datos (clave-valor) en el Storage y recuperarlos.
    $formAlumno.reset();
  }
})

// Programo el evento click en el botón btnMostrarAlumnos del formAlumno. Ingreso los datos de un alumno nuevo al array students[] mediante el método push.
$btnMostrarAlumnos.addEventListener('click', () => {
  //let alumnos = JSON.parse(localStorage.getItem('alumnos'))
  $divAlumnos.innerHTML = ""
  if(students.length != 0) {
    students.forEach((alumno) => {
      $divAlumnos.innerHTML += `
        <div class="card bg-light mb-3" id="alumno${alumno.id}" style="max-width: 18rem;">
        <div class="card-header">Datos del Alumno</div>
          <div class="card-body">
            <p  class="card-text"> Id:         ${alumno.id}</p>
            <p  class="card-text"> Nombres:    ${alumno.nombres}</p>
            <p  class="card-text"> Apellidos:  ${alumno.apellidos}</p>
            <p  class="card-text"> EMail:      ${alumno.email}</p>
            <p  class="card-text"> Comentario: ${alumno.comentario}</p>
            <button type="button" id="btnSeleccionarAlumno${alumno.id}" class="btn btn-success">Seleccionar Alumno</button>
            <button type="button" id="btnEliminarAlumno${alumno.id}"    class="btn btn-danger"><i class="fas fa-trash-alt"></i></button>
          </div>
        </div>`
    })
    // Programo el evento click en el botón de Seleccionar Alumno.
    students.forEach((alumno) => {
      document.getElementById(`btnSeleccionarAlumno${alumno.id}`).addEventListener('click', () => {
        alumnoSeleccionado = alumno.id;
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
      $divAlumnos.innerHTML = "<p>No existen alumno cargados para mostrar</p>"
  }
})

//Evento que se ejecuta para validar si la respuesta es correcta o incorrecta
$pillsAnimalsTab.addEventListener('click', function (e) {
  palabraActual = 0;
  filterLessons = lessons.filter(lesson => lesson.nombre == 'animals');
  renderleccion(palabraActual);
})
//Evento que se ejecuta para validar si la respuesta es correcta o incorrecta
$pillsColoursTab.addEventListener('click', function (e) {
  palabraActual = 0;
  filterLessons = lessons.filter(lesson => lesson.nombre == 'colours');
  renderleccion(palabraActual);
})
//Evento que se ejecuta para validar si la respuesta es correcta o incorrecta
$pillsMonthsTab.addEventListener('click', function (e) {
  palabraActual = 0;
  filterLessons = lessons.filter(lesson => lesson.nombre == 'months');
  renderleccion(palabraActual);
})

//Evento que se ejecuta para validar si la respuesta es correcta o incorrecta
document.getElementById('btnValidar').addEventListener('click', function (e) {
  validarleccion(palabraActual);
})

//Evento que se ejecuta para avanzar de leccion
document.getElementById('btnSiguiente').addEventListener('click', function (e) {
  // Se incrementa el leccion actual para poder dibujar la tarjeta y para no dejar avanzar mas de los lessons posibles
  palabraActual++;
  // const leccion = lessons.filter(less => less.nombre === nombre);
  if (palabraActual < filterLessons.length){
    renderleccion(palabraActual);
  } else {
    mostarAlerta('exito','Ya no quedan preguntas. Ganaste!');
  }
})

///
/// FUNCIONES
///

// Función que se encarga de validar la respuesta seleccionada por el alumno
const validarleccion = (numero) => {
  let palabra = filterLessons[numero];
  let opcion_elegida = document.querySelector(`input[name="leccionRadio${numero}"]:checked`);

  if (opcion_elegida !== null){
    if (opcion_elegida.value === palabra.palabraI){
      mostarAlerta('exito','La opción elegida es la correcta. Puedes avanzar!')
      document.querySelector('#btnSiguiente').disabled = false;
    } else {
      mostarAlerta('error','La opción elegida no es la correcta');
      document.querySelector('#btnSiguiente',).disabled = true;
    }
  } else {
      mostarAlerta('alerta','Debe seleccionar una opción para poder validar');
  }   
}

/// Función que se encarga de dibujar la tarjeta con las opciones posibles.
const renderleccion = (numero) => { 
  let palabra = filterLessons[numero];
  console.log(filterLessons[numero]);
  let html;
  // let options = filterLessons[numero].getRandomOptions();
  // <label for="exampleColorInput" class="form-label">Color picker</label>
  // <input type="color" class="form-control form-control-color" id="exampleColorInput" value="#000000" title="Choose your color"></input>  
  // padding-top, padding-right, padding-bottom, padding-left).
 
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
    <div class="card bg-light mb-3" id="card${palabra.palabraI}" style="max-width: 18rem;">
      <div class="card-header">${((String)(palabra.nombre)).toUpperCase()}
      </div>
        <div class="row g-0">
          <div class="col-md-4">
            <input type="color" class="form-control form-control-color" id="exampleColorInput" value="${color}"></input>  
            <img src="./img/${palabra.imagen}" class="img-fluid rounded-start">
          </div>
          <div class="col-md-8">
            <div class="card-body">
              <h5 class="card-title">${palabra.palabraE}</h5>`;
  }else{
    html = `
    <div class="card bg-light mb-3" id="card${palabra.palabraI}" style="max-width: 18rem;">
      <div class="card-header">${((String)(palabra.nombre)).toUpperCase()}
      </div>
        <div class="row g-0">
          <div class="col-md-4">
            <img src="./img/${palabra.imagen}" class="img-fluid rounded-start">
          </div>
          <div class="col-md-8">
            <div class="card-body">
              <h5 class="card-title">${palabra.palabraE}</h5>`;
  }
  palabra.opciones.forEach(function (opcion, indice) {
    html += `<div class="form-check">
              <input class="form-check-input" type="radio" name="leccionRadio${numero}" id="leccionRadio${numero}_${indice}" value="${opcion}">
              <label class="form-check-label" for="leccionRadio${numero}_${indice}">${opcion}</label>
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
const mostarAlerta = (tipo,texto) => {
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
    text: texto,
    duration: 3000,
    gravity: "top",
    position: "right",
    style: {
        background: `linear-gradient(to right, ${background})`
    }
  }).showToast();
}

/*
Swal.fire({
  title: 'Error!',
  text: 'Do you want to continue?',
  icon: 'error',
  confirmButtonText: 'Cool'
})
*/

// Función inicial
window.addEventListener("DOMContentLoaded", (event) => {
  // Implementación con uso de JSON y Storage.
  if(localStorage.getItem('alumnos')){
    // students = JSON.parse(localStorage.getItem('alumnos'));
  } else {
    localStorage.setItem('alumnos', JSON.stringify(students))
  }

  // El alert me rompe el código
  // swal( "Bienvenido a English for Kid!", "Primero deberás crear tu usuario para poder llevar un registro de la evolución de tu aprendizaje. \nLuego selecciona la lección que deseas realizar. ");

  // acción botón darkmode
  btnDarkMode.onclick = (e) => {
      const checkDarkMode = btnDarkMode.checked;
      switchDarkMode(checkDarkMode);
  };

  //Ejecutamos por primera vez el darkmode
  switchDarkMode(darkMode);
  loadLessons();
});

//Función que cargar los productos en el catalogo
async function loadLessons(){
  const response = await fetch('./assets/lessons.json');
  const allLessons = await response.json();
  allLessons.forEach(lesson => {
    // let leccion = new Leccion(... less); No funciona
    let leccion = new Leccion(lesson.nombre, lesson.palabraE, lesson.palabraI, lesson.imagen, lesson.opciones);
    lessons.push(leccion);
  })

  palabraActual = 0;  // Palabra inicial.
  filterLessons = lessons.filter(lesson => lesson.nombre == 'animals'); // Lección por defecto.
  renderleccion(palabraActual);
}
