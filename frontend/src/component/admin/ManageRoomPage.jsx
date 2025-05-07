import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ApiService from '../../service/ApiService';
import Pagination from '../common/Pagination';
import RoomResult from '../common/RoomResult';

const ManageRoomPage = () => {
  const [rooms, setRooms] = useState([]);
  const [filteredRooms, setFilteredRooms] = useState([]);
  const [roomTypes, setRoomTypes] = useState([]);
  const [selectedRoomType, setSelectedRoomType] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [roomsPerPage] = useState(5);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await ApiService.getAllRooms();
        const allRooms = response.roomList;
        
        const types = await ApiService.getRoomTypes();
        
        setRooms(allRooms);
        setFilteredRooms(allRooms);
        setRoomTypes(types);
      } catch (error) {
        console.error('Error fetching data:', error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleRoomTypeChange = (e) => {
    setSelectedRoomType(e.target.value);
    filterRooms(e.target.value);
  };

  const filterRooms = (type) => {
    if (type === '') {
      setFilteredRooms(rooms);
    } else {
      const filtered = rooms.filter((room) => room.roomType === type);
      setFilteredRooms(filtered);
    }
    setCurrentPage(1); // Reset to first page after filtering
  };

  // Pagination
  const indexOfLastRoom = currentPage * roomsPerPage;
  const indexOfFirstRoom = indexOfLastRoom - roomsPerPage;
  const currentRooms = filteredRooms.slice(indexOfFirstRoom, indexOfLastRoom);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (isLoading) {
    return (
      <div className="container-custom py-16 max-w-6xl mx-auto text-white flex justify-center items-center min-h-[50vh]">
        <div className="flex flex-col items-center">
          <svg className="animate-spin h-10 w-10 text-gold-400 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <p className="text-white/70">Loading room inventory...</p>
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
        <h2 className="text-3xl font-display font-semibold text-white">Room Inventory Management</h2>
        <p className="text-white/70 mt-2 font-body">Manage your hotel room inventory</p>
      </div>

      <div className="bg-charcoal-900 border border-gold-400/20 shadow-elegant p-8 mb-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="w-full md:w-auto">
            <label className="text-gold-400 text-sm font-medium uppercase tracking-wider block mb-2">
              Filter by Room Type
            </label>
            <div className="relative inline-block w-full md:w-64">
              <select 
                value={selectedRoomType} 
                onChange={handleRoomTypeChange}
                className="appearance-none w-full bg-charcoal-800 border-0 border-b border-gold-400/30 focus:border-gold-400 px-3 py-2 text-white pr-8 focus:ring-0"
              >
                <option value="">All Room Types</option>
                {roomTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none text-gold-400">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          <button 
            onClick={() => navigate('/admin/add-room')}
            className="bg-gold-400 text-charcoal-950 hover:bg-gold-500 transition-colors duration-300 shadow-golden py-2.5 px-6 flex items-center justify-center uppercase tracking-wider text-sm font-medium w-full md:w-auto"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add New Room
          </button>
        </div>
      </div>

      {filteredRooms.length === 0 ? (
        <div className="bg-charcoal-900 border border-gold-400/20 shadow-elegant p-12 text-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-white/20 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          <p className="text-white/60 mb-4">No rooms found matching your criteria.</p>
          <button 
            onClick={() => navigate('/admin/add-room')}
            className="bg-gold-400 text-charcoal-950 hover:bg-gold-500 transition-colors duration-300 shadow-golden py-2 px-4 inline-flex items-center justify-center uppercase tracking-wider text-sm font-medium"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add New Room
          </button>
        </div>
      ) : (
        <>
          <RoomResult roomSearchResults={currentRooms} adminMode={true} />
          
          <div className="mt-8">
            <Pagination
              roomsPerPage={roomsPerPage}
              totalRooms={filteredRooms.length}
              currentPage={currentPage}
              paginate={paginate}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default ManageRoomPage;
