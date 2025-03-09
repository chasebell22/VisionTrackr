import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

interface Value {
  _id: string;
  title: string;
  description: string;
  priority: number;
}

const ValuesPage: React.FC = () => {
  const [values, setValues] = useState<Value[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [newValue, setNewValue] = useState({ title: '', description: '', priority: 1 });
  const [isEditing, setIsEditing] = useState(false);
  const [currentValueId, setCurrentValueId] = useState<string | null>(null);
  const { token } = useAuth();

  useEffect(() => {
    fetchValues();
  }, []);

  const fetchValues = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/values`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setValues(response.data);
      setError('');
    } catch (err) {
      console.error('Error fetching values:', err);
      setError('Failed to load values. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewValue({
      ...newValue,
      [name]: name === 'priority' ? parseInt(value) : value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isEditing && currentValueId) {
        await axios.put(
          `${import.meta.env.VITE_API_URL}/api/values/${currentValueId}`,
          newValue,
          { headers: { Authorization: `Bearer ${token}` } }
        );
      } else {
        await axios.post(
          `${import.meta.env.VITE_API_URL}/api/values`,
          newValue,
          { headers: { Authorization: `Bearer ${token}` } }
        );
      }
      resetForm();
      fetchValues();
    } catch (err) {
      console.error('Error saving value:', err);
      setError('Failed to save value. Please try again.');
    }
  };

  const handleEdit = (value: Value) => {
    setNewValue({
      title: value.title,
      description: value.description,
      priority: value.priority
    });
    setCurrentValueId(value._id);
    setIsEditing(true);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this value?')) {
      try {
        await axios.delete(`${import.meta.env.VITE_API_URL}/api/values/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        fetchValues();
      } catch (err) {
        console.error('Error deleting value:', err);
        setError('Failed to delete value. Please try again.');
      }
    }
  };

  const resetForm = () => {
    setNewValue({ title: '', description: '', priority: 1 });
    setIsEditing(false);
    setCurrentValueId(null);
  };

  if (loading && values.length === 0) {
    return <div className="flex justify-center items-center h-full">Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Personal Values</h1>
        <p className="text-gray-600">Define and prioritize your core values to guide your decisions and goals</p>
      </div>

      {error && <div className="bg-red-50 p-4 rounded-md text-red-700">{error}</div>}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <div className="card">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              {isEditing ? 'Edit Value' : 'Add New Value'}
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
                  value={newValue.title}
                  onChange={handleInputChange}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                />
              </div>
              
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={newValue.description}
                  onChange={handleInputChange}
                  rows={3}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                />
              </div>
              
              <div>
                <label htmlFor="priority" className="block text-sm font-medium text-gray-700">
                  Priority (1-10)
                </label>
                <select
                  id="priority"
                  name="priority"
                  value={newValue.priority}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                >
                  {[...Array(10)].map((_, i) => (
                    <option key={i + 1} value={i + 1}>
                      {i + 1}
                    </option>
                  ))}
                </select>
              </div>
              
              <div className="flex space-x-2">
                <button
                  type="submit"
                  className="btn btn-primary"
                >
                  {isEditing ? 'Update' : 'Add'} Value
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
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Your Values</h2>
            
            {values.length === 0 ? (
              <p className="text-gray-500">You haven't defined any values yet. Add your first value to get started.</p>
            ) : (
              <div className="space-y-4">
                {values.sort((a, b) => a.priority - b.priority).map((value) => (
                  <div key={value._id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium text-gray-900">{value.title}</h3>
                        <p className="text-sm text-gray-500">Priority: {value.priority}</p>
                        <p className="mt-2 text-gray-700">{value.description}</p>
                      </div>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleEdit(value)}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(value._id)}
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

export default ValuesPage; 