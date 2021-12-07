import React from "react";

function TextAreaInput({
    name,
    full_name,
    icon,
    placeholder,
    value,
    startedWriting,
    setStartedWriting,
    inputChange,
    formErrors,
}) {
    return (
        <div style={{ marginBottom: "2rem" }}>
            <label
                htmlFor={name}
                className="form-label text-gray py-0 fw-bold fs-6 d-flex align-items-center"
            >
                <i class={`bi ${icon} fs-5 me-2`}></i>
                {full_name}
            </label>
            <textarea
                name={name}
                id={name}
                placeholder={placeholder && placeholder}
                value={value}
                onChange={(e) => {
                    inputChange(e);
                    setStartedWriting({
                        ...startedWriting,
                        [name]: true,
                    });
                }}
                className={`form-control sm-placeholder ${
                    startedWriting?.[name] === true &&
                    (formErrors?.[name] ? "is-invalid" : "is-valid")
                }`}
                style={{ borderRadius: "7px" }}
                aria-describedby={name}
                required
            ></textarea>
            <div class="invalid-feedback">{formErrors?.[name]}</div>
        </div>
    );
}

export default TextAreaInput;
