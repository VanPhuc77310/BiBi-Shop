import React, { useState, useRef, useEffect } from "react";
import "./Header.scss";
import { AiOutlineFacebook, AiOutlineInstagram, AiOutlineLinkedin, AiOutlineTwitter, AiOutlineUser, AiOutlineShoppingCart, AiOutlineMenu, AiOutlinePhone } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { formatPrice } from "../../../../utils/format";
import Login from "../../../../components/Login/Login";
import Register from "../../../../components/Register/Register";
import MiniCart from "../../../../components/Cart/MiniCart/MiniCart";
import { useCart } from "../../../../context/CartContext";
import { useAuth } from "../../../../context/AuthContext";
import userAvatar from "../../../../assets/user/images/avatar_user.jpg";

const Header = () => {

    const [showLogin, setShowLogin] = useState(false);
    const [showRegister, setShowRegister] = useState(false);
    const [isShowCategory, setIsShowCategory] = useState(false);
    const [menus, setMenu] = useState([
        {
            name: "Trang chủ",
            path: "/",
        },
        {
            name: "Cửa hàng",
            path: "/cua-hang",
        },
        {
            name: "Sản phẩm",
            path: "/san-pham",
            isShowSubMenu: false,
            child: [
                {
                    name: "Thịt",
                    path: "/san-pham/thit",
                },
                {
                    name: "Rau củ",
                    path: "/san-pham/rau-cu",
                },
                {
                    name: "Thức ăn nhanh",
                    path: "/san-pham/thuc-an-nhanh",
                },

            ]
        },
        {
            name: "Bài viết",
            path: "/bai-viet",
        },
        {
            name: "Liên hệ",
            path: "/lien-he",
        },
    ])

    const [showMiniCart, setShowMiniCart] = useState(false);
    const { cartItems, getCartTotal, getCartCount } = useCart();
    const [searchValue, setSearchValue] = useState("");
    const navigate = useNavigate();
    const { user, logout } = useAuth();
    const [showUserDropdown, setShowUserDropdown] = useState(false);
    const userMenuRef = useRef();

    const cartRef = useRef();
    const hoverTimeoutRef = useRef(null);
    const categoryRef = useRef();

    // Đóng MiniCart khi click ngoài
    useEffect(() => {
        if (!showMiniCart) return;
        function handleClickOutside(event) {
            if (cartRef.current && !cartRef.current.contains(event.target)) {
                setShowMiniCart(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [showMiniCart]);

    // Đóng dropdown Danh sách sản phẩm khi click ngoài
    useEffect(() => {
        if (!isShowCategory) return;
        function handleClickOutside(event) {
            if (categoryRef.current && !categoryRef.current.contains(event.target)) {
                setIsShowCategory(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [isShowCategory]);

    // Đóng dropdown user khi click ngoài
    useEffect(() => {
        if (!showUserDropdown) return;
        function handleClickOutside(event) {
            if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
                setShowUserDropdown(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [showUserDropdown]);

    // Nếu là admin, tự động chuyển hướng sang dashboard
    useEffect(() => {
        if (user && user.role === "admin") {
            navigate("/dashboard");
        }
    }, [user, navigate]);

    const handleCartClick = (e) => {
        e.preventDefault();
        if (cartItems.length > 0) {
            // Nếu có sản phẩm trong giỏ hàng, chuyển đến trang giỏ hàng
            window.location.href = '/cart';
        } else {
            // Nếu giỏ hàng trống, hiển thị MiniCart
            setShowMiniCart((v) => !v);
        }
    };

    const handleCartHover = () => {
        if (cartItems.length > 0) {
            // Clear timeout nếu có
            if (hoverTimeoutRef.current) {
                clearTimeout(hoverTimeoutRef.current);
            }
            // Thêm delay nhỏ để tránh hiển thị quá nhanh
            hoverTimeoutRef.current = setTimeout(() => {
                setShowMiniCart(true);
            }, 200);
        }
    };

    const handleCartLeave = () => {
        // Clear timeout nếu có
        if (hoverTimeoutRef.current) {
            clearTimeout(hoverTimeoutRef.current);
        }
        // Thêm delay nhỏ trước khi đóng
        hoverTimeoutRef.current = setTimeout(() => {
            setShowMiniCart(false);
        }, 300);
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        if (searchValue.trim()) {
            navigate(`/search?q=${encodeURIComponent(searchValue.trim())}`);
        }
    };

    return (
        <div>
            <div className="header__top">
                <div className="container">
                    <div className="row">
                        <div className="col-6 header__top_left">
                            <ul>
                                <li>Kênh người bán</li>
                                <li>Miễn phí ship từ đơn {formatPrice(200000)}</li>
                            </ul>
                        </div>
                        <div className="col-6 header__top_right">
                            <ul>
                                <li>
                                    <Link to="">
                                        <AiOutlineFacebook />
                                    </Link>
                                </li>
                                <li>
                                    <Link to="">
                                        <AiOutlineInstagram />
                                    </Link>
                                </li>
                                <li>
                                    <Link to="">
                                        <AiOutlineLinkedin />
                                    </Link>
                                </li>
                                <li>
                                    <Link to="">
                                        <AiOutlineTwitter />
                                    </Link>
                                </li>
                                {/* Nếu chưa đăng nhập */}
                                {!user && (
                                    <>
                                        <li>
                                            <Link to="">
                                                <AiOutlineUser />
                                            </Link>
                                            <span onClick={() => setShowLogin(true)} style={{ cursor: "pointer" }}>Đăng nhập</span>
                                        </li>
                                        {showLogin && (
                                            <Login
                                                onClose={() => setShowLogin(false)}
                                                onShowRegister={() => setShowRegister(true)}
                                            />
                                        )}
                                        {showRegister && (
                                            <Register
                                                onClose={() => setShowRegister(false)}
                                                onShowLogin={() => setShowLogin(true)}
                                            />
                                        )}
                                    </>
                                )}
                                {/* Nếu đã đăng nhập user */}
                                {user && user.username === "user" && (
                                    <li className="header__user-menu" ref={userMenuRef}>
                                        <span style={{ cursor: "pointer", display: "flex", alignItems: "center" }} onClick={() => setShowUserDropdown(v => !v)}>
                                            <img src={user.avatar || userAvatar} alt="avatar" style={{ width: 28, height: 28, borderRadius: "50%", marginRight: 6, objectFit: 'cover' }} />
                                            {user.name || user.username}
                                        </span>
                                        {showUserDropdown && (
                                            <div className="header__user-dropdown">
                                                <img className="avatar" src={user.avatar || userAvatar} alt="avatar" />
                                                <div className="user-name">{user.name || user.username}</div>
                                                <div className="user-email">{user.email}</div>
                                                <button onClick={() => { setShowUserDropdown(false); window.location.href = '/profile'; }}>Thông tin cá nhân</button>
                                                <button onClick={() => { setShowUserDropdown(false); logout(); }}>Đăng xuất</button>
                                            </div>
                                        )}
                                    </li>
                                )}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container">
                <div className="row">
                    <div className="col-xl-3">
                        <div className="header__logo">
                            <Link to="/">
                                <h1>BiBi Shop</h1>
                            </Link>
                        </div>
                    </div>
                    <div className="col-xl-6">
                        <nav className="header__menu">
                            <ul>
                                {
                                    menus.map((menu, index) => (
                                        <li key={index} className={index === 0 ? "header__menu-active" : ""}>
                                            <Link to={menu.path}>{menu.name}</Link>
                                            {
                                                menu.child && (
                                                    <ul className="header__menu-dropdown">
                                                        {
                                                            menu.child.map((childItem, childKey) => (
                                                                <li key={`${index}-${childKey}`}>
                                                                    <Link to={childItem.path}>{childItem.name}</Link>
                                                                </li>

                                                            ))
                                                        }
                                                    </ul>
                                                )
                                            }
                                        </li>
                                    ))
                                }
                            </ul>
                        </nav>
                    </div>
                    <div className="col-xl-3">
                        <div className="header__cart">
                            <div className="header__cart__price">
                                <span>{formatPrice(getCartTotal())}</span>
                            </div>
                            <ul>
                                <li ref={cartRef} style={{ position: "relative" }}>
                                    <span
                                        style={{ cursor: "pointer" }}
                                        onClick={handleCartClick}
                                        onMouseEnter={handleCartHover}
                                        onMouseLeave={handleCartLeave}
                                    >
                                        <AiOutlineShoppingCart />
                                        <span className="cart-badge">{cartItems.length}</span>
                                    </span>
                                    <MiniCart open={showMiniCart} onClose={() => setShowMiniCart(false)} style={{}} />
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container">
                <div className="row header__content">
                    <div className="col-lg-3 header_category" ref={categoryRef}>
                        <div className="header_category__all" onClick={() => setIsShowCategory(!isShowCategory)}>
                            <AiOutlineMenu />
                            Danh sách sản phẩm
                        </div>
                        <ul className={isShowCategory ? "" : "hidden"}>
                            <li>
                                <Link to="">Thịt tươi</Link>
                            </li>
                            <li>
                                <Link to="">Rau củ</Link>
                            </li>
                            <li>
                                <Link to="">Nước trái cây</Link>
                            </li>
                            <li>
                                <Link to="">Trái cây</Link>
                            </li>
                            <li>
                                <Link to="">Hải sản</Link>
                            </li>
                        </ul>
                    </div>
                    <div className="col-lg-9 header__search_container">
                        <div className="header__search">
                            <div className="header__search__form">
                                <form onSubmit={handleSearchSubmit}>
                                    <input
                                        type="text"
                                        placeholder="Bạn đang tìm gì?"
                                        value={searchValue}
                                        onChange={e => setSearchValue(e.target.value)}
                                    />
                                    <button type="submit">TÌM KIẾM</button>
                                </form>
                            </div>
                            <div className="header__search__phone">
                                <div className="header__search__phone_icon">
                                    <AiOutlinePhone />
                                </div>
                                <div className="header__search__phone_text">
                                    <h5>+65 11.188.888</h5>
                                    <span>Hỗ trợ 24/7</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Header;