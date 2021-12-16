import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DropSelect from "../components/Form/DropSelect";
import CalendarInput from "../components/Register/Form/CalendarInput";
import ImageInput from "../components/Register/Form/ImageInput";
import RegisterDropSelect from "../components/Register/Form/RegisterDropSelect";
import SelectInput from "../components/Register/Form/SelectInput";
import TextAreaInput from "../components/Register/Form/TextAreaInput";
import TextInput from "../components/Register/Form/TextInput";
import SubmitButton from "../components/Register/SubmitButton";
import { validateRegisterFreelanacerProfile } from "../components/Validate/formValidate";
import isEmpty from "../components/Validate/isEmpty";
import { changeFreelancerProfile } from "../redux/actions/auth";
import { search_professions } from "../redux/actions/main";
import { ADD_MESSAGE } from "../redux/types/types";
import { citiesArray } from "../utils/cities";
import convertDate from "../utils/convertDate";

function EditFreelancer() {
    const profile = useSelector((state) => state.auth.profile);
    const [profileData, setProfileData] = useState({
        fullName: profile?.full_name,
        experience: profile?.experience,
        knowledge: profile?.knowledge,
        profesion: profile?.profession?.id,
        city: profile?.city,
        projects: profile?.projects,
        phone_number: profile?.phone_number,
        image: {
            preview: profile?.logo,
            raw: profile?.logo,
        },
        birthDate: profile?.birth_date,
    });
    const [calendarDate, setCalendarDate] = useState(new Date());
    const [isLoading, setIsLoading] = useState(false);
    const [formErrors, setFormErrors] = useState(null);
    const [startedWriting, setStartedWriting] = useState({
        fullName: null,
        experience: null,
        knowledge: null,
        projects: null,
        profesion: null,
        phone_number: null,
    });
    const {
        fullName,
        experience,
        knowledge,
        city,
        projects,
        phone_number,
        image,
    } = profileData;
    const dispatch = useDispatch();

    const handleChangeImage = (e) => {
        if (e.target.files.length) {
            setProfileData({
                ...profileData,
                image: {
                    preview: URL.createObjectURL(e.target.files[0]),
                    raw: e.target.files[0],
                },
            });
        }
    };
    const handleSelect = (date) => {
        setCalendarDate(date);
        setProfileData({ ...profileData, choosedDate: convertDate(date) });
    };
    const inputChange = (e) =>
        setProfileData({ ...profileData, [e.target.name]: e.target.value });

    useEffect(() => {
        setFormErrors(validateRegisterFreelanacerProfile(profileData));
        console.log("Form Errors", formErrors);
        return () => {
            setFormErrors(null);
        };
    }, [profileData, startedWriting]);
    useEffect(() => {
        if (profile?.birth_date) {
            setCalendarDate(new Date(profile?.birth_date));
            setProfileData({
                ...profileData,
                choosedDate: profile?.birth_date,
            });
        }
    }, [profile]);

    const submitHandler = (e) => {
        e.preventDefault();
        setIsLoading(true);
        setFormErrors(validateRegisterFreelanacerProfile(profileData));
        setStartedWriting({
            fullName: true,
            experience: true,
            knowledge: true,
            projects: true,
            profesion: true,
            phone_number: true,
        });
        if (isEmpty(formErrors)) {
            dispatch(changeFreelancerProfile(profileData)).then((res) => {
                setIsLoading(false);
                if (res.status === 200) {
                    dispatch({
                        type: ADD_MESSAGE,
                        payload: "Профиль обновлен!",
                    });
                }
                console.log("Ok freelancer", res);
            });
        }
    };
    return (
        <div className="container">
            <div className="h1 my-3 text-center pb-4">Профиль</div>

            <div
                className="bg-white my-4 p-4 mx-auto col-12 col-md-8 col-lg-7"
                style={{ borderRadius: "20px" }}
            >
                <div className="w-100">
                    <TextInput
                        name="fullName"
                        full_name="Полное имя"
                        icon="bi-person-circle"
                        placeholder="Иван Петрович"
                        value={fullName}
                        startedWriting={startedWriting}
                        setStartedWriting={setStartedWriting}
                        inputChange={inputChange}
                        formErrors={formErrors}
                    />
                    <SelectInput
                        name="city"
                        full_name="Где вы живёте"
                        icon="bi-pin-map-fill"
                        value={city}
                        inputChange={inputChange}
                        options={citiesArray}
                    />
                    <TextInput
                        name="phone_number"
                        full_name="Ваш телефонный номер"
                        icon="bi-telephone-fill"
                        placeholder="99362535353"
                        value={phone_number}
                        type="number"
                        startedWriting={startedWriting}
                        setStartedWriting={setStartedWriting}
                        inputChange={inputChange}
                        formErrors={formErrors}
                    />
                    <CalendarInput
                        name="birthDate"
                        full_name="Ваша дата рождения"
                        icon="bi-calendar3"
                        calendarDate={calendarDate}
                        handleSelect={handleSelect}
                    />
                    <ImageInput
                        name="upload-logo"
                        full_name="Загрузить изображение"
                        icon="bi-image"
                        image={image}
                        handleChangeImage={handleChangeImage}
                    />
                    <h3 className="text-center mb-4">Знания</h3>

                    <TextAreaInput
                        name="knowledge"
                        full_name="Знания / Диплом / Что Вы умеете или знаете?"
                        icon="bi-book"
                        placeholder="Что вы можете рассказать о своих знаниях."
                        value={knowledge}
                        startedWriting={startedWriting}
                        setStartedWriting={setStartedWriting}
                        inputChange={inputChange}
                        formErrors={formErrors}
                    />
                    {startedWriting?.profesion && formErrors?.profession && (
                        <div className="text-danger fs-14 text-center">
                            {formErrors?.profession}
                        </div>
                    )}
                    <label className="form-label text-gray py-0 fw-bold fs-6 d-flex align-items-center">
                        <i class={`bi bi-people-fill fs-5 me-2`}></i>
                        Ваша профессия
                    </label>
                    <DropSelect
                        name="Профессия"
                        // When input value clicked
                        clickFun={(value) =>
                            setProfileData({ ...profileData, profesion: value })
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
                        defaultOpt={(setChoosedItem) => {
                            setChoosedItem({
                                name: profile?.profession.name,
                            });
                        }}
                        resetFun={() => {
                            setProfileData({ ...profileData, profesion: null });
                        }}
                    />

                    <h3 className="text-center my-4">Опыт</h3>
                    <TextAreaInput
                        name="experience"
                        full_name="Опыт (где работали?)"
                        icon="bi-briefcase-fill"
                        placeholder="Что вы можете рассказать о себе."
                        value={experience}
                        startedWriting={startedWriting}
                        setStartedWriting={setStartedWriting}
                        inputChange={inputChange}
                        formErrors={formErrors}
                    />

                    <TextAreaInput
                        name="projects"
                        full_name="Какие проекты вы делали"
                        icon="bi-file-earmark-text"
                        placeholder={`Что вы можете рассказать о своей практике? \nВ каких проектах участовали?`}
                        value={projects}
                        startedWriting={startedWriting}
                        setStartedWriting={setStartedWriting}
                        inputChange={inputChange}
                        formErrors={formErrors}
                    />

                    <SubmitButton
                        disabled={!isEmpty(formErrors)}
                        submitFunction={submitHandler}
                        isLoading={isLoading}
                        name="Изменить"
                    />
                </div>
            </div>
        </div>
    );
}

export default EditFreelancer;
