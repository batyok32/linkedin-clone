import useCompany from "./useCompany";

const OnlyCompany = (props) => useCompany(props) && props.children;

export default OnlyCompany;
