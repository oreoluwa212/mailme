const API_BASE_URL = 'http://localhost:5000/api';

class ApiService {
    constructor() {
        this.token = localStorage.getItem('authToken');
    }

    setToken(token) {
        this.token = token;
        localStorage.setItem('authToken', token);
    }

    clearToken() {
        this.token = null;
        localStorage.removeItem('authToken');
    }

    async request(endpoint, options = {}) {
        const url = `${API_BASE_URL}${endpoint}`;
        const config = {
            headers: {
                'Content-Type': 'application/json',
                ...(this.token && { Authorization: `Bearer ${this.token}` })
            },
            ...options
        };

        if (config.body && typeof config.body === 'object') {
            config.body = JSON.stringify(config.body);
        }

        try {
            const response = await fetch(url, config);
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Request failed');
            }

            return data;
        } catch (error) {
            console.error('API Request Error:', error);
            throw error;
        }
    }

    // Auth methods
    async register(userData) {
        return this.request('/auth/register', {
            method: 'POST',
            body: userData
        });
    }

    async login(credentials) {
        return this.request('/auth/login', {
            method: 'POST',
            body: credentials
        });
    }

    // Wallet methods
    async connectWallet(walletData) {
        return this.request('/wallet/connect', {
            method: 'POST',
            body: walletData
        });
    }

    async generateKeys() {
        return this.request('/wallet/generate-keys', {
            method: 'POST'
        });
    }

    // Message methods
    async sendMessage(messageData) {
        return this.request('/messages/send', {
            method: 'POST',
            body: messageData
        });
    }

    async getInbox(page = 1, limit = 20) {
        return this.request(`/messages/inbox?page=${page}&limit=${limit}`);
    }

    async getSentMessages(page = 1, limit = 20) {
        return this.request(`/messages/sent?page=${page}&limit=${limit}`);
    }

    // User methods
    async getUserProfile() {
        return this.request('/users/profile');
    }

    async updateProfile(profileData) {
        return this.request('/users/profile', {
            method: 'PUT',
            body: profileData
        });
    }
}

export default new ApiService();