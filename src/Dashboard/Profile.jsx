
import React, { PureComponent, useState } from 'react';
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';


const data = [
    {
      name: 'Tasks',
      'Finished': 50,
      'Upcoming': 10,
      'Late Finished': 25,
    },

  ];



 const Profile = ()=>{

  const [changeName,setChangeName] = useState(false)
  const openChangeName = ()=>{
        setChangeName(true)
        closeChangeImage()
        closeChangeMobile()
  }
  const closeChangeName = ()=>{
        setChangeName(false)
  }
  const [changeMobile,setChangeMobile] = useState(false)

  const openChangeMobile = ()=>{
        setChangeMobile(true)
        closeChangeImage()
        closeChangeName()
  }
  const closeChangeMobile = ()=>{
    setChangeMobile(false)
}

  const [changeImage,setChangeImage] = useState(false)

  const openChangeImage = ()=>{
        setChangeImage(true)
        closeChangeName()
        closeChangeMobile()
  }
  const closeChangeImage = ()=>{
    setChangeImage(false)
}



    return (
    
        <>
          <div className="flex mt-5 border-b pb-3 border-black justify-end w-11/12 mx-auto" >
            <h1 className='text-3xl font-bold '>Profile</h1>
            </div>
                <div className='mt-5 flex items-center justify-center flex-col w-10/12 max-w-[400px] mx-auto gap-5'>
                  
           <div className='flex gap-10 items-center w-full justify-center'>
           <img src='' className='w-[80px] h-[80px] rounded-full'/>
          <div>
          <p>Shahriar Samir</p>
          <p>shabusiness035@gmail.com</p>
          </div>
           </div>
           <div className='flex gap-5 items-center w-full justify-between'>
            {
              changeName?
            <>
            <p contentEditable={true}  suppressContentEditableWarning={true} className='border w-full py-3 ps-2'>User name</p>
            <div className='flex gap-4'>
            <button className='btn bg-green-500 text-white'>Save</button>
            <button className='btn bg-red-500 text-white' onClick={closeChangeName}>Cancel</button>
            </div>
            </>
            :
            <>
            <p>User name</p>
            <button className='btn' onClick={openChangeName}>Change User Name</button>
            </>
            }
           </div>
           <div className='flex gap-5 items-center w-full justify-between'>
           {
              changeMobile?
            <>
            <p contentEditable={true}  suppressContentEditableWarning={true} className='border w-full py-3 ps-2'>User Mobile</p>
            <div className='flex gap-4'>
            <button className='btn bg-green-500 text-white'>Save</button>
            <button className='btn bg-red-500 text-white' onClick={closeChangeMobile}>Cancel</button>
            </div>
            </>
            :
            <>
            <p>User Mobile</p>
            <button className='btn' onClick={openChangeMobile}>Change Phone Number</button>
            </>
            }
           </div>
           <div className='flex gap-5 items-center w-full justify-between'>
           {
              changeImage?
            <>
            <p contentEditable={true}  suppressContentEditableWarning={true} className='border w-full py-3 ps-2'>Photo URL</p>
            <div className='flex gap-4'>
            <button className='btn bg-green-500 text-white'>Save</button>
            <button className='btn bg-red-500 text-white' onClick={closeChangeImage}>Cancel</button>
            </div>
            </>
            :
            <>
            <p>Photo URL</p>
            <button className='btn' onClick={openChangeImage}>Change Profile Image</button>
            </>
            }
           </div>
           <div className='flex gap-5 items-center w-full justify-between'>
            <p contentEditable={true}  suppressContentEditableWarning={true}>Password</p>
            <button className='btn'>Change Password</button>
           </div>
        </div>
        <ResponsiveContainer width="50%" height="50%" className='flex mx-auto mt-10'>
        <BarChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="Finished" fill="#7BEE99" activeBar={<Rectangle fill="#7BEE99"  />} />
          <Bar dataKey="Upcoming" fill="#7BC0EE" activeBar={<Rectangle fill="#7BC0EE"  />} />
          <Bar dataKey="Late Finished" fill="#EE7B7B" activeBar={<Rectangle fill="#EE7B7B"  />} />
        </BarChart>
      
      </ResponsiveContainer>

      </>
  
    );

}
export default Profile