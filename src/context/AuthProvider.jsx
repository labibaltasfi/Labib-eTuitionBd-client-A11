import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile,  } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { auth } from '../firebase/firebase.init';
import { AuthContext } from './AuthContext';




const googleProvider = new GoogleAuthProvider();
const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true)
 
    const createUser = (email, password) => {
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
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            if (currentUser) {
                const loggedUser = { email: currentUser.email }
                fetch('https://labib-e-tuition-bd-server-a11.vercel.app/getToken', {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify(loggedUser)
                })
                    .then(res => res.json())
                    .then(data => {
                        localStorage.setItem('token', data.token)
                    })
            }
            else {
                localStorage.removeItem('token')
            }
            setLoading(false);
        })

        return () => {
            unsubscribe()
        }
    }, [])

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