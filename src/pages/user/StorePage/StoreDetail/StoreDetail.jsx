import React from "react";
import "./StoreDetail.scss";

const StoreDetail = ({ store, onBack }) => {
    if (!store) return null;
    return (
        <div className="storedetail__overlay">
            <div className="storedetail__modal">
                <button className="storedetail__close" onClick={onBack}>×</button>
                <div className="storedetail__imgwrap">
                    <img src={store.image} alt={store.name} />
                </div>
                <div className="storedetail__info">
                    <h2>{store.name}</h2>
                    <div className="storedetail__rating">Đánh giá: <b>{store.rating}</b> ⭐</div>
                    <div className="storedetail__location">📍 {store.location}</div>
                    <p className="storedetail__desc">{store.description}</p>
                </div>
            </div>
        </div>
    );
};

export default StoreDetail; 