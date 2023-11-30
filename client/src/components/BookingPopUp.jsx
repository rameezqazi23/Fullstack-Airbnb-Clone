import { Link } from "react-router-dom"

const BookingPopUp = ({ setIsBookingPopUp, redirect }) => {
    // if(isBookingPopUp){
    //     document.body.style.overflow="hidden"
    // }else{
    //     document.body.style.overflow="scroll"

    // }


    return (
        <div className='w-full h-full fixed top-0 left-0 z-10 bg-[#0a192f] backdrop-filter backdrop-blur-sm bg-opacity-10 font-sans'>
            <div className='max-w-[1000px] w-[80%] h-[200px] sm:w-[60%] lg:w-[40%]  mx-auto absolute top-1/2 left-1/2 z-20 bg-white rounded-[8px]
            transform -translate-x-1/2 -translate-y-1/2 p-5 flex justify-center items-center'>

                <div className='mt-5 flex flex-col items-center gap-3 flex-wrap'>
                    <h4 className='text-[14px] sm:text-[18px] text-[#0a192f] text-[700]'>Successfully Booked your Place</h4>

                    <div className="flex gap-3">
                        <button
                            className='flex justify-center items-center gap-3 bg-gradient-to-r from-primary to-pink-500 w-[100px] py-2 rounded-lg font-bold text-white mt-6'
                            onClick={() => setIsBookingPopUp(false)}
                        >
                            Close
                        </button>
                        <Link
                            className='flex justify-center items-center gap-3 bg-gradient-to-r from-primary to-pink-500 w-[200px] py-2 rounded-lg font-bold text-white mt-6'
                            to={`/account/bookings/${redirect}`}
                        >
                            Check Bookings
                        </Link>
                    </div>
                </div>

            </div>

        </div>
    )
}

export default BookingPopUp
