import React, { useState, useEffect } from "react";
import Header from "../components/header";
import { FaCheck } from "react-icons/fa";

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState(
    JSON.parse(localStorage.getItem("readData")) || []
  );

  const handleLocalStore = (data) => {
    const newData = [...cartItems];
    const existId = newData.some((item) => item._id === data._id);

    if (!existId) {
      newData.push(data);
      localStorage.setItem("readData", JSON.stringify(newData));
      setCartItems(newData); // update state live
    }
  };

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

      <div className="px-20">
        <div className="flex gap-3 flex-wrap">
          {products.map((items) => {
            const isInCart = cartItems.some((p) => p._id === items._id);

            return (
              <div
                key={items._id}
                className="mt-16 grid border p-4 rounded-lg shadow-lg w-60"
              >
                <img
                  className="rounded-xl"
                  src={`http://localhost:7000/AlImages/${items.prImg}`}
                  alt={items.name}
                />
                
                <h1>{items.name}</h1>
                <h1>
                  <span>{items.status}</span>
                  <span>{items.quantity}</span>
                </h1>
                <div>
                  <h1>
                    <span>{items.price}$</span>
                    <span className="line-through text-gray-300">344$</span>
                  </h1>

                  <button
                    onClick={() => handleLocalStore(items)}
                    className={`px-4 py-2 rounded-lg font-semibold transition ${
                      isInCart
                        ? "bg-blue-600 text-white flex items-center gap-2"
                        : "bg-gray-200 hover:bg-gray-300"
                    }`}
                  >
                    {isInCart ? (
                      <>
                        <FaCheck /> Added
                      </>
                    ) : (
                      "Add To Cart"
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Shop;
