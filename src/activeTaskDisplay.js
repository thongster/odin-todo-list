import {projectList, Project} from "./projects.js"

function displayActiveTasks() {

}

function displayCompleteTasks() {

}

function displayNewTask() {
    // if no tasks in this project, remove the no tasks message box
    removeNoTasksBox()
    projectList.forEach((project) => {
        console.log(project)
    })
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

    activeTaskBox.append(activeTaskTitle, activeTaskItem)
    activeTaskItem.append(buttonDiv, taskMiddleSection, taskOptions)
    buttonDiv.append(checkTaskButton)
    taskMiddleSection.append(taskText, taskInfo)
    taskText.append(taskTitle, taskDesc)
    taskInfo.append(taskPriority, taskProject, taskDueDate)
    taskOptions.append(taskEdit, taskDelete)
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