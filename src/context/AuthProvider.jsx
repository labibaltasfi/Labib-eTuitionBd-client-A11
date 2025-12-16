import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile,  } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { createContext } from 'react';
import { auth } from '../firebase/firebase.init';




const googleProvider = new GoogleAuthProvider();
export const AuthContext = createContext();
const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true)
 
    const createUser = (auth, email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }
    

     const signInWithGoogle = () =>{
        setLoading(true)
        return signInWithPopup(auth, googleProvider)
    }


     const signIn = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }

    const forgerPassword = ( email) =>{
        return sendPasswordResetEmail(auth, email)
    }

   
     const updateUser = (updatedData) =>{
        return updateProfile(auth.currentUser, updatedData)
    }

     const logOut = () => {
        return signOut(auth)
    }


 

    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false)
        });
        return () => 
           unSubscribe();
    
    }, []);

    const authData = {
        user,
        setUser,
        createUser,
        signIn,
        forgerPassword,
        signInWithGoogle,
        loading,
        setLoading,
        updateUser,
        logOut
    
    };


    return <AuthContext value={authData}>{children}</AuthContext>
};

export default AuthProvider;