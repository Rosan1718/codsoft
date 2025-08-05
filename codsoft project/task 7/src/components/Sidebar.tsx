import React from 'react';
import { 
  Home, 
  FolderOpen, 
  CheckSquare, 
  Users, 
  Calendar, 
  BarChart3, 
  Settings,
  Plus
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface SidebarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  onCreateProject: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentPage, onNavigate, onCreateProject }) => {
  const { user } = useAuth();

  const navigation = [
    { name: 'Dashboard', key: 'dashboard', icon: Home },
    { name: 'Projects', key: 'projects', icon: FolderOpen },
    { name: 'Tasks', key: 'tasks', icon: CheckSquare },
    { name: 'Team', key: 'team', icon: Users },
    { name: 'Calendar', key: 'calendar', icon: Calendar },
    { name: 'Reports', key: 'reports', icon: BarChart3 },
    { name: 'Settings', key: 'settings', icon: Settings }
  ];

  return (
    <div className="bg-white border-r border-gray-200 w-64 min-h-screen flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="bg-blue-600 p-2 rounded-lg">
            <FolderOpen className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">ProjectHub</h1>
            <p className="text-sm text-gray-500">Manage your projects</p>
          </div>
        </div>
      </div>

      {/* Create Project Button */}
      <div className="p-4">
        <button
          onClick={onCreateProject}
          className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2 font-medium"
        >
          <Plus className="w-5 h-5" />
          <span>New Project</span>
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 pb-4">
        <ul className="space-y-1">
          {navigation.map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.key;
            
            return (
              <li key={item.key}>
                <button
                  onClick={() => onNavigate(item.key)}
                  className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                    isActive
                      ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-600'
                      : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <Icon className={`w-5 h-5 ${isActive ? 'text-blue-600' : 'text-gray-400'}`} />
                  <span className="font-medium">{item.name}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* User Info */}
      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center space-x-3">
          <img
            src={user?.avatar}
            alt={user?.name}
            className="w-10 h-10 rounded-full"
          />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">{user?.name}</p>
            <p className="text-xs text-gray-500 capitalize">{user?.role}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;