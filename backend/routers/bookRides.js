import Ride from "../models/Ride.js";
import express from 'express'
import jwt from "jsonwebtoken";
const bookRides = express.Router();
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader

    if (token == null) {
        return res.status(401).send({ success: false, message: "Authentication token required." });
    }

    try {
        const email = jwt.verify(token, process.env.JWT_SECRET);
        req.userEmail = email.email; // Attach email to the request object
        next();
    } catch (error) {
        return res.status(403).send({ success: false, message: "Invalid or expired token." });
    }
};

bookRides.post("/book", authenticateToken, async (req, res) => {
    const email = req.userEmail;
    const rideData = req.body;
    console.log(email)
    if (!rideData || !rideData.id || !rideData.sourceLocation || !rideData.destinationLocation) {
        return res.status(400).send({ success: false, message: "Missing required ride details." });
    }

    try {
        // Attach passenger email from token
        const newRide = new Ride({
            ...rideData,
            passengerEmail: email,
            bookingTime: new Date(rideData.bookingTime) // Ensure Date type
        });

        await newRide.save();

        res.status(201).send({
            success: true,
            message: "Ride booked successfully.",
            ride: newRide
        });
    } catch (error) {
        console.error("Error booking ride:", error);
        res.status(500).send({ success: false, message: "Internal server error." });
    }
});

export default bookRides