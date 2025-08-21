import React, { useState, useEffect } from "react"
import ThemedHeader from "./dashboardHeader";
import RideSearchBar from "./searchBar";
const Dashboard = () => {

    return (
       <>
          <div className="min-h-screen bg-gradient-to-br from-red-50 via-pink-50 to-orange-50 overflow-hidden">
            <ThemedHeader/>
            <RideSearchBar/>
            </div>
       </>
    )
}

export default Dashboard