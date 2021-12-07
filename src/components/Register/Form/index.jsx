import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { check_user } from "../../../redux/actions/auth";
import { validateRegisterInfo } from "../../Validate/formValidate";
import isEmpty from "../../Validate/isEmpty";
import SubmitButton from "../SubmitButton";

function Form({ formData, setFormData, setLoadProfile }) {
    const { username, password, password2, userType } = formData;
    const inputChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);
    const [formErrors, setFormErrors] = useState(null);
    const [startedWriting, setStartedWriting] = useState({
        username: false,
        password: false,
        password2: false,
    });
    const submitHandler = (e) => {
        e.preventDefault();
        setIsLoading(true);
        setFormErrors(validateRegisterInfo(formData));
        setStartedWriting({
            username: true,
            password: true,
            password2: true,
        });
        if (isEmpty(formErrors)) {
            dispatch(check_user(username)).then((res) => {
                setIsLoading(false);
                if (res == true) {
                    // console.log("Такой пользователь уже существует");
                    setFormErrors({
                        ...formErrors,
                        username: "Такой пользователь уже существует",
                    });
                } else if (res == false) {
                    // console.log("Такой пользователь не существует");
                    setLoadProfile(true);
                    setFormErrors(null);
                }
            });
        }
    };
    useEffect(() => {
        setFormErrors(validateRegisterInfo(formData));
        return () => {
            setFormErrors(null);
        };
    }, [formData, startedWriting]);
    return (
        <>
            <div className="mb-4">
                <label
                    htmlFor="inputName"
                    className="form-label text-gray py-0 fw-bold"
                >
                    <i className="bi bi-person-circle fs-5 me-2"></i>
                    Придумайте имя аккаунту <small>(логин)</small>
                </label>
                <input
                    type="text"
                    name="username"
                    id="inputName"
                    placeholder="Нужно только для входа в аккаунт: adidas_company"
                    value={username}
                    onChange={(e) => {
                        inputChange(e);
                        setStartedWriting({
                            ...startedWriting,
                            username: true,
                        });
                    }}
                    className={`form-control sm-placeholder ${
                        startedWriting.username === true &&
                        (formErrors?.username ? "is-invalid" : "is-valid")
                    }`}
                    style={{ borderRadius: "7px" }}
                    aria-describedby="inputName"
                    required
                />
                <div className="invalid-feedback">{formErrors?.username}</div>
            </div>
            <div className="mb-3 has-validation">
                <label
                    htmlFor="inputPassword1"
                    className="form-label text-gray fw-bold py-0 "
                >
                    <i className="bi bi-unlock-fill me-2 fs-5"></i>
                    Придумайте пароль
                </label>
                <input
                    type="password"
                    className={`form-control ${
                        startedWriting.password === true &&
                        (formErrors?.password ? "is-invalid" : "is-valid")
                    }`}
                    style={{ borderRadius: "7px" }}
                    name="password"
                    value={password}
                    id="inputPassword1"
                    onChange={(e) => {
                        inputChange(e);
                        setStartedWriting({
                            ...startedWriting,
                            password: true,
                        });
                    }}
                    required
                />
                <div className="invalid-feedback">{formErrors?.password}</div>
            </div>
            <div className="mb-3 has-validation">
                <label
                    htmlFor="inputPassword2"
                    className="form-label text-gray fw-bold py-0 "
                >
                    <i className="bi bi-lock-fill me-2 fs-5"></i>
                    Повторите пароль
                </label>
                <input
                    type="password"
                    className={`form-control ${
                        startedWriting.password2 === true &&
                        (formErrors?.password2 ? "is-invalid" : "is-valid")
                    }`}
                    style={{ borderRadius: "7px" }}
                    name="password2"
                    value={password2}
                    id="inputPassword2"
                    onChange={(e) => {
                        inputChange(e);
                        setStartedWriting({
                            ...startedWriting,
                            password2: true,
                        });
                    }}
                    required
                />
                <div className="invalid-feedback">{formErrors?.password2}</div>
            </div>
            <div className="mb-3">
                <label
                    htmlFor="inputSelect1"
                    className="form-label text-gray fw-bold py-0 "
                >
                    <i className="bi bi-ui-radios me-2 fs-5"></i>
                    Выберите тип регистрации
                </label>
                <select
                    onChange={(e) => inputChange(e)}
                    className="form-select"
                    name="userType"
                    required
                    id="inputSelect1"
                    value={userType}
                    name="userType"
                    style={{ borderRadius: "7px" }}
                    aria-label="Default select example"
                >
                    <option value="COMPANY">Компания</option>
                    <option value="FREELANCER">Фрилансер</option>
                </select>
            </div>
            <SubmitButton
                disabled={!isEmpty(formErrors)}
                submitFunction={submitHandler}
                isLoading={isLoading}
            />
        </>
    );
}

export default Form;
