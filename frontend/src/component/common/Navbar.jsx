import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import ApiService from '../../service/ApiService';

function Navbar() {
    const isAuthenticated = ApiService.isAuthenticated();
    const isAdmin = ApiService.isAdmin();
    const isUser = ApiService.isUser();
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleLogout = () => {
        const isLogout = window.confirm('Are you sure you want to logout?');
        if (isLogout) {
            ApiService.logout();
            navigate('/home');
        }
    };

    return (
        <nav className="bg-charcoal-950 text-white shadow-md border-b border-gold-400/20">
            <div className="container-custom">
                <div className="flex justify-between h-20">
                    {/* Logo and Brand */}
                    <div className="flex items-center">
                        <NavLink to="/home" className="flex items-center">
                            <span className="text-2xl font-display italic font-bold text-white">
                                <span className="text-gold-400">H</span>ART
                                <span className="text-gold-400 ml-2">H</span>otel
                            </span>
                        </NavLink>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex md:items-center md:space-x-8">
                        <NavLink 
                            to="/home" 
                            className={({ isActive }) => 
                                isActive 
                                    ? "text-gold-400 font-medium border-b-2 border-gold-400 pb-1" 
                                    : "text-white/80 hover:text-gold-400 transition-colors duration-300"
                            }
                        >
                            Home
                        </NavLink>
                        <NavLink 
                            to="/rooms" 
                            className={({ isActive }) => 
                                isActive 
                                    ? "text-gold-400 font-medium border-b-2 border-gold-400 pb-1" 
                                    : "text-white/80 hover:text-gold-400 transition-colors duration-300"
                            }
                        >
                            Rooms
                        </NavLink>
                        <NavLink 
                            to="/find-booking" 
                            className={({ isActive }) => 
                                isActive 
                                    ? "text-gold-400 font-medium border-b-2 border-gold-400 pb-1" 
                                    : "text-white/80 hover:text-gold-400 transition-colors duration-300"
                            }
                        >
                            Find Booking
                        </NavLink>

                        {isUser && (
                            <NavLink 
                                to="/profile" 
                                className={({ isActive }) => 
                                    isActive 
                                        ? "text-gold-400 font-medium border-b-2 border-gold-400 pb-1" 
                                        : "text-white/80 hover:text-gold-400 transition-colors duration-300"
                                }
                            >
                                Profile
                            </NavLink>
                        )}

                        {isAdmin && (
                            <NavLink 
                                to="/admin" 
                                className={({ isActive }) => 
                                    isActive 
                                        ? "text-gold-400 font-medium border-b-2 border-gold-400 pb-1" 
                                        : "text-white/80 hover:text-gold-400 transition-colors duration-300"
                                }
                            >
                                Admin
                            </NavLink>
                        )}

                        {!isAuthenticated ? (
                            <>
                                <NavLink 
                                    to="/login" 
                                    className="border border-gold-400/50 text-white hover:bg-gold-400/10 px-5 py-1.5 rounded-sm transition-colors duration-300"
                                >
                                    Login
                                </NavLink>
                                <NavLink 
                                    to="/register" 
                                    className="bg-gold-400 text-charcoal-950 px-5 py-1.5 rounded-sm hover:bg-gold-500 transition-colors duration-300 shadow-golden"
                                >
                                    Register
                                </NavLink>
                            </>
                        ) : (
                            <button 
                                onClick={handleLogout}
                                className="bg-gold-400 text-charcoal-950 px-5 py-1.5 rounded-sm hover:bg-gold-500 transition-colors duration-300 shadow-golden"
                            >
                                Logout
                            </button>
                        )}
                    </div>

                    {/* Mobile Navigation Button */}
                    <div className="flex md:hidden items-center">
                        <button
                            type="button"
                            className="inline-flex items-center justify-center p-2 rounded-sm text-white/80 hover:text-gold-400 hover:bg-charcoal-900 focus:outline-none"
                            aria-controls="mobile-menu"
                            aria-expanded={isMenuOpen}
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                        >
                            <span className="sr-only">Open main menu</span>
                            {!isMenuOpen ? (
                                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            ) : (
                                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            )}
                        </button>
                    </div>
                </div>

                {/* Mobile Navigation Menu */}
                {isMenuOpen && (
                    <div className="md:hidden" id="mobile-menu">
                        <div className="px-2 pt-2 pb-3 space-y-1 border-t border-charcoal-800">
                            <NavLink 
                                to="/home" 
                                className={({ isActive }) => 
                                    "block px-3 py-2 rounded-sm " + (isActive 
                                        ? "bg-charcoal-900 text-gold-400 font-medium border-l-2 border-gold-400" 
                                        : "text-white/80 hover:bg-charcoal-900 hover:text-gold-400")
                                }
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Home
                            </NavLink>
                            <NavLink 
                                to="/rooms" 
                                className={({ isActive }) => 
                                    "block px-3 py-2 rounded-sm " + (isActive 
                                        ? "bg-charcoal-900 text-gold-400 font-medium border-l-2 border-gold-400" 
                                        : "text-white/80 hover:bg-charcoal-900 hover:text-gold-400")
                                }
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Rooms
                            </NavLink>
                            <NavLink 
                                to="/find-booking" 
                                className={({ isActive }) => 
                                    "block px-3 py-2 rounded-sm " + (isActive 
                                        ? "bg-charcoal-900 text-gold-400 font-medium border-l-2 border-gold-400" 
                                        : "text-white/80 hover:bg-charcoal-900 hover:text-gold-400")
                                }
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Find Booking
                            </NavLink>

                            {isUser && (
                                <NavLink 
                                    to="/profile" 
                                    className={({ isActive }) => 
                                        "block px-3 py-2 rounded-sm " + (isActive 
                                            ? "bg-charcoal-900 text-gold-400 font-medium border-l-2 border-gold-400" 
                                            : "text-white/80 hover:bg-charcoal-900 hover:text-gold-400")
                                    }
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    Profile
                                </NavLink>
                            )}

                            {isAdmin && (
                                <NavLink 
                                    to="/admin" 
                                    className={({ isActive }) => 
                                        "block px-3 py-2 rounded-sm " + (isActive 
                                            ? "bg-charcoal-900 text-gold-400 font-medium border-l-2 border-gold-400" 
                                            : "text-white/80 hover:bg-charcoal-900 hover:text-gold-400")
                                    }
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    Admin
                                </NavLink>
                            )}

                            {!isAuthenticated ? (
                                <div className="flex flex-col space-y-2 pt-2">
                                    <NavLink 
                                        to="/login" 
                                        className="border border-gold-400/30 text-white hover:bg-gold-400/10 px-3 py-2 text-center rounded-sm"
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        Login
                                    </NavLink>
                                    <NavLink 
                                        to="/register" 
                                        className="bg-gold-400 text-charcoal-950 px-3 py-2 text-center rounded-sm hover:bg-gold-500"
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        Register
                                    </NavLink>
                                </div>
                            ) : (
                                <button 
                                    onClick={() => {
                                        handleLogout();
                                        setIsMenuOpen(false);
                                    }}
                                    className="bg-gold-400 text-charcoal-950 px-3 py-2 w-full text-center rounded-sm hover:bg-gold-500 transition-colors duration-300 shadow-golden"
                                >
                                    Logout
                                </button>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
}

export default Navbar;
