"use client";
import { useState, useEffect } from 'react';
import axios from 'axios';
import FilterPanel from "@/components/FilterPanel";
import ProductCard from "@/components/ProductCard";
import { PiListMagnifyingGlassFill } from "react-icons/pi";
import { FaSearch } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";
import "./home.css";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filterVisible, setFilterVisible] = useState(true);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('https://fakestoreapi.com/products');
        console.log(response);
        setProducts(response.data);
        setFilteredProducts(response.data);
      } catch (error) {
        setError('Failed to load products.........');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleAddToCart = (product) => {
    console.log('Added to cart:', product);
  };

  const toggleFilterVisibility = () => {
    setFilterVisible(!filterVisible);
  };

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    const filtered = products.filter((product) =>
      product.title.toLowerCase().includes(query)
    );

    setFilteredProducts(filtered);
  };

  const handleSortChange = (e) => {
    const option = e.target.value;
    setSortOption(option);

    let sortedProducts = [...filteredProducts];

    if (option === "az") {
      sortedProducts.sort((a, b) => a.title.localeCompare(b.title));
    }
    else if (option === "za") {
      sortedProducts.sort((a, b) => b.title.localeCompare(a.title));
    }

    setFilteredProducts(sortedProducts);
  };

  return (
    <>
      <div className="controls">
        <div className="filter-button">
          <button onClick={toggleFilterVisibility}>
            <PiListMagnifyingGlassFill size={30} className="icon" />
            {
              filterVisible ? "Hide Filters" : "Show Filters"
            }
          </button>
        </div>

        <div className="search-box">
          <FaSearch size={25} className="icon" />
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={handleSearch}
          />
        </div>

        <div className="sort-dropdown">
          <select value={sortOption} onChange={handleSortChange}>
            <option value="">Sort by</option>
            <option value="az">A-Z</option>
            <option value="za">Z-A</option>
          </select>
        </div>
      </div>




      <main className={`main-content ${!filterVisible ? 'no-filter-panel' : ''}`}>
        {
          filterVisible && <FilterPanel />
        }
        <div className="product-list">
          {
            loading ? (
              <p className="spinner"></p>
            ) : error ? (
              <p>{error}</p>
            ) : (
              filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={handleAddToCart}
                />
              ))
            )
          }
        </div>
      </main>
    </>
  );
}
