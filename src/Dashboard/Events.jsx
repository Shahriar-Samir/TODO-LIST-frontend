
import Paper from '@mui/material/Paper';
import { ViewState, WeekView } from '@devexpress/dx-react-scheduler';
import {
  Scheduler,
  MonthView,
  Toolbar,
  DateNavigator,
  Appointments,
  TodayButton,

} from '@devexpress/dx-react-scheduler-material-ui';
import { useContext, useEffect, useRef, useState } from 'react';
import AllTasks from '../Components/AllTasks';
import { CiCalendar } from 'react-icons/ci';
import useAxios from '../hooks/useAxios';
import { IoClose } from 'react-icons/io5';
import Select from 'react-select';
import { AuthContext } from '../Providers/AuthProvider';
import { toast, ToastContainer } from 'react-toastify';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import Loading from '../Home/Loading';
import {io} from 'socket.io-client'



const limitAppointments = (appointments, limitPerDay = 2) => {
 


  // Group appointments by day
  const groupedAppointments = appointments.reduce((acc, appointment) => {
    const dateKey = appointment.startDate.toDateString()
    acc[dateKey] = acc[dateKey] || [];
    acc[dateKey].push(appointment);
    return acc;
  }, {});

  // Create a new array with limited appointments and "+X more" indicator if needed
  const limitedAppointments = Object.values(groupedAppointments).flatMap(dayAppointments => {
    if (dayAppointments.length > limitPerDay) {
      // Sort appointments by startDate if necessary
      dayAppointments.sort((a, b) => a.startDate - b.startDate);

      // Take the first `limitPerDay` appointments
      const limited = dayAppointments.slice(0, limitPerDay);

      // Create a "+X more" appointment
      const moreCount = dayAppointments.length - limitPerDay;
      const moreAppointment = {
        id: `more-${dayAppointments[0].startDate.toDateString()}`,
        title: `+${moreCount} more`,
        startDate: dayAppointments[0].startDate,
        endDate: dayAppointments[0].endDate,
        more: true, // Ensure more property is set to true
      };

      return [...limited, moreAppointment];
    }

    return dayAppointments;
  });

  return limitedAppointments;
};




