import {projectList} from "./projects.js"
import {activeTasksControl} from "./activeTaskDisplay.js"

// determine "current" project to display
const assignCurrentProject = function() {
    let currentProject = ""
    const projectButtonList = document.querySelectorAll(".projectButton")
    projectButtonList.forEach((e) => {
        e.addEventListener("click", (e) => {
            currentProject = e.target.textContent
            const task = activeTasksControl(currentProject)
            task.hideDisplayNewTask()
            task.displayNewTask() // show tasks for that project
            displayCurrentProjectLabel(currentProject)
        })        
    })

    return {currentProject}
}

function defaultDisplayAllTasks() {
    let currentProject = "All Tasks"
    displayCurrentProjectLabel(currentProject)
    const fillTasks = activeTasksControl(currentProject)
    fillTasks.displayNewTask()
}

// display current project on project label box
function displayCurrentProjectLabel(currentProject) {
    const projectLabelBox = document.querySelector(".projectLabelBox")
    // loop through project list, 
    projectList.forEach((e) => {
        // if current project (assigned by clicking) is the same as project name
        // display project heading, active, completed tasks
        if (currentProject === e.name) {
            projectLabelBox.textContent = ""
            const projectLabelHeading = document.createElement("h2")
            const projectLabelTasks = document.createElement("p")
            projectLabelHeading.textContent = `${e.name}`
            projectLabelTasks.textContent = `${e.activeTasks.length} active, ${e.completedTasks.length} completed`
            projectLabelBox.append(projectLabelHeading, projectLabelTasks)
        }
    })
}

function displayAllTasksProject() {

}

export {assignCurrentProject, displayCurrentProjectLabel, defaultDisplayAllTasks}