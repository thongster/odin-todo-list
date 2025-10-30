import {projectList, Project} from "./projects.js"
import {displayCurrentProject} from "./projectlabel.js"


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
        displayCurrentProject(e.target.projectSelect.value)
    })
}

function displayNewTask() {
    // if no tasks in this project, remove the no tasks message box
    const activeTaskBox = document.querySelector(".activeTaskBox")
}

function removeNoTasksBox() {
    const noTasksBox = document.querySelector(".noTasks")
    noTasksBox.style.display = "none"
}

function addToAllTasks() {
    // loop through all projects except "All Tasks" (index[0])
    projectList.slice(1).forEach((e) => {
        // for each active task, if not included already, add to All Tasks
        e.activeTasks.forEach((arr) => {
            let taskList = projectList[0].activeTasks
            if (!taskList.some(item => item.title === arr.title)) {
                projectList[0].activeTasks.push(arr)
            }
        })
        // for each completed task, if not included already, add to All Tasks
        e.completedTasks.forEach((e) => {
            let taskList = projectList[0].completedTasks
            if (!taskList.some(item => item.title === arr.title)) {
                projectList[0].completedTasks.push(arr)
            } 
        })
    })
    // console.log(projectList[0].activeTasks)
    // console.log(projectList[0].completedTasks)
}

export {newTask, removeNoTasksBox, addToAllTasks}