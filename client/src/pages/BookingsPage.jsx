import axios from 'axios'
import { useEffect, useState } from 'react'

const BookingsPage = () => {
    const [bookings, setBookings] = useState([])

    useEffect(() => {
        axios.get('/bookings')
            .then(({ data }) => setBookings(data))
    }, [])
    console.log("All my bookings here==>", bookings)
    return (
        <div>
            a
            All My bookings here
        </div>
    )
}

export default BookingsPage
