import React from 'react';
import { Outlet } from 'react-router-dom';

const PublicLayout = () => {
    return (
        <div className="flex flex-col min-h-screen">
            <main className="flex-grow">
                <Outlet />
            </main>
            <footer className="p-4 text-center text-sm text-secondary border-t border-white/5">
                &copy; {new Date().getFullYear()} ModernApp. All rights reserved.
            </footer>
        </div>
    );
};

export default PublicLayout;
