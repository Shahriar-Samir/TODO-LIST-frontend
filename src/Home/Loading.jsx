import React from 'react';

const Loading = () => {
    return (
        <div className='h-[100vh] w-full flex justify-center items-center bg-transparent text-white'>
                <div className='flex flex-row gap-3 items-center'>
                    <h1 className='text-lg font-bold'>Loading</h1>
                    <span className="loading loading-bars loading-md text-white"></span>
                </div>
        </div>
    );
};

export default Loading;