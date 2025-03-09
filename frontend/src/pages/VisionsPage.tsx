import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

interface Vision {
  _id: string;
  title: string;
  description: string;
  category: string;
  timeframe: string;
}

const VisionsPage: React.FC = () => {
  const [visions, setVisions] = useState<Vision[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [currentVisionId, setCurrentVisionId] = useState<string | null>(null);
  const { token } = useAuth();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'personal',
    timeframe: '5-year'
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

  const timeframes = [
    { value: '1-year', label: '1 Year' },
    { value: '3-year', label: '3 Years' },
    { value: '5-year', label: '5 Years' },
    { value: '10-year', label: '10 Years' },
    { value: 'lifetime', label: 'Lifetime' }
  ];

  useEffect(() => {
    fetchVisions();
  }, []);

  const fetchVisions = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/visions`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setVisions(response.data);
      setError('');
    } catch (err) {
      console.error('Error fetching visions:', err);
      setError('Failed to load your vision statements. Please try again later.');
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
      if (isEditing && currentVisionId) {
        // Update existing vision
        await axios.put(
          `${import.meta.env.VITE_API_URL}/api/visions/${currentVisionId}`,
          formData,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setSuccess('Vision updated successfully!');
      } else {
        // Create new vision
        await axios.post(
          `${import.meta.env.VITE_API_URL}/api/visions`,
          formData,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setSuccess('New vision created successfully!');
      }
      
      resetForm();
      fetchVisions();
    } catch (err) {
      console.error('Error saving vision:', err);
      setError('Failed to save your vision. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (vision: Vision) => {
    setFormData({
      title: vision.title,
      description: vision.description,
      category: vision.category,
      timeframe: vision.timeframe
    });
    setCurrentVisionId(vision._id);
    setIsEditing(true);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this vision?')) {
      try {
        await axios.delete(`${import.meta.env.VITE_API_URL}/api/visions/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setSuccess('Vision deleted successfully!');
        fetchVisions();
      } catch (err) {
        console.error('Error deleting vision:', err);
        setError('Failed to delete vision. Please try again.');
      }
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      category: 'personal',
      timeframe: '5-year'
    });
    setIsEditing(false);
    setCurrentVisionId(null);
  };

  const getCategoryLabel = (value: string) => {
    return categories.find(cat => cat.value === value)?.label || value;
  };

  const getTimeframeLabel = (value: string) => {
    return timeframes.find(tf => tf.value === value)?.label || value;
  };

  if (loading && visions.length === 0) {
    return <div className="flex justify-center items-center h-full">Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Vision Statements</h1>
        <p className="text-gray-600">Create clear, inspiring visions of your ideal future</p>
      </div>

      {error && <div className="bg-red-50 p-4 rounded-md text-red-700">{error}</div>}
      {success && <div className="bg-green-50 p-4 rounded-md text-green-700">{success}</div>}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <div className="card">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              {isEditing ? 'Edit Vision' : 'Create New Vision'}
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
                  placeholder="E.g., My Ideal Career"
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
                <label htmlFor="timeframe" className="block text-sm font-medium text-gray-700">
                  Timeframe
                </label>
                <select
                  id="timeframe"
                  name="timeframe"
                  value={formData.timeframe}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                >
                  {timeframes.map(timeframe => (
                    <option key={timeframe.value} value={timeframe.value}>
                      {timeframe.label}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                  Vision Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={6}
                  required
                  placeholder="Describe your vision in vivid detail. What does success look like? How does it feel? What have you accomplished?"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                />
              </div>
              
              <div className="flex space-x-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="btn btn-primary"
                >
                  {loading ? 'Saving...' : isEditing ? 'Update Vision' : 'Create Vision'}
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
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Your Vision Statements</h2>
            
            {visions.length === 0 ? (
              <p className="text-gray-500">You haven't created any vision statements yet. Create your first vision to get started.</p>
            ) : (
              <div className="space-y-4">
                {visions.map((vision) => (
                  <div key={vision._id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium text-gray-900">{vision.title}</h3>
                        <div className="flex space-x-2 text-sm text-gray-500 mt-1">
                          <span className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">
                            {getCategoryLabel(vision.category)}
                          </span>
                          <span className="bg-purple-100 text-purple-800 px-2 py-0.5 rounded-full">
                            {getTimeframeLabel(vision.timeframe)}
                          </span>
                        </div>
                        <p className="mt-2 text-gray-700 whitespace-pre-line">{vision.description}</p>
                      </div>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleEdit(vision)}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(vision._id)}
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

export default VisionsPage; 