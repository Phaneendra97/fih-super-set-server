import { Request, Response } from "express";
import { db, admin } from "./../firebaseAdmin";
import { DocumentSnapshot } from "firebase-admin/firestore";

interface UserProfile {
  id: string;
  user_id?: string;
  user_name?: string;
  user_age?: number;
  user_email?: string;
  language_preference?: string;
  learning_language?: string;
}

export const getAllProfiles = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const snapshot = await db.collection("user_profile").get();
    const documents = snapshot.docs.map((doc: DocumentSnapshot) => {
      const docData = doc.data() as UserProfile;
      return { ...docData, id: doc.id }; // Move id to the end to ensure it does not get overwritten
    });
    res.json(documents);
  } catch (err) {
    console.error("Error fetching user profiles:", err);
    res.status(500).send("Failed to retrieve user profiles");
  }
};

export const setUserProfile = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const token = req.headers.authorization;

    if (!token) {
      res.status(401).send("Authorization token is missing");
    } else {
      const decodedToken = await admin.auth().verifyIdToken(token);
      const email = decodedToken.email;
      const userId = decodedToken.uid;
      if (!email) {
        res.status(400).send("Invalid token");
      }

      const userProfile: UserProfile = req.body;
      userProfile.user_email = email;
      userProfile.user_id = userId;

      // If no user profile is found, create a new one
      const newUserProfileRef = await db
        .collection("user_profile")
        .add(userProfile);
      userProfile.id = newUserProfileRef.id;

      res
        .status(201)
        .send({
          message: "User profile created successfully",
          user_name: userProfile.user_name,
        });
    }
  } catch (err) {
    console.error("Error updating user profile:", err);
    if (!res.headersSent) {
      res.status(500).send("Failed to update user profile");
    }
  }
};
