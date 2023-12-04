import { useContext } from "react";
import { PlaceContext } from "../context/placeContext";
import ListingCard from "../components/ListingCard";

const Home = () => {
  const { allPlaces, isLoading, setIsLoading } = useContext(PlaceContext);
  console.log("All places==>", allPlaces);

  return (
    <div>
      <ListingCard
        myPlaces={allPlaces}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
      />
    </div>
  );
};

export default Home;
