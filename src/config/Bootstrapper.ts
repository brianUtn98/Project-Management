import HashPasswordUseCase from '../services/auth/application/HashPasswordUseCase';
import Role from '../services/users/domain/Role';
import User from '../services/users/domain/User';
import UserCredentials from '../services/users/domain/UserCredentials';
import UserStatus from '../services/users/domain/UserStatus';

class Bootstrapper {
  async init() {
    const adminRole = (
      await Role.findOrCreate({
        where: {
          name: 'Admin',
          description: 'Administrator',
        },
      })
    )[0];

    const projectOwnerRole = (
      await Role.findOrCreate({
        where: {
          name: 'Project Owner',
          description: 'Project Owner',
        },
      })
    )[0];

    const projectMemberRole = (
      await Role.findOrCreate({
        where: {
          name: 'Project Member',
          description: 'Project Member',
        },
      })
    )[0];

    const reviewerRole = (
      await Role.findOrCreate({
        where: {
          name: 'Reviewer',
          description: 'Reviewer',
        },
      })
    )[0];

    const testUser1 = (
      await User.findOrCreate({
        where: {
          firstName: 'Brian',
          lastName: 'Monroy',
          email: 'brian.gmonroy98@gmail.com',
          status: UserStatus.ACTIVE,
        },
      })
    )[0];

    await testUser1.$set('roles', [adminRole, reviewerRole]);

    const credentials1 = await UserCredentials.findAll({
      where: {
        email: 'brian.gmonroy98@gmail.com',
        userId: testUser1.id,
      },
    });

    if (!credentials1.length) {
      await UserCredentials.create({
        email: 'brian.gmonroy98@gmail.com',
        userId: testUser1.id,
        password: await HashPasswordUseCase.execute('admin1234'),
      });
    }

    const testUser2 = (
      await User.findOrCreate({
        where: {
          firstName: 'Juan',
          lastName: 'Perez',
          email: 'perezj@gmail.com',
          status: UserStatus.ACTIVE,
        },
      })
    )[0];

    await testUser2.$set('roles', [projectMemberRole]);

    const credentials2 = await UserCredentials.findAll({
      where: {
        email: 'perezj@gmail.com',
        userId: testUser2.id,
      },
    });

    if (!credentials2.length) {
      await UserCredentials.create({
        email: 'perezj@gmail.com',
        userId: testUser2.id,
        password: await HashPasswordUseCase.execute('user1234'),
      });
    }

    const testUser3 = (
      await User.findOrCreate({
        where: {
          firstName: 'Maria',
          lastName: 'Gonzalez',
          email: 'mgonzalez@gmail.com',
          status: UserStatus.ACTIVE,
        },
      })
    )[0];

    await testUser3.$set('roles', [projectMemberRole, reviewerRole]);

    const credentials3 = await UserCredentials.findAll({
      where: {
        email: 'mgonzalez@gmail.com',
        userId: testUser3.id,
      },
    });

    if (!credentials3.length) {
      await UserCredentials.create({
        email: 'mgonzalez@gmail.com',
        password: await HashPasswordUseCase.execute('holaMundo'),
        userId: testUser3.id,
      });
    }
  }
}

export default new Bootstrapper();
