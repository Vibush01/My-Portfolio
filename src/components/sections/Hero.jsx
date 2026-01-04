import { Link } from "react-router-dom";
import useTheme from "../../hooks/useTheme";

function Hero() {
  const { theme } = useTheme();

  return (
    <section
      id="hero"
      className={`min-h-screen flex items-center justify-center relative overflow-hidden ${
        theme === "dark" ? "bg-slate-900" : "bg-slate-50"
      }`}
    >
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className={`absolute -top-40 -right-40 w-80 h-80 rounded-full blur-3xl ${
            theme === "dark" ? "bg-indigo-500/20" : "bg-indigo-500/10"
          }`}
        />
        <div
          className={`absolute -bottom-40 -left-40 w-80 h-80 rounded-full blur-3xl ${
            theme === "dark" ? "bg-cyan-500/20" : "bg-cyan-500/10"
          }`}
        />
      </div>

      <div className="max-w-6xl mx-auto px-6 py-20 relative z-10">
        <div className="text-center max-w-3xl mx-auto">
          {/* Greeting */}
          <p
            className={`text-sm font-medium tracking-widest uppercase mb-4 ${
              theme === "dark" ? "text-cyan-400" : "text-cyan-600"
            }`}
          >
            👋 Hello, I'm
          </p>

          {/* Name */}
          <h1
            className={`text-5xl md:text-7xl font-bold mb-4 ${
              theme === "dark" ? "text-white" : "text-slate-900"
            }`}
          >
            <span className="bg-gradient-to-r from-indigo-500 to-cyan-400 bg-clip-text text-transparent">
              Vivek Kumar
            </span>
          </h1>

          {/* Role */}
          <h2
            className={`text-2xl md:text-3xl font-semibold mb-6 ${
              theme === "dark" ? "text-slate-300" : "text-slate-700"
            }`}
          >
            Full Stack Developer
          </h2>

          {/* Description */}
          <p
            className={`text-lg md:text-xl max-w-2xl mx-auto mb-8 leading-relaxed ${
              theme === "dark" ? "text-slate-400" : "text-slate-600"
            }`}
          >
            With expertise in MERN Stack, TypeScript, Hono, Firebase and AWS. I
            build scalable web applications, real-time systems, and browser
            extensions with a focus on performance and user experience.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <a
              href="#contact"
              className="px-8 py-3 rounded-lg font-medium text-white bg-gradient-to-r from-indigo-500 to-cyan-500 hover:opacity-90 hover:-translate-y-0.5 transition-all shadow-lg shadow-indigo-500/25"
            >
              Get In Touch
            </a>
            <a
              href="/Vivek_Kumar_FullStack_Developer.pdf"
              download="Vivek_Kumar_FullStack_Developer.pdf"
              className={`px-8 py-3 rounded-lg font-medium border transition-all hover:-translate-y-0.5 ${
                theme === "dark"
                  ? "border-slate-600 text-white hover:bg-slate-800"
                  : "border-slate-300 text-slate-900 hover:bg-slate-100"
              }`}
            >
              Download Resume
            </a>
          </div>

          {/* Social Links */}
          <div className="flex items-center justify-center gap-6">
            <a
              href="https://github.com/Vibush01"
              target="_blank"
              rel="noopener noreferrer"
              className={`p-3 rounded-full transition-all hover:scale-110 ${
                theme === "dark"
                  ? "bg-slate-800 text-white hover:bg-slate-700"
                  : "bg-white text-slate-700 hover:bg-slate-100 shadow-sm"
              }`}
              aria-label="GitHub"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path
                  fillRule="evenodd"
                  d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                  clipRule="evenodd"
                />
              </svg>
            </a>
            <a
              href="https://linkedin.com/in/vibush01"
              target="_blank"
              rel="noopener noreferrer"
              className={`p-3 rounded-full transition-all hover:scale-110 ${
                theme === "dark"
                  ? "bg-slate-800 text-white hover:bg-slate-700"
                  : "bg-white text-slate-700 hover:bg-slate-100 shadow-sm"
              }`}
              aria-label="LinkedIn"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>
            <a
              href="mailto:vibush01@gmail.com"
              className={`p-3 rounded-full transition-all hover:scale-110 ${
                theme === "dark"
                  ? "bg-slate-800 text-white hover:bg-slate-700"
                  : "bg-white text-slate-700 hover:bg-slate-100 shadow-sm"
              }`}
              aria-label="Email"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <svg
          className={`w-6 h-6 ${
            theme === "dark" ? "text-slate-400" : "text-slate-500"
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </div>
    </section>
  );
}

export default Hero;
