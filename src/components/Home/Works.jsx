import React from "react";
import { Link } from "react-router-dom";
import { works } from "./workstest";

function Works() {
    return (
        <div className="py-md-5">
            <div className="container py-3">
                <div className="row py-3 py-md-5 px-4 px-md-0">
                    <div className="col-md-4">
                        <h1 className="find-work-text  ">
                            Найдите подходящую вакансию или стажировку
                        </h1>
                    </div>
                    <div className="col-md-8 d-flex flex-column  my-4 my-md-0">
                        <div className="text-uppercase fw-bold text-gray mb-2">
                            Предлагаемые запросы поиска
                        </div>
                        <div className="row">
                            {works.map((work, index) => {
                                return (
                                    <Link
                                        key={index}
                                        to="/"
                                        className="col-auto my-2 me-2 text-decoration-none btn-gray"
                                    >
                                        {work.name}
                                    </Link>
                                );
                            })}
                        </div>
                        <div className="h6 my-2 fw-bold text-gray">
                            Загрузка{" "}
                            <i class="bi bi-arrow-down-circle ms-2"></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Works;
