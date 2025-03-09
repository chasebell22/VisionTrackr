import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

interface Task {
  _id: string;
  title: string;
  description?: string;
  date: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
  relatedGoal?: string;
}

const DailyPlannerPage: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [goals, setGoals] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [currentTaskId, setCurrentTaskId] = useState<string | null>(null);
  const { token } = useAuth();

  const [selectedDate, setSelectedDate] = useState<string>(
    new Date().toISOString().split('T')[0]
  );

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: new Date().toISOString().split('T')[0],
    completed: false,
    priority: 'medium',
    relatedGoal: ''
  });

  const priorities = [
    { value: 'low', label: 'Low' },
    { value: 'medium', label: 'Medium' },
    { value: 'high', label: 'High' }
  ];

  useEffect(() => {
    fetchData();
  }, [selectedDate]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [tasksRes, goalsRes] = await Promise.all([
        axios.get(`${import.meta.env.VITE_API_URL}/api/tasks?date=${selectedDate}`, {
          headers: { Authorization: `Bearer ${token}` }
        }),
        axios.get(`${import.meta.env.VITE_API_URL}/api/goals`, {
          headers: { Authorization: `Bearer ${token}` }
        })
      ]);
      
      setTasks(tasksRes.data);
      setGoals(goalsRes.data);
      setError('');
    } catch (err) {
      console.error('Error fetching data:', err);
      setError('Failed to load tasks. Please try again later.');
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

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData({
      ...formData,
      [name]: checked
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccess('');
    setError('');
    
    try {
      if (isEditing && currentTaskId) {
        // Update existing task
        await axios.put(
          `${import.meta.env.VITE_API_URL}/api/tasks/${currentTaskId}`,
          formData,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setSuccess('Task updated successfully!');
      } else {
        // Create new task
        await axios.post(
          `${import.meta.env.VITE_API_URL}/api/tasks`,
          formData,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setSuccess('New task created successfully!');
      }
      
      resetForm();
      fetchData();
    } catch (err) {
      console.error('Error saving task:', err);
      setError('Failed to save your task. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (task: Task) => {
    setFormData({
      title: task.title,
      description: task.description || '',
      date: new Date(task.date).toISOString().split('T')[0],
      completed: task.completed,
      priority: task.priority,
      relatedGoal: task.relatedGoal || ''
    });
    setCurrentTaskId(task._id);
    setIsEditing(true);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await axios.delete(`${import.meta.env.VITE_API_URL}/api/tasks/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setSuccess('Task deleted successfully!');
        fetchData();
      } catch (err) {
        console.error('Error deleting task:', err);
        setError('Failed to delete task. Please try again.');
      }
    }
  };

  const toggleTaskCompletion = async (task: Task) => {
    try {
      await axios.put(
        `${import.meta.env.VITE_API_URL}/api/tasks/${task._id}`,
        { ...task, completed: !task.completed },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchData();
    } catch (err) {
      console.error('Error updating task completion:', err);
      setError('Failed to update task. Please try again.');
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      date: selectedDate,
      completed: false,
      priority: 'medium',
      relatedGoal: ''
    });
    setIsEditing(false);
    setCurrentTaskId(null);
  };

  const getPriorityLabel = (value: string) => {
    return priorities.find(p => p.value === value)?.label || value;
  };

  const getPriorityClass = (priority: string) => {
    switch (priority) {
      case 'low':
        return 'bg-blue-100 text-blue-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'high':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getRelatedGoalTitle = (goalId: string) => {
    const goal = goals.find(g => g._id === goalId);
    return goal ? goal.title : '';
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(e.target.value);
    setFormData({
      ...formData,
      date: e.target.value
    });
  };

  if (loading && tasks.length === 0) {
    return <div className="flex justify-center items-center h-full">Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Daily Planner</h1>
        <p className="text-gray-600">Plan and track your daily tasks to achieve your goals</p>
      </div>

      {error && <div className="bg-red-50 p-4 rounded-md text-red-700">{error}</div>}
      {success && <div className="bg-green-50 p-4 rounded-md text-green-700">{success}</div>}

      <div className="flex justify-center mb-6">
        <div className="relative max-w-sm">
          <label htmlFor="date-selector" className="block text-sm font-medium text-gray-700 mb-1">
            Select Date
          </label>
          <input
            type="date"
            id="date-selector"
            value={selectedDate}
            onChange={handleDateChange}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <div className="card">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              {isEditing ? 'Edit Task' : 'Add New Task'}
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
                  placeholder="E.g., Complete project proposal"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                />
              </div>
              
              <div>
                <label htmlFor="priority" className="block text-sm font-medium text-gray-700">
                  Priority
                </label>
                <select
                  id="priority"
                  name="priority"
                  value={formData.priority}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                >
                  {priorities.map(priority => (
                    <option key={priority.value} value={priority.value}>
                      {priority.label}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label htmlFor="relatedGoal" className="block text-sm font-medium text-gray-700">
                  Related Goal (Optional)
                </label>
                <select
                  id="relatedGoal"
                  name="relatedGoal"
                  value={formData.relatedGoal}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                >
                  <option value="">None</option>
                  {goals.map(goal => (
                    <option key={goal._id} value={goal._id}>
                      {goal.title}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                  Description (Optional)
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={3}
                  placeholder="Add any details or notes about this task"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                />
              </div>
              
              <div className="flex items-center">
                <input
                  id="completed"
                  name="completed"
                  type="checkbox"
                  checked={formData.completed}
                  onChange={handleCheckboxChange}
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                />
                <label htmlFor="completed" className="ml-2 block text-sm text-gray-700">
                  Mark as completed
                </label>
              </div>
              
              <div className="flex space-x-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="btn btn-primary"
                >
                  {loading ? 'Saving...' : isEditing ? 'Update Task' : 'Add Task'}
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
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Tasks for {new Date(selectedDate).toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </h2>
            
            {tasks.length === 0 ? (
              <p className="text-gray-500">No tasks planned for this day. Add your first task to get started.</p>
            ) : (
              <div className="space-y-4">
                {tasks
                  .sort((a, b) => {
                    // Sort by completion status first
                    if (a.completed !== b.completed) {
                      return a.completed ? 1 : -1;
                    }
                    
                    // Then sort by priority
                    const priorityOrder = { high: 0, medium: 1, low: 2 };
                    return priorityOrder[a.priority as keyof typeof priorityOrder] - 
                           priorityOrder[b.priority as keyof typeof priorityOrder];
                  })
                  .map((task) => (
                    <div 
                      key={task._id} 
                      className={`border rounded-lg p-4 hover:shadow-md transition-shadow ${
                        task.completed ? 'bg-gray-50' : ''
                      }`}
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex items-start space-x-3">
                          <div className="pt-1">
                            <input
                              type="checkbox"
                              checked={task.completed}
                              onChange={() => toggleTaskCompletion(task)}
                              className="h-5 w-5 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                            />
                          </div>
                          <div>
                            <h3 className={`font-medium ${task.completed ? 'text-gray-500 line-through' : 'text-gray-900'}`}>
                              {task.title}
                            </h3>
                            <div className="flex space-x-2 text-sm text-gray-500 mt-1">
                              <span className={`px-2 py-0.5 rounded-full ${getPriorityClass(task.priority)}`}>
                                {getPriorityLabel(task.priority)}
                              </span>
                              {task.relatedGoal && (
                                <span className="bg-purple-100 text-purple-800 px-2 py-0.5 rounded-full">
                                  Goal: {getRelatedGoalTitle(task.relatedGoal)}
                                </span>
                              )}
                            </div>
                            {task.description && (
                              <p className={`mt-2 text-sm ${task.completed ? 'text-gray-500' : 'text-gray-700'}`}>
                                {task.description}
                              </p>
                            )}
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleEdit(task)}
                            className="text-blue-600 hover:text-blue-800"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(task._id)}
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

export default DailyPlannerPage; 