import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import ApiService from '../../service/ApiService';

const RoomSearch = ({ handleSearchResult }) => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [roomType, setRoomType] = useState('');
  const [roomTypes, setRoomTypes] = useState([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchRoomTypes = async () => {
      try {
        const types = await ApiService.getRoomTypes();
        setRoomTypes(types);
      } catch (error) {
        console.error('Error fetching room types:', error.message);
      }
    };
    fetchRoomTypes();
  }, []);

  /**This methods is going to be used to show errors */
  const showError = (message, timeout = 5000) => {
    setError(message);
    setTimeout(() => {
      setError('');
    }, timeout);
  };

  /**THis is going to be used to fetch avaailabe rooms from database base on seach data that'll be passed in */
  const handleInternalSearch = async () => {
    if (!startDate || !endDate || !roomType) {
      showError('Please select all fields to proceed with your reservation.');
      return false;
    }
    
    try {
      setIsLoading(true);
      // Convert startDate to the desired format
      const formattedStartDate = startDate ? startDate.toISOString().split('T')[0] : null;
      const formattedEndDate = endDate ? endDate.toISOString().split('T')[0] : null;
      
      // Call the API to fetch available rooms
      const response = await ApiService.getAvailableRoomsByDateAndType(formattedStartDate, formattedEndDate, roomType);

      // Check if the response is successful
      if (response.statusCode === 200) {
        if (response.roomList.length === 0) {
          showError('We regret to inform you that no accommodations are available for your selected dates and preferences.');
          handleSearchResult([]);
          return;
        }
        handleSearchResult(response.roomList);
        setError('');
      }
    } catch (error) {
      showError("An error occurred while processing your request: " + (error.response?.data?.message || error.message));
      handleSearchResult([]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-charcoal-900 border border-gold-400/20 shadow-elegant p-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="space-y-3">
          <label className="text-gold-400 text-sm font-medium uppercase tracking-wider">Arrival Date</label>
          <div className="relative">
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              dateFormat="dd/MM/yyyy"
              placeholderText="Select Arrival Date"
              className="w-full bg-charcoal-800 border-0 border-b border-gold-400/30 focus:border-gold-400 px-3 py-2 text-white placeholder-white/30 focus:ring-0"
              minDate={new Date()}
              selectsStart
              startDate={startDate}
              endDate={endDate}
              wrapperClassName="w-full"
            />
            <div className="absolute right-3 top-2 text-gold-400 pointer-events-none">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          </div>
        </div>
        
        <div className="space-y-3">
          <label className="text-gold-400 text-sm font-medium uppercase tracking-wider">Departure Date</label>
          <div className="relative">
            <DatePicker
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              dateFormat="dd/MM/yyyy"
              placeholderText="Select Departure Date"
              className="w-full bg-charcoal-800 border-0 border-b border-gold-400/30 focus:border-gold-400 px-3 py-2 text-white placeholder-white/30 focus:ring-0"
              minDate={startDate || new Date()}
              selectsEnd
              startDate={startDate}
              endDate={endDate}
              wrapperClassName="w-full"
            />
            <div className="absolute right-3 top-2 text-gold-400 pointer-events-none">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <label className="text-gold-400 text-sm font-medium uppercase tracking-wider">Accommodation Type</label>
          <div className="relative">
            <select 
              value={roomType} 
              onChange={(e) => setRoomType(e.target.value)}
              className="w-full bg-charcoal-800 border-0 border-b border-gold-400/30 focus:border-gold-400 px-3 py-2 text-white focus:ring-0 appearance-none"
            >
              <option value="" className="bg-charcoal-800">Select Type</option>
              {roomTypes.map((type) => (
                <option key={type} value={type} className="bg-charcoal-800">
                  {type}
                </option>
              ))}
            </select>
            <div className="absolute right-3 top-2 text-gold-400 pointer-events-none">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>
        
        <div className="flex items-end">
          <button 
            className="w-full bg-gold-400 text-charcoal-950 hover:bg-gold-500 transition-colors duration-300 shadow-golden py-2 flex items-center justify-center uppercase tracking-wider text-sm font-medium"
            onClick={handleInternalSearch}
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
              <>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                Check Availability
              </>
            )}
          </button>
        </div>
      </div>
      
      {error && (
        <div className="mt-6 p-4 bg-charcoal-800 border-l-4 border-gold-400 text-white/80 text-sm">
          {error}
        </div>
      )}
    </div>
  );
};

export default RoomSearch;
