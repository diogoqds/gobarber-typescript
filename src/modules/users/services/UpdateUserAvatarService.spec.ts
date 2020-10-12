import FakeStorageProvider from '@shared/container/providers/StorageProvider/fakes/FakeStorageProvider';
import AppError from '@shared/errors/AppError';
import FakeUserRepository from '../repositories/fakes/FakeUserRepository';
import UpdateUserAvatarService from './UpdateUserAvatarService';

describe('UpdateUserAvatar', () => {
  it('updates user avatar', async () => {
    const fakeUserRepository = new FakeUserRepository();
    const fakeStorageProvider = new FakeStorageProvider();
    const updateUserAvatar = new UpdateUserAvatarService(
      fakeUserRepository,
      fakeStorageProvider,
    );

    const user = await fakeUserRepository.create({
      email: 'xablau@email.com',
      name: 'Xablau',
      password: '123456',
    });

    await updateUserAvatar.execute({
      user_id: user.id,
      avatarFilename: 'xablau.png',
    });

    expect(user.avatar).toEqual('xablau.png');
  });

  it('raises an error when user does not exist', async () => {
    const fakeUserRepository = new FakeUserRepository();
    const fakeStorageProvider = new FakeStorageProvider();
    const updateUserAvatar = new UpdateUserAvatarService(
      fakeUserRepository,
      fakeStorageProvider,
    );

    expect(
      updateUserAvatar.execute({
        user_id: 'invalid id',
        avatarFilename: 'xablau.png',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('replaces the user old avatar', async () => {
    const fakeUserRepository = new FakeUserRepository();
    const fakeStorageProvider = new FakeStorageProvider();
    const updateUserAvatar = new UpdateUserAvatarService(
      fakeUserRepository,
      fakeStorageProvider,
    );

    const user = await fakeUserRepository.create({
      email: 'xablau@email.com',
      name: 'Xablau',
      password: '123456',
    });

    await updateUserAvatar.execute({
      user_id: user.id,
      avatarFilename: 'profile.png',
    });

    const deleteFile = jest.spyOn(fakeStorageProvider, 'deleteFile');
    await updateUserAvatar.execute({
      user_id: user.id,
      avatarFilename: 'new-profile.png',
    });

    expect(deleteFile).toHaveBeenCalledWith('profile.png');
    expect(user.avatar).toEqual('new-profile.png');
  });
});
