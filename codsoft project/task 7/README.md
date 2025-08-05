# ProjectHub - Project Management Tool

A comprehensive project management web application built with React, TypeScript, and Tailwind CSS. This tool helps teams organize projects, manage tasks, track progress, and collaborate effectively.

## 🚀 Features

### Core Functionality
- **User Authentication**: Secure login/register system with role-based access
- **Project Management**: Create, update, and delete projects with detailed information
- **Task Management**: Full CRUD operations for tasks with status tracking
- **Team Collaboration**: Assign tasks to team members and track progress
- **Visual Progress Tracking**: Progress bars, charts, and Kanban boards
- **Deadline Management**: Set and track project and task deadlines

### Advanced Features
- **Dashboard**: Overview of projects, tasks, and team performance
- **Kanban Board**: Drag-and-drop task management interface
- **Search & Filtering**: Advanced filtering by status, priority, assignee, and project
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Real-time Updates**: Instant progress updates and notifications
- **Role-based Access**: Different permissions for admin, manager, and member roles

## 🛠️ Tech Stack

- **Frontend**: React 18 with TypeScript
- **State Management**: React Context API
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Build Tool**: Vite
- **Data Persistence**: localStorage (for demo purposes)

## 📦 Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Local Development
1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd project-management-tool
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

### Build for Production
```bash
npm run build
```

## 🎯 Usage

### Getting Started
1. **Sign Up/Login**: Create an account or use demo credentials
2. **Create Project**: Click "New Project" to start your first project
3. **Add Team Members**: Invite team members and assign roles
4. **Create Tasks**: Break down your project into manageable tasks
5. **Track Progress**: Monitor project and task completion in real-time

### Demo Accounts
- **Admin**: admin@pm.com (full access)
- **Manager**: manager@pm.com (project management)
- **Member**: member@pm.com (task execution)
- **Password**: Any password works for demo

### Key Features Guide

#### Project Management
- Create projects with detailed information (name, description, dates, priority)
- Assign team members and set project status
- Track overall progress with visual indicators
- Monitor deadlines and identify overdue projects

#### Task Management
- Create tasks within projects with detailed descriptions
- Assign tasks to specific team members
- Set priorities (High, Medium, Low) and due dates
- Track task status (To Do, In Progress, Review, Completed)
- Add tags for better organization

#### Dashboard
- Overview of all projects and tasks
- Personal task assignments and deadlines
- Team performance metrics
- Quick access to recent projects and urgent tasks

## 🏗️ Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Sidebar.tsx     # Navigation sidebar
│   ├── ProjectCard.tsx # Project display card
│   ├── TaskCard.tsx    # Task display card
│   └── Modals/         # Modal components
├── context/            # React Context providers
│   ├── AuthContext.tsx # Authentication state
│   └── ProjectContext.tsx # Project/task state
├── pages/              # Main application pages
│   ├── DashboardPage.tsx
│   ├── ProjectsPage.tsx
│   ├── TasksPage.tsx
│   └── AuthPage.tsx
├── types/              # TypeScript type definitions
├── data/               # Mock data and utilities
└── App.tsx            # Main application component
```

## 🚀 Deployment

### Frontend Deployment Options

#### Netlify (Recommended)
1. Build the project: `npm run build`
2. Deploy the `dist` folder to Netlify
3. Configure environment variables if needed

#### Vercel
1. Connect your GitHub repository to Vercel
2. Vercel will automatically build and deploy

#### GitHub Pages
1. Install gh-pages: `npm install --save-dev gh-pages`
2. Add to package.json:
   ```json
   "scripts": {
     "deploy": "gh-pages -d dist"
   }
   ```
3. Run: `npm run build && npm run deploy`

### Backend Integration (Future Enhancement)

For production use, integrate with a backend API:

#### Node.js + Express Backend
```javascript
// Example API structure
/api
├── /auth          # Authentication endpoints
├── /projects      # Project CRUD operations
├── /tasks         # Task management
├── /users         # User management
└── /notifications # Real-time notifications
```

#### Database Options
- **MongoDB**: Document-based, flexible schema
- **PostgreSQL**: Relational database with strong consistency
- **Firebase**: Real-time database with authentication

## 🔧 Environment Variables

Create a `.env` file for production:

```env
VITE_API_URL=your_backend_api_url
VITE_APP_NAME=ProjectHub
VITE_VERSION=1.0.0
```

## 🧪 Testing

### Running Tests
```bash
npm run test
```

### Test Coverage
```bash
npm run test:coverage
```

## 📝 Git Workflow

### Initial Setup
```bash
git init
git add .
git commit -m "Initial commit: Project management tool setup"
git branch -M main
git remote add origin <your-repository-url>
git push -u origin main
```

### Development Workflow
```bash
# Create feature branch
git checkout -b feature/new-feature

# Make changes and commit
git add .
git commit -m "feat: add new feature description"

# Push to remote
git push origin feature/new-feature

# Create pull request and merge
```

### Commit Message Convention
- `feat:` New features
- `fix:` Bug fixes
- `docs:` Documentation updates
- `style:` Code formatting
- `refactor:` Code refactoring
- `test:` Adding tests
- `chore:` Maintenance tasks

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support and questions:
- Create an issue in the GitHub repository
- Check the documentation
- Review existing issues for solutions

## 🔮 Future Enhancements

- [ ] Real-time collaboration with WebSockets
- [ ] File attachments for tasks and projects
- [ ] Time tracking and reporting
- [ ] Gantt chart timeline view
- [ ] Email notifications
- [ ] Mobile app (React Native)
- [ ] Integration with third-party tools (Slack, GitHub, etc.)
- [ ] Advanced analytics and reporting
- [ ] Custom project templates
- [ ] Bulk operations for tasks

---

Built with ❤️ using React, TypeScript, and Tailwind CSS