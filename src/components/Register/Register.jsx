import React, { useState } from "react";
import { AiOutlineUser, AiOutlineLock, AiOutlineShop } from "react-icons/ai";
import "./Register.scss";

const Register = ({ onClose, onShowLogin }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleShowLogin = (e) => {
        e.preventDefault();
        onClose();
        onShowLogin();
    };

    return (
        <div className="register-modal">
            <div className="register-modal__overlay" onClick={onClose}></div>
            <div className="register-modal__container">
                <div className="container-fluid p-0">
                    <div className="row g-0">
                        <div className="col-md-6 text-black p-4">
                            <div className="d-flex align-items-center mb-3">
                                <AiOutlineShop className="shop-icon" />
                                <span className="h2 fw-bold mb-0">BiBi Shop</span>
                            </div>

                            <div className="register-form">
                                <form>
                                    <h3 className="fw-normal mb-3">Đăng ký</h3>

                                    <div className="form-outline mb-4">
                                        <input
                                            type="text"
                                            className="form-control form-control-lg"
                                            value={username}
                                            onChange={e => setUsername(e.target.value)}
                                            placeholder="Tài khoản"
                                        />
                                    </div>

                                    <div className="form-outline mb-4">
                                        <input
                                            type="password"
                                            className="form-control form-control-lg"
                                            value={password}
                                            onChange={e => setPassword(e.target.value)}
                                            placeholder="Mật khẩu"
                                        />
                                    </div>

                                    <div className="form-outline mb-4">
                                        <input
                                            type="password"
                                            className="form-control form-control-lg"
                                            value={confirmPassword}
                                            onChange={e => setConfirmPassword(e.target.value)}
                                            placeholder="Nhập lại mật khẩu"
                                        />
                                    </div>

                                    <div className="pt-1 mb-4">
                                        <button className="btn btn-primary btn-lg btn-block" type="submit">
                                            Đăng ký
                                        </button>
                                    </div>

                                    <p className="mb-0 text-center">
                                        Đã có tài khoản?{" "}
                                        <a href="#!" className="link-primary" onClick={handleShowLogin}>
                                            Đăng nhập ngay
                                        </a>
                                    </p>
                                </form>
                            </div>
                        </div>
                        <div className="col-md-6 d-none d-md-block p-0">
                            <img
                                src="/src/assets/user/images/listitem/mangcut.jpg"
                                alt="Register image"
                                className="register-banner"
                            />
                        </div>
                    </div>
                </div>
                <span className="register-modal__close" onClick={onClose}>×</span>
            </div>
        </div>
    );
};

export default Register;