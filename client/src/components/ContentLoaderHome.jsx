import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const ContentLoaderHome = ({ place }) => {
  return Array(place)
    .fill(0)
    .map((item) => (
      <div
        key={item}
        className="flex-shrink-0 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 max-w-md mx-auto overflow-hidden"
      >
        <Skeleton height={200} />
        <div className="mt-6">
          <h3 className="text-md text-black font-semibold">
            <Skeleton />
          </h3>
          <p className="text-gray-500 truncate">
            <Skeleton count={2} />
          </p>
          <p className="text-gray-500 mb-2">
            <Skeleton count={2} />
          </p>
          <p className="font-semibold text-black">
            <Skeleton width={80} />
          </p>
        </div>
      </div>
    ));
};

export default ContentLoaderHome;
