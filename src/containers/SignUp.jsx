import React, { useState } from "react";
import { Link } from "react-router-dom";
import ShortFooter from "../components/Footer/ShortFooter";
import CompanyProfile from "../components/Register/CompanyProfile/index";
import FreelancerProfile from "../components/Register/FreelancerProfile";
import Form from "../components/Register/Form";

export default function SignUp() {
    const [formData, setFormData] = useState({
        username: "",
        password: "",
        password2: "",
        userType: "COMPANY",
    });
    const [loadProfile, setLoadProfile] = useState(false);
    const { userType } = formData;
    return (
        <div className="container">
            <div className="d-flex  flex-column py-3 align-items-start justify-content-md-center align-items-md-center">
                <Link to="/" className="mx-md-0 mt-2 mb-3 ps-4 ps-md-0">
                    <img
                        style={{ width: "135px", height: "34px" }}
                        src={process.env.PUBLIC_URL + "/images/big-logo.svg"}
                        alt="Logo"
                    />
                </Link>
                <div
                    className="h2 py-2 ps-4 ps-md-0"
                    style={{ fontWeight: 500, fontSize: "32px" }}
                >
                    Регистрация
                </div>
                <div className="p ps-4 ps-md-0">
                    Добейтесь профессионального успеха
                </div>

                <form
                    className="bg-white col-12 p-4 col-md-9 col-lg-6 my-4"
                    className="bg-white col-12 p-4 col-md-9 col-lg-6 my-4"
                    style={{ borderRadius: "10px" }}
                >
                    {!loadProfile && (
                        <Form
                            setFormData={setFormData}
                            formData={formData}
                            setLoadProfile={setLoadProfile}
                        />
                    )}
                    {loadProfile && (
                        <h3 className="text-center mb-4">Профиль</h3>
                    )}
                    {loadProfile &&
                        (userType === "COMPANY" ? (
                            <CompanyProfile userData={formData} />
                        ) : (
                            <FreelancerProfile userData={formData} />
                        ))}

                    <div className="p my-3 text-center">
                        Уже зарегистрированы в LinkedIn?{" "}
                        <Link
                            to="/login"
                            className="text-decoration-none fw-bold"
                        >
                            Войти
                        </Link>
                    </div>
                </form>
                <ShortFooter />
            </div>
        </div>
    );
}
