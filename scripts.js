///
/// VARIABLES - CLASES - OBJETOS
///
class Alumno {
  constructor(nombres, apellidos, email){
      this.nombres   = nombres;
      this.apellidos = apellidos;
      this.email     = email;
  }
  getNombresApellidos = () => `${this.nombres}, ${this.apellidos}`;
  getemail            = () => this.email;
}

class Leccion {
  constructor(nombre, palabraE, palabraI, imagen, opciones){
      this.nombre   = nombre;
      this.palabraE = palabraE;
      this.palabraI = palabraI;
      this.imagen   = imagen;
      this.opciones = opciones;
  }
  getNombre         = () => this.nombre;
}

class Intento {
  constructor(attempt, alumno, lesson, answer, value){
      this.attempt = attempt;
      this.alumno  = alumno;
      this.lesson  = lesson;
      this.answer  = answer;
      this.value   = value;
  }
}
//
// DESAFÍO - Segunda Entrega del Proyecto Final - Implementación con uso de JSON y Storage.
//
let students = [];

if(localStorage.getItem('alumnos')){
  students = JSON.parse(localStorage.getItem('alumnos'))
} else {
  students.push(new Alumno ("Mauricio", "Rodriguez", "mauricio.rodriguez@hotmail.com"));
  students.push(new Alumno ("Mariano",  "Velazquez", "mariano.velazquez@hotmail.com"));
  students.push(new Alumno ("Mateo",    "Rodriguez", "mateo.rodriguez@hotmail.com"));
  students.push(new Alumno ("Marcelo",  "Velazquez", "marcelo.velazquez@hotmail.com"));

  localStorage.setItem('alumnos', JSON.stringify(students))
}

///
///
///

const lessons = [];

/// cargar todas las lecciones desde un json

function cargarLecciones(lessonName) {
  const response = await fetch('./assets/lessons.json');
  const lessons_json = await response.json();
  lessons_json.forEach( less => {
    if(less.nombre == lessonName) {
      lessons.push(new Leccion(...less));
    } 
  })
}

// lessons.push(new Leccion ("colours", "azul",     "blue",   "sun.png", ["blue",   "bird",  "brue"]));
// lessons.push(new Leccion ("colours", "marrón",   "brown",  "sun.png", ["brown",  "brawn", "brow"]));
// lessons.push(new Leccion ("colours", "verde",    "green",  "sun.png", ["green",  "gren",  "greem"]));
// lessons.push(new Leccion ("colours", "naranja",  "orange", "sun.png", ["orange", "orang", "orane"]));
// lessons.push(new Leccion ("colours", "rosa",     "pink",   "sun.png", ["pink",   "pin",   "pik"]));
// lessons.push(new Leccion ("colours", "morado",   "purple", "sun.png", ["purple", "purpe", "purpose"]));
// lessons.push(new Leccion ("colours", "rojo",     "red",    "sun.png", ["red",    "real",  "reed"]));
// lessons.push(new Leccion ("colours", "amarillo", "yellow", "sun.png", ["yellow", "yello", "yelow"]));

// lessons.push(new Leccion ("months", "Enero",      "January",   "sun.png", ["January",   "Janary",    "january"]));
// lessons.push(new Leccion ("months", "Febrero",    "February",  "sun.png", ["February",  "Febrary",   "february"]));
// lessons.push(new Leccion ("months", "Marzo",      "March",     "sun.png", ["March",     "Mach",      "march"]));
// lessons.push(new Leccion ("months", "Abril",      "April",     "sun.png", ["April",     "Apri",      "april"]));
// lessons.push(new Leccion ("months", "Mayo",       "May",       "sun.png", ["May",       "My",        "may"]));
// lessons.push(new Leccion ("months", "Junio",      "June",      "sun.png", ["June",      "Jun",       "june"]));
// lessons.push(new Leccion ("months", "Julio",      "July",      "sun.png", ["July",      "Jul",       "july"]));
// lessons.push(new Leccion ("months", "Agosto",     "August",    "sun.png", ["August",    "Augut",     "august"]));
// lessons.push(new Leccion ("months", "Septiembre", "September", "sun.png", ["September", "Septeber",  "september"]));
// lessons.push(new Leccion ("months", "Octubre",    "October",   "sun.png", ["October",   "Octobr",    "october"]));
// lessons.push(new Leccion ("months", "Noviembre",  "November",  "sun.png", ["November",  "Novembr",   "november"]));
// lessons.push(new Leccion ("months", "Diciembre",  "December",  "sun.png", ["December",  "Decembeer", "december"]));

