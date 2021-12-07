import {
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    USER_LOADED_SUCCESS,
    AUTHENTICATED_SUCCESS,
    LOGOUT,
    PROFILE_LOADED_SUCCESS,
} from "../types/types";

import errors from "./../messages/errors.json";
import success from "./../messages/success.json";
import axios from "axios";
import { authConfig, config, multipartConfig } from "../utils/config";

export const load_company = () => async (dispatch) => {
    console.log("Loading company");
    if (localStorage.getItem("access")) {
        const authConfig = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `JWT ${localStorage.getItem("access")}`,
                Accept: "application/json",
            },
        };
        try {
            const res = await axios.get(
                `${process.env.REACT_APP_API_URL}/credentials/company/me/`,
                authConfig
            );
            dispatch({
                type: PROFILE_LOADED_SUCCESS,
                payload: res.data,
            });
            console.log("LOADED COMPANY: ", res);
        } catch (error) {
            // console.log("Not authenticated");
        }
    } else {
        // console.log("Not logged");
    }
};

export const load_stranger_company = (pk) => async (dispatch) => {
    // console.log("Loading company");
    try {
        const res = await axios.get(
            `${process.env.REACT_APP_API_URL}/credentials/company/${pk}/`,
            config
        );
        return res.data;
    } catch (error) {}
};
export const load_freelancer = () => async (dispatch) => {
    console.log("Loading freeelancer");
    if (localStorage.getItem("access")) {
        try {
            const authConfig = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `JWT ${localStorage.getItem("access")}`,
                    Accept: "application/json",
                },
            };
            const res = await axios.get(
                `${process.env.REACT_APP_API_URL}/credentials/freelancer/me/`,
                authConfig
            );
            dispatch({
                type: PROFILE_LOADED_SUCCESS,
                payload: res.data,
            });
            console.log("LOADED FREELANCER: ", res);
        } catch (error) {
            // console.log("Not authenticated");
        }
    } else {
        // console.log("Not logged");
    }
};

// ===============Load=User====================================
// Taking an access token and trying to retrieve user information

export const load_user = () => async (dispatch) => {
    console.log("Loading user");
    if (localStorage.getItem("access")) {
        console.log(
            "ACCESS TOKEN FOR LOADING USER",
            localStorage.getItem("access")
        );
        try {
            const authConfig = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `JWT ${localStorage.getItem("access")}`,
                    Accept: "application/json",
                },
            };
            const res = await axios.get(
                `${process.env.REACT_APP_API_URL}/auth/users/me/`,
                authConfig
            );
            dispatch({
                type: USER_LOADED_SUCCESS,
                payload: res.data,
            });
            console.log("RESULTs AFTER LOGIN", res);

            if (res.data.type === "COMPANY") {
                dispatch(load_company());
            } else if (res.data.type === "FREELANCER") {
                dispatch(load_freelancer());
            }
            // console.log("Fetched success: ", res.data);
        } catch (error) {
            // console.log("Not authenticated");
        }
    } else {
        // console.log("Not logged");
    }
};

// ===============Login====================================
// Taking credentials and send it to take the jwt token

export const login = (username, password) => async (dispatch) => {
    console.log("In login", username, password);
    const body = JSON.stringify({ username: username, password: password });
    console.log("Body", body);
    try {
        const res = await axios.post(
            `${process.env.REACT_APP_API_URL}/auth/jwt/create/`,
            body,
            config
        );
        console.log("Loged", res.data);
        await dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data,
            message: success.success3,
        });

        console.log("Loading ... user");
        await dispatch(load_user());
        return res;
    } catch (error) {
        // dispatch({
        //     type: LOGIN_FAIL,
        //     payload: errors.error4,
        // });
        // console.log("Error", error);
        return errors.error4;
    }
};
export const check_user = (username) => async (dispatch) => {
    const body = JSON.stringify({ username });
    try {
        const res = await axios.post(
            `${process.env.REACT_APP_API_URL}/credentials/user/exist/`,
            body,
            config
        );
        return res.data;
    } catch (error) {
        return errors.error4;
    }
};
export const check_company = (full_name) => async (dispatch) => {
    const body = JSON.stringify({ full_name });
    try {
        const res = await axios.post(
            `${process.env.REACT_APP_API_URL}/credentials/company/exist/`,
            body,
            config
        );
        return res.data;
    } catch (error) {
        return errors.error4;
    }
};

