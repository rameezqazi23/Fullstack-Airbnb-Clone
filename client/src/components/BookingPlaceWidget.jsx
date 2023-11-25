import React from 'react'

const BookingPlaceWidget = ({place}) => {
    return (
        <div className='w-[370px] h-[400px] p-6 border border-gray-300 rounded-xl shadow-xl text-black'>
            <h2 className='font-semibold text-xl'>${place.price} <span className='font-normal text-[16px]'>night</span></h2>
            <div className='border border-gray-300 rounded-xl mt-4'>
                <div className='flex mx-auto'>
                    <div className='py-3 px-4'>
                        <label className='text-[11px] font-semibold'>CHECK-IN</label>
                        <input type="date" />
                    </div>
                    <div className='py-3 px-4 border-l border-gray-300'>
                        <label className='text-[11px] font-semibold'>CHECK-OUT</label>
                        <input type="date" />
                    </div>
                </div>
                <div className='flex flex-col py-3 px-4 border-t border-gray-300'>
                    <label className='text-[11px] font-semibold'>GUESTS</label>
                    <input className='border border-gray-300 px-4 py-2 rounded-lg my-2' value={1} type="number" />
                </div>
            </div>
            <button className='bg-gradient-to-r from-primary to-pink-500 w-full py-2 rounded-lg font-bold text-white mt-6'>Book Now</button>
        </div>

    )
}

export default BookingPlaceWidget
