import { useContext } from 'react'
import { PlaceContext } from '../context/placeContext'
import { useParams } from 'react-router-dom';



const PlacePage = () => {
    const { place } = useContext(PlaceContext);
    const { id } = useParams();
    console.log("Params id", id)
    return (
        <div>
            This is full Place Page
            {id}

        </div>
    )
}

export default PlacePage
