import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import AnimatedBackground from './AnimatedBackground';

const Layout = () => {
    return (
        <div className="min-h-screen relative">
            <AnimatedBackground />
            <Navbar />
            <main className="pt-16 min-h-screen">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
};

export default Layout;
