import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Dropdown } from "bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/actions/auth";

function Header() {
    const [userType, setUserType] = useState(null);
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const user = useSelector((state) => state.auth.user);
    const profile = useSelector((state) => state.auth.profile);
    const dispatch = useDispatch();
    useEffect(() => {
        if (user?.type === "ADMIN") {
            setUserType(user?.username);
        } else if (user?.type === "FREELANCER") {
            setUserType(profile?.full_name);
        } else if (user?.type === "COMPANY") {
            setUserType(profile?.full_name);
        }
    }, [user, profile]);
    return (
        <div className="container">
            <div className="row py-3  justify-content-between align-items-center bg-transparent ">
                <div className="col-12 col-md-6 col-lg-4 row align-items-center ">
                    <Link
                        to="/"
                        className="col-auto col-md-2 col-lg-2 px-3 px-md-0"
                    >
                        <img
                            style={{ width: "43px", height: "40px" }}
                            src={process.env.PUBLIC_URL + "/images/logo.png"}
                            alt="Logo"
                        />
                    </Link>
                    <div
                        style={{
                            borderRadius: "3px",
                            background: "rgba(202,204,206, 0.4)",
                        }}
                        className="col d-flex col-md-8 col-lg-8 border  align-items-center "
                    >
                        <i class="bi bi-search  fs-6 text-muted"></i>
                        <input
                            type="text"
                            name="search"
                            id="search"
                            placeholder="Поиск..."
                            className={`form-control bg-transparent  border-0 sm-placeholder`}
                            style={{ boxShadow: "none" }}
                            required
                        />
                    </div>
                </div>
                <div className="col-12 col-md-4 col-lg-7  d-flex justify-content-evenly justify-content-md-between align-items-center mt-3 mt-md-0">
                    <NavLink
                        to="/"
                        exact
                        className="d-flex align-items-center position-relative justify-content-between text-decoration-none top-nav"
                    >
                        <i class="bi bi-house"></i>
                        <span className="ms-2 fs-6 d-none d-lg-inline">
                            Главная
                        </span>
                        <div className="position-absolute nav-border"></div>
                    </NavLink>
                    <NavLink
                        to="/freelancers"
                        className="d-flex position-relative align-items-center justify-content-between text-decoration-none top-nav"
                    >
                        <i class="bi bi-people"></i>
                        <span className="ms-2 fs-6 d-none d-lg-inline">
                            Фрилансеры
                        </span>
                        <div className="position-absolute nav-border"></div>
                    </NavLink>
                    <NavLink
                        to="/jobs"
                        className="d-flex align-items-center position-relative justify-content-between text-decoration-none top-nav"
                    >
                        <i class="bi bi-briefcase"></i>
                        <span className="ms-2 fs-6 d-none d-lg-inline">
                            Работы
                        </span>
                        <div className="position-absolute nav-border"></div>
                    </NavLink>
                    <div className="vl col-auto"></div>

                    <div
                        role="button"
                        style={{ color: "rgb(51, 51, 51)", maxWidth: "200px" }}
                        className="d-flex  dropdown position-relative align-items-center justify-content-between text-decoration-none top-nav user-select-none"
                    >
                        <i
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                            class="bi bi-person-circle dropdown-toggle"
                        ></i>
                        <span
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                            className=" ms-3 fs-6 d-none d-lg-inline dropdown-toggle"
                            style={{
                                maxWidth: "200px",
                                textOverflow: "ellipsis",
                                overflow: "hidden",
                                whiteSpace: "nowrap",
                            }}
                        >
                            {isAuthenticated ? userType : "Пользователь"}
                            <i class="ms-2 bi bi-chevron-down fs-14"></i>
                        </span>
                        <ul
                            class="dropdown-menu"
                            style={{ borderRadius: "5px" }}
                        >
                            {isAuthenticated ? (
                                <>
                                    <div
                                        onClick={() => dispatch(logout())}
                                        class="dropdown-item top-nav fw-500"
                                    >
                                        <i class="bi bi-door-open-fill me-2"></i>
                                        Выйти
                                    </div>
                                    <Link
                                        to="/login"
                                        class="dropdown-item top-nav fw-500"
                                    >
                                        <i class="bi bi-person-lines-fill me-2"></i>
                                        Профиль
                                    </Link>
                                </>
                            ) : (
                                <>
                                    <Link
                                        to="/login"
                                        class="dropdown-item top-nav fw-500"
                                    >
                                        <i class="bi bi-key-fill me-2"></i>Войти
                                    </Link>
                                    <Link
                                        to="/signup"
                                        class="dropdown-item top-nav fw-500"
                                    >
                                        <i class="bi bi-lock-fill me-2"></i>{" "}
                                        Регистрация
                                    </Link>
                                </>
                            )}

                            {user?.type === "ADMIN" && (
                                <a
                                    href="http://127.0.0.1:8000/admin/"
                                    target="_blank"
                                    class="dropdown-item top-nav fw-500"
                                >
                                    <i class="bi bi-lock-fill me-2"></i> Админка
                                </a>
                            )}
                            {user?.type === "COMPANY" && (
                                <Link
                                    to="/jobs/post"
                                    class="dropdown-item top-nav fw-500"
                                >
                                    <i class="bi bi-file-earmark-plus-fill me-2"></i>{" "}
                                    Выложить работу
                                </Link>
                            )}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Header;

// className={(isActive) =>
//     "nav-link" + (!isActive ? " unselected" : "")
// }
