import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

const mapState = ({ auth }) => ({
    isAuthenticated: auth.isAuthenticated,
    user: auth.user,
});

const useCompany = () => {
    // const isAuthenticated = useSelector(({ auth }) => auth?.isAuthenticated);
    const { isAuthenticated, user } = useSelector(mapState);
    const history = useHistory();

    useEffect(() => {
        if (!isAuthenticated || !user?.type === "COMPANY") {
            history.push("/");
        }
    }, [isAuthenticated, user, history]);
    return true;
};

export default useCompany;
