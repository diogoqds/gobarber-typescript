import { Router } from 'express';
import CreateUserService from '../services/CreateUserService';

const usersRoute = Router();

usersRoute.post('/', async (request, response) => {
  try {
    const { name, email, password } = request.body;
    const createUser = new CreateUserService();

    const user = await createUser.execute({
      name,
      email,
      password,
    });

    const { id, created_at, updated_at } = user;
    return response.json({ id, name, email, created_at, updated_at });
  } catch (err) {
    return response.status(400).json({ message: err.message });
  }
});
export default usersRoute;
