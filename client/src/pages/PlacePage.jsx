import { useContext, useEffect, useState } from 'react'
import { PlaceContext } from '../context/placeContext'
import { useParams } from 'react-router-dom';
import axios from 'axios';

const PlacePage = () => {
    const [place, setPlace] = useState('')
    const { places } = useContext(PlaceContext);
    // const result = places.map((place) => (place._id))
    const { id } = useParams();
    console.log("Params id", places)

    useEffect(() => {
        axios.get(`/place-page/${id}`)
            .then(({ data }) => setPlace(data))
    }, [id])

    console.log("Single Place data==>", place)

    return (
        <div>
            This is full Place Page <br />
            {id}

            <div>
                <h1>{place.title}</h1>
                <p>{place.description}</p>
                <p>{place._id}</p>
            </div>

        </div>
    )
}

export default PlacePage
