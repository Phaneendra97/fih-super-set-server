import { Request, Response } from "express";
import { admin, db } from "../firebaseAdmin";

// Function to get all game data for a specific user and game
export const getUserGameDataByGameName = async (
  req: Request,
  res: Response
) => {
  const gameName = req.params.game_name; // Replace all hyphens with underscores
  const token = req.headers.authorization; // Assuming the token is sent as "Bearer <token>"

  if (!token) {
    return res.status(401).json({
      message: "Authorization token missing",
    });
  }

  try {
    // Verify the token and get user ID
    const decodedToken = await admin.auth().verifyIdToken(token);
    const userId = decodedToken.uid;

    // Construct the collection name
    const collectionName = `${gameName}_data`;

    // Query the collection for the document with the userId
    const snapshot = await db
      .collection(collectionName)
      .where("user_id", "==", userId)
      .get();

    if (snapshot.empty) {
      return res.status(404).json({
        message: "User game data not found",
      });
    }

    // Assuming only one document should match
    const userDoc = snapshot.docs[0];

    // Send the document data as response
    return res.status(200).json(userDoc.data());
  } catch (error) {
    console.error("Error getting user game data:", error);

    // Handle the error based on its type
    const errorMessage = error instanceof Error ? error.message : String(error);

    return res.status(500).json({
      message: "Internal server error",
      error: errorMessage,
    });
  }
};

export const postUserGameDataByGameName = async (
  req: Request,
  res: Response
) => {
  const gameName = req.params.game_name; // Replace all hyphens with underscores
  const token = req.headers.authorization; // Assuming the token is sent as "Bearer <token>"

  if (!token) {
    return res.status(401).json({
      message: "Authorization token missing",
    });
  }

  try {
    // Verify the token and get user ID
    const decodedToken = await admin.auth().verifyIdToken(token);
    const userId = decodedToken.uid;

    // Construct the collection name
    const collectionName = `${gameName}_data`;

    // Check if a document with the user_id already exists
    const querySnapshot = await db
      .collection(collectionName)
      .where("user_id", "==", userId)
      .get();
      const userData = req.body;
    if (querySnapshot.empty) {
      // If no document exists, create a new one with the provided data
      
      await db.collection(collectionName).add({ ...userData, user_id: userId });
    } else {
      // If a document exists, update the existing document with the provided data
      const docId = querySnapshot.docs[0].id;
      await db
        .collection(collectionName)
        .doc(docId)
        .set(userData, { merge: true });
    }

    return res.status(200).json({
      message: "User game data saved successfully",
      data: userData,
    });
  } catch (error) {
    console.error("Error posting user game data:", error);

    // Handle the error based on its type
    const errorMessage = error instanceof Error ? error.message : String(error);

    return res.status(500).json({
      message: "Internal server error",
      error: errorMessage,
    });
  }
};
