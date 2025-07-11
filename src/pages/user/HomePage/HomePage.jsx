import React from "react";
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



const HomePage = () => {

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

    const handleAddToCart = (product) => {

    };

    const featuredProducts = {
        all: {
            title: "Toàn bộ",
            products: [
                { img: thitBoNac, name: "Thịt bò nạc", price: 10000 },
                { img: thitBoMy, name: "Thịt bò Mỹ", price: 20000 },
                { img: chuoi, name: "Chuối", price: 5000 },
                { img: duaHau, name: "Dưa hấu", price: 15000 },
                { img: hamburger, name: "Hamburger", price: 30000 },
                { img: khoaiTayChien, name: "Khoai tây chiên", price: 12000 },
                { img: mangCut, name: "Măng cụt", price: 25000 },
                { img: oi, name: "Ổi", price: 8000 },
            ]
        },
        freshMeat: {
            title: "Thịt tươi",
            products: [
                { img: thitBoNac, name: "Thịt bò nạc", price: 10000 },
                { img: thitBoMy, name: "Thịt bò Mỹ", price: 20000 },
            ]
        },
        fruits: {
            title: "Trái cây",
            products: [
                { img: chuoi, name: "Chuối", price: 5000 },
                { img: duaHau, name: "Dưa hấu", price: 15000 },
                { img: mangCut, name: "Măng cụt", price: 25000 },
                { img: oi, name: "Ổi", price: 8000 },
            ]
        },
        fastFood: {
            title: "Thức ăn nhanh",
            products: [
                { img: hamburger, name: "Hamburger", price: 30000 },
                { img: khoaiTayChien, name: "Khoai tây chiên", price: 12000 },
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
                            <div className="featured__product" key={idx}>
                                <img src={item.img} alt={item.name} />

                                <div className="featured__product-info">
                                    <h4>{item.name}</h4>
                                    <p>{item.price.toLocaleString()} đ</p>
                                    <div
                                        className="btn-add-to-cart"
                                        onClick={() => handleAddToCart(item)}
                                    >
                                        <AiOutlineShoppingCart />
                                        Thêm vào giỏ
                                    </div>
                                </div>
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