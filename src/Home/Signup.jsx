import React, { useContext, useState } from 'react';
import { FaEye, FaEyeSlash, FaGoogle } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../Providers/AuthProvider';
import {toast,ToastContainer} from 'react-toastify'
import useAxios from '../hooks/useAxios';
import { Helmet } from 'react-helmet-async';
import useAxiosPublic from '../hooks/useAxiosPublic';


const Signup = () => {
  const {createAccount,updateAccount,loading,setLoading,singInWithGoogle,singInWithGithub,singInWithFacebook} = useContext(AuthContext)
  const navigate = useNavigate()
  const axiosSecure = useAxios()
  const axiosPublic = useAxiosPublic()
  
  const googleLogin = ()=>{
    singInWithGoogle()
    .then(res=>{
      axiosPublic.get(`/userExist/${res.user.uid}`)
      .then((res2)=>{
             if(res2.data){
              setLoading(false)
              navigate('/app/today')
             }
             else{
              axiosSecure.post('/addUser', {uid:res.user.uid,displayName:res.user.displayName,email:res.user.email,photoURL:res.user.photoURL,phoneNumber:res.user.phoneNumber})
              .then(()=>{
                  setLoading(false)
                  navigate('/app/today')
            })
             }
      })

    })
    .catch(()=>{
      setLoading(false)
        toast.error('Something went wrong')
    })
  }
  const githubLogin = ()=>{
    singInWithGithub()
    .then(res=>{
      axiosPublic.get(`/userExist/${res.user.uid}`)
      .then((res2)=>{
             if(res2.data){
              setLoading(false)
              navigate('/app/today')
             }
             else{
              axiosSecure.post('/addUser', {uid:res.user.uid,displayName:res.user.displayName,email:res.user.email,photoURL:res.user.photoURL,phoneNumber:res.user.phoneNumber})
              .then(()=>{
                  setLoading(false)
                  navigate('/app/today')
            })
             }
      })

    })
    .catch((err)=>{
      console.log(err)
      setLoading(false)
        toast.error('Something went wrong')
    })
  }

  const facebookLogin = ()=>{
    singInWithFacebook()
    .then(res=>{
      axiosPublic.get(`/userExist/${res.user.uid}`)
      .then((res2)=>{
             if(res2.data){
              setLoading(false)
              navigate('/app/today')
             }
             else{
              axiosSecure.post('/addUser', {uid:res.user.uid,displayName:res.user.displayName,email:res.user.email,photoURL:res.user.photoURL,phoneNumber:res.user.phoneNumber})
              .then(()=>{
                  setLoading(false)
                  navigate('/app/today')
            })
             }
      })

    })
    .catch((err)=>{
      console.log(err)
      setLoading(false)
        toast.error('Something went wrong')
    })
  }

  const submit = (e)=>{
    e.preventDefault()
      const form = e.target
      const axiosSecure = useAxios()
      const userName = form.userName.value
      const email = form.email.value
      const password = form.password.value
      createAccount(email,password)
      .then((res)=>{
            updateAccount({displayName:userName})
            .then(()=>{
              axiosSecure.post('/addUser', {uid:res.user.uid,displayName:userName,email:email})
              .then(()=>{
                  setLoading(false)
                  navigate('/app/today')
  
            })
            })
      })
      .catch((err)=>{
        setLoading(false)
        if(err.message==='Firebase: Password should be at least 6 characters (auth/weak-password).'){
          toast.error('Password should be at least six characters')
        }
        if(err.message==='Firebase: Error (auth/email-already-in-use).'){
          
          toast.error('Email already in use')
        }
        else{
          toast.error('Something went wrong')
          
        }
      })
  }


  const [isPassword,setIsPassword] = useState(true)

  const openPass = ()=>{
      if(isPassword){
        setIsPassword(false)
      }
      else{
        setIsPassword(true)
      }
  }

    return (
        <div className='flex flex-col justify-center items-center h-[150vh] gap-3 lg:h-[140vh]   bg-gradient-to-r from-indigo-400 to-cyan-400 text-white'>
          <Helmet>
            <title>Signup | Check It</title>
          </Helmet>
          <ToastContainer/>
                     <div className='flex justify-center items-center gap-5'>
                     <img src='/logos/cover.png' className='w-[70px]'/>
                     <h1 className='font-bold text-4xl'>Check It</h1>
                     </div>
          <div className='w-11/12 md:w-1/2 max-w-[350px]'>
          <form className="" onSubmit={submit}>
            <h1 className='text-sm font-bold text-end'>Create an account with</h1>

            <div className='grid grid-cols-3 gap-1 mt-3'>

                 <div className='flex items-center text-sm gap-1 justify-center border p-3 border-gray-400 hover:outline hover:outline-gray-200' role='button' onClick={googleLogin}>
                  <h1>Google</h1>
                 <FaGoogle />
                 </div>
                 <div className='flex items-center text-sm gap-1 justify-center border p-3 border-gray-400  hover:outline hover:outline-gray-200' onClick={facebookLogin}>
                  <h1>Facebook</h1>
                  <FaFacebookF />
                 </div>
                 <div className='flex items-center text-sm gap-1 justify-center border p-3 border-gray-400  hover:outline hover:outline-gray-200' onClick={githubLogin}>
                  <h1>Github</h1>
                  <FaGithub/>
                 </div>
    
            </div>
            <div className='flex items-center gap-3 mt-2'>
            <hr class=" border border-white w-full" />
            <p>or</p>
            <hr class=" border border-white w-full" />
            </div>
            <div className="form-control mt-1">
          <label className="label">
            <span className="label-text text-white">User name</span>
          </label>
          <input type="text" name='userName' placeholder="user name" className="input input-bordered" required />
        </div>
        <div className="form-control mt-1">
          <label className="label">
            <span className="label-text text-white">Email</span>
          </label>
          <input type="email" placeholder="email" name='email' className="input input-bordered" required />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text text-white">Password</span>
          </label>
          <div className='relative'>
          <input type={isPassword? 'password' : 'text'} name='password' placeholder="password" className="input input-bordered w-full" required />
           {
            isPassword?
             <FaEye onClick={openPass} role='button' className='absolute top-4 right-4 text-xl text-black'/> :
             <FaEyeSlash onClick={openPass} role='button' className='absolute top-4 right-4 text-xl text-black'/>
           }
          </div>
        </div>
        <div className="form-control mt-6">
        {loading? <button disabled={true} className="btn text-white  bg-gradient-to-r from-indigo-400 to-cyan-400 "><span className="loading loading-spinner loading-md border-none"></span></button> : <button className="btn  bg-gradient-to-r from-indigo-400 to-cyan-400 text-white border-none  hover:bg-gradient-to-r hover:from-indigo-500 hover:to-cyan-500 ">Submit</button>}
        </div>
      </form>
      <p className='mt-3 text-center text-sm'>Already have an account? <Link className='underline font-bold' to='/'>Login</Link></p>
          </div>
        </div>
    );
};

export default Signup;