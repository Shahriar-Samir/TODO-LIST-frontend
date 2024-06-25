import { useEffect, useState } from "react";
import { IoIosAdd, IoIosAddCircle } from "react-icons/io";

const Today = () => {

    const [today,setToday] = useState()
    const [presentTime,setPresentTime] = useState()
    const [icon,setIcon] = useState(false)

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
                <button className="flex items-center gap-2 " onMouseEnter={mouseIn} onMouseLeave={mouseOut}>{icon ?<IoIosAddCircle  className="text-green-500 text-3xl"/> : <IoIosAdd  className="text-green-500 text-3xl"/>} Add Task</button>
            </div>
        </div>
    );
};

export default Today;