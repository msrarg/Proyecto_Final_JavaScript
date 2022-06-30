El página cuenta con dos pequeños flujos. Uno es el alta de un usuario donde realizo la validación de 3 campos obligatorios (nombres, apellidos y email) para este último caso valido que no se repita con los anteriores registrados.

Se puede ver a todos los usuarios registrados a través de cards y los almaceno en el local storage para recrearlos al momento de abrir el sitio.

Luego de crear el usuario se puede seleccionar el mismo y tomar una lección.

Existe un json llamado lessons.json en donde tengo guardada todas las lecciones que se pueden dividir en tres categorías de lecciones (Animals, Colours, Months).

Se puede seleccionar el tipo de lección que se quiere tomar al seleccionar los pills con las palabras antes mencionadas. También se puede apreciar que a medida que se selecciona una lección van cambiado las cards en su contenido.

Adicionalmente generé que el contenido de las cards se cargue aleatoriamente desde el array que las contiene para darle un poco más de complejidad y realidad a la lección tomada, lo mismo sucede con las opciones de respuesta que pueden variar en la posición que aparecen (esto es menos frecuente ya que al ser solo 3 opciones varían menos).

Se puede ir tomando la lección seleccionando una opción luego validándola a través del botón validar para luego continuar con la siguiente palabra de la lección.

Al finalizar la misma te indica el porcentaje de palabras correctas seleccionadas.

Quedaron muchas cosas pendientes:
•	Para poder tomar de nuevo la misma lección es necesario clickear en otra pills y volver a la anterior para retomarla.

•	Se podrían guardar los datos de los intentos en un json y luego mostrar la evolución del alumno para una misma o diferentes lecciones.

•	Se debería poder seleccionar un alumno y poder modificar los datos ingresados (ese era el objetivo del input numérico que almacene el id)

Y muchas cosas más que la imaginación y la programación nos permiten realizar.
