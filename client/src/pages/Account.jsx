import { useContext } from "react"
import { UserContext } from "../context/userContext"
import { Link, useNavigate, useParams } from "react-router-dom";
import { Places } from "../components";
import { AiOutlineUser } from 'react-icons/ai';
import { BsBuildingAdd, BsCalendar2Plus } from 'react-icons/bs';
import BookingsPage from "./BookingsPage";

const Account = () => {
    const { user, isUserAvailable } = useContext(UserContext);
    const navigate = useNavigate();
    let { subpage } = useParams();
    console.log("Subpage", subpage)

    if (!isUserAvailable) {
        return "Loading..."
    }

    if (isUserAvailable && !user) {
        navigate('/signin')
    }

    if (subpage === undefined) {
        subpage = 'profile';
    }

    const toggleDrawer = (type = null) => {

        let classes = 'flex justify-center items-center gap-2 py-2 px-6 text-[16px] font-medium cursor-pointer text-gray-700';
        if (type === subpage || (subpage === undefined && type === 'profile')) {
            classes += ' transition duration-300 text-white bg-primary rounded-full';
        }else{
            classes+= ' bg-gray-50 rounded-full'
        }
        return classes;
    }

    return (

        <div className="w-full h-screen justify-center mx-auto sm:min-w-0 sm:flex">
            <div className="flex flex-col w-full">
            {/* w-full flex flex-wrap justify-center mt-8 gap-4 sm:flex-row sm:justify-center */}
                <nav className="flex flex-wrap justify-center mt-8 gap-4">
                    <Link to='/account' className={`${toggleDrawer('profile')}`}><AiOutlineUser /> Profile</Link>
                    <Link to='/account/places' className={`${toggleDrawer('places')}`}><BsBuildingAdd /> Accommodations</Link>
                    <Link to='/account/bookings' className={`${toggleDrawer('bookings')}`}><BsCalendar2Plus /> Booking</Link>
                </nav>

                {subpage === 'profile' && (
                    <div className="flex justify-center items-center mx-auto mt-8">
                        <p className="text-center text-gray-700 text-[18px] font-medium">Logged in as {user?.name} ({user?.email})</p>
                    </div>
                )}

                {subpage === 'places' && (
                    <Places />
                )
                }

                {subpage === 'bookings' &&
                <div>
                    <BookingsPage />
                </div>
            }
            </div>
        </div>







    );
}

export default Account
