import { Navigate } from "react-router-dom"

const ProtectRoute = ({ reverse = false, children }) => {
    const cookies = document.cookie;
    return (cookies.includes("token") ^ reverse) ? children : <Navigate to="/login" />;
}

export default ProtectRoute