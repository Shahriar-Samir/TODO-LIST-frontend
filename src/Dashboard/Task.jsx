import React, { useContext, useEffect, useRef, useState } from 'react';
import { CiCalendar } from 'react-icons/ci';
import { IoMdAlarm } from 'react-icons/io';
import { IoClose, IoNotificationsOutline } from "react-icons/io5";
import Select from 'react-select';
import { BsThreeDots } from "react-icons/bs";
import { useLocation } from 'react-router-dom';
import useAxios from '../hooks/useAxios';
import { AuthContext } from '../Providers/AuthProvider';
import {toast, ToastContainer} from 'react-toastify'
const options = [
    { value: 'Most Important', label: 'Most Important' },
    { value: 'Important', label: 'Important' },
    { value: 'Normal', label: 'Normal' },
  ];

const Task = ({id,task,getUpdated}) => {
  const nameRef = useRef(null)
  const descriptionRef = useRef(null)
  const timeRef = useRef(null)
  const dateRef = useRef(null)
  const reminderRef = useRef(null)
  const priorityRef = useRef(null)

  const location = useLocation()
    const [editSave,setEditSave] = useState(false)
    const {name,description,dueDate,dueTime,reminderTime,_id,priority} = task
    const [dateDefault,setDateDefault] = useState()



    useEffect(()=>{
        if(dueDate === 'Invalid Date'){
            setDateDefault()
        }
        else{


          // Parse the date string
          let date = new Date(dueDate);
  
          // Extract the components of the date
          let year = date.getFullYear();
          let month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based, so add 1
          let day = String(date.getDate()).padStart(2, '0');
  
          // Format the date in YYYY-MM-DD format
          let formattedDate = `${year}-${month}-${day}`;
          setDateDefault(formattedDate)
        }
    },[])

    const axiosSecure = useAxios()
    const {user} = useContext(AuthContext)

    const showButtons = ()=>{
            setEditSave(true)
    }
    const hideButtons = ()=>{
            setEditSave(false)
    }


   
    const updateTask = ()=>{
      const nameValue = nameRef.current.textContent
      const descriptionValue = descriptionRef.current.textContent
      const convertedDueDate =location.pathname==='/app/allTasks'?  new Date(dateRef.current.value) : ''
      const dueDateValue =location.pathname==='/app/allTasks'? convertedDueDate?.toDateString() : dueDate
      const dueTimeValue = timeRef.current.value
      const convertedDueDateTime = location.pathname==='/app/allTasks'? new Date(`${dateRef.current.value}T${dueTimeValue}`) :  new Date(`${dueDate} ${dueTimeValue}`)
      const dueDateTime = convertedDueDateTime.toUTCString()
      const reminderTimeValue = reminderRef.current.value
      const reminderDateTimeConvert = location.pathname==='/app/allTasks'? new Date(`${dateRef.current.value}T${reminderTimeValue}`) :  new Date(`${dueDate} ${reminderTimeValue}`)
      const reminderDateTime = reminderDateTimeConvert.toUTCString()
      const priorityValue = priorityRef?.current?.props?.value?.value
      const task = {uid:user?.uid,name:nameValue,description:descriptionValue,dueDateTime, reminderDateTime ,dueDate:dueDateValue,dueTime:dueTimeValue,priority:priorityValue,reminderTime:reminderTimeValue}
       axiosSecure.patch(`/updateUserTask/${_id}`, task)
      .then(()=>{
        if(location.pathname === '/app/today' || location.pathname === '/app/allTasks'){
          toast.success('Updated Task')
          hideButtons()
        }
        else{
          getUpdated(nameValue+descriptionValue+dueDateValue+dueTimeValue+reminderTimeValue+priorityValue)
          toast.success('Updated Task')
          hideButtons()
        }
       
      })
      .catch((err)=>{
        toast.error('Something went wrong')
      })
      
    }
    const duplicate = ()=>{
      const status = 'upcoming'
      const task = {uid:user?.uid,name,description,dueDate,dueTime,priority,reminderTime,status}
      if(!name){
        toast.error('Task name required')
      }
      else{
       axiosSecure.post('/addUserTask', task)
      .then(()=>{
        toast.success('New Duplicate Task Added')
      })
      .catch(()=>{
        toast.error('Something went wrong')
      })
      }
    }

    
    const deleteTask = ()=>{
      document.getElementById(_id).style.display = 'none'
      axiosSecure.delete(`/deleteUserTask/${_id}`)
      .then(()=>{
        toast.success("Task has been deleted")       
        document.getElementById(_id+'main').style.display = 'none'

     })
}


    return (
        <div className='cursor-auto'>
    <dialog id={id} className="modal ">
      
  <div className="modal-box  h-full flex justify-center items-center shadow-none bg-transparent p-0">
    
<div className='bg-gradient-to-r from-indigo-400 to-cyan-400 text-white p-4 w-full rounded-lg'>
<div className='flex justify-between items-center gap-10'>
<h3 className="font-bold text-lg outline-none border-none"  suppressContentEditableWarning={true} contentEditable={true} onFocus={showButtons}  ref={nameRef}>{name}</h3>

<div className='flex items-center'>
<div className="dropdown">
  <div tabIndex={0} role="button" className="m-1"><BsThreeDots  className='w-[50px] text-xl'/></div>
  <ul tabIndex={0} className="dropdown-content menu bg-gradient-to-r from-indigo-400 to-cyan-400 rounded-box z-[1] w-[120px] p-2 shadow right-0">
    <li onClick={duplicate}><a>Duplicate</a></li>
    
<form method='dialog'>
<li onClick={deleteTask}><a>Delete</a></li>
</form>


  </ul>
</div>
<form method="dialog">
        {/* if there is a button in form, it will close the modal */}
        <button className="text-2xl"><IoClose/></button>
      </form>
</div>
</div>
    <p className="mt-4 mb-4 outline-none border-none" onFocus={showButtons} contentEditable={true}  suppressContentEditableWarning={true} ref={descriptionRef}>{description? description : 'write description'}</p>
 <div className='flex justify-between items-center'>
 <div className='flex flex-col'>
         
         <div className="dropdown">
       <div tabIndex={0} role="button" className="m-1">
       <div className="flex gap-4">
         <div className="tooltip" data-tip="Due date">
         <div className="flex items-center gap-1">
         <CiCalendar />
         <p className="text-sm mt-1">{dueDate? dueDate : 'select due date'}</p> 
         </div>
     </div>
         <div className="tooltip" data-tip="Due Time">
         <div className="flex items-center gap-1">
         <IoMdAlarm/>
         <p className="text-sm mt-1">{dueTime? dueTime : 'select due time'}</p> 
         </div>
     </div>
         </div>
       </div>
       <ul tabIndex={0} className="dropdown-content menu bg-gradient-to-r from-indigo-400 to-cyan-400 rounded-box z-[1] w-52 p-2 shadow">
       <div>
         {location.pathname==='/app/allTasks'? <>
          <label>Date</label> <br />
          <input onFocus={showButtons} type="date" defaultValue={dateDefault} ref={dateRef} className="w-full border p-2 outline-none focus-within:outline-none bg-transparent"/>
          </>
          :
          <>
          <label>Today</label> <br />
          </>}
       </div>
      <div className="mt-2">
         <label>Time</label> <br />
      <input onFocus={showButtons} type="time" ref={timeRef} defaultValue={dueTime} className="w-full border p-2 outline-none focus-within:outline-none bg-transparent"/>
      </div>
     
       </ul>
     </div>
     <div className="dropdown">
     <div className="tooltip" data-tip="Reminder">
       <div tabIndex={0} role="button" className="m-1 flex items-center text-sm gap-1"><IoNotificationsOutline />{reminderTime? reminderTime : 'Select Reminder Time'}</div>
       </div>
       <ul tabIndex={0} className="dropdown-content menu bg-gradient-to-r from-indigo-400 to-cyan-400 rounded-box z-[1] w-52 p-2 shadow">
       <div className="mt-2">
         <label>Time</label> <br />
      <input onFocus={showButtons} type="time" ref={reminderRef} defaultValue={reminderTime} className="w-full border p-2 outline-none focus-within:outline-none bg-transparent"/>
      </div>
       </ul>
     </div>
         </div>
         <div className='flex flex-row-reverse items-center gap-2'>
         <Select
         onFocus={showButtons}
         ref={priorityRef}
        options={options}
        className='text-sm text-black '
      />
      <h1 className='text-sm'>{priority}</h1>
         </div>
         
 </div>
 {
    editSave?  <div className='flex w-full justify-end gap-3 '>
    <button className='btn  bg-gradient-to-r from-indigo-400 to-cyan-400 border-none text-white shadow-lg hover:bg-gradient-to-r hover:from-indigo-500 hover:to-cyan-500' onClick={updateTask}>Save</button>
        <button className="btn bg-red-500 border-none text-white" onClick={hideButtons}>Cancel</button>
      
      
</div> : ''
   }
</div>
  </div>

</dialog>
        </div>
    );
};
  
export default Task;