import { Router } from 'express';
import { getAllProfiles } from '../controllers/userProfileController';

const userProfileRoutes = Router();

userProfileRoutes.get('/api/get-all-user-profiles', getAllProfiles);

export default userProfileRoutes;
