import {projectList} from "./projects.js"

class Task {
    constructor(title, shortDesc, project, priority, dueDate) {
        this.title = title
        this.shortDesc = shortDesc
        this.project = project
        this.priority = priority
        this.dueDate = dueDate
    }
}

// if task project category matches, add active task to that project
function addTaskToProject(newTask) {
    projectList.forEach((e) => {
        if (e.name === newTask.project) {
            e.activeTasks.push(newTask)
            localStorage.setItem("projectList", JSON.stringify(projectList))
        }
    })

}

// add new task based on form data
function newTask() {
    const newTaskForm = document.querySelector(".newTaskFormDOM")
    newTaskForm.addEventListener("submit", (e) => {
        e.preventDefault()
        const newTask = new Task(
            e.target.title.value, e.target.shortDesc.value, 
            e.target.projectSelect.value, e.target.priority.value, 
            e.target.dueDate.value
        )
        console.log(newTask)
        addTaskToProject(newTask)
    })
    console.log(projectList) // remove later
}

function displayNewTask() {
    // if no tasks in this project, remove the no tasks message box
    const activeTaskBox = document.querySelector(".activeTaskBox")
}

function removeNoTasksBox() {
    const noTasksBox = document.querySelector(".noTasks")
    noTasksBox.style.display = "none";
}

export {newTask, removeNoTasksBox}