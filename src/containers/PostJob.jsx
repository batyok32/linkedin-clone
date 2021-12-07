import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import RegisterDropSelect from "../components/Register/Form/RegisterDropSelect";
import SelectInput from "../components/Register/Form/SelectInput";
import TextAreaInput from "../components/Register/Form/TextAreaInput";
import TextInput from "../components/Register/Form/TextInput";
import SubmitButton from "../components/Register/SubmitButton";
import { validateJobPost } from "../components/Validate/formValidate";
import isEmpty from "../components/Validate/isEmpty";
import { post_job, search_professions } from "../redux/actions/main";
import { useHistory } from "react-router-dom";

function PostJob() {
    const [jobData, setJobData] = useState({
        name: "",
        profession: null,
        city: "Ag",
        min_salary: 0,
        max_salary: 0,
        after_meeting: false,
        min_experience: 0,
        max_experience: 0,
        work_time: 0,
        skills: "",
        description: "",
    });
    const [isLoading, setIsLoading] = useState(false);
    const [formErrors, setFormErrors] = useState(null);
    const [startedWriting, setStartedWriting] = useState({
        name: null,
        min_salary: null,
        max_salary: null,
        min_experience: null,
        max_experience: null,
        work_time: null,
        skills: null,
        description: null,
    });
    // REDUX
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.user);
    const history = useHistory();

    // INPUT
    const inputChange = (e) =>
        setJobData({ ...jobData, [e.target.name]: e.target.value });
    const numberInputChange = (e) =>
        setJobData({ ...jobData, [e.target.name]: Number(e.target.value) });
    useEffect(() => {
        setFormErrors(validateJobPost(jobData));
        return () => {
            setFormErrors(null);
        };
    }, [jobData, startedWriting]);
    const submitHandler = (e) => {
        e.preventDefault();
        setIsLoading(true);
        setFormErrors(validateJobPost(jobData));
        setStartedWriting({
            name: true,
            min_salary: true,
            max_salary: true,
            min_experience: true,
            max_experience: true,
            work_time: true,
            skills: true,
            description: true,
        });
        if (isEmpty(formErrors)) {
            dispatch(post_job(jobData, user)).then((res) => {
                setIsLoading(false);
                if (res.status === 201) {
                    history.push("/jobs");
                }
            });
        }
    };
    return (
        <div className="container">
            <div className="h1 text-center my-5">Работа</div>
            <div
                className="mx-auto bg-white col-12 p-4 col-md-8 col-lg-6"
                style={{ borderRadius: "10px" }}
            >
                <TextInput
                    name="name"
                    full_name="Полное имя работы"
                    icon="bi-card-text"
                    placeholder="Менеджер по продаже телефонов"
                    value={jobData.name}
                    startedWriting={startedWriting}
                    setStartedWriting={setStartedWriting}
                    inputChange={inputChange}
                    formErrors={formErrors}
                />
                <RegisterDropSelect
                    name="profession"
                    full_name="Какая профессия"
                    icon="bi-people-fill"
                    clickFun={(value) =>
                        setJobData({ ...jobData, profession: value })
                    }
                    optionsFun={(value, setOptions, setIsLoading) => {
                        let response = [];
                        dispatch(search_professions(value)).then((res) => {
                            if (Array.isArray(res) && res.length > 0) {
                                res.map((opt) =>
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
                />
                <SelectInput
                    name="city"
                    full_name="Где будет работа"
                    icon="bi-compass-fill"
                    value={jobData.city}
                    inputChange={inputChange}
                    options={[
                        {
                            value: "Ag",
                            name: "Ашхабад",
                        },
                        {
                            value: "Ah",
                            name: "Ахал",
                        },
                        {
                            value: "Bl",
                            name: "Балканы",
                        },
                        {
                            value: "Mr",
                            name: "Мары",
                        },
                        {
                            value: "Dz",
                            name: "Дашогуз",
                        },
                        {
                            value: "Lb",
                            name: "Лебап",
                        },
                    ]}
                />
                <h3 className="my-5 text-center">Зарплата</h3>
                <div class="form-check" style={{ marginBottom: "2rem" }}>
                    <input
                        class="form-check-input "
                        type="checkbox"
                        onChange={(e) =>
                            setJobData({
                                ...jobData,
                                after_meeting: !jobData?.after_meeting,
                            })
                        }
                        value={jobData?.after_meeting}
                        checked={jobData?.after_meeting}
                        id="flexCheckDefault"
                    />
                    <label
                        class="form-check-label user-select-none"
                        for="flexCheckDefault"
                    >
                        Зарплата после собеседования
                    </label>
                </div>
                {!jobData?.after_meeting && (
                    <>
                        <TextInput
                            name="min_salary"
                            full_name="Минимальная зарплата"
                            icon="bi-coin"
                            value={jobData.min_salary}
                            type="number"
                            startedWriting={startedWriting}
                            setStartedWriting={setStartedWriting}
                            inputChange={numberInputChange}
                            formErrors={formErrors}
                        />
                        <TextInput
                            name="max_salary"
                            full_name="Максимальная зарплата"
                            icon="bi-cash-coin"
                            value={jobData.max_salary}
                            type="number"
                            startedWriting={startedWriting}
                            setStartedWriting={setStartedWriting}
                            inputChange={numberInputChange}
                            formErrors={formErrors}
                        />
                    </>
                )}

                <h3 className="my-5 text-center">Дополнительно</h3>
                <TextInput
                    name="min_experience"
                    full_name="Минимальный опыт работы"
                    icon="bi-bar-chart"
                    value={jobData.min_experience}
                    type="number"
                    startedWriting={startedWriting}
                    setStartedWriting={setStartedWriting}
                    inputChange={numberInputChange}
                    formErrors={formErrors}
                />
                <TextInput
                    name="max_experience"
                    full_name="Максимальный опыт работы"
                    icon="bi-bar-chart-fill"
                    value={jobData.max_experience}
                    type="number"
                    startedWriting={startedWriting}
                    setStartedWriting={setStartedWriting}
                    inputChange={numberInputChange}
                    formErrors={formErrors}
                />
                <TextInput
                    name="work_time"
                    full_name="Часы работы"
                    icon="bi-clock-fill"
                    value={jobData.work_time}
                    type="number"
                    startedWriting={startedWriting}
                    setStartedWriting={setStartedWriting}
                    inputChange={numberInputChange}
                    formErrors={formErrors}
                />
                <TextAreaInput
                    name="skills"
                    full_name="Какие качества, знания, скилы должен работник знать"
                    icon="bi-file-earmark-text"
                    placeholder={`Что вы можете рассказать о своей практике? \nВ каких проектах участовали?`}
                    value={jobData?.skills}
                    startedWriting={startedWriting}
                    setStartedWriting={setStartedWriting}
                    inputChange={inputChange}
                    formErrors={formErrors}
                />
                <TextAreaInput
                    name="description"
                    full_name="Что вы можете рассказать о работе"
                    icon="bi-file-earmark-medical-fill"
                    placeholder={`Что вы можете рассказать о своей практике? \nВ каких проектах участовали?`}
                    value={jobData?.description}
                    startedWriting={startedWriting}
                    setStartedWriting={setStartedWriting}
                    inputChange={inputChange}
                    formErrors={formErrors}
                />
                <SubmitButton
                    disabled={!isEmpty(formErrors)}
                    submitFunction={submitHandler}
                    isLoading={isLoading}
                    name={"Запостить"}
                />
            </div>
        </div>
    );
}

export default PostJob;
