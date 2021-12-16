import React from "react";

function TextInput({
    name,
    full_name,
    icon,
    placeholder,
    disabled,
    value,
    type = "text",
    startedWriting,
    setStartedWriting,
    inputChange,
    formErrors,
    max_length,
    min_length,
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
            <input
                type={type}
                name={name}
                id={name}
                disabled={disabled && disabled}
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
                max={max_length && max_length}
                min={min_length && min_length}
                required
            />
            <div class="invalid-feedback">{formErrors?.[name]}</div>
        </div>
    );
}

export default TextInput;
