import React, { useState } from 'react';

const Sidebar = () => {
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
    const groups = [
        "g-1", "g-2", "g-3", "g-4"
    ]

    const [selectedState, setSelectedState] = useState('')
    const [selectedSuburb, setSelectedSuburb] = useState('')
    const [selectedStreet, setSelectedStreet] = useState('')
    const [selectedGroup, setSelectedGroup] = useState('')

    const handleState = (state) => {
        setSelectedState(state);
        setSelectedSuburb('');
        setSelectedStreet('');
        setSelectedGroup()
    }

    const handleGroup = (group) => {
        setSelectedGroup(group)
        setSelectedState();
    }

    return (
        <div className='bg-indigo-950 border-t-2 min-h-screen p-2 pt-14'>
            <h1 className='text-cyan-400 font-semibold text-xl'>Location</h1>
            <div className='cursor-pointer text-white'>
            {location.map((state) => (
                <div key={state.name} onClick={() => handleState(state.name)} className={`${state.name === selectedState ? 'text-cyan-400' : ''}`}>
                    {state.name}
                    <div className='pl-3 text-white'>
                        {state.suburbs.map((suburb) => (
                        <div key={suburb.name} onClick={(e) => {e.stopPropagation(); setSelectedSuburb(suburb.name);}} className={`${suburb.name === selectedSuburb ? 'text-cyan-400 ' : ''} ${state.name === selectedState ? '' : 'hidden'}`}>
                            {suburb.name}
                            <div className='pl-3 text-white'>
                            {suburb.streets.map((street) => (
                                <div key={street.name} onClick={(e) => {e.stopPropagation(); setSelectedStreet(street.name);}} className={`${street.name === selectedStreet ? 'text-cyan-400' : ''} ${suburb.name === selectedSuburb ? '' : 'hidden'}`}>{street.name}</div>
                            ))}
                            </div>
                        </div>
                        ))}
                    </div>
                </div>
            ))}
            </div>
            <h1 className='text-cyan-400 font-semibold text-xl'>Group</h1>
            <div className='cursor-pointer text-white'>
            {groups.map((group) => (
                <div key={group} onClick={() => handleGroup(group)} className={`${group === selectedGroup ? 'text-cyan-400' : ''}`}>
                    {group}
                </div>
            ))}
            </div>
        </div>
    );
}

export default Sidebar;
