import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
const ContentLoaderBookings = ({ myBookings }) => {
  return Array(myBookings)
    .fill(0)
    .map((item) => (
      <div
        key={item}
        className="flex gap-4 bg-gray-100 my-4 rounded-xl overflow-hidden"
      >
        <div className="w-48 h-40 flex-wrap">
          <Skeleton height={160} />
        </div>
        <div className="py-3 flex-grow">
          <h2 className="text-lg font-semibold lg:text-xl border-b border-gray-300 grow">
            <Skeleton width={150} />
          </h2>
          <p className="flex items-center pt-2 gap-4 text-sm">
            <Skeleton width={80} />
          </p>
          <div className="flex flex-wrap gap-2 text-md font-semibold mt-2">
            <p className="flex items-center gap-1">
              <Skeleton width={80} />
            </p>
            <p className="flex items-center gap-2">
              <Skeleton width={120} />
            </p>
          </div>
        </div>
      </div>
    ));
};

export default ContentLoaderBookings;
