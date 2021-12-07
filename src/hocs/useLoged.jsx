import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

// const mapState = ({ auth }) => ({
// 	isAuthenticated: auth.isAuthenticated,
// });

const useLoged = () => {
    const isAuthenticated = useSelector(({ auth }) => auth?.isAuthenticated);
    // const { isAuthenticated } = useSelector(mapState);
    const history = useHistory();

    useEffect(() => {
        if (isAuthenticated) {
            history.push("/");
        }
    }, [isAuthenticated, history]);
    return true;
};

export default useLoged;
