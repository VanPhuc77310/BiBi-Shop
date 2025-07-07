import { ROUTES } from "../utils/router";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from "../pages/user/HomePage/HomePage";

const renderUserRoutes = () => {
    return (
        <Routes>
            <Route path={ROUTES.USER.HOME} element={<HomePage />} />
            <Route path={ROUTES.USER.NOT_FOUND} element={<div className="page-not-found" role="alert">404. NOT FOUND</div>} />
        </Routes>
    );
}

const RouterComponent = () => {
    return (
        <Router>
            {renderUserRoutes()}
        </Router>
    );
};

export default RouterComponent;