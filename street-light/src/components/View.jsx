import React, { useEffect, useState, useRef } from 'react';
import Sidebar from './Sidebar';
import Graph from './Graph';
import ImagesTable from './ImagesTable';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import TokenService from '../secureStore/refreshToken';

const View = () => {
    const [view, setView] = useState("chart");
    const deviceGid = useSelector((state) => state.graph.deviceGid)
    const deviceName = useSelector((state) => state.graph.deviceName)
    const channel = useSelector((state) => state.graph.channel)
    const [lon, setLon] = useState();
    const [lat, setLat] = useState();
    const [per, setPer] = useState();
    const [isOn, setIsOn] = useState(1);
    const [setup, setSetup] = useState()
    const token = TokenService.getToken();
    const inputRef = useRef();

    useEffect(() => {
        if(deviceGid){
            fetch('http://ventia.atpldhaka.com/api/callLocationPropertiesApi', {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    deviceGid: deviceGid
                })
            })
            .then(response => {
                if (response.ok) {
                    response.json().then(data => {
                        setLon(data.latitudeLongitude?.longitude)
                        setLat(data.latitudeLongitude?.latitude)
                    })
                }
            })
            .catch(error => {
                // Handle network or other error
            });
        }
    }, [deviceGid])

    useEffect(() => {
        if(deviceGid && channel){
            const formData = new FormData();
            formData.append('deviceGid', deviceGid);
            formData.append('channelNum', channel);

            fetch('http://ventia.atpldhaka.com/api/auth/setups/get', {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: formData
            })
            .then(response => {
                if (response.ok) {
                    response.json().then(data => {
                        setSetup(data[0]);
                        setIsOn(data[0]?.status)
                        if(inputRef.current) inputRef.current.value = data[0]?.percentage || "";
                    })
                }
                else{
                    inputRef.current.value = 20;
                }
            })
            .catch(error => {
                // Handle network or other error
            });
        }
    }, [deviceGid, channel])

    const toggleSwitch = () => {
        setIsOn(isOn === 1 ? 0 : 1);
    };

    const handleSave = () => {
        if(per > 100){
            alert("Set alarm percentage may not be more than 100")
        }
        else if(per < 0){
            alert("Set alarm percentage may not be less than 0")
        }
        else{
            const params = new URLSearchParams();
            params.append('deviceGid', deviceGid);
            params.append('channelNum', channel);
            params.append('percentage', per);
            params.append('status', isOn);

            fetch('http://ventia.atpldhaka.com/api/auth/setups', {
                method: 'PUT',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: params
            })
            .then(response => {
                if (response.ok) {
                    response.json().then(data => {
                        toast(data.message, {
                            position: "top-right",
                            autoClose: 3000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: false,
                            draggable: true,
                            progress: undefined,
                            theme: "light",
                        })
                    })
                }
            })
            .catch(error => {
                // Handle network or other error
            });
        }
    }
    
    return (
        <div className='flex relative'>
            <div className="w-56 flex-none fixed left-0 h-full overflow-y-auto overflow-x-hidden">
                <Sidebar/>
            </div>
            <div className='m-4 flex-1 ml-56 pt-12 overflow-y-auto'>
                <div className="flex bg-indigo-950 text-white text-base relative font-semibold rounded justify-center items-center">
                    <div onClick={() => setView("chart")} className={`flex-1 text-center rounded leading-10 cursor-pointer z-10 ${view === 'chart' ? 'bg-teal-400' : ''}`}>Graph</div>
                    <div onClick={() => setView("location")} className={`flex-1 text-center rounded leading-10 cursor-pointer z-10 ${view === 'location' ? 'bg-teal-400' : ''}`}>Location</div>
                    <div onClick={() => setView("image")} className={`flex-1 text-center rounded leading-10 cursor-pointer z-10 ${view === 'image' ? 'bg-teal-400' : ''}`}>Images</div>
                    <div onClick={() => setView("document")} className={`flex-1 text-center rounded leading-10 cursor-pointer z-10 ${view === 'document' ? 'bg-teal-400' : ''}`}>Documents</div>
                    <div onClick={() => setView("setup")} className={`flex-1 text-center rounded leading-10 cursor-pointer z-10 ${view === 'setup' ? 'bg-teal-400' : ''}`}>Setup</div>
                </div>
                <div>
                {
                    view === "chart" ? 
                    <Graph /> : view === "location" ?
                    <>
                        <div className="bg-indigo-950 w-full py-1 mt-4 rounded text-white text-center font-medium">
                            <p>Device : {deviceName}</p>
                            <p>Channel: {channel}</p>
                        </div>
                        <iframe src={`https://maps.google.com/maps?q=${lat}, ${lon}&z=15&output=embed`} className='w-full h-[400px] mt-8' title='google map'></iframe>
                    </>
                    : view === "image" ? <ImagesTable name={'images'} get_url={'getImageData'} up_url={'image-upload'} type={'name'}/> : view === "document" ?
                    <ImagesTable name={'documents'} get_url={'getFileData'} up_url={'file'} type={'filename'}/> : 
                    <div className='flex flex-col items-center gap-2'>
                        <p className='text-center font-bold text-2xl my-4'>Setup Your Device</p>
                        <div className="flex flex-col gap-2 border w-fit py-4 px-10 rounded shadow">
                            <div className='flex'>
                                <p className='w-40'>Device :</p>
                                <p className='w-52'>{deviceName}</p>
                            </div>
                            <div className='flex'>
                                <p className='w-40'>Channel : </p>
                                <p className='w-52'>{channel}</p>
                            </div>
                            <div className='flex'>
                                <p className='w-40'>Set Alarm (%) : </p>
                                <input ref={inputRef} onChange={(e) => setPer(e.target.value)} defaultValue={setup?.percentage} className='outline-none border rounded px-1 flex-1' type="number"/>
                            </div>
                            <div className='flex'>
                                <p className='w-40'>Turn Alarm</p>
                                <div className="flex items-center">
                                    <button
                                        className={`relative focus:outline-none w-10 h-6 transition-colors duration-300 ease-in-out ${isOn? 'bg-teal-400' : 'bg-gray-300'} rounded-full`}
                                        onClick={toggleSwitch}>
                                        <span className={`inline-block w-4 h-4 mt-1 transform transition-transform duration-300 ease-in-out ${isOn ? 'translate-x-2' : '-translate-x-2'} bg-white rounded-full`}
                                        ></span>
                                    </button>
                                    <span className="ml-2 text-sm">{isOn ? 'On' : 'Off'}</span>
                                </div>
                            </div>
                            <button onClick={handleSave} className='w-full py-1 bg-teal-400 rounded mt-4 text-white font-semibold hover:bg-green-400'>Save</button>
                        </div>
                        <ToastContainer />
                    </div>
                    
                }
                </div>
            </div>
        </div>
    );
}

export default View;
