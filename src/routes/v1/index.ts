import config from '../../config/config';
import express from 'express';
import usersRoute from './user.route';

const router = express.Router();

const defaultRoutes = [{ path: '/users', route: usersRoute }];

const devRoutes = [];

defaultRoutes.forEach((route) => router.use(route.path, route.route));

/* istanbul ignore next */
if (config.env === 'development') {
  devRoutes.forEach((route: any) => {
    router.use(route.path, route.route);
  });
}

export default router;
