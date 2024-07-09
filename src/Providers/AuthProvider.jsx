import React, { createContext, useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, FacebookAuthProvider, getAuth, GithubAuthProvider, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile} from 'firebase/auth'
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
               
                if(currentUser){
                      axiosSecure.post(`/jwt`, {email:currentUser.email,uid:currentUser.uid})
                      .then(res=>{
                        if(res.data){
                            const {displayName,photoURL} =res.data
                            updateAccount({displayName,photoURL})
                            .then(()=>{ 
                                setUser(currentUser)
                                setLoading(false) 
                            })
                        }
                        if(!res.data){
                            setUser(currentUser) 
                            setLoading(false)
                        }
                      })
                      .catch(()=>{
                        setUser(null)
                        setLoading(false)
                    })
                   
                    }
                    else{
                        axiosSecure.post('/logout', currentUser)
                        setUser(null)
                        setLoading(false)
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
        setUser(null)
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