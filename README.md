# Todo App

A modern, full-featured task management application built with **React**, **TypeScript**, and **TailwindCSS**. Features user authentication, cloud-based data persistence with **Supabase**, and a complete testing suite.

## ✨ Features

- 🔐 **User Authentication** - Secure signup, login, and logout with Supabase
- ✅ **Task Management** - Create, complete, delete, and restore tasks
- 🏷️ **Filter Tasks** - View all, active, or completed tasks
- ⚙️ **User Settings** - Update username and password
- 🌐 **Cloud Storage** - All tasks synced with Supabase database
- 📱 **Responsive Design** - Works seamlessly on all devices
- 🧪 **Comprehensive Tests** - Full test coverage with Jest and React Testing Library

## 🚀 Quick Start

### Prerequisites

- Node.js 16+ and npm
- Supabase account and project credentials

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/ecorreialourenco/todo-app.git
   cd todo-app
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Configure environment variables**
   Create a `.env.local` file in the root directory:

   ```env
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```
   The app will be available at `http://localhost:5173`

## 📖 Usage

### Authentication

1. **Sign Up**: Create a new account with email, password, and username
2. **Log In**: Access your existing account
3. **Log Out**: Found in the header navigation

### Task Management

- **Create Task**: Click "New Task" button, enter task description, confirm
- **Complete Task**: Click the checkbox next to a task to mark it complete/incomplete
- **Delete Task**: Click the trash icon to remove a task
- **Restore Task**: Click the recycle icon to restore a deleted task (if applicable)
- **Filter Tasks**: Use filter buttons to view All, Active, or Completed tasks

### User Settings

- Navigate to Settings (gear icon in header)
- **Change Username**: Update your profile username
- **Change Password**: Update your account password

## 🛠️ Development

### Available Scripts

```bash
# Development server
npm run dev

# Production build
npm run build

# Preview production build
npm preview

# Run tests
npm test

# Run tests with coverage report
npm test:coverage
```

## 🧪 Testing

The project includes comprehensive unit tests for all components and hooks:

- **Run all tests**: `npm test`
- **Run with coverage**: `npm test:coverage`
- **Test files**: Located alongside source files with `.test.tsx` extension

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Form/           # Form related components (Button, Input, etc.)
│   ├── Layout/         # Main layout wrapper with Header/Footer
│   ├── List/           # Task list components
│   └── Modal/          # Modal dialog components
├── pages/              # Page components
│   ├── App.tsx         # Root app component with routing
│   ├── Auth/           # Login/Signup pages
│   ├── Main/           # Task dashboard page
│   └── Settings/       # User settings page
├── hooks/              # Custom React hooks
│   ├── useAuth.tsx     # Authentication logic
│   └── useSupabaseTasks.tsx  # Task management logic
├── models/             # TypeScript data models
├── lib/                # Utility libraries (Supabase client)
├── store/              # Global state management
├── css/                # Global styles
└── enum/               # TypeScript enumerations
```

## 🔧 Tech Stack

### Frontend

- **React** 18.2 - UI framework
- **TypeScript** 5.0 - Type safety
- **React Router** 7.13 - Client-side routing
- **TailwindCSS** 3 - Utility-first CSS

### Backend & Services

- **Supabase** 2.100 - Authentication & database
- **PostgreSQL** - Data persistence

### Development & Testing

- **Vite** - Fast build tool
- **Jest** - Testing framework
- **React Testing Library** - Component testing
- **PostCSS** - CSS processing
- **ESLint** - Code quality

### Deployment

- **GitHub Pages** - Static hosting

## 🌐 Demo

Try the live app: [https://ecorreialourenco.github.io/todo-app/](https://ecorreialourenco.github.io/todo-app/)

## 📝 API Models

### User Model

```typescript
{
  id: string;
  email: string;
  username: string;
  created_at: string;
}
```

### Task Model

```typescript
{
  id: string;
  user_id: string;
  title: string;
  description: string;
  status: "pending" | "completed";
  created_at: string;
  updated_at: string;
}
```

## 🤝 Contributing

Contributions are welcome! Feel free to fork this repository and submit pull requests.

## 📄 License

This project is open source and available under the MIT License.
