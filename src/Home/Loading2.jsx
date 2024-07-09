import React from 'react';
import loading from '../../public/Animations/main.json'
import Lottie from 'lottie-react'

const Loading = () => {
    return (
        <div className='h-[100vh] w-full flex justify-center items-center bg-gradient-to-r from-indigo-400 to-cyan-400 text-white'>
                <div className='flex flex-row items-center'>
                    <h1 className='text-xl font-bold'>Loading</h1>
                <Lottie animationData={loading} className='w-[100px]' loop={true}/>
                </div>
        </div>
    );
};

export default Loading;