import { useParams } from "react-router-dom";
import PlacePage from "./PlacePage";
import { useEffect, useState } from "react";
import axios from "axios";
import { ImageGallery } from "../components";
import { TbGridDots } from "react-icons/tb";
import {
  FaArrowUp,
  FaCalendarCheck,
  FaMoneyCheckAlt,
  FaRegHeart,
} from "react-icons/fa";
import { IoIosArrowBack } from "react-icons/io";
import { FiUpload } from "react-icons/fi";
import { IoLocationSharp } from "react-icons/io5";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { differenceInCalendarDays, format } from "date-fns";
import { MdNightsStay } from "react-icons/md";

const BookingPage = () => {
  const { id } = useParams();
  const [currentBookingData, setCurrentBookingData] = useState();
  const [showAllPhotos, setShowAllPhotos] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

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

  if (showAllPhotos) {
    return (
      <div className="bg-[#0f0f0f] w-full h-full relative">
        <div className="mx-8">
          <button
            onClick={() => setShowAllPhotos(false)}
            className="hover:bg-primary duration-200 rounded-full my-4"
          >
            <IoIosArrowBack color="white" size={30} />
          </button>
        </div>
        <h2 className="text-2xl text-white mb-6 mx-8">Photo tour</h2>
        <div className="p-8 h-auto grid lg:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2 grid-cols-1 gap-3">
          {currentBookingData?.place?.photos?.length > 0 &&
            currentBookingData?.place?.photos?.map((photo) => (
              <div
                key={photo}
                className="aspect-w-3 aspect-h-4 rounded-xl overflow-hidden"
              >
                <div className="w-full h-full flex items-center justify-center">
                  <img
                    className="w-full h-full object-cover"
                    src={`http://localhost:8000/uploads/${photo}`}
                    alt="photos"
                  />
                </div>
              </div>
            ))}
        </div>
        <div className="fixed sm:hidden flex z-10 mx-8 bottom-12 right-4 animate-bounce">
          <button
            onClick={() => window.scrollTo(0, 0)}
            className="rounded-full p-2 bg-primary"
          >
            <FaArrowUp color="white" size={30} />
          </button>
        </div>
      </div>
    );
  }

  const settings = {
    // dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    afterChange: (current) => setCurrentSlide(current),
  };

  console.log("Current Booking Data====>", currentBookingData);

  return (
    <div>
      {/* <ImageGallery
        place={currentBookingData?.place}
        setShowAllPhotos={setShowAllPhotos}
      /> */}
      <div className="hidden md:flex flex-col w-full h-full mt-8 sm:px-28 px-8">
        <h1 className="text-2xl sm:text-3xl font-semibold text-gray-800">
          {currentBookingData?.place.title}
        </h1>
        <div className="sm:flex flex-row justify-between">
          <div className="flex gap-10 mt-4">
            <div className="text-[13px] sm:text-[16px]">
              <p>
                Superhost{" "}
                <span className="font-semibold underline">
                  {currentBookingData?.place.owner?.name}
                </span>
              </p>
            </div>
            <div className="flex items-center gap-1 text-[13px] sm:text-[16px]">
              <IoLocationSharp />
              <a
                className="font-semibold underline"
                target="_blank"
                rel="noreferrer"
                href={`https://maps.google.com/?q=${currentBookingData?.place.address}`}
              >
                {currentBookingData?.place.address}
              </a>
            </div>
          </div>
          <div className="flex gap-10 px-8 justify-between sm:justify-normal mt-4">
            <div className="flex items-center gap-2 cursor-pointer font-semibold underline">
              <FiUpload />
              <p className="hidden md:flex">Share</p>
            </div>
            <div className="flex items-center gap-2 cursor-pointer font-semibold underline">
              <FaRegHeart />
              <p className="hidden md:flex">Save</p>
            </div>
          </div>
        </div>

        {/* Booking Details Card */}
        <div className="bg-gray-200 p-4 my-4 rounded-xl">
          <div className="flex items-center py-3 px-8 gap-4">
            <h2 className="text-lg font-semibold">
              Booking Info:
            </h2>
          
            <p className=" flex items-center pt-2 gap-4 text-sm">
              <FaCalendarCheck />
              {format(new Date(currentBookingData.checkIn), "yyyy-MM-dd")}{" "}
              &rarr;{" "}
              {format(new Date(currentBookingData.checkOut), "yyyy-MM-dd")}
            </p>
            <div className="flex flex-wrap gap-2 text-md font-semibold mt-2">
              <p className="flex items-center gap-1">
                <MdNightsStay />
                {differenceInCalendarDays(
                  new Date(currentBookingData.checkOut),
                  new Date(currentBookingData.checkIn)
                )}{" "}
                nights |
              </p>
              <p className="flex items-center gap-2">
                <FaMoneyCheckAlt />
                Total Price: ${currentBookingData.price}
              </p>
            </div>

          </div>
        </div>

        <div
          onClick={() => setShowAllPhotos(true)}
          className="grid grid-cols-1 sm:grid-cols-2 col-span-2 gap-2 my-8 cursor-pointer rounded-xl overflow-hidden"
        >
          <div className="aspect-square object-cover w-full h-full">
            {currentBookingData?.place.photos?.[0] && (
              <img
                className="w-full h-full"
                src={`http://localhost:8000/uploads/${currentBookingData?.place.photos[0]}`}
                alt="places"
              />
            )}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <div className="aspect-square object-cover w-full">
              {currentBookingData?.place.photos?.[1] && (
                <img
                  className="w-full h-full"
                  src={`http://localhost:8000/uploads/${currentBookingData?.place.photos[1]}`}
                  alt="places"
                />
              )}
            </div>
            <div className="aspect-square object-cover w-full">
              {currentBookingData?.place.photos?.[2] && (
                <img
                  className="w-full h-full"
                  src={`http://localhost:8000/uploads/${currentBookingData?.place.photos[2]}`}
                  alt="places"
                />
              )}
            </div>
            <div className="aspect-square object-cover w-full">
              {currentBookingData?.place.photos?.[2] && (
                <img
                  className="w-full h-full"
                  src={`http://localhost:8000/uploads/${currentBookingData?.place.photos[2]}`}
                  alt="places"
                />
              )}
            </div>{" "}
            <div className="aspect-square object-cover w-full">
              {currentBookingData?.place.photos?.[2] && (
                <img
                  className="w-full h-full"
                  src={`http://localhost:8000/uploads/${currentBookingData?.place.photos[2]}`}
                  alt="places"
                />
              )}
            </div>
          </div>
        </div>
        <div>
          <button
            onClick={() => setShowAllPhotos(true)}
            className="flex items-center gap-2 backdrop-filter backdrop-blur-sm bg-opacity-90 bg-[#f0efef] 
                font-semibold border border-gray-500 px-4 py-2 rounded-lg relative bottom-28 left-14"
          >
            <TbGridDots />
            Show all photos
          </button>
        </div>
      </div>
      {/* Mobile Menu */}

      <div className="flex flex-col md:hidden">
        <div>
          <Slider {...settings}>
            {currentBookingData?.place?.photos?.map((image, index) => (
              <div key={index}>
                <img
                  className="aspect-square object-cover"
                  src={`http://localhost:8000/uploads/${image}`}
                  alt={`Image ${index + 1}`}
                />
              </div>
            ))}
          </Slider>
          <div className="text-center mt-2">
            <p className="text-sm text-gray-600">
              Image {currentSlide + 1}/
              {currentBookingData?.place.photos?.length}
            </p>
          </div>
        </div>

        <h1 className="text-2xl sm:text-3xl font-semibold text-gray-800 px-6 py-4">
          {currentBookingData?.place.title}
        </h1>
        <div className="flex-row justify-between px-6">
          <div className="flex gap-10">
            <div className="text-[14px]">
              <p>
                Superhost{" "}
                <span className="font-semibold underline">
                  {currentBookingData?.place.owner?.name}
                </span>
              </p>
            </div>
            <div className="flex items-center gap-1 text-[13px] sm:text-[16px]">
              <IoLocationSharp />
              <a
                className="font-semibold underline"
                target="_blank"
                rel="noreferrer"
                href={`https://maps.google.com/?q=${currentBookingData?.place.address}`}
              >
                {currentBookingData?.place.address}
              </a>
            </div>
          </div>
          <div className="flex gap-10 px-8 justify-between sm:justify-normal mt-4">
            <div className="flex items-center gap-2 cursor-pointer font-semibold underline">
              <FiUpload />
              <p className="hidden md:flex">Share</p>
            </div>
            <div className="flex items-center gap-2 cursor-pointer font-semibold underline">
              <FaRegHeart />
              <p className="hidden md:flex">Save</p>
            </div>
          </div>

          <button
            onClick={() => setShowAllPhotos(true)}
            className="flex items-center gap-2 backdrop-filter backdrop-blur-sm bg-opacity-90 bg-[#f0efef] 
                font-semibold border border-gray-500 px-4 py-2 rounded-lg absolute top-24 right-4"
          >
            <TbGridDots />
            Show all photos
          </button>
        </div>
      </div>

      {/* Description */}
      <div className="flex flex-col w-full h-full sm:px-28 px-8 mb-8">
        <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr]">
          <div className="max-w-[600px] mb-8">
            <h1 className="text-2xl font-semibold mb-6 text-black">
              Description
            </h1>
            <p className="font-[16px] leading-6 text-black">
              {currentBookingData?.place.description}
            </p>
            <h1 className="text-2xl font-semibold my-6 text-black">
              Extra Info
            </h1>
            <p className="font-[16px] leading-6 text-black">
              {currentBookingData?.place.extraInfo}
            </p>
            <div className="border-0 border-b mt-16 border-gray-300"></div>
            <h1 className="text-2xl font-semibold my-6 text-black">
              What this place offers
            </h1>
          </div>
          {/* <div>
            <BookingPlaceWidget place={place} />
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default BookingPage;
