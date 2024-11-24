import "./style.css";
import { userProjects } from "./userProjects";

function controller(){
    const projectContainer = document.getElementById('project-container');
    const newProjectButton = document.getElementById('new-project-button');
    const newFormDialog = document.getElementById('new-project-dialog');
    const submitNewProjectButton = document.getElementById('submit-new-project');
    const closeNewProjectButton = document.getElementById('close-new-project-dialog');
    
    const currentProject = document.getElementById('current-project');
    const projectTodos = document.getElementById('project-todos')
    const renameProjectDialog = document.getElementById('rename-project-dialog');
    const renameProjectInput = document.getElementById('rename-project-name-field');
    const submitRenameProjectButton = document.getElementById('submit-rename-project');
    const closeRenameProjectButton = document.getElementById('close-rename-project-dialog');
    const deleteProjectDialog = document.getElementById('delete-project-dialog');
    const submitDeleteProjectButton = document.getElementById('submit-delete-project');
    const closeDeleteButton = document.getElementById('close-delete-project-dialog');
    const newTodoButtonContainer = document.getElementById('new-todo-button-container');
    const newTodoDialog = document.getElementById('new-todo-dialog');
    const submitNewTodoButton = document.getElementById('submit-new-todo');
    const closeNewTodoButton = document.getElementById('close-new-todo-dialog');

    newProjectButton.addEventListener('click', newProjectButtonHandler);
    submitNewProjectButton.addEventListener('click', (event) => {
                        event.preventDefault();
                        const newProjectInput = document.getElementById('new-project-name-field');
                        if (!newProjectInput.value) {
                            return;
                        }

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
        event.preventDefault();
        if (!renameProjectInput.value) {
            return;
        }
        const newName = renameProjectInput.value;
        renameProjectInput.value = '';
        editProjectName(submitRenameProjectButton.dataset.projectId, newName);
        renameProjectDialog.close();
});

    closeRenameProjectButton.addEventListener('click', (event) => {
        event.preventDefault();
        renameProjectDialog.close();
});

    function deleteProject(projectId) {
        projects.deleteProject(Number(projectId));
        currentProject.innerHTML = '';
        const projectCard = projectContainer.querySelector(`[data-project-id="${projectId}"]`);
        projectCard.remove();
        newTodoButtonContainer.innerHTML = '';
    }

    submitDeleteProjectButton.addEventListener('click', (event) => {
        event.preventDefault();
        deleteProject(submitDeleteProjectButton.dataset.projectId);
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
        const projectCard = projectContainer.querySelector(`[data-project-id="${projectId}"]`);
        projectCard.innerText = newName;
    }

    submitNewTodoButton.addEventListener('click', (event) => {
        event.preventDefault();
        const newTodoTitle = document.getElementById('new-todo-title-field').value;
        if (!newTodoTitle) {
            return;
        }
        const newTodoDescription = document.getElementById('new-todo-description-field').value;
        const newTodoDate = document.getElementById('new-todo-date-field').value;
        const newTodoPriority = document.getElementById('new-todo-priority').value;
        const newTodoDone = document.getElementById('new-todo-done').checked;

        const projectId = event.target.dataset.projectId;
        const project = projects.getProjectById(Number(projectId));
        project.addNewTodo(newTodoTitle, newTodoDescription, newTodoDate, newTodoPriority, newTodoDone);

 
        // const newName = newProjectInput.value;
        // newProjectInput.value = '';
        // createNewProject(newName);
        newTodoDialog.close();
    });

    closeNewTodoButton.addEventListener('click', (event) => {
            event.preventDefault();
            newTodoDialog.close();
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
        editProjectButton.dataset.projectId = projectId;
        editProjectButton.classList.add('edit-project-button');

        editProjectButton.addEventListener('click', (event) => {
            submitRenameProjectButton.dataset.projectId = projectId;
            renameProjectDialog.showModal();

        })

        const deleteProjectButton = document.createElement('button');
        deleteProjectButton.innerText = 'Delete';
        deleteProjectButton.dataset.projectId = projectId;
        deleteProjectButton.classList.add('delete-project-button')

        deleteProjectButton.addEventListener('click', (event) => {
            submitDeleteProjectButton.dataset.projectId = projectId;
            deleteProjectDialog.showModal();
        })


        const currentProjectButtons = document.createElement('div');
        currentProjectButtons.classList.add('current-project-buttons')
        currentProjectButtons.appendChild(editProjectButton);
        currentProjectButtons.appendChild(deleteProjectButton);
        currentProject.appendChild(projectName);
        currentProject.append(currentProjectButtons);

        const newTodoButton = document.createElement('button');
        newTodoButton.classList.add('new-todo-button');
        newTodoButton.innerText = '+';
        newTodoButton.dataset.projectId = projectId;
        newTodoButton.addEventListener('click', (event) => {newTodoHandler(event)});
        newTodoButtonContainer.innerHTML = '';
        newTodoButtonContainer.appendChild(newTodoButton);

    }

    function openProject(event) {
        const target = event.target;
        if (target.classList.contains('project-card')) {
            const projectId = target.dataset.projectId;
            renderCurrentProject(projectId);
        }

    }

    projectContainer.addEventListener('click', (event) => openProject(event));


    function createNewProject(name) {
        const newProject = projects.addProject(name);
        const newDiv = document.createElement('button');
        newDiv.classList.add('project-card');
        newDiv.dataset.projectId = newProject.id;
        newDiv.innerText = newProject.name;
        projectContainer.appendChild(newDiv);
    }

    function newProjectButtonHandler() {
        newFormDialog.showModal();
    }

    function newTodoHandler(event) {
        const projectId = event.target.dataset.projectId;
        submitNewTodoButton.dataset.projectId = projectId;
        newTodoDialog.showModal();
    }

    createNewProject('Default');



}

controller();