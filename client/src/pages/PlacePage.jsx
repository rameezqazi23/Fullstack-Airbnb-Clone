import { useContext, useEffect, useState } from 'react'
import { PlaceContext } from '../context/placeContext'
import { useParams } from 'react-router-dom';
import axios from 'axios';


import { IoLocationSharp } from "react-icons/io5";
import { UserContext } from '../context/userContext';
import { CgSoftwareUpload } from "react-icons/cg";
import { FaRegHeart } from 'react-icons/fa';
import { FiUpload } from 'react-icons/fi';


const PlacePage = () => {
    const [place, setPlace] = useState('')
    const { places } = useContext(PlaceContext);
    const { user } = useContext(UserContext);
    // const result = places.map((place) => (place._id))
    const { id } = useParams();
    console.log("Params id", places)

    useEffect(() => {
        axios.get(`/place-page/${id}`)
            .then(({ data }) => setPlace(data))
    }, [id])

    console.log("Single Place data==>", place)

    return (
        <div className='mt-8 px-8'>
            <h1 className='text-3xl font-semibold text-gray-800'>{place.title}</h1>
            <div className='flex justify-between'>
                <div className='flex gap-10 mt-4'>

                    <div>
                        <p>
                            Superhost <span className='font-semibold underline'>{place.owner?.name}</span>
                        </p>

                    </div>
                    <div className='flex items-center gap-1 '>
                        <IoLocationSharp />
                        <a
                            className='font-semibold underline'
                            target='_blank'
                            rel='noreferrer'
                            href={`https://maps.google.com/?q=${place.address}`}>
                            {place.address}
                        </a>
                    </div>
                </div>
                <div className='flex gap-10 px-8'>
                    <div className='flex items-center gap-2 cursor-pointer font-semibold underline'>
                        <FiUpload />
                        <p>Share</p>
                    </div>
                    <div className='flex items-center gap-2 cursor-pointer font-semibold underline'>
                        <FaRegHeart />
                        <p>Save</p>
                    </div>
                </div>


            </div>
            {/* <div className=''>
                
            </div> */}

        </div>
    )
}

export default PlacePage
