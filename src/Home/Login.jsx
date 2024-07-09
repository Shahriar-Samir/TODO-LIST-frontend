import React, { useContext, useState } from 'react';
import { FaEye, FaEyeSlash, FaGoogle } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../Providers/AuthProvider';
import { toast, ToastContainer } from 'react-toastify';
import useAxios from '../hooks/useAxios';
import { Helmet } from 'react-helmet-async';
import useAxiosPublic from '../hooks/useAxiosPublic';
import {motion} from 'framer-motion'


const Login = () => {
  const {signIn,loading,setLoading,singInWithGoogle,singInWithGithub,singInWithFacebook} = useContext(AuthContext)
  const axiosSecure = useAxios()
  const axiosPublic = useAxiosPublic()
  
  const googleLogin = ()=>{
    singInWithGoogle()
    .then(res=>{
      axiosPublic.get(`/userExist/${res.user.uid}`)
      .then((res2)=>{
             if(res2.data){
          
              
             }
             else{
              axiosSecure.post('/addUser', {uid:res.user.uid,displayName:res.user.displayName,email:res.user.email,photoURL:res.user.photoURL,phoneNumber:res.user.phoneNumber})
              .then(()=>{
   
                  
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
              
             }
             else{
              axiosSecure.post('/addUser', {uid:res.user.uid,displayName:res.user.displayName,email:res.user.email,photoURL:res.user.photoURL,phoneNumber:res.user.phoneNumber})
              .then(()=>{
                  
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
              
             }
             else{
              axiosSecure.post('/addUser', {uid:res.user.uid,displayName:res.user.displayName,email:res.user.email,photoURL:res.user.photoURL,phoneNumber:res.user.phoneNumber})
              .then(()=>{
                  
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
      const email = form.email.value
      const password = form.password.value
      signIn(email,password)
      .then(()=>{
     
          })
      .catch((err)=>{
        setLoading(false)
        if(err.message ==='Firebase: Error (auth/invalid-credential).'){
            toast.error('email or password is incorrect')
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

  const containerVariants = {
    hidden:{
      opacity:0,
      scale:0.8
    },
    visible:{
        opacity:1,
        scale:1,
        transition:{
          delayChildren:0.3,
          staggerChildren: 0.5
        }
    }
  }
  const childVariants = {
    hidden:{
      x:700,
      opacity:0
    },
    visible:{
      x:0,
      opacity:1,
      transition:{
        duration:0.4,
        type: 'spring'
      }
    }
  }


    return (
      <>
             <Helmet>
            <title>Login | Check It</title>
          </Helmet>
       <ToastContainer/>
        <div className='flex flex-col justify-center items-center gap-10 h-[130vh] md:flex-row md:gap-20 lg:gap-32  bg-gradient-to-r from-indigo-400 to-cyan-400 text-white overflow-hidden'>
             
               <motion.div  initial={{x:-800}} animate={{x:0}} transition={{duration:0.7, type:'spring',damping:20, delay:0.7}}  className='w-11/12 md:max-w-[450px]  flex justify-center items-center flex-col'>
                <img src='/logos/note.png' className='w-[1200px]'/>
                <h1 className='w-full mt-4 text-center text-4xl font-semibold'>Your Ultimate Task Management Solution</h1>
                </motion.div>
          <div className='w-11/12 md:w-1/2 max-w-[350px]'>
          <motion.form onSubmit={submit} variants={containerVariants} initial='hidden' animate='visible'>
          <motion.div className='flex justify-center items-center gap-5' initial={{scale:0}} animate={{scale:1}} transition={{duration:1,type:'spring', damping:8}}>
                     <img src='/logos/cover.png' className='w-[70px]'/>
                     <motion.h1 className='font-bold text-4xl' >Check It</motion.h1>
                     </motion.div>
            <h1 className='text-sm font-bold text-end mt-5'>Log in with</h1>
            <div className='grid grid-cols-3 gap-1 mt-6'>

                 <div className='flex items-center text-sm gap-1 justify-center border p-3 border-gray-500 hover:outline hover:outline-gray-700' role='button' onClick={googleLogin}>
                  <h1>Google</h1>
                 <FaGoogle />
                 </div>
                 <div className='flex items-center text-sm gap-1 justify-center border p-3 border-gray-500  hover:outline hover:outline-gray-700 cursor-pointer' onClick={facebookLogin}>
                  <h1>Facebook</h1>
                  <FaFacebookF />
                 </div>
                 <div className='flex items-center text-sm gap-1 justify-center border p-3 border-gray-500  hover:outline hover:outline-gray-700 cursor-pointer' onClick={githubLogin}>
                  <h1>Github</h1>
                  <FaGithub/>
                 </div>
    
            </div>
            <div className='flex items-center gap-3 mt-2'>
            <hr class=" border border-white w-full" />
            <p>or</p>
            <hr class=" border border-white w-full" />
            </div>
        <motion.div variants={childVariants} className="form-control mt-1">
          <label className="label">
            <span className="label-text text-white">Email</span>
          </label>
          <input type="email" placeholder="email" name='email' className="input input-bordered text-black" required />
        </motion.div>
        <motion.div variants={childVariants} className="form-control">
          <label className="label">
            <span className="label-text text-white">Password</span>
          </label>
          <div className='relative'>
          <input type={isPassword? 'password' : 'text'} name='password' placeholder="password" className="input input-bordered w-full text-black" required />
           {
            isPassword?
             <FaEye onClick={openPass} role='button' className='absolute top-4 right-4 text-xl text-black'/> :
             <FaEyeSlash onClick={openPass} role='button' className='absolute top-4 right-4 text-xl text-black'/>
           }
          </div>
        </motion.div>
        <div className="form-control mt-6">
          {loading? <button disabled={true} className="btn text-white  bg-gradient-to-r from-indigo-400 to-cyan-400 "><span className="loading loading-spinner loading-md border-none"></span></button> : <button className="btn  bg-gradient-to-r from-indigo-400 to-cyan-400 text-white border-none  hover:bg-gradient-to-r hover:from-indigo-500 hover:to-cyan-500 ">Login</button>}
        </div>
      </motion.form>
      <p className='mt-3 text-center text-sm'>Don't have an account? <Link className='underline font-bold' to='/signup'>Create new account</Link></p>
          </div>
        </div>
        </>
    );
};

export default Login;