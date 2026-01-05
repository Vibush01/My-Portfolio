// Technical skills as simple strings (for About section)
export const skills = {
  languages: ["JavaScript (ES6+)", "TypeScript", "Java", "C++"],
  frontend: ["React.js (v19)", "Redux Toolkit", "TailwindCSS", "Gridstack.js"],
  backend: ["Node.js", "Express.js", "Hono", "REST APIs"],
  database: ["MongoDB", "MySQL", "Firebase"],
  tools: ["Git", "GitHub", "Postman", "AWS", "Infisical", "pnpm"],
  other: ["JWT Auth", "Chrome Extension API", "TanStack Query", "React Hook Form"]
}

// Tools with icons for the Tools section (categorized)
export const toolsWithIcons = {
  "Design & Collaboration": [
    { name: "Figma", icon: "🎨", color: "#F24E1E" },
    { name: "Framer", icon: "⚡", color: "#0055FF" },
    { name: "Notion", icon: "📝", color: "#fff" },
    { name: "Canva", icon: "🖼️", color: "#00C4CC" }
  ],
  "Project Management": [
    { name: "Jira", icon: "📋", color: "#0052CC" },
    { name: "ClickUp", icon: "✅", color: "#7B68EE" },
    { name: "Slack", icon: "💬", color: "#4A154B" },
    { name: "Zoho", icon: "🔧", color: "#C8202B" }
  ],
  "Development": [
    { name: "VS Code", icon: "💻", color: "#007ACC" },
    { name: "React", icon: "⚛️", color: "#61DAFB" },
    { name: "Node.js", icon: "🟢", color: "#339933" },
    { name: "MongoDB", icon: "🍃", color: "#47A248" },
    { name: "TailwindCSS", icon: "🎨", color: "#06B6D4" },
    { name: "Hono", icon: "🔥", color: "#FF6B35" },
    { name: "TypeScript", icon: "📘", color: "#3178C6" },
    { name: "Express", icon: "⚡", color: "#138000ff" }
  ],
  "Cloud & DevOps": [
    { name: "Firebase", icon: "🔥", color: "#FFCA28" },
    { name: "AWS", icon: "☁️", color: "#FF9900" },
    { name: "Vercel", icon: "▲", color: "#fff" },
    { name: "GitHub", icon: "🐙", color: "#ffff" }
  ],
  "AI & Analytics": [
    { name: "Claude AI", icon: "🤖", color: "#8B5CF6" },
    { name: "Gemini", icon: "✨", color: "#4285F4" },
    { name: "ChatGPT", icon: "💡", color: "#10A37F" },
    { name: "Google Analytics", icon: "📊", color: "#E37400" }
  ]
}

export const education = [
  {
    degree: "B.E. Computer Science & Engineering",
    school: "Chitkara University, Himachal Pradesh",
    year: "2022 - 2026"
  }
]

export const certifications = [
  "MERN Stack Development - Apna College",
  "Full Stack Web Development - Udemy",
  "Introduction to Linux - Infosys Springboard"
]

export default { skills, toolsWithIcons, education, certifications }
