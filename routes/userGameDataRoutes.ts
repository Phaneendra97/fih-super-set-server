import { Router } from 'express';
import { getUserGameDataByGameName, postUserGameDataByGameName } from '../controllers/userGameDataController';

const userGameDataRoutes = Router();

userGameDataRoutes.get('/api/get-user-game-data/:game_name', getUserGameDataByGameName);
userGameDataRoutes.post('/api/set-user-game-data/:game_name', postUserGameDataByGameName);

export default userGameDataRoutes;
