import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { logout } from '../../store/authSlice';
export const LogoutComponent = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(logout());
        // Redirect to login page after logout
        navigate('/login', { replace: true });
    }, [dispatch, navigate]); // Add dispatch and navigate to the dependency array

    return (
        <div style={{ minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <h2>Logging out...</h2>
        </div>
    );
};

export default LogoutComponent;