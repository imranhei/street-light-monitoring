import { Outlet, Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux';

const PrivateRoutes = () => {
    const valid = useSelector(state => state.login.value);
    return (
        valid ? <Outlet /> : <Navigate to="/login" />
    )
}
export default PrivateRoutes;
