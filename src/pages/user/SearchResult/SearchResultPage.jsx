import React, { useMemo, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { AiOutlineShoppingCart } from "react-icons/ai";
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
import { formatPrice } from "../../../utils/format";
import "./SearchResultPage.scss";

const allProducts = [
    { id: "thit-bo-nac", img: thitBoNac, name: "Thịt bò nạc", price: 10000, category: "Thịt tươi" },
    { id: "thit-bo-my", img: thitBoMy, name: "Thịt bò Mỹ", price: 20000, category: "Thịt tươi" },
    { id: "ca-ngu", img: caNgu, name: "Cá ngừ", price: 12000, category: "Thịt tươi" },
    { id: "chuoi", img: chuoi, name: "Chuối", price: 5000, category: "Trái cây" },
    { id: "dua-hau", img: duaHau, name: "Dưa hấu", price: 15000, category: "Trái cây" },
    { id: "mang-cut", img: mangCut, name: "Măng cụt", price: 25000, category: "Trái cây" },
    { id: "oi", img: oi, name: "Ổi", price: 8000, category: "Trái cây" },
    { id: "hamburger", img: hamburger, name: "Hamburger", price: 30000, category: "Thức ăn nhanh" },
    { id: "khoai-tay-chien", img: khoaiTayChien, name: "Khoai tây chiên", price: 12000, category: "Thức ăn nhanh" },
    { id: "pate", img: pate, name: "Pate", price: 20000, category: "Thức ăn nhanh" },
];

const categories = [
    "Thịt tươi",
    "Trái cây",
    "Thức ăn nhanh"
];

const priceRanges = [
    { label: "Dưới 10.000₫", min: 0, max: 10000 },
    { label: "10.000₫ - 20.000₫", min: 10000, max: 20000 },
    { label: "20.000₫ - 30.000₫", min: 20000, max: 30000 },
    { label: "Trên 30.000₫", min: 30000, max: Infinity },
];

const sortOptions = [
    { value: "default", label: "Mặc định" },
    { value: "price_asc", label: "Giá tăng dần" },
    { value: "price_desc", label: "Giá giảm dần" },
    { value: "name_asc", label: "Tên A-Z" },
    { value: "name_desc", label: "Tên Z-A" },
];

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

// Thêm mapping cho filter category
const CATEGORY_MAP = {
    "meat-fish": ["thit-bo-nac", "thit-bo-my", "ca-ngu"],
    "fastfood": ["hamburger", "khoai-tay-chien", "pate"],
    "vegetable": ["mang-cut", "oi", "dua-hau", "chuoi"]
};

const PAGE_SIZE = 6;

const SearchResultPage = () => {
    const query = useQuery();
    const keyword = query.get("q") || "";
    const categoryParam = query.get("category");
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [selectedPrice, setSelectedPrice] = useState(null);
    const [sort, setSort] = useState("default");
    const [page, setPage] = useState(1);

    // Lọc sản phẩm theo category param hoặc từ khóa, danh mục, khoảng giá
    const filteredProducts = useMemo(() => {
        let result = allProducts;
        if (categoryParam && CATEGORY_MAP[categoryParam]) {
            result = result.filter(p => CATEGORY_MAP[categoryParam].includes(p.id));
        } else {
            // Lọc theo từ khóa nếu không có category param
            result = result.filter(p =>
                p.name.toLowerCase().includes(keyword.toLowerCase())
            );
        }
        if (selectedCategories.length > 0) {
            result = result.filter(p => selectedCategories.includes(p.category));
        }
        if (selectedPrice) {
            result = result.filter(p => p.price >= selectedPrice.min && p.price < selectedPrice.max);
        }
        switch (sort) {
            case "price_asc":
                result = [...result].sort((a, b) => a.price - b.price);
                break;
            case "price_desc":
                result = [...result].sort((a, b) => b.price - a.price);
                break;
            case "name_asc":
                result = [...result].sort((a, b) => a.name.localeCompare(b.name));
                break;
            case "name_desc":
                result = [...result].sort((a, b) => b.name.localeCompare(a.name));
                break;
            default:
                break;
        }
        return result;
    }, [keyword, selectedCategories, selectedPrice, sort, categoryParam]);

    // Phân trang
    const totalPages = Math.ceil(filteredProducts.length / PAGE_SIZE);
    const pagedProducts = filteredProducts.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

    // Xử lý chọn category (checkbox)
    const handleCategoryChange = (cat) => {
        setPage(1);
        setSelectedCategories(prev =>
            prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
        );
    };
    // Xử lý chọn price range
    const handlePriceChange = (range) => {
        setPage(1);
        setSelectedPrice(range === selectedPrice ? null : range);
    };
    // Xử lý sort
    const handleSortChange = (e) => {
        setSort(e.target.value);
        setPage(1);
    };
    // Xử lý chuyển trang
    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) setPage(newPage);
    };

    return (
        <div className="search-result-page">
            <div className="search-bar-info">
                <h2>Kết quả tìm kiếm cho: <span style={{ color: '#0e7a6c' }}>&quot;{keyword}&quot;</span></h2>
            </div>
            <div className="search-main">
                {/* FILTER */}
                <div className="search-filter">
                    <h4>Bộ lọc</h4>
                    <div style={{ marginBottom: 18 }}>
                        <div style={{ fontWeight: 600, marginBottom: 6 }}>Danh mục</div>
                        {categories.map(cat => (
                            <label key={cat}>
                                <input
                                    type="checkbox"
                                    checked={selectedCategories.includes(cat)}
                                    onChange={() => handleCategoryChange(cat)}
                                />
                                {cat}
                            </label>
                        ))}
                    </div>
                    <div style={{ marginBottom: 18 }}>
                        <div style={{ fontWeight: 600, marginBottom: 6 }}>Khoảng giá</div>
                        {priceRanges.map(range => (
                            <label key={range.label}>
                                <input
                                    type="radio"
                                    checked={selectedPrice === range}
                                    onChange={() => handlePriceChange(range)}
                                />
                                {range.label}
                            </label>
                        ))}
                    </div>
                </div>
                {/* MAIN CONTENT */}
                <div style={{ flex: 1 }}>
                    <div className="search-filter-sort">
                        <span>Sắp xếp:</span>
                        <select value={sort} onChange={handleSortChange}>
                            {sortOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
                        </select>
                    </div>
                    <div className="search-result-list">
                        {pagedProducts.length === 0 ? (
                            <div style={{ fontStyle: 'italic', color: '#888', fontSize: 18 }}>Không tìm thấy sản phẩm phù hợp.</div>
                        ) : (
                            pagedProducts.map(product => (
                                <Link to={`/product/${product.id}`} key={product.id} className="product-card">
                                    <img src={product.img} alt={product.name} />
                                    <div className="product-info">
                                        <h4>{product.name}</h4>
                                        <p>{formatPrice(product.price)}</p>
                                    </div>
                                    <span className="product-cart-icon"><AiOutlineShoppingCart /></span>
                                </Link>
                            ))
                        )}
                    </div>
                    {/* PAGINATION */}
                    {totalPages > 1 && (
                        <div className="pagination">
                            <button onClick={() => handlePageChange(page - 1)} disabled={page === 1}>&lt;</button>
                            {Array.from({ length: totalPages }, (_, i) => (
                                <button
                                    key={i + 1}
                                    onClick={() => handlePageChange(i + 1)}
                                    className={page === i + 1 ? "active" : ""}
                                >
                                    {i + 1}
                                </button>
                            ))}
                            <button onClick={() => handlePageChange(page + 1)} disabled={page === totalPages}>&gt;</button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SearchResultPage; 