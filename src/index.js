import "./../node_modules/modern-normalize/modern-normalize.css"
import "./style.css"
import {addProject, clickNewProject, exitNewProject, displayExistingProjects, fillProjectSelect} from "./projects.js"
import {addTask} from "./tasks.js"

addProject()
clickNewProject()
exitNewProject()
displayExistingProjects()
fillProjectSelect()
addTask()