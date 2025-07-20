import { loginSuccess, logout } from './authSlice';

// A simple custom middleware to sync Redux state with localStorage
const localStorageMiddleware = (store) => (next) => (action) => {
    // Process the action first and get the new state
    const result = next(action);

    // Check if the dispatched action is a login or logout
    if (loginSuccess.match(action)) {
        // Get the updated state from the store after the action has been processed
        const { auth } = store.getState();
        
        // Save the token and user data to localStorage
        localStorage.setItem('token', auth.token);
        localStorage.setItem('user', JSON.stringify(auth.user));
        console.log('Token and user data saved to localStorage.'); // For debugging
    } else if (logout.match(action)) {
        // If it's a logout action, remove the items from localStorage
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        console.log('Token and user data removed from localStorage.'); // For debugging
    }

    return result;
};

export default localStorageMiddleware;