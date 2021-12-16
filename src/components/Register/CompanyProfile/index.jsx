import React, { useEffect, useState } from "react";
import { validateRegisterCompanyProfile } from "../../Validate/formValidate";
import SubmitButton from "../SubmitButton";
import isEmpty from "../../Validate/isEmpty";
import { check_company, signUpCompany } from "../../../redux/actions/auth";
import { useDispatch } from "react-redux";
import TextInput from "../Form/TextInput";
import TextAreaInput from "../Form/TextAreaInput";
import CalendarInput from "../Form/CalendarInput";
import SelectInput from "../Form/SelectInput";
import ImageInput from "../Form/ImageInput";
import convertDate from "../../../utils/convertDate";

function CompanyProfile({ userData }) {
    const [calendarDate, setCalendarDate] = useState(new Date());
    const [profileData, setProfileData] = useState({
        fullName: "",
        compInfo: "",
        address: "",
        companyType: "OHH",
        phone_number: "993",
        image: { preview: "", raw: "" },
        choosedDate: convertDate(new Date()),
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
            dispatch(check_company(fullName)).then((res) => {
                if (res == true) {
                    setIsLoading(false);
                    setFormErrors({
                        ...formErrors,
                        fullName: "Такая компания уже существует",
                    });
                    // console.log("Такая компания уже существует");
                } else if (res == false) {
                    setFormErrors(null);
                    dispatch(signUpCompany(userData, profileData)).then(
                        (res) => {
                            setIsLoading(false);
                            // console.log("Ok", res);
                        }
                    );
                }
            });
        }
    };

    return (
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
            />
        </div>
    );
}

export default CompanyProfile;
