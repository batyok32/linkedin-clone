import React from "react";
import { Link } from "react-router-dom";
import { getUpdatedTime } from "../../utils/convertDate";

function JobItem2({
    name,
    company,
    min_salary,
    max_salary,
    after_meeting,
    profession,
    city,
    updated,
    clickFun,
}) {
    return (
        <div className="px-4 px-md-3 my-2 ">
            <div
                className="row bg-white p-2 py-3 flex-wrap"
                style={{
                    boxShadow: "0px 4px 24px -10px rgba(124,124,124,0.88)",
                    borderRadius: "10px",
                }}
            >
                <div className="col-auto d-flex align-items-center justify-content-center">
                    <div
                        onClick={() => clickFun()}
                        role="button"
                        style={{
                            width: "55px",
                            height: "55px",
                            borderRadius: "5px",
                            backgroundImage: `url(${
                                process.env.PUBLIC_URL + company
                                    ? company?.logo
                                    : "/images/logo.png"
                            })`,
                        }}
                        className="small-section"
                    ></div>
                </div>
                <div className="col d-flex flex-column">
                    <div
                        onClick={() => clickFun()}
                        role="button"
                        className="fs-6 truncate-overflow-1"
                        style={{ fontWeight: 500 }}
                    >
                        {name}
                    </div>
                    <Link
                        to={`/company/${company?.slug}/${company?.id}`}
                        className="truncate-overflow-1 text-blue text-decoration-none"
                        style={{
                            fontSize: "13px",
                            fontWeight: 500,
                        }}
                    >
                        {company?.full_name}{" "}
                    </Link>
                    <Link
                        to={`/jobs/${profession?.slug}/${profession.id}`}
                        style={{
                            fontSize: "13px",
                            fontWeight: 500,
                        }}
                        className="truncate-overflow-1 text-decoration-none text-muted"
                    >
                        {profession?.name}
                    </Link>
                </div>

                <div className="col-12 mt-2 d-flex justify-content-between align-items-center">
                    <div className="mt-1 mb-1 fs-14">
                        <div>{city}, Туркменистан</div>
                        <div className="text-muted">
                            {getUpdatedTime(updated)} дней назад
                        </div>
                    </div>
                    <div className="h6 d-flex align-items-center flex-wrap justify-content-center mb-1 mt-2 mt-md-0">
                        {after_meeting == true ? (
                            <span className="fs-14">После собеседования</span>
                        ) : (
                            <>
                                {min_salary} - {max_salary}
                                <small className="ms-1">TMT</small>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default JobItem2;
