export const experience = [
  {
    id: 1,
    role: "Full Stack Developer",
    company: "Headstart",
    companyUrl: "https://useheadstart.app",
    location: "Remote",
    type: "Full-time",
    startDate: "Nov 2025",
    endDate: "Present",
    description: "Building high-performance, customizable dashboard applications with modern web technologies.",
    responsibilities: [
      "Engineered a high-performance, customizable dashboard using Gridstack.js, enabling seamless drag-and-drop and widget resizing for a personalized user workspace",
      "Developed lightweight, low-latency RESTful APIs using Hono, optimizing response times and reducing server overhead compared to traditional Express.js architectures",
      "Integrated Google Calendar API and GitHub REST API to build interactive widgets, allowing users to join meetings and track Pull Requests directly from the new tab page",
      "Modernized the development workflow by implementing pnpm for efficient dependency management and Infisical for encrypted secret management across the team"
    ],
    technologies: ["React", "Gridstack.js", "Hono", "Google Calendar API", "GitHub API", "pnpm", "Infisical", "Firebase", "Jira Integration", "Chrome extension API"]
  },
  {
    id: 2,
    role: "SDE Intern",
    company: "Bluestock Fintech",
    companyUrl: "https://bluestock.in",
    location: "Remote",
    type: "Internship",
    startDate: "Sep 2025",
    endDate: "Oct 2025",
    description: "Developed secure onboarding platform for corporate clients with complex registration workflows.",
    responsibilities: [
      "Developed the 'Company Registration & Verification Module,' a secure onboarding platform for corporate clients",
      "Built a complex multi-step registration wizard using React 19, React Hook Form, and Redux Toolkit",
      "Optimized API data fetching using TanStack Query and implemented JWT Authentication (90-day validity) with Firebase OTP"
    ],
    technologies: ["React 19", "Redux Toolkit", "React Hook Form", "TanStack Query", "JWT", "Firebase"]
  }
]

export default experience
