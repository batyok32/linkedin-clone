import React from "react";
import { Modal } from "bootstrap";
import { useDispatch } from "react-redux";
import { REMOVE_ERRORS } from "../../redux/types/types";
import ErrorIcon from "./ErrorIcon";

function ErrorAlert({ message }) {
    const closeModalRef = React.createRef();
    const dispatch = useDispatch();
    const clearMessages = async () => {
        await closeModalRef.current.click();
        dispatch({ type: REMOVE_ERRORS });
    };
    return (
        <div
            class="modal fade"
            id="errorModal"
            tabIndex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
            data-bs-backdrop="static"
            data-bs-keyboard="false"
        >
            <div data-bs-dismiss="modal" ref={closeModalRef}></div>

            <div
                style={{ borderRadius: "10px", border: "0" }}
                class="modal-dialog  modal-dialog-centered  modal-dialog-scrollable "
            >
                <div
                    class="modal-content container "
                    style={{
                        background: "#f5f5f5",
                    }}
                >
                    <div class="modal-body my-4 d-flex justify-content-center align-items-center flex-column">
                        <ErrorIcon />
                        <h2 className="text-center mb-3">{message}</h2>
                        <button
                            className="btn btn-outline-primary mt-3 px-4 py-2"
                            onClick={() => clearMessages()}
                        >
                            Ok
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ErrorAlert;
