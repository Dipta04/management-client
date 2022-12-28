import React from 'react';
import { Outlet } from 'react-router-dom';
import Foot from '../Component/Shared/Foot';
import Navbar from '../Component/Shared/Navbar';

const Main = () => {
    return (
        <div>
            <Navbar></Navbar>
            <Outlet></Outlet>
            <Foot></Foot>
        </div>
    );
};

export default Main;