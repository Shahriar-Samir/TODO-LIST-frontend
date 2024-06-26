
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
import { useEffect, useState } from 'react';
import AllTasks from '../Components/AllTasks';
import { CiCalendar } from 'react-icons/ci';

const appointments = [

  {
    id: 1,
    title: 'with John',
    startDate: new Date(2024, 5, 1, 10, 0), // June 1st, 2024, 10:00 AM
    endDate: new Date(2024, 5, 1, 11, 30),
    status: 'finished'
  },
  {
    id: 2,
    title: 'Lunch with Sarah',
    startDate: new Date(2024, 5, 5, 12, 0), // June 5th, 2024, 12:00 PM
    endDate: new Date(2024, 5, 5, 13, 0),
        status: 'finished'
  },
  {
    id: 3,
    title: 'Conference call',
    startDate: new Date(2024, 5, 10, 14, 0), // June 10th, 2024, 2:00 PM
    endDate: new Date(2024, 5, 10, 15, 0),
    status: 'upComing'
  },
  {
    id: 4,
    title: 'Team meeting',
    startDate: new Date(2024, 5, 15, 9, 0), // June 15th, 2024, 9:00 AM
    endDate: new Date(2024, 5, 15, 10, 0),
    status: 'unfinished'
  },
  {
    id: 4,
    title: 'Team meeting',
    startDate: new Date(2024, 5, 15, 9, 0), // June 15th, 2024, 9:00 AM
    endDate: new Date(2024, 5, 15, 10, 0),
    status: 'unfinished'
  },
  {
    id: 10,
    title: '1 Team meeting',
    startDate: new Date(2024, 5, 15, 9, 0), // June 15th, 2024, 9:00 AM
    endDate: new Date(2024, 5, 15, 10, 0),
    status: 'unfinished'
  },
  {
    id: 11,
    title: '2 Team meeting',
    startDate: new Date(2024, 5, 15, 9, 0), // June 15th, 2024, 9:00 AM
    endDate: new Date(2024, 5, 15, 10, 0),
    status: 'unfinished'
  },
  {
    id: 12,
    title: '3 Team meeting',
    startDate: new Date(2024, 5, 15, 9, 0), // June 15th, 2024, 9:00 AM
    endDate: new Date(2024, 5, 15, 10, 0),
    status: 'unfinished'
  },
  {
    id: 5,
    title: 'Project presentation',
    startDate: new Date(2024, 5, 20, 13, 0), // June 20th, 2024, 1:00 PM
    endDate: new Date(2024, 5, 20, 14, 30),
    status: 'unfinished'
  },
  {
    id: 6,
    title: 'Dinner with clients',
    startDate: new Date(2024, 5, 25, 18, 0), // June 25th, 2024, 6:00 PM
    endDate: new Date(2024, 5, 25, 20, 0),
    status: 'unfinished'
  },
  
];

const limitAppointments = (appointments, limitPerDay = 2) => {
  // Group appointments by day
  const groupedAppointments = appointments.reduce((acc, appointment) => {
    const dateKey = appointment.startDate.toDateString();
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


  const newAppointments = limitAppointments(appointments)


const Events = () => {
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
               <div className="flex mt-5 border-b pb-3 border-black justify-between">
            <div>
            <h1 className=''>{today}</h1>
            <h1 className='font-sans text-xl font-bold'>{presentTime}</h1>
            </div>
            <h1 className='text-3xl font-bold '>Events</h1>
            </div>
          <Paper className='w-11/12 mx-auto mt-6'>
        <Scheduler
          data={newAppointments}
        >
          <ViewState
          />
          <MonthView 
          timeTableCellComponent={DayCellComponent}
          />
          <Toolbar />
          <DateNavigator />
          <TodayButton/>

          <Appointments
        appointmentComponent={CustomAppointment}
      />
        </Scheduler>
      </Paper>
        <AllTasks/>
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
  } else if (status === 'upComing') {
    className = 'bg-blue-500 text-white font-semibold text-sm';
  } else {
    className = `bg-red-500 text-white font-semibold text-sm relative ${isMore ? 'bg-gray-300 text-gray-700 text-xs' : ''}`;
  }

  return (
    <div {...restProps} className={className}>
      {children}
    </div>
  );
};




const DayCellComponent = ({startDate,...resProps}) => {
  const [descripiton,setDescription] = useState()
  const [taskName,setTaskName] = useState()


  const changeDescription = (e)=>{
      setDescription(e.target.textContent)
  }
  const changeTaskName = (e)=>{
      setTaskName(e.target.textContent)
  }
    return <>
     <dialog id={startDate} className="modal modal-bottom sm:modal-middle">
  <div className="modal-box p-0 bg-transparent h-full shadow-none flex justify-center items-start flex-col w-full">
  <div className="flex flex-col gap-2 border rounded-xl p-3 bg-white w-full">
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
<div className="flex items-center gap-3">
<div className="tooltip" data-tip="Due date">
    <div className="flex items-center gap-1">
    <CiCalendar />
    <p className="text-sm mt-1">{startDate.toDateString()}</p> 
    </div>
</div>
<div className="dropdown ">
  <div tabIndex={0} role="button" className="btn m-1">Priority</div>
  <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[30] w-52 p-2 shadow">
    <li><p>Compulsory</p></li>
    <li><p>Most Important</p></li>
    <li><p>Important</p></li>
    <button className="p-1 bg-slate-200 font-semibold rounded-md mt-3 w-full">Save</button>
  </ul>
</div>
<div className="dropdown ">
  <div tabIndex={0} role="button" className="btn m-1">Reminder</div>
  <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[30] w-52 p-2 shadow">
  <div className="mt-2">
    <label>Time</label> <br />
 <input type="time" className="w-full border p-2 outline-none focus-within:outline-none"/>
 </div>
<button className="p-1 bg-slate-200 font-semibold rounded-md mt-3 w-full">Save</button>
  </ul>
</div>
</div>
<div className='flex w-full justify-end gap-3'>
    <button className='btn bg-green-500 text-white'>Add Task</button>
<form method="dialog">
        {/* if there is a button in form, it will close the modal */}
        <button className="btn bg-red-500 text-white">Cancel</button>
      </form>
</div>
</div>

  </div>
</dialog>
    <MonthView.TimeTableCell {...resProps} className='w-full' startDate={startDate} onClick={()=>{ 
      document.getElementById(startDate).showModal()}}>
    </MonthView.TimeTableCell>
    </>
}
