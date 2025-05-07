import React, { useState } from "react";
import ApiService from "../../service/ApiService"; // Assuming your service is in a file called ApiService.js

const FindBookingPage = () => {
  const [confirmationCode, setConfirmationCode] = useState(""); // State variable for confirmation code
  const [bookingDetails, setBookingDetails] = useState(null); // State variable for booking details
  const [error, setError] = useState(null); // Track any errors
  const [isLoading, setIsLoading] = useState(false); // Track loading state

  const handleSearch = async () => {
    if (!confirmationCode.trim()) {
      setError("Please enter your booking confirmation code");
      setTimeout(() => setError(""), 5000);
      return;
    }
    try {
      setIsLoading(true);
      // Call API to get booking details
      const response = await ApiService.getBookingByConfirmationCode(
        confirmationCode
      );
      setBookingDetails(response.booking);
      setError(null); // Clear error if successful
    } catch (error) {
      setError(error.response?.data?.message || error.message);
      setTimeout(() => setError(""), 5000);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container-custom py-16 max-w-4xl mx-auto text-white">
      <div className="text-center mb-12">
        <div className="inline-block mb-2">
          <div className="h-px w-12 bg-gold-400 mx-auto"></div>
        </div>
        <h2 className="text-3xl font-display font-semibold text-white">Reservation Lookup</h2>
        <p className="text-white/70 mt-2 font-body">Retrieve your booking information</p>
      </div>

      <div className="bg-charcoal-900 border border-gold-400/20 shadow-elegant p-8 mb-8">
        <div className="flex flex-col md:flex-row gap-4 items-end">
          <div className="flex-grow space-y-2">
            <label className="text-gold-400 text-sm font-medium uppercase tracking-wider">
              Confirmation Code
            </label>
            <div className="relative">
              <input
                required
                type="text"
                placeholder="Enter your booking confirmation code"
                className="w-full bg-charcoal-800 border-0 border-b border-gold-400/30 focus:border-gold-400 px-3 py-2 text-white placeholder-white/30 focus:ring-0"
                value={confirmationCode}
                onChange={(e) => setConfirmationCode(e.target.value)}
              />
              <div className="absolute right-3 top-2 text-gold-400/70 pointer-events-none">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
                </svg>
              </div>
            </div>
          </div>
          <button 
            onClick={handleSearch}
            className="bg-gold-400 text-charcoal-950 hover:bg-gold-500 transition-colors duration-300 shadow-golden py-2.5 px-6 flex items-center justify-center uppercase tracking-wider text-sm font-medium"
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-charcoal-950" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Searching...
              </span>
            ) : (
              <span className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                Retrieve
              </span>
            )}
          </button>
        </div>
        
        {error && (
          <div className="mt-6 p-4 bg-charcoal-800 border-l-4 border-gold-400 text-white/80 text-sm">
            {error}
          </div>
        )}
      </div>

      {bookingDetails && (
        <div className="bg-charcoal-900 border border-gold-400/20 shadow-elegant">
          <div className="p-6 border-b border-charcoal-800">
            <h3 className="text-xl font-display text-gold-400 mb-1">Reservation Details</h3>
            <p className="text-white/50 text-sm">Booking information for your stay</p>
          </div>
          
          <div className="p-6 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="border-b border-charcoal-800 pb-4">
                  <h4 className="text-gold-400 text-sm font-medium uppercase tracking-wider mb-3">Booking Information</h4>
                  <ul className="space-y-2 text-white/70">
                    <li className="flex justify-between">
                      <span>Confirmation Code:</span>
                      <span className="font-medium text-white">{bookingDetails.bookingConfirmationCode}</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Check-in Date:</span>
                      <span>{bookingDetails.checkInDate}</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Check-out Date:</span>
                      <span>{bookingDetails.checkOutDate}</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Number of Adults:</span>
                      <span>{bookingDetails.numOfAdults}</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Number of Children:</span>
                      <span>{bookingDetails.numOfChildren}</span>
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="text-gold-400 text-sm font-medium uppercase tracking-wider mb-3">Guest Information</h4>
                  <ul className="space-y-2 text-white/70">
                    <li className="flex justify-between">
                      <span>Name:</span>
                      <span>{bookingDetails.user.name}</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Email:</span>
                      <span className="text-gold-400">{bookingDetails.user.email}</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Phone:</span>
                      <span>{bookingDetails.user.phoneNumber}</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div>
                <h4 className="text-gold-400 text-sm font-medium uppercase tracking-wider mb-3">Accommodation Details</h4>
                <p className="text-lg font-display text-white mb-4">{bookingDetails.room.roomType}</p>
                <div className="aspect-video w-full overflow-hidden">
                  <img
                    className="w-full h-full object-cover"
                    src={ApiService.getImageUrl(bookingDetails.room.roomPhotoUrl)}
                    alt={bookingDetails.room.roomType}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "https://images.unsplash.com/photo-1611892440504-42a792e24d32?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80";
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FindBookingPage;
