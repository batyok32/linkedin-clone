import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router";
import { load_stranger_company } from "../redux/actions/auth";
import { getAge } from "../utils/convertDate";

function RetrieveCompany() {
    const [company, setCompany] = useState(null);
    const { slug, id } = useParams();
    const dispatch = useDispatch();

    const getCompany = () => {
        dispatch(load_stranger_company(id)).then((res) => {
            setCompany(res);
        });
    };

    useEffect(() => {
        // First display of this page, go to top
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
        if (id) {
            getCompany();
        }
    }, [slug, id]);
    return (
        <div className="container">
            <div
                className="bg-white my-3 p-4 mx-auto"
                style={{ borderRadius: "20px", width: "90%" }}
            >
                <div className="row ">
                    <div className="col-12 col-md-4 col-lg-3 d-flex justify-content-center">
                        <img
                            height="200"
                            style={{ borderRadius: "15px" }}
                            src="http://127.0.0.1:8000/media/companies/featured1-1_Iqt2JWP.webp"
                            alt=""
                        />
                    </div>
                    <div className="col-12 col-md-8 col-lg-9 mt-4 mt-md-0">
                        <h2 className="pt-2">{company?.full_name}</h2>
                        <div className="row my-3">
                            <div className="col-6 text-muted top-nav fs-6 py-2">
                                <div className="row  align-items-center">
                                    <div className="col-auto">
                                        <i class="bi bi-compass-fill fs-4"></i>
                                    </div>
                                    <div className="col text-dark">
                                        {company?.address}
                                    </div>
                                </div>

                                <div className="row  align-items-center">
                                    <div className="col-auto">
                                        <i class="bi bi-envelope fs-4"></i>
                                    </div>
                                    <div className="col text-dark">
                                        test@gmail.com
                                    </div>
                                </div>
                                <div className="row  align-items-center">
                                    <div className="col-auto">
                                        <i class="bi bi-phone-fill fs-4"></i>
                                    </div>
                                    <div className="col text-dark">
                                        +{company?.phone_number}
                                    </div>
                                </div>
                            </div>
                            <div className="col-6 text-muted top-nav fs-6 py-2">
                                <div className="row  align-items-center">
                                    <div className="col-auto">
                                        <i class="bi bi-calendar-date fs-4"></i>
                                    </div>
                                    <div className="col text-dark">
                                        {getAge(company?.found_date)} лет
                                    </div>
                                </div>

                                <div className="row  align-items-center">
                                    <div className="col-auto">
                                        <i class="bi bi-building fs-4"></i>
                                    </div>
                                    <div className="col text-dark">
                                        {company?.company_type_full}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div
                className="bg-white my-3 p-4  mx-auto"
                style={{ borderRadius: "20px", width: "90%" }}
            >
                <h3>Описание</h3>
                <p className="pt-3">{company?.description}</p>
            </div>
        </div>
    );
}

export default RetrieveCompany;
