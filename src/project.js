import { Todo } from "./todo";

class Project {
    constructor(name, nextTodoId = 0, todosList=[]){
        let nextTodoId = nextTodoId;
        this.name = name;
        this.todosList = todosList;
    }

    AddNewTodo(title, description, dueDate, priority, done){
        const newTodo = new Todo(nextTodoId, title, description, dueDate, priority, done)
        nextTodoId++;
        this.todosList.push(newTodo);
    }

    getTodoObject(){

    }
}