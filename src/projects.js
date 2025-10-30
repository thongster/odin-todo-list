

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

// take project name, display on dom as button
function displayProject(projectName) {
    const projectListDOM = document.querySelector(".projectListDOM")
    const projectButton = document.createElement("button")
    projectButton.classList.add("buttonOne", "projectButton")
    projectButton.textContent = projectName
    projectListDOM.append(projectButton)
}

// loop through exising projects in localStorage and display to dom
function displayExistingProjects() {
    projectList.forEach((e) => {
        displayProject(e.name)
    })
}

// auto-create All Tasks Project if non detected
function createAllTasks() {
    if (JSON.parse(localStorage.getItem("projectList")) === null || projectList == []) {
        new Project("All Tasks").addToProjectList()
        localStorage.setItem("projectList", JSON.stringify(projectList))
    }
}

// populate task select field with existing projects, except All Tasks
function fillProjectSelect() {
    projectList.forEach((e) => {
        if (e.name != "All Tasks") {
            addOneProjectOption(e.name)
        }
    })
}

// add new project option on task form
function addOneProjectOption(projectName) {
    const projectSelect = document.querySelector("#projectSelect")
    const projectOption = document.createElement("option")
    projectOption.textContent = projectName
    projectSelect.append(projectOption)
}

export {displayProject, displayExistingProjects, fillProjectSelect, createAllTasks, addOneProjectOption, projectList, Project}