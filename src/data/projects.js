export const projects = [
  {
    id: 1,
    title: "EasyFitTrack",
    subtitle: "Gym & Fitness Management Platform",
    description: "A full-featured fitness tracking platform with Role-Based Access Control (RBAC) for Admin and User roles. Comprehensive SaaS platform for gym owners to manage members, trainers, and finances in real-time.",
    gradient: ["#10b981", "#3b82f6"],
    tags: ["React", "Node.js", "MongoDB", "Express", "JWT", "Socket.io"],
    features: [
      "Role-Based Access Control (RBAC) for Admin and User roles",
      "Real-time member, trainer, and finance management",
      "JWT authentication with bcrypt password hashing",
      "Real-Time chat with application restrictions",
      "Trainers Job portal for applying for new positions"
    ],
    github: "https://github.com/Vibush01",
    live: "#",
    featured: true
  },
  {
    id: 2,
    title: "Employee Management Dashboard",
    subtitle: "HR Management System",
    description: "A scalable HR dashboard supporting advanced filtering (Department, Salary, Joining Date) and multi-field search (Name, Email, UID) for efficient workforce management.",
    gradient: ["#6366f1", "#8b5cf6"],
    tags: ["React", "Node.js", "MongoDB", "React Hook Form", "TanStack Query"],
    features: [
      "Advanced filtering by Department, Salary, Joining Date",
      "Multi-field search (Name, Email, UID)",
      "Debouncing on search inputs to minimize API calls",
      "Infinite Scroll for large datasets",
      "Complex CRUD operations with form validation"
    ],
    github: "https://github.com/Vibush01",
    live: "#",
    featured: true
  },
  {
    id: 3,
    title: "Headstart Dashboard",
    subtitle: "Customizable Widget Ecosystem",
    description: "High-performance, customizable dashboard using Gridstack.js enabling seamless drag-and-drop and widget resizing. Integrated with Google Calendar API and GitHub REST API.",
    gradient: ["#0ea5e9", "#22d3ee"],
    tags: ["React", "Gridstack.js", "Hono", "Google Calendar API", "GitHub API"],
    features: [
      "Drag-and-drop widget management",
      "Widget resizing for personalized workspace",
      "Google Calendar integration for meetings",
      "GitHub Pull Requests tracking",
      "Low-latency RESTful APIs using Hono"
    ],
    github: null,
    live: "https://useheadstart.app",
    featured: true
  },
  {
    id: 4,
    title: "Company Registration Module",
    subtitle: "Bluestock Fintech Onboarding Platform",
    description: "Secure onboarding platform for corporate clients featuring a complex multi-step registration wizard using React 19, React Hook Form, and Redux Toolkit.",
    gradient: ["#f97316", "#facc15"],
    tags: ["React 19", "Redux Toolkit", "React Hook Form", "TanStack Query", "Firebase"],
    features: [
      "Multi-step registration wizard",
      "JWT Authentication with 90-day validity",
      "Firebase OTP verification",
      "Optimized API data fetching",
      "Secure corporate client onboarding"
    ],
    github: null,
    live: "https://bluestock.in",
    featured: true
  },
  {
    id: 5,
    title: "Portfolio Website",
    subtitle: "Personal Developer Portfolio",
    description: "Modern, responsive portfolio website built with React, Vite, and TailwindCSS v4. Features dark/light theme, blog with MDX support, and smooth animations.",
    gradient: ["#ec4899", "#f43f5e"],
    tags: ["React", "Vite", "TailwindCSS v4", "MDX", "React Router"],
    features: [
      "Dark/Light theme with persistence",
      "Blog with MDX support",
      "Responsive design",
      "SEO optimized",
      "Smooth scroll navigation"
    ],
    github: "https://github.com/Vibush01/My-Portfolio",
    live: "#",
    featured: true
  },
  {
    id: 6,
    title: "Chrome Extension Toolkit",
    subtitle: "Browser Productivity Tools",
    description: "Collection of Chrome extensions for productivity enhancement, built with modern JavaScript and Chrome Extension API.",
    gradient: ["#14b8a6", "#06b6d4"],
    tags: ["JavaScript", "Chrome Extension API", "HTML", "CSS"],
    features: [
      "Tab management utilities",
      "Quick access to development tools",
      "Customizable shortcuts",
      "Cross-browser compatibility"
    ],
    github: "https://github.com/Vibush01",
    live: null,
    featured: false
  }
]

export default projects
