import React from "react";
import { Link } from "react-router-dom";

function Footer() {
    return (
        <div className="container py-5">
            <div className="row align-items-center">
                <div className="col-lg-3 col-md-6 my-2 px-md-auto px-4 my-md-0">
                    <Link to="/" className="">
                        <img
                            style={{ width: "120px", height: "40px" }}
                            src={
                                process.env.PUBLIC_URL + "/images/big-logo.svg"
                            }
                            alt="Logo"
                        />
                    </Link>
                </div>
                <div className="col-lg-3 col-md-6 px-md-auto px-4">
                    <div className="fw-bold fs-5 my-2">Общая информация</div>
                    <ul className=" p-0" style={{ listStyleType: "none" }}>
                        <li className="fw-bold py-1 fs-6">
                            <Link
                                to="/"
                                className="text-decoration-none text-gray text-gray-hover"
                            >
                                Зарегистрироваться
                            </Link>
                        </li>
                        <li className="fw-bold py-1 fs-6">
                            <Link
                                to="/"
                                className="text-decoration-none text-gray text-gray-hover"
                            >
                                Справка
                            </Link>
                        </li>
                        <li className="fw-bold py-1 fs-6">
                            <Link
                                to="/"
                                className="text-decoration-none text-gray text-gray-hover"
                            >
                                О компании
                            </Link>
                        </li>
                        <li className="fw-bold py-1 fs-6">
                            <Link
                                to="/"
                                className="text-decoration-none text-gray text-gray-hover"
                            >
                                Пресса
                            </Link>
                        </li>
                        <li className="fw-bold py-1 fs-6">
                            <Link
                                to="/"
                                className="text-decoration-none text-gray text-gray-hover"
                            >
                                Блог
                            </Link>
                        </li>
                    </ul>
                </div>

                <div className="col-lg-3 col-md-6 px-md-auto px-4">
                    <div className="fw-bold fs-5 my-2">
                        Просмотр информации в Linkedin
                    </div>
                    <ul className=" p-0" style={{ listStyleType: "none" }}>
                        <li className="fw-bold py-1 fs-6">
                            <Link
                                to="/"
                                className="text-decoration-none text-gray text-gray-hover"
                            >
                                Обучение
                            </Link>
                        </li>
                        <li className="fw-bold py-1 fs-6">
                            <Link
                                to="/"
                                className="text-decoration-none text-gray text-gray-hover"
                            >
                                Вакансии
                            </Link>
                        </li>
                        <li className="fw-bold py-1 fs-6">
                            <Link
                                to="/"
                                className="text-decoration-none text-gray text-gray-hover"
                            >
                                Заработная плата
                            </Link>
                        </li>
                        <li className="fw-bold py-1 fs-6">
                            <Link
                                to="/"
                                className="text-decoration-none text-gray text-gray-hover"
                            >
                                Мобильные приложения
                            </Link>
                        </li>
                        <li className="fw-bold py-1 fs-6">
                            <Link
                                to="/"
                                className="text-decoration-none text-gray text-gray-hover"
                            >
                                Услуги
                            </Link>
                        </li>
                    </ul>
                </div>

                <div className="col-lg-3 col-md-6  px-md-auto px-4">
                    <div className="fw-bold fs-5 my-2 ">Каталоги</div>
                    <ul className=" p-0" style={{ listStyleType: "none" }}>
                        <li className="fw-bold py-1 fs-6">
                            <Link
                                to="/"
                                className="text-decoration-none text-gray text-gray-hover"
                            >
                                Участники
                            </Link>
                        </li>
                        <li className="fw-bold py-1 fs-6">
                            <Link
                                to="/"
                                className="text-decoration-none text-gray text-gray-hover"
                            >
                                Справка
                            </Link>
                        </li>
                        <li className="fw-bold py-1 fs-6">
                            <Link
                                to="/"
                                className="text-decoration-none text-gray text-gray-hover"
                            >
                                О компании
                            </Link>
                        </li>
                        <li className="fw-bold py-1 fs-6">
                            <Link
                                to="/"
                                className="text-decoration-none text-gray text-gray-hover"
                            >
                                Пресса
                            </Link>
                        </li>
                        <li className="fw-bold py-1 fs-6">
                            <Link
                                to="/"
                                className="text-decoration-none text-gray text-gray-hover"
                            >
                                Блог
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Footer;
