import { Request, Response } from 'express';
import db from './../firebaseAdmin';
import { DocumentSnapshot } from 'firebase-admin/firestore';

interface UserProfile {
    id: string;
    // Add other expected properties of a user profile
    name?: string;
    age?: number;
    email?: string;
}
export const getAllProfiles = async (req: Request, res: Response): Promise<void> => {
    try {
        const snapshot = await db.collection('user_profile').get();
        const documents = snapshot.docs.map((doc: DocumentSnapshot) => {
            const docData = doc.data() as UserProfile;
            return { ...docData, id: doc.id }; // Move id to the end to ensure it does not get overwritten
        });
        res.json(documents);
    } catch (err) {
        console.error('Error fetching user profiles:', err);
        res.status(500).send('Failed to retrieve user profiles');
    }
};
