import {assignCurrentProject, displayCurrentProject} from "./projectlabel.js"
import {displayProject, addOneProjectOption, projectList, Project} from "./projects.js"


// show modal pop up functijon (reusable)
function showModal(modalSection) {
    modalSection.style.display = "flex";
}

// exit modal pop up function (reusable)
function exitModal(modalSection) {
    modalSection = document.querySelector(".modal")
    modalSection.style.display = "none";
}

// display modal when clicking + New Project button
function clickNewProject() {
    const modalSection = document.querySelector(".modal")
    const newProjectButton = document.querySelector("#newProjectButton")
    newProjectButton.addEventListener("click", (e) => {
        e.preventDefault
        showModal(modalSection)
    })
}

// exit new project modal
function exitNewProject() { 
    const modalSection = document.querySelector(".modal")
    const closeModalButton = document.querySelector("#closeModalButton")
    closeModalButton.addEventListener("click", () => {
        exitModal(modalSection)
    })
    // if click outside modal box
    window.addEventListener("click", (e) => {
        if (e.target === modalSection) {
            exitModal(modalSection)
        }
    })
}

// add new project
function addProject() {
    const addProjectForm = document.querySelector("#addProjectForm")
    addProjectForm.addEventListener("submit", (e) => {
        e.preventDefault()
        // get input value and display to dom project list
        const newProject = new Project(e.target.newProject.value.trim())
        // add new Project to projectList (short term memory)
        newProject.addToProjectList()
        displayProject(newProject.name)
        
        addProjectForm.reset() // clear form
        exitModal() // exit modal form
        
        addOneProjectOption(newProject.name)
        displayCurrentProject(assignCurrentProject())

        // get new project info and add to localstorage
        localStorage.setItem("projectList", JSON.stringify(projectList))
    }) 
}

export {clickNewProject, exitNewProject, addProject}