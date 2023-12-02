import { useContext, useEffect, useState } from "react";
import { PlaceContext } from "../context/placeContext";
import { useParams } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../context/userContext";
import { BookingPlaceWidget, ImageGallery } from "../components";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { IoLocationSharp } from "react-icons/io5";
import { FaArrowUp, FaRegHeart } from "react-icons/fa";
import { FiUpload } from "react-icons/fi";
import { TbGridDots } from "react-icons/tb";
import { IoIosArrowBack } from "react-icons/io";

const PlacePage = () => {
  const [place, setPlace] = useState("");
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showAllPhotos, setShowAllPhotos] = useState(false);

  const { places } = useContext(PlaceContext);
  const { user } = useContext(UserContext);
  // const result = places.map((place) => (place._id))
  const { id } = useParams();
  // console.log("Params id", places)

  useEffect(() => {
    axios.get(`/place-page/${id}`).then(({ data }) => setPlace(data));
  }, [id]);

  // console.log("Single Place data==>", place)

  const settings = {
    // dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    afterChange: (current) => setCurrentSlide(current),
  };

  if (!place) return;

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
          {place?.photos?.length > 0 &&
            place?.photos?.map((photo) => (
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

  return (
    <>
      <div className="hidden md:flex flex-col w-full h-full mt-8 sm:px-28 px-8">
        <h1 className="text-2xl sm:text-3xl font-semibold text-gray-800">
          {place.title}
        </h1>
        <div className="sm:flex flex-row justify-between">
          <div className="flex gap-10 mt-4">
            <div className="text-[13px] sm:text-[16px]">
              <p>
                Superhost{" "}
                <span className="font-semibold underline">
                  {place.owner?.name}
                </span>
              </p>
            </div>
            <div className="flex items-center gap-1 text-[13px] sm:text-[16px]">
              <IoLocationSharp />
              <a
                className="font-semibold underline"
                target="_blank"
                rel="noreferrer"
                href={`https://maps.google.com/?q=${place.address}`}
              >
                {place.address}
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

        <div>
          <ImageGallery place={place} setShowAllPhotos={setShowAllPhotos} />
        </div>

        {/* <div className='grid grid-cols-2 col-span-2 gap-2 my-8'>
                    {place.photos?.[0] && (
                        <img className='aspect-square row-span-2 object-cover w-full h-full' src={`http://localhost:8000/uploads/${place?.photos[0]}`} alt="places" />
                    )}
                    {place.photos?.[1] && (
                        <img className='aspect-square object-cover w-full h-[220px]' src={`http://localhost:8000/uploads/${place?.photos[1]}`} alt="places" />
                    )}
                    {place.photos?.[2] && (
                        <img className='aspect-square object-cover w-full h-[220px]' src={`http://localhost:8000/uploads/${place?.photos[2]}`} alt="places" />
                    )}
                </div> */}
      </div>

      {/* Mobile Menu */}
      <div className="flex flex-col md:hidden">
        <div>
          <Slider {...settings}>
            {place?.photos?.map((image, index) => (
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
              Image {currentSlide + 1}/{place.photos?.length}
            </p>
          </div>
        </div>

        <h1 className="text-2xl sm:text-3xl font-semibold text-gray-800 px-6 py-4">
          {place.title}
        </h1>
        <div className="flex-row justify-between px-6">
          <div className="flex gap-10">
            <div className="text-[14px]">
              <p>
                Superhost{" "}
                <span className="font-semibold underline">
                  {place.owner?.name}
                </span>
              </p>
            </div>
            <div className="flex items-center gap-1 text-[13px] sm:text-[16px]">
              <IoLocationSharp />
              <a
                className="font-semibold underline"
                target="_blank"
                rel="noreferrer"
                href={`https://maps.google.com/?q=${place.address}`}
              >
                {place.address}
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

      {/* Description flex flex-row justify-between */}
      <div className="flex flex-col w-full h-full sm:px-28 px-8 mb-8">
        <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr]">
          <div className="max-w-[600px] mb-8">
            <h1 className="text-2xl font-semibold mb-6 text-black">
              Description
            </h1>
            <p className="font-[16px] leading-6 text-black">
              {place.description}
            </p>
            <h1 className="text-2xl font-semibold my-6 text-black">
              Extra Info
            </h1>
            <p className="font-[16px] leading-6 text-black">
              {place.extraInfo}
            </p>
            <div className="border-0 border-b mt-16 border-gray-300"></div>
            <h1 className="text-2xl font-semibold my-6 text-black">
              What this place offers
            </h1>
          </div>
          <div>
            <BookingPlaceWidget place={place} />
          </div>
        </div>
      </div>
    </>
  );
};

export default PlacePage;
