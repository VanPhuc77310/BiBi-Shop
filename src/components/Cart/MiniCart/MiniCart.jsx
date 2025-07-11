import React from "react";
import "./MiniCart.scss";

const MiniCart = ({ open, onClose, items, style }) => {
    if (!open) return null;

    // Đóng khi click ngoài (nếu cần, sẽ xử lý ở Header)

    return (
        <div className="minicart-dropdown" style={style}>
            <button className="minicart-close" onClick={onClose}>&times;</button>
            <h3>Giỏ hàng của bạn</h3>
            <div className="minicart-list">
                {items && items.length > 0 ? (
                    items.map((item, idx) => (
                        <div className="minicart-item" key={idx}>
                            <img src={item.image} alt={item.name} className="minicart-item-img" />
                            <div className="minicart-item-info">
                                <div className="minicart-item-name">{item.name}</div>
                                <div className="minicart-item-qty">Số lượng: {item.quantity}</div>
                                <div className="minicart-item-price">Giá: {item.price.toLocaleString()}₫</div>
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
