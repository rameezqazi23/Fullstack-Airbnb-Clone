import { useState } from 'react'
import { TbBrandAirbnb } from "react-icons/tb";
import { FiSearch } from "react-icons/fi";
import { FaUserCircle } from "react-icons/fa";
import { HiMiniBars3BottomRight } from "react-icons/hi2"
import { Link } from 'react-router-dom';

const Navbar = () => {
    const [toggle, setToggle] = useState(false);

    return (
        <nav className='w-full flex justify-between px-8 py-4 mx-auto border-b border-gray-300'>
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
            <div className='flex items-center justify-between rounded-full gap-3 px-6 py-2 bg-[#f5f5f5] border border-gray-300'>

                <HiMiniBars3BottomRight className='sm:hidden flex cursor-pointer' onClick={() => setToggle(!toggle)} />

                <div className={`${!toggle ? "hidden" : "flex"}
                 p-6 text-white absolute top-20 right-0 mx-4 my-2 min-w-[180px] z-10 rounded-xl
                 backdrop-filter backdrop-blur-lg bg-opacity-70 bg-[#f5f5f5] shadow-md`}>

                    <ul className='list-none flex flex-col gap-4 justify-end items-start'>
                        <li className='text-gray-500 hover:text-black text-[16px] font-medium cursor-pointer'>Anywhere</li>
                        <li className='text-gray-500 hover:text-black text-[16px] font-medium cursor-pointer'>Anyweek</li>
                        <li className='text-gray-500 hover:text-black text-[16px] font-medium cursor-pointer'>Addguest</li>

                    </ul>
                </div>


                <FaUserCircle className='cursor-pointer opacity-50' onClick={() => setToggle(!toggle)} size={28} />

                <div className={`${!toggle ? "hidden" : "flex"}
                 p-6 text-white absolute top-20 right-0 mx-4 my-2 min-w-[180px] z-10 rounded-xl
                 backdrop-filter backdrop-blur-lg bg-opacity-80 bg-[#e7e6e6] shadow-md`}>

                    <div className='list-none flex flex-col gap-4 justify-end items-start'>
                        <Link to='/signup' className='text-gray-500 hover:text-black text-[16px] font-medium cursor-pointer'>Sign up</Link>
                        <Link to='/signin' className='text-gray-500 hover:text-black text-[16px] font-medium cursor-pointer'>Login</Link>
                        <Link to='/profile' className='text-gray-500 hover:text-black text-[16px] font-medium cursor-pointer'>Profile</Link>

                    </div>
                </div>

            </div>



        </nav>
    )
}

export default Navbar