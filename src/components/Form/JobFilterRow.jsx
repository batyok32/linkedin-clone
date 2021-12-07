import React from "react";
import { useDispatch } from "react-redux";
import { search_company, search_professions } from "../../redux/actions/main";
import { citiesArray } from "../../utils/cities";
import DropJobSalaryRange from "./DropJobSalaryRange";
import DropSelect from "./DropSelect";
import StandartDropSelect from "./StandartDropSelect";

function JobFilterRow({
    isLoading,
    setClickSearch,
    filterData,
    setFilterData,
    defaultProfession,
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
                    defaultOpt={
                        defaultProfession
                            ? (setChoosedItem) => {
                                  setChoosedItem({
                                      name: defaultProfession?.name,
                                  });
                              }
                            : null
                    }
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
                    name="Компания"
                    clickFun={(value) =>
                        setFilterData({ ...filterData, company: value })
                    }
                    optionsFun={(value, setOptions, setIsLoading) => {
                        let response = [];
                        dispatch(search_company(value)).then((res) => {
                            if (Array.isArray(res) && res.length > 0) {
                                res.map((opt) =>
                                    response.push({
                                        name: opt.full_name,
                                        value: opt.user,
                                    })
                                );
                            }
                            setOptions(response);
                            setIsLoading(false);
                        });
                    }}
                    resetFun={() => {
                        setFilterData({ ...filterData, company: null });
                    }}
                />
                <DropJobSalaryRange
                    name="Зарплата"
                    clickFun={(min, max) => {
                        if (max === 0 || min === 0) {
                            if (max === 0 && min === 0) {
                                setFilterData({
                                    ...filterData,
                                    minSalary: null,
                                    maxSalary: null,
                                });
                            } else if (max === 0) {
                                setFilterData({
                                    ...filterData,
                                    minSalary: min,
                                    maxSalary: null,
                                });
                            } else if (min === 0) {
                                setFilterData({
                                    ...filterData,
                                    minSalary: null,
                                    maxSalary: max,
                                });
                            }
                        } else {
                            setFilterData({
                                ...filterData,
                                minSalary: min,
                                maxSalary: max,
                            });
                        }
                    }}
                    res={`${
                        filterData?.minSalary ? filterData?.minSalary : "0"
                    } - ${filterData?.maxSalary ? filterData?.maxSalary : "0"}`}
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
                        { name: "По дате - сначала новые", value: "-updated" },
                        { name: "По дате - сначала старые", value: "updated" },
                        {
                            name: "По зарплате - сначала большие",
                            value: "-salary",
                        },
                        {
                            name: "По зарплате - сначала маленькие",
                            value: "salary",
                        },
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
        </div>
    );
}

export default JobFilterRow;
