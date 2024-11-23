import { Todo } from "./todo";

class Project {
    constructor(name, nextTodoId = 0, todosList=[]){
        let nextTodoId = nextTodoId;
        this.name = name;
        this.todosList = todosList;
    }

    addNewTodo(title, description, dueDate, priority, done){
        const newTodo = new Todo(nextTodoId, title, description, dueDate, priority, done)
        nextTodoId++;
        this.todosList.push(newTodo);
    }

    addExistingTodo(todo){
        const newTodo = new Todo(todo.id, todo.title, todo.description, todo.dueDate, tood.priority, todo.done);
        this.todosList.push(newTodo);
    }

    getTodoObject(targetId){
        return this.todosList.find((todo) => todo && todo.id === targetId); 
    }

    deleteTodo(targetId){
        const targetIndex = this.todosList.findIndex((todo) => todo && todo.id === targetId);
        if (targetIndex !== -1) {
            this.todosList[targetIndex] = null;
        }

    }


}