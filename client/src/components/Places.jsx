import { useState } from 'react'
import { MdAddCircleOutline, MdPets } from 'react-icons/md';
import { Link, useNavigate, useParams } from 'react-router-dom';


import {
    Input,
    FormControl,
    FormLabel,
    Select,
    Textarea,
    NumberInput,
    NumberInputField,
    Button,
    Flex,
    Box,
    Checkbox,
    NumberIncrementStepper,
    NumberInputStepper,
    NumberDecrementStepper
} from '@chakra-ui/react';

//react-icons
import { IoLocationOutline } from 'react-icons/io5';
import { BsImages, BsCardText, BsClock, BsCalendar, BsPeople, BsCloudUpload } from 'react-icons/bs';
import { AiFillCar, AiOutlineWifi } from 'react-icons/ai';
import { PiTelevisionLight } from 'react-icons/pi';
import { GiOpenGate } from 'react-icons/gi';
import { FaKitchenSet } from 'react-icons/fa6';
import { BiSolidWasher, BiCloudUpload } from 'react-icons/bi';
import { TbCalendarPlus } from 'react-icons/tb';
import axios from 'axios';
import { useEffect } from 'react';

const Places = () => {
    const { action } = useParams();
    console.log(action)

    const [photoLink, setPhotoLink] = useState("");
    const [addedPhotos, setAddedPhotos] = useState([]);
    const [addPerks, setAddPerks] = useState([]);
    const [formData, setFormData] = useState({
        title: "",
        address: "",
        photos: [],
        description: "",
        perks: [],
        extraInfo: "",
        checkIn: "",
        checkOut: "",
        maxGuests: "",
    })

    const navigate = useNavigate();

    //Form data change handler
    const handleInputChange = (e) => {
        const { name, value } = e.target

        setFormData((prev) => ({
            ...prev,
            [name]: value,

        }))

    }

    //Form data submit handler
    const handleSubmit = async (e) => {
        e.preventDefault();
        await axios.post('/places', { formData })
        navigate('/account/places')
    }

    //Add images by link handler
    const addPhotoByLink = async (e) => {
        e.preventDefault();
        if (photoLink == '') {
            return alert("Add valid image url!")
        }
        const { data: filename } = await axios.post('/upload-by-link', { link: photoLink })
        setAddedPhotos((prev) => ([...prev, filename]))
        setPhotoLink('')
    }

    //Add images by button handler
    const uploadPhotoByButton = (e) => {
        e.preventDefault();
        const files = e.target.files
        // console.log("Selected file==>", files)

        const data = new FormData();

        for (let i = 0; i < files.length; i++) {
            data.append('photos', files[i]);
        }

        axios.post('/upload-by-button', data, {
            headers: { 'Content-type': 'multipart/form-data' }
        }).then((response) => {
            const { data: filename } = response;
            setAddedPhotos((prev) => ([...prev, ...filename]))
        })


    }

    //Handle checkbox
    const handleCheckbox = (e) => {
        const { checked, name } = e.target
        if (checked) {
            setAddPerks((prev) => ([...prev, name]))
        } else {
            setAddPerks((prev) => ([...prev.filter(item => item !== name)]))
        }

    }

    //State synchronization, manage formsData==>photos state
    useEffect(() => {
        setFormData((prev) => ({
            ...prev,
            photos: addedPhotos,
            perks: addPerks,
        }))


    }, [addedPhotos, addPerks])



    return (
        <div>
            {action !== 'new' &&
                <div className='flex justify-center items-center mx-auto max-w-[350px]'>
                    <Link to='/account/places/new' className='flex justify-center py-2 px-4 gap-2 text-white text-[16px] font-medium rounded-full mt-8 items-center bg-primary'>
                        <MdAddCircleOutline /> Add new place</Link>
                </div>

            }
            {action === 'new' &&
                <div className='m-8'>
                    <h1 className='text-2xl font-semibold text-gray-600 text-center my-6'>Add a new Place</h1>
                    <Flex direction="column" align="center" p={4} className='border border-gray-300 rounded-md mx-auto w-[770px]'>
                        <form onSubmit={handleSubmit}>
                            <FormControl>
                                <FormLabel>Title</FormLabel>
                                <p className='text-[14px] text-gray-600 my-2'>Title for your place should be short and catchy as in advertisement</p>
                                <Input
                                    onChange={handleInputChange}
                                    name="title"
                                    value={formData.title}
                                    type="text"
                                    required
                                    placeholder="Title, for example; My Luxury Appartment" />
                            </FormControl>

                            <FormControl mt={4}>
                                <FormLabel>Address</FormLabel>
                                <p className='text-[14px] text-gray-600 my-2'>Address of your appartment</p>
                                <Input
                                    onChange={handleInputChange}
                                    name="address"
                                    value={formData.address}
                                    type="text"
                                    required
                                    placeholder="Enter address" />
                            </FormControl>

                            <FormControl mt={4}>
                                <FormLabel>Photos</FormLabel>
                                <Flex>
                                    <Input
                                        onChange={(e) => setPhotoLink(e.target.value)}
                                        name="photoLink"
                                        value={photoLink}
                                        type="text"

                                        placeholder="paste your link here" />
                                    <Button onClick={addPhotoByLink} colorScheme="teal" ml={6}>
                                        Add
                                    </Button>
                                </Flex>

                            </FormControl>

                            <FormControl mt={4} className='grid grid-cols-3 gap-2 md:grid-cols-4 lg:grid-cols-6'>
                                {addedPhotos.length > 0 && addedPhotos.map((image) => (
                                    <div className='flex h-32' key={image}>
                                        <img src={`http://localhost:8000/uploads/${image}`} alt="image"
                                            className='rounded-2xl w-full object-cover'
                                        />

                                    </div>
                                ))}

                                <label className='flex gap-1 justify-center items-center border border-gray-300 bg-transparent rounded-2xl cursor-pointer'>
                                    <input multiple type="file" className='hidden' onChange={uploadPhotoByButton} />
                                    <BiCloudUpload size={25} /> Upload
                                </label>
                            </FormControl>




                            <FormControl mt={4}>
                                <FormLabel>Description</FormLabel>
                                <p className='text-[14px] text-gray-600 my-2'>Detail description of your place</p>
                                <Textarea
                                    onChange={handleInputChange}
                                    name="description"
                                    value={formData.description}
                                    required
                                    placeholder="Enter description" />
                            </FormControl>

                            <FormControl mt={4}>
                                <FormLabel>Perks</FormLabel>
                                <p className='text-[14px] text-gray-600 my-2'>Select perks of your place</p>
                                <div className='grid gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-6'>

                                    <label className='flex border gap-4 p-4 items-center cursor-pointer rounded-md'>
                                        <Checkbox name='wifi' onChange={handleCheckbox}> Wifi</Checkbox>
                                        <AiOutlineWifi size={22} />
                                    </label>

                                    <label className='flex border gap-4 p-4 items-center cursor-pointer rounded-md'>
                                        <Checkbox name='freeParking' onChange={handleCheckbox}>Free Parking</Checkbox>
                                        <AiFillCar size={22} />
                                    </label>

                                    <label className='flex border gap-4 p-4 item-center cursor-pointer rounded-md'>
                                        <Checkbox name='petsAllowed' onChange={handleCheckbox}>Pets allowed</Checkbox>
                                        <MdPets size={22} />
                                    </label>

                                    <label className='flex border gap-4 p-4 items-center cursor-pointer rounded-md'>
                                        <Checkbox name='tv' onChange={handleCheckbox}>TV</Checkbox>
                                        <PiTelevisionLight size={22} />
                                    </label >

                                    <label className='flex border gap-4 p-4 items-center cursor-pointer rounded-md'>
                                        <Checkbox name='privateEntrance' onChange={handleCheckbox}>Private Entrance</Checkbox>
                                        <GiOpenGate size={22} />
                                    </label>

                                    <label className='flex border gap-4 p-4 items-center cursor-pointer rounded-md'>
                                        <Checkbox name='kitchen' onChange={handleCheckbox}>Kitchen</Checkbox>
                                        <FaKitchenSet size={22} />
                                    </label>

                                    <label className='flex border gap-4 p-4 items-center cursor-pointer rounded-md'>
                                        <Checkbox name='washer' onChange={handleCheckbox}>Washer</Checkbox>
                                        <BiSolidWasher size={22} />
                                    </label>

                                    <label className='flex border gap-4 p-4 items-center cursor-pointer rounded-md'>
                                        <Checkbox name='longTermStayAllowed' onChange={handleCheckbox}>Long term stay allowed</Checkbox>
                                        <TbCalendarPlus size={22} />
                                    </label>
                                </div>
                            </FormControl>

                            <FormControl mt={4}>
                                <FormLabel>Extra Info</FormLabel>
                                <Textarea
                                    onChange={handleInputChange}
                                    name="extraInfo"
                                    value={formData.extraInfo}
                                    required
                                    placeholder="Enter extra info" />
                            </FormControl>

                            <FormControl mt={4}>
                                <FormLabel>Check In</FormLabel>
                                <p className='text-[14px] text-gray-600 my-2'>Add available check in time</p>
                                <Flex align="center">
                                    <Box as={BsClock} fontSize="xl" color="gray.400" />
                                    <Input
                                        onChange={handleInputChange}
                                        name='checkIn'
                                        value={formData.checkIn}
                                        required
                                        type="date" ml={2} />
                                </Flex>
                            </FormControl>

                            <FormControl mt={4}>
                                <FormLabel>Check Out</FormLabel>
                                <p className='text-[14px] text-gray-600 my-2'>Add available check out time</p>

                                <Flex align="center">
                                    <Box as={BsCalendar} fontSize="xl" color="gray.400" />
                                    <Input
                                        onChange={handleInputChange}
                                        name="checkOut"
                                        value={formData.checkOut}
                                        required
                                        type="date" ml={2} />
                                </Flex>
                            </FormControl>

                            <FormControl mt={4}>
                                <FormLabel>Max Guests</FormLabel>
                                <p className='text-[14px] text-gray-600 my-2'>Max number of guests allowed</p>

                                <Flex align="center">
                                    <Box as={BsPeople} fontSize="xl" color="gray.400" />
                                    <Input
                                        onChange={handleInputChange}
                                        name="maxGuests"
                                        value={formData.maxGuests}
                                        required
                                        type="text" ml={2} />

                                    {/* <NumberInput
                                        onChange={handleInputChange}
                                        name="maxGuests"
                                        value={formData.maxGuests}
                                        ml={2} defaultValue={1} min={1}
                                        >
                                        <NumberInputField />
                                        <NumberInputStepper>
                                            <NumberIncrementStepper />
                                            <NumberDecrementStepper />
                                        </NumberInputStepper>
                                    </NumberInput> */}
                                </Flex>
                            </FormControl>

                            <Button type='submit' colorScheme="teal" mt={8} w="full">
                                Submit
                            </Button>
                        </form>
                    </Flex>
                </div>
            }

        </div>
    )
}

export default Places