// lessons.push(new Leccion ("animals", "Oso",      "bear",     "sun.png", ["bear",     "beer",    "bea"]));
// lessons.push(new Leccion ("animals", "Gato",     "cat",      "sun.png", ["cat",      "catt",    "cot"]));
// lessons.push(new Leccion ("animals", "Perro",    "dog",      "sun.png", ["dog",      "dag",     "dogg"]));
// lessons.push(new Leccion ("animals", "Elefante", "elephant", "sun.png", ["elephant", "elepant", "elepan"]));
// lessons.push(new Leccion ("animals", "Vaca",     "cow",      "sun.png", ["cow",      "caw",     "cov"]));
// lessons.push(new Leccion ("animals", "Caballo",  "horse",    "sun.png", ["horse",    "hurse",   "horsse"]));
// lessons.push(new Leccion ("animals", "Conejo",   "rabbit",   "sun.png", ["rabbit",   "rabit",   "rabbit"]));
// lessons.push(new Leccion ("animals", "León",     "lion",     "sun.png", ["lion",     "loin",    "lain"]));
// lessons.push(new Leccion ("animals", "Mono",     "monkey",   "sun.png", ["monkey",   "monky",   "monkei"]));
// lessons.push(new Leccion ("animals", "Ratón",    "mouse",    "sun.png", ["mouse",    "mause",   "mouce"]));
// lessons.push(new Leccion ("animals", "Cerdo",    "pig",      "sun.png", ["pig",      "pink",    "pigg"]));
// lessons.push(new Leccion ("animals", "Lobo",     "wolf",     "sun.png", ["wolf",     "volf",    "wolff"]));

// console.log(JSON.stringify(lessons));

const attempts = [];

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

//Aca se inicializa el primer leccion
let leccion_actual = 0;

//
// Creo e inicializo las variales para interactuar con el DOM
//
const $formAlumno          = document.getElementById('formAlumno');
const $botonMostrarAlumnos = document.getElementById('botonMostrarAlumnos');
const $botonMostrarUsers   = document.getElementById('botonMostrarUsers');
const $divAlumnos          = document.getElementById('divAlumnos');

// const $formMaterias      = document.getElementById('formMaterias');
// const $selectAlumnos     = document.getElementById("selectAlumnos");
// const $selectMaterias    = document.getElementById("selectMaterias");
// const $dateExamen        = document.getElementById("inputFecha");
// const $notaExamen        = document.getElementById("inputNota");
// const $botonMostrarNotas = document.getElementById('botonMostrarNotas');
let alumnoSeleccinado;
let materiaSeleccinada;
///
/// EVENTOS - Definir eventos a manejar y su funciòn de respuesta.
///
//
// DESAFÍO - Segunda Entrega del Proyecto Final - Implementación con uso de JSON y Storage.
//
//
// DESAFÍO - FETCH en tu proyecto - EXPIRA EL MIÉRCOLES 08/06/2022 23:59HS
//
//
// DESAFÍO COMPLEMENTARIO - Optimizando el proyecto final - iNCORPORÉ DESETRUCUTURACIÓN EN EL ARCHIVO JSON QUE https://jsonplaceholder.typicode.com/users
//
//
// En esta parte del código cumplo con tres desafíos apliocando JSON, FETCH Y DESETRUCUTURACIÓN.
//
$botonMostrarUsers.addEventListener('click', () => {
  fetch('https://jsonplaceholder.typicode.com/users')
    .then(response => response.json())
      .then((json) =>  {
          $divAlumnos.innerHTML = ""
          if(json.length != 0) {
            json.forEach((user, indice) => {
              let {id, name, email} = user; // destructuring
                $divAlumnos.innerHTML += `
                    <div class="card" id="alumno${indice}" style="width: 18rem;margin:3px">
                        <div class="card-body">
                            <h5 class="card-title"> Nombres:   ${name}</h5>
                            <p  class="card-text">  Apellidos: ${name}</p>
                            <p  class="card-text">  EMail:     ${email}</p>
                            <button class="btn btn-danger"><i class="fas fa-trash-alt"></i></button>
                        </div>
                    </div>
                ` // Modificar el DOM, ya sea para definir elementos al cargar la página o para realizar salidas de un procesamiento.
            })
            json.forEach((user, indice) => {
              document.getElementById(`alumno${indice}`).lastElementChild.lastElementChild.addEventListener('click', () => {
                document.getElementById(`alumno${indice}`).remove();
              })
            })
          } else {
            $divUsers.innerHTML = "<p>No existen user cargados para mostrar</p>"
          }
    })
    .catch(error => console.error(error))
})

