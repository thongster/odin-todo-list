import "./../node_modules/modern-normalize/modern-normalize.css"
import "./style.css"
import {displayExistingProjects, fillProjectSelect, createAllTasks} from "./projects.js"
import {newTask, addToAllTasks, convertActiveToCompleteTask, deleteTask, editTask} from "./tasks.js"
import {assignCurrentProject, displayCurrentProjectLabel, defaultDisplayAllTasks} from "./projectlabel.js"
import {addProject, clickNewProject, exitModal} from "./modal.js"
import {activeTasksControl} from "./activeTaskDisplay.js"

addProject()
clickNewProject() // show modal on click new project
exitModal() // exit modals on click
createAllTasks()
displayExistingProjects()
fillProjectSelect()
newTask()
assignCurrentProject() 
displayCurrentProjectLabel() 
addToAllTasks() // initialize all tasks (sum all project tasks and add to All Task)

defaultDisplayAllTasks()
convertActiveToCompleteTask()
deleteTask() // enable delete button
editTask() // enable edit button
