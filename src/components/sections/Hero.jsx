import { useState, useEffect } from "react";
import useTheme from "../../hooks/useTheme";
import { useData } from "../../context/DataContext";
import { FiGithub, FiLinkedin, FiMail } from "react-icons/fi";
import useTypingEffect from "../../hooks/useTypingEffect";

function Hero() {
  const { theme } = useTheme();
  const { data } = useData();
  const heroData = data?.hero || {};

  const typingText = useTypingEffect(
    heroData.roles ? heroData.roles.split(',').map(r => r.trim()) : [
      "Full Stack Developer",
      "MERN Stack Developer",
      "React Developer",
      "Node.js Backend Developer",
    ],
    100,
    50,
    2500
  );

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
          className={`absolute -top-40 -right-40 w-80 h-80 rounded-full blur-3xl animate-float ${
            theme === "dark" ? "bg-indigo-500/20" : "bg-indigo-500/10"
          }`}
          style={{ animationDuration: '8s' }}
        />
        <div
          className={`absolute -bottom-40 -left-40 w-80 h-80 rounded-full blur-3xl animate-float ${
            theme === "dark" ? "bg-cyan-500/20" : "bg-cyan-500/10"
          }`}
          style={{ animationDuration: '6s', animationDelay: '2s' }}
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
              {heroData.name || 'Vivek Kumar'}
            </span>
          </h1>

          {/* Role */}
          <h2
            className={`text-2xl md:text-3xl font-semibold mb-6 h-10 ${
              theme === "dark" ? "text-slate-300" : "text-slate-700"
            }`}
          >
            {typingText}
            <span className="animate-pulse">|</span>
          </h2>

          {/* Description */}
          <p
            className={`text-lg md:text-xl max-w-2xl mx-auto mb-8 leading-relaxed ${
              theme === "dark" ? "text-slate-400" : "text-slate-600"
            }`}
          >
            {heroData.bio || 'Full Stack Developer with hands-on experience building production-ready web applications through multiple internships.'}
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
              href="/Vivek_Full_Stack_Developer.pdf"
              download="Vivek_Full_Stack_Developer.pdf"
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
              href={heroData.github || "https://github.com/Vibush01"}
              target="_blank"
              rel="noopener noreferrer"
              className={`p-3 rounded-full transition-all hover:scale-110 ${
                theme === "dark"
                  ? "bg-slate-800 text-white hover:bg-slate-700"
                  : "bg-white text-slate-700 hover:bg-slate-100 shadow-sm"
              }`}
              aria-label="GitHub"
            >
              <FiGithub className="w-6 h-6" />
            </a>
            <a
              href={heroData.linkedin || "https://linkedin.com/in/vibush01"}
              target="_blank"
              rel="noopener noreferrer"
              className={`p-3 rounded-full transition-all hover:scale-110 ${
                theme === "dark"
                  ? "bg-slate-800 text-white hover:bg-slate-700"
                  : "bg-white text-slate-700 hover:bg-slate-100 shadow-sm"
              }`}
              aria-label="LinkedIn"
            >
              <FiLinkedin className="w-6 h-6" />
            </a>
            <a
              href={`mailto:${heroData.email || 'hello@vivekkumar.com'}`}
              className={`p-3 rounded-full transition-all hover:scale-110 ${
                theme === "dark"
                  ? "bg-slate-800 text-white hover:bg-slate-700"
                  : "bg-white text-slate-700 hover:bg-slate-100 shadow-sm"
              }`}
              aria-label="Email"
            >
              <FiMail className="w-6 h-6" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
