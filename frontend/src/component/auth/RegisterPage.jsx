import React, { useState } from 'react';
import ApiService from '../../service/ApiService';
import { useNavigate, Link } from 'react-router-dom';

function RegisterPage() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        phoneNumber: ''
    });

    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const validateForm = () => {
        const { name, email, password, phoneNumber } = formData;
        if (!name || !email || !password || !phoneNumber) {
            return false;
        }
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) {
            setErrorMessage('Please complete all required fields to create your account.');
            setTimeout(() => setErrorMessage(''), 5000);
            return;
        }
        try {
            setIsLoading(true);
            // Call the register method from ApiService
            const response = await ApiService.registerUser(formData);

            // Check if the response is successful
            if (response.statusCode === 200) {
                // Clear the form fields after successful registration
                setFormData({
                    name: '',
                    email: '',
                    password: '',
                    phoneNumber: ''
                });
                setSuccessMessage('Your account has been created successfully. Redirecting to login...');
                setTimeout(() => {
                    setSuccessMessage('');
                    navigate('/login');
                }, 3000);
            }
        } catch (error) {
            setErrorMessage(error.response?.data?.message || error.message);
            setTimeout(() => setErrorMessage(''), 5000);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="container-custom py-16 md:py-24 max-w-md mx-auto">
            <div className="bg-charcoal-900 border border-gold-400/20 shadow-elegant p-8 md:p-10">
                <div className="text-center mb-10">
                    <div className="inline-block mb-3">
                        <h2 className="font-display text-3xl italic font-bold text-white">
                            <span className="text-gold-400">P</span>hegon
                            <span className="text-gold-400 ml-1">H</span>otel
                        </h2>
                        <div className="h-px w-24 bg-gold-400 mx-auto my-4"></div>
                    </div>
                    <h1 className="text-2xl font-display text-white mb-2">Create An Account</h1>
                    <p className="text-white/60 text-sm">Join our exclusive membership</p>
                </div>
                
                {errorMessage && (
                    <div className="mb-8 p-4 bg-charcoal-800 border-l-4 border-gold-400 text-white/80 text-sm">
                        {errorMessage}
                    </div>
                )}
                
                {successMessage && (
                    <div className="mb-8 p-4 bg-charcoal-800 border-l-4 border-gold-300 text-gold-300 text-sm">
                        {successMessage}
                    </div>
                )}
                
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-gold-400 text-sm font-medium uppercase tracking-wider" htmlFor="name">
                            Full Name <span className="text-gold-400/60">*</span>
                        </label>
                        <div className="relative">
                            <input
                                id="name"
                                type="text"
                                name="name"
                                className="w-full bg-charcoal-800 border-0 border-b border-gold-400/30 focus:border-gold-400 px-3 py-2 text-white placeholder-white/30 focus:ring-0"
                                value={formData.name}
                                onChange={handleInputChange}
                                placeholder="Enter your full name"
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
                        <label className="text-gold-400 text-sm font-medium uppercase tracking-wider" htmlFor="email">
                            Email Address <span className="text-gold-400/60">*</span>
                        </label>
                        <div className="relative">
                            <input
                                id="email"
                                type="email"
                                name="email"
                                className="w-full bg-charcoal-800 border-0 border-b border-gold-400/30 focus:border-gold-400 px-3 py-2 text-white placeholder-white/30 focus:ring-0"
                                value={formData.email}
                                onChange={handleInputChange}
                                placeholder="you@example.com"
                                required
                            />
                            <div className="absolute right-3 top-2 text-gold-400 pointer-events-none">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
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
                                type="tel"
                                name="phoneNumber"
                                className="w-full bg-charcoal-800 border-0 border-b border-gold-400/30 focus:border-gold-400 px-3 py-2 text-white placeholder-white/30 focus:ring-0"
                                value={formData.phoneNumber}
                                onChange={handleInputChange}
                                placeholder="+66 123456789"
                                required
                            />
                            <div className="absolute right-3 top-2 text-gold-400 pointer-events-none">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                </svg>
                            </div>
                        </div>
                    </div>
                    
                    <div className="space-y-2">
                        <label className="text-gold-400 text-sm font-medium uppercase tracking-wider" htmlFor="password">
                            Password <span className="text-gold-400/60">*</span>
                        </label>
                        <div className="relative">
                            <input
                                id="password"
                                type="password"
                                name="password"
                                className="w-full bg-charcoal-800 border-0 border-b border-gold-400/30 focus:border-gold-400 px-3 py-2 text-white placeholder-white/30 focus:ring-0"
                                value={formData.password}
                                onChange={handleInputChange}
                                placeholder="Create a secure password"
                                required
                            />
                            <div className="absolute right-3 top-2 text-gold-400 pointer-events-none">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                </svg>
                            </div>
                        </div>
                    </div>
                    
                    <div className="pt-4">
                        <button 
                            type="submit"
                            className="w-full bg-gold-400 text-charcoal-950 hover:bg-gold-500 transition-colors duration-300 shadow-golden py-3 flex items-center justify-center uppercase tracking-wider text-sm font-medium"
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <span className="flex items-center justify-center">
                                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-charcoal-950" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Creating Account...
                                </span>
                            ) : (
                                "Create Account"
                            )}
                        </button>
                    </div>
                </form>
                
                <div className="mt-10 text-center">
                    <p className="text-white/60 text-sm">
                        Already have an account?{" "}
                        <Link to="/login" className="text-gold-400 hover:text-gold-300 transition-colors font-medium">
                            Sign in here
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default RegisterPage;
