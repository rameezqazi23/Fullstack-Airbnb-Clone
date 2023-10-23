import React from 'react'
import { TbBrandAirbnb } from "react-icons/tb";
import { FiSearch } from "react-icons/fi";
import { FaUserCircle } from "react-icons/fa";
import {HiMiniBars3BottomRight} from "react-icons/hi2"

const Navbar = () => {
    return (
        <header className='flex justify-between px-8 py-4'>
            <a href="/" className='flex items-center gap-1'>
                <TbBrandAirbnb color='#ff5a60' size={35} />
                <span className='text-[27px] font-bold text-primary'>airbnb</span>
            </a>
            <div className='flex items-center rounded-full gap-3 px-6 py-2 bg-[#f5f5f5] shadow-md border-gray-300'>
                <p className='cursor-pointer font-semibold text-gray-500 hover:text-black'>Anywhere</p>
                <d className="border border-l border-gray-300 h-[18px]"></d>
                <p className='cursor-pointer font-semibold text-gray-500 hover:text-black'>Anyweek</p>
                <div className="border border-l border-gray-300 h-[18px]"></div>
                <p className='cursor-pointer font-semibold text-gray-500 hover:text-black'>Add guest</p>
                <button className='bg-primary rounded-full p-2'>
                    <FiSearch color='white' />
                </button>
            </div>
            <div className='flex items-center rounded-full gap-3 px-6 py-2 bg-[#f5f5f5] border border-gray-300'>
                <HiMiniBars3BottomRight />
                <FaUserCircle className='opacity-50' size={28} />

            </div>


        </header>
    )
}

export default Navbar
