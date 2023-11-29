import { useState } from 'react'
import { differenceInCalendarDays } from 'date-fns'
import axios from 'axios';
import { ThreeDots } from 'react-loader-spinner';
import BookingPopUp from './BookingPopUp';



const BookingPlaceWidget = ({ place }) => {

    const [isLoading, setIsLoading] = useState(false)
    const [isBookingPopUp, setIsBookingPopUp] = useState(false);
    const [bookingFormData, setBookingFormData] = useState({
        checkIn: '',
        checkOut: '',
        noOfGuests: 1,
        name: '',
        cellPhone: '',

    })

    let numberOfDays = 0;
    const cleaningFee = 80;
    const serviceFee = 42;

    if (bookingFormData.checkIn && bookingFormData.checkOut) {

        numberOfDays = differenceInCalendarDays(new Date(bookingFormData.checkOut), new Date(bookingFormData.checkIn))
        var totalPrice = (place.price * numberOfDays) + cleaningFee + serviceFee
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setBookingFormData((prev) => ({
            ...prev,
            [name]: value
        }))

    }

    const handleBooking = (e) => {
        e.preventDefault()
        if (bookingFormData.checkIn && bookingFormData.checkOut && bookingFormData.noOfGuests && bookingFormData.name && bookingFormData.cellPhone) {
            setIsLoading(true)
            setTimeout(async () => {
                console.log("Bookings", bookingFormData)
                try {
                    await axios.post('/booking',
                        {
                            bookingFormData,
                            price: totalPrice,
                            _id: place._id
                        })
                        .then(() => {
                            setIsLoading(false)
                            setBookingFormData({
                                checkIn: '',
                                checkOut: '',
                                noOfGuests: 1
                            })
                        }).then(setIsBookingPopUp(true))

                } catch (error) {
                    console.log(error)
                    setIsLoading(false)
                }
            }, 1000);
        }

    }

    return (
        <form onSubmit={handleBooking} className='w-[370px] h-auto p-6 border border-gray-300 rounded-xl shadow-xl text-black'>
            <h2 className='font-semibold text-xl'>${place.price} <span className='font-normal text-[16px]'>night</span></h2>
            <div className='border border-gray-300 rounded-xl mt-4'>
                <div className='grid grid-cols-2 mx-auto'>
                    <div className='py-2 px-4'>
                        <label className='text-[11px] font-semibold'>CHECK-IN</label>
                        <input
                            name='checkIn'
                            value={bookingFormData.checkIn}
                            onChange={handleInputChange}
                            type="date" />
                    </div>
                    <div className='py-2 px-4 border-l border-gray-300'>
                        <label className='text-[11px] font-semibold'>CHECK-OUT</label>
                        <input
                            name='checkOut'
                            value={bookingFormData.checkOut}
                            onChange={handleInputChange}
                            type="date" />
                    </div>
                </div>
                <div className='flex flex-col py-4 px-4 border-t border-gray-300'>
                    <label className='text-[11px] font-semibold'>GUESTS</label>
                    <input
                        name='noOfGuests'
                        value={bookingFormData.noOfGuests}
                        onChange={handleInputChange}
                        className='border border-gray-300 px-4 py-2 rounded-lg my-2'
                        type="number" />
                </div>
            </div>
            {numberOfDays > 0 && (
                <div className='border border-gray-300 rounded-xl mt-4'>
                    <div className='flex flex-col py-2 px-4 border-gray-300'>
                        <label className='text-[11px] font-semibold'>NAME</label>
                        <input
                            name='name'
                            value={bookingFormData.name}
                            placeholder='John'
                            onChange={handleInputChange}
                            className='border border-gray-300 px-4 py-2 rounded-lg my-2'
                            type="text" />
                    </div>
                    <div className='flex flex-col px-4 mb-4 border-gray-300'>
                        <label className='text-[11px] font-semibold'>PHONE</label>
                        <input
                            name='cellPhone'
                            value={bookingFormData.cellPhone}
                            placeholder='+92-3222582823'
                            onChange={handleInputChange}
                            className='border border-gray-300 px-4 py-2 rounded-lg my-2'
                            type="tel" />
                    </div>
                </div>
            )}
            <button
                // onClick={handleBooking}
                type='submit'
                className='flex justify-center items-center gap-3 bg-gradient-to-r from-primary to-pink-500 w-full py-2 rounded-lg font-bold text-white mt-6'>
                Book Now
                {isLoading && (
                    <ThreeDots
                        height="20"
                        width="20"
                        radius="2"
                        color="white"
                        ariaLabel="three-dots-loading"
                        wrapperStyle={{}}
                        wrapperClassName=""
                        visible={true}
                    />

                )}
            </button>

            {numberOfDays > 0 && (
                <div className='mt-4'>
                    <div className='flex justify-between'>
                        <p className='underline'>${place.price} x {numberOfDays} nights</p>
                        <p>${place.price * numberOfDays}</p>
                    </div>
                    <div className='flex justify-between my-2'>
                        <p className='underline'>Cleaning fee</p>
                        <p>${cleaningFee}</p>
                    </div>
                    <div className='flex justify-between'>
                        <p className='underline'>Airbnb Service fee</p>
                        <p>${serviceFee}</p>
                    </div>
                    <div className='border-0 border-b my-7 border-gray-300'></div>
                    <div className='flex justify-between'>
                        <h2 className='font-bold text-gray-800 text-[17px]'>Total before taxes</h2>
                        <p className='font-bold text-gray-800 text-[17px]'>${totalPrice}</p>
                    </div>

                </div>
            )}
            {isBookingPopUp && (
                <div>
                    <BookingPopUp setIsBookingPopUp={setIsBookingPopUp} />
                </div>
            )
            }
        </form>

    )
}

export default BookingPlaceWidget
