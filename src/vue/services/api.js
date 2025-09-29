const API_BASE_URL = 'http://127.0.0.1:3000';

class ApiService {
    constructor() {
        this.token = localStorage.getItem('token') || null;
        this.userEmail = localStorage.getItem('userEmail') || null;
    }

    setToken(token) {
        this.token = token;
        if (token) {
            localStorage.setItem('token', token);
        } else {
            localStorage.removeItem('token');
        }
    }

    setUserEmail(email) {
        this.userEmail = email;
        if (email) {
            localStorage.setItem('userEmail', email);
        } else {
            localStorage.removeItem('userEmail');
        }
    }

    getUserEmail() {
        return this.userEmail;
    }

    getToken() {
        return this.token;
    }

    async request(endpoint, options = {}) {
        const url = `${API_BASE_URL}${endpoint}`;
        const headers = {
            'Content-Type': 'application/json',
            ...options.headers,
        };

        if (this.token && options.authenticated) {
            headers['Authorization'] = `Bearer ${this.token}`;
        }

        try {
            const response = await fetch(url, {
                ...options,
                headers,
            });

            if (!response.ok) {
                throw new Error(`HTTP ${response.status}`);
            }

            const data = await response.json();
            return data;
        } catch (error) {
            console.error('API Error:', error);
            return {
                code: 'ERROR',
                message: 'Erreur de connexion au serveur',
                data: null
            };
        }
    }

    // Auth endpoints
    async login(email, password) {
        const data = await this.request('/login', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
        });

        if (data.code === '200' && data.data) {
            this.setToken(data.data);
            this.setUserEmail(email);
        }

        return data;
    }

    async signup(userData) {
        return await this.request('/signup', {
            method: 'POST',
            body: JSON.stringify(userData),
        });
    }

    async resetPassword(email) {
        return await this.request('/reset-password', {
            method: 'POST',
            body: JSON.stringify({ email }),
        });
    }

    async checkAuth() {
        return await this.request('/check', {
            method: 'GET',
            authenticated: true,
        });
    }

    // Articles endpoints
    async getArticles() {
        return await this.request('/articles/', {
            method: 'GET',
        });
    }

    async getArticle(id) {
        return await this.request(`/articles/${id}`, {
            method: 'GET',
        });
    }

    async saveArticle(article) {
        console.log('Envoi article:', article); // Debug
        return await this.request('/articles/save', {
            method: 'POST',
            body: JSON.stringify(article),
        });
    }

    async deleteArticle(id) {
        return await this.request(`/articles/${id}`, {
            method: 'DELETE',
        });
    }

    logout() {
        this.setToken(null);
        this.setUserEmail(null);
    }
}

export default new ApiService();