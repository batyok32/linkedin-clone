import React, { useEffect } from "react";
import { useLocation } from "react-router";

function AuthLayout(props) {
    const location = useLocation();

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    }, [location]);
    return (
        <div style={{ background: "#f5f5f5" }}>
            {/* Nav */}
            {props.children}
            {/* Footer */}
        </div>
    );
}

export default AuthLayout;
