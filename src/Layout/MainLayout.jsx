import React, { useEffect } from "react";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import { useLocation } from "react-router";

function MainLayout(props) {
    const location = useLocation();

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    }, [location]);
    return (
        <>
            <Header />
            {props.children}
            <Footer />
        </>
    );
}

export default MainLayout;
