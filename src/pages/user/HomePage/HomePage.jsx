import React, { useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import "./HomePage.scss";
import camTuoi from "../../../assets/user/categories/cam_tuoi.png";
import hoaQuaKho from "../../../assets/user/categories/hoaqua_kho.png";
import rauCuTuoi from "../../../assets/user/categories/raucu_tuoi.png";
import suaHop from "../../../assets/user/categories/sua_hop.png";
import thitBo from "../../../assets/user/categories/thit_bo.png";
import chuoi from "../../../assets/user/images/listItem/chuoi.jpg";
import duaHau from "../../../assets/user/images/listItem/dua_hau.jpg";
import hamburger from "../../../assets/user/images/listItem/hamburger.jpg";
import khoaiTayChien from "../../../assets/user/images/listItem/khoaitay_chien.jpg";
import mangCut from "../../../assets/user/images/listItem/mangcut.jpg";
import oi from "../../../assets/user/images/listItem/oi.jpg";
import thitBoNac from "../../../assets/user/images/listItem/thitbo.jpg";
import thitBoMy from "../../../assets/user/images/listItem/thitbo_my.jpg";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import banner1 from "../../../assets/user/images/listItem/banner1.jpg";
import banner2 from "../../../assets/user/images/listItem/banner2.jpg";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useCart } from "../../../context/CartContext";
import { Link } from "react-router-dom";
import caNgu from "../../../assets/user/images/listItem/ca_ngu.jpg";
import pate from "../../../assets/user/images/listItem/pate.jpg";

const HomePage = () => {
    const { addToCart } = useCart();
    const [showNotification, setShowNotification] = useState(false);
    const [notificationMessage, setNotificationMessage] = useState("");

    const responsive = {
        superLargeDesktop: {
            // the naming can be any, depends on you.
            breakpoint: { max: 4000, min: 3000 },
            items: 5
        },
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 4
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 2
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1
        }
    };

    const sliderItems = [
        {
            bgImg: camTuoi,
            title: "Cam tươi"
        },
        {
            bgImg: hoaQuaKho,
            title: "Hoa quả khô"
        },
        {
            bgImg: rauCuTuoi,
            title: "Rau củ tươi"
        },
        {
            bgImg: suaHop,
            title: "Sữa hộp"
        },
        {
            bgImg: thitBo,
            title: "Thịt bò"
        },
        {
            bgImg: caNgu,
            title: "Cá ngừ"
        },
        {
            bgImg: pate,
            title: "Pate"
        }
    ]

    const bannerHomepage = [
        {
            bgImg: banner1,
        },
        {
            bgImg: banner2,
        }
    ]

    const handleAddToCart = (product, e) => {
        e.stopPropagation(); // Ngăn event bubble lên parent
        addToCart(product);
        setNotificationMessage(`Đã thêm "${product.name}" vào giỏ hàng!`);
        setShowNotification(true);

        // Tự động ẩn thông báo sau 3 giây
        setTimeout(() => {
            setShowNotification(false);
        }, 3000);
    };

    const featuredProducts = {
        all: {
            title: "Toàn bộ",
            products: [
                { id: "thit-bo-nac", img: thitBoNac, name: "Thịt bò nạc", price: 10000 },
                { id: "thit-bo-my", img: thitBoMy, name: "Thịt bò Mỹ", price: 20000 },
                { id: "chuoi", img: chuoi, name: "Chuối", price: 5000 },
                { id: "dua-hau", img: duaHau, name: "Dưa hấu", price: 15000 },
                { id: "hamburger", img: hamburger, name: "Hamburger", price: 30000 },
                { id: "khoai-tay-chien", img: khoaiTayChien, name: "Khoai tây chiên", price: 12000 },
                { id: "mang-cut", img: mangCut, name: "Măng cụt", price: 25000 },
                { id: "oi", img: oi, name: "Ổi", price: 8000 },
                { id: "ca-ngu", img: caNgu, name: "Cá ngừ", price: 10000 },
                { id: "pate", img: pate, name: "Pate", price: 20000 },
            ]
        },
        freshMeat: {
            title: "Thịt tươi",
            products: [
                { id: "thit-bo-nac", img: thitBoNac, name: "Thịt bò nạc", price: 10000 },
                { id: "thit-bo-my", img: thitBoMy, name: "Thịt bò Mỹ", price: 20000 },
                { id: "ca-ngu", img: caNgu, name: "Cá ngừ", price: 10000 },
            ]
        },
        fruits: {
            title: "Trái cây",
            products: [
                { id: "chuoi", img: chuoi, name: "Chuối", price: 5000 },
                { id: "dua-hau", img: duaHau, name: "Dưa hấu", price: 15000 },
                { id: "mang-cut", img: mangCut, name: "Măng cụt", price: 25000 },
                { id: "oi", img: oi, name: "Ổi", price: 8000 },
            ]
        },
        fastFood: {
            title: "Thức ăn nhanh",
            products: [
                { id: "hamburger", img: hamburger, name: "Hamburger", price: 30000 },
                { id: "khoai-tay-chien", img: khoaiTayChien, name: "Khoai tây chiên", price: 12000 },
                { id: "pate", img: pate, name: "Pate", price: 20000 },
            ]
        }
    }

    const renderfeaturedProducts = (product) => {
        const tabList = [];
        const tabPanels = [];

        Object.keys(product).forEach((key) => {
            tabList.push(
                <Tab key={key}>{product[key].title}</Tab>
            );
            tabPanels.push(
                <TabPanel key={key}>
                    <div className="featured__products">
                        {product[key].products.map((item, idx) => (
                            <div key={idx} className="featured__product-wrapper">
                                <Link to={`/product/${item.id}`} className="featured__product">
                                    <img src={item.img} alt={item.name} />
                                    <div className="featured__product-info">
                                        <h4>{item.name}</h4>
                                        <p>{item.price.toLocaleString()} đ</p>
                                    </div>
                                </Link>
                                <button
                                    className="btn-add-to-cart-outer"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleAddToCart(item, e);
                                    }}
                                >
                                    <AiOutlineShoppingCart />
                                    Thêm vào giỏ
                                </button>
                            </div>
                        ))}
                    </div>
                </TabPanel>
            );
        });

        return (
            <Tabs>
                <TabList>{tabList}</TabList>
                {tabPanels}
            </Tabs>
        );
    }

    return (
        <div className="container container__categories__slider">
            {/* Notification */}
            {showNotification && (
                <div className="notification-toast">
                    <div className="notification-content">
                        <span className="notification-message">{notificationMessage}</span>
                        <button
                            className="notification-close"
                            onClick={() => setShowNotification(false)}
                        >
                            ×
                        </button>
                    </div>
                </div>
            )}

            {/* Categories */}
            <Carousel responsive={responsive} className="categories__slider">
                {
                    sliderItems.map((item, index) => (
                        <div className="categories__slider_items"
                            key={index}
                            style={{ backgroundImage: `url(${item.bgImg})` }}
                        >
                            <p>{item.title}</p>
                        </div>
                    ))
                }
            </Carousel>
            {/* Featured */}
            <div className="container">
                <div className="featured">
                    <div className="section__title">
                        <h2>Sản phẩm nổi bật</h2>
                    </div>
                    {renderfeaturedProducts(featuredProducts)}
                </div>
            </div>

            {/* Banner */}
            <div className="container">
                <div className="banner">
                    {
                        bannerHomepage.map((banner, i) => (
                            <div
                                key={i} className="banner__pic"
                            >
                                <img src={banner.bgImg} alt={`banner-${i}`} />
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>

    );
}

export default HomePage;