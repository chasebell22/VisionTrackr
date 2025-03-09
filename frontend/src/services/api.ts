import axios from 'axios';

// Create an axios instance
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5001/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add a request interceptor to add the auth token to every request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Core Values API
export const coreValuesApi = {
  getValues: () => api.get('/values'),
  createValues: (values: string[]) => api.post('/values', { values }),
  updateValues: (id: string, values: string[]) => api.put(`/values/${id}`, { values }),
  deleteValues: (id: string) => api.delete(`/values/${id}`)
};

// Mission & Purpose API
export const missionPurposeApi = {
  getMissionPurpose: () => api.get('/mission-purpose'),
  createMissionPurpose: (mission: string, purpose: string) => 
    api.post('/mission-purpose', { mission, purpose })
};

// Visions API
export const visionsApi = {
  getVisions: () => api.get('/visions'),
  createVision: (timeframe: '10-year' | '3-year' | '1-year', description: string) => 
    api.post('/visions', { timeframe, description }),
  updateVision: (id: string, description: string) => 
    api.put(`/visions/${id}`, { description }),
  deleteVision: (id: string) => api.delete(`/visions/${id}`)
};

// Goals API
export const goalsApi = {
  getGoals: () => api.get('/goals'),
  createGoal: (description: string, dueDate: string) => 
    api.post('/goals', { description, dueDate }),
  updateGoal: (id: string, data: { description?: string; status?: 'in progress' | 'completed'; dueDate?: string }) => 
    api.put(`/goals/${id}`, data),
  deleteGoal: (id: string) => api.delete(`/goals/${id}`)
};

// Daily Tasks API
export const tasksApi = {
  getTasks: (date?: string) => api.get('/tasks', { params: { date } }),
  createTask: (description: string, date: string, linkedGoal?: string) => 
    api.post('/tasks', { description, date, linkedGoal }),
  updateTask: (id: string, data: { description?: string; completed?: boolean; date?: string; linkedGoal?: string }) => 
    api.put(`/tasks/${id}`, data),
  deleteTask: (id: string) => api.delete(`/tasks/${id}`)
};

export default api; 