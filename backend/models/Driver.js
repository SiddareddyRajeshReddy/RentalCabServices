import mongoose from "mongoose";
const driverSchema = new mongoose.Schema({
    name: String,
    email: String,
    carType: String,
    LicenseNumber: String,
    IdNumber: String,
})
const driver = mongoose.model('drivers', driverSchema)
export default driver