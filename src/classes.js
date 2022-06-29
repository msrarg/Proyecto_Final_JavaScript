//const fs = require("fs").promises;
const pathFile = `./assets/students.json`;
const encoding = `utf-8`;

class Alumno {
    constructor(id, nombres, apellidos, email, comentario){
        this.id         = id;
        this.nombres    = nombres;
        this.apellidos  = apellidos;
        this.email      = email;
        this.comentario = comentario;
    }

    getNombresApellidos = () => `${this.nombres}, ${this.apellidos}`;
  }
  
  class Leccion {
    constructor(nombre, palabraE, palabraI, imagen, opciones){
        this.nombre   = nombre;
        this.palabraE = palabraE;
        this.palabraI = palabraI;
        this.imagen   = imagen;
        this.opciones = opciones;
    }

    getRandomOptions = () => {
      let index = 0;  
      let randomOption = [];
      do{
          index = parseInt(Math.random() * (this.opciones.length));
            if(!randomOption.includes(this.opciones[index]))
                randomOption.push(this.opciones[index]);
        } while (randomOption.length < this.opciones.length)
      return randomOption;
    };
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

  export { Alumno, Leccion, Intento };
