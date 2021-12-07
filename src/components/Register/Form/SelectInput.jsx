import React from "react";

function SelectInput({ name, full_name, icon, value, inputChange, options }) {
    return (
        <div style={{ marginBottom: "2rem" }}>
            <label
                htmlFor={name}
                className="form-label text-gray py-0 fw-bold fs-6 d-flex align-items-center"
            >
                <i class={`bi ${icon} fs-5 me-2`}></i>
                {full_name}
            </label>
            <select
                onChange={(e) => {
                    inputChange(e);
                }}
                className="form-select"
                name={name}
                role="button"
                required
                id={name}
                value={value}
                style={{ borderRadius: "7px" }}
                aria-label="Default select example"
            >
                {Array.isArray(options) &&
                    options.map((option) => (
                        <option value={option.value}>{option.name}</option>
                    ))}
            </select>
        </div>
    );
}

export default SelectInput;
