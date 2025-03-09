import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

interface Goal {
  _id: string;
  title: string;
  description: string;
  category: string;
  deadline: string;
  status: 'not-started' | 'in-progress' | 'completed';
  relatedVision?: string;
}

const GoalsPage: React.FC = () => {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [visions, setVisions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [currentGoalId, setCurrentGoalId] = useState<string | null>(null);
  const { token } = useAuth();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'personal',
    deadline: '',
    status: 'not-started',
    relatedVision: ''
  });

  const categories = [
    { value: 'personal', label: 'Personal' },
    { value: 'professional', label: 'Professional' },
    { value: 'financial', label: 'Financial' },
    { value: 'health', label: 'Health & Wellness' },
    { value: 'relationships', label: 'Relationships' },
    { value: 'spiritual', label: 'Spiritual' },
    { value: 'community', label: 'Community' },
    { value: 'other', label: 'Other' }
  ];

  const statuses = [
    { value: 'not-started', label: 'Not Started' },
    { value: 'in-progress', label: 'In Progress' },
    { value: 'completed', label: 'Completed' }
  ];

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [goalsRes, visionsRes] = await Promise.all([
        axios.get(`${import.meta.env.VITE_API_URL}/api/goals`, {
          headers: { Authorization: `Bearer ${token}` }
        }),
        axios.get(`${import.meta.env.VITE_API_URL}/api/visions`, {
          headers: { Authorization: `Bearer ${token}` }
        })
      ]);
      
      setGoals(goalsRes.data);
      setVisions(visionsRes.data);
      setError('');
    } catch (err) {
      console.error('Error fetching data:', err);
      setError('Failed to load goals. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccess('');
    setError('');
    
    try {
      if (isEditing && currentGoalId) {
        // Update existing goal
        await axios.put(
          `${import.meta.env.VITE_API_URL}/api/goals/${currentGoalId}`,
          formData,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setSuccess('Goal updated successfully!');
      } else {
        // Create new goal
        await axios.post(
          `${import.meta.env.VITE_API_URL}/api/goals`,
          formData,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setSuccess('New goal created successfully!');
      }
      
      resetForm();
      fetchData();
    } catch (err) {
      console.error('Error saving goal:', err);
      setError('Failed to save your goal. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (goal: Goal) => {
    setFormData({
      title: goal.title,
      description: goal.description,
      category: goal.category,
      deadline: goal.deadline ? new Date(goal.deadline).toISOString().split('T')[0] : '',
      status: goal.status,
      relatedVision: goal.relatedVision || ''
    });
    setCurrentGoalId(goal._id);
    setIsEditing(true);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this goal?')) {
      try {
        await axios.delete(`${import.meta.env.VITE_API_URL}/api/goals/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setSuccess('Goal deleted successfully!');
        fetchData();
      } catch (err) {
        console.error('Error deleting goal:', err);
        setError('Failed to delete goal. Please try again.');
      }
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      category: 'personal',
      deadline: '',
      status: 'not-started',
      relatedVision: ''
    });
    setIsEditing(false);
    setCurrentGoalId(null);
  };

  const getCategoryLabel = (value: string) => {
    return categories.find(cat => cat.value === value)?.label || value;
  };

  const getStatusLabel = (value: string) => {
    return statuses.find(s => s.value === value)?.label || value;
  };

  const getStatusClass = (status: string) => {
    switch (status) {
      case 'not-started':
        return 'bg-gray-100 text-gray-800';
      case 'in-progress':
        return 'bg-blue-100 text-blue-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getRelatedVisionTitle = (visionId: string) => {
    const vision = visions.find(v => v._id === visionId);
    return vision ? vision.title : '';
  };

  if (loading && goals.length === 0) {
    return <div className="flex justify-center items-center h-full">Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Goals</h1>
        <p className="text-gray-600">Set and track your goals to turn your visions into reality</p>
      </div>

      {error && <div className="bg-red-50 p-4 rounded-md text-red-700">{error}</div>}
      {success && <div className="bg-green-50 p-4 rounded-md text-green-700">{success}</div>}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <div className="card">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              {isEditing ? 'Edit Goal' : 'Create New Goal'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                  Title
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                  placeholder="E.g., Run a marathon"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                />
              </div>
              
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                  Category
                </label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                >
                  {categories.map(category => (
                    <option key={category.value} value={category.value}>
                      {category.label}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label htmlFor="deadline" className="block text-sm font-medium text-gray-700">
                  Deadline
                </label>
                <input
                  type="date"
                  id="deadline"
                  name="deadline"
                  value={formData.deadline}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                />
              </div>
              
              <div>
                <label htmlFor="status" className="block text-sm font-medium text-gray-700">
                  Status
                </label>
                <select
                  id="status"
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                >
                  {statuses.map(status => (
                    <option key={status.value} value={status.value}>
                      {status.label}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label htmlFor="relatedVision" className="block text-sm font-medium text-gray-700">
                  Related Vision (Optional)
                </label>
                <select
                  id="relatedVision"
                  name="relatedVision"
                  value={formData.relatedVision}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                >
                  <option value="">None</option>
                  {visions.map(vision => (
                    <option key={vision._id} value={vision._id}>
                      {vision.title}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={4}
                  placeholder="Describe your goal, including specific actions and milestones"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                />
              </div>
              
              <div className="flex space-x-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="btn btn-primary"
                >
                  {loading ? 'Saving...' : isEditing ? 'Update Goal' : 'Create Goal'}
                </button>
                {isEditing && (
                  <button
                    type="button"
                    onClick={resetForm}
                    className="btn btn-outline"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
        
        <div className="md:col-span-2">
          <div className="card">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Your Goals</h2>
            
            {goals.length === 0 ? (
              <p className="text-gray-500">You haven't created any goals yet. Create your first goal to get started.</p>
            ) : (
              <div className="space-y-4">
                {goals.map((goal) => (
                  <div key={goal._id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium text-gray-900">{goal.title}</h3>
                        <div className="flex flex-wrap gap-2 text-sm text-gray-500 mt-1">
                          <span className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">
                            {getCategoryLabel(goal.category)}
                          </span>
                          <span className={`px-2 py-0.5 rounded-full ${getStatusClass(goal.status)}`}>
                            {getStatusLabel(goal.status)}
                          </span>
                          {goal.deadline && (
                            <span className="bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded-full">
                              Due: {new Date(goal.deadline).toLocaleDateString()}
                            </span>
                          )}
                        </div>
                        {goal.relatedVision && (
                          <p className="text-sm text-purple-600 mt-1">
                            Related to vision: {getRelatedVisionTitle(goal.relatedVision)}
                          </p>
                        )}
                        <p className="mt-2 text-gray-700">{goal.description}</p>
                      </div>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleEdit(goal)}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(goal._id)}
                          className="text-red-600 hover:text-red-800"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GoalsPage; 