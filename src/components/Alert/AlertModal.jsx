import React from "react";
import { Modal } from "bootstrap";

function AlertModal() {
    const closeModalRef = React.createRef();

    return (
        <div
            class="modal fade"
            id="alertModal"
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

                    <div class="modal-body my-4">Hello</div>
                </div>
            </div>
        </div>
    );
}

export default AlertModal;
