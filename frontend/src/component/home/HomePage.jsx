import React, { useState } from "react";
import { Link } from "react-router-dom";
import RoomResult from "../common/RoomResult";
import RoomSearch from "../common/RoomSearch";

const HomePage = () => {
    const [roomSearchResults, setRoomSearchResults] = useState([]);

    // Function to handle search results
    const handleSearchResult = (results) => {
        setRoomSearchResults(results);
    };

    // Services data
    const services = [
        {
            icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gold-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>,
            title: "Climate Control",
            description: "Personalized temperature settings for your ultimate comfort throughout your stay."
        },
        {
            icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gold-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
            </svg>,
            title: "Curated Refreshments",
            description: "Premium selection of spirits, wines, and gourmet snacks available in your private suite."
        },
        {
            icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gold-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
            </svg>,
            title: "Exclusive Parking",
            description: "Secure valet parking with 24-hour access for your convenience and peace of mind."
        },
        {
            icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gold-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.14 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" />
            </svg>,
            title: "High-Speed Connectivity",
            description: "Encrypted, ultra-fast wireless internet throughout the property for seamless communication."
        }
    ];

    return (
        <div className="text-white">
            {/* Hero Section */}
            <section className="relative h-[80vh] bg-charcoal-950">
                <div className="absolute inset-0 overflow-hidden">
                    <img 
                        src="./assets/images/hotel.webp" 
                        alt="Phegon Hotel" 
                        className="w-full h-full object-cover object-center"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-charcoal-950/70 via-charcoal-950/60 to-charcoal-950"></div>
                </div>
                
                <div className="relative container-custom h-full flex flex-col justify-center items-center text-center">
                    <div className="inline-block mb-2">
                        <div className="h-px w-24 bg-gold-400 mx-auto"></div>
                    </div>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-display italic font-bold text-white mb-4">
                        Welcome to <span className="text-gold-400">HART Hotel and Co-working</span>
                    </h1>
                    <p className="text-xl md:text-2xl text-white/80 mb-8 font-body max-w-2xl font-light tracking-wide">
                        Where luxury meets exceptional service, creating moments that last a lifetime
                    </p>
                    <div className="flex flex-col sm:flex-row gap-6">
                        <Link to="/rooms" className="bg-gold-400 text-charcoal-950 px-8 py-3 hover:bg-gold-500 transition-colors duration-300 shadow-golden uppercase tracking-wider text-sm font-medium">
                            Explore Suites
                        </Link>
                        <a href="#search" className="border border-gold-400/50 text-white hover:bg-white/5 px-8 py-3 transition-colors duration-300 uppercase tracking-wider text-sm font-medium">
                            Reserve Now
                        </a>
                    </div>
                </div>
            </section>

            {/* Search Section */}
            <section id="search" className="bg-charcoal-900 py-16">
                <div className="container-custom">
                    <div className="max-w-4xl mx-auto">
                        <div className="text-center mb-12">
                            <div className="inline-block mb-2">
                                <div className="h-px w-12 bg-gold-400 mx-auto"></div>
                            </div>
                            <h2 className="text-3xl font-display font-semibold text-white">Your Exclusive Retreat</h2>
                            <p className="text-white/70 mt-2 font-body">Select dates for your perfect luxury experience</p>
                        </div>
                        <RoomSearch handleSearchResult={handleSearchResult} />
                        <RoomResult roomSearchResults={roomSearchResults} />
                        
                        {roomSearchResults.length > 0 && (
                            <div className="text-center mt-10">
                                <Link to="/rooms" className="text-gold-400 font-medium hover:text-gold-300 transition-colors inline-flex items-center">
                                    <span className="mr-2">View All Accommodations</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                    </svg>
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* Services Section */}
            <section className="py-20 bg-charcoal-950 relative">
                <div className="absolute inset-0 opacity-10">
                    <img 
                        src="https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1760&q=80" 
                        alt="" 
                        className="w-full h-full object-cover object-center"
                    />
                </div>
                <div className="container-custom relative">
                    <div className="text-center mb-16">
                        <div className="inline-block mb-2">
                            <div className="h-px w-12 bg-gold-400 mx-auto"></div>
                        </div>
                        <h2 className="text-3xl font-display font-semibold text-white mb-2">Exceptional Services</h2>
                        <p className="text-white/70 max-w-2xl mx-auto font-body">
                            Discover the unrivaled amenities that make 
                            <span className="text-gold-400 font-medium"> Phegon Hotel </span> 
                            the epitome of luxury and sophistication.
                        </p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {services.map((service, index) => (
                            <div key={index} className="border border-gold-400/20 hover:border-gold-400/50 bg-charcoal-900/80 backdrop-blur-sm p-8 transition-all duration-300 hover:shadow-golden">
                                <div className="mb-6">{service.icon}</div>
                                <h3 className="text-xl font-display font-semibold text-gold-400 mb-3">{service.title}</h3>
                                <p className="text-white/70 font-body">{service.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* About/Promo Section */}
            <section className="py-20 bg-charcoal-900 relative overflow-hidden">
                <div className="absolute right-0 -bottom-32 w-96 h-96 bg-gold-400/10 rounded-full blur-3xl"></div>
                <div className="absolute left-0 -top-32 w-96 h-96 bg-primary-800/20 rounded-full blur-3xl"></div>
                <div className="container-custom relative">
                    <div className="flex flex-col md:flex-row gap-16 items-center">
                        <div className="md:w-1/2">
                            <div className="inline-block mb-2">
                                <div className="h-px w-12 bg-gold-400"></div>
                            </div>
                            <h2 className="text-3xl font-display font-semibold text-white mb-6">Unparalleled Luxury Experience</h2>
                            <p className="text-white/70 mb-6 font-body leading-relaxed">
                                At Phegon Hotel, we transcend traditional hospitality to create an immersive sanctuary of comfort and elegance. 
                                Our dedicated staff delivers personalized service that anticipates your every desire, ensuring a flawless experience from arrival to departure.
                            </p>
                            <p className="text-white/70 mb-8 font-body leading-relaxed">
                                Every detail within our meticulously designed suites and common areas reflects our commitment to excellence, 
                                creating a harmonious environment where you can indulge in true relaxation and refined living.
                            </p>
                            <Link to="/rooms" className="bg-gold-400 text-charcoal-950 px-8 py-3 hover:bg-gold-500 transition-colors duration-300 shadow-golden uppercase tracking-wider text-sm font-medium inline-block">
                                Discover Our Suites
                            </Link>
                        </div>
                        <div className="md:w-1/2 grid grid-cols-2 gap-4">
                            <div className="aspect-square overflow-hidden">
                                <img 
                                    src="./assets/images/room1.jpg" 
                                    alt="Luxury Room" 
                                    className="w-full h-full object-cover"
                                    onError={(e) => {e.target.src = 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80'}}
                                />
                            </div>
                            <div className="aspect-square overflow-hidden translate-y-8">
                                <img 
                                    src="./assets/images/room2.jpg" 
                                    alt="Luxury Bathroom" 
                                    className="w-full h-full object-cover"
                                    onError={(e) => {e.target.src = 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80'}}
                                />
                            </div>
                            <div className="aspect-square overflow-hidden -translate-y-8">
                                <img 
                                    src="./assets/images/room3.jpg" 
                                    alt="Hotel Restaurant" 
                                    className="w-full h-full object-cover"
                                    onError={(e) => {e.target.src = 'https://images.unsplash.com/photo-1544124499-58912cbddaad?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80'}}
                                />
                            </div>
                            <div className="aspect-square overflow-hidden">
                                <img 
                                    src="./assets/images/room4.jpg" 
                                    alt="Hotel Balcony" 
                                    className="w-full h-full object-cover"
                                    onError={(e) => {e.target.src = 'https://images.unsplash.com/photo-1582719508461-905c673771fd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1025&q=80'}}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default HomePage;
