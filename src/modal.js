import {assignCurrentProject, displayCurrentProjectLabel} from "./projectlabel.js"
import {displayProject, addOneProjectOption, projectList, Project, displayExistingProjects} from "./projects.js"
import {activeTasksControl} from "./activeTaskDisplay.js"

// show modal pop up functijon (reusable)
function showModal(toggle) {
    const modalSection = document.querySelector(".modal")
    if (toggle === "on") {
        modalSection.style.display = "flex";
    } else {
        modalSection.style.display = "none";
    }
}

function showNewProjectModal(toggle) {
    const newProjectModal = document.querySelector(".newProjectModal")
    if (toggle === "on") {
        newProjectModal.style.display = "flex";
    } else {
        newProjectModal.style.display = "none";
    }   
}

function showEditTaskModal(toggle) {
    const editTaskModal = document.querySelector(".editTaskModal")
    if (toggle === "on") {
        editTaskModal.style.display = "flex";
    } else {
        editTaskModal.style.display = "none";
    }       
}

// display modal when clicking + New Project button
function clickNewProject() {
    const newProjectButton = document.querySelector("#newProjectButton")
    newProjectButton.addEventListener("click", (e) => {
        e.preventDefault
        showModal("on")
        showNewProjectModal("on")
    })
}

// exit new project modal
function exitModal() { 
    const modalSection = document.querySelector(".modal")
    const closeModalButton = document.querySelectorAll(".closeModalButton")
    closeModalButton.forEach((btn) => {
        btn.addEventListener("click", () => {
            showModal("off")
            showNewProjectModal("off")
            showEditTaskModal("off")
        })
        // if click outside modal box
        window.addEventListener("click", (e) => {
            if (e.target === modalSection) {
                showModal("off")
                showNewProjectModal("off")
                showEditTaskModal("off")
            }
        })
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
  
        addProjectForm.reset() // clear form
        showModal("off") // exit modal form
        showNewProjectModal("off")
        
        displayProject(newProject.name) // display to project side bar
        addOneProjectOption(newProject.name) // add to New Task form selections
        assignCurrentProject() // immediately add to current projectList
        displayCurrentProjectLabel(newProject.name) // display to project Label box
        activeTasksControl().hideDisplayNewTask()
        activeTasksControl(newProject.name).displayNewTask()

        // get new project info and add to localstorage
        localStorage.setItem("projectList", JSON.stringify(projectList))
    }) 
}

export {clickNewProject, exitModal, addProject, showModal, showEditTaskModal}