import { createContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import axios from "axios";
import auth from "../Firebase/Firebase.init";

const AuthContext = createContext();

const googleProvider = new GoogleAuthProvider();

export const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const updateUsernameAndPhotoUrl = async (name, photo) => {
    try {
      await updateProfile(auth.currentUser, {
        displayName: name,
        photoURL: photo,
      });
      return { ...auth.currentUser, displayName: name, photoURL: photo };
    } catch (error) {
      console.error("Error updating profile:", error);
      throw error;
    }
  };

  const userLogin = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const userLoginByGoogle = () => {
    return signInWithPopup(auth, googleProvider);
  };

  const userLogOut = () => {
    return signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser || null);
      try {
        if (currentUser?.email) {
          const user = { email: currentUser.email };
          await axios.post(
            //"https://assignment11-server-seven.vercel.app/jwt",
            "http://localhost:5000/jwt",
            user,
            { withCredentials: true }
          );
        } else {
          await axios.post(
            //"https://assignment11-server-seven.vercel.app/logout",
            "http://localhost:5000/logout",
            {},
            { withCredentials: true }
          );
        }
      } catch (error) {
        console.error("Error in authentication flow:", error);
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const value = {
    loading,
    setLoading,
    createUser,
    updateUsernameAndPhotoUrl,
    userLogin,
    userLoginByGoogle,
    userLogOut,
    user,
    setUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
