import React from "react";
import "./Header.scss";
import { AiOutlineFacebook, AiOutlineInstagram, AiOutlineLinkedin, AiOutlineTwitter, AiOutlineUser } from "react-icons/ai";
import { Link } from "react-router-dom";
import { formatPrice } from "../../../../utils/format";

const Header = () => {
    return (
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
    );
}

export default Header;