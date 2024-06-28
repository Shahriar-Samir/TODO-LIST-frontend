import React, { useContext, useEffect, useRef, useState } from 'react';
import { FaBars, FaHamburger, FaSearch } from 'react-icons/fa';
import { IoIosAdd, IoIosAddCircle } from 'react-icons/io';
import { Link, NavLink, Outlet } from 'react-router-dom';
import { CiEdit } from "react-icons/ci";
import { IoMdNotifications } from "react-icons/io";
import { Tooltip, useMediaQuery } from '@mui/material';
import {motion} from 'framer-motion'
import { IoClose } from 'react-icons/io5';
import { AuthContext } from '../Providers/AuthProvider';
import { toast } from 'react-toastify';

const Dashboard = () => {
  const md = useMediaQuery('(min-width:768px)');
  const {user,logout,setLoading,loading} = useContext(AuthContext)

    const [descripiton,setDescription] = useState()
    const [taskName,setTaskName] = useState()


    const changeDescription = (e)=>{
        setDescription(e.target.textContent)
    }
    const changeTaskName = (e)=>{
        setTaskName(e.target.textContent)
    }

    const [navbar,setNavbar] = useState(md)

    const openNavbar = (e)=>{
      e.stopPropagation()
        if(md===false){
          setNavbar(true)
        }
        if(navbar===false){
          setNavbar(true)
        }
    }
    const closeNavbar = (e)=>{

      if(navbar===true && md===true){
        setNavbar(true)
      }
      if(md===false && navbar === true){
        setNavbar(false)
      }
 
}
  const signOut = ()=>{
      logout()
      .then(()=>{
          setLoading(false)
      })
      .catch(()=>{
        setLoading(false)
        toast.error('Something went wrong')
      })
  }

  
    return (
        <div className='bg-gradient-to-r from-emerald-100 to-cyan-100 bg-cyan-100  hover:bg-gradient-to-r hover:from-emerald-100 hover:to-cyan-100 hover:bg-cyan-100'>
         
        <div className="drawer lg:drawer-open flex ">
 
  <motion.div initial={{x:-600}} animate={{x: navbar===true? 0 : -600}} transition={{ease:'anticipate'}} className="w-2/4 md:w-2/4 lg:w-1/4 h-[100vh] absolute md:static z-30 md:block">
    <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
  <ul className="flex  flex-col gap-4  p-4 w-full h-full text-black border-[#e2e2e2] shadow-xl">
    <div className='flex w-full justify-center items-center flex-col'>
      <div className='w-full flex justify-end'>
        <IoClose className='text-green-500 text-3xl md:hidden' onClick={closeNavbar}/>
      </div>
    <img src='/logos/cover.png' className='w-[100px] h-[100px] object-contain'/>
    </div>
      {/* Sidebar content here */}
        <div className='bg-white flex justify-between rounded-lg relative w-full'>
        <input className='p-2 outline-0 rounded-lg w-full' placeholder='search '/>
        <FaSearch className='absolute top-3 right-2'/>
        </div>
     <li onClick={()=>document.getElementById('my_modal_5').showModal()}><button className="flex items-center gap-2 text-md btn bg-green-400 border-none text-white hover:bg-green-500 w-full" > Add Task <IoIosAddCircle  className="text-2xl"/></button></li> 
      <li className=''><NavLink to='/app/allTasks' className={({isActive})=> isActive? `p-2 rounded-lg text-sm flex justify-normal w-full border border-black ` : `p-2 rounded-lg text-sm flex justify-normal w-full border border-transparent`}>
      <div className='flex justify-between w-full'>
      <p>All Task</p>
      <div className="badge text-xs">+10</div>
      </div>
      </NavLink>
      </li>
      <li className=''><NavLink to='/app/today' className={({isActive})=> isActive? `p-2 rounded-lg text-sm flex justify-normal w-full border border-black` : `p-2 rounded-lg text-sm flex justify-normal w-full border border-transparent`}>
      <div className='flex justify-between w-full'>
      <p>Today</p>
      <div className="badge text-xs">+4</div>
      </div>
      </NavLink>
      </li>
      <li className='w-full'><NavLink className={({isActive})=> isActive? `p-2 rounded-lg text-sm flex justify-normal w-full border border-black ` : `p-2 rounded-lg text-sm flex justify-normal w-full border border-transparent`} to='/app/events'>Events</NavLink></li>
    </ul>
  </motion.div>
  <div className='w-full md:w-3/4 overflow-auto h-[100vh]' onClick={closeNavbar}>
  <nav className='flex justify-end items-center  px-5 py-3 gap-5 top-0 sticky z-10'>
<div className='flex justify-end items-center rounded-2xl border border-[#e2e2e2] shadow-md px-5 py-3 gap-5'>
  <FaBars onClick={openNavbar} className='md:hidden'/>
<Tooltip title='Notifications'>
<Link  to='/app/notifications' className="flex items-center relative w-[50px]">
<IoMdNotifications className='text-2xl text-blue-400'/>
  <div className="badge bg-red-500 text-white font-bold absolute right-1 top-0 p-1">+19</div>
</Link>
</Tooltip>
<div className="dropdown">
  <Tooltip title={user?.displayName}>
  <div tabIndex={0} role="button" className="m-1">
    <img src={user?.photoURL ? user.photoURL : '/logos/user.png'} className='w-[50px] h-[50px] object-cover rounded-full border-2 border-blue-500 outline-none'/>
  </div>
  </Tooltip>
  <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow right-0 mt-2">
    <li><Link to={`/app/profile`}>Profile</Link></li>
    {loading? <li><a className='font-bold'><span className="loading loading-spinner loading-md"></span></a></li> : <li onClick={signOut}><a className='font-bold'>Logout</a></li>}
  </ul>
</div>

</div>
            </nav>
  <Outlet/>
  </div>
</div>
<dialog id="my_modal_5" className="modal w-11/12 mx-auto modal-bottom sm:modal-middle">
  <div className="modal-box p-0 bg-transparent h-full shadow-none flex justify-center items-start flex-col w-full">
  <div className="flex flex-col gap-2 border rounded-xl p-3 bg-white w-full">
                <div className='flex w-full justify-between items-center'>
                <label className="px-0 input outline-0 border-0 flex items-center gap-2 border-none outline-none focus-within:outline-none h-fit">    
  <p  contentEditable={true} 
   suppressContentEditableWarning={true}
  className={`outline-none w-full max-w-[250px] cursor-text text-black font-bold  focus-within:before:content-none ${taskName?  "" : "before:content-['Task_name'] text-gray-500"}`}    
  onInput={changeTaskName} 
></p>
</label>
<form method="dialog">
        {/* if there is a button in form, it will close the modal */}
        <button className="text-2xl"><IoClose/></button>
      </form>
                </div>
                <label className="px-0 input  flex items-center gap-2  border-none outline-none focus-within:outline-none h-fit">    
  <p  contentEditable={true} 
   suppressContentEditableWarning={true}
  className={`outline-none w-full cursor-text  focus-within:before:content-none ${descripiton?  "" : "before:content-['Description'] text-gray-300"}`}    
  onInput={changeDescription} 
></p></label>
<div className="flex ">
<div className="dropdown ">
  <div tabIndex={0} role="button" className="btn m-1">Due Date</div>
  <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-30 w-52 p-2 shadow">
  <div>
    <label>Date</label> <br />
  <input type="date" className="w-full border p-2 outline-none focus-within:outline-none"/>
  </div>
 <div className="mt-2">
    <label>Time</label> <br />
 <input type="time" className="w-full border p-2 outline-none focus-within:outline-none"/>
 </div>
<button className="p-1 bg-slate-200 font-semibold rounded-md mt-3 w-full">Save</button>
  </ul>
</div>
<div className="dropdown ">
  <div tabIndex={0} role="button" className="btn m-1">Priority</div>
  <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[30] w-52 p-2 shadow">
    <li><p>Compulsory</p></li>
    <li><p>Most Important</p></li>
    <li><p>Important</p></li>
    <button className="p-1 bg-slate-200 font-semibold rounded-md mt-3 w-full">Save</button>
  </ul>
</div>
<div className="dropdown ">
  <div tabIndex={0} role="button" className="btn m-1">Reminder</div>
  <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[30] w-52 p-2 shadow right-0">
  <div className="mt-2">
    <label>Time</label> <br />
 <input type="time" className="w-full border p-2 outline-none focus-within:outline-none"/>
 </div>
<button className="p-1 bg-slate-200 font-semibold rounded-md mt-3 w-full">Save</button>
  </ul>
</div>
</div>
<div className='flex w-full justify-end gap-3'>
    <button className='btn bg-green-500 text-white'>Add Task</button>
<form method="dialog">
        {/* if there is a button in form, it will close the modal */}
        <button className="btn bg-red-500 text-white">Cancel</button>
      </form>
</div>
</div>

  </div>
  
</dialog>

        </div>
    );
};

export default Dashboard;