const Events = () => {
  
  const axiosSecure = useAxios()
  const {user} = useContext(AuthContext)
  
  const {data:allTasks,isFetching} = useQuery({
    queryKey: ['allTasks'],
    initialData:[],
    queryFn: ()=>
      axiosSecure.get(`/userTasksAllEvents/${user?.uid}`)
    .then(res=>{
      return res.data
    })
  })
  const {data:tasksAmount,isFetching2} = useQuery({
    queryKey: ['tasksAmount'],
    initialData:{},
    queryFn: ()=> 
      axiosSecure.get(`/userTasksAllAmounts/${user?.uid}`)
      .then(res=>{
         return res.data
      })

  })
  const queryClient = useQueryClient()

  useEffect(()=>{ 
        const socket = io('http://localhost:5001', {withCredentials:true})
        socket.connect()
        socket.on('allEventTasks',(newData)=>{
             queryClient.setQueryData(['allTasks'],(oldData)=>{
                    return newData
             })
        })
        socket.on('eventTasksAmount',(newData)=>{
             queryClient.setQueryData(['tasksAmount'],(oldData)=>{
                    return newData
             })
        })

        return ()=>{
            socket.close()
        }

  },[])
  

  const [today,setToday] = useState()
  const [presentTime,setPresentTime] = useState()
  
  useEffect(()=>{
    setInterval(()=>{
      const date = new Date()
      setToday(date.toLocaleDateString())
      setPresentTime(date.toLocaleTimeString())
    },1000)
  },[])
  
  const convertToYearMonthDay = (dateString) => {
    // Split the date string to extract day, month abbreviation, and year
    const parts = dateString.split(' ');
    const day = parseInt(parts[2]); // 30
    const monthAbbreviation = parts[1]; // "Jun"
    const year = parseInt(parts[3]); // 2024
  
    // Map month abbreviation to month index (JavaScript months are zero-indexed)
    const monthsMap = {
      'Jan': 0, 'Feb': 1, 'Mar': 2, 'Apr': 3,
      'May': 4, 'Jun': 5, 'Jul': 6, 'Aug': 7,
      'Sep': 8, 'Oct': 9, 'Nov': 10, 'Dec': 11
    };
    const monthIndex = monthsMap[monthAbbreviation];
  
    // Return array [year, month (1-based), day]
    return [year, monthIndex , day];
  };


  if(isFetching || isFetching2){
    return <Loading/>
  }


  const appointments = allTasks?.map((task,index)=>{
    const resultArray = convertToYearMonthDay(task?.dueDate)
    const month = resultArray[1]
    const date = resultArray[2]
    const year = resultArray[0]
    return {
      id: index,
      title: task?.name,
      startDate: new Date(year, month,date, 18, 0),
      endDate: new Date(year, month, date, 18, 1),
      status: task?.status
    }
  })
  
 
  const newAppointments = limitAppointments(appointments)
      return (
        <div className='w-10/12 mx-auto '>
          <ToastContainer/>
               <div className="flex mt-5 border-b pb-3 border-black justify-between">
            <div>
            <h1 className=''>{today}</h1>
            <h1 className='font-sans text-xl font-bold'>{presentTime}</h1>
            </div>
            <h1 className='text-3xl font-bold '>Events</h1>
            </div>
          <div className='flex gap-3 md:gap-10 flex-col md:flex-row justify-between md:justify-center py-2 w-11/12 mx-auto mt-4'>
          <h1 className='font-bold text-blue-700'>Upcoming Tasks: {tasksAmount.upcomingTasksLength}</h1>
            <h1 className='font-bold text-green-300'>Completed Tasks: {tasksAmount.finishedTasksLength}</h1>
            <h1 className='font-bold text-red-500'>Unfinished Tasks: {tasksAmount.unfinishedTasksLength}</h1>
          </div>
          <Paper className='w-full md:w-11/12 mx-auto mt-3'>
        <Scheduler
          data={newAppointments}>
          <ViewState
          />
          <MonthView 
          timeTableCellComponent={DayCellComponent}
          />
          <Toolbar />
          <DateNavigator />
          <TodayButton/>

          <Appointments
        appointmentComponent={CustomAppointment}/>
      
        </Scheduler>
      </Paper>
        </div>
      )
};

export default Events;

const CustomAppointment = ({ children, ...restProps }) => {
  // Determine the status from the children props if available
  const status = children[1]?.props?.data?.status || 'unfinished';
  // Check if restProps.data.more is true to show "+X more" styling
  const isMore = restProps.data?.more;

  let className = '';

  // Assign different classes based on status
  if (status === 'finished') {
    className = 'bg-green-500 text-white font-semibold text-sm';
  } else if (status === 'upcoming') {
    className = 'bg-blue-500 text-white font-semibold text-sm';
  } else if(status==='unfinished'){
    className = `bg-red-500 text-white font-semibold text-sm relative ${isMore ? 'bg-gray-300 text-gray-700 text-xs' : ''}`;
  }

  return (
    <div {...restProps} className={className}>
      {children}
    </div>
  );
};




