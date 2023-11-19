import { useContext } from 'react'
import { PlaceContext } from '../context/placeContext'
import { useParams } from 'react-router-dom';

const PlacePage = () => {
    const { places } = useContext(PlaceContext);
    const result = places.map((place) => (place._id))
    const { id } = useParams();
    console.log("Params id", places)
    return (
        <div>
            This is full Place Page <br />
            {id === result && result}

        </div>
    )
}

export default PlacePage
