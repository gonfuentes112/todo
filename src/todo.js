class Todo {
    constructor(id, title, description, dueDate, priority, done) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.done = done;
        }
//#regionGetterSetter
        get id() {
            return this._id;
        }

        set id(id) {
            this._id = id;
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
//#endregionGetterSetter
    toJSON(){
        return {
            id:this.id, 
            title:this.id, 
            description:this.description, 
            dueDate:this.dueDate, 
            priority:this.priority,
            done:this.done
        };
    }
}

export {Todo};