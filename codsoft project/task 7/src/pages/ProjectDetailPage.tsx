import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Calendar, 
  Users, 
  Plus, 
  MoreVertical,
  Flag,
  Clock,
  CheckSquare,
  TrendingUp
} from 'lucide-react';
import { useProject } from '../context/ProjectContext';
import TaskCard from '../components/TaskCard';
import CreateTaskModal from '../components/CreateTaskModal';
import { mockUsers } from '../data/mockData';

interface ProjectDetailPageProps {
  onNavigate: (page: string) => void;
}

const ProjectDetailPage: React.FC<ProjectDetailPageProps> = ({ onNavigate }) => {
  const { currentProject, updateTask } = useProject();
  const [showCreateTaskModal, setShowCreateTaskModal] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  if (!currentProject) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">No project selected</h2>
          <button
            onClick={() => onNavigate('projects')}
            className="text-blue-600 hover:text-blue-700"
          >
            Go back to projects
          </button>
        </div>
      </div>
    );
  }

  const teamMembers = mockUsers.filter(user => currentProject.teamMembers.includes(user.id));
  const tasksByStatus = {
    todo: currentProject.tasks.filter(t => t.status === 'todo'),
    'in-progress': currentProject.tasks.filter(t => t.status === 'in-progress'),
    review: currentProject.tasks.filter(t => t.status === 'review'),
    completed: currentProject.tasks.filter(t => t.status === 'completed')
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'planning':
        return 'bg-blue-100 text-blue-800';
      case 'completed':
        return 'bg-gray-100 text-gray-800';
      case 'on-hold':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'text-red-600';
      case 'medium':
        return 'text-yellow-600';
      case 'low':
        return 'text-green-600';
      default:
        return 'text-gray-600';
    }
  };

  const handleStatusChange = (taskId: string, status: any) => {
    updateTask(taskId, { status });
  };

  const daysLeft = Math.ceil((currentProject.endDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
  const isOverdue = daysLeft < 0;

  return (
    <>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center space-x-4">
          <button
            onClick={() => onNavigate('projects')}
            className="text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-gray-900">{currentProject.name}</h1>
            <p className="text-gray-600">{currentProject.description}</p>
          </div>
          <button className="text-gray-400 hover:text-gray-600">
            <MoreVertical className="w-6 h-6" />
          </button>
        </div>

        {/* Project Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-600">Status</span>
              <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(currentProject.status)}`}>
                {currentProject.status.replace('-', ' ')}
              </span>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-600">Priority</span>
              <div className={`flex items-center space-x-1 ${getPriorityColor(currentProject.priority)}`}>
                <Flag className="w-4 h-4" />
                <span className="text-sm font-medium capitalize">{currentProject.priority}</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-600">Progress</span>
              <span className="text-sm font-bold text-gray-900">{Math.round(currentProject.progress)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${currentProject.progress}%` }}
              />
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-600">Deadline</span>
              <div className={`flex items-center space-x-1 ${isOverdue ? 'text-red-600' : 'text-gray-600'}`}>
                <Calendar className="w-4 h-4" />
                <span className="text-sm">
                  {isOverdue ? `${Math.abs(daysLeft)} days overdue` : `${daysLeft} days left`}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl border border-gray-200">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {['overview', 'tasks', 'team', 'timeline'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm capitalize transition-colors ${
                    activeTab === tab
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6">
            {activeTab === 'overview' && (
              <div className="space-y-6">
                {/* Project Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">{currentProject.tasks.length}</div>
                    <div className="text-sm text-gray-600">Total Tasks</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">
                      {currentProject.tasks.filter(t => t.status === 'completed').length}
                    </div>
                    <div className="text-sm text-gray-600">Completed</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">
                      {currentProject.tasks.filter(t => t.status === 'in-progress').length}
                    </div>
                    <div className="text-sm text-gray-600">In Progress</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-600">{teamMembers.length}</div>
                    <div className="text-sm text-gray-600">Team Members</div>
                  </div>
                </div>

                {/* Recent Activity */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
                  <div className="space-y-3">
                    {currentProject.tasks
                      .sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime())
                      .slice(0, 5)
                      .map((task) => {
                        const assignee = mockUsers.find(u => u.id === task.assigneeId);
                        return (
                          <div key={task.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                            <CheckSquare className="w-5 h-5 text-gray-400" />
                            <div className="flex-1">
                              <p className="text-sm font-medium text-gray-900">{task.title}</p>
                              <p className="text-xs text-gray-500">
                                Updated by {assignee?.name || 'Unknown'} • {task.updatedAt.toLocaleDateString()}
                              </p>
                            </div>
                          </div>
                        );
                      })}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'tasks' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold text-gray-900">Project Tasks</h3>
                  <button
                    onClick={() => setShowCreateTaskModal(true)}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add Task</span>
                  </button>
                </div>

                {/* Kanban Board */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {Object.entries(tasksByStatus).map(([status, tasks]) => (
                    <div key={status} className="bg-gray-50 rounded-xl p-4">
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="font-semibold text-gray-900 capitalize">
                          {status.replace('-', ' ')} ({tasks.length})
                        </h4>
                        <div className={`w-3 h-3 rounded-full ${
                          status === 'todo' ? 'bg-gray-400' :
                          status === 'in-progress' ? 'bg-blue-500' :
                          status === 'review' ? 'bg-yellow-500' :
                          'bg-green-500'
                        }`} />
                      </div>
                      
                      <div className="space-y-3">
                        {tasks.map((task) => (
                          <TaskCard
                            key={task.id}
                            task={task}
                            onStatusChange={handleStatusChange}
                            onEdit={() => {}}
                            onClick={() => {}}
                          />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'team' && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900">Team Members</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {teamMembers.map((member) => {
                    const memberTasks = currentProject.tasks.filter(t => t.assigneeId === member.id);
                    const completedTasks = memberTasks.filter(t => t.status === 'completed');
                    
                    return (
                      <div key={member.id} className="bg-gray-50 rounded-lg p-4">
                        <div className="flex items-center space-x-3 mb-3">
                          <img
                            src={member.avatar}
                            alt={member.name}
                            className="w-12 h-12 rounded-full"
                          />
                          <div>
                            <h4 className="font-medium text-gray-900">{member.name}</h4>
                            <p className="text-sm text-gray-500 capitalize">{member.role}</p>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Tasks assigned</span>
                            <span className="font-medium">{memberTasks.length}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Completed</span>
                            <span className="font-medium text-green-600">{completedTasks.length}</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-green-500 h-2 rounded-full"
                              style={{ 
                                width: `${memberTasks.length > 0 ? (completedTasks.length / memberTasks.length) * 100 : 0}%` 
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {activeTab === 'timeline' && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900">Project Timeline</h3>
                <div className="bg-gray-50 rounded-lg p-6 text-center">
                  <Clock className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h4 className="text-lg font-medium text-gray-900 mb-2">Timeline View</h4>
                  <p className="text-gray-600">
                    Timeline visualization would be implemented here with a library like Gantt charts.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <CreateTaskModal
        isOpen={showCreateTaskModal}
        onClose={() => setShowCreateTaskModal(false)}
        projectId={currentProject.id}
      />
    </>
  );
};

export default ProjectDetailPage;