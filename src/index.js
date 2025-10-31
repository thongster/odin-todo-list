import "./../node_modules/modern-normalize/modern-normalize.css"
import "./style.css"
import {displayExistingProjects, fillProjectSelect, createAllTasks} from "./projects.js"
import {newTask, addToAllTasks} from "./tasks.js"
import {assignCurrentProject, displayCurrentProject, defaultDisplayAllTasks} from "./projectlabel.js"
import {addProject, clickNewProject, exitNewProject} from "./newProjectModal.js"
import {activeTasksControl, removeNoTasksBox, showNoTasksBox} from "./activeTaskDisplay.js"

addProject()
clickNewProject()
exitNewProject()
createAllTasks()
displayExistingProjects()
fillProjectSelect()
newTask()
assignCurrentProject() 
displayCurrentProject() 
addToAllTasks() // initialize all tasks (sum all project tasks and add to All Task)

defaultDisplayAllTasks()

