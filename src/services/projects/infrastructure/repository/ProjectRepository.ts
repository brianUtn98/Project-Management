import Repository from "../../../../utils/infrastructure/Repository";
import Project from "../../domain/Project";

class ProjectRepository extends Repository{
    constructor(){
        super(Project);
    }
}

export default new ProjectRepository()