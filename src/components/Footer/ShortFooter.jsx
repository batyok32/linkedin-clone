import React from "react";

function ShortFooter() {
    return (
        <div
            className="container  text-gray fw-bold px-2 px-md-5"
            style={{ fontSize: "12px" }}
        >
            <div className="row  d-inline-flex flex-md-column  flex-lg-row col-12 col-md-6 col-lg-auto me-2">
                <div className="col-auto mt-1">Linkedin</div>
                <div className="col-auto mt-1">About</div>
                <div className="col-auto mt-1">Accessibility</div>
                <div className="col-auto mt-1">User Agreement</div>
                <div className="col-auto mt-1">Privacy Policy</div>
            </div>

            <div className="row mt-2 d-inline-flex flex-md-column flex-lg-row  col-md-6 col-lg-auto">
                <div className="col-auto mt-1">Cookie Policy</div>
                <div className="col-auto mt-1">Copyright Policy</div>
                <div className="col-auto mt-1">Brand Policy </div>
                <div className="col-auto mt-1">Guest </div>
                <div className="col-auto mt-1">Controls Community </div>
                <div className="col-auto mt-1">Guidelines </div>
            </div>
        </div>
    );
}

export default ShortFooter;
