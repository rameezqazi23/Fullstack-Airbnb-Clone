import { FormControl, FormLabel, Input, useFormControl } from '@chakra-ui/react';
import React, { useState } from 'react'

const Test = () => {
    const [formData, setFormData] = useState({
        title: "",
        address: "",
        description: "",
        extraInfo: "",

    });



    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }))
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Test Form Data==>", formData)
    }

    return (
        <div>
            {/* <form onSubmit={handleSubmit}>
                <input name='title' value={formData.title} onChange={handleInputChange} type="text" placeholder='write main title' />
                <input name='address' value={formData.address} onChange={handleInputChange} type="text" placeholder='write main title' />
                <input name='description' value={formData.description} onChange={handleInputChange} type="text" placeholder='write main title' />
                <input name='extraInfo' value={formData.extraInfo} onChange={handleInputChange} type="text" placeholder='write main title' />

                <button type='submit'>Submit</button>
            </form> */}

            <form onSubmit={handleSubmit}>

                <FormControl>
                    <FormLabel>Title</FormLabel>
                    <p className='text-[14px] text-gray-600 my-2'>Title for your place should be short and catchy as in advertisement</p>
                    <Input
                        onChange={handleInputChange}
                        name='title'
                        value={formData.title}
                        type="text"
                        placeholder="Title, for example; My Luxury Appartment" />

                    <button type='submit'>submit</button>
                </FormControl>

            </form>
        </div>
    )
}

export default Test
