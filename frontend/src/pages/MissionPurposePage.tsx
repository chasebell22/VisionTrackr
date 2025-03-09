import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

interface MissionPurpose {
  _id: string;
  mission: string;
  purpose: string;
  lastUpdated: string;
}

const MissionPurposePage: React.FC = () => {
  const [missionPurpose, setMissionPurpose] = useState<MissionPurpose | null>(null);
  const [formData, setFormData] = useState({
    mission: '',
    purpose: ''
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const { token } = useAuth();

  useEffect(() => {
    fetchMissionPurpose();
  }, []);

  const fetchMissionPurpose = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/mission-purpose`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      if (response.data) {
        setMissionPurpose(response.data);
        setFormData({
          mission: response.data.mission || '',
          purpose: response.data.purpose || ''
        });
      }
      setError('');
    } catch (err) {
      console.error('Error fetching mission and purpose:', err);
      setError('Failed to load your mission and purpose. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
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
      if (missionPurpose?._id) {
        // Update existing mission and purpose
        await axios.put(
          `${import.meta.env.VITE_API_URL}/api/mission-purpose/${missionPurpose._id}`,
          formData,
          { headers: { Authorization: `Bearer ${token}` } }
        );
      } else {
        // Create new mission and purpose
        await axios.post(
          `${import.meta.env.VITE_API_URL}/api/mission-purpose`,
          formData,
          { headers: { Authorization: `Bearer ${token}` } }
        );
      }
      
      setSuccess('Your mission and purpose have been saved successfully!');
      fetchMissionPurpose();
    } catch (err) {
      console.error('Error saving mission and purpose:', err);
      setError('Failed to save your mission and purpose. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (loading && !missionPurpose) {
    return <div className="flex justify-center items-center h-full">Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Mission & Purpose</h1>
        <p className="text-gray-600">Define your personal mission statement and life purpose</p>
      </div>

      {error && <div className="bg-red-50 p-4 rounded-md text-red-700">{error}</div>}
      {success && <div className="bg-green-50 p-4 rounded-md text-green-700">{success}</div>}

      <div className="card">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="mission" className="block text-lg font-medium text-gray-700 mb-2">
              Your Mission Statement
            </label>
            <p className="text-sm text-gray-500 mb-3">
              A mission statement defines what you do, who you do it for, and how you do it. It should be clear, concise, and actionable.
            </p>
            <textarea
              id="mission"
              name="mission"
              value={formData.mission}
              onChange={handleInputChange}
              rows={4}
              placeholder="Example: To inspire and empower others through my actions and words, creating positive change in my community."
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
            />
          </div>
          
          <div>
            <label htmlFor="purpose" className="block text-lg font-medium text-gray-700 mb-2">
              Your Life Purpose
            </label>
            <p className="text-sm text-gray-500 mb-3">
              Your life purpose is your "why" - the deeper reason behind everything you do. It connects to your values and gives meaning to your goals.
            </p>
            <textarea
              id="purpose"
              name="purpose"
              value={formData.purpose}
              onChange={handleInputChange}
              rows={6}
              placeholder="Example: My purpose is to use my creativity and compassion to help others overcome challenges and find joy in their lives. I believe that by sharing my unique perspective and skills, I can contribute to a more connected and empathetic world."
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
            />
          </div>
          
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary"
            >
              {loading ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>

      {missionPurpose && missionPurpose.lastUpdated && (
        <p className="text-sm text-gray-500 text-right">
          Last updated: {new Date(missionPurpose.lastUpdated).toLocaleDateString()}
        </p>
      )}

      <div className="card bg-gray-50">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Tips for Writing Effective Statements</h2>
        
        <div className="space-y-4">
          <div>
            <h3 className="font-medium text-gray-900">Mission Statement Tips:</h3>
            <ul className="list-disc pl-5 text-gray-700 space-y-1">
              <li>Keep it concise (1-2 sentences)</li>
              <li>Focus on what you do and who you serve</li>
              <li>Use action verbs</li>
              <li>Make it memorable and inspiring</li>
              <li>Align it with your core values</li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium text-gray-900">Life Purpose Tips:</h3>
            <ul className="list-disc pl-5 text-gray-700 space-y-1">
              <li>Connect it to your deepest values</li>
              <li>Consider what brings you joy and fulfillment</li>
              <li>Think about how you want to impact others</li>
              <li>Reflect on your unique strengths and talents</li>
              <li>It's okay to revise it as you grow and evolve</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MissionPurposePage; 