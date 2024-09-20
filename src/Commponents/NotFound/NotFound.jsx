import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function NotFound() {
  const navigate=useNavigate()
  return (
    <div className='container mx-auto  mt-20 flex flex-col justify-center items-center h-80 '>Not Found
    <button className='p-2 text-2xl capitalize bg-gradient-to-l from-red-500 to-orange-500 text-white rounded my-3' onClick={()=>navigate('')}><i class="fa-solid fa-arrow-left"></i> back to home</button>
    </div>
  )
}
