import Repository from "../../../../utils/infrastructure/Repository";
import Task from "../../domain/Task";

class TaskRepository extends Repository{
    constructor(){
        super(Task);
    }
}

export default new TaskRepository()