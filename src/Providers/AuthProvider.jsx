import React, { createContext, useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, FacebookAuthProvider, getAuth, GithubAuthProvider, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updatePhoneNumber, updateProfile } from 'firebase/auth'
import app from '../firebase/firebase';
import useAxios from '../hooks/useAxios';

export const AuthContext = createContext(null)

const AuthProvider = ({children}) => {
    const auth = getAuth(app) 
    const [user,setUser] = useState(null)
    const [loading,setLoading] = useState(true)
    const googleProvider = new GoogleAuthProvider()
    const githubProvider = new GithubAuthProvider()
    const facebookProvider = new FacebookAuthProvider()
    const axiosSecure = useAxios()
    
    useEffect(()=>{
            onAuthStateChanged(auth,(currentUser)=>{
                setUser(currentUser)
                if(currentUser){
                      axiosSecure.get(`/user/${currentUser.uid}`)
                      .then(res=>{
                        if(res.data){
                            const {displayName,photoURL} =res.data
                            updateAccount({displayName,photoURL})
                            .then(()=>{ 
                                setLoading(false) 
                            })
                        }
                        if(!res.data){
                            setUser(currentUser) 
                            setLoading(false)
                        }
                      })
                      .catch(()=>{
                        setLoading(false)
                    })
                   
                    }
                    else{
                        setLoading(false)
                        setUser(null)
                    }
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
    const logout= ()=>{
        setLoading(true)
        return signOut(auth)
    }

    const userAuth = {signIn,createAccount,updateAccount,loading,setLoading,user,setUser,singInWithGoogle,singInWithGithub,singInWithFacebook,logout}

    return (
        <AuthContext.Provider value={userAuth}>
                {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;