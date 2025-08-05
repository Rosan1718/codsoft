export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: 'admin' | 'manager' | 'member';
  createdAt: Date;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  status: 'planning' | 'active' | 'completed' | 'on-hold';
  priority: 'low' | 'medium' | 'high';
  startDate: Date;
  endDate: Date;
  progress: number;
  ownerId: string;
  teamMembers: string[];
  tasks: Task[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  status: 'todo' | 'in-progress' | 'review' | 'completed';
  priority: 'low' | 'medium' | 'high';
  assigneeId?: string;
  projectId: string;
  dueDate?: Date;
  estimatedHours?: number;
  actualHours?: number;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Comment {
  id: string;
  content: string;
  authorId: string;
  taskId: string;
  createdAt: Date;
}

export interface Notification {
  id: string;
  type: 'task_assigned' | 'task_completed' | 'deadline_approaching' | 'project_updated';
  title: string;
  message: string;
  userId: string;
  read: boolean;
  createdAt: Date;
}