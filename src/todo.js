class Todo {
    constructor(id, title, description, dueDate, priority, done) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.done = done;
        }

        get id() {
            return this._id;
        }

        get title(){
            return this._title;
        }

        get description(){
            return this._description;
        }

        get dueDate(){
            return this._dueDate;
        }

        get priority(){
            return this._priority;
        }

        get done() {
            return this._done;
        }

        set title(newTitle){
            this._title = newTitle;
        }
        set description(newDescription){
            this._description = newDescription;
        }
        set dueDate(newDueDate){
            this._dueDate = newDueDate;
        }
        set priority(newPriority){
            this._priority = newPriority;
        }

        set done(newDone) {
            this._done = newDone;
        }
}

export {Todo};