import UseCase from '../../../utils/application/useCases/UseCase';
import bcryptjs from 'bcryptjs';

class IsCorrectPasswordUseCase implements UseCase {
  async execute(password: string, hash: string): Promise<boolean> {
    return await bcryptjs.compare(password, hash);
  }
}

export default new IsCorrectPasswordUseCase();
