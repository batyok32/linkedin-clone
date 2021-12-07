import React, { useEffect, useState } from "react";

import SubmitButton from "./SubmitButton";
import isEmpty from "../Validate/isEmpty";
import TextInput from "./Form/TextInput";
import TextAreaInput from "./Form/TextAreaInput";
import SelectInput from "./Form/SelectInput";
import CalendarInput from "./Form/CalendarInput";
import convertDate from "../../utils/convertDate";
import ImageInput from "./Form/ImageInput";
import { validateRegisterFreelanacerProfile } from "../Validate/formValidate";
import { signUpFreelancer } from "../../redux/actions/auth";
import { useDispatch } from "react-redux";
import RegisterDropSelect from "./Form/RegisterDropSelect";
import { search_professions } from "../../redux/actions/main";
import { citiesArray } from "../../utils/cities";

function FreelancerProfile({ userData }) {
    const [profileData, setProfileData] = useState({
        fullName: "",
        experience: "",
        knowledge: "",
        profesion: null,
        city: "Ag",
        projects: "",
        phone_number: 993,
        birthDate: convertDate(new Date()),
        image: { preview: "", raw: "" },
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
        return () => {
            setFormErrors(null);
        };
    }, [profileData, startedWriting]);

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
            dispatch(signUpFreelancer(userData, profileData)).then((res) => {
                setIsLoading(false);
                console.log("Ok freelancer", res);
            });
        }
    };

    return (
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

            <RegisterDropSelect
                name="profesion"
                full_name="Ваша профессия"
                icon="bi-people-fill"
                clickFun={(value) =>
                    setProfileData({ ...profileData, profesion: value })
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
            <h3 className="text-center mb-4">Опыт</h3>
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
            />
        </div>
    );
}

export default FreelancerProfile;
