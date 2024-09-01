import React from 'react'

export default function AddEmployee() {
  return (
    <main className='p-3 max-w-4xl mx-auto'>
        <h1 className='text-3xl font-semibold text-center my-7'>Add New Head</h1>
        <form className='flex flex-col sm:flex-row gap-4'>
            <div className='flex flex-col gap-4 flex-1'>
                <input type="text" placeholder='Employee ID' className='border p-3 rounded-lg' id='id' maxLength='5' minLength='4' required></input>
                <input type="text" placeholder='Full Name' className='border p-3 rounded-lg' id='name' maxLength='60' minLength='10' required></input>
                <input type="text" placeholder='Gender' className='border p-3 rounded-lg' id='gender' maxLength='6' minLength='4' required></input>
                <input type="text" placeholder='NIC Number' className='border p-3 rounded-lg' id='nic' maxLength='12' minLength='10' required></input>
                <input type="number" placeholder='Contact Number' className='border p-3 rounded-lg' id='contact' maxLength='10' minLength='10' required></input>
                <input type="email" placeholder='E-Mail' className='border p-3 rounded-lg' id='email' maxLength='10' required></input>
                <textarea type="text" placeholder='Recidential Address' className='border p-3 rounded-lg' id='address' required></textarea>
                <input type="text" placeholder='Job Title' className='border p-3 rounded-lg' id='jobTitle' required></input>
                <input type="text" placeholder='Status' className='border p-3 rounded-lg' id='status' maxLength='9' minLength='9' required></input>
                <input type="text" placeholder='Location' className='border p-3 rounded-lg' id='location' maxLength='6' minLength='6' required></input>
                <input type="number" placeholder='Basic Salary' className='border p-3 rounded-lg' id='basicSalary' required></input>
                <textarea type="text" placeholder='Bank Details' className='border p-3 rounded-lg' id='payrollDetails' required></textarea>
                <input type="number" placeholder='Emergency Contact Number' className='border p-3 rounded-lg' id='emergencyContact' maxLength='10' minLength='10' required></input>
                <textarea type="text" placeholder='Qualifications' className='border p-3 rounded-lg' id='qualifications' ></textarea>
                <textarea type="text" placeholder='Past Experience' className='border p-3 rounded-lg' id='experience' ></textarea>
            </div> 
            <div className='flex flex-col flex-1 gap-4'>
                <p className='font-semibold'>Images:
                <span className='font-normal text-gray-600 ml-2'>The First image will be profile photo (max 3)</span></p>
                <div className='flex gap-4'>
                    <input className='p-3 border border-gray-300 rounded w-full' type='file' id='images' accept='image/*' multiple/>
                    <button className='p-3 text-green-700 border border-green-700 rounded uppercase hover:shadow-lg disabled:opacity-80'>Upload</button>
                </div>
                <button className='p-3 bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>Add New Head</button>  
            </div> 
        </form>
    </main>
  )
}

 