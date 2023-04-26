import UseCase from '../../../utils/application/useCases/UseCase';
import bcryptjs from 'bcryptjs';

class HashPasswordUseCase implements UseCase {
  async execute(password: string): Promise<string> {
    return bcryptjs.hash(password, 10);
  }
}

export default new HashPasswordUseCase();
