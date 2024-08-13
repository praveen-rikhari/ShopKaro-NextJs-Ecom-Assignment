"use client"
import { useState, useEffect } from 'react';
import axios from 'axios';
import FilterPanel from "@/components/FilterPanel";
import ProductCard from "@/components/ProductCard";
import "./home.css";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('https://fakestoreapi.com/products');
        console.log(response);
        setProducts(response.data);
      } catch (error) {
        setError('Failed to load products');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleAddToCart = (product) => {
    console.log('Added to cart:', product);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <>
      <main className="main-content">
        <FilterPanel />
        <div className="product-list">
          {
            products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={handleAddToCart}
              />
            ))
          }
        </div>
      </main>
    </>
  );
};
