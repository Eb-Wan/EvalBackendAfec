import { useNavigate } from "react-router-dom";
import apiClient from "../axiosConfig"

const Logout = async () => {
  const navigate = useNavigate();
  try {
    await apiClient.get("/api/user/logout", { withCredentials: true });
    navigate("/");
  } catch (error) {
    navigate("/");
  }
  logout();
}

export default Logout