import { React, useState } from "react";
import "./Header.scss";
import { AiOutlineFacebook, AiOutlineInstagram, AiOutlineLinkedin, AiOutlineTwitter, AiOutlineUser, AiOutlineShoppingCart, AiOutlineMenu, AiOutlinePhone } from "react-icons/ai";
import { Link } from "react-router-dom";
import { formatPrice } from "../../../../utils/format";

const Header = () => {

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
                                <li>
                                    <Link to="">
                                        <AiOutlineUser />
                                    </Link>
                                    <span>Đăng nhập</span>
                                </li>

                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container">
                <div className="row">
                    <div className="col-xl-3">
                        <div className="header__logo">
                            <h1>BiBi Shop</h1>
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
                                <span>{formatPrice(1230000)}</span>
                            </div>
                            <ul>
                                <li>
                                    <Link to="">
                                        <AiOutlineShoppingCart /> <span>5</span>
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container">
                <div className="row header__content">
                    <div className="col-lg-3 header_category">
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
                                <form >
                                    <input type="text" placeholder="Bạn đang tìm gì?" />
                                    <button type="submit">Tìm kiếm</button>
                                </form>
                            </div>
                            <div className="header__search__phone">
                                <div className="header__search__phone_icon">
                                    <AiOutlinePhone />
                                </div>
                                <div className="header__search__text">
                                    <p>0868.314.917</p>
                                    <span>Hỗ trợ 24/7</span>
                                </div>
                            </div>
                        </div>
                        <div className="header__item">
                            <div className="header__text">
                                <span>Trái cây tươi</span>
                                <h2>Rau quả <br /> sạch 100%</h2>
                                <p>Miễn phí giao hàng tận nơi</p>
                                <Link to="" className="primary-btn">Mua ngay</Link>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default Header;