import "./../node_modules/modern-normalize/modern-normalize.css"
import "./style.css"
import {addProject, clickNewProject, exitNewProject, displayExistingProjects, fillProjectSelect, createAllTasks} from "./projects.js"
import {newTask, removeNoTasksBox} from "./tasks.js"
import {assignCurrentProject, displayCurrentProject} from "./projectlabel.js"

addProject()
clickNewProject()
exitNewProject()
displayExistingProjects()
fillProjectSelect()
newTask()
assignCurrentProject()
displayCurrentProject() 
createAllTasks()