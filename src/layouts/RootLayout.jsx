import React from 'react';
import Navbar from '../pages/Shared/Navbar';
import { Outlet } from 'react-router';
import Footer from '../pages/Shared/Footer';

const RootLayout = () => {
    return (
        <div className='flex flex-col max-w-[1440px] mx-auto min-h-screen'>
            <header>
                <Navbar/>
            </header>
            <main className='flex-1'>
                <Outlet/>
            </main>
            <footer>
                <Footer/>
            </footer>
        </div>
    );
};

export default RootLayout;