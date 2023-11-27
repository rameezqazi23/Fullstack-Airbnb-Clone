import { useState } from 'react'
import { differenceInCalendarDays } from 'date-fns'


const BookingPlaceWidget = ({ place }) => {
    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [noOfGuests, setNoOfGuests] = useState(1);

    const handleBooking = () => {
        console.log("Bookins", { checkIn, checkOut, noOfGuests })
    }

    let numberOfDays = 0;
    if (checkIn && checkOut) {
        numberOfDays = differenceInCalendarDays(new Date(checkOut), new Date(checkIn))
    }

    return (
        <div className='w-[370px] h-auto p-6 border border-gray-300 rounded-xl shadow-xl text-black'>
            <h2 className='font-semibold text-xl'>${place.price} <span className='font-normal text-[16px]'>night</span></h2>
            <div className='border border-gray-300 rounded-xl mt-4'>
                <div className='grid grid-cols-2 mx-auto'>
                    <div className='py-2 px-4'>
                        <label className='text-[11px] font-semibold'>CHECK-IN</label>
                        <input
                            value={checkIn}
                            onChange={(e) => setCheckIn(e.target.value)}
                            type="date" />
                    </div>
                    <div className='py-2 px-4 border-l border-gray-300'>
                        <label className='text-[11px] font-semibold'>CHECK-OUT</label>
                        <input
                            value={checkOut}
                            onChange={(e) => setCheckOut(e.target.value)}
                            type="date" />
                    </div>
                </div>
                <div className='flex flex-col py-4 px-4 border-t border-gray-300'>
                    <label className='text-[11px] font-semibold'>GUESTS</label>
                    <input
                        value={noOfGuests}
                        onChange={(e) => setNoOfGuests(e.target.value)}
                        className='border border-gray-300 px-4 py-2 rounded-lg my-2'
                        type="number" />
                </div>
            </div>
            {numberOfDays > 0 && (
                <div className='border border-gray-300 rounded-xl mt-4'>
                    <div className='flex flex-col py-2 px-4 border-gray-300'>
                        <label className='text-[11px] font-semibold'>NAME</label>
                        <input
                            value="John"
                            // onChange={(e) => setNoOfGuests(e.target.value)}
                            className='border border-gray-300 px-4 py-2 rounded-lg my-2'
                            type="text" />
                    </div>
                    <div className='flex flex-col px-4 mb-4 border-gray-300'>
                        <label className='text-[11px] font-semibold'>PHONE</label>
                        <input
                            value="+92-3222582823"
                            // onChange={(e) => setNoOfGuests(e.target.value)}
                            className='border border-gray-300 px-4 py-2 rounded-lg my-2'
                            type="tel" />
                    </div>
                </div>
            )}
            <button
                onClick={handleBooking}
                className='bg-gradient-to-r from-primary to-pink-500 w-full py-2 rounded-lg font-bold text-white mt-6'>
                Book Now
            </button>



            {numberOfDays > 0 && (
                <div className='mt-4'>
                    <div className='flex justify-between'>
                        <p className='underline'>${place.price} x {numberOfDays}nights</p>
                        <p>${place.price * numberOfDays}</p>
                    </div>
                    <div className='flex justify-between my-2'>
                        <p className='underline'>Cleaning fee</p>
                        <p>$80</p>
                    </div>
                    <div className='flex justify-between'>
                        <p className='underline'>Airbnb Service fee</p>
                        <p>$42</p>
                    </div>
                    <div className='border-0 border-b my-7 border-gray-300'></div>
                    <div className='flex justify-between'>
                        <h2 className='font-bold text-gray-800 text-[17px]'>Total before taxes</h2>
                        <p className='font-bold text-gray-800 text-[17px]'>${(place.price * numberOfDays) + 80 + 42}</p>
                    </div>

                </div>
            )}
        </div>

    )
}

export default BookingPlaceWidget
