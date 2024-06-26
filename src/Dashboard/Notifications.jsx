import Alert from '@mui/material/Alert';

import { useEffect, useState } from 'react';
import { BsBellFill } from 'react-icons/bs';



const Notifications = () => {
  const [today,setToday] = useState()
  const [presentTime,setPresentTime] = useState()

  useEffect(()=>{
    setInterval(()=>{
        const date = new Date()
        setToday(date.toLocaleDateString())
        setPresentTime(date.toLocaleTimeString())
    },1000)
},[])


      return (
        <div className='w-10/12 mx-auto '>
               <div className="flex mt-5 border-b pb-3 border-black justify-end">
            <h1 className='text-3xl font-bold '>Notifications</h1>
            </div>

            <div role="tablist" className="tabs tabs-bordered mt-5">
  <input type="radio" name="my_tabs_1" role="tab" className="tab" aria-label="All"  defaultChecked />
  <div role="tabpanel" className="tab-content p-0">
  <div className='w-full mx-auto flex flex-col gap-3 mt-5'>
         {[1,2,3,4].map((item)=>{
                return <div>
                    {/* Open the modal using document.getElementById('ID').showModal() method */}
          <div className='p-3 border-y' role='button' onClick={()=>document.getElementById('my_modal_5').showModal()}>
            <div className='flex justify-between'>
            <div className='flex gap-4 items-center'>
                <BsBellFill/>
            <div>
            <p className='font-bold'>This is a success Alert.</p>
            <p className='text-sm'>2 hours ago</p>
            </div>
            </div>
            <input type='radio'/>
            </div>
          </div>
<dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
  <div className="modal-box">
    <h3 className="font-bold text-lg">Hello!</h3>
    <p className="py-4">Press ESC key or click the button below to close</p>
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
         {[1,2,3,4].map((item)=>{
                return <div>
                        {/* Open the modal using document.getElementById('ID').showModal() method */}
          <div className='p-3 border-y' role='button' onClick={()=>document.getElementById('my_modal_4').showModal()}>
            <div className='flex justify-between'>
            <div className='flex gap-4 items-center'>
                <BsBellFill/>
            <div>
            <p className='font-bold'>This is a success Alert.</p>
            <p className='text-sm'>2 hours ago</p>
            </div>
            </div>
            <input type='radio'/>
            </div>
          </div>
<dialog id="my_modal_4" className="modal modal-bottom sm:modal-middle">
  <div className="modal-box">
    <h3 className="font-bold text-lg">Hello!</h3>
    <p className="py-4">Press ESC key or click the button below to close</p>
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


</div>

        </div>
      )
};

export default Notifications;
