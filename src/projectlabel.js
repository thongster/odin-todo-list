import {projectList} from "./projects.js"

// determine "current" project to display
function assignCurrentProject() {
    const projectButtonList = document.querySelectorAll(".projectButton")
    let currentProject = ""
    projectButtonList.forEach((e) => {
        e.addEventListener("click", (e) => {
            currentProject = e.target.textContent
            displayCurrentProject(currentProject);
        })        
    })

    if (currentProject === "") {
        currentProject = "All Tasks"
    }
    return {currentProject}
}

function displayCurrentProject(currentProject) {
    const projectLabelBox = document.querySelector(".projectLabelBox")
    // start at empty 
    projectLabelBox.textContent = ""
    // loop through project list, 
    projectList.forEach((e) => {
        // if current project (assigned by clicking) is the same as project name
        // display project heading, active, completed tasks
        if (currentProject === e.name) {
            const projectLabelHeading = document.createElement("h2")
            const projectLabelTasks = document.createElement("p")
            projectLabelHeading.textContent = `${e.name}`
            projectLabelTasks.textContent = `${e.activeTasks.length} active, ${e.completedTasks.length} completed`
            projectLabelBox.append(projectLabelHeading, projectLabelTasks)
            console.log("im in here")
        }
    })
}

function displayAllTasksProject() {

}

export {assignCurrentProject, displayCurrentProject}