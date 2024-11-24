import "./style.css";
import { userProjects } from "./userProjects";

function controller(){
    const projectContainer = document.getElementById('project-container');
    const newProjectButton = document.getElementById('new-project-button');
    const projectTodos = document.getElementById('project-todos');
    const newFormDialog = document.getElementById('new-project-dialog');
    const submitNewProjectButton = document.getElementById('submit-new-project');
    const closeNewProjectButton = document.getElementById('close-new-project-dialog');
    const newProjectInput = document.getElementById('new-project-name-field');

    newProjectButton.addEventListener('click', newProjectButtonHandler);
    submitNewProjectButton.addEventListener('click', addNewProject);
    closeNewProjectButton.addEventListener('click', (event) => {
                        event.preventDefault;
                        newFormDialog.close();
                        });

    const projects = userProjects();


    function createNewProject(name) {
        const newProject = projects.addProject(name);
        const newDiv = document.createElement('div');
        newDiv.classList.add('project-card');
        newDiv.dataset.id = newProject.id;
        newDiv.innerText = newProject.name;
        projectContainer.appendChild(newDiv);
    }

    function newProjectButtonHandler() {
        newFormDialog.showModal();
    }

    function addNewProject(){
        const newName = newProjectInput.value;
        createNewProject(newName);
        newFormDialog.close();    
    }

    createNewProject('Default');



}

controller();