import "./style.css";
import { userProjects } from "./userProjects";

function controller(){
    const projectContainer = document.getElementById('project-container');
    const newProjectButton = document.getElementById('new-project-button');
    newProjectButton.addEventListener('click', createNewProjectHandler);

    const projects = userProjects();


    function createNewProject(name) {
        const newProject = projects.addProject(name);
        const newDiv = document.createElement('div');
        newDiv.classList.add('project-card');
        newDiv.innerText = newProject.name;
        projectContainer.appendChild(newDiv);
    }

    function createNewProjectHandler() {
        createNewProject('Defaultaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa');
    }
    createNewProject('Default');



}

controller();