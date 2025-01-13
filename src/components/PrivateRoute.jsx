import PropTypes from 'prop-types';

import { UserAuth } from "../context/authContext";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
    const { session } = UserAuth();

    if (session === undefined) {
        return <div>Loading...</div>;
    }

    return <div>{session ? <>{children}</> : <Navigate to="/signup" />}</div>;
};

PrivateRoute.propTypes = {
    children: PropTypes.node.isRequired,
}

export default PrivateRoute;