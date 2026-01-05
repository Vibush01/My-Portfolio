export const projects = [
  {
    id: 1,
    title: "EasyFitTrack",
    subtitle: "Gym & Fitness Management Platform",
    description: "A full-featured fitness tracking platform with Role-Based Access Control (RBAC) for Admin and User roles. Comprehensive SaaS platform for gym owners to manage members, trainers, and finances in real-time.",
    image: "/images/projects/easyfittrack.webp",
    gradient: ["#10b981", "#3b82f6"],
    tags: ["React", "Node.js", "MongoDB", "Express", "JWT", "Socket.io"],
    features: [
      "Role-Based Access Control (RBAC) for Admin and User roles",
      "Real-time member, trainer, and finance management",
      "JWT authentication with bcrypt password hashing",
      "Real-Time chat with application restrictions",
      "Trainers Job portal for applying for new positions"
    ],
    github: null,
    live: "https://easyfittrack.netlify.app/",
    featured: true
  },
  {
    id: 2,
    title: "Employee Management Dashboard",
    subtitle: "HR Management System",
    description: "A scalable HR dashboard supporting advanced filtering (Department, Salary, Joining Date) and multi-field search (Name, Email, UID) for efficient workforce management.",
    image: "/images/projects/EmploymentManagement.webp",
    gradient: ["#6366f1", "#8b5cf6"],
    tags: ["React", "Node.js", "MongoDB", "React Hook Form", "TanStack Query"],
    features: [
      "Advanced filtering by Department, Salary, Joining Date",
      "Multi-field search (Name, Email, UID)",
      "Debouncing on search inputs to minimize API calls",
      "Infinite Scroll for large datasets",
      "Complex CRUD operations with form validation"
    ],
    github: null,
    live: "https://employmentmanagement.netlify.app/",
    featured: true
  },
  {
    id: 3,
    title: "Headstart Dashboard",
    subtitle: "Customizable Widget Ecosystem",
    description: "High-performance, customizable dashboard using Gridstack.js enabling seamless drag-and-drop and widget resizing. Integrated with Google Calendar API and GitHub REST API.",
    image: "/images/projects/headstart.webp",
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
    title: "Crypto Dashboard",
    subtitle: "Real-Time Cryptocurrency Tracker",
    description: "A real-time cryptocurrency tracking dashboard displaying the top 10 performing cryptos with live price updates, market cap, 24h changes, and interactive charts powered by CoinGecko API.",
    image: "/images/projects/cryptodashboard.webp",
    gradient: ["#f97316", "#facc15"],
    tags: ["React", "Node.js", "MongoDB", "Express", "CoinGecko API", "Chart.js"],
    features: [
      "Real-time price updates for top cryptocurrencies",
      "Interactive price charts with historical data",
      "Market cap and 24h volume tracking",
      "Responsive design for mobile and desktop",
      "RESTful API integration with CoinGecko"
    ],
    github: "https://github.com/Vibush01/Cryptocurrency-Dashboard-MERN",
    live: null,
    featured: true
  },
  {
    id: 5,
    title: "AI-Powered Search & Recommendation System",
    subtitle: "Smart Product Recommendations",
    description: "An intelligent product recommendation engine that analyzes user search patterns and browsing behavior to provide personalized product suggestions using machine learning algorithms.",
    image: "/images/projects/aiRecom.webp",
    gradient: ["#ec4899", "#f43f5e"],
    tags: ["Python", "Machine Learning", "React", "Node.js", "MongoDB", "TensorFlow"],
    features: [
      "AI-powered product recommendations",
      "User behavior analysis and pattern recognition",
      "Real-time search suggestions",
      "Collaborative filtering algorithm",
      "Personalized user experience"
    ],
    github: "https://github.com/Vibush01/My-Portfolio",
    live: null,
    featured: true
  },
  {
    id: 6,
    title: "Number Guessing Game",
    subtitle: "React Native Mobile Game",
    description: "An interactive mobile game built with React Native where users guess a random number. Features smooth animations, score tracking, and a clean UI designed for both iOS and Android platforms.",
    image: "/images/projects/numberGuessing.webp",
    gradient: ["#14b8a6", "#06b6d4"],
    tags: ["React Native", "JavaScript", "Expo", "Mobile Development"],
    features: [
      "Cross-platform mobile app (iOS & Android)",
      "Smooth animations and transitions",
      "Score tracking and game history",
      "Clean and intuitive user interface",
      "Built with Expo for easy deployment"
    ],
    github: "https://github.com/Vibush01/Number-Guessing-Game-using-ReactNative",
    live: null,
    featured: false
  }
]

export default projects
