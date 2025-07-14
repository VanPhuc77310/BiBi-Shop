import React, { useState } from "react";
import caNgu from "../../assets/user/images/listItem/ca_ngu.jpg";
import pate from "../../assets/user/images/listItem/pate.jpg";
import bangNgu from "../../assets/user/images/listItem/bang_ngu.jpg";
import "./UserProfilePage.scss";

const PRODUCTS = {
    "ca-ngu": {
        name: "Cá ngừ",
        price: 10000,
        img: caNgu
    },
    "pate": {
        name: "Pate",
        price: 20000,
        img: pate
    },
    "bang-ngu": {
        name: "Bà má Băng ngu chúa",
        price: 2000,
        img: bangNgu
    }
};

const ORDERS = [
    {
        id: "DH001",
        products: [
            { id: "ca-ngu", quantity: 2 }
        ],
        status: "Đã giao"
    },
    {
        id: "DH002",
        products: [
            { id: "pate", quantity: 3 }
        ],
        status: "Đang xử lý"
    },
    {
        id: "DH003",
        products: [
            { id: "bang-ngu", quantity: 1 }
        ],
        status: "Đang trong quá trình bán"
    }
];

function OrderDetailModal({ open, onClose, order, productDetail }) {
    if (!open || !order) return null;
    return (
        <div className="order-modal-overlay" onClick={onClose}>
            <div className="order-modal" onClick={e => e.stopPropagation()}>
                <h3>Chi tiết đơn hàng {order.id}</h3>
                {order.products.map((item, idx) => {
                    const prod = PRODUCTS[item.id];
                    return (
                        <div key={idx} className="order-modal-product">
                            <img src={prod.img} alt={prod.name} />
                            <div>
                                <div><b>{prod.name}</b></div>
                                <div>Giá: {prod.price.toLocaleString()}₫</div>
                                <div>Số lượng: {item.quantity}</div>
                                <div>Thành tiền: {(prod.price * item.quantity).toLocaleString()}₫</div>
                            </div>
                        </div>
                    );
                })}
                <div style={{ marginTop: 16, textAlign: 'right' }}>
                    <button className="profile-btn" onClick={onClose}>Đóng</button>
                </div>
            </div>
        </div>
    );
}

const OrderHistory = () => {
    const [modalOrder, setModalOrder] = useState(null);
    return (
        <div className="profile-card">
            <h3>Lịch sử đơn hàng</h3>
            <table className="profile-table">
                <thead>
                    <tr>
                        <th>Mã đơn</th>
                        <th>Sản phẩm</th>
                        <th>Số lượng</th>
                        <th>Tổng tiền</th>
                        <th>Trạng thái</th>
                    </tr>
                </thead>
                <tbody>
                    {ORDERS.map(order => {
                        const total = order.products.reduce((sum, item) => sum + PRODUCTS[item.id].price * item.quantity, 0);
                        return (
                            <tr key={order.id} style={{ cursor: 'pointer' }} onClick={() => setModalOrder(order)}>
                                <td>{order.id}</td>
                                <td>
                                    {order.products.map((item, idx) => (
                                        <span key={item.id}>
                                            {PRODUCTS[item.id].name}{idx < order.products.length - 1 ? ", " : ""}
                                        </span>
                                    ))}
                                </td>
                                <td>
                                    {order.products.reduce((sum, item) => sum + item.quantity, 0)}
                                </td>
                                <td>{total.toLocaleString()}₫</td>
                                <td>{order.status}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            <OrderDetailModal open={!!modalOrder} onClose={() => setModalOrder(null)} order={modalOrder} />
        </div>
    );
};

export default OrderHistory; 