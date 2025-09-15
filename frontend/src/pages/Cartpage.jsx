import React, { useEffect, useState } from 'react'
import Header from '../components/header'
// import product from '../../../backend/model/product'

const CartPage = () => {
    const [productCArt,setProducrCart]=useState([])
    console.log(productCArt)
    useEffect(()=>{
        const getData=JSON.parse(localStorage.getItem("readData"))
        setProducrCart(getData)
        const update=getData.map(item => ({
            ...item, quantity : 1, maxQuantity : item.quantity
        }))
        setProducrCart(update)
    },[])
   

    const totalPrice=productCArt.reduce((add ,item) =>add +(Number(item.price * item.quantity)),0)

    const handleDeleteItem=(id)=>{
        const removeItem=productCArt.filter((items)=> items._id !== id)
        localStorage.setItem("readData", JSON.stringify(removeItem))
        setProducrCart(removeItem)
    }
    const HandleIncrement=(id)=>{
        setProducrCart(prd => prd.map(
            item => item._id === id ? {...item,quantity: item.quantity < item.maxQuantity ? item.quantity +1 : item.maxQuantity}: item
        ))
    }
      const HandleDecrement=(id)=>{
        setProducrCart(prd => prd.map(
            
            item => item._id === id  ? {...item,quantity  : item.quantity > 1 ? item.quantity -1 : item.quantity}: item
        ))
    }

  return (
    <div>
        <div><Header /></div>
        <div>
            <h1 className='pl-20 text-3xl font-bold mt-4 underline underline-offset-4 decoration-orange-600'>Shping Cart</h1>
        </div>
        <div className='px-20  py-10 flex space-x-10 mt-10 shadow-2xl mx-4 rounded-lg'>
            <div>

            <table>
                <thead>
                    <tr className='text-left'>
                        <th className='pr-24'>Product Details</th>
                        <th className='pr-24'>Price</th>
                        <th className='pr-24'>Quantity</th>
                        <th className='pr-24'>Total</th>
                    </tr>
                </thead>
                {productCArt.length <1? <h1>Notfound data</h1>:
                    productCArt.map((items)=>{
                        return(<>
                            <tbody>
                                <tr className=''>
                                    <td className='pr-24'>
                                        <div className='flex space-x-4'>
                                            <div>
                                                <img className='w-[110px] rounded-lg' src={`http://localhost:7000/AlImages/${items.prImg}`} alt="" />
                                            </div>
                                            <div className='space-y-1 font-bold'> 
                                                <h1 className='truncate w-[150px] font-bold'>{items.name}</h1>
                                                <h1>{items.desc}</h1>
                                                <h onClick={()=> handleDeleteItem (items._id)} className='text-red-500'>Remove</h>
                                            </div>
                                        </div>
                                    </td>
                                    <td className='pr-24'>
                                        <div className='flex space-x-2'>
                                            <button  onClick={()=> HandleDecrement(items._id)} className='bg-gray-200 px-2 rounded-sm '>-</button>
                                            <h1>{items.quantity}</h1>
                                            <button onClick={()=> HandleIncrement(items._id)} className='bg-gray-200 px-2 rounded-sm '>+</button>
                                        </div>
                                    </td>
                                    <td className='pr-24'>${items.price }</td>
                                    <td className='pr-24'>${items.price * items.quantity}</td>
                                </tr>
                            </tbody>
                        
                        
                        </>)
                    })
                }
            </table>
            </div>

            <div className='shadow-2xl w-[400px] px-4 space-y-5 py-4'>
            <h1 className=' text-3xl font-bold mt-4 underline underline-offset-4 decoration-orange-600'>Other Sumery</h1>
            <div className='flex justify-between text-xl text-gray-500 '><h1>ITEMS</h1><h1>{productCArt.length}</h1></div>
            <h1 className='text-gray-500 text-xl'>SHIPING</h1>
            <select className='border-2 border-black w-full ' name="" id="">
                <option value="">GOOGLE</option>
            </select>
            <h1 className='text-gray-500 text-xl'>PROMO CODE</h1>
            <div className='flex space-x-3'>
            <input type="text" className='border-2 pl-2 border-black w-full' placeholder='Enter Code' />
            <button className='bg-red-500 py-2 px-2'>APPLY</button>
            </div>
            <hr className='border-black' />
            <div className='flex justify-between'>
            <h1 className='text-black-500 font-bold text-xl'>TOTAL COST</h1>
            <h1 className='text-black-500 font-bold text-xl'>${totalPrice}</h1>

            </div>
            <button className='bg-purple-700 w-full text-white py-2'>CHECKOUT</button>

            </div>
        </div>
      
    </div>
  )
}

export default CartPage
