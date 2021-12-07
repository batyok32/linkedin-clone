import React from "react";
import { Link } from "react-router-dom";

function Hello() {
    return (
        <div className="container">
            <div className="row my-3 my-md-5">
                <div className="col-12 col-md-6">
                    <h1 className="hello-big-text ps-4 ps-md-0">
                        Добро пожаловать в сообщество специалистов!
                    </h1>
                    <div className="d-flex my-md-5 my-3 flex-wrap ps-4 ps-md-0 justify-content-md-start">
                        <Link
                            to="/"
                            className="text-decoration-none blue-btn me-3 my-2 my-md-0"
                        >
                            Разместить вакансию
                        </Link>
                        <Link to="/" className="text-decoration-none join-btn">
                            Найти вакансию
                        </Link>
                    </div>
                </div>
                <div className="col-md-6 d-none d-md-inline-flex justify-content-center  my-4 my-md-0">
                    <img
                        className="img-fluid mx-auto hello-img position-absolute"
                        // style={{ width: "600px" }}
                        src={process.env.PUBLIC_URL + "/images/hero-login.svg"}
                        alt="Hero"
                    />
                </div>
            </div>
        </div>
    );
}

export default Hello;
