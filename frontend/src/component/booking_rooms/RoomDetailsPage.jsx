import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ApiService from "../../service/ApiService"; // Assuming your service is in a file called ApiService.js
import DatePicker from "react-datepicker";
// import 'react-datepicker/dist/react-datepicker.css';

// Conversion rate from USD to THB (Thai Baht)
const USD_TO_THB_RATE = 35;

const RoomDetailsPage = () => {
  const navigate = useNavigate(); // Access the navigate function to navigate
  const { roomId } = useParams(); // Get room ID from URL parameters
  const [roomDetails, setRoomDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // Track loading state
  const [error, setError] = useState(null); // Track any errors
  const [checkInDate, setCheckInDate] = useState(null); // State variable for check-in date
  const [checkOutDate, setCheckOutDate] = useState(null); // State variable for check-out date
  const [numAdults, setNumAdults] = useState(1); // State variable for number of adults
  const [numChildren, setNumChildren] = useState(0); // State variable for number of children
  const [totalPrice, setTotalPrice] = useState(0); // State variable for total booking price
  const [totalGuests, setTotalGuests] = useState(1); // State variable for total number of guests
  const [showDatePicker, setShowDatePicker] = useState(false); // State variable to control date picker visibility
  const [userId, setUserId] = useState(""); // Set user id
  const [showMessage, setShowMessage] = useState(false); // State variable to control message visibility
  const [confirmationCode, setConfirmationCode] = useState(""); // State variable for booking confirmation code
  const [errorMessage, setErrorMessage] = useState(""); // State variable for error message

  // Function to convert USD to THB
  const convertToTHB = (usdAmount) => {
    return (usdAmount * USD_TO_THB_RATE).toFixed(0);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true); // Set loading state to true
        const response = await ApiService.getRoomById(roomId);
        setRoomDetails(response.room);
        const userProfile = await ApiService.getUserProfile();
        setUserId(userProfile.user.id);
      } catch (error) {
        setError(error.response?.data?.message || error.message);
      } finally {
        setIsLoading(false); // Set loading state to false after fetching or error
      }
    };
    fetchData();
  }, [roomId]); // Re-run effect when roomId changes

  const handleConfirmBooking = async () => {
    // Check if check-in and check-out dates are selected
    if (!checkInDate || !checkOutDate) {
      setErrorMessage("Please select check-in and check-out dates.");
      setTimeout(() => setErrorMessage(""), 5000); // Clear error message after 5 seconds
      return;
    }

    // Check if number of adults and children are valid
    if (
      isNaN(numAdults) ||
      numAdults < 1 ||
      isNaN(numChildren) ||
      numChildren < 0
    ) {
      setErrorMessage("Please enter valid numbers for adults and children.");
      setTimeout(() => setErrorMessage(""), 5000); // Clear error message after 5 seconds
      return;
    }

    // Calculate total number of days
    const oneDay = 24 * 60 * 60 * 1000; // hours * minutes * seconds * milliseconds
    const startDate = new Date(checkInDate);
    const endDate = new Date(checkOutDate);
    const totalDays = Math.round(Math.abs((endDate - startDate) / oneDay));

    // Calculate total number of guests
    const totalGuests = numAdults + numChildren;

    // Calculate total price based on the number of days
    const roomPricePerNight = roomDetails.roomPrice;
    const totalPrice = roomPricePerNight * totalDays;

    setTotalPrice(totalPrice);
    setTotalGuests(totalGuests);
  };

  const acceptBooking = async () => {
    try {
      // Ensure checkInDate and checkOutDate are Date objects
      const startDate = new Date(checkInDate);
      const endDate = new Date(checkOutDate);

      // Log the original dates for debugging
      console.log("Original Check-in Date:", startDate);
      console.log("Original Check-out Date:", endDate);

      // Convert dates to YYYY-MM-DD format, adjusting for time zone differences
      const formattedCheckInDate = new Date(
        startDate.getTime() - startDate.getTimezoneOffset() * 60000
      )
        .toISOString()
        .split("T")[0];
      const formattedCheckOutDate = new Date(
        endDate.getTime() - endDate.getTimezoneOffset() * 60000
      )
        .toISOString()
        .split("T")[0];

      // Log the original dates for debugging
      console.log("Formated Check-in Date:", formattedCheckInDate);
      console.log("Formated Check-out Date:", formattedCheckOutDate);

      // Create booking object
      const booking = {
        checkInDate: formattedCheckInDate,
        checkOutDate: formattedCheckOutDate,
        numOfAdults: numAdults,
        numOfChildren: numChildren,
      };
      console.log(booking);
      console.log(checkOutDate);

      // Make booking
      const response = await ApiService.bookRoom(roomId, userId, booking);
      if (response.statusCode === 200) {
        setConfirmationCode(response.bookingConfirmationCode); // Set booking confirmation code
        setShowMessage(true); // Show message
        // Hide message and navigate to homepage after 5 seconds
        setTimeout(() => {
          setShowMessage(false);
          navigate("/rooms"); // Navigate to rooms
        }, 10000);
      }
    } catch (error) {
      setErrorMessage(error.response?.data?.message || error.message);
      setTimeout(() => setErrorMessage(""), 5000); // Clear error message after 5 seconds
    }
  };

  if (isLoading) {
    return <p className="room-detail-loading">Loading room details...</p>;
  }

  if (error) {
    return <p className="room-detail-loading">{error}</p>;
  }

  if (!roomDetails) {
    return <p className="room-detail-loading">Room not found.</p>;
  }

  const { roomType, roomPrice, roomPhotoUrl, description, bookings } =
    roomDetails;

  return (
    <div className="room-details-booking w-full min-h-screen flex flex-col items-center justify-center bg-charcoal-950">
      {showMessage && (
        <p className="booking-success-message text-center mx-auto">
          Booking successful! Confirmation code: {confirmationCode}. An SMS and
          email of your booking details have been sent to you.
        </p>
      )}
      {errorMessage && <p className="error-message text-center mx-auto">{errorMessage}</p>}
      <h2 className="text-3xl font-display font-bold text-gold-400 mb-6 flex items-center gap-2 justify-center mx-auto">
        Room Details
        <svg className="h-7 w-7 text-gold-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01" /></svg>
      </h2>
      <img
        src={ApiService.getImageUrl(roomPhotoUrl)}
        alt={roomType}
        className="room-details-image rounded shadow-elegant mb-6 mx-auto"
      />
      <div className="room-details-info mb-8 text-center mx-auto">
        <h3 className="text-2xl font-display text-white mb-1">{roomType}</h3>
        <p className="text-gold-400 font-semibold">Price: ฿{convertToTHB(roomPrice)} / night</p>
        <p className="text-white/70 mt-2">{description}</p>
      </div>
      {bookings && bookings.length > 0 && (
        <div className="mb-8 mx-auto">
          <h3 className="text-xl font-bold text-gold-400 mb-2 text-center">Existing Booking Details</h3>
          <ul className="booking-list">
            {bookings.map((booking, index) => (
              <li key={booking.id} className="booking-item text-white/80 text-center">
                <span className="booking-number text-gold-400 font-medium">Booking {index + 1} </span>
                <span className="booking-text">Check-in: {booking.checkInDate} </span>
                <span className="booking-text">Out: {booking.checkOutDate}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
      <div className="booking-info flex flex-col gap-4 items-center w-full mx-auto">
        <div className="flex gap-4 w-full justify-center mx-auto">
          <button
            className="btn-golden w-40"
            onClick={() => setShowDatePicker(true)}
          >
            Book Now
          </button>
          <button
            className="btn-outline w-40"
            onClick={() => setShowDatePicker(false)}
          >
            Go Back
          </button>
        </div>
        {showDatePicker && (
          <div className="date-picker-container bg-charcoal-900 border border-gold-400/20 rounded shadow-elegant p-6 mt-4 w-full max-w-md mx-auto flex flex-col items-center">
            <div className="flex flex-col gap-4 w-full">
              <DatePicker
                className="form-input"
                selected={checkInDate}
                onChange={(date) => setCheckInDate(date)}
                selectsStart
                startDate={checkInDate}
                endDate={checkOutDate}
                placeholderText="Check-in Date"
                dateFormat="dd/MM/yyyy"
              />
              <DatePicker
                className="form-input"
                selected={checkOutDate}
                onChange={(date) => setCheckOutDate(date)}
                selectsEnd
                startDate={checkInDate}
                endDate={checkOutDate}
                minDate={checkInDate}
                placeholderText="Check-out Date"
                dateFormat="dd/MM/yyyy"
              />
              <div className="guest-container flex gap-4 w-full">
                <div className="guest-div flex-1">
                  <label className="form-label">Adults:</label>
                  <input
                    type="number"
                    min="1"
                    value={numAdults}
                    onChange={(e) => setNumAdults(parseInt(e.target.value))}
                    className="form-input"
                  />
                </div>
                <div className="guest-div flex-1">
                  <label className="form-label">Children:</label>
                  <input
                    type="number"
                    min="0"
                    value={numChildren}
                    onChange={(e) => setNumChildren(parseInt(e.target.value))}
                    className="form-input"
                  />
                </div>
              </div>
              <button
                className="btn-golden w-full mt-2"
                onClick={handleConfirmBooking}
                type="button"
              >
                Confirm Booking
              </button>
            </div>
          </div>
        )}
        {totalPrice > 0 && (
          <div className="total-price bg-charcoal-900 border border-gold-400/20 rounded shadow-elegant p-6 mt-4 w-full max-w-md mx-auto text-center">
            <p className="text-gold-400 font-semibold text-lg">Total Price: ฿{convertToTHB(totalPrice)}</p>
            <p className="text-white/80 mb-4">Total Guests: {totalGuests}</p>
            <button onClick={acceptBooking} className="btn-golden w-full text-base font-bold py-3">
              Accept Booking
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default RoomDetailsPage;
