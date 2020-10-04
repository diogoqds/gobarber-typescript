import { Router } from 'express';
import multer from 'multer';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import uploadConfig from '@config/upload';
import usersController from '@modules/users/infra/http/controllers/UsersController';
import userAvatarController from '@modules/users/infra/http/controllers/UserAvatarController';

const usersRoute = Router();
const upload = multer(uploadConfig);

usersRoute.post('/', usersController.create);

usersRoute.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  userAvatarController.update,
);
export default usersRoute;
