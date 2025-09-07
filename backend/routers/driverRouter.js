import express from 'express';
import driver from '../models/Driver.js'; 
import jwt from "jsonwebtoken";
import User from '../models/User.js';
import Joi from 'joi';

const driverRouter = express.Router();

const registrationSchema = Joi.object({
    carType: Joi.string().required().valid('sedan', 'suv', 'hatchback', 'compact', 'luxury'),
    licenseNumber: Joi.string().required().min(5).max(20),
    idNumber: Joi.string().required().min(5).max(20),
});

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

// Driver Registration Route
driverRouter.post("/DriverRegistration", authenticateToken, async (req, res) => {
    const { carType, licenseNumber, idNumber } = req.body;
    const email = req.userEmail;

    // Server-side validation
    const { error } = registrationSchema.validate({ carType, licenseNumber, idNumber });
    if (error) {
        // Return 400 Bad Request if validation fails
        return res.status(400).send({ success: false, message: error.details[0].message });
    }

    try {
        // Find user name once
        const user = await User.findOne({ email: email });
        if (!user) {
            return res.status(404).send({ success: false, message: "User not found." });
        }

        // Check if the user is already a driver
        const existingDriver = await driver.findOne({ email: email });
        if (existingDriver) {
            return res.status(409).send({ success: false, message: "User is already a driver." });
        }

        // Create new driver entry
        const newDriver = new driver({
            name: user.name,
            email: email,
            carType: carType,
            licenseNumber: licenseNumber,
            idNumber: idNumber,
        });

        await newDriver.save(); // Use .save() for Mongoose
        res.status(200).send({ success: true, message: "Driver registration successful." });
    } catch (dbError) {
        console.error("Database error during driver registration:", dbError);
        res.status(500).send({ success: false, message: "An internal server error occurred." });
    }
});

// Driver Validation Route
driverRouter.post("/DriverValidate", authenticateToken, async (req, res) => {
    const email = req.userEmail;
    try {
        const isDriver = await driver.findOne({ email: email });
        if (isDriver) {
            res.status(200).send({ success: true, message: "User is a driver." });
        } else {
            res.status(200).send({ success: false, message: "User is not a registered driver." });
        }
    } catch (dbError) {
        console.error("Database error during driver validation:", dbError);
        res.status(500).send({ success: false, message: "An internal server error occurred." });
    }
});

export default driverRouter;