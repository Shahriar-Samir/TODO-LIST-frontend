import React from 'react';
import { Outlet } from 'react-router-dom';

const Dashboard = () => {
    return (
        <div className='relative'>
            <div className='absolute right-5 top-5'>
                <img src='/logos/checkit.png' className='w-[40px] h-[40px]'/>
            </div>
        <div className="drawer lg:drawer-open w-1/2 flex gap-10 ">
  <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
  {/* <div className="drawer-content flex flex-col items-center justify-center">

    <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">
      Open drawer
    </label>
  </div> */}
  <div className="drawer-side">
    <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
    <ul className="menu bg-base-200 text-base-content p-4 ">
      {/* Sidebar content here */}
      <li><a>Profile</a></li>
      <li><a>Sidebar Item 2</a></li>
    </ul>
  </div>
  <Outlet/>
</div>

        </div>
    );
};

export default Dashboard;