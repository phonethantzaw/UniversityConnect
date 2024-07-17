import React from 'react';
import {Link, Outlet, useParams} from 'react-router-dom';


function StudentPage(props) {
    const {userId} = useParams();

    return (

        <div>
            <br/>
            <h1>Welcome to University Connect</h1>
            <p>Connecting students across the campus</p>


        </div>

    );
}

export default StudentPage;
