import "./../node_modules/modern-normalize/modern-normalize.css"
import "./style.css"
import {addProject, clickNewProject, exitNewProject, displayExistingProjects, fillProjectSelect, assignCurrentProject, displayCurrentProject} from "./projects.js"
import {newTask, removeNoTasksBox} from "./tasks.js"

addProject()
clickNewProject()
exitNewProject()
displayExistingProjects()
fillProjectSelect()
newTask()
assignCurrentProject()
displayCurrentProject() 
