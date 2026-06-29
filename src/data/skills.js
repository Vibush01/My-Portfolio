
export const skills = [
  { id: 'cat-1', category: "languages", items: ["JavaScript (ES6+)", "TypeScript", "Java", "C++"] },
  { id: 'cat-2', category: "frontend", items: ["React.js (v19)", "Redux Toolkit", "TailwindCSS", "Gridstack.js"] },
  { id: 'cat-3', category: "backend", items: ["Node.js", "Express.js", "Hono", "REST APIs"] },
  { id: 'cat-4', category: "database", items: ["MongoDB", "MySQL", "Firebase"] },
  { id: 'cat-5', category: "tools", items: ["Git", "GitHub", "Postman", "AWS", "Infisical", "pnpm"] },
  { id: 'cat-6', category: "other", items: ["JWT Auth", "Chrome Extension API", "TanStack Query", "React Hook Form"] }
]

export const toolsWithIcons = [
  {
    id: 'toolcat-1',
    category: "Design & Collaboration",
    items: [
      { name: "Figma", icon: "🎨", color: "#F24E1E" },
      { name: "Framer", icon: "⚡", color: "#0055FF" },
      { name: "Notion", icon: "📝", color: "#fff" },
      { name: "Canva", icon: "🖼️", color: "#00C4CC" }
    ]
  },
  {
    id: 'toolcat-2',
    category: "Project Management",
    items: [
      { name: "Jira", icon: "📋", color: "#0052CC" },
      { name: "ClickUp", icon: "✅", color: "#7B68EE" },
      { name: "Slack", icon: "💬", color: "#4A154B" },
      { name: "Zoho", icon: "🔧", color: "#C8202B" }
    ]
  },
  {
    id: 'toolcat-3',
    category: "Development",
    items: [
      { name: "VS Code", icon: "💻", color: "#007ACC" },
      { name: "React", icon: "⚛️", color: "#61DAFB" },
      { name: "Node.js", icon: "🟢", color: "#339933" },
      { name: "MongoDB", icon: "🍃", color: "#47A248" },
      { name: "TailwindCSS", icon: "🎨", color: "#06B6D4" },
      { name: "Hono", icon: "🔥", color: "#FF6B35" },
      { name: "TypeScript", icon: "📘", color: "#3178C6" },
      { name: "Express", icon: "⚡", color: "#138000ff" }
    ]
  },
  {
    id: 'toolcat-4',
    category: "Cloud & DevOps",
    items: [
      { name: "Firebase", icon: "🔥", color: "#FFCA28" },
      { name: "AWS", icon: "☁️", color: "#FF9900" },
      { name: "Vercel", icon: "▲", color: "#fff" },
      { name: "GitHub", icon: "🐙", color: "#ffff" }
    ]
  },
  {
    id: 'toolcat-5',
    category: "AI & Analytics",
    items: [
      { name: "Claude AI", icon: "🤖", color: "#8B5CF6" },
      { name: "Gemini", icon: "✨", color: "#4285F4" },
      { name: "ChatGPT", icon: "💡", color: "#10A37F" },
      { name: "Google Analytics", icon: "📊", color: "#E37400" }
    ]
  }
]

export const education = [
  {
    degree: "B.E. Computer Science & Engineering",
    school: "Chitkara University, Himachal Pradesh",
    year: "2022 - 2026"
  }
]


export default { skills, toolsWithIcons, education }
