import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthProvider";
import Spinner from "../components/Spinner";
import { useEffect, useState } from "react";

const ProtectRoute = ({ reverse = false, admin=false, children }) => {
  const { isLoggedIn, authLoading, userRole } = useAuth();
  const [component, setComponent] = useState("");

  useEffect(() => {
    if (authLoading) setComponent(<Spinner />);
    else if (reverse && !isLoggedIn) setComponent(children);
    else if (!admin && isLoggedIn) setComponent(children);
    else if (admin && isLoggedIn && userRole==="admin") setComponent(children);
    else if (!reverse && !isLoggedIn) setComponent(<Navigate to="/login" />);
    else setComponent(<Navigate to="/" />);
  }, [isLoggedIn, authLoading]);

  return (
    <>{component}</>
  );
}

export default ProtectRoute;