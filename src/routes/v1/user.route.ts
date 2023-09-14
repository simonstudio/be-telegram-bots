import express from 'express';
// import { getUserFeed, getUserTweet } from '../../controllers/tweet.controller';
import * as UserController from '../../controllers/users.controller';
const usersRoute = express.Router();

// usersRoute.get('/feed', getUserFeed);

usersRoute.get('/', UserController.getUser);
usersRoute.put('/create', UserController.createUser);
usersRoute.put('/update', UserController.updateUser);

export default usersRoute;
