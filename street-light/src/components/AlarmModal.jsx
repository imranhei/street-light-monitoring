import React from 'react';

const AlarmModal = (props) => {
    return (
        <div className="bg-white rounded-sm w-72 h-fit">
            <h1 className='p-4'>{props.msg}</h1>
            <button onClick={props.close} className='bg-red-400 hover:bg-red-600 text-white w-full py-1'>Close</button>
        </div>
    );
}

export default AlarmModal;
