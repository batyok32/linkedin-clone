export const getJobsConfig = (filterData, loadMore) => {
    const { profession, city, company, minSalary, maxSalary, date, order } =
        filterData;
    let config = "";
    console.log("FilterData", filterData);
    if (profession && profession >= 0) {
        let oldconf = config;
        config = `${oldconf}profession=${profession}&&`;
    }
    if (city) {
        let oldconf = config;
        config = `${oldconf}city=${city}&&`;
    }
    if (company) {
        let oldconf = config;
        config = `${oldconf}company=${company}&&`;
    }
    if (minSalary) {
        let oldconf = config;
        config = `${oldconf}min_salary=${minSalary}&&`;
    }
    if (maxSalary) {
        let oldconf = config;
        config = `${oldconf}max_salary=${maxSalary}&&`;
    }
    if (date) {
        let oldconf = config;
        config = `${oldconf}date=${date}&&`;
    }
    if (order) {
        let oldconf = config;
        config = `${oldconf}o=${order}&&`;
    }
    if (loadMore) {
        let oldconf = config;
        config = `${oldconf}limit=20&&offset=${loadMore}`;
    }
    console.log("CONFIG", config);
    return config;
};

export const getFreelancersConfig = (filterData, loadMore) => {
    const { profession, city, full_name, date, order } = filterData;
    let config = "";
    console.log("FilterData", filterData);
    if (profession && profession >= 0) {
        let oldconf = config;
        config = `${oldconf}profession=${profession}&&`;
    }
    if (city) {
        let oldconf = config;
        config = `${oldconf}city=${city}&&`;
    }
    if (full_name) {
        let oldconf = config;
        config = `${oldconf}full_name=${full_name}&&`;
    }

    if (date) {
        let oldconf = config;
        config = `${oldconf}date=${date}&&`;
    }
    if (order) {
        let oldconf = config;
        config = `${oldconf}o=${order}&&`;
    }
    if (loadMore) {
        let oldconf = config;
        config = `${oldconf}limit=20&&offset=${loadMore}`;
    }
    console.log("CONFIG", config);
    return config;
};
