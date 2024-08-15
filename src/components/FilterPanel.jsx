const FilterPanel = ({ filters, setFilters }) => {

    const handleCategoryChange = (e) => {
        const value = e.target.value;

        setFilters(allFilters => {
            if (allFilters.category.includes(value)) {
                return {
                    ...allFilters,
                    category: allFilters.category.filter(cat => cat !== value)
                };
            } else {
                return {
                    ...allFilters,
                    category: [...allFilters.category, value]
                };
            }
        });
    };

    const handleRatingChange = (e) => {
        const value = e.target.value;

        setFilters(allFilters => {
            if (allFilters.rating.includes(value)) {
                return {
                    ...allFilters,
                    rating: allFilters.rating.filter(rate => rate !== value)
                };
            } else {
                return {
                    ...allFilters,
                    rating: [...allFilters.rating, value]
                };
            }
        })
    }

    const handlePriceChange = (e) => {
        setFilters(allFilters => ({
            ...allFilters,
            price: e.target.value
        }));
    };

    const clearFilters = () => {
        setFilters({
            category: [],
            price: 1000,
            rating: []
        });
    };

    return (
        <div className="filter-panel">
            <h3>Filters</h3>

            <div className="filter-section">
                <h4>Category</h4>
                <label>
                    <input
                        type="checkbox"
                        name="category"
                        value="electronics"
                        checked={filters.category.includes('electronics')}
                        onChange={handleCategoryChange}
                    />
                    Electronics
                </label>
                <label>
                    <input
                        type="checkbox"
                        name="category"
                        value="jewelery"
                        checked={filters.category.includes('jewelery')}
                        onChange={handleCategoryChange}
                    />
                    Jewelery
                </label>
                <label>
                    <input
                        type="checkbox"
                        name="category"
                        value="men's clothing"
                        checked={filters.category.includes("men's clothing")}
                        onChange={handleCategoryChange}
                    />
                    Men&apos;s Clothing
                </label>
                <label>
                    <input
                        type="checkbox"
                        name="category"
                        value="women's clothing"
                        checked={filters.category.includes("women's clothing")}
                        onChange={handleCategoryChange}
                    />
                    Women&apos;s Clothing
                </label>
                <hr />
            </div>

            <div className="filter-section">
                <h4>Price Range</h4>
                <input
                    type="range"
                    min="1"
                    max="1000"
                    step="1"
                    value={filters.price}
                    onChange={handlePriceChange}
                />
                <div>Up to ${filters.price}</div>
                <hr />
            </div>

            <div className="filter-section">
                <h4>Ratings</h4>
                <label>
                    <input
                        type="checkbox"
                        name="rating"
                        value="1"
                        checked={filters.rating.includes('1')}
                        onChange={handleRatingChange}
                    />
                    1 Star & Up
                </label>
                <label>
                    <input
                        type="checkbox"
                        name="rating"
                        value="2"
                        checked={filters.rating.includes('2')}
                        onChange={handleRatingChange}
                    />
                    2 Stars & Up
                </label>
                <label>
                    <input
                        type="checkbox"
                        name="rating"
                        value="3"
                        checked={filters.rating.includes('3')}
                        onChange={handleRatingChange}
                    />
                    3 Stars & Up
                </label>
                <label>
                    <input
                        type="checkbox"
                        name="rating"
                        value="4"
                        checked={filters.rating.includes('4')}
                        onChange={handleRatingChange}
                    />
                    4 Stars & Up
                </label>
                <hr />
            </div>

            <button onClick={clearFilters}>Clear Filters</button>
        </div>
    );
};

export default FilterPanel;