const DayCellComponent = ({startDate,...resProps}) => {
  const {user} = useContext(AuthContext)
  const options = [
    { value: 'Most Important', label: 'Most Important' },
    { value: 'Important', label: 'Important' },
    { value: 'Normal', label: 'Normal' },
  ];
  const [descripiton,setDescription] = useState()
  const [taskName,setTaskName] = useState()


  const changeDescription = (e)=>{
      setDescription(e.target.textContent)
  }
  const changeTaskName = (e)=>{
      setTaskName(e.target.textContent)
  }
  const nameRef = useRef()
const descriptionRef = useRef()
const  dateRef = useRef()
const timeRef = useRef()
const priorityRef = useRef()
const reminderRef = useRef()

const axiosSecure = useAxios()

const addTask = ()=>{
  const name = nameRef.current.textContent
  const description = descriptionRef.current.textContent
  const dueDate = dateRef.current.textContent
  const dueTime = timeRef.current.value
  const reminderTime = reminderRef.current.value
  const priority = priorityRef?.current?.props?.value?.value
  const status = 'upcoming'
  const task = {uid:user?.uid,name,description,dueDate,dueTime,priority,reminderTime,status}
  if(!name){
    toast.error('Task name required')
  }
  else{
   axiosSecure.post('/addUserTask', task)
  .then(()=>{
    toast.success('New Task Added')
  })
  .catch(()=>{
    toast.error('Something went wrong')
  })
  }
}
    return <>
    <dialog id={startDate} className="modal w-11/12 mx-auto modal-bottom sm:modal-middle">
  <div className="modal-box p-0 bg-transparent h-full shadow-none flex justify-center items-start flex-col w-full">
  <div className="flex flex-col gap-2 border rounded-xl p-3 bg-white w-full">
                <div className='flex w-full justify-between items-center'>
                <label className="px-0 input outline-0 border-0 flex items-center gap-2 border-none outline-none focus-within:outline-none h-fit">    
  <p  contentEditable={true} 
   suppressContentEditableWarning={true}
   ref={nameRef}
  className={`outline-none w-full max-w-[250px] cursor-text text-black font-bold  focus-within:before:content-none ${taskName?  "" : "before:content-['Task_name'] text-gray-500"}`}    
  onInput={changeTaskName} 
></p>
</label>
<form method="dialog">
        {/* if there is a button in form, it will close the modal */}
        <button className="text-2xl"><IoClose/></button>
      </form>
                </div>
                <label className="px-0 input  flex items-center gap-2  border-none outline-none focus-within:outline-none h-fit">    
  <p  contentEditable={true} 
   suppressContentEditableWarning={true}
   ref={descriptionRef}
  className={`outline-none w-full cursor-text  focus-within:before:content-none ${descripiton?  "" : "before:content-['Description'] text-gray-300"}`}    
  onInput={changeDescription} 
></p></label>
<div className="flex items-center gap-3">
<div className="dropdown ">
  <div tabIndex={0} role="button" className="btn m-1">Due Date</div>
  <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-30 w-52 p-2 shadow">
  <div>
    <label>Date</label> <br />
    <p ref={dateRef}>{startDate.toDateString()}</p>
  </div>
 <div className="mt-2">
    <label>Time</label> <br />
 <input type="time" ref={timeRef} className="w-full border p-2 outline-none focus-within:outline-none"/>
 </div>
  </ul>
</div>

<div className="dropdown ">
  <div tabIndex={0} role="button" className="btn m-1">Reminder</div>
  <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[30] w-52 p-2 shadow right-0">
  <div className="mt-2">
    <label>Time</label> <br />
 <input type="time" ref={reminderRef} className="w-full border p-2 outline-none focus-within:outline-none"/>
 </div>

  </ul>
</div>
<Select
    
         ref={priorityRef}
        options={options}
        className='text-sm'
      />
</div>
<form method="dialog" className='flex w-full justify-end gap-3'>
    <button className='btn bg-green-500 text-white' onClick={addTask}>Add Task</button>

        {/* if there is a button in form, it will close the modal */}
        <button className="btn bg-red-500 text-white">Cancel</button>
      </form>

</div>

  </div>
  
</dialog>
    <MonthView.TimeTableCell {...resProps} className='w-full' startDate={startDate} onClick={()=>{ 
      document.getElementById(startDate).showModal()}}>
    </MonthView.TimeTableCell>
    </>
}
