import { useEffect, useState } from 'react'
import { MdAddCircleOutline } from 'react-icons/md';
import { Link, useNavigate, useParams } from 'react-router-dom';
import PlaceForm from './PlaceForm';
import axios from 'axios';


const Places = () => {
    const { action } = useParams();
    const [places, setPlaces] = useState([]);

    useEffect(() => {
        axios.get('/places')
            .then(({ data }) => {
                setPlaces(data)
                console.log("Places data===>,", data)
            })
    }, [])




    return (
        <div>
            {action !== 'new' &&
                <div className='w-full h-full'>
                    <div className='flex justify-center items-center mx-auto max-w-[350px]'>
                        <Link to='/account/places/new' className='flex justify-center py-2 px-4 gap-2 text-white text-[16px] font-medium rounded-full mt-8 items-center bg-primary'>
                            <MdAddCircleOutline /> Add new place</Link>
                    </div>
                    <div>
                        {places.length > 0 && places.map((place) => (
                            <div key={place._id}>
                                {place?.title}
                            </div>
                        ))}
                    </div>



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
