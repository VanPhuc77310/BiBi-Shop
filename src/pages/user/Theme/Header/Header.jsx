import { React, useState } from "react";
import "./Header.scss";
import { AiOutlineFacebook, AiOutlineInstagram, AiOutlineLinkedin, AiOutlineTwitter, AiOutlineUser, AiOutlineShoppingCart } from "react-icons/ai";
import { Link } from "react-router-dom";
import { formatPrice } from "../../../../utils/format";

const Header = () => {

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
        </div>
    );
}

export default Header;