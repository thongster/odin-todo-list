// check local storage for projectList, or create empty array if doesn't exist yet
const projectList = JSON.parse(localStorage.getItem("projectList")) || []

class Project {
    constructor(name) {
        this.name = name
        this.activeTasks = []
        this.completedTasks = []
    }

    addToProjectList() {
        projectList.push(this)
    }
}

// loop through exising projects in localStorage and display to dom
function displayExistingProjects() {
    projectList.forEach((e) => {
        displayProject(e.name)
    })
}

// take project name, display on dom as button
function displayProject(projectName) {
    const projectListDOM = document.querySelector(".projectListDOM")
    const projectButton = document.createElement("button")
    projectButton.classList.add("buttonOne", "projectButton")
    projectButton.textContent = projectName
    projectListDOM.append(projectButton)
}

// show modal pop up functijon (reusable)
function showModal(modalSection) {
    modalSection.style.display = "flex";
}

// exit modal pop up function (reusable)
function exitModal(modalSection) {
    modalSection.style.display = "none";
}

// display modal 
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

// auto-create All Tasks Project
function createAllTasks() {
    if (JSON.parse(localStorage.getItem("projectList")).find((project) => {
        project.name === "All Tasks"
    })) {
        console.log("createAllTasks first condition")
    } else {
        const allTasks = new Project("All Tasks").addToProjectList()
        console.log("createAllTasks second condition")
    }
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

// populate task select field with existing projects
function fillProjectSelect() {
    projectList.forEach((e) => {
        addOneProjectOption(e.name)
    })
}

// add new project option on task form
function addOneProjectOption(projectName) {
    const projectSelect = document.querySelector("#projectSelect")
    const projectOption = document.createElement("option")
    projectOption.textContent = projectName
    projectSelect.append(projectOption)
}

export {addProject, clickNewProject, exitNewProject, displayExistingProjects, fillProjectSelect, createAllTasks, projectList}