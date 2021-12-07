import React from "react";
import { useDispatch } from "react-redux";
import {
    search_freelancer,
    search_professions,
} from "../../redux/actions/main";
import { citiesArray } from "../../utils/cities";
import DropSelect from "./DropSelect";
import StandartDropSelect from "./StandartDropSelect";

function FreelancerFilterRow({
    isLoading,
    setClickSearch,
    filterData,
    setFilterData,
}) {
    const dispatch = useDispatch();

    return (
        <div
            className="bg-white d-flex p-4 mt-3 flex-wrap"
            style={{
                boxShadow: "0px 4px 24px -10px rgba(124,124,124,0.88)",
                borderRadius: "10px",
            }}
        >
            <div className="col mx-2 row row-cols-1 row-cols-md-2 row-cols-lg-4 justify-content-center align-items-center">
                <DropSelect
                    name="Профессия"
                    // When input value clicked
                    clickFun={(value) =>
                        setFilterData({ ...filterData, profession: value })
                    }
                    // Search in professions
                    optionsFun={(value, setOptions, setIsLoading) => {
                        let response = [];
                        dispatch(search_professions(value)).then((res) => {
                            if (Array.isArray(res) && res.length > 0) {
                                res.map((opt) =>
                                    // Creating new array
                                    response.push({
                                        name: opt.name,
                                        value: opt.id,
                                    })
                                );
                            }
                            setOptions(response);
                            setIsLoading(false);
                        });
                    }}
                    // Used for starting if url has profession
                    defaultOpt={null}
                    resetFun={() => {
                        setFilterData({ ...filterData, profession: null });
                    }}
                />
                <StandartDropSelect
                    name="Место"
                    noSearch={true}
                    clickFun={(value) =>
                        setFilterData({ ...filterData, city: value })
                    }
                    options={citiesArray}
                    resetFun={() => {
                        setFilterData({ ...filterData, city: null });
                    }}
                />
                <DropSelect
                    name="Имя"
                    clickFun={(value) =>
                        setFilterData({ ...filterData, full_name: value })
                    }
                    optionsFun={(value, setOptions, setIsLoading) => {
                        let response = [];
                        dispatch(search_freelancer(value)).then((res) => {
                            if (Array.isArray(res) && res.length > 0) {
                                res.map((opt) =>
                                    response.push({
                                        name: opt.full_name,
                                        value: opt.full_name,
                                    })
                                );
                            }
                            setOptions(response);
                            setIsLoading(false);
                        });
                    }}
                    resetFun={() => {
                        setFilterData({ ...filterData, full_name: null });
                    }}
                />
                <StandartDropSelect
                    name="Дата"
                    clickFun={(value) =>
                        setFilterData({ ...filterData, date: value })
                    }
                    noSearch={true}
                    options={[
                        { name: "1 - Сегодня", value: "today" },
                        { name: "7 - Неделю назад", value: "week" },
                        { name: "30 - Месяц назад", value: "month" },
                        { name: "365 - Год назад", value: "year" },
                    ]}
                    resetFun={() => {
                        setFilterData({ ...filterData, date: null });
                    }}
                />
                <StandartDropSelect
                    name="Порядок по ..."
                    clickFun={(value) =>
                        setFilterData({ ...filterData, order: value })
                    }
                    noSearch={true}
                    options={[
                        { name: "По дате - сначала новые", value: "-created" },
                        { name: "По дате - сначала старые", value: "created" },
                    ]}
                    resetFun={() => {
                        setFilterData({ ...filterData, order: null });
                    }}
                />
            </div>
            <div className="col-12 mx-auto d-flex justify-content-center mt-3 align-items-center">
                <div className="d-flex justify-content-center">
                    <button
                        type="submit"
                        onClick={() => setClickSearch(true)}
                        className="btn blue-btn btn-filter-width text-center "
                    >
                        {isLoading ? (
                            <div class="spinner-border" role="status">
                                <span class="visually-hidden">Loading...</span>
                            </div>
                        ) : (
                            <>Поиск</>
                        )}
                    </button>
                </div>
            </div>
            {/* <div className="col-12 d-flex justify-content-center mt-3 align-items-center">
                <button
                    type="submit"
                    style={{ width: "300px" }}
                    className="btn blue-btn  text-center "
                >
                    Поиск
                </button>
            </div> */}
        </div>
    );
}

export default FreelancerFilterRow;
