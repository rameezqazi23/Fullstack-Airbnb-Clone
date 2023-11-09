import { useContext } from 'react'
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { PlaceContext } from '../context/placeContext';

const ListingCard = () => {
    const settings = {
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        dots: true,
    };

    const { places } = useContext(PlaceContext)
    
    return (
        <div className='flex flex-wrap mx-4 gap-8 mt-8'>
            {places.length > 0 && places.map((place) => (
                <div key={place._id} className="flex-shrink-0 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 max-w-md mx-auto overflow-hidden">
                    {/* Use the sliderSettings here */}
                    <Slider {...settings}>
                        {place.photos.map((image, index) => (
                            <div key={index}>
                                <img
                                    src={`http://localhost:8000/uploads/${image}`}
                                    alt={`Slide ${index + 1}`}
                                    className="w-full h-[240px] object-cover rounded-2xl"
                                />
                            </div>
                        ))}
                    </Slider>

                    <div className="mt-6">
                        <h3 className="text-md text-black font-semibold">{place.title}</h3>
                        <p className="text-gray-500">{place.description}</p>
                        <p className="text-gray-500 mb-2">Dec 2 - 7</p>
                        <p className="font-semibold text-black">$204 <span className='text-gray-500 font-normal'>per night</span></p>
                    </div>
                </div>
            ))}
        </div>




    )
}

export default ListingCard
