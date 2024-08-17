"use client";
import { useState, useEffect } from 'react';
import axios from 'axios';
import FilterPanel from "@/components/FilterPanel";
import ProductCard from "@/components/ProductCard";
import { PiListMagnifyingGlassFill } from "react-icons/pi";
import { FaSearch } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";
import { toast } from 'react-hot-toast'
import "./home.css";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filterVisible, setFilterVisible] = useState(true);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("");

  const [filters, setFilters] = useState({
    category: [],
    price: 1000,
    rating: []
  });

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

  useEffect(() => {
    applyFilters();
  }, [filters]);

  const applyFilters = () => {
    let curr_filtered = products;

    // Filter by Category
    if (filters.category.length > 0) {
      curr_filtered = curr_filtered.filter(product =>
        filters.category.includes(product.category.toLowerCase())
      );
    }

    // Filter by Price Range
    curr_filtered = curr_filtered.filter(product => product.price <= filters.price);

    // Filter by Ratings
    if (filters.rating.length > 0) {
      curr_filtered = curr_filtered.filter(product =>
        filters.rating.includes(Math.floor(product.rating.rate).toString())
      );
    }


    setFilteredProducts(curr_filtered);
  };

  const clearSearch = () => {
    setSearchQuery('');
    setFilteredProducts(products);
  };

  const handleAddToCart = (product) => {
    // Get the current cart from localStorage or initialize an empty array if not present
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Add the full product object to the cart array
    cart.push(product);

    // Save the updated cart array back to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));

    // Notify the user
    toast.success(
      "Product added to cart 🛒",
      {
        duration: 4000
      }
    );
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
          filterVisible && (
            <FilterPanel
              filters={filters}
              setFilters={setFilters}
              filterVisible={filterVisible}
              setFilterVisible={setFilterVisible}
            />
          )
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
