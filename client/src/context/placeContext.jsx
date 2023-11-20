import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const PlaceContext = createContext();

export const PlaceContextProvider = ({ children }) => {
    const [places, setPlaces] = useState([])
    const [allPlaces, setAllPlaces] = useState([])

    useEffect(() => {
        axios.get('/places')
            .then(({ data }) => {
                setPlaces(data)
            })

        axios.get('/all-places')
            .then(({ data }) => {
                setAllPlaces(data)
            })
    }, [])

    return (
        <PlaceContext.Provider value={{ places, setPlaces, allPlaces }}>
            {children}
        </PlaceContext.Provider>
    )
}