import { Navigate } from "react-router-dom"
import apiClient from "../axiosConfig";
import { useState } from "react";

const AdminRoute = ({ children }) => {
    const [component, setComponent] = useState("");
    apiClient.get("/api/user/role", { withCredentials: true })
    .then(response => (response.data.role === "admin") ? setComponent(children) : setComponent(<Navigate to="/" />))
    .catch(error => {
        console.error(error.message);
        setComponent(<Navigate to="/" />)
    });
    return (
        <>{component}</>
    )
}

export default AdminRoute