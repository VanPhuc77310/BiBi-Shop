import React from "react";

const ContactModal = ({ open, onClose }) => {
    if (!open) return null;
    return (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999 }}>
            <div style={{ background: '#fff', padding: 32, borderRadius: 8, minWidth: 320, position: 'relative' }}>
                <button onClick={onClose} style={{ position: 'absolute', top: 8, right: 8, fontSize: 18, background: 'none', border: 'none', cursor: 'pointer' }}>×</button>
                <h2>Liên hệ</h2>
                <p>Hotline: <b>+65 11.188.888</b></p>
                <p>Email: <b>support@bibi-shop.com</b></p>
                <p>Địa chỉ: <b>123 Đường ABC, Quận 1, TP.HCM</b></p>
            </div>
        </div>
    );
};

export default ContactModal; 