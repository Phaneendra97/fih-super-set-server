import { Request, Response } from 'express';
import { db } from "./../firebaseAdmin";
import { DocumentSnapshot } from 'firebase-admin/firestore';

// Define the GameProfile interface
interface GameProfile {
    age_rating: string;
    app_host_url: string;
    description: string;
    display_name: string;
    game_name: string;
    game_tags: string[];
    package_id: string;
}

export const getGameProfileByName = async (req: Request, res: Response): Promise<void> => {
    const { game_name } = req.query;

    if (!game_name) {
        res.status(400).send('Game name is required');
        return;
    }

    try {
        const snapshot = await db.collection('game_profile').where('game_name', '==', game_name).get();

        if (snapshot.empty) {
            res.status(404).send('No matching game profile found');
            return;
        }

        const gameProfiles = snapshot.docs.map((doc: DocumentSnapshot) => {
            const docData = doc.data() as GameProfile;
            return { ...docData, id: doc.id };
        });

        res.json(gameProfiles[0]); // Assuming game_name is unique and we only need the first match
    } catch (err) {
        console.error('Error fetching game profile:', err);
        res.status(500).send('Failed to retrieve game profile');
    }
};
