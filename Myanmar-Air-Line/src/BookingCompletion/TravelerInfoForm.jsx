import React from 'react';
import { API_BASE_URL } from "../Functions/backendurl.js";

function TravelerInfoForm({passengerNumber,flightType,travelClass,flightId,multiplePassenger,checkSavePassengerInfo,toggleConfirmButton}) {
    const [formData, setFormData] = React.useState({
        flight_id: flightId,
        travelClass: travelClass,
        title: '',
        firstName: '',
        middleName: '',
        lastName: '',
        passportNumber: '',
        national_id_number: ''
    });
    function handleChange(event) {
        const { name, value } = event.target;
        const upperCase=value.toUpperCase();
        setFormData(prevData => ({
            ...prevData,
            [name]: upperCase
        }));
    }
    async function handleSubmit(event) {
        event.preventDefault();
        if(formData.title==='' || formData.firstName==='' || formData.lastName===''){
            alert("Please fill all the required fields.");
            return;
        }
        await fetch(`${API_BASE_URL}/saveTravelerInfo`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });
        checkSavePassengerInfo(passengerNumber-1);
        toggleConfirmButton();
    }
    return (
        <div className='border border-gray-300 rounded-xl w-2/3 p-3 shadow-md/20 '>
        <h1 className='text-xl text-blue-400 font-semibold py-2'>Passenger {multiplePassenger ? passengerNumber : ''}</h1>
        <hr className='bg-gray-400 border-gray-400' />
        <h1 className='text-blue-400 font-semibold py-2'>Personal Information</h1>

        <form>
            <div  className='p-2 grid grid-cols-2 w-full gap-4'>     
            <div className='flex flex-col'>
                <label htmlFor="title" className='text-sm font-semibold text-gray-500 italic'>Title</label>
                <select name="title" value={formData.title} onChange={handleChange}required className='bg-gray-100 border border-gray-300 rounded-md py-1 h-12 text-lg '>              
                    <option value="" className=' rounded-md' disabled>Select Title</option>
                    <option value="MR" className=' rounded-md'>MR</option>
                    <option value="MRS" className=' rounded-md'>MRS</option>
                    <option value="MISS" className=' rounded-md'>MISS</option>
                    <option value="DR" className=' rounded-md'>DR</option>
                </select>
            </div>
            <div className='flex flex-col'>
                <label htmlFor="firstName" className='text-sm font-semibold text-gray-500 italic'>First Name</label>
            <input type="text" name="firstName"  onChange={handleChange} value={formData.firstName} placeholder='First Name' required className='bg-gray-100 border border-gray-300 rounded-lg p-2  h-12 text-lg'/>
            </div>
            <div className='flex flex-col'>
                <label htmlFor="middleName" className='text-sm font-semibold text-gray-500 italic'>Middle Name</label>
                <input type="text" name="middleName"  onChange={handleChange} value={formData.middleName} placeholder='Middle Name' className='bg-gray-100 border border-gray-300 rounded-lg p-2 h-12 text-lg'/>
            </div>
            <div className='flex flex-col'>
                <label htmlFor="lastName" className='text-sm font-semibold text-gray-500 italic'>Last Name</label>
                <input type="text" name="lastName"  onChange={handleChange} value={formData.lastName} placeholder='Last Name' required className='bg-gray-100 border border-gray-300 rounded-lg p-2  h-12 text-lg'/>
            </div>
            <div className={`flex flex-col ${flightType==="Foreign"?"":"hidden"}`}>
                <label htmlFor="passportNumber" className='text-sm font-semibold text-gray-500 italic'>Passport Number</label>
                <input type="text" name="passportNumber"  onChange={handleChange} value={formData.passportNumber} placeholder='Passport Number' required className='bg-gray-100 border border-gray-300 rounded-lg p-2  h-12 text-lg'/>
            </div>
            <div className={`flex flex-col ${flightType==="Foreign"?"hidden":""}`}>
                <label htmlFor="national_id_number" className='text-sm font-semibold text-gray-500 italic'>National ID Number</label>
                <input type="text" name="national_id_number"  onChange={handleChange} value={formData.national_id_number} placeholder='National ID Number' required className='bg-gray-100 border border-gray-300 rounded-lg p-2  h-12 text-lg'/>
            </div>
           </div> 
           <button type="submit" onClick={handleSubmit} className='mx-2 mt-4 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-500'>Save Passenger Info</button>  
        </form>
        </div>
    );
}
export default TravelerInfoForm;