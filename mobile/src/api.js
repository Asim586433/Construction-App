import axios from 'axios';

// Map 'localhost' to the machine IP if testing on real device,
// or 10.0.2.2 if testing on Android Simulator,
// or localhost if testing on Web/iOS Simulator.
// For MVP demo, localhost works for web bundles, we will assume localhost.
// (In a real mobile deployment, ensure to replace this with your computer's local IP)

const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL || 'http://127.0.0.1:3000/api';

export const apiClient = axios.create({
    baseURL: API_BASE_URL,
    timeout: 10000,
});

export const getHistory = async () => {
    try {
        const response = await apiClient.get('/history');
        return response.data;
    } catch (error) {
        console.error('getHistory Error', error.message);
        return [];
    }
};

export const askQuestion = async (question) => {
    try {
        const response = await apiClient.post('/chat', { question });
        return response.data;
    } catch (error) {
        console.error('askQuestion Error', error.message);
        return { answer: 'Error reaching server. Please check your connection or try again later.' };
    }
};

export const getTips = async (searchQuery = '') => {
    try {
        const response = await apiClient.get(`/kb?q=${encodeURIComponent(searchQuery)}`);
        return response.data;
    } catch (error) {
        console.error('getTips Error', error.message);
        return [];
    }
};

export const addTip = async (title, category, content) => {
    try {
        const response = await apiClient.post('/kb', { title, category, content });
        return response.data;
    } catch (error) {
        console.error('addTip Error', error.message);
        return { error: 'Failed' };
    }
};

export const getTools = async () => {
    try {
        const response = await apiClient.get('/tools');
        return response.data;
    } catch (error) {
        console.error('getTools Error', error.message);
        return [];
    }
};
