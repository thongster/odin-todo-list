import {projectList, Project} from "./projects.js"
import {displayCurrentProjectLabel, assignCurrentProject} from "./projectlabel.js"
import {activeTasksControl} from "./activeTaskDisplay.js"
import {showModal, showEditTaskModal} from "./modal.js"


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
            displayCurrentProjectLabel(currentProjectName)
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
                currentProject.completedTasks.splice(currentProject.completedTasks.findIndex(value => value === completedMatch), 1)   
                localStorage.setItem("projectList", JSON.stringify(projectList))  
            } else if (completedMatch === undefined) {
                currentProject.activeTasks.splice(currentProject.activeTasks.findIndex(value => value === activeMatch), 1)    
                localStorage.setItem("projectList", JSON.stringify(projectList)) 
            }

            // before it recalculates, it needs to clear the dom
            activeTasksControl().hideDisplayNewTask()
            addToAllTasks() // recalculate tasks for All Tasks
            activeTasksControl(currentProject).displayNewTask()
            displayCurrentProjectLabel(currentProject.name)
            
            localStorage.setItem("projectList", JSON.stringify(projectList))
        }
    })
}

let currentTaskToEdit
let currentAncestor
let currentOriginalProject

function editTaskButton() {
    // set up event delegation to listen for button click
    document.addEventListener("click", (item) => {

        if (!item.target.matches(".editButton")) {return} 
        // show edit task modal
        showModal("on")
        showEditTaskModal("on")

        const ancestor = item.target.closest(".activeTaskItem, .completedTaskItem")
        // find current Task Title and Project Name
        const currentProjectName = ancestor.querySelector(".taskInfo > button:nth-of-type(2)").textContent
        const currentTaskTitle = ancestor.querySelector(".taskText > h3").textContent
        
        // find project object in projectList by matching names
        const currentProject = projectList.find((project) => {return project.name == currentProjectName})

        // search to see which list the task is in
        const activeMatch = currentProject.activeTasks.find((task) => {return task.title === currentTaskTitle})
        const completedMatch = currentProject.completedTasks.find((task) => {return task.title === currentTaskTitle})
        
        // define taskToEdit based on which doesn't return undefined
        let taskToEdit
        if (activeMatch === undefined) {
            taskToEdit = completedMatch
        } else if (completedMatch === undefined) {
            taskToEdit = activeMatch
        }

        currentTaskToEdit = taskToEdit;
        currentAncestor = ancestor;
        currentOriginalProject = currentProject;
    })
}

document.querySelector(".editTaskFormDOM").addEventListener("submit", (e) => {
    e.preventDefault()
    // change task info based on currentTaskToEdit
    currentTaskToEdit.title = e.target.title.value
    currentTaskToEdit.shortDesc = e.target.shortDesc.value
    currentTaskToEdit.priority = e.target.priority.value
    currentTaskToEdit.dueDate = e.target.dueDate.value

    // make the project the same (only in the task)
    currentTaskToEdit.project = e.target.projectSelect.value
    // loop through projectList, find 
    projectList.find((projectObject) => {
        if (projectObject.name === currentTaskToEdit.project) {
            // find closest ancestor and determine if activeTask or completedTask list
            if (currentAncestor.classList.contains("activeTaskItem")) {
                projectObject.activeTasks.splice(projectObject.activeTasks.length - 1, 0, currentTaskToEdit)
                currentOriginalProject.activeTasks.splice(currentOriginalProject.activeTasks.find(taskObject => taskObject === currentTaskToEdit), 1)
                localStorage.setItem("projectList", JSON.stringify(projectList))
            } else if (currentAncestor.classList.contains("completedTaskItem")) {
                projectObject.completedTasks.splice(projectObject.completedTasks.length - 1, 0, currentTaskToEdit)
                currentOriginalProject.completedTasks.splice(currentOriginalProject.completedTasks.find(taskObject => taskObject === currentTaskToEdit), 1)
                localStorage.setItem("projectList", JSON.stringify(projectList))
            }
        }
        activeTasksControl().hideDisplayNewTask()
        // addToAllTasks() // recalculate tasks for All Tasks
        activeTasksControl(currentTaskToEdit.project).displayNewTask()
        displayCurrentProjectLabel(currentTaskToEdit.project)
    })


    localStorage.setItem("projectList", JSON.stringify(projectList))
    document.querySelector(".editTaskFormDOM").reset() // clear form
    showModal("off") // exit modal form
    showEditTaskModal("off")
})

export {newTask, addToAllTasks, convertActiveToCompleteTask, deleteTask, editTaskButton}