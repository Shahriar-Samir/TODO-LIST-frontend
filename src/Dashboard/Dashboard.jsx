import React, { useEffect, useRef, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { IoIosAdd, IoIosAddCircle } from 'react-icons/io';
import { Link, Outlet } from 'react-router-dom';
import { CiEdit } from "react-icons/ci";
import { IoMdNotifications } from "react-icons/io";

const Dashboard = () => {


    const [descripiton,setDescription] = useState()
    const [taskName,setTaskName] = useState()


    const changeDescription = (e)=>{
        setDescription(e.target.textContent)
    }
    const changeTaskName = (e)=>{
        setTaskName(e.target.textContent)
    }
  
    return (
        <div className=''>
         
        <div className="drawer lg:drawer-open flex ">
  <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
  {/* <div className="drawer-content flex flex-col items-center justify-center">

    <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">
      Open drawer
    </label>
  </div> */}
  <div className="w-1/4 h-[100vh] ">
    <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
    <ul className="menu gap-4  p-4 w-full h-full text-white bg-gradient-to-r from-emerald-400 to-cyan-400 bg-cyan-500">
      {/* Sidebar content here */}
        <div className='bg-white flex justify-between rounded-lg relative w-full'>
        <input className='p-2 outline-0 rounded-lg w-full' placeholder='search '/>
        <FaSearch className='absolute top-3 right-2'/>
        </div>
     <li onClick={()=>document.getElementById('my_modal_5').showModal()}><button className="flex items-center gap-2 text-md btn bg-green-400 border-none text-white hover:bg-green-500" > Add Task <IoIosAddCircle  className="text-2xl"/></button></li> 
      <li><Link to='/app/allTasks' className='flex justify-normal w-full'>
      <div className='flex justify-between w-full'>
      <p>All Task</p>
      <div className="badge text-xs">+10</div>
      </div>
      </Link>
      </li>
      <li><Link to='/app/today' className='flex justify-normal w-full'>
      <div className='flex justify-between w-full'>
      <p>Today</p>
      <div className="badge text-xs">+4</div>
      </div>
      </Link>
      </li>
      <li><Link to='/app/events'>Events</Link></li>
    </ul>
  </div>
  <div className='w-3/4 overflow-auto h-[100vh]'>
  <nav className='flex justify-end px-5 py-3 gap-5 top-0 sticky z-10'>
  <button className="flex items-center relative w-[50px]">
<IoMdNotifications className='text-2xl text-blue-400'/>
  <div className="badge bg-red-500 text-white font-bold absolute right-1 top-0 p-1">+19</div>
</button>
                <img src='/logos/checkit.png' className='w-[40px] h-[40px]'/>
            </nav>
  <Outlet/>
  </div>
</div>
<dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
  <div className="modal-box p-0 bg-transparent h-full shadow-none flex justify-center items-start flex-col w-full">
  <div className="flex flex-col gap-2 border rounded-xl p-3 bg-white w-full">
                <label className="px-0 input outline-0 border-0 flex items-center gap-2 border-none outline-none focus-within:outline-none h-fit">    
  <p  contentEditable={true} 
  className={`outline-none w-full cursor-text text-black font-bold  focus-within:before:content-none ${taskName?  "" : "before:content-['Task_name'] text-gray-500"}`}    
  onInput={changeTaskName} 
></p>
</label>
                <label className="px-0 input  flex items-center gap-2  border-none outline-none focus-within:outline-none h-fit">    
  <p  contentEditable={true} 
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
  <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[30] w-52 p-2 shadow">
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