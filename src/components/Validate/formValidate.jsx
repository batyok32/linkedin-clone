import formErrors from "../../redux/messages/formErrors.json";

export function validateRegisterInfo(values) {
    let errors = {};
    if (!values.username.trim()) {
        errors.username = formErrors.usernameError;
    }

    if (!values.password.trim()) {
        errors.password = formErrors.passwordError;
    }
    if (values.password !== values?.password2) {
        errors.password2 = formErrors.password2passwordError;
    }
    if (!values.password2.trim()) {
        errors.password2 = formErrors.password2Error;
    }

    return errors;
}

// Сompany Signup
export function validateRegisterCompanyProfile(values) {
    let errors = {};
    // console.log("Validating", values);

    if (!values.fullName.trim()) {
        errors.fullName = formErrors.companyName;
    }

    if (!values.compInfo.trim()) {
        errors.compInfo = formErrors.usernameError;
    }

    if (!values.address.trim()) {
        errors.address = formErrors.usernameError;
    }

    if (values.phone_number) {
        if (
            (values?.phone_number >= 99361000000 &&
                values?.phone_number <= 99365999999) ||
            (values?.phone_number >= 99312000000 &&
                values.phone_number <= 99312999999)
        ) {
            // pass
        } else {
            errors.phone_number = formErrors.phoneNumber2;
        }
    } else {
        errors.phone_number = formErrors.phoneNumber;
    }

    if (!values.image.raw) {
        errors.image = "";
    }

    return errors;
}

// Freelancer Signup
export function validateRegisterFreelanacerProfile(values) {
    let errors = {};
    // console.log("Validating", values);

    if (!values.fullName.trim()) {
        errors.fullName = formErrors.freelancerName;
    }

    if (!values.experience.trim()) {
        errors.experience = formErrors.freelancerinput;
    }
    if (!values.knowledge.trim()) {
        errors.knowledge = formErrors.freelancerinput;
    }
    if (!values.projects.trim()) {
        errors.projects = formErrors.freelancerinput;
    }
    if (!values.profesion) {
        errors.profession = formErrors.professionchoose;
    }

    if (values.phone_number) {
        if (
            (values?.phone_number >= 99361000000 &&
                values?.phone_number <= 99365999999) ||
            (values?.phone_number >= 99312000000 &&
                values.phone_number <= 99312999999)
        ) {
            // pass
        } else {
            errors.phone_number = formErrors.phoneNumber2;
        }
    } else {
        errors.phone_number = formErrors.phoneNumber;
    }
    // if (values.min_cost >= values.max_cost) {
    //     errors.max_cost = formErrors.freelancermaxcost;
    // }

    // if (values.min_cost < 0) {
    //     errors.min_cost = formErrors.freelancercost;
    // }
    // if (values.max_cost < 0) {
    //     errors.max_cost = formErrors.freelancercost;
    // }

    if (!values.image.raw) {
        errors.image = "Error";
    }

    return errors;
}

// Job Post
export function validateJobPost(values) {
    let errors = {};
    console.log("Validating", values);

    // NAME
    if (!values.name.trim()) {
        errors.name = formErrors.freelancerinput;
    }
    // PROFESSION
    if (!values.profession) {
        errors.compInfo = formErrors.professionchoose;
    }

    // SALARY
    if (values.after_meeting) {
        // pass
    } else {
        if (values.min_salary >= values.max_salary) {
            errors.max_salary = formErrors.freelancermaxcost;
        }

        if (values.min_salary < 0) {
            errors.min_salary = formErrors.freelancercost;
        }
        if (values.max_salary < 0) {
            errors.max_salary = formErrors.freelancercost;
        }
    }
    // EXPERIENCE
    if (values.min_experience >= values.max_experience) {
        errors.max_experience = formErrors.freelancermaxcost;
    }

    if (values.min_experience < 0) {
        errors.min_experience = formErrors.freelancercost;
    }
    if (values.max_experience < 0) {
        errors.max_experience = formErrors.freelancercost;
    }

    // WORK TIME
    if (values.work_time <= 0 || values.work_time > 24) {
        errors.work_time = formErrors.notcorrectfield;
    }

    // SKILLS
    if (!values.skills.trim()) {
        errors.skills = formErrors.freelancerinput;
    }
    // DESCRIPTION
    if (!values.description.trim()) {
        errors.description = formErrors.freelancerinput;
    }

    return errors;
}
