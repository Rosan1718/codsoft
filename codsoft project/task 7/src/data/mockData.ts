import { Project, User } from '../types';

export const mockUsers: User[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    role: 'admin',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400',
    createdAt: new Date('2024-01-01')
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    role: 'manager',
    avatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=400',
    createdAt: new Date('2024-01-02')
  },
  {
    id: '3',
    name: 'Mike Johnson',
    email: 'mike@example.com',
    role: 'member',
    avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=400',
    createdAt: new Date('2024-01-03')
  },
  {
    id: '4',
    name: 'Sarah Wilson',
    email: 'sarah@example.com',
    role: 'member',
    avatar: 'https://images.pexels.com/photos/1181424/pexels-photo-1181424.jpeg?auto=compress&cs=tinysrgb&w=400',
    createdAt: new Date('2024-01-04')
  }
];

export const mockProjects: Project[] = [
  {
    id: '1',
    name: 'E-Commerce Platform',
    description: 'Building a modern e-commerce platform with React and Node.js',
    status: 'active',
    priority: 'high',
    startDate: new Date('2024-01-15'),
    endDate: new Date('2024-04-15'),
    progress: 65,
    ownerId: '1',
    teamMembers: ['1', '2', '3'],
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-02-20'),
    tasks: [
      {
        id: '1',
        title: 'Setup project structure',
        description: 'Initialize React app and Node.js backend',
        status: 'completed',
        priority: 'high',
        assigneeId: '2',
        projectId: '1',
        dueDate: new Date('2024-01-20'),
        estimatedHours: 8,
        actualHours: 6,
        tags: ['setup', 'backend', 'frontend'],
        createdAt: new Date('2024-01-15'),
        updatedAt: new Date('2024-01-18')
      },
      {
        id: '2',
        title: 'Design user authentication',
        description: 'Implement JWT-based authentication system',
        status: 'completed',
        priority: 'high',
        assigneeId: '3',
        projectId: '1',
        dueDate: new Date('2024-01-25'),
        estimatedHours: 12,
        actualHours: 14,
        tags: ['auth', 'security', 'backend'],
        createdAt: new Date('2024-01-16'),
        updatedAt: new Date('2024-01-24')
      },
      {
        id: '3',
        title: 'Product catalog UI',
        description: 'Create product listing and detail pages',
        status: 'in-progress',
        priority: 'medium',
        assigneeId: '2',
        projectId: '1',
        dueDate: new Date('2024-02-28'),
        estimatedHours: 20,
        actualHours: 12,
        tags: ['ui', 'frontend', 'products'],
        createdAt: new Date('2024-01-20'),
        updatedAt: new Date('2024-02-15')
      },
      {
        id: '4',
        title: 'Shopping cart functionality',
        description: 'Implement add to cart, remove items, and checkout flow',
        status: 'todo',
        priority: 'high',
        assigneeId: '3',
        projectId: '1',
        dueDate: new Date('2024-03-10'),
        estimatedHours: 16,
        tags: ['cart', 'checkout', 'frontend'],
        createdAt: new Date('2024-01-22'),
        updatedAt: new Date('2024-01-22')
      }
    ]
  },
  {
    id: '2',
    name: 'Mobile App Development',
    description: 'Cross-platform mobile app using React Native',
    status: 'planning',
    priority: 'medium',
    startDate: new Date('2024-03-01'),
    endDate: new Date('2024-06-01'),
    progress: 15,
    ownerId: '2',
    teamMembers: ['2', '4'],
    createdAt: new Date('2024-02-01'),
    updatedAt: new Date('2024-02-15'),
    tasks: [
      {
        id: '5',
        title: 'Research React Native',
        description: 'Study React Native best practices and setup requirements',
        status: 'completed',
        priority: 'medium',
        assigneeId: '4',
        projectId: '2',
        dueDate: new Date('2024-02-15'),
        estimatedHours: 16,
        actualHours: 18,
        tags: ['research', 'react-native', 'mobile'],
        createdAt: new Date('2024-02-01'),
        updatedAt: new Date('2024-02-14')
      },
      {
        id: '6',
        title: 'Setup development environment',
        description: 'Configure React Native development environment and emulators',
        status: 'in-progress',
        priority: 'high',
        assigneeId: '2',
        projectId: '2',
        dueDate: new Date('2024-02-25'),
        estimatedHours: 8,
        actualHours: 4,
        tags: ['setup', 'environment', 'mobile'],
        createdAt: new Date('2024-02-10'),
        updatedAt: new Date('2024-02-20')
      }
    ]
  },
  {
    id: '3',
    name: 'Company Website Redesign',
    description: 'Modernize company website with new branding and improved UX',
    status: 'completed',
    priority: 'low',
    startDate: new Date('2023-11-01'),
    endDate: new Date('2024-01-31'),
    progress: 100,
    ownerId: '1',
    teamMembers: ['1', '4'],
    createdAt: new Date('2023-11-01'),
    updatedAt: new Date('2024-01-31'),
    tasks: [
      {
        id: '7',
        title: 'Design mockups',
        description: 'Create wireframes and visual designs for new website',
        status: 'completed',
        priority: 'high',
        assigneeId: '4',
        projectId: '3',
        dueDate: new Date('2023-11-15'),
        estimatedHours: 24,
        actualHours: 26,
        tags: ['design', 'ui', 'mockups'],
        createdAt: new Date('2023-11-01'),
        updatedAt: new Date('2023-11-14')
      },
      {
        id: '8',
        title: 'Frontend development',
        description: 'Implement responsive website using React and Tailwind CSS',
        status: 'completed',
        priority: 'high',
        assigneeId: '1',
        projectId: '3',
        dueDate: new Date('2024-01-15'),
        estimatedHours: 40,
        actualHours: 38,
        tags: ['frontend', 'react', 'tailwind'],
        createdAt: new Date('2023-11-16'),
        updatedAt: new Date('2024-01-14')
      }
    ]
  }
];