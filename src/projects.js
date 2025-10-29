class Project {
    constructor(name) {
        this.name = name;
        this.activeTasks;
        this.completedTasks;
    }
}



function displayProject () {
    
}

function addProject() {
    const exampleProject = new Project("im in this bitch again")
    console.log(exampleProject.name)
    console.log(exampleProject.activeTasks)
    console.log(exampleProject.completedTasks)
}

export {addProject, displayProject}