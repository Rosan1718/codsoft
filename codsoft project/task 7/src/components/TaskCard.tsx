import React from 'react';
import { Calendar, User, Clock, Flag, MessageSquare } from 'lucide-react';
import { Task } from '../types';
import { mockUsers } from '../data/mockData';

interface TaskCardProps {
  task: Task;
  onStatusChange: (taskId: string, status: Task['status']) => void;
  onEdit: (task: Task) => void;
  onClick: (task: Task) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, onStatusChange, onEdit, onClick }) => {
  const assignee = mockUsers.find(user => user.id === task.assigneeId);
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'todo':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      case 'in-progress':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'review':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'completed':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'text-red-500';
      case 'medium':
        return 'text-yellow-500';
      case 'low':
        return 'text-green-500';
      default:
        return 'text-gray-500';
    }
  };

  const isOverdue = task.dueDate && new Date() > task.dueDate && task.status !== 'completed';
  const daysLeft = task.dueDate ? Math.ceil((task.dueDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)) : null;

  return (
    <div 
      className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-all duration-200 cursor-pointer group"
      onClick={() => onClick(task)}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <h4 className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
            {task.title}
          </h4>
          {task.description && (
            <p className="text-sm text-gray-600 mt-1 line-clamp-2">
              {task.description}
            </p>
          )}
        </div>
        
        <div className="flex items-center space-x-2">
          <Flag className={`w-4 h-4 ${getPriorityColor(task.priority)}`} />
          <select
            value={task.status}
            onChange={(e) => {
              e.stopPropagation();
              onStatusChange(task.id, e.target.value as Task['status']);
            }}
            className={`text-xs font-medium px-2 py-1 rounded border ${getStatusColor(task.status)} focus:outline-none focus:ring-2 focus:ring-blue-500`}
            onClick={(e) => e.stopPropagation()}
          >
            <option value="todo">To Do</option>
            <option value="in-progress">In Progress</option>
            <option value="review">Review</option>
            <option value="completed">Completed</option>
          </select>
        </div>
      </div>

      {/* Tags */}
      {task.tags.length > 0 && (
        <div className="flex flex-wrap gap-1 mb-3">
          {task.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded"
            >
              {tag}
            </span>
          ))}
          {task.tags.length > 3 && (
            <span className="text-xs text-gray-500">+{task.tags.length - 3} more</span>
          )}
        </div>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center space-x-3">
          {assignee && (
            <div className="flex items-center space-x-2">
              <User className="w-4 h-4 text-gray-400" />
              <img
                src={assignee.avatar}
                alt={assignee.name}
                className="w-6 h-6 rounded-full"
                title={assignee.name}
              />
            </div>
          )}
          
          {task.estimatedHours && (
            <div className="flex items-center space-x-1 text-gray-500">
              <Clock className="w-4 h-4" />
              <span>{task.estimatedHours}h</span>
            </div>
          )}
        </div>

        <div className="flex items-center space-x-2">
          {task.dueDate && (
            <div className={`flex items-center space-x-1 ${
              isOverdue ? 'text-red-600' : daysLeft && daysLeft <= 3 ? 'text-yellow-600' : 'text-gray-500'
            }`}>
              <Calendar className="w-4 h-4" />
              <span className="text-xs">
                {isOverdue 
                  ? 'Overdue' 
                  : daysLeft === 0 
                    ? 'Due today' 
                    : daysLeft === 1 
                      ? 'Due tomorrow'
                      : task.dueDate.toLocaleDateString()
                }
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskCard;