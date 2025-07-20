import { createSlice } from '@reduxjs/toolkit';
import { jwtDecode } from 'jwt-decode';

const getInitialState = () => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    let isAuthenticated = false;
    let userData = null;
    let isLoading = true; // Set to true to show loading screen initially

    if (token && user) {
        try {
            const decodedToken = jwtDecode(token);
            const expirationTime = decodedToken.exp * 1000;

            if (Date.now() < expirationTime) {
                isAuthenticated = true;
                userData = JSON.parse(user);
            } else {
                localStorage.removeItem('token');
                localStorage.removeItem('user');
            }
        } catch (error) {
            console.error('Failed to decode or parse token/user from localStorage:', error);
            localStorage.removeItem('token');
            localStorage.removeItem('user');
        }
    }

    isLoading = false; // Set to false after the synchronous check is done

    return {
        isAuthenticated,
        user: userData,
        token: token,
        isLoading,
    };
};

const authSlice = createSlice({
    name: 'auth',
    initialState: getInitialState(),
    reducers: {
        loginSuccess: (state, action) => {
            const { token, user } = action.payload;
            state.isAuthenticated = true;
            state.token = token;
            state.user = user;
            state.isLoading = false;
        },
        logout: (state) => {
            state.isAuthenticated = false;
            state.token = null;
            state.user = null;
            state.isLoading = false;
        },
        setLoading: (state, action) => {
            state.isLoading = action.payload;
        },
        // To update user profile
        updateUserProfile: (state, action) => {
            state.user = { ...state.user, ...action.payload };
            localStorage.setItem('user', JSON.stringify(state.user));
            console.log('User profile updated in Redux and localStorage.');
        },
    },
});

export const { loginSuccess, logout, setLoading, updateUserProfile } = authSlice.actions;

export default authSlice.reducer;   