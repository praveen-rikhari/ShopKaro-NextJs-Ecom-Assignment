"use client";
import { useState, useEffect } from 'react';
import { FaStar } from 'react-icons/fa';
import "./Cart.css";

export default function page() { // Updated component name
  const [cart, setCart] = useState([]);

  useEffect(() => {
    // Load the cart items from local storage when the component mounts
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(storedCart);
  }, []);

  const removeFromCart = (productId) => {
    // Remove the item from the cart
    const updatedCart = cart.filter((item) => item.id !== productId);
    setCart(updatedCart);

    // Update local storage
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  if (!Array.isArray(cart)) {
    return <p>Error loading cart. Please try again later.</p>;
  }

  return (
    <div className="cart-page">
      <h1 className="cart-title">Your Cart</h1>
      {
        cart.length === 0 ? (
          <p className="empty-cart">Your cart is empty</p>
        ) : (
          <div className="cart-grid">
            {cart.map((product, id) => (
              <div key={id} className="cart-product">
                <img
                  src={product.image}
                  alt={product.title}
                  className="product-image"
                />
                <div className="product-info">
                  <h5 className="product-title">
                    {product.title ? product.title.slice(0, 30) : 'No Title'}
                  </h5>
                  <div className="product-details">
                    <div className="rating-price">
                      <div className="rating-box">
                        <FaStar size={20} color="#fcc947" />
                        {product.rating ? product.rating.rate : 'N/A'}
                      </div>
                      <span className="product-price">
                        $ {product.price || 'N/A'}
                      </span>
                    </div>
                    <button className="remove-btn" onClick={() => removeFromCart(product.id)}>
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )
      }
    </div>
  );
}
