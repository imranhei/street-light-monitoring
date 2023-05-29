import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux'
import { SelectedChannel, SelectedDevice } from '../redux/graphData';

const Sidebar = () => {
    const areas = [{
        name: "North",
        sites: [{
            name: "Site-1",
            },
            {
            name: "Site-2",
            },
            {
            name: "Site-3",
            }
        ]},
        {
        name: "Central",
        sites: [{
            name: "Site-4",
            },
            {
            name: "Site-5",
            },
            {
            name: "Site-6",
            }
        ]},
        {
        name: "West",
        sites: [{
            name: "Site-7",
            },
            {
            name: "Site-8",
            },
            {
            name: "Site-9",
            }
        ]}
    ]
    const [deviceInfo, setDeviceInfo] = useState();

    useEffect(() => {
        const fetchData = async () => {
            try {
              const response = await fetch('http://ventia.atpldhaka.com/api/fetchDevicesApi');
              const jsonData = await response.json();
              setDeviceInfo(jsonData);
            } catch (error) {
              console.log('Error fetching data:', error);
            }
          };
          fetchData();
    }, [])

    const dispatch = useDispatch()
    const [activeArea, setActiveArea] = useState(null);
    const [activeSite, setActiveSite] = useState(null);
    const [activeDevice, setActiveDevice] = useState(null);
    const [channel, setChannel] = useState(null);

    const toggleArea = (areaName) => {
        setActiveArea(areaName === activeArea ? null : areaName);
    };
    
    const toggleSite = (siteName) => {
        setActiveSite(siteName === activeSite ? null : siteName);
    };

    const toggleDevice = (deviceName) => {
        setActiveDevice(deviceName === activeDevice ? null : deviceName);
        setChannel(null)
    };

    const handleChannel = (num) => {
        setChannel(num)
        dispatch(SelectedChannel(num));
    }
    
    return (
        <div className="bg-indigo-950 min-h-screen w-52 text-white pt-12">
            <ul>
                {areas.map((area) => (
                <li key={area.name} className="border-t border-gray-700 leading-7 ">
                    <div className={`flex justify-between items-center pl-2 pr-2 cursor-pointer hover:text-cyan-400 border-l-2 border-transparent hover:border-cyan-400 ${area.name === activeArea ? 'border-cyan-400 text-cyan-400' : ''}`} onClick={() => toggleArea(area.name)}>
                        <p>{area.name}</p>
                        <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 transform ${area.name === activeArea ? 'rotate-90' : 'rotate-0'} transition duration-300`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/>
                        </svg>
                    </div>
                    {area.name === activeArea && (
                    <ul>
                        {area.sites.map((site, index) => (
                        <li key={site.name} className="border-t border-gray-700">
                            <div className={`flex justify-between items-center pl-4 pr-2 cursor-pointer hover:text-cyan-400 ${site.name === activeSite ? 'text-cyan-400' : ''}`} onClick={() => toggleSite(site.name)}>
                                <p>{site.name}</p>
                                <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 transform ${site.name === activeSite ? 'rotate-90' : 'rotate-0'} transition duration-300`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/>
                                </svg>
                            </div>
                            {site.name === activeSite && (
                                <ul>
                                    {area.name === 'North' && !index &&
                                        deviceInfo.map((dev) => (
                                            <li className="border-t border-gray-700" key={dev.deviceName}>
                                                <div className={`flex justify-between items-center pl-8 pr-2 cursor-pointer hover:text-cyan-400 ${dev.deviceName === activeDevice ? 'text-cyan-400' : ''}`} onClick={() => {toggleDevice(dev.deviceName); dispatch(SelectedDevice(dev.deviceGid))}}>
                                                    <p>{dev.deviceName}</p>
                                                    <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 transform ${dev.deviceName === activeDevice ? 'rotate-90' : 'rotate-0'} transition duration-300`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/>
                                                    </svg>
                                                </div>
                                                <ul>
                                                {dev.deviceName === activeDevice && (
                                                    dev.channelInfo.map(cnl => (
                                                        <li key={cnl.channelNum}>
                                                            <p onClick={() => handleChannel(cnl.channelNum)} className={`pl-12 cursor-pointer ${channel === cnl.channelNum ? 'bg-teal-400 hover:text-black' : 'hover:text-cyan-400'}`}>{cnl.channelName === 'null' ? `Channel: ${cnl.channelNum}` : cnl.channelName}</p>
                                                        </li>
                                                    ))
                                                )}
                                                </ul>
                                            </li>
                                        ))
                                    }
                                </ul>
                            )}
                        </li> 
                    ))}
                    </ul>
                    )}
                </li>
                ))}
            </ul>
        </div>
    );
}

export default Sidebar;