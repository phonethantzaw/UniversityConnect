import React, { useState } from 'react';
import CreateEvent from './CreateEvent';
import AllEvents from './AllEvents';
import '../styles/Event.css';

const Event = () => {
    const [view, setView] = useState('');
    const userRole = localStorage.getItem('userRole');

    const handleViewChange = (view) => {
        setView(view);
    };

    return (
        <div className="event-container">
            {userRole === 'ADMIN' ? (
                <>
                    <div className="button-container">
                        <button onClick={() => handleViewChange('create')} className="view-button">Create Event</button>
                        <br/><br/>
                        <button onClick={() => handleViewChange('all')} className="view-button">All Events</button>
                    </div>
                    <br /><br/>
                    <div className="view-container">
                        {view === 'create' && <CreateEvent />}
                        {view === 'all' && <AllEvents />}
                    </div>
                </>
            ) : (
                <div className="blank-container"></div>
            )}
        </div>
    );
};

export default Event;
