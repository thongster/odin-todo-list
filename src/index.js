import "./../node_modules/modern-normalize/modern-normalize.css"
import "./style.css"
import {displayExistingProjects, fillProjectSelect, createAllTasks} from "./projects.js"
import {newTask, removeNoTasksBox} from "./tasks.js"
import {assignCurrentProject, displayCurrentProject} from "./projectlabel.js"
import {addProject, clickNewProject, exitNewProject} from "./newProjectModal.js"

addProject()
clickNewProject()
exitNewProject()
createAllTasks()
displayExistingProjects()
fillProjectSelect()
newTask()
assignCurrentProject()
displayCurrentProject() 
