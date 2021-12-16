import React, { useEffect, useState } from "react";
import { Modal } from "bootstrap";
import { useHistory } from "react-router-dom";
import { load_job } from "../../redux/actions/main";
import { useDispatch } from "react-redux";
import { getUpdatedTime } from "../../utils/convertDate";
import { load_stranger_company } from "../../redux/actions/auth";

function JobModal({ job, closeModalRef }) {
    const [jobItem, setJobitem] = useState(null);
    const [jobCompany, setJobCompany] = useState(null);
    const dispatch = useDispatch();
    const history = useHistory();
    const sendMe = async (lin) => {
        console.log("Sending to ", lin, jobCompany);
        await closeModalRef.current.click();
        history.push(lin);
    };

    useEffect(() => {
        if (job) {
            dispatch(load_job(job?.id)).then((res) => {
                if (res) {
                    setJobitem(res);
                    dispatch(load_stranger_company(res?.company)).then(
                        (result) => {
                            setJobCompany(result);
                        }
                    );
                }
            });
        }
    }, [job]);

    return (
        <div
            class="modal fade"
            id="exampleModal3"
            tabIndex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
        >
            <div
                style={{ borderRadius: "10px", border: "0" }}
                class="modal-dialog   modal-dialog-scrollable "
            >
                <div
                    class="modal-content container "
                    style={{
                        background: "#f5f5f5",
                    }}
                >
                    <div
                        className="position-absolute"
                        style={{ right: "30px", top: "20px", zIndex: 2 }}
                    >
                        <button
                            type="button"
                            class="close-btn btn"
                            data-bs-dismiss="modal"
                            ref={closeModalRef}
                            aria-label="Close"
                            style={{ fontSize: "20px", boxShadow: "none" }}
                        >
                            <i class="bi bi-x-lg"></i>
                        </button>
                    </div>

                    <div class="modal-body my-4">
                        <div className="h3 pt-1">{jobItem?.name}</div>
                        {jobItem?.after_meeting == false ? (
                            <div
                                className="my-2"
                                style={{ fontSize: "18px", fontWeight: 500 }}
                            >
                                от{" "}
                                <span style={{ fontSize: "20px" }}>
                                    {jobItem?.min_salary}
                                </span>{" "}
                                до{" "}
                                <span style={{ fontSize: "20px" }}>
                                    {jobItem?.max_salary}
                                </span>{" "}
                                манат
                            </div>
                        ) : (
                            <div
                                className="my-2"
                                style={{ fontSize: "18px", fontWeight: 500 }}
                            >
                                После собеседования
                            </div>
                        )}

                        <div
                            className="text-gray my-3"
                            style={{ fontWeight: 500, fontSize: "15px" }}
                        >
                            <div className="my-2">
                                <strong>Требуемый опыт работы</strong>: От{" "}
                                {jobItem?.min_experience} до{" "}
                                {jobItem?.max_experience} лет
                            </div>
                            <div className="my-2">
                                {jobItem?.city},{" "}
                                {getUpdatedTime(jobItem?.updated)} дней назад
                            </div>

                            <div className="my-2">
                                {jobItem?.work_time} часов работы,{" "}
                                {jobItem?.profession?.name}{" "}
                            </div>
                        </div>
                        <div className=" my-2 py-2">
                            <div
                                className="row my-2 fs-6"
                                style={{ fontWeight: 500 }}
                            >
                                <div className="col-auto ms-2 d-flex justify-content-center">
                                    <i className="bi bi-building fs-5"></i>
                                </div>
                                <div
                                    onClick={() =>
                                        sendMe(
                                            `/company/${jobCompany?.slug}/${jobCompany?.user}`
                                        )
                                    }
                                    role="button"
                                    className="col text-blue text-decoration-underline"
                                >
                                    {jobCompany?.full_name} (
                                    {jobCompany?.company_type})
                                </div>
                            </div>
                            <div className="row my-2  fs-6">
                                <div className="col-auto ms-2 d-flex justify-content-center">
                                    <i className="bi bi-geo-alt-fill fs-5"></i>
                                </div>
                                <div className="col">{jobCompany?.address}</div>
                            </div>
                            <div className="row my-2  fs-6">
                                <div className="col-auto ms-2 d-flex justify-content-center">
                                    <i class="bi bi-headset fs-5"></i>
                                </div>
                                <div className="col">
                                    +{jobCompany?.phone_number}
                                </div>
                            </div>
                        </div>

                        <p className="my-4" style={{ fontSize: "15px" }}>
                            {jobItem?.description}
                        </p>

                        <div className="h6 ">О компании:</div>
                        <p style={{ fontSize: "15px" }}>
                            {jobCompany?.description}
                        </p>
                        <div className="h6 ">Мы ждём от кандидата:</div>
                        <p style={{ fontSize: "15px" }}>{jobItem?.skills}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default JobModal;

// {
/* <div class="modal-header border-0 my-2 ">
                        <h5 class="modal-title" id="exampleModalLabel">
                            Job - {job?.name}
                        </h5>
                        <button
                            type="button"
                            class="close-btn btn"
                            data-bs-dismiss="modal"
                            ref={closeModalRef}
                            aria-label="Close"
                            style={{ fontSize: "20px", boxShadow: "none" }}
                        >
                            <i class="bi bi-x-lg"></i>
                        </button>
                    </div> */
// <div
//     className="position-absolute"
//     style={{ right: "0px", top: "0px" }}
// >
//     <button
//         type="button"
//         class="close-btn btn"
//         data-bs-dismiss="modal"
//         ref={closeModalRef}
//         aria-label="Close"
//         style={{ fontSize: "20px", boxShadow: "none" }}
//     >
//         <i class="bi bi-x-lg"></i>
//     </button>
// </div>
// {isClicked ? (
//     <div
//         className="position-absolute fs-3 text-blue"
//         style={{ right: "50px", top: "0px" }}
//         role="button"
//         onMouseEnter={() => setIsHovered(true)}
//         onMouseLeave={() => setIsHovered(false)}
//         onClick={() => setIsClicked(false)}
//     >
//         <i
//             className={`bi bi-bookmark-check${
//                 isHovered ? "" : "-fill"
//             }`}
//         ></i>
//     </div>
// ) : (
//     <div
//         className="position-absolute fs-3 text-blue"
//         style={{ right: "50px", top: "0px" }}
//         role="button"
//         onMouseEnter={() => setIsHovered(true)}
//         onMouseLeave={() => setIsHovered(false)}
//         onClick={() => setIsClicked(true)}
//     >
//         <i
//             className={`bi bi-bookmark-plus${
//                 isHovered ? "-fill" : ""
//             }`}
//         ></i>
//     </div>
// )}
// }

// {
//     {isClicked ? (
//         <div
//             className="position-absolute fs-3 text-blue"
//             style={{ right: "80px", top: "20px", zIndex: 2 }}
//             role="button"
//             onMouseEnter={() => setIsHovered(true)}
//             onMouseLeave={() => setIsHovered(false)}
//             onClick={() => setIsClicked(false)}
//         >
//             <i
//                 className={`bi bi-bookmark-check${
//                     isHovered ? "" : "-fill"
//                 }`}
//             ></i>
//         </div>
//     ) : (
//         <div
//             className="position-absolute fs-3 text-blue"
//             style={{ right: "80px", top: "20px", zIndex: 2 }}
//             role="button"
//             onMouseEnter={() => setIsHovered(true)}
//             onMouseLeave={() => setIsHovered(false)}
//             onClick={() => setIsClicked(true)}
//         >
//             <i
//                 className={`bi bi-bookmark-plus${
//                     isHovered ? "-fill" : ""
//                 }`}
//             ></i>
//         </div>
//     )}
// }
