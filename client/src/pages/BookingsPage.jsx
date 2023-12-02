import axios from "axios";
import { differenceInCalendarDays, format } from "date-fns";
import { useEffect, useState } from "react";
import { FaCalendarCheck, FaMoneyCheckAlt } from "react-icons/fa";
import { MdNightsStay } from "react-icons/md";
import { Link } from "react-router-dom";

const BookingsPage = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    axios.get("/bookings").then(({ data }) => setBookings(data));
  }, []);
  console.log("All my bookings here==>", bookings);

  return (
    <div className="m-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 cursor-pointer">
        {bookings.length > 0 ? (
          bookings.map((booking) => (
            <Link
              to={`/account/booking-page/${booking._id}`}
              key={booking._id}
              className="flex gap-4 bg-gray-100 my-4 rounded-xl overflow-hidden"
            >
              <div className="w-48 h-40 flex-wrap">
                <img
                  className="w-full h-full object-cover"
                  src={`http://localhost:8000/uploads/${booking.place?.photos[0]}`}
                  alt="photo"
                />
              </div>
              <div className="py-3">
                <h2 className="text-lg font-semibold lg:text-xl border-b border-gray-300 grow">
                  {booking.place.title}
                </h2>
                <p className=" flex items-center pt-2 gap-4 text-sm">
                  <FaCalendarCheck />
                  {format(new Date(booking.checkIn), "yyyy-MM-dd")} &rarr;{" "}
                  {format(new Date(booking.checkOut), "yyyy-MM-dd")}
                </p>
                <div className="flex flex-wrap gap-2 text-md font-semibold mt-2">
                  <p className="flex items-center gap-1">
                    <MdNightsStay />
                    {differenceInCalendarDays(
                      new Date(booking.checkOut),
                      new Date(booking.checkIn)
                    )}{" "}
                    nights |
                  </p>
                  <p className="flex items-center gap-2">
                    <FaMoneyCheckAlt />
                    Total Price: ${booking.price}
                  </p>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <div>Loading...</div>
        )}
      </div>
    </div>
  );
};

export default BookingsPage;
