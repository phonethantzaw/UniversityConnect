// src/components/Dashboard.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import Profile from './Profile';
import UpdateProfile from './UpdateProfile';
import AdminDashboard from './AdminDashboard';
import BlockedUsers from "./BlockedUsers";
import BlockerUsers from "./BlockerUsers";
import ReporterUsers from "./ReporterUsers";
import ReportedUsers from "./ReportedUsers";
import StudentHome from "./StudentHome";
import Resource from "./Resource";
import Event from "./Event";
import Discussion from "./Discussion";
import Blocking from "./Blocking";
import Reporting from "./Reporting";
import CreateBlocking from "./CreateBlocking";
import CreateReporting from "./CreateReporting";
import EditUser from "./EditUser";
import CreateUser from "./DeleteUser";
import DeleteUser from "./DeleteUser";
import AllUser from "./AllUser";
import User from "./User";
import BlockingInformation from "./BlockingInformation";
import ReportingInformation from "./ReportingInformation";

function Dashboard() {
    const userData = localStorage.getItem('userId');
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/login" element={<Login />} />
                <Route path="/admin/dashboard" element={<AdminDashboard userId={userData}/>} />
                <Route path="/student/home" element={<StudentHome userId={userData}/>}/>
                <Route path="/user" element={<User />}/>
                <Route path="/edit-user/:userId" element={<EditUser/>}/>
                <Route path="/create-user" element={<DeleteUser/>}/>
                <Route path="/all-user" element={<AllUser />}/>
                <Route path="/register" element={<Register />} />
                <Route path="/profile/filter/:userId" element={<Profile />} />
                <Route path="/update-profile/:id" element={<UpdateProfile userId={userData}/>}/>
                <Route path="/resource" element={<Resource/>}/>
                <Route path="/event" element={<Event />}/>
                <Route path="/discussion" element={<Discussion/>}/>
                <Route path="/blocking" element={<Blocking />}/>
                <Route path="/blocking-information" element={<BlockingInformation userId={userData}/>}/>
                <Route path="/reporting-information" element={<ReportingInformation userId={userData}/>}/>
                <Route path="/blocked-users/:userId" element={<BlockedUsers />}/>
                <Route path="/blocker-users/:userId" element={<BlockerUsers />}/>
                <Route path="/create-blocking" element={<CreateBlocking/>}/>
                <Route path="/reporting" element={<Reporting/>}/>
                <Route path="/reporter-users/:userId" element={<ReporterUsers />}/>
                <Route path="/reported-users/:userId" element={<ReportedUsers />}/>
                <Route path="/create-reporting" element={<CreateReporting/>}/>
            </Routes>
        </Router>
    );
}

export default Dashboard;
