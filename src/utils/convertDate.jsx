export default (date) => {
    let convert = new Date(date);
    var yyyy = convert.getFullYear().toString();
    var mm = (convert.getMonth() + 1).toString();
    var dd = convert.getDate().toString();

    var mmChars = mm.split("");
    var ddChars = dd.split("");
    return (
        yyyy +
        "-" +
        (mmChars[1] ? mm : "0" + mmChars[0]) +
        "-" +
        (ddChars[1] ? dd : "0" + ddChars[0])
    );
};

export const getUpdatedTime = (updated) => {
    let today = new Date();
    let release = new Date(updated);
    const diffTime = Math.abs(today - release);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
};
