import React from "react";
import "./Footer.scss";
import { AiOutlineFacebook, AiOutlineInstagram, AiOutlineLinkedin, AiOutlineTwitter, AiOutlineUser, AiOutlineShoppingCart } from "react-icons/ai";
import { Link } from "react-router-dom";
const Footer = () => {
    return (
        <footer className="footer">
            <div className="container">
                <div className="row">
                    <div className="col-lg-3">
                        <div className="footer__about">
                            <h1 className="footer__about-logo">BiBi Shop</h1>
                            <ul>
                                <li>Địa chỉ: Điện Bàn, Quảng Nam</li>
                                <li>Phone: 0868-314-917</li>
                                <li>Email: bibishop@gmail.com</li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div className="footer__widget">
                            <h4>Cửa hàng</h4>
                            <ul>
                                <li>
                                    <Link to="">Liên hệ</Link>
                                </li>
                                <li>
                                    <Link to="">Thông tin về chúng tôi</Link>
                                </li>
                                <li>
                                    <Link to="">Sản phẩm kinh doanh </Link>
                                </li>
                            </ul>
                            <ul>
                                <li>
                                    <Link to="">Thông tin tài khoản</Link>
                                </li>
                                <li>
                                    <Link to="">Giỏ hàng</Link>
                                </li>
                                <li>
                                    <Link to="">Danh sách ưa thích</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-lg-3">
                        <div className="footer__widget">
                            <h4>Khuyến mãi & ưu đãi</h4>
                            <p>Đăng ký nhận thông tin</p>
                            <form action="#">
                                <div className="footer__widget-form">
                                    <input type="text" placeholder="Nhập email..." />
                                    <button type="submit" className="btn-submit">Đăng ký</button>
                                </div>
                            </form>
                            <div className="footer__widget-social">
                                <div>
                                    <div><AiOutlineFacebook /></div>
                                    <div><AiOutlineInstagram /></div>
                                    <div><AiOutlineLinkedin /></div>
                                    <div><AiOutlineTwitter /></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;