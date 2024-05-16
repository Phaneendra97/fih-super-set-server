import { Router } from 'express';
import { getAllProfiles, setUserProfile } from '../controllers/userProfileController';

const userProfileRoutes = Router();

userProfileRoutes.get('/api/get-all-user-profiles', getAllProfiles);
userProfileRoutes.post('/api/set-user-profile', setUserProfile);


export default userProfileRoutes;
