import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import './UserProfilePage.scss';
import userAvatar from "../../assets/user/images/avatar_user.jpg";
import OrderHistory from "./OrderHistory";

const tabs = [
    { key: "info", label: "Thông tin cá nhân", icon: "👤" },
    { key: "orders", label: "Lịch sử đơn hàng", icon: "📦" },
    { key: "address", label: "Địa chỉ giao hàng", icon: "🏠" },
    { key: "password", label: "Đổi mật khẩu", icon: "🔒" },
];

function PersonalInfo({ user }) {
    return (
        <div className="profile-card">
            <div className="profile-avatar-large profile-avatar-zoom">
                <img src={user.avatar || userAvatar} alt="avatar" />
            </div>
            <h3>Thông tin cá nhân</h3>
            <div className="profile-row">
                <div className="profile-label">Tên:</div>
                <div className="profile-value">{user.name}</div>
            </div>
            <div className="profile-row">
                <div className="profile-label">Email:</div>
                <div className="profile-value">{user.email}</div>
            </div>
            <div className="profile-row">
                <div className="profile-label">Role:</div>
                <div className="profile-value">{user.role}</div>
            </div>
        </div>
    );
}

function AddressBook() {
    const addresses = [
        { id: 1, address: "56 Viêm Tây 2, Quảng Nam", isDefault: false },
        { id: 2, address: "139/9 Nguyễn Công Hoan, Đà Nẵng", isDefault: true },
    ];
    return (
        <div className="profile-card">
            <h3>Địa chỉ giao hàng</h3>
            <ul className="profile-address-list">
                {addresses.map(addr => (
                    <li key={addr.id} className={addr.isDefault ? "default" : ""}>
                        <span className="address-icon">🏠</span> {addr.address} {addr.isDefault && <b>(Mặc định)</b>}
                    </li>
                ))}
            </ul>
        </div>
    );
}

function ChangePassword() {
    const [oldPass, setOldPass] = useState("");
    const [newPass, setNewPass] = useState("");
    const [confirm, setConfirm] = useState("");
    const [msg, setMsg] = useState("");
    const handleSubmit = e => {
        e.preventDefault();
        if (!oldPass || !newPass || !confirm) {
            setMsg("Vui lòng nhập đủ thông tin");
        } else if (newPass !== confirm) {
            setMsg("Mật khẩu mới không khớp");
        } else {
            setMsg("Đổi mật khẩu thành công (demo)");
        }
    };
    return (
        <div className="profile-card">
            <h3>Đổi mật khẩu</h3>
            <form className="profile-form" onSubmit={handleSubmit}>
                <div className="profile-row">
                    <input type="password" placeholder="Mật khẩu cũ" value={oldPass} onChange={e => setOldPass(e.target.value)} />
                </div>
                <div className="profile-row">
                    <input type="password" placeholder="Mật khẩu mới" value={newPass} onChange={e => setNewPass(e.target.value)} />
                </div>
                <div className="profile-row">
                    <input type="password" placeholder="Nhập lại mật khẩu mới" value={confirm} onChange={e => setConfirm(e.target.value)} />
                </div>
                <button className="profile-btn" type="submit">Đổi mật khẩu</button>
            </form>
            {msg && <div className="profile-msg">{msg}</div>}
        </div>
    );
}

const UserProfilePage = () => {
    const { user } = useAuth();
    const [tab, setTab] = useState("info");
    if (!user) return <div>Vui lòng đăng nhập để xem thông tin cá nhân.</div>;
    return (
        <div className="user-profile-fixed-layout">
            <div className="profile-sidebar-fixed">
                <div className="profile-avatar">
                    <img src={user.avatar || userAvatar} alt="avatar" />
                </div>
                <ul className="profile-menu">
                    {tabs.map(t => (
                        <li key={t.key} className={tab === t.key ? "active" : ""} onClick={() => setTab(t.key)}>
                            <span className="profile-menu-icon">{t.icon}</span>
                            <span>{t.label}</span>
                        </li>
                    ))}
                </ul>
            </div>
            <main className="profile-content-fixed">
                {tab === "info" && <PersonalInfo user={user} />}
                {tab === "orders" && <OrderHistory />}
                {tab === "address" && <AddressBook />}
                {tab === "password" && <ChangePassword />}
            </main>
        </div>
    );
};

export default UserProfilePage; 