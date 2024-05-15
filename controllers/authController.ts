// authFunctions.ts
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  UserCredential,
} from "firebase/auth";
import { auth } from "../firebaseClient";

// Function to sign up a new user
export async function signUpUser(
  email: string,
  password: string
): Promise<{
  message: string;
  userToken?: string;
  error?: string;
}> {
  try {
    const userCredential: UserCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const userToken: string = await userCredential.user.getIdToken();
    return {
      message: "User signed up successfully",
      userToken: userToken,
    };
  } catch (error: any) {
    return {
      message: "Failed to sign up",
      error: `Error ${error.code}: ${error.message}`,
    };
  }
}

// Function to sign in an existing user
export function signInUser(
  email: string,
  password: string
): Promise<{
  message: string;
  userCredential?: UserCredential;
  error?: string;
}> {
  return signInWithEmailAndPassword(auth, email, password)
    .then((userCredential: UserCredential) => {
      return {
        message: "User signed in successfully",
        userCredential: userCredential,
      }; // Successfully signed in
    })
    .catch((error: any) => {
      return {
        message: "Failed to sign in",
        error: `Error ${error.code}: ${error.message}`, // Return error message
      };
    });
}
