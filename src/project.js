import { Todo } from "./todo";

class Project {
    constructor(id, name, nextTodoId = 0, todosList=[]){
        this.id = id;
        this.nextTodoId = nextTodoId;
        this.name = name;
        this.todosList = [];

        if (todosList) {
            todosList.forEach((todo) => {
                this.addExistingTodo(todo);
            })
        }         
    }

//#regionGetterSetter
        get id() {
            return this._id;
        }

        set id(value) {
            this._id = value;
        }

        get name() {
            return this._name;
        }

        set name(value) {
            this._name = value;
        }
//#endregionGetterSetter

    addNewTodo(title, description, dueDate, priority, done){
        const newTodo = new Todo(this.nextTodoId, title, description, dueDate, priority, done);
        this.nextTodoId++;
        this.todosList.push(newTodo);
        return newTodo;
    }

    addExistingTodo(todo){
        const newTodo = new Todo(todo.id, todo.title, todo.description, todo.dueDate, tood.priority, todo.done);
        this.todosList.push(newTodo);
        this.nextTodoId = todo.id + 1;
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

    toJSON() {
        return {
            name: this.name,
            nextTodoId: this.nextTodoId,
            todosList: this.todosList.map((todo) => {todo.toJSON();})
        }
    }
}

export {Project};