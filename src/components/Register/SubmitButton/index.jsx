import React from "react";

function SubmitButton({
    disabled,
    name = "Зарегистрироваться",
    isLoading,
    submitFunction,
}) {
    return (
        <button
            type="button"
            disabled={disabled}
            onClick={(e) => submitFunction(e)}
            className="btn blue-btn my-2 text-center w-100 "
        >
            {isLoading ? (
                <div className="spinner-border text-white" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            ) : (
                <>{name}</>
            )}
        </button>
    );
}

export default SubmitButton;
