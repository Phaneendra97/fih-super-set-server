import { Router } from "express";
import { signUpUser, signInUser } from "../controllers/authController"; // Ensure this path matches where your auth functions are stored

const authRoutes = Router();

// Route for signing up a new user
authRoutes.post("/api/signup", (req, res) => {
  const { email, password } = req.body;
  signUpUser(email, password)
    .then((result) => {
      if (result.error) {
        // If there's an error key, it means sign-up failed
        res.status(400).json({
          message: "Failed to sign up",
          error: result.error,
        });
      } else {
        // No error key, sign-up was successful
        res.status(201).json({
          message: "User signed up successfully",
          userToken: result.userToken,
          userId: result.userId,
        });
      }
    })
    .catch((error) => {
      // Catch any unexpected errors in the sign-up process
      res.status(500).json({
        message: "Internal server error",
        error: error.toString(),
      });
    });
});

// Route for signing in an existing user
authRoutes.post("/api/signin", async (req, res) => {
  const { email, password } = req.body;
  signInUser(email, password)
    .then((result) => {
      if (result.error) {
        // If there's an error key, it means sign-in failed
        res.status(401).json({
          message: "Failed to sign in",
          error: result.error,
        });
      } else {
        // No error key, sign-in was successful
        res.status(200).json({
          message: "User signed in successfully",
          userToken: result.userToken,
          userId: result.userId,
        });
      }
    })
    .catch((error) => {
      // Catch any unexpected errors in the sign-in process
      res.status(500).json({
        message: "Internal server error",
        error: error.toString(),
      });
    });
});

export default authRoutes;
