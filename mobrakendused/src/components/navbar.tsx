import React from 'react';
import { Link } from "react-router-dom";

const navbar = () => {
    return (
        <div className="navbar">
            <li>
                <Link to="/Calendar">Calendar</Link>
            </li>
            <li>
                <Link to="/Today">Today</Link>
            </li>
        
        </div>
    );
}
export default navbar;


