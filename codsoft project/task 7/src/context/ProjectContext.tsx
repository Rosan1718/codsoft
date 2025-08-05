import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Project, Task } from '../types';
import { mockProjects } from '../data/mockData';

interface ProjectContextType {
  projects: Project[];
  currentProject: Project | null;
  setCurrentProject: (project: Project | null) => void;
  createProject: (project: Omit<Project, 'id' | 'createdAt' | 'updatedAt' | 'tasks' | 'progress'>) => void;
  updateProject: (id: string, updates: Partial<Project>) => void;
  deleteProject: (id: string) => void;
  createTask: (task: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateTask: (id: string, updates: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  getProjectTasks: (projectId: string) => Task[];
}

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

export const useProject = () => {
  const context = useContext(ProjectContext);
  if (!context) {
    throw new Error('useProject must be used within a ProjectProvider');
  }
  return context;
};

interface ProjectProviderProps {
  children: ReactNode;
}

export const ProjectProvider: React.FC<ProjectProviderProps> = ({ children }) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [currentProject, setCurrentProject] = useState<Project | null>(null);

  useEffect(() => {
    const savedProjects = localStorage.getItem('projects');
    if (savedProjects) {
      const parsedProjects = JSON.parse(savedProjects).map((p: any) => ({
        ...p,
        startDate: new Date(p.startDate),
        endDate: new Date(p.endDate),
        createdAt: new Date(p.createdAt),
        updatedAt: new Date(p.updatedAt),
        tasks: p.tasks.map((t: any) => ({
          ...t,
          dueDate: t.dueDate ? new Date(t.dueDate) : undefined,
          createdAt: new Date(t.createdAt),
          updatedAt: new Date(t.updatedAt)
        }))
      }));
      setProjects(parsedProjects);
    } else {
      setProjects(mockProjects);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('projects', JSON.stringify(projects));
  }, [projects]);

  const createProject = (projectData: Omit<Project, 'id' | 'createdAt' | 'updatedAt' | 'tasks' | 'progress'>) => {
    const newProject: Project = {
      ...projectData,
      id: Date.now().toString(),
      tasks: [],
      progress: 0,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    setProjects(prev => [...prev, newProject]);
  };

  const updateProject = (id: string, updates: Partial<Project>) => {
    setProjects(prev => prev.map(project => 
      project.id === id 
        ? { ...project, ...updates, updatedAt: new Date() }
        : project
    ));
  };

  const deleteProject = (id: string) => {
    setProjects(prev => prev.filter(project => project.id !== id));
    if (currentProject?.id === id) {
      setCurrentProject(null);
    }
  };

  const createTask = (taskData: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newTask: Task = {
      ...taskData,
      id: Date.now().toString(),
      createdAt: new Date(),
      updatedAt: new Date()
    };

    setProjects(prev => prev.map(project => {
      if (project.id === taskData.projectId) {
        const updatedTasks = [...project.tasks, newTask];
        const completedTasks = updatedTasks.filter(t => t.status === 'completed').length;
        const progress = updatedTasks.length > 0 ? (completedTasks / updatedTasks.length) * 100 : 0;
        
        return {
          ...project,
          tasks: updatedTasks,
          progress,
          updatedAt: new Date()
        };
      }
      return project;
    }));
  };

  const updateTask = (id: string, updates: Partial<Task>) => {
    setProjects(prev => prev.map(project => ({
      ...project,
      tasks: project.tasks.map(task => 
        task.id === id 
          ? { ...task, ...updates, updatedAt: new Date() }
          : task
      ),
      updatedAt: new Date()
    })));

    // Recalculate project progress
    const updatedProjects = projects.map(project => {
      const updatedTasks = project.tasks.map(task => 
        task.id === id ? { ...task, ...updates } : task
      );
      const completedTasks = updatedTasks.filter(t => t.status === 'completed').length;
      const progress = updatedTasks.length > 0 ? (completedTasks / updatedTasks.length) * 100 : 0;
      
      return { ...project, tasks: updatedTasks, progress };
    });
    
    setProjects(updatedProjects);
  };

  const deleteTask = (id: string) => {
    setProjects(prev => prev.map(project => ({
      ...project,
      tasks: project.tasks.filter(task => task.id !== id),
      updatedAt: new Date()
    })));
  };

  const getProjectTasks = (projectId: string): Task[] => {
    const project = projects.find(p => p.id === projectId);
    return project?.tasks || [];
  };

  const value = {
    projects,
    currentProject,
    setCurrentProject,
    createProject,
    updateProject,
    deleteProject,
    createTask,
    updateTask,
    deleteTask,
    getProjectTasks
  };

  return (
    <ProjectContext.Provider value={value}>
      {children}
    </ProjectContext.Provider>
  );
};