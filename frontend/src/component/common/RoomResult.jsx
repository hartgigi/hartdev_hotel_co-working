import React from "react";
import { useNavigate } from "react-router-dom";
import ApiService from "../../service/ApiService";

// Conversion rate from USD to THB (Thai Baht)
const USD_TO_THB_RATE = 35;

// Function to convert USD to THB
const convertToTHB = (usdAmount) => {
  return (usdAmount * USD_TO_THB_RATE).toFixed(0);
};

const RoomResult = ({ roomSearchResults }) => {
  const navigate = useNavigate();
  const isAdmin = ApiService.isAdmin();
  
  if (!roomSearchResults || roomSearchResults.length === 0) {
    return null;
  }

  return (
    <div className="mt-16">
      <div className="text-center mb-10">
        <h3 className="text-gold-400 font-display text-2xl font-semibold">Available Accommodations</h3>
        <div className="h-px w-16 bg-gold-400/50 mx-auto mt-2"></div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {roomSearchResults.map((room) => (
          <div key={room.id} className="bg-charcoal-900 border border-gold-400/20 shadow-elegant hover:shadow-golden transition-all duration-300 hover:border-gold-400/40 flex flex-col">
            {/* Room Image */}
            <div className="aspect-video w-full overflow-hidden relative group">
              <img
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                src={ApiService.getImageUrl(room.roomPhotoUrl)}
                alt={room.roomType}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "https://images.unsplash.com/photo-1611892440504-42a792e24d32?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80";
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/70 to-transparent">
                <div className="absolute bottom-3 left-4">
                  <div className="inline-flex items-center bg-gold-400/90 backdrop-blur-sm px-3 py-1 text-charcoal-950 text-sm font-medium">
                    <span>฿{convertToTHB(room.roomPrice)}</span>
                    <span className="text-xs ml-1">/ night</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Room Details */}
            <div className="p-6 flex-1 flex flex-col">
              <h4 className="text-xl font-display text-white mb-2">{room.roomType}</h4>
              
              <div className="mt-2 mb-6 flex-1">
                <p className="text-white/70 text-sm line-clamp-3 font-body">
                  {room.roomDescription}
                </p>
              </div>
              
              <div className="grid grid-cols-2 gap-3 mb-6">
                <div className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gold-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                  </svg>
                  <span className="text-white/70 text-sm">Free Wi-Fi</span>
                </div>
                <div className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gold-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span className="text-white/70 text-sm">Room Service</span>
                </div>
              </div>
              
              {/* Action Button */}
              {isAdmin ? (
                <button
                  className="border border-gold-400/50 text-gold-400 hover:bg-gold-400/10 transition-colors duration-300 py-2.5 flex items-center justify-center"
                  onClick={() => navigate(`/admin/edit-room/${room.id}`)}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                  </svg>
                  <span className="uppercase tracking-wider text-sm">Modify Details</span>
                </button>
              ) : (
                <button
                  className="bg-gold-400 text-charcoal-950 hover:bg-gold-500 transition-colors duration-300 shadow-golden py-2.5 flex items-center justify-center"
                  onClick={() => navigate(`/room-details-book/${room.id}`)}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  <span className="uppercase tracking-wider text-sm">View Details</span>
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RoomResult;
