import {projectList, Project} from "./projects.js"
import {displayCurrentProjectLabel, assignCurrentProject} from "./projectlabel.js"
import {activeTasksControl} from "./activeTaskDisplay.js"


class Task {
    constructor(title, shortDesc, project, priority, dueDate) {
        this.title = title
        this.shortDesc = shortDesc
        this.project = project
        this.priority = priority
        this.dueDate = dueDate
    }
}

// if task project category matches, add active task to that project
function addTaskToProject(newTask) {
    projectList.forEach((e) => {
        if (e.name === newTask.project) {
            e.activeTasks.push(newTask)
            localStorage.setItem("projectList", JSON.stringify(projectList))
        }
    })
}

// if task project category matches, add complete task to that project
function moveTasktoComplete(currentTask) {
    projectList.forEach((e) => {
        if (e.name === currentTask.project) {
            const taskToRemove = e.activeTasks.indexOf(newTask)
            e.activeTasks.splice(taskToRemove, 1)
            localStorage.setItem("projectList", JSON.stringify(projectList))
            e.completedTasks.push(currentTask)
            localStorage.setItem("projectList", JSON.stringify(projectList))
        }
    })
}

function convertActiveToCompleteTask() {
    // set up event delegation to listen for button click
    document.querySelector(".activeTaskBox").addEventListener("click", (e) => {
        if (e.target.matches(".buttonDiv > button")) {
            // find ancestor .activeTaskItem
            const ancestor = e.target.closest(".activeTaskItem")
            const currentProjectName = ancestor.querySelector(".taskInfo > button:nth-of-type(2)").textContent
            const currentTaskTitle = ancestor.querySelector(".taskText > h3").textContent
            // find project object in projectList by matching names
            const currentProject = projectList.find((project) => {return project.name == currentProjectName})
            const currentTask = currentProject.activeTasks.find((task) => {return task.title == currentTaskTitle})
            activeTasksControl().hideDisplayNewTask() // clears active and complete tasks dom
            moveTasktoComplete(currentTask) // deletes current task and moves to complete in memory
            addToAllTasks() // recalculate All Tasks in memory
            activeTasksControl(currentProject).displayNewTask()
            localStorage.setItem("projectList", JSON.stringify(projectList))
        }
    })
}

// add new task based on form data
function newTask() {
    const newTaskForm = document.querySelector(".newTaskFormDOM")
    newTaskForm.addEventListener("submit", (e) => {
        e.preventDefault()
        const newTask = new Task(
            e.target.title.value, e.target.shortDesc.value, 
            e.target.projectSelect.value, e.target.priority.value, 
            e.target.dueDate.value
        )
        addTaskToProject(newTask)
        displayCurrentProjectLabel(e.target.projectSelect.value)
        activeTasksControl().hideDisplayNewTask()
        activeTasksControl(e.target.projectSelect.value).displayNewTask()
        addToAllTasks()
    })
}

// sum up all tasks in all project to create the "All Tasks" project
function addToAllTasks() {
    projectList[0].activeTasks.length = 0
    projectList[0].completedTasks.length = 0
    // loop through all projects except "All Tasks" (index[0])
    projectList.slice(1).forEach((e) => {
        // for each active task, if not included already, add to All Tasks
        e.activeTasks.forEach((arr) => {
            let taskList = projectList[0].activeTasks
            if (!taskList.some(item => item.title === arr.title)) {
                projectList[0].activeTasks.push(arr)
                localStorage.setItem("projectList", JSON.stringify(projectList))
            }
        })
        // for each completed task, if not included already, add to All Tasks
        e.completedTasks.forEach((arr) => {
            let taskList = projectList[0].completedTasks
            if (!taskList.some(item => item.title === arr.title)) {
                projectList[0].completedTasks.push(arr)
                localStorage.setItem("projectList", JSON.stringify(projectList))
            } 
        })
    })
}

function deleteTask() {
    // set up event delegation to listen for button click
    document.addEventListener("click", (item) => {
        if (item.target.matches(".deleteButton")) {
            console.log("at least we are here")
            const ancestor = item.target.closest(".activeTaskItem, .completedTaskItem")
            // find current Task Title and Project Name
            const currentProjectName = ancestor.querySelector(".taskInfo > button:nth-of-type(2)").textContent
            const currentTaskTitle = ancestor.querySelector(".taskText > h3").textContent
            
            // find project object in projectList by matching names
            const currentProject = projectList.find((project) => {return project.name == currentProjectName})

            // search to see which list the task is in
            const activeMatch = currentProject.activeTasks.find((task) => {return task.title === currentTaskTitle});
            const completedMatch = currentProject.completedTasks.find((task) => {return task.title === currentTaskTitle});
            
            if (activeMatch === undefined) {
                currentProject.completedTasks.splice(completedMatch, 1)   
                localStorage.setItem("projectList", JSON.stringify(projectList))  
            } else if (completedMatch === undefined) {
                currentProject.activeTasks.splice(activeMatch, 1)    
                localStorage.setItem("projectList", JSON.stringify(projectList)) 
            }

            // write logic for if "All Tasks" is selected
            // find the corresponding project and delete it from there too
            

            // before it recalculates, it needs to clear the dom
            addToAllTasks() // recalculate tasks for All Tasks
            activeTasksControl(currentProject).displayNewTask()
            
            console.log(ancestor, currentProjectName, currentTaskTitle, currentProject)
            console.log(activeMatch, completedMatch)
            // localStorage.setItem("projectList", JSON.stringify(projectList))
        }
    })
}

export {newTask, addToAllTasks, convertActiveToCompleteTask, deleteTask}