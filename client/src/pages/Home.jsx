import { useContext } from "react";
import { PlaceContext } from "../context/placeContext";
import ListingCard from "../components/ListingCard";

const Home = () => {
  const { allPlaces } = useContext(PlaceContext);
  console.log("All places==>", allPlaces);

  return (
    <div>
      <ListingCard myPlaces={allPlaces} />
    </div>
  );
};

export default Home;
