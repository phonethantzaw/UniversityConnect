import logo from './logo.svg';
import './App.css';
import Dashboard from "./components/Dashboard";
import {BrowserRouter as Router, Route} from 'react-router-dom';
import React from "react";

function App() {
    return (
        <div className="App">
            <Router>
                <Dashboard/>
            </Router>
        </div>
    );
}

export default App;
