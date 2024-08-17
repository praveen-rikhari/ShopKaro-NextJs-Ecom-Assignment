"use client";
import { useState, useEffect } from 'react';
import { FaStar } from 'react-icons/fa';
import { MdRemoveShoppingCart } from "react-icons/md";
import "./Cart.css";
import toast from 'react-hot-toast';
import Image from 'next/image';

export default function Cart() {
  const [cart, setCart] = useState([]);
  const [showDiscountInfo, setShowDiscountInfo] = useState(false);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartWithQuantities = storedCart.map(product => ({
      ...product,
      quantity: product.quantity || 1
    }));

    setCart(cartWithQuantities);
  }, []);

  const updateQuantity = (productId, delta) => {
    const updatedCart = cart.map(product => {
      if (product.id === productId) {
        const newQuantity = Math.max(1, (product.quantity || 1) + delta);
        return { ...product, quantity: newQuantity };
      }
      return product;
    });

    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const removeFromCart = (productId) => {
    const updatedCart = cart.filter(item => item.id !== productId);
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));

    toast.success("Product removed from cart.", {
      duration: '3000'
    })
  };

  const calculateTotalPrice = () => {
    return cart.reduce((total, product) => {
      const price = parseFloat(product.price);
      const quantity = parseInt(product.quantity);
      return total + price * quantity;
    }, 0);
  };

  const calculateDiscount = (subtotal) => {
    if (subtotal > 1000) {
      return 0.4 * subtotal;
    }
    else if (subtotal > 500) {
      return 0.25 * subtotal;
    }
    else if (subtotal > 200) {
      return 0.1 * subtotal;
    }
    else {
      return 0;
    }
  };

  const subtotal = calculateTotalPrice();
  const discount = calculateDiscount(subtotal);
  const totalAfterDiscount = subtotal - discount;

  return (
    <div className="cart-page">
      <div className="cart-header">
        <h3>
          Shopping Cart
        </h3>
        <h3>
          {cart.length} items
        </h3>
      </div>


      {
        cart.length === 0 ? (
          <center>
            <h2 className="empty-cart">Your cart is empty 😞</h2>
            <Image
              src='/emptycart.png'
              width={600}
              height={500}
              alt='Empty cart'
              className='emptycart-image'
            />
          </center>
        ) : (
          <div className="cart-container">
            {
              cart.map((product) => (
                <div key={product.id} className="cart-product">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="cart-image"
                  />

                  <div className="cart-info">
                    <h5 className="product-title">
                      {product.title.slice(0, 30)}
                    </h5>

                    <div className="rating-box">
                      <FaStar size={20} color="#fcc947" />
                      {product.rating.rate}
                    </div>

                    <div>
                      <button
                        className="remove-btn"
                        onClick={() => removeFromCart(product.id)}
                      >
                        Remove <MdRemoveShoppingCart size={15} />
                      </button>
                    </div>
                  </div>

                  <div className="quantity-controls">
                    <button
                      className="quantity-btn"
                      onClick={() => updateQuantity(product.id, -1)}
                    >
                      -
                    </button>

                    <span className="quantity-display">
                      {product.quantity || 1}
                    </span>

                    <button
                      className="quantity-btn"
                      onClick={() => updateQuantity(product.id, 1)}
                    >
                      +
                    </button>
                  </div>

                  <div className="price">
                    <span className="cart-price">
                      $ {(product.price * (product.quantity || 1)).toFixed(2)}
                    </span>
                  </div>
                </div>
              ))
            }


            <div className="checkout-box">
              <span
                className="terms"
                onClick={() => setShowDiscountInfo(!showDiscountInfo)}
              >
                {showDiscountInfo ? 'Hide' : 'Show'} Discount Info
              </span>

              {
                showDiscountInfo && (
                  <div className="discount-info">
                    <h4>Discount terms & condition:</h4>
                    <ul>
                      <li>
                        10% discount for orders above $ 200.
                      </li>
                      <li>
                        25% discount for orders above $ 500.
                      </li>
                      <li>
                        40% discount for orders above $ 1000.
                      </li>
                    </ul>
                  </div>
                )
              }

              <h3 className="subtotal-price">
                Sub Total: <span>$ {subtotal.toFixed(2)}</span>
              </h3>

              {
                discount > 0 && (
                  <h3 className="discount-price">
                    Discount: <span>-$ {discount.toFixed(2)}</span>
                  </h3>
                )
              }

              <h3 className="total-price">
                Grand Total: <span>$ {totalAfterDiscount.toFixed(2)}</span>
              </h3>

              <button className="checkout-btn">Check out & Pay</button>
            </div>
          </div>
        )
      }
    </div>
  );
}
