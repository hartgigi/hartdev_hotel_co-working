import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ApiService from '../../service/ApiService';
import Pagination from '../common/Pagination';

const ManageBookingsPage = () => {
    const [bookings, setBookings] = useState([]);
    const [filteredBookings, setFilteredBookings] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [bookingsPerPage] = useState(6);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                setIsLoading(true);
                const response = await ApiService.getAllBookings();
                const allBookings = response.bookingList;
                setBookings(allBookings);
                setFilteredBookings(allBookings);
            } catch (error) {
                console.error('Error fetching bookings:', error.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchBookings();
    }, []);

    useEffect(() => {
        filterBookings(searchTerm);
    }, [searchTerm, bookings]);

    const filterBookings = (term) => {
        if (term === '') {
            setFilteredBookings(bookings);
        } else {
            const filtered = bookings.filter((booking) =>
                booking.bookingConfirmationCode && booking.bookingConfirmationCode.toLowerCase().includes(term.toLowerCase())
            );
            setFilteredBookings(filtered);
        }
        setCurrentPage(1);
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const indexOfLastBooking = currentPage * bookingsPerPage;
    const indexOfFirstBooking = indexOfLastBooking - bookingsPerPage;
    const currentBookings = filteredBookings.slice(indexOfFirstBooking, indexOfLastBooking);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    if (isLoading) {
        return (
            <div className="container-custom py-16 max-w-6xl mx-auto text-white flex justify-center items-center min-h-[50vh]">
                <div className="flex flex-col items-center">
                    <svg className="animate-spin h-10 w-10 text-gold-400 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <p className="text-white/70">Loading booking records...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="container-custom py-16 max-w-6xl mx-auto text-white">
            <div className="text-center mb-10">
                <div className="inline-block mb-2">
                    <div className="h-px w-12 bg-gold-400 mx-auto"></div>
                </div>
                <h2 className="text-3xl font-display font-semibold text-white">Booking Management</h2>
                <p className="text-white/70 mt-2 font-body">Manage all guest reservations</p>
            </div>

            <div className="bg-charcoal-900 border border-gold-400/20 shadow-elegant p-8 mb-8">
                <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="w-full md:w-auto flex-grow">
                        <label className="text-gold-400 text-sm font-medium uppercase tracking-wider block mb-2">
                            Search by Confirmation Code
                        </label>
                        <div className="relative">
                            <input
                                type="text"
                                value={searchTerm}
                                onChange={handleSearchChange}
                                placeholder="Enter booking confirmation code"
                                className="w-full bg-charcoal-800 border-0 border-b border-gold-400/30 focus:border-gold-400 px-3 py-2 text-white placeholder-white/30 focus:ring-0"
                            />
                            <div className="absolute right-3 top-2 text-gold-400/70 pointer-events-none">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {filteredBookings.length === 0 ? (
                <div className="bg-charcoal-900 border border-gold-400/20 shadow-elegant p-12 text-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-white/20 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <p className="text-white/60">No bookings found matching your search criteria.</p>
                </div>
            ) : (
                <>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {currentBookings.map((booking) => (
                            <div key={booking.id} className="bg-charcoal-900 border border-gold-400/20 shadow-elegant hover:border-gold-400/50 transition-all duration-300">
                                <div className="border-b border-charcoal-800 p-4 flex justify-between items-center">
                                    <h3 className="text-lg font-display text-white flex items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gold-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                        Booking #{booking.id}
                                    </h3>
                                    <span className="bg-gold-400/20 text-gold-400 px-2 py-1 text-xs uppercase tracking-wider">
                                        {booking.bookingConfirmationCode}
                                    </span>
                                </div>
                                
                                <div className="p-5 space-y-4">
                                    <div className="grid grid-cols-2 gap-3 text-sm">
                                        <div>
                                            <p className="text-white/50 text-xs uppercase mb-1">Check In</p>
                                            <p className="text-white">{booking.checkInDate}</p>
                                        </div>
                                        <div>
                                            <p className="text-white/50 text-xs uppercase mb-1">Check Out</p>
                                            <p className="text-white">{booking.checkOutDate}</p>
                                        </div>
                                        <div>
                                            <p className="text-white/50 text-xs uppercase mb-1">Room Type</p>
                                            <p className="text-gold-400">{booking.room?.roomType || "N/A"}</p>
                                        </div>
                                        <div>
                                            <p className="text-white/50 text-xs uppercase mb-1">Guests</p>
                                            <p className="text-white">{booking.totalNumOfGuest}</p>
                                        </div>
                                    </div>
                                    
                                    <div className="pt-3">
                                        <p className="text-white/50 text-xs uppercase mb-1">Guest Info</p>
                                        <p className="text-white">{booking.user?.name || "N/A"}</p>
                                    </div>
                                    
                                    <button
                                        onClick={() => navigate(`/admin/edit-booking/${booking.bookingConfirmationCode}`)}
                                        className="w-full mt-4 border border-gold-400/50 text-gold-400 hover:bg-gold-400/10 transition-colors duration-300 py-2 flex items-center justify-center uppercase tracking-wider text-sm font-medium"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                        </svg>
                                        Manage Booking
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                    
                    <div className="mt-8">
                        <Pagination
                            roomsPerPage={bookingsPerPage}
                            totalRooms={filteredBookings.length}
                            currentPage={currentPage}
                            paginate={paginate}
                        />
                    </div>
                </>
            )}
        </div>
    );
};

export default ManageBookingsPage;
