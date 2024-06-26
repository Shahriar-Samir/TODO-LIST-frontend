import { Reorder } from 'framer-motion';
import React, { useState } from 'react';
import Task from '../Dashboard/Task';
import { CiCalendar, CiEdit } from 'react-icons/ci';
import { MdDelete } from 'react-icons/md';
import { IoMdAlarm } from 'react-icons/io';

const AllTasks = () => {
    const [items, setItems] = useState([0, 1, 2, 3])
    return (
        <div className='mt-10'>
              <div className="flex mt-5 border-b pb-3 border-black justify-end w-full">
            <h1 className='text-3xl font-bold '>Up Comming Tasks</h1>
            <Reorder.Group axis="y"  values={items} onReorder={setItems} className="mt-5 flex flex-col gap-5 w-full">
      {items.map((item,index) => (
        <Reorder.Item key={item}  value={item} className="flex gap-2 w-full border-b pb-2">
        <Task id={index}/>
          <div className="form-control">
  <label className="cursor-pointer label">

    <input type="checkbox" defaultChecked={false} onClick={(event)=>{
      event.stopPropagation();
    }} className="checkbox rounded-full" />
  </label>
</div>
<div className="w-full" role="button" onClick={()=>{
          document.getElementById(index)?.showModal()
       
       }}>
    <div className="flex justify-between items-center">
    <h1 className="font-bold">Title</h1>
    <div className="flex gap-4 items-center text-2xl">
    <div className="tooltip" data-tip="Edit Task">
    <CiEdit className="text-yellow-600"/>
</div>
    <div className="tooltip" data-tip="Delete Task">
    <MdDelete className="text-red-500"/>
</div>

    </div>
    </div>
    <p className="">Description of the title</p>
    
    <div className="flex gap-4">
    <div className="tooltip" data-tip="Due date">
    <div className="flex items-center gap-1">
    <CiCalendar />
    <p className="text-sm mt-1"> 28 jul</p> 
    </div>
</div>
    <div className="tooltip" data-tip="Due Time">
    <div className="flex items-center gap-1">
    <IoMdAlarm/>
    <p className="text-sm mt-1"> 11:20 AM</p> 
    </div>
</div>

    </div>
</div>
        </Reorder.Item>
      ))}
    </Reorder.Group>
            </div>
        </div>
    );
};

export default AllTasks;