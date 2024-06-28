
import { useQuery } from '@tanstack/react-query';
import React, { PureComponent, useContext, useRef, useState } from 'react';
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import useAxios from '../hooks/useAxios';
import { AuthContext } from '../Providers/AuthProvider';
import Loading from '../Home/Loading';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useMediaQuery } from '@mui/material';


const data = [
    {
      name: 'Tasks',
      'Finished': 50,
      'Upcoming': 10,
      'Late Finished': 25,
    },

  ];


 

 const Profile = ()=>{
  const axiosSecure = useAxios()
  const md = useMediaQuery('(min-width:768px)');
  const {user} = useContext(AuthContext)

  const {data:userData,isFetching} = useQuery({
    queryKey: [user?.uid],
    queryFn: ()=> 
      axiosSecure.get(`/user/${user?.uid}`)
      .then(res=>{
         return res.data
      })

  })

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

  const nameRef = useRef(null)
  const phoneRef = useRef(null)
  const photoRef = useRef(null)
  const navigate = useNavigate()

  const updateDisplayName = ()=>{
        const name = nameRef.current.textContent
        axiosSecure.patch('/updateUser',{displayName:name,phoneNumber:userData?.phoneNumber,photoURL:userData?.photoURL, uid:userData?.uid})
        .then(()=>{  
          toast.success('User name updated!')
          closeChangeName()
          setTimeout(()=>{
             navigate(0)
          },1000)
        })
        .catch(()=>{
          toast.error('something went wrong')
        })
  }
  const updatePhone = ()=>{
         const phone = phoneRef.current.textContent
         const isPhoneNumber = /^\d+$/.test(phone)
         if(!isPhoneNumber){
          toast.error('Invalid phone number')
        }
        else{
         axiosSecure.patch('/updateUser',{displayName:userData?.displayName,phoneNumber:phone,photoURL:userData?.photoURL, uid:userData?.uid})
       .then(()=>{  
         toast.success('User Phone Number updated!')
         closeChangeMobile()
         setTimeout(()=>{
            navigate(0)
         },1000)
       })
       .catch(()=>{
         toast.error('something went wrong')
       })
        }
        
  }
  const updatePhoto = ()=>{
    const photo = photoRef.current.textContent
    axiosSecure.patch('/updateUser',{displayName:userData?.displayName,phoneNumber:userData?.phoneNumber,photoURL:photo, uid:userData?.uid})
    .then(()=>{  
      toast.success('Photo updated!')
      closeChangeName()
      setTimeout(()=>{
         navigate(0)
      },1000)
    })
    .catch(()=>{
      toast.error('something went wrong')
    })
  }

  if(isFetching){
    return <Loading/>
  }

    return (
    
        <>
        <ToastContainer/>
          <div className="flex mt-5 border-b pb-3 border-black justify-end w-11/12 mx-auto" >
            <h1 className='text-3xl font-bold '>Profile</h1>
            </div>
                <div className='mt-5 flex items-center justify-center flex-col w-10/12 max-w-[400px] mx-auto gap-5'>
                  
           <div className='flex gap-10 items-center w-full justify-center'>
           <img src={user?.photoURL ? user.photoURL : '/logos/user.png'} className='w-[80px] h-[80px] rounded-full object-cover'/>
          <div>
          <p>{userData?.displayName}</p>
          <p>{userData?.email}</p>
          </div>
           </div>
           <div className='flex gap-5 items-center w-full justify-between'>
            {
              changeName?
            <>
            <p contentEditable={true}  suppressContentEditableWarning={true} className='border w-full py-3 ps-2 text-sm' ref={nameRef}>{userData?.displayName}</p>
            <div className='flex gap-4'>
            <button className='btn  bg-green-500 text-white' onClick={updateDisplayName}>Save</button>
            <button className='btn bg-red-500 text-white' onClick={closeChangeName}>Cancel</button>
            </div>
            </>
            :
            <>
            <p className='text-sm'><span className='font-bold'>Name</span>: {userData?.displayName}</p>
            <button className='btn bg-white' onClick={openChangeName}>Change User Name</button>
            </>
            }
           </div>
           <div className='flex gap-5 items-center w-full justify-between'>
           {
              changeMobile?
            <>
            <p contentEditable={true}  suppressContentEditableWarning={true} className='border w-full py-3 ps-2 text-sm' ref={phoneRef}>{userData?.phoneNumber}</p>
            <div className='flex gap-4'>
            <button className='btn  bg-green-500 text-white' onClick={updatePhone}>Save</button>
            <button className='btn  bg-red-500 text-white' onClick={closeChangeMobile}>Cancel</button>
            </div>
            </>
            :
            <>
            <p className='text-sm'><span className='font-bold'>Phone: </span>{userData?.phoneNumber ? userData.phoneNumber : 'Not Provided'}</p>
            <button className='btn bg-white' onClick={openChangeMobile}>Change Phone Number</button>
            </>
            }
           </div>
           <div className='flex gap-5 items-center w-full justify-between'>
           {
              changeImage?
            <>
            <p contentEditable={true}  suppressContentEditableWarning={true} className='border w-full py-3 ps-2 text-sm' ref={photoRef}>{userData?.photoURL}</p>
            <div className='flex gap-4'>
            <button className='btn  bg-green-500 text-white' onClick={updatePhoto}>Save</button>
            <button className='btn  bg-red-500 text-white' onClick={closeChangeImage}>Cancel</button>
            </div>
            </>
            :
            <>
            <p className='text-sm'><span className='font-bold'>Photo URL: </span>{userData?.photoURL ? `${userData?.photoURL.slice(0,14)}...` : 'Not Provided'}</p>
            <button className='btn bg-white' onClick={openChangeImage}>Change Profile Image</button>
            </>
            }
           </div>
           <div className='flex gap-5 items-center w-full justify-between'>
            <p contentEditable={true}  suppressContentEditableWarning={true}>Password</p>
            <button className='btn bg-white'>Change Password</button>
           </div>
        </div>
        <ResponsiveContainer width={md? "50%" : "100%"} height="50%" className='flex mx-auto mt-10 '>
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