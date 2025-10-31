import {projectList, Project} from "./projects.js"

function displayCompleteTasks() {

}

// display and remove task factory function
const activeTasksControl = function(currentProj) {
    const activeTaskBox = document.querySelector(".activeTaskBox")

    let projectToShow
    if (typeof currentProj === "object") {
        projectToShow = (projectList.find((project) => {return project.name == currentProj.currentProject}))
    } else if (typeof currentProj === "string") {
        projectToShow = (projectList.find((project) => {return project.name == currentProj}))
    }
    
    // show tasks on the active tasks box section
    function displayNewTask() {
        // if tasks exist, remove the no task box
        // if tasks dont exist, show it and don't continue with function
        if (projectToShow.activeTasks.length > 0 || projectToShow.completedTasks.length > 0) {
            removeNoTasksBox()
        } else if (projectToShow.activeTasks.length === 0 && projectToShow.completedTasks.length === 0) {
            showNoTasksBox()
            return;
        }

        // display active and completed tasks
        for (let i = 0; i < projectToShow.activeTasks.length; i++) {
            displayActiveTasks(projectToShow, i)
        }
        for (let i = 0; i < projectToShow.completedTasks.length; i++) {
            displayCompletedTasks(projectToShow, i)
        }
    }

    function hideDisplayNewTask() {
        let domList = Array.prototype.slice.call(activeTaskBox.children)
        for (let i = domList.length - 1; i > 0; i--) { 
            domList[i].remove()
        }
    }

    function removeNoTasksBox() {
        const noTasksBox = document.querySelector(".noTasks")
        noTasksBox.style.display = "none"
    }

    function showNoTasksBox() {
        const noTasksBox = document.querySelector(".noTasks")
        noTasksBox.style.display = "flex"
    }

    
    return {displayNewTask, hideDisplayNewTask, removeNoTasksBox, showNoTasksBox}
}

function displayActiveTasks(projectToShow, i) {
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
    activeTaskTitle.id = "activeTaskTitle"
    buttonDiv.classList.add("buttonDiv")
    taskMiddleSection.classList.add("taskMiddleSection")
    taskText.classList.add("taskText")
    taskInfo.classList.add("taskInfo")
    taskOptions.classList.add("taskOptions")

    // full in task based on index of activeTasks
    activeTaskTitle.textContent = "Active Tasks"
    taskTitle.textContent = projectToShow.activeTasks[i].title
    taskDesc.textContent = projectToShow.activeTasks[i].shortDesc
    taskPriority.textContent = projectToShow.activeTasks[i].priority
    taskProject.textContent = projectToShow.activeTasks[i].project
    taskDueDate.textContent = projectToShow.activeTasks[i].dueDate
    taskEdit.textContent = "Edit"
    taskDelete.textContent = "Delete"
    
    // if title doesn't exist yet, then append it
    if (i === 0) {
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

function displayCompletedTasks(projectToShow, i) {
    const completedTaskBox = document.querySelector(".completedTaskBox")
    const completedTaskTitle = document.createElement("h2")
    const completedTaskItem = document.createElement("div")
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
    
    completedTaskItem.classList.add("completedTaskItem")
    completedTaskTitle.id = "completedTaskTitle"
    buttonDiv.classList.add("buttonDiv")
    taskMiddleSection.classList.add("taskMiddleSection")
    taskText.classList.add("taskText")
    taskInfo.classList.add("taskInfo")
    taskOptions.classList.add("taskOptions")

    // full in task based on index of activeTasks
    completedTaskTitle.textContent = "Completed Tasks"
    taskTitle.textContent = projectToShow.completedTasks[i].title
    taskDesc.textContent = projectToShow.completedTasks[i].shortDesc
    taskPriority.textContent = projectToShow.completedTasks[i].priority
    taskProject.textContent = projectToShow.completedTasks[i].project
    taskDueDate.textContent = projectToShow.completedTasks[i].dueDate
    taskEdit.textContent = "Edit"
    taskDelete.textContent = "Delete"
    
    // if title doesn't exist yet, then append it
    if (i === 0) {
        completedTaskBox.append(completedTaskTitle)
    }

    completedTaskBox.append(completedTaskItem)
    completedTaskItem.append(buttonDiv, taskMiddleSection, taskOptions)
    buttonDiv.append(checkTaskButton)
    taskMiddleSection.append(taskText, taskInfo)
    taskText.append(taskTitle, taskDesc)
    taskInfo.append(taskPriority, taskProject, taskDueDate)
    taskOptions.append(taskEdit, taskDelete)    
}

function hideActiveTasks() {
    const activeTaskBox = document.querySelector(".activeTaskBox")
    activeTaskBox.style.display = "none"
}

function showActiveTaskBox() {
    const activeTaskBox = document.querySelector(".activeTaskBox")
    activeTaskBox.style.display = "flex"
}

export {activeTasksControl}