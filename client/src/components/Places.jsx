import { useState } from 'react'
import { MdAddCircleOutline, MdPets } from 'react-icons/md';
import { Link, useParams } from 'react-router-dom';


import { Input, FormControl, FormLabel, Select, Textarea, NumberInput, NumberInputField, Button, Flex, Box, Image, Checkbox, NumberIncrementStepper, NumberInputStepper, NumberDecrementStepper } from '@chakra-ui/react';

//react-icons
import { IoLocationOutline } from 'react-icons/io5';
import { BsImages, BsCardText, BsClock, BsCalendar, BsPeople } from 'react-icons/bs';
import { AiFillCar, AiOutlineWifi } from 'react-icons/ai';
import { PiTelevisionLight } from 'react-icons/pi';
import { GiOpenGate } from 'react-icons/gi';
import { FaKitchenSet } from 'react-icons/fa6';
import { BiSolidWasher } from 'react-icons/bi';
import { TbCalendarPlus } from 'react-icons/tb';

const Places = () => {
    const { action } = useParams();
    console.log(action)

    const [selectedFile, setSelectedFile] = useState(null);
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

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedFile(file);
            setFormData((prev) => ({ ...prev, photos: file }))

            // Use FileReader to read the file and generate a preview
            const reader = new FileReader();
            reader.onload = (event) => {
                // event.target.result contains the data URL for the image
                const imageDataUrl = event.target.result;
                // Do something with the imageDataUrl (e.g., set it in state to display the preview)
            };
            reader.readAsDataURL(file);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target
        const { photos } = e.target.files[0]
        setFormData((prev) => ({
            ...prev,
            [name]: value,
            [photos]: 'photos'

        }))

    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form Data==>", formData)
    }




    return (
        <div>
            {action !== 'new' &&
                <div className='flex justify-center items-center mx-auto max-w-[350px]'>
                    <Link to='/account/places/new' className='flex justify-center py-2 px-4 gap-2 text-white text-[16px] font-medium rounded-full mt-8 items-center bg-primary'> <MdAddCircleOutline /> Add new place</Link>
                </div>

            }
            {action === 'new' &&
                <div className='m-8'>
                    <h1 className='text-2xl font-semibold text-gray-600 text-center my-6'>Add a new Place</h1>
                    <Flex direction="column" align="center" p={4} className='border border-gray-300 rounded-md mx-auto w-[770px]'>
                        <form onSubmit={handleSubmit} maxW="2xl" w="full">
                            <FormControl>
                                <FormLabel>Title</FormLabel>
                                <p className='text-[14px] text-gray-600 my-2'>Title for your place should be short and catchy as in advertisement</p>
                                <Input
                                    onChange={handleInputChange}
                                    name="title"
                                    value={formData.title}
                                    type="text"
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
                                    placeholder="Enter address" />
                            </FormControl>

                            {/* image select */}
                            <FormControl mt={4}>
                                <FormLabel>Photos</FormLabel>
                                <p className='text-[14px] text-gray-600 my-2'>more = better</p>
                                <Flex align="center">
                                    <label htmlFor="file-input" className="cursor-pointer">
                                        <Box
                                            as={BsImages}
                                            fontSize="xl"
                                            color="gray.400"
                                            cursor="pointer"
                                            _hover={{ color: 'teal.500' }}
                                        />
                                    </label>
                                    <Input
                                        type="file"
                                        //onChange={handleFileChange}
                                        onChange={() => { handleFileChange(), handleInputChange() }}
                                        name='photos'
                                        value={formData.photos}
                                        id="file-input"
                                        display="none"
                                        accept="image/*"
                                    />
                                    <Button ml={2} colorScheme="teal" as="span">
                                        Choose File
                                    </Button>
                                </Flex>
                                {/* Display image preview */}
                                {selectedFile && (
                                    <Box mt={2}>
                                        <Image src={URL.createObjectURL(selectedFile)} alt="Preview" boxSize="100px" />
                                    </Box>
                                )}
                            </FormControl>




                            {/* <FormControl mt={4}>
                                <FormLabel>Image</FormLabel>
                                <Flex align="center">
                                    <Box as={BsImages} fontSize="xl" color="gray.400" />
                                    <Input type="file" ml={2} />
                                </Flex>
                            </FormControl> */}

                            <FormControl mt={4}>
                                <FormLabel>Description</FormLabel>
                                <p className='text-[14px] text-gray-600 my-2'>Detail description of your place</p>
                                <Textarea
                                    onChange={handleInputChange}
                                    name="description"
                                    value={formData.description}
                                    placeholder="Enter description" />
                            </FormControl>

                            <FormControl mt={4}>
                                <FormLabel>Perks</FormLabel>
                                <p className='text-[14px] text-gray-600 my-2'>Select perks of your place</p>
                                <div className='grid gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-6'>

                                    <label className='flex border gap-4 p-4 items-center cursor-pointer rounded-md'>
                                        <Checkbox> Wifi</Checkbox>
                                        <AiOutlineWifi size={22} />
                                    </label>

                                    <label className='flex border gap-4 p-4 items-center cursor-pointer rounded-md'>
                                        <Checkbox>Free Parking</Checkbox>
                                        <AiFillCar size={22} />
                                    </label>

                                    <label className='flex border gap-4 p-4 item-center cursor-pointer rounded-md'>
                                        <Checkbox>Pets allowed</Checkbox>
                                        <MdPets size={22} />
                                    </label>

                                    <label className='flex border gap-4 p-4 items-center cursor-pointer rounded-md'>
                                        <Checkbox>TV</Checkbox>
                                        <PiTelevisionLight size={22} />
                                    </label >

                                    <label className='flex border gap-4 p-4 items-center cursor-pointer rounded-md'>
                                        <Checkbox>Private Entrance</Checkbox>
                                        <GiOpenGate size={22} />
                                    </label>

                                    <label className='flex border gap-4 p-4 items-center cursor-pointer rounded-md'>
                                        <Checkbox>Kitchen</Checkbox>
                                        <FaKitchenSet size={22} />
                                    </label>

                                    <label className='flex border gap-4 p-4 items-center cursor-pointer rounded-md'>
                                        <Checkbox>Washer</Checkbox>
                                        <BiSolidWasher size={22} />
                                    </label>

                                    <label className='flex border gap-4 p-4 items-center cursor-pointer rounded-md'>
                                        <Checkbox>Long term stay allowed</Checkbox>
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
