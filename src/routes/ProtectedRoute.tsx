import { Navigate } from "react-router-dom";

interface ProtectedRouteProps{
    token: string,
    children: any
}

const ProtectedRoute = ( props: ProtectedRouteProps) => {


    if (!props.token) {
      return <Navigate to="/login" />;
    }
    return props.children;
};

export default ProtectedRoute;