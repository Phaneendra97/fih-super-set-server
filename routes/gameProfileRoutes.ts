import express from 'express';
import { getGameProfileByName, getAllGameProfiles } from '../controllers/gameProfileController';

const router = express.Router();

// Route to fetch a specific game profile by game_name
router.get('/api/game', getGameProfileByName);

// Route to fetch all game profiles
router.get('/api/all-game-profiles', getAllGameProfiles);

export default router;
