import React, { useEffect } from "react";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import { useLocation } from "react-router";
import Messages from "../components/Layout/Messages";

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
            <Messages />
            <Header />
            {props.children}
            <Footer />
        </>
    );
}

export default MainLayout;
