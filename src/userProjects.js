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

    function deleteProject(projectId) {
        const targetIndex = projects.findIndex((project) => project && project.id === projectId);
        if (targetIndex !== -1) {
            projects[targetIndex] = null;
        }
    }

    return {getProjects,
            getProjectById,
            addProject,
            deleteProject,
    };
}

export {userProjects}