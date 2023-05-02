import React, { useState } from 'react';

const GroupView = () => {
    const data = [
        {
            Pole_ID: "p-012",
            Zip_Code: 3121,
            Suburb: "Richmond",
            Street: "123 Main Street",
            Light_Status: "ON"
        },
        {
            Pole_ID: "p-013",
            Zip_Code: 3121,
            Suburb: "Richmond",
            Street: "123 Main Street",
            Light_Status: "Faulty ON"
        },
        {
            Pole_ID: "p-014",
            Zip_Code: 3121,
            Suburb: "Richmond",
            Street: "123 Main Street",
            Light_Status: "Unknown"
        },
    ]
    const [groupData, setGroupData] = useState({
        gName: "g-01",
        contacts: [{
            name: "Imran",
            number: '+61 4XX XXX XXX',
            gmail: 'imran@gmail.com',
            },{
            name: "Jamil",
            number: '+63 2XX XXX XXX',
            gmail: 'jamil@gmail.com',
            }
        ]
    })

    const [message, setMessage] = useState();
    const [modal, setModal] = useState();

    const handleModifyModal = () => {
        setModal(!modal);
    }

    const handleSendMessage = () => {
        console.log(message);
    }

    const handleSave = () => {
        setModal(!modal)
        console.log(groupData)
    }
    const handleAdd = () => {
        setGroupData(prevState => ({
            ...prevState,
            contacts: [
              ...prevState.contacts,
              {
                name: "",
                number: "",
                gmail: ""
              }
            ]
          }));
    }

    return (
        <div>
            <div className="overflow-x-auto min-w-[600px]">
                <div className="min-w-[600px]">
                    <div className='flex text-center mt-12 justify-around text-sm md:text-base py-1 w-full bg-indigo-950 h-fit text-white'>
                        <h1 className='flex-1'>Pole ID</h1>
                        <h1 className='flex-1'>Zip Code</h1>
                        <h1 className='flex-1'>Suburb</h1>
                        <h1 className='flex-1'>Street</h1>
                        <h1 className='flex-1'>Light Status</h1>
                    </div>
                    <div className='border-x'>
                    {
                        data.map(d => (
                            <div key={d.Pole_ID} className='flex justify-around text-center border-b py-1 items-center'>
                                <h1 className='flex-1'>{d.Pole_ID}</h1>
                                <h1 className='flex-1'>{d.Zip_Code}</h1>
                                <h1 className='flex-1'>{d.Suburb}</h1>
                                <h1 className='flex-1'>{d.Street}</h1>
                                <h1 className='flex-1'>{d.Light_Status}</h1>
                            </div>
                        ))
                    }
                    </div>
                </div>
            </div>
            <div className="border rounded-sm mt-4 flex flex-wrap flex-col md:flex-row justify-between">
                <div className="p-2">
                    <h1 className='border-b w-fit text-lg mb-2 font-bold'>Group Information</h1>
                    <h1 className='font-semibold'>Group: {groupData.gName}</h1>
                    {
                        groupData.contacts.map(contact => (
                            <div className='border-t mt-4' key={contact.number}>
                                <h1 className="w-24 font-semibold">Name: {contact.name}</h1>
                                <div key={contact.number} className='flex'>
                                    <h1 className="w-48">Number: {contact.number}</h1>
                                    <h1 className="w-48">Gmail: {contact.gmail}</h1>
                                </div>
                            </div> 
                        ))
                    }
                    <button onClick={handleModifyModal} className='bg-blue-500 rounded hover:bg-blue-600 text-white px-4 mt-2 py-1'>Edit</button>
                </div>
                <div className='p-2 flex flex-col gap-2'>
                    <h1 className='font-semibold'>Message</h1>
                    <textarea onChange={e => setMessage(e.target.value)} className='outline-none border h-20 max-h-32 md:w-96 p-1' type="text" placeholder='Write message'/>
                    <button onClick={handleSendMessage} className='bg-blue-500 rounded hover:bg-blue-600 text-white w-32 py-1'>Send</button>
                </div>
            </div>
            {
                modal && <div className="absolute top-0 left-0 w-full min-h-screen flex justify-center items-center pt-12 bg-black bg-opacity-75">
                    <div className="rounded bg-white w-96 h-fit p-4 flex flex-col gap-2">
                        <h1>Group Information</h1>
                        <div className="flex">
                            <h1 className='w-24'>Group Name: </h1>
                            <input className='rounded-sm border outline-none px-2 flex-1 drop-shadow' type="text" defaultValue={groupData.gName}/>
                        </div>
                        <div>
                            <h1 className='w-24'>Contact: </h1>
                            {
                                groupData.contacts.map((contact, index) => (
                                    <div className="border bg-white drop-shadow-md p-1 rounded-sm my-2" key={contact.number}>
                                        <div className='flex my-1'>
                                            <h1 className='w-24'>Name:</h1>
                                            <input className='rounded-sm border drop-shadow outline-none px-2 flex-1' type="text" defaultValue={contact.name}/>
                                        </div>
                                        <div className='flex my-1'>
                                            <h1 className='w-24'>Number:</h1>
                                            <input className='rounded-sm border drop-shadow outline-none px-2 flex-1' type="text" defaultValue={contact.number}/>
                                        </div>
                                        <div className='flex my-1'>
                                            <h1 className='w-24'>Gmail:</h1>
                                            <input className='rounded-sm border drop-shadow outline-none px-2 flex-1' type="text" defaultValue={contact.gmail}/>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                        <button onClick={handleAdd} className='bg-green-400 hover:bg-green-500 rounded-sm w-full mt-4 py-1 text-white'>+</button>
                        <div className="flex gap-2">
                            <button onClick={() => setModal(!modal)} className='bg-red-400 hover:bg-red-500 rounded-sm w-full mt-4 py-1 text-white'>Close</button>
                            <button onClick={handleSave} className='bg-blue-600 hover:bg-green-500 rounded-sm w-full mt-4 py-1 text-white'>Save</button>
                        </div>
                    </div>
                </div>
            }
        </div>
    );
}

export default GroupView;
