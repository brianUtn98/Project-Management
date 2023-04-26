import UseCase from '../../../utils/application/useCases/UseCase';
import User from '../../users/domain/User';
import jwt from 'jsonwebtoken';

class GenerateTokenUseCase implements UseCase {
  execute(user: User) {
    console.log(user.toJSON());

    return jwt.sign({ user: user.toJSON() }, process.env.APP_SECRET!, {
      expiresIn: 60 * 24,
    });
  }
}

export default new GenerateTokenUseCase();
