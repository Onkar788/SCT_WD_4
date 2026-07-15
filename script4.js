let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

displayTasks();

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function addTask() {

    let taskInput = document.getElementById("taskInput");
    let taskDate = document.getElementById("taskDate");

    if(taskInput.value==""){
        alert("Please Enter Task");
        return;
    }

    tasks.push({
        text: taskInput.value,
        date: taskDate.value,
        completed:false
    });

    taskInput.value="";
    taskDate.value="";

    saveTasks();
    displayTasks();
}

function displayTasks(){

    let list=document.getElementById("taskList");

    list.innerHTML="";

    tasks.forEach((task,index)=>{

        let li=document.createElement("li");

        li.innerHTML=`
        <div class="task-details ${task.completed ? "completed":""}">
            <strong>${task.text}</strong><br>
            <small>${task.date || "No Date"}</small>
        </div>

        <div class="actions">

        <button class="complete" onclick="toggleComplete(${index})">
        ✔
        </button>

        <button class="edit" onclick="editTask(${index})">
        Edit
        </button>

        <button class="delete" onclick="deleteTask(${index})">
        Delete
        </button>

        </div>
        `;

        list.appendChild(li);

    });

}

function toggleComplete(index){

    tasks[index].completed=!tasks[index].completed;

    saveTasks();

    displayTasks();

}

function deleteTask(index){

    tasks.splice(index,1);

    saveTasks();

    displayTasks();

}

function editTask(index){

    let newTask=prompt("Edit Task",tasks[index].text);

    if(newTask!=null && newTask!=""){

        tasks[index].text=newTask;

        saveTasks();

        displayTasks();

    }

}