import { Navigate } from "react-router-dom"
import apiClient from "../axiosConfig";
import { useState } from "react";

const ProtectRoute = ({ reverse = false, children }) => {
    const [component, setComponent] = useState("");
    apiClient.get("/api/user/role", { withCredentials: true })
    .then(response => (response.data.success ^ reverse) ? setComponent(children) : setComponent(<Navigate to="/" />))
    .catch(error => {
        if (reverse) setComponent(children);
        else {
            console.error(error.message);
            setComponent(<Navigate to="/" />);
        }
    });
    return (
        <>{component}</>
    )
}

export default ProtectRoute