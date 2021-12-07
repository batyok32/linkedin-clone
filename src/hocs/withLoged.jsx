import useLoged from "./useLoged";

const WithLoged = (props) => useLoged(props) && props.children;

export default WithLoged;
