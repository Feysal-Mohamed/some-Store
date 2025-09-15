import React, { useState } from 'react'
import { useEffect } from 'react';
import Header from '../components/header';

const Shop = () => {
      const [products, setProducts] = useState([]);
    
     useEffect(() => {
        fetch("http://localhost:7000/read/product")
          .then((res) => res.json())
          .then((data) => {
            setProducts(data);
          })
          .catch((err) => console.error("Error fetching products:", err));
      }, []);
  return (
    <>
        <Header />

    <div className='px-20'>
         <div className='flex gap-3'>

       
      {
        products.map((items)=>{
          return(<>
          <div className='w-[300px] space-y-4 py-2 px-3 rounded-lg border-2'>
              <img
                className='rounded-xl'
                key={items._id}
                src={`http://localhost:7000/AlImages/${items.prImg}`}
                alt={items.name}
              />
            <h1>{items.name}</h1>
            <h1><span>{items.status}</span><span>{items.quantity}</span></h1>
            <h1><span>{items.price}$</span><span className='line-through text-gray-300'>344$</span></h1>
              <button >Add To Cart</button>
       </div>
            </>)
        })
      }
      </div>
    </div>
    </>
  )
}

export default Shop
