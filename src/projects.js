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
        // add new Project to projectList (short term memory)
        newProject.addToProjectList()
        displayProject(newProject.name)
        exitModal()
        addProjectForm.reset() // clear form
        addOneProjectOption(newProject.name)

        // get new project info and add to localstorage
        localStorage.setItem("projectList", JSON.stringify(projectList))
        console.log(projectList) // remove later
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

export {addProject, clickNewProject, exitNewProject, displayExistingProjects, fillProjectSelect, projectList}