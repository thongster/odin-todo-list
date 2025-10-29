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
        console.log(e)
    })
    // console.log(projectList) // remove later
}

export {addTask}