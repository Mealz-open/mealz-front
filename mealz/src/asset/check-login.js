import { Navigate } from 'react-router-dom';

function PrivateRoute({ children }) {
    const isLoggedin = !!localStorage.getItem('token');
    return isLoggedin ? children : <Navigate to="/login" replace />;
}

export default PrivateRoute;