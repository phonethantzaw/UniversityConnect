// src/components/Dashboard.js
import React from 'react';
import {Route, Routes, useLocation} from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import Profile from './Profile';
import UpdateProfile from './User/UpdateProfile';
import AdminDashboard from './Admin/AdminDashboard';
import BlockedUsers from "./BlockedUsers";
import BlockerUsers from "./BlockerUsers";
import ReporterUsers from "./ReporterUsers";
import ReportedUsers from "./ReportedUsers";
import StudentHome from "./User/StudentHome";
import Resource from "./User/Resource";
import Event from "./Event";
import Discussion from "./Discussion";
import Blocking from "./Blocking";
import Reporting from "./Reporting";
import CreateBlocking from "./CreateBlocking";
import CreateReporting from "./CreateReporting";
import EditUser from "./EditUser";
import DeleteUser from "./DeleteUser";
import AllUsers from "./AllUsers";
import BlockingInformation from "./BlockingInformation";
import ReportingInformation from "./ReportingInformation";
import AllReports from "./AllReports";
import AllBlocks from "./AllBlocks";
import AllProfiles from "./AllProfiles";
import CategoryManagement from "./CategoryManagement";
import EditEvent from "./EditEvent";
import CreateEvent from "./CreateEvent";
import AllEvents from "./AllEvents";

import EditAttendance from "./EditAttendance";

import {MainNav} from "./MainNav";
import {SurveyDetail} from "./Admin/SurveyDetail";
import {Survey} from "./Admin/Survey";
import {useRouteMatch} from "./useRouteMatch";
import User from "./User";


function Dashboard() {
    const userData = localStorage.getItem('userId');
    const userId = localStorage.getItem("userId");
    const isAuthenticated = !!localStorage.getItem('accessToken');
    const userRole = localStorage.getItem('userRole');
    const location = useLocation();
    const isLoginRoute = useRouteMatch(['/login', '/']);


    return (
        <>
            {!isLoginRoute && (
                <MainNav/>
            )}

            <Routes>
                <Route path="/" element={<Login/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/admin/dashboard" element={<AdminDashboard userId={userData}/>}/>
                <Route path="/student/home" element={<StudentHome userId={userData}/>}/>
                <Route path="/register" element={<Register/>}/>
                <Route path="/edit-user/:userId" element={<EditUser/>}/>
                <Route path="/create-user" element={<DeleteUser/>}/>
                <Route path="/all-user" element={<AllUsers/>}/>
                <Route path="/profile/filter/:userId" element={<Profile/>}/>
                <Route path="/update-profile/:id" element={<UpdateProfile userId={userData}/>}/>
                <Route path="/resource" element={<Resource/>}/>
                <Route path="/event" element={<Event/>}/>
                <Route path="/discussion" element={<Discussion/>}/>
                <Route path="/all-reports" element={<AllReports/>}/>
                <Route path="/all-blocks" element={<AllBlocks/>}/>
                <Route path="/all-profiles" element={<AllProfiles/>}/>
                <Route path="/blocking" element={<Blocking/>}/>
                <Route path="/blocking-information" element={<BlockingInformation userId={userData}/>}/>
                <Route path="/reporting-information" element={<ReportingInformation userId={userData}/>}/>
                <Route path="/blocked-users/:userId" element={<BlockedUsers/>}/>
                <Route path="/blocker-users/:userId" element={<BlockerUsers/>}/>
                <Route path="/create-blocking" element={<CreateBlocking/>}/>
                <Route path="/reporting" element={<Reporting/>}/>
                <Route path="/reporter-users/:userId" element={<ReporterUsers/>}/>
                <Route path="/reported-users/:userId" element={<ReportedUsers/>}/>
                <Route path="/create-reporting" element={<CreateReporting/>}/>
                <Route path="/survey" element={<Survey/>}/>
                <Route path="/survey-detail/:surveyId" element={<SurveyDetail/>}/>
                <Route path="/manage-categories" element={<CategoryManagement/>}/>
                <Route path="/create-event" element={<CreateEvent/>}/>
                <Route path="/all-events" element={<AllEvents/>}/>
                <Route path="/user" element={<User />}/>
                <Route path="/edit-event/:id" element={<EditEvent/>}/>
                <Route path="/edit-attendance/:id" element={<EditAttendance />} />
                <Route path="/edit-attendance/:id/:eventId" element={<EditAttendance />} />
                <Route path="/add-attendance/:eventId" element={<EditAttendance />} />
            </Routes>
        </>
    );
}

export default Dashboard;
