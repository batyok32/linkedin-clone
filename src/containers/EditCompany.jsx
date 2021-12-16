import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CalendarInput from "../components/Register/Form/CalendarInput";
import ImageInput from "../components/Register/Form/ImageInput";
import SelectInput from "../components/Register/Form/SelectInput";
import TextAreaInput from "../components/Register/Form/TextAreaInput";
import TextInput from "../components/Register/Form/TextInput";
import SubmitButton from "../components/Register/SubmitButton";
import { validateRegisterCompanyProfile } from "../components/Validate/formValidate";
import isEmpty from "../components/Validate/isEmpty";
import { changeCompanyProfile, check_company } from "../redux/actions/auth";
import { ADD_MESSAGE } from "../redux/types/types";
import convertDate from "../utils/convertDate";

function EditCompany() {
    const [calendarDate, setCalendarDate] = useState(new Date());
    const profile = useSelector((state) => state.auth.profile);
    const [profileData, setProfileData] = useState({
        fullName: profile?.full_name,
        compInfo: profile?.description,
        address: profile?.address,
        companyType: profile?.company_type,
        phone_number: profile?.phone_number,
        image: {
            preview: profile?.logo,
            raw: profile?.logo,
        },
        choosedDate: profile?.found_date,
    });
    const [isLoading, setIsLoading] = useState(false);
    const [formErrors, setFormErrors] = useState(null);
    const [startedWriting, setStartedWriting] = useState({
        fullName: null,
        compInfo: null,
        address: null,
        phone_number: null,
    });
    const dispatch = useDispatch();
    const { fullName, address, compInfo, companyType, phone_number, image } =
        profileData;
    const inputChange = (e) =>
        setProfileData({ ...profileData, [e.target.name]: e.target.value });

    const handleSelect = (date) => {
        setCalendarDate(date);
        setProfileData({ ...profileData, choosedDate: convertDate(date) });
    };
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
    useEffect(() => {
        if (profile?.found_date) {
            setCalendarDate(new Date(profile?.found_date));
            setProfileData({
                ...profileData,
                choosedDate: profile?.found_date,
            });
        }
    }, [profile]);
    useEffect(() => {
        // console.log(profileData);
        setFormErrors(validateRegisterCompanyProfile(profileData));
        return () => {
            setFormErrors(null);
        };
    }, [profileData, startedWriting]);
    const submitHandler = (e) => {
        e.preventDefault();
        setIsLoading(true);
        setFormErrors(validateRegisterCompanyProfile(profileData));
        setStartedWriting({
            fullName: true,
            compInfo: true,
            address: true,
            phone_number: true,
        });
        if (isEmpty(formErrors)) {
            dispatch(check_company(fullName, true)).then((res) => {
                if (res == true) {
                    setIsLoading(false);
                    setFormErrors({
                        ...formErrors,
                        fullName: "Такая компания уже существует",
                    });
                } else if (res == false) {
                    setFormErrors(null);
                    dispatch(changeCompanyProfile(profileData)).then((res) => {
                        setIsLoading(false);
                        if (res.status === 200) {
                            dispatch({
                                type: ADD_MESSAGE,
                                payload: "Профиль обновлен!",
                            });
                        }
                    });
                }
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
                        full_name="Полное имя компании"
                        icon="bi-building"
                        placeholder="Adidas Company"
                        value={fullName}
                        startedWriting={startedWriting}
                        setStartedWriting={setStartedWriting}
                        inputChange={inputChange}
                        formErrors={formErrors}
                    />

                    <TextAreaInput
                        name="compInfo"
                        full_name="Информация о компании"
                        icon="bi-file-earmark-text"
                        placeholder={`Что вы можете сказать о компании. \n Чем она занимается? `}
                        value={compInfo}
                        startedWriting={startedWriting}
                        setStartedWriting={setStartedWriting}
                        inputChange={inputChange}
                        formErrors={formErrors}
                    />
                    <TextInput
                        name="address"
                        full_name="Адресс компании"
                        icon="bi-geo-alt-fill"
                        placeholder="Например: Adidas Company"
                        value={address}
                        startedWriting={startedWriting}
                        setStartedWriting={setStartedWriting}
                        inputChange={inputChange}
                        formErrors={formErrors}
                    />
                    <TextInput
                        name="phone_number"
                        full_name="Телефонный номер компании"
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
                        name="calendar"
                        full_name="Дата основания компании"
                        icon="bi-calendar3"
                        calendarDate={calendarDate}
                        handleSelect={handleSelect}
                    />
                    <ImageInput
                        name="upload-button"
                        full_name="Загрузить изображение"
                        icon="bi-image"
                        image={image}
                        handleChangeImage={handleChangeImage}
                    />
                    <SelectInput
                        name="companyType"
                        full_name="Выберите тип компании"
                        icon="bi-gear-wide-connected"
                        value={companyType}
                        inputChange={inputChange}
                        options={[
                            {
                                value: "OHH",
                                name: "Hojalyk Jemgyýeti",
                            },
                            {
                                value: "IP",
                                name: "Telekeçi",
                            },
                        ]}
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

export default EditCompany;
