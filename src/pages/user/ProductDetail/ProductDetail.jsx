import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useCart } from "../../../context/CartContext";
import { AiOutlineShoppingCart, AiOutlineHeart, AiOutlineShareAlt, AiOutlineZoomIn, AiOutlineArrowLeft } from "react-icons/ai";
import { formatPrice } from "../../../utils/format";
import "./ProductDetail.scss";
import chuoi from "../../../assets/user/images/listItem/chuoi.jpg";
import duaHau from "../../../assets/user/images/listItem/dua_hau.jpg";
import hamburger from "../../../assets/user/images/listItem/hamburger.jpg";
import khoaiTayChien from "../../../assets/user/images/listItem/khoaitay_chien.jpg";
import mangCut from "../../../assets/user/images/listItem/mangcut.jpg";
import oi from "../../../assets/user/images/listItem/oi.jpg";
import thitBoNac from "../../../assets/user/images/listItem/thitbo.jpg";
import thitBoMy from "../../../assets/user/images/listItem/thitbo_my.jpg";
import caNgu from "../../../assets/user/images/listItem/ca_ngu.jpg";
import pate from "../../../assets/user/images/listItem/pate.jpg";

const ProductDetail = () => {
    const { id } = useParams();
    const { addToCart } = useCart();
    const [selectedImage, setSelectedImage] = useState(0);
    const [quantity, setQuantity] = useState(1);
    const [showZoom, setShowZoom] = useState(false);
    const [notification, setNotification] = useState({ show: false, message: "" });

    const products = {
        "chuoi": {
            id: "chuoi",
            name: "Chuối tươi",
            price: 5000,
            originalPrice: 7000,
            images: [chuoi, chuoi, chuoi, chuoi],
            category: "Trái cây",
            description: "Chuối tươi ngon, giàu dinh dưỡng, tốt cho sức khỏe. Chuối chứa nhiều kali, vitamin B6 và chất xơ.",
            details: {
                "Xuất xứ": "Việt Nam",
                "Trọng lượng": "1kg",
                "Tình trạng": "Tươi mới",
                "Bảo quản": "Nhiệt độ phòng",
                "Hạn sử dụng": "7 ngày"
            },
            inStock: true,
            rating: 4.5,
            reviews: 128,
            sold: 1500
        },
        "thit-bo-nac": {
            id: "thit-bo-nac",
            name: "Thịt bò nạc",
            price: 10000,
            originalPrice: 12000,
            images: [thitBoNac, thitBoNac, thitBoNac, thitBoNac],
            category: "Thịt tươi",
            description: "Thịt bò nạc tươi ngon, giàu protein, ít mỡ. Thích hợp cho các món ăn lành mạnh và chế độ ăn kiêng.",
            details: {
                "Xuất xứ": "Việt Nam",
                "Trọng lượng": "500g",
                "Tình trạng": "Tươi mới",
                "Bảo quản": "Tủ lạnh",
                "Hạn sử dụng": "3 ngày"
            },
            inStock: true,
            rating: 4.8,
            reviews: 89,
            sold: 2300
        },
        "thit-bo-my": {
            id: "thit-bo-my",
            name: "Thịt bò Mỹ",
            price: 20000,
            originalPrice: 25000,
            images: [thitBoMy, thitBoMy, thitBoMy, thitBoMy],
            category: "Thịt tươi",
            description: "Thịt bò Mỹ cao cấp, thơm ngon, mềm mại. Được nhập khẩu trực tiếp từ Mỹ với chất lượng cao nhất.",
            details: {
                "Xuất xứ": "Mỹ",
                "Trọng lượng": "500g",
                "Tình trạng": "Tươi mới",
                "Bảo quản": "Tủ lạnh",
                "Hạn sử dụng": "5 ngày"
            },
            inStock: true,
            rating: 4.9,
            reviews: 67,
            sold: 890
        },
        "dua-hau": {
            id: "dua-hau",
            name: "Dưa hấu",
            price: 15000,
            originalPrice: 18000,
            images: [duaHau, duaHau, duaHau, duaHau],
            category: "Trái cây",
            description: "Dưa hấu ngọt mát, giàu vitamin C và chất chống oxy hóa. Giải nhiệt tốt trong mùa hè.",
            details: {
                "Xuất xứ": "Việt Nam",
                "Trọng lượng": "3kg",
                "Tình trạng": "Tươi mới",
                "Bảo quản": "Tủ lạnh",
                "Hạn sử dụng": "5 ngày"
            },
            inStock: true,
            rating: 4.6,
            reviews: 156,
            sold: 890
        },
        "hamburger": {
            id: "hamburger",
            name: "Hamburger",
            price: 30000,
            originalPrice: 35000,
            images: [hamburger, hamburger, hamburger, hamburger],
            category: "Thức ăn nhanh",
            description: "Hamburger thơm ngon với thịt bò, rau xanh và sốt đặc biệt. Bữa ăn nhanh tiện lợi.",
            details: {
                "Xuất xứ": "Việt Nam",
                "Trọng lượng": "250g",
                "Tình trạng": "Nóng hổi",
                "Bảo quản": "Ăn ngay",
                "Hạn sử dụng": "1 ngày"
            },
            inStock: true,
            rating: 4.3,
            reviews: 234,
            sold: 1200
        },
        "khoai-tay-chien": {
            id: "khoai-tay-chien",
            name: "Khoai tây chiên",
            price: 12000,
            originalPrice: 15000,
            images: [khoaiTayChien, khoaiTayChien, khoaiTayChien, khoaiTayChien],
            category: "Thức ăn nhanh",
            description: "Khoai tây chiên giòn rụm, thơm ngon. Được chế biến từ khoai tây tươi, chiên trong dầu thực vật.",
            details: {
                "Xuất xứ": "Việt Nam",
                "Trọng lượng": "200g",
                "Tình trạng": "Nóng hổi",
                "Bảo quản": "Ăn ngay",
                "Hạn sử dụng": "1 ngày"
            },
            inStock: true,
            rating: 4.4,
            reviews: 189,
            sold: 2100
        },
        "mang-cut": {
            id: "mang-cut",
            name: "Măng cụt",
            price: 25000,
            originalPrice: 30000,
            images: [mangCut, mangCut, mangCut, mangCut],
            category: "Trái cây",
            description: "Măng cụt ngọt thanh, thơm ngon. Được mệnh danh là nữ hoàng trái cây với hương vị đặc biệt.",
            details: {
                "Xuất xứ": "Việt Nam",
                "Trọng lượng": "1kg",
                "Tình trạng": "Tươi mới",
                "Bảo quản": "Tủ lạnh",
                "Hạn sử dụng": "7 ngày"
            },
            inStock: true,
            rating: 4.7,
            reviews: 95,
            sold: 650
        },
        "oi": {
            id: "oi",
            name: "Ổi",
            price: 8000,
            originalPrice: 10000,
            images: [oi, oi, oi, oi],
            category: "Trái cây",
            description: "Ổi giòn ngọt, giàu vitamin C. Thích hợp cho việc làm nước ép hoặc ăn trực tiếp.",
            details: {
                "Xuất xứ": "Việt Nam",
                "Trọng lượng": "1kg",
                "Tình trạng": "Tươi mới",
                "Bảo quản": "Nhiệt độ phòng",
                "Hạn sử dụng": "5 ngày"
            },
            inStock: true,
            rating: 4.2,
            reviews: 112,
            sold: 1800
        },
        "ca-ngu": {
            id: "ca-ngu",
            name: "Cá ngừ",
            price: 10000,
            originalPrice: 12000,
            images: [caNgu, caNgu, caNgu, caNgu],
            category: "Thịt tươi",
            description: "Cá ngừ tươi ngon, giàu dinh dưỡng, thích hợp cho các món ăn như sashimi, nướng, kho.",
            details: {
                "Xuất xứ": "Việt Nam",
                "Trọng lượng": "500g",
                "Tình trạng": "Tươi mới",
                "Bảo quản": "Tủ lạnh",
                "Hạn sử dụng": "3 ngày"
            },
            inStock: true,
            rating: 4.7,
            reviews: 102,
            sold: 900
        },
        "pate": {
            id: "pate",
            name: "Pate",
            price: 20000,
            originalPrice: 25000,
            images: [pate, pate, pate, pate],
            category: "Thức ăn nhanh",
            description: "Pate thơm ngon, béo ngậy, dùng ăn kèm bánh mì hoặc các món ăn khác.",
            details: {
                "Xuất xứ": "Pháp",
                "Trọng lượng": "200g",
                "Tình trạng": "Đóng hộp",
                "Bảo quản": "Nhiệt độ phòng",
                "Hạn sử dụng": "6 tháng"
            },
            inStock: true,
            rating: 4.5,
            reviews: 88,
            sold: 700
        }
    };

    // Sản phẩm liên quan dựa trên category
    const getRelatedProducts = (currentProduct) => {
        const allProducts = [
            {
                id: "mang-cut",
                name: "Măng cụt",
                price: 25000,
                image: mangCut,
                category: "Trái cây"
            },
            {
                id: "oi",
                name: "Ổi",
                price: 8000,
                image: oi,
                category: "Trái cây"
            },
            {
                id: "khoai-tay-chien",
                name: "Khoai tây chiên",
                price: 12000,
                image: khoaiTayChien,
                category: "Thức ăn nhanh"
            },
            {
                id: "thit-bo-my",
                name: "Thịt bò Mỹ",
                price: 20000,
                image: thitBoMy,
                category: "Thịt tươi"
            },
            {
                id: "chuoi",
                name: "Chuối tươi",
                price: 5000,
                image: chuoi,
                category: "Trái cây"
            },
            {
                id: "dua-hau",
                name: "Dưa hấu",
                price: 15000,
                image: duaHau,
                category: "Trái cây"
            },
            {
                id: "hamburger",
                name: "Hamburger",
                price: 30000,
                image: hamburger,
                category: "Thức ăn nhanh"
            },
            {
                id: "thit-bo-nac",
                name: "Thịt bò nạc",
                price: 10000,
                image: thitBoNac,
                category: "Thịt tươi"
            }
        ];

        // Lọc ra sản phẩm cùng category và khác ID
        return allProducts
            .filter(p => p.category === currentProduct.category && p.id !== currentProduct.id)
            .slice(0, 4); // Chỉ lấy 4 sản phẩm
    };

    const product = products[id];
    const relatedProducts = product ? getRelatedProducts(product) : [];

    useEffect(() => {
        if (!product) {
            window.location.href = '/';
        }
    }, [product]);

    if (!product) {
        return <div>Loading...</div>;
    }

    const handleAddToCart = (e) => {
        e.stopPropagation(); // Ngăn event bubble
        addToCart({
            img: product.images[0],
            name: product.name,
            price: product.price
        });
        setNotification({ show: true, message: `Đã thêm "${product.name}" vào giỏ hàng!` });
        setTimeout(() => {
            setNotification({ show: false, message: "" });
        }, 3000);
    };

    const handleQuantityChange = (newQuantity) => {
        if (newQuantity >= 1) {
            setQuantity(newQuantity);
        }
    };

    const handleImageClick = (index) => {
        setSelectedImage(index);
    };

    const handleZoomToggle = () => {
        setShowZoom(!showZoom);
    };

    const renderStars = (rating) => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            stars.push(
                <span key={i} className={`star ${i <= rating ? 'filled' : ''}`}>
                    ★
                </span>
            );
        }
        return stars;
    };

    return (
        <div className="product-detail-page">
            {/* Notification */}
            {notification.show && (
                <div className="notification-toast">
                    <div className="notification-content">
                        <span className="notification-message">{notification.message}</span>
                        <button
                            className="notification-close"
                            onClick={() => setNotification({ show: false, message: "" })}
                        >
                            ×
                        </button>
                    </div>
                </div>
            )}

            <div className="container">
                {/* Breadcrumb */}
                <div className="breadcrumb">
                    <Link to="/" className="breadcrumb-item">
                        <AiOutlineArrowLeft />
                        Trang chủ
                    </Link>
                    <span className="breadcrumb-separator">/</span>
                    <span className="breadcrumb-item">{product.category}</span>
                    <span className="breadcrumb-separator">/</span>
                    <span className="breadcrumb-item active">{product.name}</span>
                </div>

                <div className="product-content">
                    {/* Product Images */}
                    <div className="product-images">
                        <div className="main-image-container">
                            <img
                                src={product.images[selectedImage]}
                                alt={product.name}
                                className={`main-image ${showZoom ? 'zoomed' : ''}`}
                                onClick={handleZoomToggle}
                            />
                            <button className="zoom-btn" onClick={handleZoomToggle}>
                                <AiOutlineZoomIn />
                            </button>
                        </div>
                        <div className="thumbnail-images">
                            {product.images.map((image, index) => (
                                <img
                                    key={index}
                                    src={image}
                                    alt={`${product.name} ${index + 1}`}
                                    className={`thumbnail ${selectedImage === index ? 'active' : ''}`}
                                    onClick={() => handleImageClick(index)}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Product Info */}
                    <div className="product-info">
                        <div className="product-header">
                            <h1 className="product-name">{product.name}</h1>
                            <div className="product-rating">
                                <div className="stars">
                                    {renderStars(product.rating)}
                                </div>
                                <span className="rating-text">{product.rating}/5</span>
                                <span className="reviews">({product.reviews} đánh giá)</span>
                            </div>
                            <div className="product-meta">
                                <span className="category">{product.category}</span>
                                <span className="sold">Đã bán {product.sold}</span>
                            </div>
                        </div>

                        <div className="product-price">
                            <span className="current-price">{formatPrice(product.price)}</span>
                            {product.originalPrice > product.price && (
                                <span className="original-price">{formatPrice(product.originalPrice)}</span>
                            )}
                            {product.originalPrice > product.price && (
                                <span className="discount">
                                    -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                                </span>
                            )}
                        </div>

                        <div className="product-description">
                            <h3>Mô tả sản phẩm</h3>
                            <p>{product.description}</p>
                        </div>

                        <div className="product-details">
                            <h3>Thông tin chi tiết</h3>
                            <div className="details-grid">
                                {Object.entries(product.details).map(([key, value]) => (
                                    <div key={key} className="detail-item">
                                        <span className="detail-label">{key}:</span>
                                        <span className="detail-value">{value}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="product-actions">
                            <div className="quantity-selector">
                                <label>Số lượng:</label>
                                <div className="quantity-controls">
                                    <button
                                        className="quantity-btn"
                                        onClick={() => handleQuantityChange(quantity - 1)}
                                        disabled={quantity <= 1}
                                    >
                                        -
                                    </button>
                                    <span className="quantity-display">{quantity}</span>
                                    <button
                                        className="quantity-btn"
                                        onClick={() => handleQuantityChange(quantity + 1)}
                                    >
                                        +
                                    </button>
                                </div>
                            </div>

                            <div className="action-buttons">
                                <button
                                    className="btn-add-to-cart"
                                    onClick={(e) => handleAddToCart(e)}
                                    disabled={!product.inStock}
                                >
                                    <AiOutlineShoppingCart />
                                    Thêm vào giỏ hàng
                                </button>
                                <button className="btn-wishlist">
                                    <AiOutlineHeart />
                                </button>
                                <button className="btn-share">
                                    <AiOutlineShareAlt />
                                </button>
                            </div>

                            {!product.inStock && (
                                <div className="out-of-stock">
                                    <p>Sản phẩm tạm hết hàng</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Related Products */}
                <div className="related-products">
                    <h2>Sản phẩm liên quan</h2>
                    <div className="related-products-grid">
                        {relatedProducts.map((relatedProduct) => (
                            <div key={relatedProduct.id} className="related-product">
                                <Link to={`/product/${relatedProduct.id}`} className="related-product-link">
                                    <img src={relatedProduct.image} alt={relatedProduct.name} />
                                    <div className="related-product-info">
                                        <h3>{relatedProduct.name}</h3>
                                        <p className="price">{formatPrice(relatedProduct.price)}</p>
                                        <span className="category">{relatedProduct.category}</span>
                                    </div>
                                </Link>
                                <button
                                    className="related-product-add-btn"
                                    onClick={() => {
                                        addToCart({
                                            img: relatedProduct.image,
                                            name: relatedProduct.name,
                                            price: relatedProduct.price
                                        });
                                        setNotification({
                                            show: true,
                                            message: `Đã thêm "${relatedProduct.name}" vào giỏ hàng!`
                                        });
                                        setTimeout(() => {
                                            setNotification({ show: false, message: "" });
                                        }, 3000);
                                    }}
                                >
                                    <AiOutlineShoppingCart />
                                    Thêm vào giỏ
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail; 