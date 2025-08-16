import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Home from '../components/home'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />
    },
    // {
    //   path: "dashboard",
    //   element: <Dashboard />
    // }
  ])
function App() {
  return (
    <RouterProvider future={{
    v7_startTransition: true,
  }} router={router}/>
  )
}

export default App
