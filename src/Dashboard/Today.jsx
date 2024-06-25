import { useEffect, useState } from "react";
import { IoIosAdd, IoIosAddCircle } from "react-icons/io";
import "react-datepicker/dist/react-datepicker.css";

const Today = () => {

    const [today,setToday] = useState()
    const [presentTime,setPresentTime] = useState()
    const [icon,setIcon] = useState(false)


    const [descripiton,setDescription] = useState()
    const [taskName,setTaskName] = useState()


    const changeDescription = (e)=>{
        setDescription(e.target.textContent)
    }
    const changeTaskName = (e)=>{
        setTaskName(e.target.textContent)
    }

    const mouseIn = ()=>{
        setIcon(true)
    }
    const mouseOut = ()=>{
        setIcon(false)
    }

    useEffect(()=>{
        setInterval(()=>{
            const date = new Date()
            setToday(date.toLocaleDateString())
            setPresentTime(date.toLocaleTimeString())
        },1000)
    },[])

    return (
        <div className='w-10/12 mx-auto'>
            
            <div className="flex mt-5 border-b pb-3 border-black justify-between">
            <div>
            <h1 className=''>{today}</h1>
            <h1 className='font-sans text-xl font-bold'>{presentTime}</h1>
            </div>
            <h1 className='text-3xl font-bold '>Today</h1>
            </div>
            <div className='mt-5'>
                <button className="flex items-center gap-2  text-md" onMouseEnter={mouseIn} onMouseLeave={mouseOut}>{icon ?<IoIosAddCircle  className="text-green-500 text-2xl"/> : <IoIosAdd  className="text-green-500 text-2xl"/>} Add Task</button> 
                <div className="flex flex-col gap-2 border rounded-md p-3">
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
<div className="flex">
<div className="dropdown">
  <div tabIndex={0} role="button" className="btn m-1">Due Date</div>
  <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-10 w-52 p-2 shadow">
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
<div className="dropdown">
  <div tabIndex={0} role="button" className="btn m-1">Priority</div>
  <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
    <li><p>Compulsory</p></li>
    <li><p>Most Important</p></li>
    <li><p>Important</p></li>
    <button className="p-1 bg-slate-200 font-semibold rounded-md mt-3 w-full">Save</button>
  </ul>
</div>
<div className="dropdown">
  <div tabIndex={0} role="button" className="btn m-1">Reminder</div>
  <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
  <div className="mt-2">
    <label>Time</label> <br />
 <input type="time" className="w-full border p-2 outline-none focus-within:outline-none"/>
 </div>
<button className="p-1 bg-slate-200 font-semibold rounded-md mt-3 w-full">Save</button>
  </ul>
</div>
</div>
<div className='flex w-full justify-end gap-3'>
    <button className='btn bg-green-400 text-white'>Add Task</button>
    <button className="btn bg-red-500 text-white">Cancel</button>
</div>
</div>

                </div>
            </div>

    );
};

export default Today;