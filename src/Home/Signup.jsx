import React, { useContext } from 'react';
import { FaEye, FaEyeSlash, FaGoogle } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../Providers/AuthProvider';
import {toast,ToastContainer} from 'react-toastify'

const Signup = () => {
  const {createAccount,updateAccount} = useContext(AuthContext)
  const navigate = useNavigate()
  
  const submit = (e)=>{
    e.preventDefault()
      const form = e.target
      const userName = form.userName.value
      const email = form.email.value
      const password = form.password.value
      createAccount(email,password)
      .then(()=>{
          updateAccount({displayName: userName})
          .then(()=>{
            navigate('/app/today')
          })
          .catch(()=>{
            toast.error('Something went wrong')
          })
      })
  }

    return (
        <div className='flex flex-col justify-center items-center h-[150vh] gap-12 lg:h-[140vh] '>
          <ToastContainer/>
                      <img src='/logos/cover.png' className='w-[250px]'/>
          <div className='w-11/12 md:w-1/2 max-w-[350px]'>
          <form className="" onSubmit={submit}>
            <h1 className='text-sm font-bold text-end'>Create an account with</h1>

            <div className='grid grid-cols-3 gap-1 mt-6'>

                 <div className='flex items-center text-sm gap-1 justify-center border p-3 border-gray-400 hover:outline hover:outline-gray-200' role='button'>
                  <h1>Google</h1>
                 <FaGoogle />
                 </div>
                 <div className='flex items-center text-sm gap-1 justify-center border p-3 border-gray-400  hover:outline hover:outline-gray-200'>
                  <h1>Facebook</h1>
                  <FaFacebookF />
                 </div>
                 <div className='flex items-center text-sm gap-1 justify-center border p-3 border-gray-400  hover:outline hover:outline-gray-200'>
                  <h1>Github</h1>
                  <FaGithub/>
                 </div>
    
            </div>
            <div className='flex items-center gap-3 mt-2'>
            <hr class=" border border-black w-full" />
            <p>or</p>
            <hr class=" border border-black w-full" />
            </div>
            <div className="form-control mt-1">
          <label className="label">
            <span className="label-text">User name</span>
          </label>
          <input type="text" name='userName' placeholder="user name" className="input input-bordered" required />
        </div>
        <div className="form-control mt-1">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input type="email" placeholder="email" name='email' className="input input-bordered" required />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <div className='relative'>
          <input type="password" placeholder="password" name='password' className="input input-bordered w-full" required />
            <FaEye className='absolute top-4 right-4 text-xl'/>
            <FaEyeSlash className='absolute top-4 right-4 text-xl'/>
          </div>
        </div>
        <div className="form-control mt-6">
          <button className="btn text-white bg-gradient-to-r from-emerald-400 to-cyan-400 bg-cyan-500  hover:bg-gradient-to-r hover:from-emerald-500 hover:to-cyan-500 hover:bg-cyan-500 ">Submit</button>
        </div>
      </form>
      <button className='btn w-full mt-4'>Try as guest</button>
      <p className='mt-3 text-center text-sm'>Already have an account? <Link className='underline font-bold' to='/'>Login</Link></p>
          </div>
        </div>
    );
};

export default Signup;