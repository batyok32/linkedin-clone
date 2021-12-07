import React from "react";

function ImageInput({ name, full_name, icon, image, handleChangeImage }) {
    return (
        <div style={{ marginBottom: "2rem" }}>
            <label
                htmlFor={name}
                role="button"
                className="form-label text-gray w-100 py-0 fw-bold fs-6 d-inline-flex flex-column "
                style={{ fontSize: "14px" }}
            >
                <div className="d-inline-flex align-items-center">
                    <i class={`bi ${icon} fs-5 me-2`}></i>
                    {full_name}
                    <i class="bi bi-hand-index-thumb  fs-5 ms-2"></i>
                </div>
                {image?.preview && (
                    <div className="d-flex align-items-center justify-content-center">
                        <img
                            src={image?.preview}
                            alt="dummy"
                            width="300"
                            className="my-2"
                            style={{ borderRadius: "10px" }}
                            height="300"
                        />
                    </div>
                )}
            </label>
            <input
                type="file"
                className="d-none"
                id={name}
                onChange={handleChangeImage}
                required
            />
        </div>
    );
}

export default ImageInput;
