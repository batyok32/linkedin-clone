import React from "react";
import { Link } from "react-router-dom";

function Options() {
    return (
        <div className="py-md-5">
            <div className="container py-3">
                <div className="row py-3 py-md-5 px-4 px-md-0">
                    <div className="col-md-4">
                        <h1 className="find-work-text  ">
                            Найдите подходящую вакансию или стажировку
                        </h1>
                    </div>
                    <div className="col mt-3 mt-md-0   ">
                        <div className="row align-items-center justify-content-start flex-wrap">
                            <Link
                                to="/signup"
                                className="col-auto btn-gray mx-md-2 my-2 text-decoration-none"
                            >
                                Найти Работника
                            </Link>
                            <Link
                                to="/freelancers"
                                className="col-auto btn-gray mx-md-2 my-2 text-decoration-none"
                            >
                                Найти Фрилансера
                            </Link>
                            <Link
                                to="/jobs"
                                className="col-auto btn-gray mx-md-2 my-2 text-decoration-none"
                            >
                                Найти Работу
                            </Link>
                            <Link
                                to="/signup"
                                className="col-auto btn-gray mx-md-2 my-2 text-decoration-none"
                            >
                                Стать Фрилансером
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Options;
