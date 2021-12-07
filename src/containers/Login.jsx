import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ShortFooter from "../components/Footer/ShortFooter";
import { login } from "../redux/actions/auth";
import { useDispatch } from "react-redux";
import errors from "../redux/messages/errors.json";

export default function Login() {
    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });
    const [isLoading, setIsLoading] = useState(false);
    const [resErrors, setErrors] = useState(null);
    const { username, password } = formData;
    const inputChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    useEffect(() => {
        return () => {
            setFormData({
                username: "",
                password: "",
            });
        };
    }, []);

    // redux
    const dispatch = useDispatch();

    // submit
    const submitHandler = (e) => {
        e.preventDefault();
        setIsLoading(true);
        dispatch(login(username, password)).then((res) => {
            setIsLoading(false);
            if (res === errors.error4) {
                // setErrors(res);
                setErrors("Нет такого пользователя или неверный пароль");
            } else {
                setErrors(null);
            }
        });
    };

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
                    Войти
                </div>
                <div className="p ps-4 ps-md-0">
                    Следите за обновлениями в своей профессиональной сети
                </div>

                <form
                    onSubmit={(e) => submitHandler(e)}
                    className="bg-white p-4 col-md-8 col-lg-4 my-4"
                    style={{ borderRadius: "10px" }}
                >
                    {resErrors && (
                        <div className="mb-4 text-danger text-center">
                            <strong>{resErrors} !</strong>
                        </div>
                    )}
                    <div className="mb-4">
                        <label
                            htmlFor="exampleInputEmail1"
                            className="form-label text-gray py-0 fw-bold"
                            style={{ fontSize: "14px" }}
                        >
                            <i className="bi bi-info-lg fs-6 me-2"></i>
                            Ваше имя <small>(логин)</small>
                        </label>
                        <input
                            type="text"
                            name="username"
                            id="loginUsername"
                            value={username}
                            placeholder="Например: adidas"
                            onChange={(e) => inputChange(e)}
                            required
                            className={`form-control sm-placeholder ${
                                resErrors ? "is-invalid" : ""
                            }`}
                            style={{ borderRadius: "7px" }}
                            aria-describedby="emailHelp"
                        />
                    </div>
                    <div className="mb-3 has-validation">
                        <label
                            htmlFor="exampleInputPassword1"
                            className="form-label text-gray fw-bold py-0 "
                            style={{ fontSize: "14px" }}
                        >
                            <i className="bi bi-unlock me-2 fs-6"></i>
                            Пароль
                        </label>
                        <input
                            type="password"
                            className={`form-control sm-placeholder ${
                                resErrors ? "is-invalid" : ""
                            }`}
                            style={{ borderRadius: "7px" }}
                            name="password"
                            value={password}
                            placeholder="Ваш секретный пароль"
                            id="loginPassword"
                            onChange={(e) => inputChange(e)}
                            required
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    submitHandler(e);
                                }
                            }}
                        />
                    </div>

                    <div className="my-2">
                        <Link
                            to="/"
                            className="text-decoration-none"
                            style={{ fontWeight: 500 }}
                        >
                            Забыли пароль?
                        </Link>
                    </div>

                    <button
                        type="submit"
                        className="btn blue-btn my-2 text-center w-100 "
                    >
                        {isLoading ? (
                            <div
                                className="spinner-border text-white"
                                role="status"
                            >
                                <span className="visually-hidden">
                                    Loading...
                                </span>
                            </div>
                        ) : (
                            <>Войти</>
                        )}
                    </button>

                    <div
                        className="divider my-4"
                        style={{
                            fontSize: "12px",
                            color: "rgba(0, 0, 0, 0.9)",
                        }}
                    >
                        ИЛИ
                    </div>

                    <button type="submit" className="btn sign-btn w-100 px-4">
                        <i className="bi bi-google me-2"></i>
                        Войти с помощью
                    </button>
                    <div className="p my-3 text-center">
                        Не зарегистрированы в LinkedIn?{" "}
                        <Link
                            to="/signup"
                            className="text-decoration-none fw-bold"
                        >
                            Присоединится
                        </Link>
                    </div>
                </form>
                <ShortFooter />
            </div>
        </div>
    );
}
