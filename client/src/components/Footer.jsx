import React from 'react'

function Footer() {
  return (
   <>
   <div className='flex flex-col justify-center items-center gap-2 bg-amber-900 text-white p-2'>
    <p>&copy; 2025 FurGetNot</p>
    <ul className='flex flex-row justify-center items-center  gap-8 text-sm md:text-[16px] text-gray-400 '>
        <li><i className="fa-solid fa-address-book "></i>Support/Contact</li>
        <li><i className="fa-brands fa-instagram"></i>Instagram</li>
        <li><i className="fa-solid fa-envelope"></i> Email</li>
    </ul>
    <p className='text-xm md:text-[15px] text-gray-400'>This site is developed and maintaned by Wobblelab</p>
   </div>
   </>
  )
}
export default Footer