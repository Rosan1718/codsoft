import React from 'react';
import { 
  FolderOpen, 
  CheckSquare, 
  Clock, 
  TrendingUp, 
  Users, 
  Calendar,
  AlertTriangle,
  Target
} from 'lucide-react';
import { useProject } from '../context/ProjectContext';
import { useAuth } from '../context/AuthContext';
import { mockUsers } from '../data/mockData';

interface DashboardPageProps {
  onNavigate: (page: string) => void;
}

const DashboardPage: React.FC<DashboardPageProps> = ({ onNavigate }) => {
  const { projects } = useProject();
  const { user } = useAuth();

  // Calculate statistics
  const totalProjects = projects.length;
  const activeProjects = projects.filter(p => p.status === 'active').length;
  const completedProjects = projects.filter(p => p.status === 'completed').length;
  
  const allTasks = projects.flatMap(p => p.tasks);
  const totalTasks = allTasks.length;
  const completedTasks = allTasks.filter(t => t.status === 'completed').length;
  const myTasks = allTasks.filter(t => t.assigneeId === user?.id);
  const myPendingTasks = myTasks.filter(t => t.status !== 'completed');
  
  const overdueTasks = allTasks.filter(t => 
    t.dueDate && 
    new Date() > t.dueDate && 
    t.status !== 'completed'
  );

  const recentProjects = projects
    .sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime())
    .slice(0, 5);

  const upcomingDeadlines = allTasks
    .filter(t => t.dueDate && t.status !== 'completed')
    .sort((a, b) => a.dueDate!.getTime() - b.dueDate!.getTime())
    .slice(0, 5);

  const stats = [
    {
      title: 'Total Projects',
      value: totalProjects,
      icon: FolderOpen,
      color: 'blue',
      change: '+12%'
    },
    {
      title: 'Active Projects',
      value: activeProjects,
      icon: Target,
      color: 'green',
      change: '+8%'
    },
    {
      title: 'Total Tasks',
      value: totalTasks,
      icon: CheckSquare,
      color: 'purple',
      change: '+15%'
    },
    {
      title: 'My Tasks',
      value: myPendingTasks.length,
      icon: Clock,
      color: 'orange',
      change: '-5%'
    }
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      blue: 'bg-blue-100 text-blue-600',
      green: 'bg-green-100 text-green-600',
      purple: 'bg-purple-100 text-purple-600',
      orange: 'bg-orange-100 text-orange-600'
    };
    return colors[color as keyof typeof colors];
  };

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-xl p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">Welcome back, {user?.name}!</h1>
        <p className="text-blue-100">
          You have {myPendingTasks.length} pending tasks and {activeProjects} active projects.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.title} className="bg-white rounded-xl p-6 border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                </div>
                <div className={`${getColorClasses(stat.color)} p-3 rounded-lg`}>
                  <Icon className="w-6 h-6" />
                </div>
              </div>
              <div className="mt-4 flex items-center">
                <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                <span className="text-sm text-green-600 font-medium">{stat.change}</span>
                <span className="text-sm text-gray-500 ml-1">from last month</span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent Projects */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Recent Projects</h2>
            <button
              onClick={() => onNavigate('projects')}
              className="text-blue-600 hover:text-blue-700 text-sm font-medium"
            >
              View All
            </button>
          </div>
          
          <div className="space-y-3">
            {recentProjects.map((project) => (
              <div key={project.id} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <FolderOpen className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">{project.name}</h3>
                    <p className="text-sm text-gray-500">{Math.round(project.progress)}% complete</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">
                    {project.tasks.filter(t => t.status === 'completed').length}/{project.tasks.length} tasks
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Deadlines */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Upcoming Deadlines</h2>
            <button
              onClick={() => onNavigate('tasks')}
              className="text-blue-600 hover:text-blue-700 text-sm font-medium"
            >
              View All
            </button>
          </div>
          
          <div className="space-y-3">
            {upcomingDeadlines.length > 0 ? (
              upcomingDeadlines.map((task) => {
                const assignee = mockUsers.find(u => u.id === task.assigneeId);
                const daysLeft = Math.ceil((task.dueDate!.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
                const isUrgent = daysLeft <= 3;
                
                return (
                  <div key={task.id} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors">
                    <div className="flex items-center space-x-3">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        isUrgent ? 'bg-red-100' : 'bg-yellow-100'
                      }`}>
                        {isUrgent ? (
                          <AlertTriangle className="w-5 h-5 text-red-600" />
                        ) : (
                          <Calendar className="w-5 h-5 text-yellow-600" />
                        )}
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">{task.title}</h3>
                        <div className="flex items-center space-x-2">
                          {assignee && (
                            <img
                              src={assignee.avatar}
                              alt={assignee.name}
                              className="w-4 h-4 rounded-full"
                            />
                          )}
                          <p className="text-sm text-gray-500">
                            {assignee?.name || 'Unassigned'}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`text-sm font-medium ${
                        isUrgent ? 'text-red-600' : 'text-yellow-600'
                      }`}>
                        {daysLeft === 0 ? 'Due today' : 
                         daysLeft === 1 ? 'Due tomorrow' : 
                         `${daysLeft} days left`}
                      </p>
                    </div>
                  </div>
                );
              })
            ) : (
              <p className="text-gray-500 text-center py-4">No upcoming deadlines</p>
            )}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button
            onClick={() => onNavigate('projects')}
            className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <FolderOpen className="w-6 h-6 text-blue-600" />
            <div className="text-left">
              <h3 className="font-medium text-gray-900">View Projects</h3>
              <p className="text-sm text-gray-500">Manage your projects</p>
            </div>
          </button>
          
          <button
            onClick={() => onNavigate('tasks')}
            className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <CheckSquare className="w-6 h-6 text-green-600" />
            <div className="text-left">
              <h3 className="font-medium text-gray-900">My Tasks</h3>
              <p className="text-sm text-gray-500">View assigned tasks</p>
            </div>
          </button>
          
          <button
            onClick={() => onNavigate('team')}
            className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <Users className="w-6 h-6 text-purple-600" />
            <div className="text-left">
              <h3 className="font-medium text-gray-900">Team</h3>
              <p className="text-sm text-gray-500">Manage team members</p>
            </div>
          </button>
        </div>
      </div>

      {/* Alerts */}
      {overdueTasks.length > 0 && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4">
          <div className="flex items-center space-x-2 mb-2">
            <AlertTriangle className="w-5 h-5 text-red-600" />
            <h3 className="font-medium text-red-900">Overdue Tasks</h3>
          </div>
          <p className="text-red-700 text-sm">
            You have {overdueTasks.length} overdue task{overdueTasks.length > 1 ? 's' : ''} that need attention.
          </p>
          <button
            onClick={() => onNavigate('tasks')}
            className="mt-2 text-red-600 hover:text-red-700 text-sm font-medium"
          >
            View Overdue Tasks →
          </button>
        </div>
      )}
    </div>
  );
};

export default DashboardPage;