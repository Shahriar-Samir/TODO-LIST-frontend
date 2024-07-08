import Alert from '@mui/material/Alert';

import { useContext, useEffect, useState } from 'react';
import { BsBellFill } from 'react-icons/bs';
import useAxios from '../hooks/useAxios';
import { AuthContext } from '../Providers/AuthProvider';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import Loading from '../Home/Loading';
import {io} from 'socket.io-client'
import { formatDistanceToNow } from 'date-fns';
import { Helmet } from 'react-helmet-async';



function formatTimestamp(timestamp) {
  return formatDistanceToNow(new Date(timestamp), { addSuffix: true });
}


const Notifications = () => {
  const [today,setToday] = useState()
  const [presentTime,setPresentTime] = useState()
  const {user} = useContext(AuthContext)
  const axiosSecure = useAxios()

  const {data:notifications,isFetching} = useQuery({
        queryKey: ['NotificationsAll'],
        queryFn: ()=>
          axiosSecure.get(`/notifications/${user?.uid}`)
        .then(res=>{
            return res.data
        })
  })

  const queryClient = useQueryClient()

  useEffect(()=>{
    const socket = io('https://todo-list-backend-ku5w.onrender.com',{withCredentials:true, transports: ['websocket', 'polling']})
    socket.connect()

    socket.on('notifications', (newData)=>{
        queryClient.setQueryData(['NotificationsAll'], (oldData)=>{
          return newData
        })
    })

    
  },[])


  useEffect(()=>{
    setInterval(()=>{
        const date = new Date()
        setToday(date.toLocaleDateString())
        setPresentTime(date.toLocaleTimeString())
    },1000)
},[])

  const markAsRead = (id,number)=>{
      if(number ===1){
        document.getElementById(id+'1').showModal()
    axiosSecure.patch(`/markAsRead/${id}`)
      }
      if(number ===2){
        document.getElementById(id+'2').showModal()
    axiosSecure.patch(`/markAsRead/${id}`)
      }
  }

    if(isFetching){
      return <Loading/>
    }
   

      return (
        <div className='w-10/12 mx-auto '>
                 <Helmet>
            <title>Notifications | Check It</title>
          </Helmet>
               <div className="flex mt-5 border-b pb-3 border-black justify-end">
            <h1 className='text-3xl font-bold '>Notifications</h1>
            </div>

            <div role="tablist" className="tabs tabs-bordered mt-5">
  <input type="radio" name="my_tabs_1" role="tab" className="tab" aria-label="All"  defaultChecked />
  <div role="tabpanel" className="tab-content p-0">
  <div className='w-full mx-auto flex flex-col gap-3 mt-5'>
         {notifications?.map((item)=>{
                return <div key={item._id}>
                    {/* Open the modal using document.getElementById('ID').showModal() method */}
          <div className='p-3 border-y' role='button' onClick={()=> markAsRead(item._id,1)}>
            <div className='flex justify-between'>
            <div className='flex gap-4 items-center'>
                <BsBellFill/>
            <div>
            <p className={item?.readStatus=== false? 'text font-bold' : 'font-normal'}>{item?.title} {item?.readStatus=== false? <span className='ms-2 text-gray-500 text-xs p-1 rounded-lg bg-gray-200'>New</span> : ''}</p>
            <p className='text-sm'>{formatTimestamp(item.createdAt)}</p>
            </div>
            </div>
            </div>
          </div>
<dialog id={item._id+'1'} className="modal modal-bottom sm:modal-middle">
  <div className="modal-box  bg-gradient-to-r from-indigo-400 to-cyan-400 ">
    <h3 className="font-bold text-lg">{item.title}</h3>
    <p className="py-4">{item.description}</p>
    <div className="modal-action">
      <form method="dialog">
        {/* if there is a button in form, it will close the modal */}
        <button className="btn">Close</button>
      </form>
    </div>
  </div>
</dialog>
         
                </div>
         })}
       </div>
  </div>

  <input
    type="radio"
    name="my_tabs_1"
    role="tab"
    className="tab"
    aria-label="Unread"
    />
  <div role="tabpanel" className="tab-content">
  <div className='w-full mx-auto flex flex-col gap-3 mt-5'>
         {notifications.map((item)=>{
                if(item.readStatus === false){
                  return <div key={item._id}>
                  {/* Open the modal using document.getElementById('ID').showModal() method */}
        <div className='p-3 border-y' role='button' onClick={()=> markAsRead(item._id,2)}>
          <div className='flex justify-between'>
          <div className='flex gap-4 items-center'>
              <BsBellFill/>
          <div>
          <p className={item?.readStatus=== false? 'text font-bold' : 'font-normal'}>{item?.title} {item?.readStatus=== false? <span className='ms-2 text-gray-500 text-xs p-1 rounded-lg bg-gray-200'>New</span> : ''}</p>
          <p className='text-sm'>{formatTimestamp(item.createdAt)}</p>
          </div>
          </div>
          </div>
        </div>
<dialog id={item._id+'2'} className="modal modal-bottom sm:modal-middle">
<div className="modal-box">
  <h3 className="font-bold text-lg">{item.title}</h3>
  <p className="py-4">{item.description}</p>
  <div className="modal-action">
    <form method="dialog">
      {/* if there is a button in form, it will close the modal */}
      <button className="btn">Close</button>
    </form>
  </div>
</div>
</dialog>
       
              </div>
                }
         })}
       </div>
  </div>


</div>

        </div>
      )
};

export default Notifications;
