//Esto va primero porque necesitamos acceder a los elementos del HTML antes de usarlos más abajo//
const students=[];
const tableBody=document.querySelector("#studentsTable tbody")
const average=document.getElementById("average")
const inputnombre=document.getElementById("name")
const inputapellido=document.getElementById("lastName")
const inputfecha=document.getElementById("date")
const inputnota=document.getElementById("grade")
const averageText = document.querySelector("#average h2");
// Agregar un evento al formulario para que se ejecute cuando se envíe//
document.getElementById("studentForm").addEventListener("submit", function(e){
    e.preventDefault();// Evitar que el formulario se envíe y recargue la página.//

    const name= document.getElementById("name").value.trim();
    const lastName = document.getElementById("lastName").value.trim(); //trim() quita espacios en blanco al inicio y final.//
    const grade = parseFloat(document.getElementById("grade").value);  //parseFloat() convierte la nota a número decimal.//
    const date=document.getElementById("date").value.trim();

//Validación de los datos ingresados//
    if(!name || !lastName || isNaN(grade) || grade<1 || grade >7){
        alert("Error al ingresar la Datos")
        return
    } 

    const student ={name,lastName,grade,date};//se crea un objeto estudiante con los datos ingresados//
// Agregar el estudiante al arreglo de estudiantes//
students.push(student);//push() agrega un nuevo elemento al final del arreglo.//
//console.log(students)
addStudentToTable(student)// Agregar el estudiante a la tabla//
calculateAverage();
this.reset()

});

//-------------------------agregar estudiante a la tabla-------------------------//
function addStudentToTable(student){// Agregar el objeto estudiante a la students//
    const row=document.createElement("tr")// Crear una nueva fila en la tabla//
    
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

    row.querySelector(".delete-btn").addEventListener("click",function(){
        deleteEstudiante(student,row);        

    })

function deleteEstudiante(student,row){
    const index=students.indexOf(student);
    if (index>-1){
        students.splice(index,1);
        calculateAverage();
        row.remove();
    }
}
}

//-------------------------Editar---------------------------//

//-------------------------average-------------------------//
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
inputnombre.addEventListener("invalid", function() {
    if (inputnombre.value === ""){
        inputnombre.setCustomValidity("Por favor, ingrese su nombre.");
    }
});

inputapellido.addEventListener("invalid", function() {
    if (inputapellido.value === ""){
        inputapellido.setCustomValidity("Por favor, ingrese su apellido.");
    }
});
inputnota.addEventListener("invalid", function() {
    if (inputnota.value === ""){
        inputnota.setCustomValidity("Por favor, ingrese su nota.");
    }
}); 
inputfecha.addEventListener("invalid", function() {
    if (inputfecha.value === ""){
        inputfecha.setCustomValidity("Por favor, ingrese la fecha de la nota.");
    }
});