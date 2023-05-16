import React, { useState } from 'react';

const Sidebar = props => {
    const location = [{
        "name": "ACT",
        "suburbs": [{
            "name": "Belconnen",
            "streets": [{
                "name": "Benjamin Way"
                },
                {"name": "Chandler Street"}
            ]},
            {
            "name": "Gungahin",
            "streets": [{
                "name": "Hibberson Street"
                },
                {"name": "Anthony Rolfe Avenue"}
            ]}
        ]},
        {
        "name": "New South Wales",
        "suburbs": [
            {
            "name": "Bondi",
            "streets": [
                {"name": "Campbell Parade"},
                {"name": "Bondi Road"}
            ]},
            {
            "name": "Parramatta",
            "streets": [
                {"name": "Church Street"},
                {"name": "Macquarie Street"}
            ]}
        ]}
    ]
    const areas = [{
        name: "North",
        sites: [{
            name: "Site-1",
            groups: ['Group-1', 'Group-2']
            },
            {
            name: "Site-2",
            groups: ['Group-3', 'Group-4']
            },
            {
            name: "Site-3",
            groups: ['Group-5', 'Group-6']
            }
        ]},
        {
        name: "Central",
        sites: [{
            name: "Site-4",
            groups: ['Group-7', 'Group-8']
            },
            {
            name: "Site-5",
            groups: ['Group-9', 'Group-10']
            },
            {
            name: "Site-6",
            groups: ['Group-11', 'Group-12']
            }
        ]},
        {
        name: "West",
        sites: [{
            name: "Site-7",
            groups: ['Group-13', 'Group-14']
            },
            {
            name: "Site-8",
            groups: ['Group-15', 'Group-16']
            },
            {
            name: "Site-9",
            groups: ['Group-17', 'Group-18']
            }
        ]}
    ]

    const [activeArea, setActiveArea] = useState(null);
    const [activeSite, setActiveSite] = useState(null);

    const toggleArea = (areaName) => {
        setActiveArea(areaName === activeArea ? null : areaName);
    };
    
    const toggleSite = (siteName) => {
        setActiveSite(siteName === activeSite ? null : siteName);
    };
    
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
                        {area.sites.map((site) => (
                        <li key={site.name} className="border-t border-gray-700">
                            <div className={`flex justify-between items-center pl-4 pr-2 cursor-pointer hover:text-cyan-400 ${site.name === activeSite ? 'text-cyan-400' : ''}`} onClick={() => toggleSite(site.name)}>
                                <p>{site.name}</p>
                                <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 transform ${site.name === activeSite ? 'rotate-90' : 'rotate-0'} transition duration-300`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/>
                                </svg>
                            </div>
                            {site.name === activeSite && (
                            <ul className="border-t border-gray-700">
                                {site.groups.map((group) => (
                                <li key={group}>
                                    <p className='pl-8 hover:text-cyan-400 cursor-pointer'>{group}</p>
                                </li>
                                ))}
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