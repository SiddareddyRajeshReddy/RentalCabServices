import React from "react";
import ChooseUsComponent from "./chooseUsComponent"; 
const adv = [
    {
        path: './rocket.png',
        title: 'Easy Rent',
        description: 'Rent a car at our rental with an easy and fast process without disturbing your productivity'
    },
    {
        path: './square.png',
        title: 'Premium Quality',
        description: 'Our cars are always maintained engine health and cleanliness to provide a more comfortable driving experience'
    },
    {
        path: './driver.png',
        title:'Professional Agent',
        description: 'You can ask your travel companion to escort and guide your journey.'
    },
    {
        path: './sheild.png',
        title: 'Car Safety',
        description: 'We guarantee the safety of the engine on the car always running well with regular checks on the car engine.'
    },
    {
        path: './hat.png',
        title: 'Refund',
        description: 'Our service guarantee provides a money back opportunity if the car does not match the information provided.'
    },
    {
        path: './layout.png',
        title: 'Live Monitoring',
        description: 'Our service provides direct customer monitoring to monitor trips in terms of safety and comfort.'
    },

]

function ChooseUs() {
    return(
        <div className="flex flex-col justify-center items-center p-[20px] my-[50px] w-full">
            <h4 className="text-[#FAB5B5] p-[8px]">ADVANTAGES</h4>
            <h2 className="text-[#807878] text-4xl p-[1px]">Why Choose Us ?</h2>
            <p className="text-[#C2BABA] text-sm p-[10px] w-[80vw] text-center">We present many guarantees and advantages when you rent a car with us for your trip. Here are some of the advantages that you will get</p>
            <div className="grid grid-cols-1 grid-rows-1 sm:grid-cols-2 sm:grid-rows-2 md:grid-cols-3  md:grid-rows-2 gap-5 w-[80vw]"> 
               {adv.map((element, index) => (
                    <ChooseUsComponent key={index} prop={element} />
               ))}
            </div>
        </div>
    )
} 

export default ChooseUs;