import { useState } from 'react'
import { MdAddCircleOutline } from 'react-icons/md';
import { Link, useParams } from 'react-router-dom';


import { Input, FormControl, FormLabel, Select, Textarea, NumberInput, NumberInputField, Button, Flex, Box, Image } from '@chakra-ui/react';
import { IoLocationOutline } from 'react-icons/io5';
import { BsImages, BsCardText, BsClock, BsCalendar, BsPeople } from 'react-icons/bs';

const Places = () => {
    const { action } = useParams();
    console.log(action)


    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedFile(file);

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


    return (
        <div>
            {action !== 'new' &&
                <div className='flex justify-center items-center mx-auto max-w-[350px]'>
                    <Link to='/account/places/new' className='flex justify-center py-2 px-4 gap-2 text-white text-[16px] font-medium rounded-full mt-8 items-center bg-primary'> <MdAddCircleOutline /> Add new place</Link>
                </div>

            }
            {action === 'new' &&
                <div className='mt-8'>
                    <h1 className='text-2xl font-semibold text-gray-600 text-center'>Add a new Place</h1>
                    <Flex direction="column" align="center" p={4}>
                        <Box maxW="md" w="full">
                            <FormControl>
                                <FormLabel>Title</FormLabel>
                                <Input type="text" placeholder="Enter title" />
                            </FormControl>

                            <FormControl mt={4}>
                                <FormLabel>Address</FormLabel>
                                <Input type="text" placeholder="Enter address" />
                            </FormControl>

                            {/* image select */}
                            <FormControl mt={4}>
                                <FormLabel>Image</FormLabel>
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
                                        id="file-input"
                                        display="none"
                                        onChange={handleFileChange}
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
                                <Textarea placeholder="Enter description" />
                            </FormControl>

                            <FormControl mt={4}>
                                <FormLabel>Perks</FormLabel>
                                <Input type="text" placeholder="Enter perks" />
                            </FormControl>

                            <FormControl mt={4}>
                                <FormLabel>Extra Info</FormLabel>
                                <Textarea placeholder="Enter extra info" />
                            </FormControl>

                            <FormControl mt={4}>
                                <FormLabel>Check In</FormLabel>
                                <Flex align="center">
                                    <Box as={BsClock} fontSize="xl" color="gray.400" />
                                    <Input type="date" ml={2} />
                                </Flex>
                            </FormControl>

                            <FormControl mt={4}>
                                <FormLabel>Check Out</FormLabel>
                                <Flex align="center">
                                    <Box as={BsCalendar} fontSize="xl" color="gray.400" />
                                    <Input type="date" ml={2} />
                                </Flex>
                            </FormControl>

                            <FormControl mt={4}>
                                <FormLabel>Max Guests</FormLabel>
                                <Flex align="center">
                                    <Box as={BsPeople} fontSize="xl" color="gray.400" />
                                    <NumberInput ml={2} defaultValue={1} min={1}>
                                        <NumberInputField />
                                    </NumberInput>
                                </Flex>
                            </FormControl>

                            <Button colorScheme="teal" mt={8} w="full">
                                Submit
                            </Button>
                        </Box>
                    </Flex>
                </div>
            }

        </div>
    )
}

export default Places
