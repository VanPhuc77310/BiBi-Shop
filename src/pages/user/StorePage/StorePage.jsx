import React, { useState } from "react";
import "./StorePage.scss";
import store1 from "../../../assets/user/images/store/cuahang1.jpg";
import store2 from "../../../assets/user/images/store/cuahang2.jpg";
import store3 from "../../../assets/user/images/store/cuahang3.jpg";
import store4 from "../../../assets/user/images/store/cuahang4.jpg";
import store5 from "../../../assets/user/images/store/cuahang5.jpg";
import store6 from "../../../assets/user/images/store/cuahang6.jpg";
import store7 from "../../../assets/user/images/store/cuahang7.jpg";
import store8 from "../../../assets/user/images/store/cuahang8.jpg";
import store9 from "../../../assets/user/images/store/cuahang9.jpg";
import store10 from "../../../assets/user/images/store/cuahang10.jpg";
import StoreDetail from "./StoreDetail/StoreDetail";

const STORES = [
    {
        id: 1,
        name: "BiBi Mart Quận 1",
        image: store1,
        description: "Cửa hàng thực phẩm sạch, đa dạng mặt hàng, phục vụ tận tình.",
        rating: 4.8,
        location: "123 Lê Lợi, Quận 1, TP.HCM"
    },
    {
        id: 2,
        name: "BiBi Mart Quận 3",
        image: store2,
        description: "Chuyên rau củ quả tươi, thịt cá nhập khẩu, giá tốt.",
        rating: 4.6,
        location: "45 Nguyễn Thị Minh Khai, Quận 3, TP.HCM"
    },
    {
        id: 3,
        name: "BiBi Mart Quận 7",
        image: store3,
        description: "Không gian rộng rãi, nhiều combo ưu đãi, giao hàng nhanh.",
        rating: 4.9,
        location: "88 Phú Mỹ Hưng, Quận 7, TP.HCM"
    },
    {
        id: 4,
        name: "BiBi Mart Thủ Đức",
        image: store4,
        description: "Thực phẩm hữu cơ, nguồn gốc rõ ràng, nhân viên thân thiện.",
        rating: 4.7,
        location: "12 Võ Văn Ngân, Thủ Đức, TP.HCM"
    },
    {
        id: 5,
        name: "BiBi Mart Bình Thạnh",
        image: store5,
        description: "Đầy đủ thực phẩm tươi sống, giao hàng tận nơi trong ngày.",
        rating: 4.5,
        location: "77 Điện Biên Phủ, Bình Thạnh, TP.HCM"
    },
    {
        id: 6,
        name: "BiBi Mart Gò Vấp",
        image: store6,
        description: "Thực phẩm sạch, giá tốt, phục vụ tận tâm.",
        rating: 4.7,
        location: "22 Quang Trung, Gò Vấp, TP.HCM"
    },
    {
        id: 7,
        name: "BiBi Mart Tân Bình",
        image: store7,
        description: "Nhiều mặt hàng nhập khẩu, không gian hiện đại.",
        rating: 4.8,
        location: "99 Cộng Hòa, Tân Bình, TP.HCM"
    },
    {
        id: 8,
        name: "BiBi Mart Phú Nhuận",
        image: store8,
        description: "Chuyên thực phẩm hữu cơ, rau củ quả sạch.",
        rating: 4.6,
        location: "11 Phan Đăng Lưu, Phú Nhuận, TP.HCM"
    },
    {
        id: 9,
        name: "BiBi Mart Quận 10",
        image: store9,
        description: "Đa dạng thực phẩm, giao hàng nhanh chóng.",
        rating: 4.5,
        location: "55 Thành Thái, Quận 10, TP.HCM"
    },
    {
        id: 10,
        name: "BiBi Mart Quận 5",
        image: store10,
        description: "Thực phẩm tươi sống, giá cả hợp lý.",
        rating: 4.7,
        location: "101 Trần Hưng Đạo, Quận 5, TP.HCM"
    },
];

const PAGE_SIZE = 9;

const StorePage = () => {
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const [filterRating, setFilterRating] = useState(false);
    // const [filterDelivery, setFilterDelivery] = useState(false); // placeholder nếu muốn mở rộng
    const [selectedStore, setSelectedStore] = useState(null);

    // Lọc theo search và filter
    const filtered = STORES.filter(store => {
        const matchSearch =
            store.name.toLowerCase().includes(search.toLowerCase()) ||
            store.location.toLowerCase().includes(search.toLowerCase());
        const matchRating = !filterRating || store.rating >= 4.7;
        // const matchDelivery = !filterDelivery || ... // nếu có logic giao hàng trong ngày
        return matchSearch && matchRating;
    });
    const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
    const pagedStores = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

    // Reset về trang 1 khi filter/search thay đổi
    React.useEffect(() => { setPage(1); }, [search, filterRating]);

    return (
        <div className="storepage__container">
            <aside className="storepage__sidebar">
                <h3>Bộ lọc</h3>
                <div>
                    <label>
                        <input
                            type="checkbox"
                            checked={filterRating}
                            onChange={e => setFilterRating(e.target.checked)}
                        /> Đánh giá trên 4.7
                    </label>
                    {/*
          <label>
            <input
              type="checkbox"
              checked={filterDelivery}
              onChange={e => setFilterDelivery(e.target.checked)}
            /> Giao hàng trong ngày
          </label>
          */}
                </div>
            </aside>
            <main className="storepage__main">
                <div className="storepage__searchbar">
                    <input
                        type="text"
                        placeholder="Tìm kiếm cửa hàng, địa điểm..."
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                    />
                </div>
                <div className="storepage__list">
                    {pagedStores.map(store => (
                        <div
                            className="storecard"
                            key={store.id}
                            onClick={() => setSelectedStore(store)}
                            style={{ cursor: 'pointer' }}
                        >
                            <div className="storecard__imgwrap">
                                <img src={store.image} alt={store.name} />
                            </div>
                            <div className="storecard__info">
                                <h4>{store.name}</h4>
                                <p className="desc">{store.description}</p>
                                <div className="rating">Đánh giá: <b>{store.rating}</b> ⭐</div>
                                <div className="location">📍 {store.location}</div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="storepage__pagination">
                    {Array.from({ length: totalPages }, (_, i) => (
                        <button
                            key={i}
                            className={page === i + 1 ? "active" : ""}
                            onClick={() => setPage(i + 1)}
                        >{i + 1}</button>
                    ))}
                </div>
            </main>
            <StoreDetail store={selectedStore} onBack={() => setSelectedStore(null)} />
        </div>
    );
};

export default StorePage; 