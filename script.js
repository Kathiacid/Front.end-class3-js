//Esto va primero porque necesitamos acceder a los elementos del HTML antes de usarlos más abajo//
const students = []; 

const tableBody = document.querySelector("#studentsTable tbody");
const average = document.getElementById("average");
const inputnombre = document.getElementById("name");
const inputapellido = document.getElementById("lastName");
const inputfecha = document.getElementById("date");
const inputnota = document.getElementById("grade");
const averageText = document.querySelector("#average h2");
const form = document.getElementById("studentForm");
const submitButton = document.querySelector(".btn");

let editIndex = -1; // -1 significa que no estamos en modo edición

// Agregar un evento al formulario para que se ejecute cuando se envíe//
form.addEventListener("submit", function (e) {
    e.preventDefault(); // Evitar que el formulario se envíe y recargue la página.//

    const name = inputnombre.value.trim();
    const lastName = inputapellido.value.trim(); //trim() quita espacios en blanco al inicio y final.//
    const grade = parseFloat(inputnota.value);  //parseFloat() convierte la nota a número decimal.//
    const date = inputfecha.value.trim();

    //Validación de los datos ingresados//
    if (!name || !lastName || isNaN(grade) || grade < 1 || grade > 7) {
        alert("Error al ingresar los datos");
        return;
    }

    const student = { name, lastName, grade, date }; // se crea un objeto estudiante con los datos ingresados //

    if (editIndex === -1) {
        // Modo agregar estudiante nuevo //
        students.push(student); //push() agrega un nuevo elemento al final del arreglo.//
        addStudentToTable(student); // Agregar el estudiante a la tabla//
    } else {
        // Modo editar estudiante existente //
        students[editIndex] = student; // Reemplazar el estudiante en el índice editado
        refreshTable(); // Reconstruir la tabla completa
        editIndex = -1; // Salir del modo edición
        submitButton.textContent = "Agregar Estudiante"; // Cambiar texto del botón
    }

    calculateAverage(); // Calcular promedio actualizado
    form.reset(); // Limpiar el formulario
});

//-------------------------agregar estudiante a la tabla-------------------------//
function addStudentToTable(student) {
    const row = document.createElement("tr"); // Crear una nueva fila en la tabla//

    row.innerHTML = `
        <td>${student.name}</td>
        <td>${student.lastName}</td>
        <td>${student.grade}</td>
        <td>${student.date}</td>
        <td><button class="delete-btn">Eliminar</button></td>
        <td><button class="edit-btn">Editar</button></td>
    `;

    tableBody.appendChild(row);

    //-----------------------------eliminar----------------------//
    row.querySelector(".delete-btn").addEventListener("click", function () {
        deleteEstudiante(student, row);        
    });

    //-----------------------------editar----------------------//
    row.querySelector(".edit-btn").addEventListener("click", function () {
        editIndex = students.indexOf(student); // Guardar el índice del estudiante
        inputnombre.value = student.name;
        inputapellido.value = student.lastName;
        inputnota.value = student.grade;
        inputfecha.value = student.date;

        submitButton.textContent = "Actualizar Estudiante"; // Cambiar texto del botón
    });
}

//-------------------------Eliminar estudiante---------------------------//
function deleteEstudiante(student, row) {
    const index = students.indexOf(student);
    if (index > -1) {
        students.splice(index, 1); // Eliminar estudiante del arreglo
        calculateAverage(); // Recalcular promedio
        row.remove(); // Eliminar fila de la tabla
    }
}

//-------------------------Refrescar tabla completa-------------------------//
function refreshTable() {
    tableBody.innerHTML = ""; // Limpiar tabla
    students.forEach((student) => addStudentToTable(student)); // Volver a agregar todos los estudiantes
}

//-------------------------Calcular promedio-------------------------//
function calculateAverage() {
    if (students.length === 0) {
        averageText.textContent = "Promedio de Calificaciones : No Disponible";
        return;
    }

    const total = students.reduce((sum, student) => sum + student.grade, 0);
    const prom = total / students.length;

    averageText.textContent = "Promedio de Calificaciones : " + prom.toFixed(2);

    // agregar estilos a las cosas que se vayan generando por java script
    averageText.style.backgroundColor = "#f999a9";
    averageText.style.fontSize = "15px";
    averageText.style.borderRadius = "10px";
    averageText.style.padding = "5px";
    averageText.style.height = "auto"; 
    averageText.style.width = "300px";
    averageText.style.fontFamily = '"Jua", sans-serif';
}

//-------------------------mensaje de error-------------------------//
inputnombre.addEventListener("invalid", function () {
    if (inputnombre.value === "") {
        inputnombre.setCustomValidity("Por favor, ingrese su nombre.");
    }
});

inputapellido.addEventListener("invalid", function () {
    if (inputapellido.value === "") {
        inputapellido.setCustomValidity("Por favor, ingrese su apellido.");
    }
});

inputnota.addEventListener("invalid", function () {
    if (inputnota.value === "") {
        inputnota.setCustomValidity("Por favor, ingrese su nota.");
    }
}); 

inputfecha.addEventListener("invalid", function () {
    if (inputfecha.value === "") {
        inputfecha.setCustomValidity("Por favor, ingrese la fecha de la nota.");
    }
});
