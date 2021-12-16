import useFreelancer from "./useFreelancer";

const OnlyFreelancer = (props) => useFreelancer(props) && props.children;

export default OnlyFreelancer;
