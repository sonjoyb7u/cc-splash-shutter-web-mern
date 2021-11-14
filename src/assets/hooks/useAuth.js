import { useContext } from "react";
import { AuthContext } from "../contexts/AuthProvider";


const useAuth = () => {
    const authUserInfo = useContext(AuthContext);
    return authUserInfo;
}

export default useAuth;