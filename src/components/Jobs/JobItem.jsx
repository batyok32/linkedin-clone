import React from "react";

function JobItem() {
    return (
        <div className="container my-2">
            <div
                className="row bg-white p-2 flex-wrap"
                style={{
                    boxShadow: "0px 4px 24px -10px rgba(124,124,124,0.88)",
                    borderRadius: "10px",
                }}
            >
                <div className="col-auto col-md-auto d-flex align-items-center justify-content-center">
                    <img
                        style={{ width: "50px" }}
                        src="/images/logo.png"
                        alt="job image"
                    />
                </div>
                <div className="col col-md-6 col-lg d-flex flex-column">
                    <div
                        className="fs-5 truncate-overflow-1"
                        style={{ fontWeight: 500 }}
                    >
                        Ux/Ui Designer - Senior Lorem ipsum dolor, sit amet
                        consectetur adipisicing elit. Autem natus aperiam,
                        doloribus enim reprehenderit quo.
                    </div>
                    <div
                        className="truncate-overflow-1"
                        style={{ fontSize: "14px", fontWeight: 500 }}
                    >
                        Coca-Cola
                    </div>
                    <div style={{ fontSize: "14px" }} className="mt-1 mb-1">
                        Ashgabat, Turkmenistan
                    </div>
                </div>
                <div className="col-12 col-md-4 col-lg-2 d-flex flex-column justify-content-center align-items-md-end align-items-center">
                    <div className="h5 mb-1 mt-2 mt-md-0">300 000$</div>
                    <div className="fs-14 text-muted">1 неделю назад</div>
                </div>
            </div>
        </div>
    );
}

export default JobItem;
