import { Navigate } from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuth"


const ProtectedRoute = ({element}) => {
    const {isAuthenticated} = useAuthContext();

  return isAuthenticated ? element : <Navigate to='/' />;
}

export default ProtectedRoute
