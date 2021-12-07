import React, { useEffect, useState } from "react";

function DropSelect({ name, clickFun, optionsFun, defaultOpt, resetFun }) {
    const [choosedItem, setChoosedItem] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [opts, setOptions] = useState([]);
    const [searchValue, setSearchValue] = useState("");
    const [sawDefaultOpt, setSawDefaultOpt] = useState(false);
    useEffect(() => {
        if (searchValue.length >= 2) {
            setIsLoading(true);
            optionsFun(searchValue, setOptions, setIsLoading);
        }
    }, [searchValue]);
    useEffect(() => {
        // Used for starting if it has default value
        if (defaultOpt && !sawDefaultOpt) {
            defaultOpt(setChoosedItem);
            setSawDefaultOpt(true);
        }
    }, [defaultOpt]);
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
                {choosedItem?.name ? choosedItem.name : name}
                <i class="ms-2 bi bi-chevron-down fs-14"></i>
            </button>
            <ul
                class="dropdown-menu p-0 mt-1"
                style={{
                    borderRadius: "10px",
                    width: "90%",
                }}
            >
                <div
                    className="my-3 mx-auto d-flex px-2 align-items-center"
                    style={{
                        borderRadius: "10px",
                        width: "90%",
                        background: "rgba(202,204,206, 0.4)",
                    }}
                >
                    <i class="bi bi-search text-muted"></i>
                    <input
                        type="text"
                        placeholder="Поиск..."
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                        className="form-control border-0  bg-transparent sm-placeholder"
                        style={{
                            outline: "none",
                            boxShadow: "none",
                        }}
                        required
                    />
                </div>
                {isLoading && (
                    <div className="text-center my-2 text-primary">
                        <div class="spinner-border" role="status">
                            <span class="visually-hidden">Loading...</span>
                        </div>
                    </div>
                )}

                <div
                    style={{
                        overflowY: "scroll",
                        maxHeight: "150px",
                    }}
                >
                    {choosedItem ? (
                        <div className="px-2">
                            <div
                                onClick={() => {
                                    setChoosedItem(null);
                                    resetFun();
                                }}
                                role="button"
                                style={{
                                    borderRadius: "10px",
                                    fontWeight: "normal",
                                }}
                                className="dropdown-item truncate-overflow-1 blue-btn justify-content-between align-items-center my-2 py-2 d-flex"
                            >
                                <span>{choosedItem.name}</span>
                                <i class="bi bi-x-lg"></i>
                            </div>
                        </div>
                    ) : (
                        ""
                    )}
                    {Array.isArray(opts) &&
                        opts.length > 0 &&
                        opts.map((option) => {
                            return (
                                <div
                                    onClick={() => {
                                        setChoosedItem({ name: option.name });
                                        clickFun(option.value);
                                    }}
                                    role="button"
                                    className="dropdown-item py-2"
                                >
                                    {option.name}
                                </div>
                            );
                        })}
                </div>
            </ul>
        </div>
    );
}

export default DropSelect;
