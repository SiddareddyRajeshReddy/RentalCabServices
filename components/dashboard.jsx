import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom";
import ThemedHeader from "./dashboardHeader";
import RideSearchBar from "./searchBar";
import CabTypesComponent from "./cabTypes";
import { ThemeContext } from "../context/context";
import DriverRideRequestsComponent from "./driverView";
const Dashboard = () => {
    const navigate = useNavigate();
    const [dashboardMode, setDashboardMode] = useState('user')
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/");
        }
    }, [navigate]);
    return (
        <>
            <ThemeContext.Provider value={{ dashboardMode, setDashboardMode }}>
                <div className="min-h-screen bg-gradient-to-br from-red-50 via-pink-50 to-orange-50 overflow-hidden">
                    <ThemedHeader />
                    {dashboardMode === 'user' && <RideSearchBar />}
                    {dashboardMode === 'user' && <CabTypesComponent />}
                    {dashboardMode === 'driver' && <DriverRideRequestsComponent />}
                </div>
            </ThemeContext.Provider>
        </>
    )
}

export default Dashboard