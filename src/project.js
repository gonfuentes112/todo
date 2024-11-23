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
        this.todosList.push(todo);
    }

    getTodoObject(targetId){
        return this.todosList.find((todo) => todo && todo.id === targetId); 
    }
}