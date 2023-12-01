import { MdAddCircleOutline } from 'react-icons/md';
import { Link, useParams } from 'react-router-dom';
import PlaceForm from './PlaceForm';
import ListingCard from './ListingCard';
import { useContext } from 'react';
import { PlaceContext } from '../context/placeContext';
import { BookingsPage } from '../pages';


const Places = () => {
    const { action } = useParams();
    const { places } = useContext(PlaceContext)

    console.log("Action==>", { action })

    return (
        <div className='w-full h-full'>
            {action !== 'new' &&
                <div className='w-full h-full'>
                    <div className='flex justify-center items-center mx-auto max-w-[350px]'>
                        <Link to='/account/places/new' className='flex justify-center py-2 px-4 gap-2 text-white text-[16px] font-medium rounded-full mt-8 items-center bg-primary'>
                            <MdAddCircleOutline />
                            Add new place
                        </Link>
                    </div>

                    {places.length > 0 ? (
                        <ListingCard myPlaces={places} />

                    ) : (
                        <div className='flex justify-center mt-8'>
                            <p className='font-semibold text-[20px] text-gray-600'>Currently You have no places to offer</p>
                        </div>

                    )}

                </div>

            }
            {action === 'new' &&
                <div className='mx-3 my-8'>
                    <PlaceForm />
                </div>
            }
            


        </div>
    )
}

export default Places
