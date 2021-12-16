import React, { useEffect, useState } from "react";
import { Modal } from "bootstrap";
import { useDispatch } from "react-redux";
import { getAge } from "../../utils/convertDate";
import { retrieve_freelancer } from "../../redux/actions/main";

function FreeModal({ data, closeModalRef }) {
    const [item, setItem] = useState(null);
    const [age, setAge] = useState(0);

    const dispatch = useDispatch();

    useEffect(() => {
        if (data) {
            dispatch(retrieve_freelancer(data?.user)).then((res) => {
                if (res) {
                    setItem(res);
                }
            });
        }
    }, [data]);

    useEffect(() => {
        if (item) {
            setAge(getAge(item?.birth_date));
        }
    }, [item]);

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
                    style={{ background: "#f5f5f5" }}
                >
                    <div
                        className="position-absolute"
                        style={{ right: "30px", top: "10px", zIndex: 2 }}
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
                        <div className="row justify-content-between ">
                            <div className="col-12 col-md-auto pt-2 d-flex justify-content-center ">
                                <img
                                    src={item?.logo}
                                    width="160"
                                    height="150"
                                />
                            </div>
                            <div className="col-12 pt-4 pt-md-0 col-md">
                                <h3>{item?.full_name} </h3>
                                <div className="h6 pt-2">
                                    {item?.profession?.name}
                                </div>
                                <div className="text-muted top-nav fs-14 py-2">
                                    <div className="row  align-items-center">
                                        <div className="col-auto">
                                            <i class="bi bi-compass-fill "></i>
                                        </div>
                                        <div className="col text-dark">
                                            {item?.city}, Туркменистан
                                        </div>
                                    </div>

                                    <div className="row  align-items-center">
                                        <div className="col-auto">
                                            <i class="bi bi-envelope "></i>
                                        </div>
                                        <div className="col text-dark">
                                            test@gmail.com
                                        </div>
                                    </div>
                                    <div className="row  align-items-center">
                                        <div className="col-auto">
                                            <i class="bi bi-phone-fill "></i>
                                        </div>
                                        <div className="col text-dark">
                                            +{item?.phone_number}
                                        </div>
                                    </div>
                                    <div className="row  align-items-center">
                                        <div className="col-auto">
                                            <i class="bi bi-calendar-date "></i>
                                        </div>
                                        <div className="col text-dark">
                                            {age > 4
                                                ? `${age} лет`
                                                : `${age} года`}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="h6 mt-3">Знания:</div>
                        <p style={{ fontSize: "15px" }}>{item?.knowledge}</p>

                        <div className="h6 ">Опыт:</div>
                        <p style={{ fontSize: "15px" }}>{item?.experience}</p>
                        <div className="h6 ">Проекты:</div>
                        <p style={{ fontSize: "15px" }}>{item?.projects}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FreeModal;
