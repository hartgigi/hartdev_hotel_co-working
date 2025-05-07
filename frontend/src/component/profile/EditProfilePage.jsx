import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ApiService from '../../service/ApiService';

const EditProfilePage = () => {
    const [user, setUser] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        phoneNumber: ''
    });
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                setIsLoading(true);
                const response = await ApiService.getUserProfile();
                setUser(response.user);
                setFormData({
                    name: response.user.name,
                    phoneNumber: response.user.phoneNumber
                });
            } catch (error) {
                setError(error.response?.data?.message || error.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchUserProfile();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSaveProfile = async (e) => {
        e.preventDefault();
        
        if (!formData.name || !formData.phoneNumber) {
            setError('Please fill in all required fields');
            setTimeout(() => setError(null), 5000);
            return;
        }
        
        try {
            setIsSaving(true);
            // Update user profile API call
            await ApiService.updateUser(user.id, formData);
            
            setSuccess('Your profile has been updated successfully');
            setTimeout(() => setSuccess(null), 5000);
        } catch (error) {
            setError(error.response?.data?.message || error.message);
            setTimeout(() => setError(null), 5000);
        } finally {
            setIsSaving(false);
        }
    };

    const handleDeleteProfile = async () => {
        if (!window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
            return;
        }
        try {
            setIsDeleting(true);
            await ApiService.deleteUser(user.id);
            ApiService.logout(); // Clear local storage/session
            navigate('/login');
        } catch (error) {
            setError(error.response?.data?.message || error.message);
            setTimeout(() => setError(null), 5000);
            setIsDeleting(false);
        }
    };

    if (isLoading) {
        return (
            <div className="container-custom py-16 max-w-2xl mx-auto text-white flex justify-center items-center min-h-[50vh]">
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
        <div className="container-custom py-16 max-w-2xl mx-auto text-white">
            <div className="bg-charcoal-900 border border-gold-400/20 shadow-elegant">
                <div className="p-8 border-b border-charcoal-800">
                    <h2 className="text-2xl font-display text-white mb-1">Manage Your Profile</h2>
                    <p className="text-white/60 text-sm">Update your personal information</p>
                </div>
                
                {error && (
                    <div className="m-8 p-4 bg-charcoal-800 border-l-4 border-gold-400 text-white/80 text-sm">
                        {error}
                    </div>
                )}
                
                {success && (
                    <div className="m-8 p-4 bg-charcoal-800 border-l-4 border-gold-300 text-gold-300 text-sm">
                        {success}
                    </div>
                )}
                
                {user && (
                    <form onSubmit={handleSaveProfile} className="p-8">
                        <div className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-gold-400 text-sm font-medium uppercase tracking-wider" htmlFor="email">
                                    Email Address <span className="text-white/50">(Cannot be changed)</span>
                                </label>
                                <div className="relative">
                                    <input
                                        id="email"
                                        type="email"
                                        className="w-full bg-charcoal-800/50 border-0 border-b border-charcoal-700 px-3 py-2 text-white/50 focus:ring-0 cursor-not-allowed"
                                        value={user.email}
                                        disabled
                                    />
                                    <div className="absolute right-3 top-2 text-white/30 pointer-events-none">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="space-y-2">
                                <label className="text-gold-400 text-sm font-medium uppercase tracking-wider" htmlFor="name">
                                    Full Name <span className="text-gold-400/60">*</span>
                                </label>
                                <div className="relative">
                                    <input
                                        id="name"
                                        name="name"
                                        type="text"
                                        className="w-full bg-charcoal-800 border-0 border-b border-gold-400/30 focus:border-gold-400 px-3 py-2 text-white placeholder-white/30 focus:ring-0"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        required
                                    />
                                    <div className="absolute right-3 top-2 text-gold-400 pointer-events-none">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="space-y-2">
                                <label className="text-gold-400 text-sm font-medium uppercase tracking-wider" htmlFor="phoneNumber">
                                    Phone Number <span className="text-gold-400/60">*</span>
                                </label>
                                <div className="relative">
                                    <input
                                        id="phoneNumber"
                                        name="phoneNumber"
                                        type="tel"
                                        className="w-full bg-charcoal-800 border-0 border-b border-gold-400/30 focus:border-gold-400 px-3 py-2 text-white placeholder-white/30 focus:ring-0"
                                        value={formData.phoneNumber}
                                        onChange={handleInputChange}
                                        required
                                    />
                                    <div className="absolute right-3 top-2 text-gold-400 pointer-events-none">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="pt-4 flex justify-between items-center">
                                <button
                                    type="button"
                                    className="bg-red-900/30 text-red-300 hover:bg-red-900/50 transition-colors duration-300 px-4 py-2 flex items-center justify-center"
                                    onClick={handleDeleteProfile}
                                    disabled={isDeleting}
                                >
                                    {isDeleting ? (
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
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                            </svg>
                                            Delete Account
                                        </span>
                                    )}
                                </button>
                                
                                <div className="flex space-x-4">
                                    <button
                                        type="button"
                                        className="border border-white/20 text-white/70 hover:bg-white/5 transition-colors duration-300 py-2 px-4 uppercase tracking-wider text-sm font-medium"
                                        onClick={() => navigate('/profile')}
                                    >
                                        Cancel
                                    </button>
                                    
                                    <button
                                        type="submit"
                                        className="bg-gold-400 text-charcoal-950 hover:bg-gold-500 transition-colors duration-300 shadow-golden py-2 px-6 uppercase tracking-wider text-sm font-medium"
                                        disabled={isSaving}
                                    >
                                        {isSaving ? (
                                            <span className="flex items-center justify-center">
                                                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-charcoal-950" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                </svg>
                                                Saving...
                                            </span>
                                        ) : (
                                            "Save Changes"
                                        )}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
};

export default EditProfilePage;
