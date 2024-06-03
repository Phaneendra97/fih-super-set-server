import { Request, Response } from "express";
import { db, admin } from "./../firebaseAdmin";

interface UserProfile {
  user_id?: string;
  user_name?: string;
  user_age?: number;
  user_email?: string;
  language_preference?: string;
  learning_language?: string;
}

export const getUserProfile = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const userToken = req.headers.authorization;

    if (!userToken) {
      res.status(401).send("Authorization token is missing");
      return;
    }

    const decodedToken = await admin.auth().verifyIdToken(userToken);
    const email = decodedToken.email;

    if (!email) {
      res.status(400).send("Invalid token");
      return;
    }

    const userDoc = await db
      .collection("user_profile")
      .where("user_email", "==", email)
      .limit(1)
      .get();

    if (userDoc.empty) {
      res.status(404).send("User profile not found");
      return;
    }

    const userProfile = userDoc.docs[0].data() as UserProfile;

    res.json(userProfile);
  } catch (err) {
    console.error("Error fetching user profile:", err);
    res.status(500).send("Failed to retrieve user profile");
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
      return;
    }

    const decodedToken = await admin.auth().verifyIdToken(token);
    const email = decodedToken.email;
    const userId = decodedToken.uid;

    if (!email) {
      res.status(400).send("Invalid token");
      return;
    }

    const userProfile: UserProfile = req.body;
    userProfile.user_email = email;
    userProfile.user_id = userId;

    // Query the user_profile collection to check if a document with user_id already exists
    const querySnapshot = await db.collection("user_profile").where('user_id', '==', userId).get();

    if (querySnapshot.empty) {
      // If no document exists, create a new one
      const newUserProfileRef = await db.collection("user_profile").add(userProfile);

      res.status(201).send({
        message: "User profile created successfully",
        user_name: userProfile.user_name,
      });
    } else {
      // If a document exists, update the existing document
      const docId = querySnapshot.docs[0].id;
      await db.collection("user_profile").doc(docId).set(userProfile, { merge: true });

      res.status(200).send({
        message: "User profile updated successfully",
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