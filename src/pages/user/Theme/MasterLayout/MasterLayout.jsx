import React from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

const MasterLayout = ({ children, ...props }) => {
    return (
        <div {...props}>
            <Header />
            {/* <h1>Master Layout</h1> */}
            {children}
            <Footer />
        </div>
    );
}

export default MasterLayout;