import { Router } from 'express';
import { getUserProfile, setUserProfile } from '../controllers/userProfileController';

const userProfileRoutes = Router();

userProfileRoutes.get('/api/get-user-profile', getUserProfile);
userProfileRoutes.post('/api/set-user-profile', setUserProfile);


export default userProfileRoutes;
