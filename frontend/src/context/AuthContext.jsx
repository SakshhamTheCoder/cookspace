import { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const verifyUser = async () => {
            const authData = JSON.parse(localStorage.getItem('authData'));
            if (authData && authData.token) {
                try {
                    const res = await api.get('/auth/me');
                    setUser({ ...res.data, token: authData.token });
                } catch (error) {
                    console.error('Token invalid or expired', error);
                    logout();
                }
            }
            setLoading(false);
        };
        verifyUser();
    }, []);

    const login = async (email, password) => {
        const res = await api.post('/auth/login', { email, password });
        setUser(res.data);
        localStorage.setItem('authData', JSON.stringify(res.data));
        navigate('/');
    };

    const register = async (email, password) => {
        const res = await api.post('/auth/register', { email, password });
        setUser(res.data);
        localStorage.setItem('authData', JSON.stringify(res.data));
        navigate('/');
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('authData');
        navigate('/login');
    };

    if (loading) return null; // Or a beautiful loading spinner

    return (
        <AuthContext.Provider value={{ user, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
