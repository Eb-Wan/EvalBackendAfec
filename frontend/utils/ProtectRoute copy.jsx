import { Navigate } from "react-router-dom"

const ProtectRoute = ({ reverse, children }) => {
    const token = localStorage.getItem("token");
    return (token ^ reverse) ? children : <Navigate to="/login" />;
}

export default ProtectRoute