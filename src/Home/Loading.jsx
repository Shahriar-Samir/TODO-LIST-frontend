import React from 'react';
import loading from '../../public/Animations/main.json'
import Lottie from 'lottie-react'

const Loading = () => {
    return (
        <div className='h-[100vh] w-full flex justify-center items-center bg-gradient-to-r from-emerald-100 to-cyan-100 bg-cyan-100  hover:bg-gradient-to-r hover:from-emerald-100 hover:to-cyan-100 hover:bg-cyan-100'>
                <div className='flex flex-col items-center'>
                    <h1 className='text-xl'>Loading</h1>
                <Lottie animationData={loading} className='w-[100px]' loop={true}/>
                </div>
        </div>
    );
};

export default Loading;