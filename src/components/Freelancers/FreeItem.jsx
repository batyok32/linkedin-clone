import React from "react";
import { getUpdatedTime } from "../../utils/convertDate";
function FreeItem({
    full_name,
    logo,
    profession,
    created,
    city,
    knowledge,
    clickFun,
}) {
    return (
        <div className="px-3 px-md-2 my-2">
            <div
                className="bg-white py-3 pt-4 px-4"
                style={{
                    borderRadius: "10px",
                    boxShadow: "0px 4px 24px -10px rgba(124,124,124,0.6)",
                }}
            >
                {/* Top */}
                <div
                    onClick={() => clickFun()}
                    role="button"
                    className="row justify-content-center align-items-center"
                >
                    <div
                        className="col-auto pe-2 d-flex justify-content-center"
                        style={{ borderRadius: "50px" }}
                    >
                        <img
                            style={{ borderRadius: "500px" }}
                            style={{ width: "70px", height: "70px" }}
                            src={logo}
                        />
                    </div>
                    <div className="col fs-6 text-blue truncate-overflow-2 fw-500">
                        {full_name}
                        {/* Batyr Gurbangulyyew */}
                    </div>
                </div>
                {/* Middle */}
                <div className="">
                    <div className="fs-5 mt-3 mb-1" style={{ fontWeight: 500 }}>
                        {profession?.name}
                    </div>
                    <div className="text-muted fs-14 mb-1">
                        {city}, Туркменистан
                    </div>
                    <div className="text-muted" style={{ fontSize: "12px" }}>
                        {getUpdatedTime(created)} дней назад
                    </div>
                    {/* Bottom */}
                    {/* Skills */}
                    <div className="truncate-overflow-3 my-2 fs-14 ">
                        {knowledge}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FreeItem;
