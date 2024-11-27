import { Project } from "./project";

function userProjects() {
    const projects =  [];
    let nextProjectId = 0;

    function getProjects(){
        return projects;
    }

    function getProjectById(projectId) {
        const target = projects.find((project) => project && project.id === projectId);
        if (target) {
            return target;
        }
        return null;
    }

    function addProject(name) {
        const newProject = new Project(nextProjectId, name);
        projects.push(newProject);
        nextProjectId++;
        return newProject;
    }

    function addExistingProject(project) {
        const currentId = nextProjectId;
        const newProject = new Project(currentId, project.name, project.nextTodoId, project.todosList);
        projects.push(newProject);
        nextProjectId += 1;
        return currentId;
    }

    function deleteProject(projectId) {
        const targetIndex = projects.findIndex((project) => project && project.id === projectId);
        if (targetIndex !== -1) {
            projects[targetIndex] = null;
        }
    }

    return {getProjects,
            getProjectById,
            addProject,
            addExistingProject,
            deleteProject,
    };
}

export {userProjects}