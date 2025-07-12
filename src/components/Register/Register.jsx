import React, { useState } from "react";
import { AiOutlineUser, AiOutlineLock, AiOutlineShop, AiOutlineLoading3Quarters } from "react-icons/ai";
import "./Register.scss";

const Register = ({ onClose, onShowLogin }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState({});

    const handleShowLogin = (e) => {
        e.preventDefault();
        onClose();
        onShowLogin();
    };

    const validateForm = () => {
        const newErrors = {};

        if (!username.trim()) {
            newErrors.username = "Vui lòng nhập tài khoản";
        } else if (username.length < 3) {
            newErrors.username = "Tài khoản phải có ít nhất 3 ký tự";
        }

        if (!password.trim()) {
            newErrors.password = "Vui lòng nhập mật khẩu";
        } else if (password.length < 6) {
            newErrors.password = "Mật khẩu phải có ít nhất 6 ký tự";
        }

        if (!confirmPassword.trim()) {
            newErrors.confirmPassword = "Vui lòng nhập lại mật khẩu";
        } else if (password !== confirmPassword) {
            newErrors.confirmPassword = "Mật khẩu không khớp";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setIsLoading(true);

        // Simulate API call
        setTimeout(() => {
            setIsLoading(false);
            // Here you would typically make an API call
            console.log("Register attempt:", { username, password, confirmPassword });
        }, 2000);
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
                                <form onSubmit={handleSubmit}>
                                    <h3 className="fw-normal mb-3">Đăng ký</h3>

                                    <div className="form-outline mb-4">
                                        <input
                                            type="text"
                                            className={`form-control form-control-lg ${errors.username ? 'is-invalid' : ''}`}
                                            value={username}
                                            onChange={e => {
                                                setUsername(e.target.value);
                                                if (errors.username) {
                                                    setErrors(prev => ({ ...prev, username: '' }));
                                                }
                                            }}
                                            placeholder="Tài khoản"
                                            disabled={isLoading}
                                        />
                                        {errors.username && (
                                            <div className="invalid-feedback">
                                                {errors.username}
                                            </div>
                                        )}
                                    </div>

                                    <div className="form-outline mb-4">
                                        <input
                                            type="password"
                                            className={`form-control form-control-lg ${errors.password ? 'is-invalid' : ''}`}
                                            value={password}
                                            onChange={e => {
                                                setPassword(e.target.value);
                                                if (errors.password) {
                                                    setErrors(prev => ({ ...prev, password: '' }));
                                                }
                                            }}
                                            placeholder="Mật khẩu"
                                            disabled={isLoading}
                                        />
                                        {errors.password && (
                                            <div className="invalid-feedback">
                                                {errors.password}
                                            </div>
                                        )}
                                    </div>

                                    <div className="form-outline mb-4">
                                        <input
                                            type="password"
                                            className={`form-control form-control-lg ${errors.confirmPassword ? 'is-invalid' : ''}`}
                                            value={confirmPassword}
                                            onChange={e => {
                                                setConfirmPassword(e.target.value);
                                                if (errors.confirmPassword) {
                                                    setErrors(prev => ({ ...prev, confirmPassword: '' }));
                                                }
                                            }}
                                            placeholder="Nhập lại mật khẩu"
                                            disabled={isLoading}
                                        />
                                        {errors.confirmPassword && (
                                            <div className="invalid-feedback">
                                                {errors.confirmPassword}
                                            </div>
                                        )}
                                    </div>

                                    <div className="pt-1 mb-4">
                                        <button
                                            className="btn btn-primary btn-lg btn-block"
                                            type="submit"
                                            disabled={isLoading}
                                        >
                                            {isLoading ? (
                                                <>
                                                    <AiOutlineLoading3Quarters className="loading-icon" />
                                                    Đang xử lý...
                                                </>
                                            ) : (
                                                'Đăng ký'
                                            )}
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