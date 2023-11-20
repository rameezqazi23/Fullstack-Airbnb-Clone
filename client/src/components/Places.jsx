import { MdAddCircleOutline } from 'react-icons/md';
import { Link, useParams } from 'react-router-dom';
import PlaceForm from './PlaceForm';
import ListingCard from './ListingCard';
import { useContext } from 'react';
import { PlaceContext } from '../context/placeContext';


const Places = () => {
    const { action } = useParams();
    const { places } = useContext(PlaceContext)


    // const data = places.map(place => place._id)
    // for (let i = 0; i < places.length; i++) {
    //     var placeId = places[i]._id
    // }

    // console.log("PLaces data==>", placeId)


    return (
        <div className='w-full h-full'>
            {action !== 'new' &&
                <div className='w-full h-full'>
                    <div className='flex justify-center items-center mx-auto max-w-[350px]'>
                        <Link to='/account/places/new' className='flex justify-center py-2 px-4 gap-2 text-white text-[16px] font-medium rounded-full mt-8 items-center bg-primary'>
                            <MdAddCircleOutline /> Add new place</Link>
                    </div>
                    {/* <Link to={`/account/places/${placeId}`}>
                    </Link> */}
                    <ListingCard myPlaces={places} />

                </div>

            }
            {action === 'new' &&
                <div className='m-8'>
                    <PlaceForm />
                </div>
            }

        </div>
    )
}

export default Places
