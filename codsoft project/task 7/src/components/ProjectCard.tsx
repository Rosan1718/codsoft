import React from 'react';
import { Calendar, Users, MoreVertical, Clock, AlertCircle } from 'lucide-react';
import { Project } from '../types';
import { mockUsers } from '../data/mockData';

interface ProjectCardProps {
  project: Project;
  onSelect: (project: Project) => void;
  onEdit: (project: Project) => void;
  onDelete: (id: string) => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, onSelect, onEdit, onDelete }) => {
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

  const teamMembers = mockUsers.filter(user => project.teamMembers.includes(user.id));
  const daysLeft = Math.ceil((project.endDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
  const isOverdue = daysLeft < 0;
  const isNearDeadline = daysLeft <= 7 && daysLeft >= 0;

  return (
    <div 
      className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-all duration-200 cursor-pointer group"
      onClick={() => onSelect(project)}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
            {project.name}
          </h3>
          <p className="text-gray-600 text-sm mt-1 line-clamp-2">
            {project.description}
          </p>
        </div>
        
        <div className="flex items-center space-x-2">
          <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(project.status)}`}>
            {project.status.replace('-', ' ')}
          </span>
          <button
            onClick={(e) => {
              e.stopPropagation();
              // Show dropdown menu
            }}
            className="text-gray-400 hover:text-gray-600 p-1"
          >
            <MoreVertical className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-700">Progress</span>
          <span className="text-sm text-gray-600">{Math.round(project.progress)}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${project.progress}%` }}
          />
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="flex items-center space-x-2">
          <CheckSquare className="w-4 h-4 text-gray-400" />
          <span className="text-sm text-gray-600">
            {project.tasks.filter(t => t.status === 'completed').length}/{project.tasks.length} tasks
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <Users className="w-4 h-4 text-gray-400" />
          <span className="text-sm text-gray-600">
            {project.teamMembers.length} members
          </span>
        </div>
      </div>

      {/* Team Members */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex -space-x-2">
          {teamMembers.slice(0, 3).map((member) => (
            <img
              key={member.id}
              src={member.avatar}
              alt={member.name}
              className="w-8 h-8 rounded-full border-2 border-white"
              title={member.name}
            />
          ))}
          {teamMembers.length > 3 && (
            <div className="w-8 h-8 rounded-full bg-gray-100 border-2 border-white flex items-center justify-center">
              <span className="text-xs font-medium text-gray-600">
                +{teamMembers.length - 3}
              </span>
            </div>
          )}
        </div>

        <div className={`flex items-center space-x-1 ${getPriorityColor(project.priority)}`}>
          <AlertCircle className="w-4 h-4" />
          <span className="text-sm font-medium capitalize">{project.priority}</span>
        </div>
      </div>

      {/* Deadline */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Calendar className="w-4 h-4 text-gray-400" />
          <span className="text-sm text-gray-600">
            Due {project.endDate.toLocaleDateString()}
          </span>
        </div>
        
        {(isOverdue || isNearDeadline) && (
          <div className={`flex items-center space-x-1 ${isOverdue ? 'text-red-600' : 'text-yellow-600'}`}>
            <Clock className="w-4 h-4" />
            <span className="text-sm font-medium">
              {isOverdue ? `${Math.abs(daysLeft)} days overdue` : `${daysLeft} days left`}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectCard;