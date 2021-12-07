import React, { useEffect, useState } from "react";

function DropJobSalaryRange({ clickFun, res }) {
    const [values, setValues] = useState({
        min: 0,
        max: 0,
    });
    const [startedWorking, setStartedWorking] = useState(false);
    const [errors, setErrors] = useState(null);
    useEffect(() => {
        if (startedWorking) {
            if (values.min === 0 && values.max === 0) {
                setErrors(null);
                clickFun(values.min, values.max);
            } else {
                if (values.min >= values.max) {
                    setErrors(
                        "Минимальная зарплата должна быть меньше чем максимальная!"
                    );
                } else if (values.min < 0 || values.max < 0) {
                    setErrors("Значение не может быть меньше нуля!");
                } else {
                    setErrors(null);
                    clickFun(values.min, values.max);
                }
            }
        }
    }, [values]);
    return (
        <div
            style={{ color: "rgb(51, 51, 51)" }}
            className="dropdown position-relative my-2 "
        >
            <button
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                style={{
                    borderRadius: "30px",
                    outline: "none",
                    boxShadow: "none",
                }}
                className="w-100 btn px-3 d-flex justify-content-between align-items-center border dropdown-toggle truncate-overflow-1"
            >
                Зарплата
                <i class="ms-2 bi bi-chevron-down fs-14"></i>
            </button>
            <ul
                class="dropdown-menu mx-auto p-0 mt-1"
                style={{
                    borderRadius: "10px",
                    width: "90%",
                }}
            >
                <div className="my-3  d-flex flex-column px-2">
                    {errors ? (
                        <div class="px-3 text-danger fs-14 py-1 text-center">
                            {errors}
                        </div>
                    ) : (
                        ""
                    )}
                    <div class="px-3  fs-14 py-1 text-center">{res}</div>
                    <label htmlFor="min-range" class="form-label text-center">
                        Минимальная зарплата
                    </label>
                    <div className="p-1">
                        <input
                            type="number"
                            name="range"
                            min={1}
                            max={values.max - 1}
                            id="min-range"
                            value={values.min}
                            onChange={(e) => {
                                setStartedWorking(true);
                                setValues({
                                    ...values,
                                    min: Number(e.target.value),
                                });
                            }}
                            className={`form-control px-2 mx-auto  py-1 sm-placeholder `}
                            style={{
                                borderRadius: "7px",
                                outline: "none",
                                boxShadow: "none",
                                width: "90%",
                            }}
                            aria-describedby="min-range"
                            required
                        />
                    </div>
                </div>
                <div className="my-3  d-flex flex-column px-2">
                    <label for="customRange1" class="form-label text-center">
                        Максимальная зарплата
                    </label>
                    <div className="p-1">
                        <input
                            type="number"
                            value={values.max}
                            min={values.min + 1}
                            onChange={(e) => {
                                setStartedWorking(true);
                                setValues({
                                    ...values,
                                    max: Number(e.target.value),
                                });
                            }}
                            className={`form-control px-2 mx-auto  py-1 sm-placeholder `}
                            style={{
                                borderRadius: "7px",
                                outline: "none",
                                boxShadow: "none",
                                width: "90%",
                            }}
                        />
                    </div>
                </div>
            </ul>
        </div>
    );
}

export default DropJobSalaryRange;
