import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ApiService from "../../service/ApiService"; // Assuming your service is in a file called ApiService.js

// Conversion rate from USD to THB (Thai Baht)
const USD_TO_THB_RATE = 35;

// Function to convert USD to THB
const convertToTHB = (usdAmount) => {
  return (usdAmount * USD_TO_THB_RATE).toFixed(0);
};

const EditBookingPage = () => {
  const navigate = useNavigate();
  const { bookingCode } = useParams();
  const [bookingDetails, setBookingDetails] = useState(null); // State variable for booking details
  const [error, setError] = useState(null); // Track any errors
  const [success, setSuccessMessage] = useState(null); // Track any errors
  const [isLoading, setIsLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    const fetchBookingDetails = async () => {
      try {
        setIsLoading(true);
        const response = await ApiService.getBookingByConfirmationCode(
          bookingCode
        );
        setBookingDetails(response.booking);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBookingDetails();
  }, [bookingCode]);

  const archiveBooking = async (bookingId) => {
    if (!window.confirm("Are you sure you want to archive this booking? This action cannot be undone.")) {
      return;
    }

    try {
      setIsProcessing(true);
      const response = await ApiService.cancelBooking(bookingId);
      if (response.statusCode === 200) {
        setSuccessMessage("The booking was successfully archived");

        setTimeout(() => {
          setSuccessMessage("");
          navigate("/admin/manage-bookings");
        }, 3000);
      }
    } catch (error) {
      setError(error.response?.data?.message || error.message);
      setTimeout(() => setError(""), 5000);
    } finally {
      setIsProcessing(false);
    }
  };

  if (isLoading) {
    return (
      <div className="container-custom py-16 max-w-4xl mx-auto text-white flex justify-center items-center min-h-[50vh]">
        <div className="flex flex-col items-center">
          <svg className="animate-spin h-10 w-10 text-gold-400 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <p className="text-white/70">Loading booking details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container-custom py-16 max-w-5xl mx-auto text-white">
      <div className="text-center mb-10">
        <div className="inline-block mb-2">
          <div className="h-px w-12 bg-gold-400 mx-auto"></div>
        </div>
        <h2 className="text-3xl font-display font-semibold text-white">Booking Management</h2>
        <p className="text-white/70 mt-2 font-body">Review and manage reservation details</p>
      </div>

      {error && (
        <div className="mb-8 p-4 bg-charcoal-800 border-l-4 border-gold-400 text-white/80 text-sm">
          {error}
        </div>
      )}
      
      {success && (
        <div className="mb-8 p-4 bg-charcoal-800 border-l-4 border-gold-300 text-gold-300 text-sm">
          {success}
        </div>
      )}

      {bookingDetails && (
        <div className="bg-charcoal-900 border border-gold-400/20 shadow-elegant">
          <div className="p-6 border-b border-charcoal-800 flex flex-col md:flex-row justify-between items-center gap-4">
            <div>
              <div className="flex items-center mb-1">
                <h3 className="text-xl font-display text-white">Booking #{bookingDetails.id}</h3>
                <span className="bg-gold-400/20 text-gold-400 px-2 py-1 text-xs uppercase tracking-wider ml-3">
                  {bookingDetails.bookingConfirmationCode}
                </span>
              </div>
              <p className="text-white/50 text-sm">Created on {new Date(bookingDetails.createdAt).toLocaleDateString()}</p>
            </div>
            
            <button
              onClick={() => archiveBooking(bookingDetails.id)}
              disabled={isProcessing}
              className="bg-red-900/30 text-red-300 hover:bg-red-900/50 transition-colors duration-300 py-2 px-4 flex items-center justify-center uppercase tracking-wider text-sm font-medium"
            >
              {isProcessing ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </span>
              ) : (
                <span className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                  </svg>
                  Archive Booking
                </span>
              )}
            </button>
          </div>
          
          <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-1 space-y-8">
              <div>
                <h4 className="text-gold-400 text-sm font-medium uppercase tracking-wider mb-4 border-b border-charcoal-800 pb-2">Reservation Details</h4>
                <ul className="space-y-3">
                  <li className="flex justify-between">
                    <span className="text-white/60">Check-in:</span>
                    <span className="text-white font-medium">{bookingDetails.checkInDate}</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-white/60">Check-out:</span>
                    <span className="text-white font-medium">{bookingDetails.checkOutDate}</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-white/60">Adults:</span>
                    <span className="text-white font-medium">{bookingDetails.numOfAdults}</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-white/60">Children:</span>
                    <span className="text-white font-medium">{bookingDetails.numOfChildren}</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-white/60">Total Guests:</span>
                    <span className="text-white font-medium">{bookingDetails.totalNumOfGuest}</span>
                  </li>
                </ul>
              </div>
              
              <div>
                <h4 className="text-gold-400 text-sm font-medium uppercase tracking-wider mb-4 border-b border-charcoal-800 pb-2">Guest Information</h4>
                <ul className="space-y-3">
                  <li className="flex justify-between">
                    <span className="text-white/60">Name:</span>
                    <span className="text-white font-medium">{bookingDetails.user.name}</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-white/60">Email:</span>
                    <span className="text-gold-400">{bookingDetails.user.email}</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-white/60">Phone:</span>
                    <span className="text-white font-medium">{bookingDetails.user.phoneNumber}</span>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="md:col-span-2 space-y-6">
              <h4 className="text-gold-400 text-sm font-medium uppercase tracking-wider mb-4 border-b border-charcoal-800 pb-2">Room Information</h4>
              
              <div className="bg-charcoal-800/50 p-6 grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                <div className="aspect-video overflow-hidden">
                  <img
                    src={ApiService.getImageUrl(bookingDetails.room.roomPhotoUrl)}
                    alt={bookingDetails.room.roomType}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "https://images.unsplash.com/photo-1611892440504-42a792e24d32?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80";
                    }}
                  />
                </div>
                
                <div className="space-y-4">
                  <h5 className="text-lg font-display text-white">{bookingDetails.room.roomType}</h5>
                  
                  <div className="flex items-center text-gold-400 text-lg font-semibold">
                    ฿{convertToTHB(bookingDetails.room.roomPrice)}
                    <span className="text-white/50 text-sm font-normal ml-1">/ night</span>
                  </div>
                  
                  <p className="text-white/70 text-sm">{bookingDetails.room.roomDescription}</p>
                  
                  <button
                    className="text-gold-400 hover:text-gold-300 transition-colors text-sm flex items-center mt-2"
                    onClick={() => navigate(`/admin/edit-room/${bookingDetails.room.id}`)}
                  >
                    <span className="mr-1">Edit room details</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          <div className="p-6 border-t border-charcoal-800 flex justify-end">
            <button
              onClick={() => navigate('/admin/manage-bookings')}
              className="border border-white/20 text-white/70 hover:bg-white/5 transition-colors duration-300 py-2 px-4 uppercase tracking-wider text-sm font-medium"
            >
              Back to All Bookings
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditBookingPage;
