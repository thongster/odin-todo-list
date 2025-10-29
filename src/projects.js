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

// loop through project list, 
// if current project (assigned by clicking) is the same as project name
// 
function displayCurrentProject(currentProject) {
    const projectLabelBox = document.querySelector(".projectLabelBox")
    //
    projectLabelBox.textContent = ""
    projectList.forEach((e) => {
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

export {addProject, clickNewProject, exitNewProject, displayExistingProjects, fillProjectSelect, assignCurrentProject, displayCurrentProject, projectList}