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
    const renameProjectDialog = document.getElementById('rename-project-dialog');
    const renameProjectInput = document.getElementById('rename-project-name-field');
    const submitRenameProjectButton = document.getElementById('submit-rename-project');
    const closeRenameProjectButton = document.getElementById('close-rename-project-dialog');
    const deleteProjectDialog = document.getElementById('delete-project-dialog');
    const submitDeleteProjectButton = document.getElementById('submit-delete-project');
    const closeDeleteButton = document.getElementById('close-delete-project-dialog');

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

    submitRenameProjectButton.addEventListener('click', (event) => {
        if (!renameProjectInput.value) {
            return;
        }
        event.preventDefault();
        const newName = renameProjectInput.value;
        renameProjectInput.value = '';
        editProjectName(submitRenameProjectButton.dataset.id, newName);
        renameProjectDialog.close();
});

    closeRenameProjectButton.addEventListener('click', (event) => {
        event.preventDefault();
        renameProjectDialog.close();
});

    function deleteProject(projectId) {
        projects.deleteProject(Number(projectId));
        currentProject.innerHTML = '';
        const projectCard = projectContainer.querySelector(`[data-id="${projectId}"]`);
        projectCard.remove();
    }

    submitDeleteProjectButton.addEventListener('click', (event) => {
        event.preventDefault();
        const newName = renameProjectInput.value;
        renameProjectInput.value = '';
        deleteProject(submitDeleteProjectButton.dataset.id);
        deleteProjectDialog.close();
    });

    closeDeleteButton.addEventListener('click', (event) => {
        event.preventDefault();
        deleteProjectDialog.close();
    });

    function editProjectName(projectId, newName) {
        const project = projects.getProjectById(Number(projectId));
        project.name = newName;
        renderCurrentProject(projectId);
        const projectCard = projectContainer.querySelector(`[data-id="${projectId}"]`);
        projectCard.innerText = newName;
    }

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
        editProjectButton.classList.add('edit-project-button');

        editProjectButton.addEventListener('click', (event) => {
            submitRenameProjectButton.dataset.id = projectId;
            renameProjectDialog.showModal();

        })

        const deleteProjectButton = document.createElement('button');
        deleteProjectButton.innerText = 'Delete';
        deleteProjectButton.dataset.id = projectId;
        deleteProjectButton.classList.add('delete-project-button')

        deleteProjectButton.addEventListener('click', (event) => {
            submitDeleteProjectButton.dataset.id = projectId;
            deleteProjectDialog.showModal();
        })


        const currentProjectButtons = document.createElement('div');
        currentProjectButtons.classList.add('current-project-buttons')
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