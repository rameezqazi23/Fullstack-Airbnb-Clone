import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const PlaceContext = createContext();

export const PlaceContextProvider = ({ children }) => {
    const [places, setPlaces] = useState([])

    useEffect(() => {
        axios.get('/places')
            .then(({ data }) => {
                setPlaces(data)
            })
    }, [])

    return (
        <PlaceContext.Provider value={{ places, setPlaces }}>
            {children}
        </PlaceContext.Provider>
    )
}