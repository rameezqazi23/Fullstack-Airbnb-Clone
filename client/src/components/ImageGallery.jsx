import { TbGridDots } from 'react-icons/tb';


const ImageGallery = ({ place,setShowAllPhotos }) => {
    

    return (
        <div>

            <div className='relative'>
                <div className='my-8 grid gap-2 grid-cols-[2fr_1fr] rounded-xl overflow-hidden'>
                    <div>
                        {place.photos?.[0] && (
                            <div className="aspect-w-1 aspect-h-1">
                                <img onClick={() => setShowAllPhotos(true)} className='aspect-square object-cover cursor-pointer' src={`http://localhost:8000/uploads/${place?.photos[0]}`} alt="places" />
                            </div>
                        )}
                    </div>

                    <div className='grid'>
                        {place.photos?.[1] && (

                            <img onClick={() => setShowAllPhotos(true)} className='aspect-square object-cover cursor-pointer' src={`http://localhost:8000/uploads/${place?.photos[1]}`} alt="places" />

                        )}
                        <div className='overflow-hidden'>
                            {place.photos?.[2] && (
                                <img onClick={() => setShowAllPhotos(true)} className='aspect-square object-cover cursor-pointer relative top-2' src={`http://localhost:8000/uploads/${place?.photos[2]}`} alt="places" />
                            )}
                        </div>
                    </div>

                    <button
                        onClick={() => setShowAllPhotos(true)}
                        className='flex items-center gap-2 backdrop-filter backdrop-blur-sm bg-opacity-90 bg-[#f0efef] 
                font-semibold border border-gray-500 px-4 py-2 rounded-lg absolute top-12 right-4'>
                        <TbGridDots />
                        Show all photos
                    </button>
                </div>
            </div>

        </div>
    )
}

export default ImageGallery
