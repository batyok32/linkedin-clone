import React from "react";
import { Modal } from "bootstrap";
import { REMOVE_MESSAGES } from "../../redux/types/types";
import { useDispatch } from "react-redux";
import TickIcon from "./TickIcon";

function SuccessAlert({ message }) {
    const closeModalRef = React.createRef();
    const dispatch = useDispatch();
    const clearMessages = async () => {
        // console.log("Close alert");
        await closeModalRef.current.click();
        dispatch({ type: REMOVE_MESSAGES });
    };
    return (
        <div
            class="modal fade"
            id="successModal"
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
                        <TickIcon />
                        <h2 className="text-center my-3">{message}</h2>
                        <button
                            className="btn btn-outline-primary mt-3"
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

export default SuccessAlert;
