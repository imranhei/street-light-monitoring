import { Outlet, Navigate } from 'react-router-dom'
import UserService from '../secureStore/userInfo';

const PrivateRoutes = () => {
    const user = UserService.getUser
    const valid = Object.keys(user).length === 0;
    return (
        valid ? <Outlet /> : <Navigate to="/login" />
    )
}
export default PrivateRoutes;
