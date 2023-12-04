import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const PlaceContext = createContext();

export const PlaceContextProvider = ({ children }) => {
  const [places, setPlaces] = useState([]);
  const [allPlaces, setAllPlaces] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios.get("/places").then(({ data }) => {
      setPlaces(data);
    });

    axios.get("/all-places").then(({ data }) => {
      setAllPlaces(data);
      setIsLoading(false);
    });
  }, []);

  return (
    <PlaceContext.Provider
      value={{ places, setPlaces, allPlaces, isLoading, setIsLoading }}
    >
      {children}
    </PlaceContext.Provider>
  );
};
