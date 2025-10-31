import {projectList} from "./projects.js"
import {displayNewTask} from "./activeTaskDisplay.js"

// determine "current" project to display
const assignCurrentProject = function() {
    let isCurrentProjectExist = false
    let currentProject = ""
    const projectButtonList = document.querySelectorAll(".projectButton")
    projectButtonList.forEach((e) => {
        e.addEventListener("click", (e) => {
            currentProject = e.target.textContent
            displayCurrentProject(currentProject)
            console.log(currentProject)
            displayNewTask(currentProject) // show tasks for that project
        })        
    })

    if (isCurrentProjectExist === false) {
        currentProject = "All Tasks"
        displayCurrentProject(currentProject)
    }
    return {currentProject}
}

function displayCurrentProject(currentProject) {
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

export {assignCurrentProject, displayCurrentProject}