export const get_access_token = () => async (dispatch) => {
    const body = JSON.stringify({ refresh: localStorage.getItem("refresh") });
    // console.log("Started refreshing token");
    try {
        const res = await axios.post(
            `${process.env.REACT_APP_API_URL}/auth/jwt/refresh/`,
            body,
            config
        );
        // console.log("Logged successfully")
        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data,
        });
    } catch (error) {
        dispatch({
            type: LOGIN_FAIL,
            payload: errors.error4,
        });
    }
};

export const checkAuthenticated = () => async (dispatch) => {
    if (localStorage.getItem("access")) {
        const body = JSON.stringify({ token: localStorage.getItem("access") });

        try {
            const res = await axios.post(
                `${process.env.REACT_APP_API_URL}/auth/jwt/verify/`,
                body,
                authConfig
            );

            if (res.data.code !== "token_not_valid") {
                // console.log("Checked successfully")
                dispatch({
                    type: AUTHENTICATED_SUCCESS,
                });
            } else {
                dispatch(get_access_token());
                // console.log("Token not valid");
            }
        } catch (error) {
            // dispatch(get_access_token());
            // console.log("Old access token");
        }
    } else {
        console.log("No access token");
    }
};

export const logout = () => async (dispatch) => {
    // console.log("Started logout");
    dispatch({
        type: LOGOUT,
        payload: success.success4,
    });
};

export const signUpCompany = (userData, profileData) => async (dispatch) => {
    let form_data = new FormData();
    if (profileData.image) {
        form_data.append("logo", profileData.image.raw);
    }
    form_data.append("username", userData.username);
    form_data.append("password", userData.password);
    form_data.append("full_name", profileData.fullName);
    form_data.append("description", profileData.compInfo);
    form_data.append("address", profileData.address);
    form_data.append("found_date", profileData.choosedDate);
    form_data.append("company_type", profileData.companyType);
    form_data.append("phone_number", profileData.phone_number);
    try {
        const res = await axios.post(
            `${process.env.REACT_APP_API_URL}/credentials/company/`,
            form_data,
            multipartConfig
        );
        // console.log("Loging", userData.username, userData.password);
        dispatch(login(userData.username, userData.password));
        return res.data;
    } catch (error) {
        if (error.response.status === 400) {
            return error.message;
        } else {
            return errors.error5;
        }
    }
};
export const signUpFreelancer = (userData, profileData) => async (dispatch) => {
    let form_data = new FormData();
    if (profileData.image) {
        form_data.append("logo", profileData.image.raw);
    }
    form_data.append("username", userData.username);
    form_data.append("password", userData.password);
    form_data.append("full_name", profileData.fullName);
    form_data.append("profession", profileData.profesion);
    form_data.append("experience", profileData.experience);
    form_data.append("knowledge", profileData.knowledge);
    form_data.append("projects", profileData.projects);
    form_data.append("phone_number", profileData.phone_number);
    form_data.append("birth_date", profileData.birthDate);
    try {
        const res = await axios.post(
            `${process.env.REACT_APP_API_URL}/credentials/freelancer/`,
            form_data,
            multipartConfig
        );
        console.log("Loging", userData.username, userData.password);
        dispatch(login(userData.username, userData.password));
        return res.data;
    } catch (error) {
        if (error.response.status === 400) {
            return error.message;
        } else {
            return errors.error5;
        }
    }
};

// 👉
// 😱
