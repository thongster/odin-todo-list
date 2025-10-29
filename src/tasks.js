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

function addTask() {
    const newTaskForm = document.querySelector(".newTaskFormDOM")

    newTaskForm.addEventListener("submit", (e) => {
        e.preventDefault()
        const newTask = new Task(
            e.target.title.value, e.target.shortDesc.value, 
            e.target.projectSelect.value, e.target.priority.value, 
            e.target.dueDate.value
        )
        console.log(newTask)
    })
    // console.log(projectList) // remove later
}

export {addTask}