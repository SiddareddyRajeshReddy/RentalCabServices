import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom";
import ThemedHeader from "./dashboardHeader";
import RideSearchBar from "./searchBar";
import CabTypesComponent from "./cabTypes";
const Dashboard = () => {
 const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/");
        }
    }, [navigate]); 
    return (
       <>
          <div className="min-h-screen bg-gradient-to-br from-red-50 via-pink-50 to-orange-50 overflow-hidden">
            <ThemedHeader/>
            <RideSearchBar/>
            <CabTypesComponent/>
            </div>
       </>
    )
}

export default Dashboard