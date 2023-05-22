import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectedLight } from "../redux/lightStatus";

export default function Inventory() {
    const statusToView = useSelector((state) => state.light.value)
    const dispatch = useDispatch()

    const data = [
        {
            "Pole ID": "p-012",
            "Zip Code": 3121,
            "Suburb": "Richmond",
            "Street": "123 Main Street",
            "Light Status": "ON"
        },
        {
            "Pole ID": "p-013",
            "Zip Code": 3121,
            "Suburb": "Richmond",
            "Street": "123 Main Street",
            "Light Status": "ON"
        },
        {
            "Pole ID": "p-014",
            "Zip Code": 3121,
            "Suburb": "Richmond",
            "Street": "123 Main Street",
            "Light Status": "ON"
        },
        {
            "Pole ID": "p-015",
            "Zip Code": 3121,
            "Suburb": "Richmond",
            "Street": "123 Main Street",
            "Light Status": "ON"
        },
        {
            "Pole ID": "p-016",
            "Zip Code": 3121,
            "Suburb": "Richmond",
            "Street": "123 Main Street",
            "Light Status": "Faulty OFF"
        },
        {
            "Pole ID": "p-017",
            "Zip Code": 3121,
            "Suburb": "Richmond",
            "Street": "123 Main Street",
            "Light Status": "OFF"
        },
        {
            "Pole ID": "p-018",
            "Zip Code": 3121,
            "Suburb": "Richmond",
            "Street": "123 Main Street",
            "Light Status": "Faulty ON"
        },
        {
            "Pole ID": "p-019",
            "Zip Code": 3121,
            "Suburb": "Richmond",
            "Street": "123 Main Street",
            "Light Status": "Unknown"
        },
    ]
    const options = [
        'Pole ID', 'Zip Code', 'Suburb', 'Street'
    ]
    const status_op = [
        "ON", "OFF", "Faulty ON", "Faulty OFF", "Unknown"
    ]

    const [filterData, setFilterData] = useState(data)
    const [option, setOption] = useState('Pole ID')
    const [openOption, setOpenOption] = useState(false)
    const [openStatus, setOpenStatus] = useState(false)
    // eslint-disable-next-line
    const [search, setSearch] = useState('')
    const [modal, setModal] = useState(false)

    useEffect(() => {
        setFilterData(
            data.filter(item => item["Light Status"] === statusToView)
        )
        // eslint-disable-next-line 
    }, [statusToView])

    const handleStatusFilter = (st) => {
        dispatch(selectedLight(st));
        setOpenStatus(!openStatus)
    }

    const handleModal = id => {
        setModal(!modal)
    }

    return (
        <div className='flex flex-col relative px-4 md:w-auto w-[768px]'>
            <div className="flex justify-end mt-14 text-white rounded-sm relative">
                <input onChange={e => setSearch(e.target.value)} type="text" placeholder='Search' className='bg-indigo-950 border-r rounded-l pl-2 outline-none'/>
                <h1 className='px-4 py-1 bg-indigo-950 w-24 text-center text-cyan-500'>{option}</h1>
                <svg onClick={() => setOpenOption(!openOption)} className='bg-indigo-950 rotate-180 rounded-l-md cursor-pointer hover:text-cyan-500' xmlns="http://www.w3.org/2000/svg" width="28" height="32" viewBox="0 0 24 24"><path fill="currentColor" d="m7 14l5-5l5 5H7Z"/></svg>
                <ul className={`list-style-none absolute bg-indigo-950 py-1 px-8 rounded-md border-t z-10 top-8 ${openOption ? "" : "hidden"}`}>
                    {
                        options.map((op) => (
                            <li key={op} className=' cursor-pointer hover:text-cyan-500' onClick={() => {setOption(op); setOpenOption(!openOption)}}>{op}</li>
                        ))
                    }
                </ul>
            </div>
            <div className='bg-indigo-950 flex text-white text-center mt-2 items-center text-sm md:text-base py-1 overflow-x-auto min-w-[600px]'>
                <h1 className='w-1/6'>Pole ID</h1>
                <h1 className='w-1/6'>Zip Code</h1>
                <h1 className='w-1/4'>Suburb</h1>
                <h1 className='w-1/4'>Street</h1>
                <div className='flex w-1/6 justify-center items-center'>
                    <h1>Light Status</h1>
                    <svg onClick={() => setOpenStatus(!openStatus)} className='bg-indigo-950 rotate-180 rounded-l-md cursor-pointer hover:text-cyan-500' xmlns="http://www.w3.org/2000/svg" width="28" height="32" viewBox="0 0 24 24"><path fill="currentColor" d="m7 14l5-5l5 5H7Z"/></svg>
                    <ul className={`list-style-none absolute bg-indigo-950 py-1 px-8 rounded-md border-t z-10 top-32 mt-2 ${openStatus ? "" : "hidden"}`}>
                        {
                            status_op.map(st => (
                                <li key={st} className={`cursor-pointer hover:text-cyan-500 ${selectedLight === st ? 'text-cyan-500' : ''}`} onClick={() => handleStatusFilter(st)}>{st}</li>
                            ))
                        }
                    </ul>
                </div>
            </div>
            <div className="border-x text-center text-sm md:text-base">
            {
                filterData.map(d => (
                    <div key={d['Pole ID']} className='flex items-center border-b p-1'>
                        <button onClick={() => handleModal(d['Pole ID'])} className='bg-violet-500 text-white hover:bg-violet-600 rounded w-1/6 h-fit drop-shadow'>{d['Pole ID']}</button>
                        <h1 className='w-1/6'>{d['Zip Code']}</h1>
                        <h1 className='w-1/4'>{d.Suburb}</h1>
                        <h1 className='w-1/4'>{d.Street}</h1>
                        <h1 className='w-1/6'>{d['Light Status']}</h1>
                    </div>
                ))
            }
            </div>
            {
            modal &&
            <div className="absolute top-0 left-0 w-screen h-screen flex items-center justify-center bg-black bg-opacity-75">
                <div className="bg-white z-20 p-4 rounded-sm text-sm flex flex-col items-center">
                    <h1 className='pb-2 font-bold'>Pole ID: p-012</h1>
                    <div className="flex gap-4 items-center">
                        <svg className='text-green-400 border rounded-sm w-24 sm:w-auto' xmlns="http://www.w3.org/2000/svg" width='200' height="200" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2a7 7 0 0 0-7 7c0 2.38 1.19 4.47 3 5.74V17a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-2.26c1.81-1.27 3-3.36 3-5.74a7 7 0 0 0-7-7M9 21a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1v-1H9v1Z"/></svg>
                        <div className="flex flex-col gap-2">
                            <h1 className='text-center font-bold text-base pb-2'>Status</h1>
                            <div className="flex">
                                <h1 className='w-24'>Current Status</h1>
                                <h1 className="bg-indigo-950 text-white w-24 pl-2 rounded-sm">ON</h1>
                            </div>
                            <div className="flex">
                                <h1 className='w-24'>On Time</h1>
                                <h1 className="bg-indigo-950 text-white w-24 pl-2 rounded-sm">16:00</h1>
                            </div>
                            <div className="flex">
                                <h1 className='w-24'>Off Time</h1>
                                <h1 className="bg-indigo-950 text-white w-24 pl-2 rounded-sm">05:00</h1>
                            </div>
                            <div className="flex">
                                <h1 className='w-24'>Zip Code</h1>
                                <h1 className="bg-indigo-950 text-white w-24 pl-2 rounded-sm">3121</h1>
                            </div>
                            <div className="flex">
                                <h1 className='w-24'>Suburb</h1>
                                <h1 className="bg-indigo-950 text-white w-24 pl-2 rounded-sm">Richmond</h1>
                            </div>
                            <div className="flex">
                                <h1 className='w-24'>Street</h1>
                                <h1 className="bg-indigo-950 text-white w-24 pl-2 rounded-sm">123 Main Street</h1>
                            </div>
                            <div className="flex">
                                <h1 className='w-24'>Group</h1>
                                <h1 className="bg-indigo-950 text-white w-24 pl-2 rounded-sm">#g-1, #g-2</h1>
                            </div>
                        </div>
                    </div>
                    <button onClick={() => setModal(!modal)} className="bg-indigo-950 text-white py-1 w-20 rounded-sm mt-4 hover:bg-red-400">Close</button>
                </div>
            </div>}
        </div>
    )
}
