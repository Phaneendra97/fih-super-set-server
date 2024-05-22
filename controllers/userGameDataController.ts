import { Request, Response } from 'express';
import { db } from "./../firebaseAdmin";
import { DocumentSnapshot } from 'firebase-admin/firestore';

interface UserGameData {
    id: string;
    game_id: string;
    Levels: Level[];
    max_score: number;
    user_id: string;
    user_score: number;
}


interface Level {
    complete_status: boolean;
    level_name: string;
    level_number: number;
    max_level_score: number;
    user_level_score: number;
}

export const getAllUserGameData = async (req: Request, res: Response): Promise<void> => {
    try {
        const snapshot = await db.collection('user_game_data').get();
        const documents = snapshot.docs.map((doc: DocumentSnapshot) => {
            const docData = doc.data() as UserGameData;
            return { ...docData, id: doc.id }; // Move id to the end to ensure it does not get overwritten
        });
        res.json(documents);
    } catch (err) {
        console.error('Error fetching user game data:', err);
        res.status(500).send('Failed to retrieve user game data');
    }
};