//
// DESAFÍO - Segunda Entrega del Proyecto Final - Modificación del DOM y detección de eventos de usuario.
//
// Escucho el evento submit en el form Alumno. Ingreso los datos de un alumno nuevo al array students[] 
// mediante el método push e ingreso el nuevo alumno al selectAlumnos mediante la función cargarAlumno
$formAlumno.addEventListener('submit', (e) => {    
  e.preventDefault();
  console.log(e.target);
  let datForm = new FormData(e.target);
  if(datForm.get('nombres') != "" && datForm.get('apellidos') != "" && datForm.get('EMail') != ""){
      const alumno = new Alumno(datForm.get('nombres'), datForm.get('apellidos'), datForm.get('EMail'));
      students.push(alumno);
      //cargarAlumno(students.indexOf(alumno));
      localStorage.setItem('alumnos', JSON.stringify(students)); // Almacenar datos (clave-valor) en el Storage y recuperarlos.
      $formAlumno.reset();    
  }
})
//
// DESAFÍO - Segunda Entrega del Proyecto Final - Implementación con uso de JSON y Storage.
//
$botonMostrarAlumnos.addEventListener('click', () => {
  let alumnosParseados = JSON.parse(localStorage.getItem('alumnos'))
  $divAlumnos.innerHTML = ""
  if(alumnosParseados.length != 0) {
      alumnosParseados.forEach((alumno, indice) => {
          $divAlumnos.innerHTML += `
              <div class="card" id="alumno${indice}" style="width: 18rem;margin:3px">
                  <div class="card-body">
                      <h5 class="card-title"> Nombres:   ${alumno.nombres}</h5>
                      <p  class="card-text">  Apellidos: ${alumno.apellidos}</p>
                      <p  class="card-text">  EMail:     ${alumno.email}</p>
                      <button class="btn btn-danger"><i class="fas fa-trash-alt"></i></button>
                  </div>
              </div>
          ` // Modificar el DOM, ya sea para definir elementos al cargar la página o para realizar salidas de un procesamiento.
      })

      alumnosParseados.forEach((alumno, indice) => {
         document.getElementById(`alumno${indice}`).lastElementChild.lastElementChild.addEventListener('click', () => {
            document.getElementById(`alumno${indice}`).remove();
            let index = students.findIndex(stu=> stu.email == alumno.email);
            students.splice(index,1);
            localStorage.setItem('alumnos', JSON.stringify(students));
         })
      })
  } else {
      $divAlumnos.innerHTML = "<p>No existen alumno cargados para mostrar</p>"
  }
})
///
/// Evento que se ejecuta cuando la pagina carga por primera vez
///
document.addEventListener("DOMContentLoaded", function(){
  renderleccion(leccion_actual);
});

//Evento que se ejecuta para validar si la respuesta es correcta o incorrecta
document.getElementById('btnValidar').addEventListener('click', function (e) {
  validarleccion(leccion_actual);
})

//Evento que se ejecuta para avanzar de leccion
document.getElementById('btnSiguiente').addEventListener('click', function (e) {
  // Se incrementa el leccion actual para poder dibujar la tarjeta y para no dejar avanzar mas de los lessons posibles
  leccion_actual++;

  if (leccion_actual < lessons.length){
    renderleccion(leccion_actual);
  } else {
    mostarAlerta('exito','Ya no quedan preguntas. Ganaste!');
  }
})
///
/// FUNCIONES
///



//Función que se encarga de validar la respuesta seleccionada
const validarleccion = (numero, valorSeleccionado) => {
  cargarLecciones('animals');
  leccion = lessons[numero];
  let opcion_elegida = document.querySelector(`input[name="leccionRadio${numero}"]:checked`);

  if (opcion_elegida !== null){
    if (opcion_elegida.value === leccion.palabraI){
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


///
/// Función que se encarga de dibujar la tarjeta con las opciones posibles.
///
const renderleccion = (numero) => {
  leccion = lessons[numero];
  let html = `<div class="card mb-3" style="max-width: 540px;">
  <div class="row g-0">
    <div class="col-md-4">
      <img src="./img/${leccion.imagen}" class="img-fluid rounded-start" >
    </div>
    <div class="col-md-8">
      <div class="card-body">
        <h5 class="card-title">${leccion.palabraE}</h5>`;
          leccion.opciones.forEach(function (opcion, indice) {
          html += `<div class="form-check">
          <input class="form-check-input" type="radio" name="leccionRadio${numero}" id="leccionRadio${numero}_${indice}" value="${opcion}">
          <label class="form-check-label" for="leccionRadio${numero}_${indice}">${opcion}</label>
        </div>`
        });
  html += `</div></div></div></div>`;
  
  document.querySelector('#divLeccion').innerHTML  = html;
  document.querySelector('#btnSiguiente').disabled = true;
}
//
// DESAFÍO - Incorporando librerías - EXPIRA EL LUNES 06/06/2022 23:59 HS
//
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

Swal.fire({
  title: 'Error!',
  text: 'Do you want to continue?',
  icon: 'error',
  confirmButtonText: 'Cool'
})
