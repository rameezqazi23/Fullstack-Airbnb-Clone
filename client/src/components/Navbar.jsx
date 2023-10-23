import React, { useState } from 'react'
import { TbBrandAirbnb } from "react-icons/tb";
import { FiSearch } from "react-icons/fi";
import { FaUserCircle } from "react-icons/fa";
import { HiMiniBars3BottomRight } from "react-icons/hi2"

const Navbar = () => {
    const [toggle, setToggle] = useState(false);
    return (
        <header className='w-full flex justify-between px-8 py-4 mx-auto border-b border-gray-300'>
            <a href="/" className='flex items-center gap-1'>
                <TbBrandAirbnb color='#ff5a60' size={35} />
                <span className='text-[24px] font-bold text-primary'>airbnb</span>
            </a>
            <div className='sm:flex hidden items-center rounded-full gap-3 px-6 py-2 bg-[#f5f5f5] shadow-md border border-gray-300'>
                <p className='cursor-pointer font-semibold text-gray-500 hover:text-black'>Anywhere</p>
                <d className="border border-l border-gray-300 h-[18px]"></d>
                <p className='cursor-pointer font-semibold text-gray-500 hover:text-black'>Anyweek</p>
                <div className="border border-l border-gray-300 h-[18px]"></div>
                <p className='cursor-pointer font-semibold text-gray-500 hover:text-black'>Add guest</p>
                <button className='bg-primary rounded-full p-2'>
                    <FiSearch color='white' />
                </button>
            </div>
            <div className='flex items-center justify-between rounded-full gap-3 px-6 py-2 bg-[#f5f5f5] border border-gray-300 cursor-pointer'>
                <HiMiniBars3BottomRight onClick={() => setToggle(!toggle)} />

                <div className={`${!toggle ? "flex flex-1 justify-end items-center" : "hidden"}`}>
                    <div className='p-6 black-gradient  absolute top-20 right-0 mx-4 my-2 min-w-[140px] z-10 rounded-xl'>
                        <ul className='list-none flex flex-col gap-4 justify-end items-start'>
                            <li>Anywhere</li>
                            <li>Anyweek</li>
                            <li>Addguest</li>

                        </ul>
                    </div>

                </div>



                <FaUserCircle className='opacity-50' size={28} />

            </div>
            {/* Humberger Menu */}


        </header>
    )
}

export default Navbar
