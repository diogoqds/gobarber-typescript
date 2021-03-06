import AppError from '@shared/errors/AppError';
import FakeHashProvider from '@modules/users/providers/fakes/FakeHashProvider';
import FakeUserRepository from '../repositories/fakes/FakeUserRepository';
import CreateUserService from './CreateUserService';

describe('CreateUser', () => {
  it('should be able to create a new user', async () => {
    const fakeUserRepository = new FakeUserRepository();
    const fakeHashProvider = new FakeHashProvider();
    const createUser = new CreateUserService(
      fakeUserRepository,
      fakeHashProvider,
    );

    const user = await createUser.execute({
      email: 'diogo@email.com',
      name: 'Diogo',
      password: '123456',
    });

    expect(user).toHaveProperty('id');
  });

  it('should not be able to create a user with the same email', async () => {
    const fakeUserRepository = new FakeUserRepository();
    const fakeHashProvider = new FakeHashProvider();
    const createUser = new CreateUserService(
      fakeUserRepository,
      fakeHashProvider,
    );

    await createUser.execute({
      email: 'diogo@email.com',
      name: 'Diogo',
      password: '123456',
    });

    expect(
      createUser.execute({
        email: 'diogo@email.com',
        name: 'Diogo',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
