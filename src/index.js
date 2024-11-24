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
    submitNewProjectButton.addEventListener('click', (event) => {
                        if (!newProjectInput.value) {
                            return;
                        }
                        event.preventDefault();
                        const newName = newProjectInput.value;
                        newProjectInput.value = '';
                        createNewProject(newName);
                        newFormDialog.close();
                        });

    closeNewProjectButton.addEventListener('click', (event) => {
                        event.preventDefault();
                        newFormDialog.close();
                        });

    const projects = userProjects();


    function createNewProject(name) {
        const newProject = projects.addProject(name);
        const newDiv = document.createElement('button');
        newDiv.classList.add('project-card');
        newDiv.dataset.id = newProject.id;
        newDiv.innerText = newProject.name;
        projectContainer.appendChild(newDiv);
    }

    function newProjectButtonHandler() {
        newFormDialog.showModal();
    }

    createNewProject('Default');



}

controller();