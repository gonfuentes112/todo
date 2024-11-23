import { Todo } from "./todo";
import { Project } from "./project";

function userProjects() {
    const projects =  [];
    let todoId = 0;

    //#regionProjects
    function addProject(projectName) {
        const target = projects.find((project) => project && project.name === projectName);
        if (target) {
            return false;
        }
        const project = typeof projectName === 'string' 
        ? Project(projectName)  // Create a new Project if a string is passed
        : projectName;          // Use the existing Project if an object is passed

        projects.push(project);
        return true;
    }

    function editProjectName(projectName, newName){
        const target = projects.find((project) => project && project.name === projectName);
        if (!target) {
            return false;
        }
        target.name = newName;
        return true;

    }

    function removeProject(projectName) {
        const targetIndex = projects.findIndex((project) => project && project.name === projectName);
        if (targetIndex === -1) {
            return;
        }
        projects[targetIndex] = null;

    }

    function getProjects(){
        return this.projects;
    }
    //#endregionProjects

    //#regionTodos
    function createTodo(title, description, dueDate, priority, done){
        const newTodo =  Todo(todoId, title, description, dueDate, priority, done);
        todoId++;
        return newTodo;
    }
    
    function addTodoToProject(projectName, todo) {
        const target = projects.find((project) => project && project.name === projectName);
        if (!target) {
            return false;
        }
        target.todoList.push(todo);
        return true;
    }

    function getTodoById(id) {
        
    }
    //#endregionTodos

    return {
        addProject,
        editProjectName,
        removeProject,
        getProjects,
        createTodo,
        addTodoToProject,
    }
}

export {userProjects};