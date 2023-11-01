import { useContext } from "react"
import { UserContext } from "../context/userContext"
import { Link, useNavigate, useParams } from "react-router-dom";

const Account = () => {
    const { user, isUserAvailable } = useContext(UserContext);
    const navigate = useNavigate();
    let { subpage } = useParams();
    console.log("Subpage",subpage)

    if (!isUserAvailable) {
        return "Loading..."
    }

    if (isUserAvailable && !user) {
        navigate('/signin')
    }


    return (
        <div>
            <nav className="w-full flex justify-center mt-8 gap-10">
                <Link to={'/account'} className="py-2 px-6 text-white bg-primary rounded-full text-[16px] font-medium cursor-pointer">Profile</Link>
                <Link to={'account/places'} className="py-2 px-6 text-[16px] font-medium cursor-pointer text-gray-500 hover:text-black">Accommodations</Link>
                <Link to={'acount/bookings'} className="py-2 px-6 text-[16px] font-medium cursor-pointer text-gray-500 hover:text-black">Booking</Link>
            </nav>
        </div>
    )
}

export default Account
