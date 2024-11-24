import "./style.css";
import { userProjects } from "./userProjects";

function controller(){
    const projectContainer = document.getElementById('project-container');
    const newProjectButton = document.getElementById('new-project-button');
    const newFormDialog = document.getElementById('new-project-dialog');
    const submitNewProjectButton = document.getElementById('submit-new-project');
    const closeNewProjectButton = document.getElementById('close-new-project-dialog');
    const newProjectInput = document.getElementById('new-project-name-field');
    const currentProject = document.getElementById('current-project');
    const projectTodos = document.getElementById('project-todos')

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

    function renderCurrentProject(projectId) {
        currentProject.innerHTML = '';
        const project = projects.getProjectById(Number(projectId));
        const projectName = document.createElement('div');
        projectName.innerText = project.name;
        projectName.classList.add('project-name')
        const editProjectButton = document.createElement('button');
        editProjectButton.innerText = 'Rename';
        editProjectButton.dataset.id = projectId;
        const deleteProjectButton = document.createElement('button');
        deleteProjectButton.innerText = 'Delete';
        deleteProjectButton.dataset.id = projectId;
        const currentProjectButtons = document.createElement('div');
        currentProjectButtons.appendChild(editProjectButton);
        currentProjectButtons.appendChild(deleteProjectButton);
        currentProject.appendChild(projectName);
        currentProject.append(currentProjectButtons);

    }

    function openProject(event) {
        const target = event.target;
        if (target.classList.contains('project-card')) {
            const projectId = target.dataset.id;
            renderCurrentProject(projectId);
        }

    }

    projectContainer.addEventListener('click', (event) => openProject(event));


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