import React, { useState } from "react";
import { AiOutlineShop, AiOutlineLoading3Quarters } from "react-icons/ai";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "./Login.scss";

const Login = ({ onClose, onShowRegister }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleShowRegister = (e) => {
        e.preventDefault();
        onClose();
        onShowRegister();
    };

    const validateForm = () => {
        const newErrors = {};

        if (!username.trim()) {
            newErrors.username = "Vui lòng nhập tài khoản";
        }

        if (!password.trim()) {
            newErrors.password = "Vui lòng nhập mật khẩu";
        } else if (password.length < 6) {
            newErrors.password = "Mật khẩu phải có ít nhất 6 ký tự";
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

        setTimeout(() => {
            const result = login(username, password);
            setIsLoading(false);
            if (result.success) {
                onClose();
                if (result.user.role === "admin") {
                    navigate("/dashboard");
                } else {
                    // stay on current page or reload
                    window.location.reload();
                }
            } else {
                setErrors({
                    username: "",
                    password: "Sai tài khoản hoặc mật khẩu!"
                });
            }
        }, 1000);
    };

    return (
        <div className="login-modal">
            <div className="login-modal__overlay" onClick={onClose}></div>
            <div className="login-modal__container">
                <div className="container-fluid p-0">
                    <div className="row g-0">
                        <div className="col-md-6 text-black p-4">
                            <div className="d-flex align-items-center mb-3">
                                <AiOutlineShop className="shop-icon" />
                                <span className="h2 fw-bold mb-0">BiBi Shop</span>
                            </div>

                            <div className="login-form">
                                <form onSubmit={handleSubmit}>
                                    <h3 className="fw-normal mb-3">Đăng nhập</h3>

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
                                                'Đăng nhập'
                                            )}
                                        </button>
                                    </div>

                                    <p className="small mb-3">
                                        <a className="text-muted" href="#!">Quên mật khẩu?</a>
                                    </p>
                                    <p className="mb-0">
                                        Bạn chưa có tài khoản?{" "}
                                        <a href="#!" className="link-primary" onClick={handleShowRegister}>
                                            Đăng ký ngay
                                        </a>
                                    </p>
                                </form>
                            </div>
                        </div>
                        <div className="col-md-6 d-none d-md-block p-0">
                            <img
                                src="/src/assets/user/images/listitem/oi.jpg"
                                alt="Login image"
                                className="login-banner"
                            />
                        </div>
                    </div>
                </div>
                <span className="login-modal__close" onClick={onClose}>×</span>
            </div>
        </div>
    );
};

export default Login;