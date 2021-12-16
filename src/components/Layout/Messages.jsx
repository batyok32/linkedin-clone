import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import {
    selectErrors,
    selectSuccessMessages,
} from "../../redux/selectors/messages";
import ErrorAlert from "../Alert/ErrorAlert";
import SuccessAlert from "../Alert/SuccessAlert";

function Messages() {
    const successOpenModalRef = React.createRef();
    const errorOpenModalRef = React.createRef();
    const errors = useSelector((state) => selectErrors(state));
    const success = useSelector((state) => selectSuccessMessages(state));
    useEffect(() => {
        if (success) {
            successOpenModalRef.current.click();
        }
        if (errors) {
            errorOpenModalRef.current.click();
        }
    }, [errors, success]);
    return (
        <>
            {errors ? <ErrorAlert message={errors} /> : ""}
            {success ? <SuccessAlert message={success} /> : ""}
            <div
                ref={errorOpenModalRef}
                data-bs-toggle="modal"
                data-bs-target="#errorModal"
            ></div>
            <div
                ref={successOpenModalRef}
                data-bs-toggle="modal"
                data-bs-target="#successModal"
            ></div>
        </>
    );
}

export default Messages;
