import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ApiService from '../../service/ApiService';

const AdminPage = () => {
    const [adminName, setAdminName] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchAdminName = async () => {
            try {
                setIsLoading(true);
                const response = await ApiService.getUserProfile();
                setAdminName(response.user.name);
            } catch (error) {
                console.error('Error fetching admin details:', error.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchAdminName();
    }, []);

    if (isLoading) {
        return (
            <div className="container-custom py-16 max-w-4xl mx-auto text-white flex justify-center items-center min-h-[50vh]">
                <div className="flex flex-col items-center">
                    <svg className="animate-spin h-10 w-10 text-gold-400 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <p className="text-white/70">Loading admin dashboard...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="container-custom py-16 max-w-4xl mx-auto text-white">
            <div className="bg-charcoal-900 border border-gold-400/20 shadow-elegant p-8">
                <div className="text-center mb-12">
                    <div className="inline-block mb-2">
                        <div className="h-px w-12 bg-gold-400 mx-auto"></div>
                    </div>
                    <h2 className="text-3xl font-display font-semibold text-white">Admin Dashboard</h2>
                    <p className="text-white/70 mt-2 font-body">
                        Welcome, <span className="text-gold-400">{adminName}</span>
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
                    <div 
                        onClick={() => navigate('/admin/manage-rooms')}
                        className="bg-charcoal-800 border border-gold-400/30 hover:border-gold-400/60 transition-all duration-300 p-8 flex flex-col items-center cursor-pointer group shadow-elegant"
                    >
                        <div className="bg-charcoal-900 p-4 rounded-full mb-4 border border-gold-400/30 group-hover:border-gold-400 transition-all duration-300">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-gold-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-display text-gold-400 mb-2">Manage Rooms</h3>
                        <p className="text-white/60 text-sm text-center mb-4">Add, edit or remove rooms from your hotel inventory</p>
                        <div className="mt-auto">
                            <span className="text-gold-400/80 text-sm flex items-center group-hover:text-gold-400 transition-colors">
                                <span>Access Room Management</span>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                </svg>
                            </span>
                        </div>
                    </div>

                    <div 
                        onClick={() => navigate('/admin/manage-bookings')}
                        className="bg-charcoal-800 border border-gold-400/30 hover:border-gold-400/60 transition-all duration-300 p-8 flex flex-col items-center cursor-pointer group shadow-elegant"
                    >
                        <div className="bg-charcoal-900 p-4 rounded-full mb-4 border border-gold-400/30 group-hover:border-gold-400 transition-all duration-300">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-gold-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-display text-gold-400 mb-2">Manage Bookings</h3>
                        <p className="text-white/60 text-sm text-center mb-4">View and manage all guest reservations</p>
                        <div className="mt-auto">
                            <span className="text-gold-400/80 text-sm flex items-center group-hover:text-gold-400 transition-colors">
                                <span>Access Booking Management</span>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                </svg>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AdminPage;
