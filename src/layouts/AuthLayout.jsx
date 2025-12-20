import React from 'react';
import Logo from '../components/Logo';
import authImage from "../assets/authImage.png"
import { Link, Outlet } from 'react-router';

const AuthLayout = () => {
    return (
        <div className=' min-h-screen'>
           <section className='flex'>
            <div className='flex-1 flex relative min-h-screen'>
            <div className='absolute left-10 top-10 bg-base-100'><Link to="/"><Logo/></Link></div>
                <Outlet/>
            </div>
            <div className='flex-1 flex justify-center items-center min-h-screen bg-primary/5'>
                <img src={authImage} alt="authImage" />
            </div>
           </section>
            
        </div>
    );
};

export default AuthLayout;