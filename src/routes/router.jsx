import { ROUTES } from "../utils/router";
import { Route, Routes } from 'react-router-dom';
import HomePage from "../pages/user/HomePage/HomePage";
import CartPage from "../pages/user/CartPage/CartPage";
import ProductDetail from "../pages/user/ProductDetail/ProductDetail";
import SearchResultPage from "../pages/user/SearchResult/SearchResultPage";
import UserProfilePage from "../pages/user/UserProfile/UserProfilePage";
import StorePage from "../pages/user/StorePage/StorePage";
import BlogPage from "../pages/user/BlogPage/BlogPage";

const renderUserRoutes = () => {
    return (
        <Routes>
            <Route path={ROUTES.USER.HOME} element={<HomePage />} />
            <Route path={ROUTES.USER.CART} element={<CartPage />} />
            <Route path={ROUTES.USER.PRODUCT_DETAIL} element={<ProductDetail />} />
            <Route path={ROUTES.USER.SEARCH} element={<SearchResultPage />} />
            <Route path={ROUTES.USER.PROFILE} element={<UserProfilePage />} />
            <Route path={ROUTES.USER.STORE} element={<StorePage />} />
            <Route path={ROUTES.USER.BLOG} element={<BlogPage />} />
            <Route path={ROUTES.USER.NOT_FOUND} element={<div className="page-not-found" role="alert">404. NOT FOUND</div>} />
        </Routes>
    );
}

const RouterComponent = () => {
    return renderUserRoutes();
};

export default RouterComponent;