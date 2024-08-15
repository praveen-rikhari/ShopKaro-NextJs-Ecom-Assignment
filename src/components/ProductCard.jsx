import {
    FaCartPlus, FaStar, FaTags
} from "react-icons/fa";

import "./ProductCard.css";

const ProductCard = ({ product, onAddToCart }) => {
    return (
        <div className="product-card">
            <img
                src={product.image}
                alt={product.title}
                className="product-image"
            />

            <h5 className="product-name">
                {product.title.slice(0, 30)}
            </h5>

            <div className="card-mid">
                <div className="rating-box">
                    <FaStar
                        size={20}
                        color="#fcc947"
                    /> {product.rating.rate}
                </div>
                <div className="tag">
                    <FaTags size={18} />
                    {product.category.toUpperCase()}
                </div>
            </div>

            <div className="card-footer">
                <span className="product-price">
                    $ {product.price}
                </span>

                <button
                    className="add-to-cart"
                    onClick={() => onAddToCart(product.title)}
                >
                    <FaCartPlus size={20} /> Add to Cart
                </button>
            </div>
        </div>
    );
};

export default ProductCard;
