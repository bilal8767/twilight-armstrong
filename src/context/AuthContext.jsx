import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        setLoading(false);
    }, []);

    const login = (email, password) => {
        // Automatically allow admin without registration
        if (email === 'admin@admin.com') {
            const sessionUser = { email: 'admin@admin.com', name: 'Admin', isAdmin: true };
            setUser(sessionUser);
            localStorage.setItem('user', JSON.stringify(sessionUser));
            return { success: true, isAdmin: true };
        }

        const users = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
        const foundUser = users.find(u => u.email === email && u.password === password);
        
        if (foundUser) {
            const isAdmin = foundUser.email === 'admin@admin.com';
            const sessionUser = { email: foundUser.email, name: foundUser.name, role: foundUser.role || 'customer', isAdmin };
            setUser(sessionUser);
            localStorage.setItem('user', JSON.stringify(sessionUser));
            return { success: true, isAdmin, role: sessionUser.role };
        }
        return { success: false, message: 'Invalid email or password' };
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
    };

    const register = (name, email, password, role = 'customer', phone = '', message = '') => {
        const users = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
        
        if (users.some(u => u.email === email)) {
            return { success: false, message: 'Email already exists' };
        }

        const newUser = { name, email, password, role, phone, message };
        users.push(newUser);
        localStorage.setItem('registeredUsers', JSON.stringify(users));
        
        const isAdmin = email === 'admin@admin.com';
        const sessionUser = { email, name, role, isAdmin };
        setUser(sessionUser);
        localStorage.setItem('user', JSON.stringify(sessionUser));
        
        return { success: true, isAdmin, role };
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, register, loading }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
