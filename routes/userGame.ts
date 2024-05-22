import { Router } from 'express';
import { getAllUserGameData } from '../controllers/userGameDataController';

const userGameDataRoutes = Router();

userGameDataRoutes.get('/api/get-all-user-game-data', getAllUserGameData);

export default userGameDataRoutes;
