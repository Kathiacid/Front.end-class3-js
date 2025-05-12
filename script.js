const students=[];
const tableBody=document.querySelector("#studensTable tbody")
const average=document.getElementById("average")


document.getElementById("studentForm").addEventListener("submit", function(e){
    e.preventDefault();

    const name= document.getElementById("name").value.trim();
    const lastName = document.getElementById("lastName").value.trim();
    const grade = parseFloat(document.getElementById("grade").value);
    const date=document.getElementById("date").value.trim();


    if(!name || !lastName || isNaN(grade) || grade<1 || grade >7){
        alert("Error al ingresar la Datos")
        return
    } 
    const student ={
        name,
        lastName,
        grade,
        date};

students.push(student);
//console.log(students)
addStudentToTable(student)
calculateAverage();
this.reset()
//holi
});
function addStudentToTable(student){
    const row=document.createElement("tr")
    row.innerHTML=`
    <td>${student.name}</td>




    <td>${student.lastName}</td>
    <td>${student.date}</td>
    <td>${student.grade}</td>`;

    tableBody.appendChild(row);
}

function calculateAverage(){
    if(students.length===0){
        average.textContent="Promedio General del curso: N/A"
        return
    } 
    const total=students.reduce((sum,student)=>sum+student.grade,0);
    const prom=total/students.length;
    average.textContent="Promedio General del curso : "+prom.toFixed(2);
    
}