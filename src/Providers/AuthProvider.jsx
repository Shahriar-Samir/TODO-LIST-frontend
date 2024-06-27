import React, { createContext, useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, FacebookAuthProvider, getAuth, GithubAuthProvider, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, updateProfile } from 'firebase/auth'
import app from '../firebase/firebase';

export const AuthContext = createContext(null)

const AuthProvider = ({children}) => {
    const auth = getAuth(app) 
    const [user,setUser] = useState(null)
    const [loading,setLoading] = useState(true)
    const googleProvider = new GoogleAuthProvider()
    const githubProvider = new GithubAuthProvider()
    const facebookProvider = new FacebookAuthProvider()

    useEffect(()=>{
            onAuthStateChanged(auth,(currentUser)=>{
                    setUser(currentUser)
                    setLoading(false)
            })
    },[])


    const signIn = (email,password)=>{
        setLoading(true)
        return signInWithEmailAndPassword(auth,email,password)
    }

    const createAccount = (email,password)=>{
        setLoading(true)
        return createUserWithEmailAndPassword(auth,email,password)
    }

    const updateAccount = (data)=>{
        setLoading(true)
        return updateProfile(auth.currentUser,data)
    }

    const singInWithGoogle= ()=>{
        setLoading(true)
        return signInWithPopup(auth,googleProvider)
    }
    const singInWithGithub= ()=>{
        setLoading(true)
        return signInWithPopup(auth,githubProvider)
    }
    const singInWithFacebook= ()=>{
        setLoading(true)
        return signInWithPopup(auth,facebookProvider)
    }

    const userAuth = {signIn,createAccount,updateAccount,loading,setLoading,user,setUser,singInWithGoogle,singInWithGithub,singInWithFacebook}

    return (
        <AuthContext.Provider value={userAuth}>
                {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;