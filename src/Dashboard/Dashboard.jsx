import React from 'react';
import { FaSearch } from 'react-icons/fa';
import { Link, Outlet } from 'react-router-dom';

const Dashboard = () => {
    return (
        <div className=''>
         
        <div className="drawer lg:drawer-open flex ">
  <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
  {/* <div className="drawer-content flex flex-col items-center justify-center">

    <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">
      Open drawer
    </label>
  </div> */}
  <div className="w-1/4 h-[100vh] ">
    <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
    <ul className="menu gap-4  p-4 w-full h-full text-white bg-gradient-to-r from-emerald-400 to-cyan-400 bg-cyan-500">
      {/* Sidebar content here */}
        <div className='bg-white flex justify-between rounded-lg relative w-full'>
        <input className='p-2 outline-0 rounded-lg w-full' placeholder='search '/>
        <FaSearch className='absolute top-3 right-2'/>
        </div>
      <li><Link to='/app/today'>Today</Link></li>
      <li><a>Sidebar Item 2</a></li>
    </ul>
  </div>
  <div className='w-3/4'>
  <nav className='flex justify-end px-5 py-3'>
                <img src='/logos/checkit.png' className='w-[40px] h-[40px]'/>
            </nav>
  <Outlet/>
  </div>
</div>

        </div>
    );
};

export default Dashboard;