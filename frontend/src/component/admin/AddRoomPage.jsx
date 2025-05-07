import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ApiService from '../../service/ApiService';

const AddRoomPage = () => {
    const navigate = useNavigate();
    const [roomDetails, setRoomDetails] = useState({
        roomPhotoUrl: '',
        roomType: '',
        roomPrice: '',
        roomDescription: '',
    });
    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [roomTypes, setRoomTypes] = useState([]);
    const [newRoomType, setNewRoomType] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        const fetchRoomTypes = async () => {
            try {
                setIsLoading(true);
                const types = await ApiService.getRoomTypes();
                setRoomTypes(types);
            } catch (error) {
                console.error('Error fetching room types:', error.message);
            } finally {
                setIsLoading(false);
            }
        };
        fetchRoomTypes();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setRoomDetails(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleRoomTypeChange = (e) => {
        if (e.target.value === 'new') {
            setNewRoomType(true);
            setRoomDetails(prevState => ({ ...prevState, roomType: '' }));
        } else {
            setNewRoomType(false);
            setRoomDetails(prevState => ({ ...prevState, roomType: e.target.value }));
        }
    };

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
            setPreview(URL.createObjectURL(selectedFile));
        } else {
            setFile(null);
            setPreview(null);
        }
    };

    const addRoom = async () => {
        if (!roomDetails.roomType || !roomDetails.roomPrice || !roomDetails.roomDescription) {
            setError('Please fill in all required fields to add a new room.');
            setTimeout(() => setError(''), 5000);
            return;
        }

        if (!window.confirm('Are you sure you want to add this room?')) {
            return;
        }

        try {
            setIsSubmitting(true);
            const formData = new FormData();
            formData.append('roomType', roomDetails.roomType);
            formData.append('roomPrice', roomDetails.roomPrice);
            formData.append('roomDescription', roomDetails.roomDescription);

            if (file) {
                formData.append('photo', file);
            }

            const result = await ApiService.addRoom(formData);
            if (result.statusCode === 200) {
                setSuccess('Room added successfully.');
                
                setTimeout(() => {
                    setSuccess('');
                    navigate('/admin/manage-rooms');
                }, 3000);
            }
        } catch (error) {
            setError(error.response?.data?.message || error.message);
            setTimeout(() => setError(''), 5000);
        } finally {
            setIsSubmitting(false);
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
                    <p className="text-white/70">Loading...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="container-custom py-16 max-w-4xl mx-auto text-white">
            <div className="text-center mb-10">
                <div className="inline-block mb-2">
                    <div className="h-px w-12 bg-gold-400 mx-auto"></div>
                </div>
                <h2 className="text-3xl font-display font-semibold text-white">Add New Room</h2>
                <p className="text-white/70 mt-2 font-body">Create a new room in your hotel inventory</p>
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

            <div className="bg-charcoal-900 border border-gold-400/20 shadow-elegant p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-gold-400 text-sm font-medium uppercase tracking-wider" htmlFor="roomType">
                                Room Type <span className="text-gold-400/60">*</span>
                            </label>
                            {!newRoomType ? (
                                <div className="relative">
                                    <select 
                                        id="roomType"
                                        value={roomDetails.roomType} 
                                        onChange={handleRoomTypeChange}
                                        className="appearance-none w-full bg-charcoal-800 border-0 border-b border-gold-400/30 focus:border-gold-400 px-3 py-2 text-white pr-8 focus:ring-0"
                                    >
                                        <option value="">Select a room type</option>
                                        {roomTypes.map(type => (
                                            <option key={type} value={type}>{type}</option>
                                        ))}
                                        <option value="new">Other (please specify)</option>
                                    </select>
                                    <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none text-gold-400">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </div>
                                </div>
                            ) : (
                                <div className="relative">
                                    <input
                                        id="roomType"
                                        type="text"
                                        name="roomType"
                                        placeholder="Enter new room type"
                                        className="w-full bg-charcoal-800 border-0 border-b border-gold-400/30 focus:border-gold-400 px-3 py-2 text-white placeholder-white/30 focus:ring-0"
                                        value={roomDetails.roomType}
                                        onChange={handleChange}
                                        required
                                    />
                                    <div className="absolute right-3 top-2 text-gold-400 pointer-events-none">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                                        </svg>
                                    </div>
                                </div>
                            )}
                            {newRoomType && (
                                <button 
                                    type="button" 
                                    onClick={() => setNewRoomType(false)}
                                    className="text-gold-400 hover:text-gold-300 text-xs mt-2 flex items-center"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                    </svg>
                                    Back to selection
                                </button>
                            )}
                        </div>

                        <div className="space-y-2">
                            <label className="text-gold-400 text-sm font-medium uppercase tracking-wider" htmlFor="roomPrice">
                                Room Price (฿) <span className="text-gold-400/60">*</span>
                            </label>
                            <div className="relative">
                                <input
                                    id="roomPrice"
                                    type="text"
                                    name="roomPrice"
                                    className="w-full bg-charcoal-800 border-0 border-b border-gold-400/30 focus:border-gold-400 px-3 py-2 text-white placeholder-white/30 focus:ring-0"
                                    value={roomDetails.roomPrice}
                                    onChange={handleChange}
                                    placeholder="Enter price per night in Thai Baht"
                                    required
                                />
                                <div className="absolute right-3 top-2 text-gold-400 pointer-events-none">
                                    ฿
                                </div>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-gold-400 text-sm font-medium uppercase tracking-wider" htmlFor="roomDescription">
                                Room Description <span className="text-gold-400/60">*</span>
                            </label>
                            <textarea
                                id="roomDescription"
                                name="roomDescription"
                                rows="6"
                                className="w-full bg-charcoal-800 border border-gold-400/30 focus:border-gold-400 px-3 py-2 text-white placeholder-white/30 focus:ring-0 resize-none"
                                value={roomDetails.roomDescription}
                                onChange={handleChange}
                                placeholder="Describe the room amenities and features"
                                required
                            ></textarea>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div>
                            <label className="text-gold-400 text-sm font-medium uppercase tracking-wider block mb-3">
                                Room Photo
                            </label>
                            <div className="bg-charcoal-800/50 p-1 border border-gold-400/20 aspect-video mb-4 overflow-hidden">
                                {preview ? (
                                    <img
                                        src={preview}
                                        alt="Room Preview"
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center bg-charcoal-900/50 text-white/30">
                                        No image selected
                                    </div>
                                )}
                            </div>
                            <div className="relative">
                                <input
                                    type="file"
                                    name="roomPhoto"
                                    onChange={handleFileChange}
                                    className="w-full opacity-0 absolute inset-0 cursor-pointer z-10 h-10"
                                />
                                <div className="w-full border border-gold-400/40 py-2 px-3 text-gold-400/80 text-center text-sm flex items-center justify-center gap-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                    <span>Choose a room photo</span>
                                </div>
                            </div>
                        </div>
                        
                        <div className="pt-8 mt-auto">
                            <div className="flex flex-col gap-3">
                                <button
                                    type="button"
                                    onClick={addRoom}
                                    disabled={isSubmitting}
                                    className="bg-gold-400 text-charcoal-950 hover:bg-gold-500 transition-colors duration-300 shadow-golden py-3 px-6 flex items-center justify-center uppercase tracking-wider text-sm font-medium"
                                >
                                    {isSubmitting ? (
                                        <span className="flex items-center justify-center">
                                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-charcoal-950" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Creating Room...
                                        </span>
                                    ) : (
                                        <span className="flex items-center">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                            </svg>
                                            Add New Room
                                        </span>
                                    )}
                                </button>

                                <button
                                    type="button"
                                    onClick={() => navigate('/admin/manage-rooms')}
                                    className="border border-white/20 text-white/70 hover:bg-white/5 transition-colors duration-300 py-2 px-4 uppercase tracking-wider text-sm font-medium"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddRoomPage;
