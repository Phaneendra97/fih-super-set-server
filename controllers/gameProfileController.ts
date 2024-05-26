import { Request, Response } from 'express';
import { db } from "./../firebaseAdmin";
import { DocumentSnapshot } from 'firebase-admin/firestore';

interface GameProfile {
    age_rating: string;
    app_host_url: string;
    description: string;
    display_name: string;
    game_name: string;
    game_tags: string[];
    package_id: string;
    iconUrl: string; // Added iconUrl to the interface
}

// Existing getGameProfileByName function remains unchanged

export const getGameProfileByName = async (req: Request, res: Response): Promise<void> => {
    const { game_name } = req.query;

    if (!game_name) {
        res.status(400).send('Game name is required');
        return;
    }

    try {
        console.log(`Fetching game profile for game name: ${game_name}`);
        const snapshot = await db.collection('game_profile').where('game_name', '==', game_name).get();

        if (snapshot.empty) {
            console.log(`No matching game profile found for game name: ${game_name}`);
            res.status(404).send('No matching game profile found');
            return;
        }

        const gameProfiles = snapshot.docs.map((doc: DocumentSnapshot) => {
            const docData = doc.data() as GameProfile;
            return { ...docData, id: doc.id };
        });

        console.log(`Found game profile`);
        res.json(gameProfiles[0]); // Assuming game_name is unique and we only need the first match
    } catch (err) {
        console.error('Error fetching game profile:', err);
        res.status(500).send('Failed to retrieve game profile');
    }
};

// Existing getAllGameProfiles function remains unchanged

export const getAllGameProfiles = async (req: Request, res: Response): Promise<void> => {
    try {
        console.log(`Fetching all game profiles`);
        const snapshot = await db.collection('game_profile').get();

        if (snapshot.empty) {
            console.log(`No game profiles found`);
            res.status(404).send('No game profiles found');
            return;
        }

        const gameProfiles = snapshot.docs.map((doc: DocumentSnapshot) => {
            const { game_name, display_name, iconUrl } = doc.data() as GameProfile;
            return { game_name, display_name, iconUrl, id: doc.id };
        });

        console.log(`Found ${gameProfiles.length} game profiles`);
        res.json(gameProfiles);
    } catch (err) {
        console.error('Error fetching game profiles:', err);
        res.status(500).send('Failed to retrieve game profiles');
    }
};
