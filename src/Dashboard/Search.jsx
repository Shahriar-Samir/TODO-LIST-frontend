import React, { useContext, useEffect, useState } from 'react';
import useAxios from '../hooks/useAxios';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { AuthContext } from '../Providers/AuthProvider';
import Loading from '../Home/Loading';
import { useLocation, useSearchParams } from 'react-router-dom';
import { BsBellFill } from 'react-icons/bs';
import { Reorder } from 'framer-motion';
import Task from './Task';
import { CiCalendar, CiEdit } from 'react-icons/ci';
import { MdDelete } from 'react-icons/md';
import { IoMdAlarm } from 'react-icons/io';
import { toast, ToastContainer } from 'react-toastify';
import { io } from 'socket.io-client';

const Search = () => {
    const axiosSecure = useAxios()
    const link = new URLSearchParams(useLocation().search)
    const uid = link.get('uid')
    const query = link.get('query')
    

    const {data:searchResults,isFetching,isFetched} = useQuery({
        queryKey:[query],
        initialData: [],
        enabled: !!link,
        queryFn: ()=>
            axiosSecure.get('/searchTasks',{params:{query,uid}})
            .then(res=>{
                return res.data
            })
    })

    const [updateTask,setUpdateTask] = useState('')

    const getUpdated = (value)=>{
        setUpdateTask(value)
    }
    
    const queryClient= useQueryClient()

    useEffect(()=>{
        const socket = io('http://localhost:5001',{withCredentials:true})
       socket.connect()
       socket.emit('searchTasks', query)
        socket.on('getSearchTasks', (newData)=>{
              queryClient.setQueryData([query], (oldData)=>{
                return newData
              })
        })

        return ()=>{
          socket.off('getSearchTasks')
          socket.close()
        }
      

    },[updateTask])

    
    const [items,setItems] = useState([])

    if(isFetching){
        return <Loading/>
    }

    const finishTask = (e,id)=>{
        if(e.target.checked === true)
          axiosSecure.patch(`/checkTask/${id}`)
        .then(()=>{
                  document.getElementById(id+'main').style.display = 'none'
          toast.success('Task completed')
        })
        .catch(()=>{
          toast.error('Something went wrong')
        })
  }

    return (
        <div >
            <ToastContainer/>
         {searchResults.length > 0 ? <div className='w-full mx-auto flex flex-col gap-3 mt-5'>

            <h1 className='text-center font-semibold mt-1'>Search results for: {query}</h1>
            <Reorder.Group axis="y"  values={items} onReorder={setItems} className="mt-5 flex flex-col gap-5 w-full">
      {searchResults?.map((item) => (
        <Reorder.Item id={item._id+'main'} key={item._id}  value={item} className="flex gap-2 w-full shadow-md border-black pb-2">
        <Task getUpdated={getUpdated}  id={item._id} task={item}/>
          <div className="form-control">
  <label className="cursor-pointer label">

    <input type="checkbox" defaultChecked={false} onClick={(e)=>finishTask(e,item._id)} className="checkbox rounded-full" />
  </label>
</div>
<div className="w-full" role="button">
    <div className="flex justify-between items-center">
    <h1 className="font-bold">{item.name}</h1>
    <div className="flex gap-4 items-center text-2xl pe-5">
    <div className="tooltip" data-tip="Edit Task" onClick={()=>{
          document.getElementById(item._id)?.showModal()
       
       }}>
    <CiEdit className="text-yellow-600"/>
</div>
    <div className="tooltip" data-tip="Delete Task">
    <MdDelete className="text-red-500" onClick={()=>document.getElementById(item._id+'delete').showModal()}/>
    <dialog id={item._id+'delete'} className="modal modal-bottom sm:modal-middle ">
  <div className="modal-box  bg-gradient-to-r from-indigo-400 to-cyan-400 ">
    <h3 className="font-bold text-lg">Are you sure you want to delete this task?</h3>
    <p className="py-2"></p>
    <div className="modal-action ">
      
      <form method="dialog" className="flex justify-center w-full gap-5">
      <button className="btn bg-red-500 text-white border-none" onClick={()=>deleteTask(item._id)}>Delete</button>
        <button className="btn">Cancel</button>
      </form>
    </div>
  </div>
</dialog>
</div>

    </div>
    </div>
    <p className="">{item.description}</p>
    
    <div className="flex gap-4">
    <div className="tooltip" data-tip="Due date">
    <div className="flex items-center gap-1">
    <CiCalendar />
    <p className="text-sm mt-1">{item?.dueDate === 'Invalid Date' ? 'No selected' : item?.dueDate}</p> 
    </div>
</div>
    <div className="tooltip" data-tip="Due Time">
    <div className="flex items-center gap-1">
    <IoMdAlarm/>
    <p className="text-sm mt-1">{item?.dueTime===''? 'No selected' : item?.dueTime}</p> 
    </div>
</div>

    </div>
</div>
        </Reorder.Item>
      ))}
    </Reorder.Group>
            
         </div> : <div className='flex w-full justify-center items-center h-[100vh]'>
                        <h1 className='text-xl font-bold'>No results found for {}</h1>
            </div>}
       </div>
    );
};

export default Search;