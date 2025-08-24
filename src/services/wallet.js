export class WalletService {
    constructor() {
        this.provider = null;
        this.signer = null;
    }

    async connectMetaMask() {
        if (!window.ethereum) {
            throw new Error('MetaMask not detected');
        }

        try {
            await window.ethereum.request({ method: 'eth_requestAccounts' });
            this.provider = new ethers.providers.Web3Provider(window.ethereum);
            this.signer = this.provider.getSigner();

            const address = await this.signer.getAddress();
            return { address, provider: this.provider };
        } catch (error) {
            throw new Error('Failed to connect to MetaMask');
        }
    }

    async signMessage(message) {
        if (!this.signer) {
            throw new Error('Wallet not connected');
        }

        try {
            return await this.signer.signMessage(message);
        } catch (error) {
            throw new Error('Failed to sign message');
        }
    }

    async getAddress() {
        if (!this.signer) {
            throw new Error('Wallet not connected');
        }
        return await this.signer.getAddress();
    }

    generateNonce() {
        return Math.random().toString(36).substring(2, 15) +
            Math.random().toString(36).substring(2, 15);
    }
}

// frontend/src/hooks/useAuth.js
import { useState, useContext, createContext, useEffect } from 'react';
import apiService from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('authToken');
        if (token) {
            apiService.setToken(token);
            // Verify token and get user data
            fetchUserProfile();
        } else {
            setLoading(false);
        }
    }, []);

    const fetchUserProfile = async () => {
        try {
            const response = await apiService.getUserProfile();
            setUser(response.data.user);
            setIsAuthenticated(true);
        } catch (error) {
            console.error('Failed to fetch user profile:', error);
            logout();
        } finally {
            setLoading(false);
        }
    };

    const login = async (credentials) => {
        try {
            const response = await apiService.login(credentials);
            const { token, user } = response.data;

            apiService.setToken(token);
            setUser(user);
            setIsAuthenticated(true);

            return response;
        } catch (error) {
            throw error;
        }
    };

    const register = async (userData) => {
        try {
            const response = await apiService.register(userData);
            const { token, user } = response.data;

            apiService.setToken(token);
            setUser(user);
            setIsAuthenticated(true);

            return response;
        } catch (error) {
            throw error;
        }
    };

    const logout = () => {
        apiService.clearToken();
        setUser(null);
        setIsAuthenticated(false);
    };

    const value = {
        user,
        loading,
        isAuthenticated,
        login,
        register,
        logout
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};