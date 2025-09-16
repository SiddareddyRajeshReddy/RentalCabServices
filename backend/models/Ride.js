import mongoose from "mongoose";

const rideSchema = new mongoose.Schema({
    id: { type: String, required: true, unique: true },  // "RIDE_<timestamp>"
    passengerEmail: { type: String, required: true },    // From token

    sourceLocation: { type: String, required: true },
    destinationLocation: { type: String, required: true },

    sourceCoords: {
        lat: { type: Number },
        lng: { type: Number }
    },
    destinationCoords: {
        lat: { type: Number },
        lng: { type: Number }
    },

    distance: { type: Number, required: true },          
    estimatedDuration: { type: Number, required: true }, 
    estimatedFare: { type: Number, required: true },    

    bookingTime: { type: Date, required: true },
    status: { type: String, enum: ['pending', 'booked', 'ongoing', 'completed', 'cancelled'], default: 'pending' }
});

export default mongoose.model("Ride", rideSchema);
