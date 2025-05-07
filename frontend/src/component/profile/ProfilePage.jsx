import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ApiService from "../../service/ApiService";

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        setIsLoading(true);
        const response = await ApiService.getUserProfile();
        // Fetch user bookings using the fetched user ID
        const userPlusBookings = await ApiService.getUserBookings(
          response.user.id
        );
        setUser(userPlusBookings.user);
      } catch (error) {
        setError(error.response?.data?.message || error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  const handleLogout = () => {
    ApiService.logout();
    navigate("/home");
  };

  const handleEditProfile = () => {
    navigate("/edit-profile");
  };

  if (isLoading) {
    return (
      <div className="container-custom py-16 max-w-5xl mx-auto text-white flex justify-center items-center min-h-[50vh]">
        <div className="flex flex-col items-center">
          <svg className="animate-spin h-10 w-10 text-gold-400 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <p className="text-white/70">Loading your profile information...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container-custom py-16 max-w-5xl mx-auto text-white">
      <div className="bg-charcoal-900 border border-gold-400/20 shadow-elegant">
        <div className="p-8 border-b border-charcoal-800 flex flex-col md:flex-row justify-between items-center">
          <div>
            <h2 className="text-2xl font-display text-white mb-1">
              Welcome, <span className="text-gold-400">{user?.name}</span>
            </h2>
            <p className="text-white/60 text-sm">Manage your account and view your reservation history</p>
          </div>
          
          <div className="flex mt-4 md:mt-0 space-x-4">
            <button 
              className="border border-gold-400/50 text-gold-400 hover:bg-gold-400/10 transition-colors duration-300 py-2 px-4 flex items-center justify-center uppercase tracking-wider text-sm font-medium"
              onClick={handleEditProfile}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
              </svg>
              Edit Profile
            </button>
            <button 
              className="bg-charcoal-800 text-white hover:bg-charcoal-700 transition-colors duration-300 py-2 px-4 flex items-center justify-center uppercase tracking-wider text-sm font-medium"
              onClick={handleLogout}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Logout
            </button>
          </div>
        </div>
        
        {error && (
          <div className="p-6 bg-charcoal-800 border-l-4 border-gold-400 text-white/80 text-sm m-6">
            {error}
          </div>
        )}
        
        {user && (
          <div className="p-8 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-1">
              <div className="bg-charcoal-800/50 p-6">
                <h3 className="text-gold-400 text-sm font-medium uppercase tracking-wider mb-4">Personal Information</h3>
                
                <div className="space-y-4 text-white/80">
                  <div>
                    <p className="text-white/50 text-xs uppercase mb-1">Full Name</p>
                    <p className="text-white text-lg">{user.name}</p>
                  </div>
                  
                  <div>
                    <p className="text-white/50 text-xs uppercase mb-1">Email Address</p>
                    <p className="text-gold-400">{user.email}</p>
                  </div>
                  
                  <div>
                    <p className="text-white/50 text-xs uppercase mb-1">Phone Number</p>
                    <p>{user.phoneNumber}</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="md:col-span-2">
              <h3 className="text-gold-400 text-sm font-medium uppercase tracking-wider mb-4">Reservation History</h3>
              
              {user.bookings.length > 0 ? (
                <div className="space-y-6">
                  {user.bookings.map((booking) => (
                    <div key={booking.id} className="bg-charcoal-800/50 p-6 border-l-2 border-gold-400 hover:border-opacity-100 transition-all duration-200">
                      <div className="flex flex-col md:flex-row gap-6">
                        <div className="md:w-1/3 aspect-video overflow-hidden">
                          <img
                            src={ApiService.getImageUrl(booking.room.roomPhotoUrl)}
                            alt={booking.room.roomType}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = "https://images.unsplash.com/photo-1611892440504-42a792e24d32?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80";
                            }}
                          />
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex flex-wrap justify-between items-start mb-3">
                            <h4 className="text-lg font-display text-white">{booking.room.roomType}</h4>
                            <span className="bg-gold-400/20 text-gold-400 px-2 py-1 text-xs uppercase tracking-wider">
                              {booking.bookingConfirmationCode}
                            </span>
                          </div>
                          
                          <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-white/70 text-sm mb-4">
                            <div className="flex items-center">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gold-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                              </svg>
                              <span>Check-in: <span className="text-white">{booking.checkInDate}</span></span>
                            </div>
                            <div className="flex items-center">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gold-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                              </svg>
                              <span>Check-out: <span className="text-white">{booking.checkOutDate}</span></span>
                            </div>
                            <div className="flex items-center">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gold-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                              </svg>
                              <span>Guests: <span className="text-white">{booking.totalNumOfGuest}</span></span>
                            </div>
                          </div>
                          
                          <button
                            className="text-gold-400 hover:text-gold-300 transition-colors text-sm flex items-center"
                            onClick={() => navigate(`/find-booking?code=${booking.bookingConfirmationCode}`)}
                          >
                            <span className="mr-1">View reservation details</span>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-charcoal-800/50 p-8 text-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-white/30 mx-auto mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <p className="text-white/60">You don't have any reservation history yet.</p>
                  <button
                    className="bg-gold-400 text-charcoal-950 hover:bg-gold-500 transition-colors duration-300 shadow-golden py-2 px-4 mt-4 inline-flex items-center justify-center uppercase tracking-wider text-sm font-medium"
                    onClick={() => navigate('/rooms')}
                  >
                    Browse Available Rooms
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
