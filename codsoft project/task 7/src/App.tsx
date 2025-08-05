import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ProjectProvider } from './context/ProjectContext';
import Sidebar from './components/Sidebar';
import DashboardPage from './pages/DashboardPage';
import ProjectsPage from './pages/ProjectsPage';
import TasksPage from './pages/TasksPage';
import ProjectDetailPage from './pages/ProjectDetailPage';
import AuthPage from './pages/AuthPage';
import CreateProjectModal from './components/CreateProjectModal';

function AppContent() {
  const { user } = useAuth();
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [showCreateProjectModal, setShowCreateProjectModal] = useState(false);

  if (!user) {
    return <AuthPage onNavigate={setCurrentPage} />;
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <DashboardPage onNavigate={setCurrentPage} />;
      case 'projects':
        return <ProjectsPage onNavigate={setCurrentPage} />;
      case 'tasks':
        return <TasksPage onNavigate={setCurrentPage} />;
      case 'project-detail':
        return <ProjectDetailPage onNavigate={setCurrentPage} />;
      case 'team':
      case 'calendar':
      case 'reports':
      case 'settings':
        return (
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <h2 className="text-xl font-semibold text-gray-900 mb-2 capitalize">
                {currentPage} Page
              </h2>
              <p className="text-gray-600">This feature is coming soon!</p>
            </div>
          </div>
        );
      default:
        return <DashboardPage onNavigate={setCurrentPage} />;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar
        currentPage={currentPage}
        onNavigate={setCurrentPage}
        onCreateProject={() => setShowCreateProjectModal(true)}
      />
      
      <main className="flex-1 p-6">
        {renderPage()}
      </main>

      <CreateProjectModal
        isOpen={showCreateProjectModal}
        onClose={() => setShowCreateProjectModal(false)}
      />
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <ProjectProvider>
        <AppContent />
      </ProjectProvider>
    </AuthProvider>
  );
}

export default App;