import Alert from '@mui/material/Alert';

import { useContext, useEffect, useState } from 'react';
import { BsBellFill } from 'react-icons/bs';
import useAxios from '../hooks/useAxios';
import { AuthContext } from '../Providers/AuthProvider';
import { useQuery } from '@tanstack/react-query';
import Loading from '../Home/Loading';



const Notifications = () => {
  const [today,setToday] = useState()
  const [presentTime,setPresentTime] = useState()
  const {user} = useContext(AuthContext)
  const axiosSecure = useAxios()

  const {data:notifications,isFetching} = useQuery({
        queryKey: ['notifications'],
        queryFn: ()=>
          axiosSecure.get(`/notifications/${user?.uid}`)
        .then(res=>{
            return res.data
        })
  })



  useEffect(()=>{
    setInterval(()=>{
        const date = new Date()
        setToday(date.toLocaleDateString())
        setPresentTime(date.toLocaleTimeString())
    },1000)
},[])

  const markAsRead = (id)=>{
    document.getElementById(id).showModal()
    axiosSecure.patch(`/markAsRead/${id}`)
  }

    if(isFetching){
      return <Loading/>
    }
   

      return (
        <div className='w-10/12 mx-auto '>
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
          <div className='p-3 border-y' role='button' onClick={()=> markAsRead(item._id)}>
            <div className='flex justify-between'>
            <div className='flex gap-4 items-center'>
                <BsBellFill/>
            <div>
            <p className={item?.readStatus=== false? 'text font-bold' : 'font-normal'}>{item?.title} {item?.readStatus=== false? <span className='ms-2 text-gray-500 text-xs p-1 rounded-lg bg-gray-200'>New</span> : ''}</p>
            <p className='text-sm'>2 hours ago</p>
            </div>
            </div>
            </div>
          </div>
<dialog id={item._id} className="modal modal-bottom sm:modal-middle">
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
        <div className='p-3 border-y' role='button' onClick={()=> markAsRead(item._id)}>
          <div className='flex justify-between'>
          <div className='flex gap-4 items-center'>
              <BsBellFill/>
          <div>
          <p className={item?.readStatus=== false? 'text font-bold' : 'font-normal'}>{item?.title} {item?.readStatus=== false? <span className='ms-2 text-gray-500 text-xs p-1 rounded-lg bg-gray-200'>New</span> : ''}</p>
          <p className='text-sm'>2 hours ago</p>
          </div>
          </div>
          </div>
        </div>
<dialog id={item._id} className="modal modal-bottom sm:modal-middle">
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
