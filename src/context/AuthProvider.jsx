import React, { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth } from "../firebase/firebase.config";

const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userLoading, setUserLoading] = useState(true);
  console.log(user);

  const registerUser = (email, password) => {
    setUserLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const logInUser = (email, password) => {
    setUserLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logOutUser = () => {
    setUserLoading(true);
    return signOut(auth);
  };

  const googleSignIn = () => {
    setUserLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  const userProfileUpdate = (profile) =>{
    return updateProfile(auth.currentUser, profile);
  }

  const resetPassword = (email) =>{
    return sendPasswordResetEmail(auth, email)
  }

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setUserLoading(false);
      return () => {
        unSubscribe();
      };
    });
  }, []);

  const authInfo = {
    registerUser,
    logInUser,
    logOutUser,
    googleSignIn,
    userProfileUpdate,
    resetPassword,
    user,
    userLoading,
  };
  return <AuthContext value={authInfo}>{children}</AuthContext>;
};

export default AuthProvider;
