// check local storage for projectList, or create empty array if doesn't exist yet
const projectList = JSON.parse(localStorage.getItem("projectList")) || []

class Project {
    constructor(name) {
        this.name = name;
        this.activeTasks = 0
        this.completedTasks = 0
    }

    addToProjectList() {
        projectList.push(this)
    }
}

// display exising projects in localStorage
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

// display modal 
function clickNewProject() {
    const modalSection = document.querySelector(".modal")
    const newProjectModal = document.querySelector(".newProjectModal")
    const newProjectButton = document.querySelector("#newProjectButton")
    newProjectButton.addEventListener("click", (e) => {
        e.preventDefault
        modalSection.style.display = "flex";
        newProjectModal.style.display = "flex";
    })
}

// exit modal pop up function
function exitModal() {
    const modalSection = document.querySelector(".modal")
    const newProjectModal = document.querySelector(".newProjectModal")
    modalSection.style.display = "none";
    newProjectModal.style.display = "none";    
}

// exit modal
function exitNewProject() { 
    const modalSection = document.querySelector(".modal")
    const closeModalButton = document.querySelector("#closeModalButton")
    // set display to none if click on X button
    closeModalButton.addEventListener("click", () => {
        exitModal()
    })
    // set display to none if click outside modal box
    window.addEventListener("click", (e) => {
        if (e.target === modalSection) {
            exitModal()
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
        newProject.addToProjectList()
        displayProject(newProject.name)
        exitModal()
        addProjectForm.reset()

        localStorage.setItem("projectList", JSON.stringify(projectList))
        console.log(projectList)
    }) 
}

export {addProject, displayProject, clickNewProject, exitNewProject, displayExistingProjects}