import {projectList, Project} from "./projects.js"
import {assignCurrentProject} from "./projectlabel.js"


function displayActiveTasks() {

}

function displayCompleteTasks() {

}

function displayNewTask(currentProj) {
    // if no tasks in this project, remove the no tasks message box
    console.log(projectList)
    console.log(currentProj.currentProject)

    const array = (projectList.find((project) => {return project.name == currentProj.currentProject}))
    console.log(array)
    removeNoTasksBox()
    for (let i = 0; i < array.activeTasks.length; i++) {
        const activeTaskBox = document.querySelector(".activeTaskBox")
        const activeTaskTitle = document.createElement("h2")
        const activeTaskItem = document.createElement("div")
        const buttonDiv = document.createElement("div")
        const checkTaskButton = document.createElement("button")
        const taskMiddleSection = document.createElement("div")
        const taskText = document.createElement("div")
        const taskTitle = document.createElement("h3")
        const taskDesc = document.createElement("p")
        const taskInfo = document.createElement("div")
        const taskPriority = document.createElement("button")
        const taskProject = document.createElement("button")
        const taskDueDate = document.createElement("button")
        const taskOptions = document.createElement("div")
        const taskEdit = document.createElement("button")
        const taskDelete = document.createElement("button")

        activeTaskItem.classList.add("activeTaskItem")
        buttonDiv.classList.add("buttonDiv")
        taskMiddleSection.classList.add("taskMiddleSection")
        taskText.classList.add("taskText")
        taskInfo.classList.add("taskInfo")
        taskOptions.classList.add("taskOptions")

        activeTaskTitle.textContent = "Active Tasks"
        taskTitle.textContent = array.activeTasks[i].title
        taskDesc.textContent = array.activeTasks[i].shortDesc
        taskPriority.textContent = array.activeTasks[i].priority
        taskProject.textContent = array.activeTasks[i].project
        taskDueDate.textContent = array.activeTasks[i].dueDate
        taskEdit.textContent = "Edit"
        taskDelete.textContent = "Delete"
        
        if (i == 0) {
            activeTaskBox.append(activeTaskTitle)
        }
        activeTaskBox.append(activeTaskItem)
        activeTaskItem.append(buttonDiv, taskMiddleSection, taskOptions)
        buttonDiv.append(checkTaskButton)
        taskMiddleSection.append(taskText, taskInfo)
        taskText.append(taskTitle, taskDesc)
        taskInfo.append(taskPriority, taskProject, taskDueDate)
        taskOptions.append(taskEdit, taskDelete)
    }
    // projectList.forEach((project) => {
    //     if (project.name === assignCurrentProject().currentProject) {


        // }
    // })
}

function removeNoTasksBox() {
    const noTasksBox = document.querySelector(".noTasks")
    noTasksBox.style.display = "none"
}

function showNoTasksBox() {
    const noTasksBox = document.querySelector(".noTasks")
    noTasksBox.style.display = "flex"
}

export {displayNewTask, removeNoTasksBox, showNoTasksBox}