import UseCase from "../../../utils/application/useCases/UseCase";
import jwt from "jsonwebtoken"

class VerifyTokenUseCase implements UseCase{
    execute(token: string){
        return true; // TODO: Implement
    }
}

export default new VerifyTokenUseCase()