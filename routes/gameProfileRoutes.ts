import { Router } from 'express';
import { getGameProfileByName } from '../controllers/gameProfileController';

const gameProfileRoutes = Router();

gameProfileRoutes.get('/api/get-game-profile', getGameProfileByName);

export default gameProfileRoutes;
