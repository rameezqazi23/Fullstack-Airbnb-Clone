import { useContext, useState } from 'react'
import { TbBrandAirbnb } from "react-icons/tb";
import { FiSearch } from "react-icons/fi";
import { FaUserCircle } from "react-icons/fa";
import { HiMiniBars3BottomRight } from "react-icons/hi2"
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../context/userContext';
import axios from 'axios';

const Navbar = () => {
    const [toggle, setToggle] = useState(false);
    const [menuToggle,setMenuToggle] = useState(false);
    const navigate = useNavigate()

    const handlePopUp = () => {
        setToggle(false);
    }

    const { user, setUser } = useContext(UserContext);
    console.log("User context from navbar===>", user)

    const handleLogOut = async () => {
        await axios.post('/logout')
        setUser(null)
        navigate('/signin')


    }

    return (
        <>
            <header className='w-full flex justify-between px-8 py-4 mx-auto border-b border-gray-300'>
                <a href="/" className='flex items-center gap-1'>
                    <TbBrandAirbnb color='#ff5a60' size={35} />
                    <span className='text-[24px] font-bold text-primary'>airbnb</span>
                </a>
                <div className='sm:flex hidden items-center rounded-full gap-3 px-6 py-2 bg-[#f5f5f5] shadow-md border border-gray-300'>
                    <p className='cursor-pointer font-semibold text-gray-500 hover:text-black'>Anywhere</p>
                    <div className="border border-l border-gray-300 h-[18px]"></div>
                    <p className='cursor-pointer font-semibold text-gray-500 hover:text-black'>Anyweek</p>
                    <div className="border border-l border-gray-300 h-[18px]"></div>
                    <p className='cursor-pointer font-semibold text-gray-500 hover:text-black'>Add guest</p>
                    <button className='bg-primary rounded-full p-2'>
                        <FiSearch color='white' />
                    </button>
                </div>
                
                <div className='flex items-center justify-between rounded-full gap-3 px-6 py-2 bg-[#f5f5f5] border border-gray-300'>

                    <HiMiniBars3BottomRight className='sm:hidden flex cursor-pointer' onClick={() => setMenuToggle(!menuToggle)} />

                    <div className={`${!menuToggle ? "hidden" : "flex"}
                        p-6 text-white absolute top-20 right-0 mx-4 my-2 min-w-[180px] z-10 rounded-xl
                        backdrop-filter backdrop-blur-lg bg-opacity-70 bg-[#f5f5f5] shadow-md`}>

                        <ul className='list-none flex flex-col gap-4 justify-end items-start'>
                            <li className='text-gray-500 hover:text-black text-[16px] font-medium cursor-pointer'>Anywhere</li>
                            <li className='text-gray-500 hover:text-black text-[16px] font-medium cursor-pointer'>Anyweek</li>
                            <li className='text-gray-500 hover:text-black text-[16px] font-medium cursor-pointer'>Addguest</li>

                        </ul>
                    </div>

                    {user &&
                        <div>
                            <p className='cursor-pointer font-semibold text-gray-500 hover:text-black'>{user.name}</p>
                        </div>
                    }

                    <FaUserCircle className='cursor-pointer opacity-50' onClick={() => setToggle(!toggle)} size={28} />

                    <div className={`${!toggle ? "hidden" : "flex"}
                 p-6 text-white absolute top-20 right-0 mx-4 my-2 min-w-[180px] z-20 rounded-xl
                 backdrop-filter backdrop-blur-lg bg-opacity-80 bg-[#e7e6e6] shadow-md`}>

                        {!user ?
                            (
                                <div className='list-none flex flex-col gap-4 justify-end items-start'>
                                    <Link onClick={handlePopUp} to='/signup' className='text-gray-500 hover:text-black text-[16px] font-medium cursor-pointer'>Sign up</Link>
                                    <Link onClick={handlePopUp} to='/signin' className='text-gray-500 hover:text-black text-[16px] font-medium cursor-pointer'>Login</Link>
                                    <Link onClick={handlePopUp} to='/profile' className='text-gray-500 hover:text-black text-[16px] font-medium cursor-pointer'>Profile</Link>

                                </div>
                            )
                            :
                            (
                                <div className='list-none flex flex-col gap-4 justify-end items-start'>
                                    <Link onClick={handlePopUp} to='/' className='text-gray-500 hover:text-black text-[16px] font-medium cursor-pointer'>Home</Link>
                                    <Link onClick={handlePopUp} to='/profile' className='text-gray-500 hover:text-black text-[16px] font-medium cursor-pointer'>Profile</Link>
                                    <Link onClick={{ handlePopUp, handleLogOut }} to='/logout' className='text-gray-500 hover:text-black text-[16px] font-medium cursor-pointer'>Logout</Link>

                                </div>
                            )
                        }


                    </div>

                </div>
            </header>
        </>
    )
}

export default Navbar
