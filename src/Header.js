import React from "react";
import { Link } from 'react-router-dom'

const Header = () => (
    <header>
        <nav>
            <ul>
                <li><Link to='/'>Home</Link></li>
                <li><Link to='/table'>Table</Link></li>
                <li><Link to='/forms'>Forms</Link></li>
                <li><Link to='/datepicker'>DatePicker</Link></li>
            </ul>
        </nav>
    </header>
);

export default Header;