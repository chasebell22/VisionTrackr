import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { goalsApi, tasksApi } from '../services/api';

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

const Dashboard: React.FC = () => {
  const [goals, setGoals] = useState<any[]>([]);
  const [tasks, setTasks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [goalsRes, tasksRes] = await Promise.all([
          goalsApi.getGoals(),
          tasksApi.getTasks()
        ]);
        setGoals(goalsRes.data);
        setTasks(tasksRes.data);
      } catch (err) {
        setError('Failed to load dashboard data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Calculate statistics
  const completedGoals = goals.filter(goal => goal.status === 'completed').length;
  const totalGoals = goals.length;
  const goalCompletionRate = totalGoals > 0 ? (completedGoals / totalGoals) * 100 : 0;

  const completedTasks = tasks.filter(task => task.completed).length;
  const totalTasks = tasks.length;
  const taskCompletionRate = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

  // Chart data
  const goalChartData = {
    labels: ['Completed', 'In Progress'],
    datasets: [
      {
        data: [completedGoals, totalGoals - completedGoals],
        backgroundColor: ['#0ea5e9', '#e0f2fe'],
        borderColor: ['#0284c7', '#bae6fd'],
        borderWidth: 1,
      },
    ],
  };

  const taskChartData = {
    labels: ['Completed', 'Pending'],
    datasets: [
      {
        data: [completedTasks, totalTasks - completedTasks],
        backgroundColor: ['#10b981', '#d1fae5'],
        borderColor: ['#059669', '#a7f3d0'],
        borderWidth: 1,
      },
    ],
  };

  if (loading) {
    return <div className="flex justify-center items-center h-full">Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600">Track your progress and stay motivated</p>
      </div>

      {error && <div className="bg-red-50 p-4 rounded-md text-red-700">{error}</div>}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Progress Overview */}
        <div className="card">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Progress Overview</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="text-sm font-medium text-gray-500">Goals Completion</h3>
              <p className="text-3xl font-bold text-primary-600">{goalCompletionRate.toFixed(0)}%</p>
              <p className="text-sm text-gray-500">
                {completedGoals} of {totalGoals} goals completed
              </p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">Tasks Completion</h3>
              <p className="text-3xl font-bold text-green-600">{taskCompletionRate.toFixed(0)}%</p>
              <p className="text-sm text-gray-500">
                {completedTasks} of {totalTasks} tasks completed
              </p>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="card">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-4">
            <Link to="/goals" className="btn btn-primary text-center">
              Add New Goal
            </Link>
            <Link to="/daily-planner" className="btn btn-secondary text-center">
              Add Daily Task
            </Link>
            <Link to="/values" className="btn btn-outline text-center">
              Review Values
            </Link>
            <Link to="/visions" className="btn btn-outline text-center">
              Update Visions
            </Link>
          </div>
        </div>

        {/* Charts */}
        <div className="card">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Goals Progress</h2>
          <div className="h-64 flex items-center justify-center">
            {totalGoals > 0 ? (
              <Doughnut data={goalChartData} />
            ) : (
              <p className="text-gray-500">No goals created yet</p>
            )}
          </div>
        </div>

        <div className="card">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Tasks Progress</h2>
          <div className="h-64 flex items-center justify-center">
            {totalTasks > 0 ? (
              <Doughnut data={taskChartData} />
            ) : (
              <p className="text-gray-500">No tasks created yet</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 