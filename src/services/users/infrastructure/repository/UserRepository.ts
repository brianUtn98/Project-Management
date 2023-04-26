import Repository from "../../../../utils/infrastructure/Repository";
import User from "../../domain/User";

class UserRepository extends Repository{
    constructor(){
        super(User);
    }
}

export default new UserRepository()