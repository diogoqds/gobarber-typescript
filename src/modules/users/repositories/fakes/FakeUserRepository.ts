import { uuid } from 'uuidv4';
import User from '@modules/users/infra/typeorm/entities/User';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';

class UsersRepository implements IUsersRepository {
  private users: User[] = [];

  public async findById(id: string): Promise<User | undefined> {
    const selectedUser = this.users.find(user => user.id === id);
    return selectedUser;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const selectedUser = this.users.find(user => user.email === email);
    return selectedUser;
  }

  public async create({
    email,
    name,
    password,
  }: ICreateUserDTO): Promise<User> {
    const user = new User();
    Object.assign(user, {
      id: uuid(),
      email,
      name,
      password,
    });

    this.users.push(user);
    return user;
  }

  public async save(user: User): Promise<User> {
    const findIndex = this.users.findIndex(
      selectedUser => selectedUser.id === user.id,
    );

    if (findIndex >= 0) {
      this.users[findIndex] = user;
    } else {
      this.users.push(user);
    }
    return user;
  }
}

export default UsersRepository;
