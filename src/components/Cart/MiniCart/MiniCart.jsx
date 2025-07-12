import React, { useRef } from "react";
import "./MiniCart.scss";
import { useCart } from "../../../context/CartContext";
import { AiOutlinePlus, AiOutlineMinus, AiOutlineDelete } from "react-icons/ai";

const MiniCart = ({ open, onClose, style }) => {
    const { cartItems, updateQuantity, removeFromCart } = useCart();
    const hoverTimeoutRef = useRef(null);

    if (!open) return null;

    const handleIncreaseQuantity = (productName) => {
        const currentItem = cartItems.find(item => item.name === productName);
        if (currentItem) {
            updateQuantity(productName, currentItem.quantity + 1);
        }
    };

    const handleDecreaseQuantity = (productName) => {
        const currentItem = cartItems.find(item => item.name === productName);
        if (currentItem && currentItem.quantity > 1) {
            updateQuantity(productName, currentItem.quantity - 1);
        } else if (currentItem && currentItem.quantity === 1) {
            removeFromCart(productName);
        }
    };

    const handleMouseEnter = () => {
        // Clear timeout nếu có
        if (hoverTimeoutRef.current) {
            clearTimeout(hoverTimeoutRef.current);
        }
    };

    const handleMouseLeave = () => {
        // Thêm delay nhỏ trước khi đóng
        hoverTimeoutRef.current = setTimeout(() => {
            onClose();
        }, 200);
    };

    return (
        <div
            className="minicart-dropdown"
            style={style}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <button className="minicart-close" onClick={onClose}>&times;</button>
            <h3>Giỏ hàng của bạn</h3>
            <div className="minicart-list">
                {cartItems && cartItems.length > 0 ? (
                    cartItems.map((item, idx) => (
                        <div className="minicart-item" key={idx}>
                            <img src={item.img} alt={item.name} className="minicart-item-img" />
                            <div className="minicart-item-info">
                                <div className="minicart-item-name">{item.name}</div>
                                <div className="minicart-item-price">Giá: {item.price.toLocaleString()}₫</div>
                                <div className="minicart-item-controls">
                                    <button
                                        className="quantity-btn"
                                        onClick={() => handleDecreaseQuantity(item.name)}
                                    >
                                        <AiOutlineMinus />
                                    </button>
                                    <span className="quantity-display">{item.quantity}</span>
                                    <button
                                        className="quantity-btn"
                                        onClick={() => handleIncreaseQuantity(item.name)}
                                    >
                                        <AiOutlinePlus />
                                    </button>
                                    <button
                                        className="remove-btn"
                                        onClick={() => removeFromCart(item.name)}
                                    >
                                        <AiOutlineDelete />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="minicart-empty">Chưa có sản phẩm nào trong giỏ hàng.</div>
                )}
            </div>
        </div>
    );
};

export default MiniCart;
