import React from 'react'
import { NavLink } from 'react-router-dom'

const Dash = () => {
  return (
    <>
    <div className='flex'>

    <div className=' w-[300px] pl-20  text-left  space-y-10 h-screen text-2xl font-bold text-white flex flex-col justify-center bg-blue-600'>
        <NavLink to="/dash"><h1><i className=" mr-2 fa-solid fa-house-user"></i>Dashbord</h1></NavLink>
        <NavLink to="/prod"><h1><i className=" mr-2 fa-brands fa-product-hunt"></i>Products</h1></NavLink>
        <NavLink to="/Addpro"><h1><i className=" mr-2 fa-solid fa-plus"></i>Add Products</h1></NavLink>
        <NavLink to="/"><h1><i className=" mr-2 fa-solid fa-user"></i>Customers</h1></NavLink>
        <NavLink to="/"><h1><i className=" mr-2 fa-solid fa-cart-shopping"></i>Add Orders</h1></NavLink>
        <NavLink to="/"><h1><i className=" mr-2 fa-regular fa-note-sticky"></i>Reports</h1></NavLink>
        <NavLink to="/"><h1><i className=" mr-2 fa-solid fa-gear"></i>Setings</h1></NavLink>
       
    </div>
    </div>
    </>
  )
}

export default Dash
