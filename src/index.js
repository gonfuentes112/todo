import "./style.css";
import { userProjects } from "./userProjects";

function controller(){
    function openProject(event) {
        const target = event.target;
        if (target.classList.contains('project-card')) {
            const projectId = target.dataset.projectId;
            renderCurrentProject(projectId);
        }

    }

    const projectContainer = document.getElementById('project-container');
    projectContainer.addEventListener('click', (event) => openProject(event));

    //#regionCreateNewProject
    function createNewProject(name) {
        const newProject = projects.addProject(name);
        const newDiv = document.createElement('button');
        newDiv.classList.add('project-card');
        newDiv.dataset.projectId = newProject.id;
        newDiv.innerText = newProject.name;
        projectContainer.appendChild(newDiv);
    }

    const newProjectButton = document.getElementById('new-project-button');
    newProjectButton.addEventListener('click', () => {
        const newFormDialog = document.getElementById('new-project-dialog');
        newFormDialog.showModal();
    });

    const submitNewProjectButton = document.getElementById('submit-new-project');
    submitNewProjectButton.addEventListener('click', (event) => {
                        event.preventDefault();
                        const newProjectInput = document.getElementById('new-project-name-field');
                        if (!newProjectInput.value) {
                            return;
                        }

                        const newName = newProjectInput.value;
                        newProjectInput.value = '';
                        createNewProject(newName);
                        const newFormDialog = document.getElementById('new-project-dialog');
                        newFormDialog.close();
    });
    const closeNewProjectButton = document.getElementById('close-new-project-dialog');
    closeNewProjectButton.addEventListener('click', (event) => {
                        event.preventDefault();
                        const newFormDialog = document.getElementById('new-project-dialog');
                        newFormDialog.close();
    });
//#endregionCreateNewProject

    //#regionProjectButtons
    function editProjectName(projectId, newName) {
        const project = projects.getProjectById(Number(projectId));
        project.name = newName;
        renderCurrentProject(projectId);
        const projectCard = projectContainer.querySelector(`[data-project-id="${projectId}"]`);
        projectCard.innerText = newName;
    }

    const submitRenameProjectButton = document.getElementById('submit-rename-project');
    submitRenameProjectButton.addEventListener('click', (event) => {
        event.preventDefault();
        const renameProjectInput = document.getElementById('rename-project-name-field');
        if (!renameProjectInput.value) {
            return;
        }
        const newName = renameProjectInput.value;
        renameProjectInput.value = '';
        editProjectName(submitRenameProjectButton.dataset.projectId, newName);

        const renameProjectDialog = document.getElementById('rename-project-dialog');
        renameProjectDialog.close();
    });

    const closeRenameProjectButton = document.getElementById('close-rename-project-dialog');
    closeRenameProjectButton.addEventListener('click', (event) => {
        event.preventDefault();

        const renameProjectDialog = document.getElementById('rename-project-dialog');
        renameProjectDialog.close();
    });

    function deleteProject(projectId) {
        projects.deleteProject(Number(projectId));
        const currentProjectContainer = document.getElementById('current-project');
        currentProjectContainer.innerHTML = '';
        const projectCard = projectContainer.querySelector(`[data-project-id="${projectId}"]`);
        projectCard.remove();

        const newTodoButtonContainer = document.getElementById('new-todo-button-container');
        newTodoButtonContainer.innerHTML = '';
    }

    const submitDeleteProjectButton = document.getElementById('submit-delete-project');
    submitDeleteProjectButton.addEventListener('click', (event) => {
        event.preventDefault();
        deleteProject(submitDeleteProjectButton.dataset.projectId);

        const deleteProjectDialog = document.getElementById('delete-project-dialog');
        deleteProjectDialog.close();
    });

    const closeDeleteButton = document.getElementById('close-delete-project-dialog');
    closeDeleteButton.addEventListener('click', (event) => {
        event.preventDefault();

        const deleteProjectDialog = document.getElementById('delete-project-dialog');
        deleteProjectDialog.close();
    });

    //#endregionProjectButtons

    //#regionNewTodo
    const submitNewTodoButton = document.getElementById('submit-new-todo');
    submitNewTodoButton.addEventListener('click', (event) => {

        const newTodoTitle = document.getElementById('new-todo-title-field').value;
        if (!newTodoTitle) {
            return;
        }
        event.preventDefault();
        const newTodoDescription = document.getElementById('new-todo-description-field').value;
        const newTodoDate = "Due date: " + document.getElementById('new-todo-date-field').value;
        const newTodoPriority = document.getElementById('new-todo-priority').value;
        const newTodoDone = document.getElementById('new-todo-done').checked;

        const projectId = event.target.dataset.projectId;
        const project = projects.getProjectById(Number(projectId));
        const newTodo = project.addNewTodo(newTodoTitle, newTodoDescription, newTodoDate, newTodoPriority, newTodoDone);
        
        createNewTodo(projectId, newTodo);

        const newTodoDialog = document.getElementById('new-todo-dialog');
        newTodoDialog.close();
    });

    const closeNewTodoButton = document.getElementById('close-new-todo-dialog');
    closeNewTodoButton.addEventListener('click', (event) => {
            event.preventDefault();

            const newTodoDialog = document.getElementById('new-todo-dialog');
            newTodoDialog.close();
    });

    //#endregionNewTodo

    //#regionEditTodoTitle
    const submitEditTodoTitleButton = document.getElementById('submit-title-edit');
    submitEditTodoTitleButton.addEventListener('click', (event) => {

        const newTodoTitle = document.getElementById('edit-todo-title-field').value;
        if (!newTodoTitle) {
            return;
        }
        event.preventDefault();

        const projectId = event.target.dataset.projectId;
        const project = projects.getProjectById(Number(projectId));
        const todoId = event.target.dataset.todoId;
        const todo = project.getTodoObject(Number(todoId));
        todo.title = newTodoTitle;

        const card = document.querySelector(`.todo-card[data-project-id="${projectId}"].todo-card[data-todo-id="${todoId}"]`);
        const cardTitle = card.querySelector('.todo-card-title span');
        cardTitle.innerText = newTodoTitle;

        const editDialog = document.getElementById('edit-todo-title-dialog');
        editDialog.close();
    });

    const closeEditTodoTitleButton = document.getElementById('close-title-edit-dialog');
    closeEditTodoTitleButton.addEventListener('click', (event) => {
            event.preventDefault();
            const editDialog = document.getElementById('edit-todo-title-dialog');
            editDialog.close();
    });

    //#endregionEditTodoTitle

    //#regionEditTodoDate
    const submitEditTodoDateButton = document.getElementById('submit-date-edit');
    submitEditTodoDateButton.addEventListener('click', (event) => {

        const newTodoDate = document.getElementById('edit-todo-date-field').value;
        if (!newTodoDate) {
            return;
        }
        event.preventDefault();

        const projectId = event.target.dataset.projectId;
        const project = projects.getProjectById(Number(projectId));
        const todoId = event.target.dataset.todoId;
        const todo = project.getTodoObject(Number(todoId));
        todo.date = newTodoDate;

        const card = document.querySelector(`.todo-card[data-project-id="${projectId}"].todo-card[data-todo-id="${todoId}"]`);
        const cardDate = card.querySelector('.todo-card-date span');
        cardDate.innerText = `Due date: ${newTodoDate}`;

        const editDialog = document.getElementById('edit-todo-date-dialog');
        editDialog.close();
    });

    const closeEditTodoDateButton = document.getElementById('close-date-edit-dialog');
    closeEditTodoDateButton.addEventListener('click', (event) => {
            event.preventDefault();
            const editDialog = document.getElementById('edit-todo-date-dialog');
            editDialog.close();
    });

    //#endregionEditTodoDate

    //#regionEditTodoDesc
    const submitEditTodoDescButton = document.getElementById('submit-desc-edit');
    submitEditTodoDescButton.addEventListener('click', (event) => {

        const newTodoDesc = document.getElementById('edit-todo-description-field').value;
        if (!newTodoDesc) {
            return;
        }
        event.preventDefault();

        const projectId = event.target.dataset.projectId;
        const project = projects.getProjectById(Number(projectId));
        const todoId = event.target.dataset.todoId;
        const todo = project.getTodoObject(Number(todoId));
        todo.description = newTodoDesc;

        const card = document.querySelector(`.todo-card[data-project-id="${projectId}"].todo-card[data-todo-id="${todoId}"]`);
        const cardDesc = card.querySelector('.todo-card-description span');
        cardDesc.innerText = newTodoDesc;

        const editDialog = document.getElementById('edit-todo-desc-dialog');
        editDialog.close();
    });

    const closeEditTodoDescButton = document.getElementById('close-desc-edit-dialog');
    closeEditTodoDescButton.addEventListener('click', (event) => {
            event.preventDefault();
            const editDialog = document.getElementById('edit-todo-desc-dialog');
            editDialog.close();
    });
    //#endregionEditTodoDesc

    const projects = userProjects();

    //#regionRenderCurrentProject
    function newTodoHandler(event) {
        const projectId = event.target.dataset.projectId;
        submitNewTodoButton.dataset.projectId = projectId;

        const newTodoDialog = document.getElementById('new-todo-dialog');
        newTodoDialog.showModal();
    }

    function renderCurrentProject(projectId) {
        const currentProjectContainer = document.getElementById('current-project');
        currentProjectContainer.innerHTML = '';
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

            const renameProjectDialog = document.getElementById('rename-project-dialog');
            renameProjectDialog.showModal();

        })

        const deleteProjectButton = document.createElement('button');
        deleteProjectButton.innerText = 'Delete';
        deleteProjectButton.dataset.projectId = projectId;
        deleteProjectButton.classList.add('delete-project-button')

        deleteProjectButton.addEventListener('click', (event) => {
            submitDeleteProjectButton.dataset.projectId = projectId;

            const deleteProjectDialog = document.getElementById('delete-project-dialog');
            deleteProjectDialog.showModal();
        })


        const currentProjectButtons = document.createElement('div');
        currentProjectButtons.classList.add('current-project-buttons')
        currentProjectButtons.appendChild(editProjectButton);
        currentProjectButtons.appendChild(deleteProjectButton);

        currentProjectContainer.appendChild(projectName);
        currentProjectContainer.append(currentProjectButtons);

        const newTodoButton = document.createElement('button');
        newTodoButton.classList.add('new-todo-button');
        newTodoButton.innerText = '+';
        newTodoButton.dataset.projectId = projectId;
        newTodoButton.addEventListener('click', (event) => {newTodoHandler(event)});

        const newTodoButtonContainer = document.getElementById('new-todo-button-container');
        newTodoButtonContainer.innerHTML = '';
        newTodoButtonContainer.appendChild(newTodoButton);

        const projectTodos = document.getElementById('project-todos');
        projectTodos.innerHTML = '';
        project.todosList.forEach((todo) => {
            if (todo) {
                createNewTodo(projectId, todo);
            }

        })

    }

    //#endregionRenderCurrentProject

    function openTitleEdit(card) {
        const submitButton = document.getElementById('submit-title-edit');
        submitButton.dataset.projectId = card.dataset.projectId;
        submitButton.dataset.todoId = card.dataset.todoId;
        const editDialog = document.getElementById('edit-todo-title-dialog');
        editDialog.showModal();
    }

    function openDateEdit(card) {
        const submitButton = document.getElementById('submit-date-edit');
        submitButton.dataset.projectId = card.dataset.projectId;
        submitButton.dataset.todoId = card.dataset.todoId;
        const editDialog = document.getElementById('edit-todo-date-dialog');
        editDialog.showModal();        
    }

    function openDescEdit(card) {
        const submitButton = document.getElementById('submit-desc-edit');
        submitButton.dataset.projectId = card.dataset.projectId;
        submitButton.dataset.todoId = card.dataset.todoId;
        const editDialog = document.getElementById('edit-todo-desc-dialog');
        editDialog.showModal();        
    }

    function createNewTodo(projectId, todo) {
        const todoCard = document.createElement('div');
        todoCard.classList.add('todo-card');
        todoCard.dataset.projectId = projectId;
        todoCard.dataset.todoId = todo.id;

        const todoCardTitle = document.createElement('div');
        todoCardTitle.classList.add('todo-card-title');
        const titleSpan = document.createElement('span');
        titleSpan.innerText = todo.title;
        todoCardTitle.appendChild(titleSpan);

        const editTitleButton = document.createElement('button');
        editTitleButton.innerText = "🖉";
        editTitleButton.addEventListener('click', (event) => {
            openTitleEdit(todoCard);
        })
        todoCardTitle.appendChild(editTitleButton);

        const todoCardDate = document.createElement('div');
        todoCardDate.classList.add('todo-card-date');
        const dateSpan = document.createElement('span');
        dateSpan.innerText = todo.dueDate;
        todoCardDate.appendChild(dateSpan);

        const editDateButton = document.createElement('button');
        editDateButton.innerText = "🖉";
        editDateButton.addEventListener('click', (event) => {
            openDateEdit(todoCard);
        })
        todoCardDate.appendChild(editDateButton);

        const todoButtonContainer = document.createElement('div');
        todoButtonContainer.classList.add('todo-button-container');

        const expandButton = document.createElement('button');
        expandButton.classList.add('expand-button');
        expandButton.innerText = 'V';
        expandButton.addEventListener('click', (event) => {
            const parentNode = event.target.parentElement.parentElement;
            parentNode.classList.toggle('contract');
            if (parentNode.classList.contains('contract')) {
                expandButton.innerText = 'V';
            } else {
                expandButton.innerText = 'Ʌ';
            }
        });
        todoCard.classList.toggle('contract');

        const deleteTodoButton = document.createElement('button');
        deleteTodoButton.classList.add('delete-todo-button');
        deleteTodoButton.innerText = 'X';
        deleteTodoButton.addEventListener('click', (event) => {
            const card = event.target.parentElement.parentElement;
            const projectId = card.dataset.projectId;
            const todoId = card.dataset.todoId;
            const project = projects.getProjectById(Number(projectId));
            project.deleteTodo(Number(todoId));
            card.remove();
        });

        const labelDoneCheckbox = document.createElement('label');
        labelDoneCheckbox.setAttribute('for', `${todo.id}-done-checkbox`);
        labelDoneCheckbox.innerText = "Done?";

        const doneCheckbox = document.createElement('input');
        doneCheckbox.setAttribute('type', 'checkbox');
        doneCheckbox.id = `${todo.id}-done-checkbox`;
        if (todo.done) {
            doneCheckbox.checked = true;
        }
        doneCheckbox.addEventListener('change', (event) => {
            const card = event.target.parentElement.parentElement.parentElement;
            card.classList.toggle('done');
        })

        const doneContainer = document.createElement('div');
        doneContainer.classList.add('done-container');
        doneContainer.appendChild(labelDoneCheckbox);
        doneContainer.appendChild(doneCheckbox);

        todoButtonContainer.appendChild(expandButton);
        todoButtonContainer.appendChild(deleteTodoButton);
        todoButtonContainer.appendChild(doneContainer);



        const todoCardExpandedInfo = document.createElement('div');
        todoCardExpandedInfo.classList.add('todo-card-expanded-info');
        

        const todoCardDescription= document.createElement('div');
        todoCardDescription.classList.add('todo-card-description');
        const descSpan = document.createElement('span');
        descSpan.innerText = todo.description;
        todoCardDescription.appendChild(descSpan);

        const editDescButton = document.createElement('button');
        editDescButton.innerText = "🖉";
        editDescButton.addEventListener('click', (event) => {
            openDescEdit(todoCard);
        })
        todoCardDescription.appendChild(editDescButton);


        const label = document.createElement("label");
        label.setAttribute("for", "todo-priority");
        label.textContent = "Priority:";

        const select = document.createElement("select");
        select.setAttribute("id", `${projectId}-${todo.id}-todo-priority`);
        select.setAttribute("name", "todo-priority");

        const optionHigh = document.createElement("option");
        optionHigh.setAttribute("value", "high");
        optionHigh.textContent = "High";

        const optionMedium = document.createElement("option");
        optionMedium.setAttribute("value", "medium");
        optionMedium.textContent = "Medium";

        const optionLow = document.createElement("option");
        optionLow.setAttribute("value", "low");
        optionLow.textContent = "Low";

        select.appendChild(optionHigh);
        select.appendChild(optionMedium);
        select.appendChild(optionLow);

        select.addEventListener('change', (event) => {
            const newPrio = event.target.value;
            const card = event.target.parentElement.parentElement.parentElement;
            const projectId = card.dataset.projectId;
            const todoId = card.dataset.todoId;
            const currentProject = projects.getProjectById(Number(projectId));
            const currentTodo = currentProject.getTodoObject(Number(todoId));
            currentTodo.priority = newPrio;
            card.dataset.priority = newPrio;
        }); 

        const priorityContainer = document.createElement('div');
        priorityContainer.classList.add('priority-container');
        priorityContainer.appendChild(label);
        priorityContainer.appendChild(select);

        if (todo.priority === 'medium') {
            optionMedium.setAttribute("selected", "selected");
            todoCard.dataset.priority="medium";
        }
        if (todo.priority === 'high') {
            optionHigh.setAttribute("selected", "selected");
            todoCard.dataset.priority="high";
        }
        if (todo.priority === 'low') {
            optionLow.setAttribute("selected", "selected");
            todoCard.dataset.priority="low";
        }
        todoCardExpandedInfo.appendChild(todoCardDescription);
        todoCardExpandedInfo.appendChild(priorityContainer);

        todoCard.appendChild(todoCardTitle);
        todoCard.appendChild(todoCardDate);
        todoCard.appendChild(todoButtonContainer);
        todoCard.appendChild(todoCardExpandedInfo);

        if (doneCheckbox.checked) {
            todoCard.classList.add('done');
        }

        const projectTodos = document.getElementById('project-todos');
        projectTodos.appendChild(todoCard);


    }









    createNewProject('Default');



}

controller();