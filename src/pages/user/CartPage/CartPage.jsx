import React, { useState } from "react";
import { useCart } from "../../../context/CartContext";
import { AiOutlineDelete, AiOutlineMinus, AiOutlinePlus, AiOutlineShoppingCart, AiOutlineArrowLeft, AiOutlineClear } from "react-icons/ai";
import { Link } from "react-router-dom";
import { formatPrice } from "../../../utils/format";
import "./CartPage.scss";

const CartPage = () => {
    const {
        cartItems,
        removeFromCart,
        updateQuantity,
        getCartTotal,
        getCartCount,
        clearCart
    } = useCart();

    const [showClearConfirm, setShowClearConfirm] = useState(false);
    const [notification, setNotification] = useState({ show: false, message: "", type: "" });

    const showNotification = (message, type = "success") => {
        setNotification({ show: true, message, type });
        setTimeout(() => {
            setNotification({ show: false, message: "", type: "" });
        }, 3000);
    };

    const handleIncreaseQuantity = (productName) => {
        const currentItem = cartItems.find(item => item.name === productName);
        if (currentItem) {
            updateQuantity(productName, currentItem.quantity + 1);
            showNotification(`Đã tăng số lượng ${productName}`);
        }
    };

    const handleDecreaseQuantity = (productName) => {
        const currentItem = cartItems.find(item => item.name === productName);
        if (currentItem && currentItem.quantity > 1) {
            updateQuantity(productName, currentItem.quantity - 1);
            showNotification(`Đã giảm số lượng ${productName}`);
        } else if (currentItem && currentItem.quantity === 1) {
            removeFromCart(productName);
            showNotification(`Đã xóa ${productName} khỏi giỏ hàng`, "warning");
        }
    };

    const handleRemoveItem = (productName) => {
        removeFromCart(productName);
        showNotification(`Đã xóa ${productName} khỏi giỏ hàng`, "warning");
    };

    const handleClearCart = () => {
        clearCart();
        setShowClearConfirm(false);
        showNotification("Đã xóa tất cả sản phẩm khỏi giỏ hàng", "warning");
    };

    const handleCheckout = () => {
        // Implement checkout logic here
        console.log("Proceeding to checkout...");
        showNotification("Chuyển đến trang thanh toán...", "info");
    };

    if (cartItems.length === 0) {
        return (
            <div className="cart-page">
                <div className="container">
                    <div className="cart-empty">
                        <div className="cart-empty__icon">
                            <AiOutlineShoppingCart />
                        </div>
                        <h2>Giỏ hàng trống</h2>
                        <p>Bạn chưa có sản phẩm nào trong giỏ hàng</p>
                        <Link to="/" className="btn-continue-shopping">
                            <AiOutlineArrowLeft />
                            Tiếp tục mua sắm
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="cart-page">
            {/* Notification */}
            {notification.show && (
                <div className={`notification-toast ${notification.type}`}>
                    <div className="notification-content">
                        <span className="notification-message">{notification.message}</span>
                        <button
                            className="notification-close"
                            onClick={() => setNotification({ show: false, message: "", type: "" })}
                        >
                            ×
                        </button>
                    </div>
                </div>
            )}

            <div className="container">
                <div className="cart-header">
                    <Link to="/" className="back-to-home">
                        <AiOutlineArrowLeft />
                        Tiếp tục mua sắm
                    </Link>
                    <h1>Giỏ hàng của bạn</h1>
                    <p className="cart-count">Có {getCartCount()} sản phẩm trong giỏ hàng</p>

                    <div className="cart-actions">
                        <button
                            className="btn-clear-cart"
                            onClick={() => setShowClearConfirm(true)}
                        >
                            <AiOutlineClear />
                            Xóa tất cả
                        </button>
                    </div>
                </div>

                <div className="cart-content">
                    <div className="cart-items">
                        {cartItems.map((item, index) => (
                            <div className="cart-item" key={index}>
                                <div className="cart-item__image">
                                    <img src={item.img} alt={item.name} />
                                </div>

                                <div className="cart-item__info">
                                    <h3 className="cart-item__name">{item.name}</h3>
                                    <p className="cart-item__price">{formatPrice(item.price)}</p>
                                </div>

                                <div className="cart-item__quantity">
                                    <div className="quantity-controls">
                                        <button
                                            className="quantity-btn"
                                            onClick={() => handleDecreaseQuantity(item.name)}
                                            disabled={item.quantity <= 1}
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
                                    </div>
                                </div>

                                <div className="cart-item__total">
                                    <p className="item-total">{formatPrice(item.price * item.quantity)}</p>
                                </div>

                                <div className="cart-item__actions">
                                    <button
                                        className="remove-btn"
                                        onClick={() => handleRemoveItem(item.name)}
                                    >
                                        <AiOutlineDelete />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="cart-summary">
                        <div className="summary-header">
                            <h3>Tổng đơn hàng</h3>
                        </div>

                        <div className="summary-content">
                            <div className="summary-row">
                                <span>Tạm tính:</span>
                                <span>{formatPrice(getCartTotal())}</span>
                            </div>
                            <div className="summary-row">
                                <span>Phí vận chuyển:</span>
                                <span>{getCartTotal() > 200000 ? 'Miễn phí' : formatPrice(30000)}</span>
                            </div>
                            <div className="summary-row discount">
                                <span>Giảm giá:</span>
                                <span>-{formatPrice(0)}</span>
                            </div>
                            <div className="summary-row total">
                                <span>Tổng cộng:</span>
                                <span>{formatPrice(getCartTotal() + (getCartTotal() > 200000 ? 0 : 30000))}</span>
                            </div>
                        </div>

                        <div className="summary-actions">
                            <button
                                className="btn-checkout"
                                onClick={handleCheckout}
                            >
                                Tiến hành thanh toán
                            </button>
                        </div>

                        <div className="shipping-info">
                            <p>
                                <strong>Miễn phí vận chuyển</strong> cho đơn hàng từ {formatPrice(200000)}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Clear Cart Confirmation Modal */}
            {showClearConfirm && (
                <div className="modal-overlay" onClick={() => setShowClearConfirm(false)}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <h3>Xác nhận xóa giỏ hàng</h3>
                        <p>Bạn có chắc chắn muốn xóa tất cả sản phẩm khỏi giỏ hàng?</p>
                        <div className="modal-actions">
                            <button
                                className="btn-cancel"
                                onClick={() => setShowClearConfirm(false)}
                            >
                                Hủy
                            </button>
                            <button
                                className="btn-confirm"
                                onClick={handleClearCart}
                            >
                                Xác nhận
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CartPage; 