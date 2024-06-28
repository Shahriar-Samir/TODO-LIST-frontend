import React, { useState } from 'react';
import { CiCalendar } from 'react-icons/ci';
import { IoMdAlarm } from 'react-icons/io';
import { IoClose, IoNotificationsOutline } from "react-icons/io5";
import Select from 'react-select';
import { BsThreeDots } from "react-icons/bs";
import { useLocation } from 'react-router-dom';

const options = [
    { value: 'Most Important', label: 'Most Important' },
    { value: 'Important', label: 'Important' },
    { value: 'Normal', label: 'Normal' },
  ];

const Task = ({id,task}) => {
  const location = useLocation()
    const [editSave,setEditSave] = useState(false)
    const {name,description,dueDate,dueTime,reminderTime} = task

    const showButtons = ()=>{
            setEditSave(true)
    }
    const hideButtons = ()=>{
            setEditSave(false)
    }

    return (
        <div className='cursor-auto'>
    <dialog id={id} className="modal">
      
  <div className="modal-box h-full flex justify-center items-center shadow-none bg-transparent p-0">
    
<div className='bg-white p-4 w-full rounded-lg'>
<div className='flex justify-between items-center gap-10'>
<h3 className="font-bold text-lg outline-none border-none"  suppressContentEditableWarning={true} contentEditable={true} onFocus={showButtons} onBlur={hideButtons}>{name}</h3>

<div className='flex items-center'>
<div className="dropdown">
  <div tabIndex={0} role="button" className="m-1"><BsThreeDots  className='w-[50px] text-xl'/></div>
  <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-[120px] p-2 shadow right-0">
    <li><a>Duplicate</a></li>
    <li><a>Delete</a></li>
  </ul>
</div>
<form method="dialog">
        {/* if there is a button in form, it will close the modal */}
        <button className="text-2xl"><IoClose/></button>
      </form>
</div>
</div>
    <p className="mt-4 mb-4 outline-none border-none" onFocus={showButtons} onBlur={hideButtons} contentEditable={true}  suppressContentEditableWarning={true}>{description? description : 'write description'}</p>
   {
    editSave?  <div className='flex w-full justify-end gap-3'>
    <button className='btn bg-green-500 text-white'>Save</button>
<form method="dialog">
        {/* if there is a button in form, it will close the modal */}
        <button className="btn bg-red-500 text-white">Cancel</button>
      </form>
      
      
</div> : ''
   }
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
       <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
       <div>
         {location.pathname==='/app/allTasks'? <>
          <label>Date</label> <br />
          <input type="date" className="w-full border p-2 outline-none focus-within:outline-none"/>
          </>
          :
          <>
          <label>Today</label> <br />
          </>}
       </div>
      <div className="mt-2">
         <label>Time</label> <br />
      <input type="time" className="w-full border p-2 outline-none focus-within:outline-none"/>
      </div>
     <button className="p-1 bg-slate-200 font-semibold rounded-md mt-3 w-full">Save</button>
       </ul>
     </div>
     <div className="dropdown">
     <div className="tooltip" data-tip="Reminder">
       <div tabIndex={0} role="button" className="m-1 flex items-center text-sm gap-1"><IoNotificationsOutline />{reminderTime? reminderTime : 'Select Reminder Time'}</div>
       </div>
       <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
       <div className="mt-2">
         <label>Time</label> <br />
      <input type="time" className="w-full border p-2 outline-none focus-within:outline-none"/>
      </div>
     <button className="p-1 bg-slate-200 font-semibold rounded-md mt-3 w-full">Save</button>
       </ul>
     </div>
         </div>
         <div>
         <Select
        options={options}
        defaultValue={task?.priority? priority : 'Select priority'}
      />
         </div>
 </div>
</div>
  </div>

</dialog>
        </div>
    );
};
  
export default Task;