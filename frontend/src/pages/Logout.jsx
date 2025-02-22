import { useNavigate } from "react-router-dom";
import apiClient from "../axiosConfig"

const Logout = () => {
  const navigate = useNavigate();
  apiClient.get("/api/user/logout", { withCredentials: true })
  .then(response => navigate("/"))
  .catch ((error) => {
    const message = (error.response) ? error.response.data.message : error.message;
    console.error(message);
    navigate("/");
  });
}

export default Logout