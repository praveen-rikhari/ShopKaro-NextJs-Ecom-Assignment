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

  const clearSearch = () => {
    setSearchQuery('');
    setFilteredProducts(products);
  }

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

    // Sorting A-Z & Z-A
    if (option === "az") {
        sortedProducts.sort((pro1, pro2) => pro1.title.localeCompare(pro2.title));
    } 
    else if (option === "za") {
        sortedProducts.sort((pro1, pro2) => pro2.title.localeCompare(pro1.title));
    } 
    
    // Sorting by Price Low to High & High to Low 
    else if (option === "lth") {
        sortedProducts.sort((pro1, pro2) => pro1.price - pro2.price);
    } 
    else if (option === "htl") {
        sortedProducts.sort((pro1, pro2) => pro2.price - pro1.price);
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
          {
            searchQuery && (
              <FaXmark
                size={25}
                className="icon"
                onClick={clearSearch}
                style={{ cursor: 'pointer' }}
              />
            )
          }
        </div>

        <div className="sort-dropdown">
          <select value={sortOption} onChange={handleSortChange}>
            <option value="">Sort by</option>
            <option value="az">A-Z</option>
            <option value="za">Z-A</option>
            <option value="lth">Price: Low to High</option>
            <option value="htl">Price: High to Low</option>
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
              filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onAddToCart={handleAddToCart}
                  />
                ))
              ) : (
                <h1>No products found</h1>
              )
            )
          }
        </div>
      </main>
    </>
  );
}
