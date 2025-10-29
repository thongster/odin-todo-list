const projectList = []

class Project {
    constructor(name) {
        this.name = name;
        this.activeTasks = 0;
        this.completedTasks = 0;
    }

    addToProjectList() {
        projectList.push(this);
    }
}

function displayProject(projectName) {
    const projectList = document.querySelector(".projectList")
    const projectButton = document.createElement("button")
    projectButton.classList.add("buttonOne", "projectButton")
    projectButton.textContent = projectName
    projectList.append(projectButton)
}

function addProject() {
    const exampleProject = new Project("project example 1")
    const exampleProject2 = new Project("project example 2")
    const exampleProject3 = new Project("project example 3")
    const exampleProject4 = new Project("project example 4")

    exampleProject.addToProjectList()
    exampleProject2.addToProjectList()
    exampleProject3.addToProjectList()
    exampleProject4.addToProjectList()
    console.log(projectList)

    projectList.forEach((e) => {
        displayProject(e.name)
    })
}

export {addProject, displayProject}