import "./../node_modules/modern-normalize/modern-normalize.css"
import "./style.css"
import {addProject, clickNewProject, exitNewProject, displayExistingProjects, fillProjectSelect} from "./projects.js"
import {newTask} from "./tasks.js"

addProject()
clickNewProject()
exitNewProject()
displayExistingProjects()
fillProjectSelect()
newTask()