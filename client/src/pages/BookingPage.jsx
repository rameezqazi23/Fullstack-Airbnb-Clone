import { useParams } from "react-router-dom";
import PlacePage from "./PlacePage";
import { useEffect, useState } from "react";
import axios from "axios";
import { ImageGallery } from "../components";

const BookingPage = () => {
  const { id } = useParams();
  const [currentBookingData, setCurrentBookingData] = useState();
  const [showAllPhotos, setShowAllPhotos] = useState(false);

  useEffect(() => {
    axios.get("/bookings").then((response) => {
      try {
        const foundBooking = response.data.find(({ _id }) => _id === id);
        if (foundBooking) {
          setCurrentBookingData(foundBooking);
        }
      } catch (error) {
        console.log("Booking not found", error.message);
      }
    });
  }, [id]);

  console.log("Current Booking Data==>", currentBookingData);
  console.log("Current Booking Data for Place==>", currentBookingData.place.photos);


  return (
    <div>
      {/* <div>
        <div
          onClick={() => setShowAllPhotos(true)}
          className="grid grid-cols-1 sm:grid-cols-2 col-span-2 gap-2 my-8 cursor-pointer rounded-xl overflow-hidden"
        >
          <div className="aspect-square object-cover w-full h-full">
            {currentBookingData.place.photos?.[0] && (
              <img
                className="w-full h-full"
                src={`http://localhost:8000/uploads/${currentBookingData.place?.photos[0]}`}
                alt="places"
              />
            )}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <div className="aspect-square object-cover w-full">
              {currentBookingData.place.photos?.[1] && (
                <img
                  className="w-full h-full"
                  src={`http://localhost:8000/uploads/${currentBookingData.place?.photos[1]}`}
                  alt="places"
                />
              )}
            </div>
            <div className="aspect-square object-cover w-full">
              {currentBookingData.place.photos?.[2] && (
                <img
                  className="w-full h-full"
                  src={`http://localhost:8000/uploads/${currentBookingData.place?.photos[2]}`}
                  alt="places"
                />
              )}
            </div>
            <div className="aspect-square object-cover w-full">
              {currentBookingData.place.photos?.[2] && (
                <img
                  className="w-full h-full"
                  src={`http://localhost:8000/uploads/${currentBookingData.place?.photos[2]}`}
                  alt="places"
                />
              )}
            </div>{" "}
            <div className="aspect-square object-cover w-full">
              {currentBookingData.place.photos?.[2] && (
                <img
                  className="w-full h-full"
                  src={`http://localhost:8000/uploads/${currentBookingData.place?.photos[2]}`}
                  alt="places"
                />
              )}
            </div>
          </div>
        </div>
        <button
          onClick={() => setShowAllPhotos(true)}
          className="flex items-center gap-2 backdrop-filter backdrop-blur-sm bg-opacity-90 bg-[#f0efef] 
                font-semibold border border-gray-500 px-4 py-2 rounded-lg relative bottom-28 left-14"
        >
          <TbGridDots />
          Show all photos
        </button>
      </div> */}
    </div>
  );
};

export default BookingPage;
