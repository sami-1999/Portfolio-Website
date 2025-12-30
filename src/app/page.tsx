"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faPhone,
  faLocationDot,
  faDownload,
  faPaperPlane,
  faUser,
  faCalendarDays,
} from "@fortawesome/free-solid-svg-icons";
import {
  faWhatsapp,
  faGithub,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";
import portfolioData from "../data/portfolio.json";
import { PortfolioData } from "../types/portfolio";

// Type assertion for the imported JSON data
const data: PortfolioData = portfolioData as PortfolioData;

export default function Home() {
  const [activeSection, setActiveSection] = useState("home");
  const [isScrolled, setIsScrolled] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: "" });

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const responseData = await res.json();

      if (res.ok) {
        setSubmitStatus({
          type: "success",
          message: responseData.message || "Message sent successfully!",
        });
        // Reset form
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: "",
        });
      } else {
        setSubmitStatus({
          type: "error",
          message:
            responseData.error || "Failed to send message. Please try again.",
        });
      }
    } catch (error) {
      setSubmitStatus({
        type: "error",
        message: "Network error. Please check your connection and try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      if (window.scrollY < 100) {
        setActiveSection("home");
        return;
      }

      // Get all sections with their corresponding navigation names
      const sections = [
        { id: "about", nav: "about" },
        { id: "skills", nav: "skills" },
        { id: "experience", nav: "experience" },
        { id: "projects", nav: "projects" },
        { id: "education", nav: "education" },
        { id: "contact", nav: "contact" },
      ];

      const scrollPosition = window.scrollY + 150; // Offset for navbar

      // Find which section is currently in view (iterate in reverse to prioritize lower sections)
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        const element = document.getElementById(section.id);
        if (element) {
          const { offsetTop } = element;
          if (scrollPosition >= offsetTop) {
            setActiveSection(section.nav);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Function to scroll to section
  const scrollToSection = (sectionId: string) => {
    // Handle Home button - scroll to top
    if (sectionId === "home") {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
      return;
    }

    // Map "Get in Touch" to "contact" section
    const targetId = sectionId === "get in touch" ? "contact" : sectionId;
    const element = document.getElementById(targetId);
    if (element) {
      const offsetTop = element.offsetTop - 80; // Account for fixed navbar
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      {/* Skip to main content for accessibility and SEO */}
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-blue-600 text-white px-4 py-2 rounded-md z-50">
        Skip to main content
      </a>
      
      {/* Enhanced Navigation with Modern Design */}
      <nav
        role="navigation"
        aria-label="Main navigation"
        className={`fixed top-0 w-full z-50 transition-all duration-500 ${
          isScrolled
            ? "bg-slate-900/90 backdrop-blur-xl shadow-xl border-b border-slate-700/50"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            {/* Enhanced Logo */}
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative text-2xl font-extrabold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent px-4 py-2 rounded-xl border border-transparent group-hover:border-white/10 transition-all duration-300">
                {data.personalInfo.profileName}
              </div>
            </motion.button>

            {/* Enhanced Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-2 bg-slate-800/50 backdrop-blur-sm rounded-full px-4 py-2 border border-slate-700/50">
              {data.navigation.map((item, index) => (
                <motion.button
                  key={item}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className={`relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    activeSection === item.toLowerCase()
                      ? "text-white shadow-lg"
                      : "text-slate-300 hover:text-white"
                  }`}
                >
                  {/* Active indicator */}
                  {activeSection === item.toLowerCase() && (
                    <motion.div
                      layoutId="activeSection"
                      className="absolute inset-0 bg-gradient-to-r from-blue-500/80 to-purple-500/80 rounded-full"
                      initial={false}
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{item}</span>
                </motion.button>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="md:hidden p-3 rounded-xl bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 text-white"
            >
              <div className="w-5 h-5 flex flex-col justify-center space-y-1">
                <div className="w-full h-0.5 bg-white rounded transform transition-transform"></div>
                <div className="w-full h-0.5 bg-white rounded transform transition-transform"></div>
                <div className="w-full h-0.5 bg-white rounded transform transition-transform"></div>
              </div>
            </motion.button>
          </div>
        </div>
      </nav>

      {/* Enhanced Hero Section with Modern Design */}
      <section className="relative pt-24 pb-16 overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-blue-500/3 to-purple-500/3 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="text-center">
            {/* Enhanced Hero Content with Better Typography */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="flex flex-col lg:flex-row items-center justify-center gap-16 mb-12"
            >
              <div className="text-center lg:text-left max-w-2xl">
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="inline-flex items-center bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-full px-6 py-2 mb-6 backdrop-blur-sm"
                >
                  <span className="w-2 h-2 bg-green-400 rounded-full mr-3 animate-pulse"></span>
                  <span className="text-sm font-medium text-slate-300">Available for new opportunities</span>
                </motion.div>

                <motion.h1 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  className="text-5xl md:text-6xl lg:text-7xl font-extrabold bg-gradient-to-r from-white via-slate-100 to-slate-300 bg-clip-text text-transparent mb-6 leading-tight"
                >
                  {data.personalInfo.profileName}
                </motion.h1>

                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="text-2xl md:text-3xl lg:text-4xl bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-4 font-bold"
                >
                  {data.personalInfo.subtitle}
                </motion.div>

                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                  className="text-lg md:text-xl text-slate-300 mb-6 leading-relaxed"
                >
                  Building scalable web solutions with {data.professionalSummary.stats.yearsExperience}+ years of expertise
                </motion.div>

                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                  className="flex flex-wrap justify-center lg:justify-start gap-6 text-sm text-slate-400"
                >
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-gradient-to-r from-orange-500/20 to-red-500/20 rounded-full flex items-center justify-center mr-3 border border-orange-500/30">
                      <span className="text-transparent bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text font-bold">{data.professionalSummary.stats.yearsExperience}</span>
                    </div>
                    <span>Years Experience</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-green-500/10 rounded-full flex items-center justify-center mr-3">
                      <span className="text-green-400 font-bold">{data.professionalSummary.stats.projectsCompleted}</span>
                    </div>
                    <span>Projects Delivered</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-purple-500/10 rounded-full flex items-center justify-center mr-3">
                      <span className="text-purple-400 font-bold">{data.professionalSummary.stats.apiIntegrations}</span>
                    </div>
                    <span>API Integrations</span>
                  </div>
                </motion.div>
              </div>

              <motion.div 
                initial={{ opacity: 0, scale: 0.8, rotateY: 20 }}
                animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
                className="relative flex-shrink-0"
              >
                {/* Floating Animation Container */}
                <motion.div
                  animate={{ 
                    y: [0, -10, 0],
                    rotate: [0, 1, 0, -1, 0]
                  }}
                  transition={{ 
                    duration: 6, 
                    repeat: Infinity, 
                    ease: "easeInOut" 
                  }}
                  className="relative"
                >
                  {/* Glassmorphism Avatar Container */}
                  <div className="relative bg-gradient-to-br from-white/5 to-white/1 rounded-3xl p-8 backdrop-blur-xl border border-white/10 shadow-2xl hover:shadow-blue-500/20 transition-all duration-700 group">
                    {/* Glow Effects */}
                    <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-blue-500/20 rounded-3xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-3xl"></div>
                    
                    {/* Avatar Image */}
                    <div className="relative z-10">
                      <Image
                        src={data.personalInfo.avatar}
                        alt={`${data.personalInfo.profileName} - Software Engineer`}
                        width={0}
                        height={0}
                        sizes="100vw"
                        className="w-auto h-48 md:h-56 lg:h-72 object-contain filter drop-shadow-2xl group-hover:scale-105 transition-all duration-500 hover:drop-shadow-[0_0_40px_rgba(59,130,246,0.4)]"
                        priority
                      />
                    </div>

                    {/* Floating Tech Icons */}
                    <div className="absolute -z-10">
                      <motion.div
                        animate={{ 
                          y: [0, -15, 0],
                          opacity: [0.3, 0.8, 0.3]
                        }}
                        transition={{ 
                          duration: 4, 
                          repeat: Infinity, 
                          delay: 0 
                        }}
                        className="absolute -top-4 -left-4 w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center border border-blue-500/20 backdrop-blur-sm"
                      >
                        <span className="text-blue-400 font-bold text-sm">PHP</span>
                      </motion.div>
                      
                      <motion.div
                        animate={{ 
                          y: [0, -12, 0],
                          opacity: [0.3, 0.8, 0.3]
                        }}
                        transition={{ 
                          duration: 3.5, 
                          repeat: Infinity, 
                          delay: 1 
                        }}
                        className="absolute -top-2 -right-6 w-12 h-12 bg-yellow-500/10 rounded-xl flex items-center justify-center border border-yellow-500/20 backdrop-blur-sm"
                      >
                        <span className="text-yellow-400 font-bold text-sm">JS</span>
                      </motion.div>
                      
                      <motion.div
                        animate={{ 
                          y: [0, -18, 0],
                          opacity: [0.3, 0.8, 0.3]
                        }}
                        transition={{ 
                          duration: 5, 
                          repeat: Infinity, 
                          delay: 2 
                        }}
                        className="absolute -bottom-6 -left-2 w-12 h-12 bg-red-500/10 rounded-xl flex items-center justify-center border border-red-500/20 backdrop-blur-sm"
                      >
                        <span className="text-red-400 font-bold text-xs">Laravel</span>
                      </motion.div>
                      
                      <motion.div
                        animate={{ 
                          y: [0, -14, 0],
                          opacity: [0.3, 0.8, 0.3]
                        }}
                        transition={{ 
                          duration: 4.2, 
                          repeat: Infinity, 
                          delay: 1.5 
                        }}
                        className="absolute -bottom-4 -right-4 w-12 h-12 bg-cyan-500/10 rounded-xl flex items-center justify-center border border-cyan-500/20 backdrop-blur-sm"
                      >
                        <span className="text-cyan-400 font-bold text-sm">React</span>
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>

            {/* Social & Resume Buttons */}
            <div className="flex flex-wrap justify-center items-center gap-4 mb-8">
              <a
                href={data.personalInfo.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center bg-slate-800/80 rounded-lg px-6 py-3 shadow-lg border border-slate-600/50 hover:border-slate-400/50 hover:bg-slate-700/50 transition-all duration-300 group"
                aria-label="GitHub Profile"
              >
                <FontAwesomeIcon
                  icon={faGithub}
                  className="text-slate-300 text-xl mr-3 group-hover:text-white transition-colors duration-300"
                />
                <span className="text-slate-300 font-medium group-hover:text-white transition-colors duration-300">
                  GitHub
                </span>
              </a>
              <a
                href={data.personalInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center bg-slate-800/80 rounded-lg px-6 py-3 shadow-lg border border-slate-600/50 hover:border-blue-400/50 hover:bg-slate-700/50 transition-all duration-300 group"
                aria-label="LinkedIn Profile"
              >
                <FontAwesomeIcon
                  icon={faLinkedin}
                  className="text-blue-400 text-xl mr-3 group-hover:text-blue-300 transition-colors duration-300"
                />
                <span className="text-slate-300 font-medium group-hover:text-white transition-colors duration-300">
                  LinkedIn
                </span>
              </a>
              <a
                href={data.personalInfo.fiverr}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center bg-slate-800/80 rounded-lg px-6 py-3 shadow-lg border border-slate-600/50 hover:border-green-600/50 hover:bg-slate-700/50 transition-all duration-300 group"
                aria-label="Fiverr Profile"
              >
                <div className="w-5 h-5 mr-3 flex items-center justify-center">
                  <span className="text-green-500 font-bold text-lg group-hover:text-green-400 transition-colors duration-300">F</span>
                </div>
                <span className="text-slate-300 font-medium group-hover:text-white transition-colors duration-300">
                  Fiverr
                </span>
              </a>
              <a
                href={data.personalInfo.upwork}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center bg-slate-800/80 rounded-lg px-6 py-3 shadow-lg border border-slate-600/50 hover:border-green-400/50 hover:bg-slate-700/50 transition-all duration-300 group"
                aria-label="Upwork Profile"
              >
                <div className="w-5 h-5 mr-3 flex items-center justify-center">
                  <span className="text-green-400 font-bold text-lg group-hover:text-green-300 transition-colors duration-300">U</span>
                </div>
                <span className="text-slate-300 font-medium group-hover:text-white transition-colors duration-300">
                  Upwork
                </span>
              </a>
              <a
                href={data.personalInfo.resumePath}
                download="Muhammad Sami Resume.pdf"
                className="flex items-center bg-slate-800/80 rounded-lg px-6 py-3 shadow-lg border border-slate-600/50 hover:border-purple-400/50 hover:bg-slate-700/50 transition-all duration-300 group"
                aria-label="Download Resume"
              >
                <FontAwesomeIcon
                  icon={faDownload}
                  className="text-purple-400 text-xl mr-3 group-hover:text-purple-300 transition-colors duration-300"
                />
                <span className="text-slate-300 font-medium group-hover:text-white transition-colors duration-300">
                  Download Resume
                </span>
              </a>
            </div>

            <div className="flex justify-center">
              <button
                onClick={() => scrollToSection("contact")}
                className="bg-transparent border border-slate-600 text-gray-200 px-8 py-4 rounded-lg font-semibold hover:text-slate-100 hover:border-slate-400 hover:bg-slate-700/30 transition-all duration-300 flex items-center"
              >
                <FontAwesomeIcon icon={faPaperPlane} className="mr-2" />
                Contact Me
              </button>
            </div>
          </div>
        </div>
      </section>

      <main id="main" className="max-w-7xl mx-auto px-4 pb-16">

        {/* About Me */}
        <section id="about" className="mb-20" role="region" aria-labelledby="about-heading">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">About Me</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full"></div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-slate-800/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-slate-700/50"
          >
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-2xl font-bold text-white mb-6">
                  Professional Journey
                </h3>
                <p className="text-slate-300 text-lg leading-relaxed mb-6">
                  {data.professionalSummary.text}
                </p>
                <div className="grid grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-400 mb-2">
                      {data.professionalSummary.stats.yearsExperience}+
                    </div>
                    <div className="text-slate-400 text-sm">Years Experience</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-400 mb-2">
                      {data.professionalSummary.stats.projectsCompleted}
                    </div>
                    <div className="text-slate-400 text-sm">Projects Delivered</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-purple-400 mb-2">
                      {data.professionalSummary.stats.apiIntegrations}
                    </div>
                    <div className="text-slate-400 text-sm">API Integrations</div>
                  </div>
                </div>
              </div>
              
              <div className="relative">
                <div className="bg-gradient-to-br from-blue-900/20 to-purple-900/20 rounded-2xl p-6 border border-blue-500/20">
                  <h4 className="text-xl font-bold text-white mb-4">What I Do Best</h4>
                  <ul className="space-y-3">
                    <li className="flex items-start text-slate-300">
                      <span className="text-blue-400 mr-3 mt-1">•</span>
                      Full-stack web application development using modern frameworks
                    </li>
                    <li className="flex items-start text-slate-300">
                      <span className="text-green-400 mr-3 mt-1">•</span>
                      RESTful API design and integration with third-party services
                    </li>
                    <li className="flex items-start text-slate-300">
                      <span className="text-purple-400 mr-3 mt-1">•</span>
                      CRM and ERP system development with scalable architecture
                    </li>
                    <li className="flex items-start text-slate-300">
                      <span className="text-orange-400 mr-3 mt-1">•</span>
                      AI-powered workflow automation and business process optimization
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Skills */}
        <section id="skills" className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">
              Skills & Expertise
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full"></div>
          </div>

          {/* Core Expertise Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <div className="bg-gradient-to-br from-blue-900/50 to-purple-900/50 rounded-3xl shadow-2xl p-8 border border-blue-500/30 backdrop-blur-sm">
              <div className="text-center mb-8">
                <h3 className="text-3xl font-bold text-white mb-2">
                  Core Expertise
                </h3>
                <p className="text-blue-200">
                  Primary technologies I work with daily
                </p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                {data.skills.coreExpertise.map((skill, index) => {
                  const skillLogos: { [key: string]: string } = {
                    PHP: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg",
                    JavaScript: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
                    "JavaScript (ES6)": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
                    TypeScript: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
                    Laravel: "https://laravel.com/img/logomark.min.svg",
                    "React.js": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
                    "Next.js": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
                    MySQL: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",
                    "REST APIs": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg",
                    Git: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
                  };

                  return (
                    <motion.div
                      key={skill}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      whileHover={{ scale: 1.05, y: -5 }}
                      className="group relative"
                    >
                      <div className="bg-slate-800/80 backdrop-blur-sm rounded-2xl p-6 border border-slate-600/50 hover:border-blue-400/50 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/20">
                        <div className="flex flex-col items-center text-center">
                          <div className="w-16 h-16 mb-4 flex items-center justify-center bg-slate-700/50 rounded-xl border border-slate-600/30">
                            <img
                              src={skillLogos[skill]}
                              alt={`${skill} logo`}
                              className="w-10 h-10 object-contain"
                              onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.style.display = "none";
                                const parent = target.parentElement;
                                if (parent) {
                                  parent.innerHTML = `<span class="text-2xl font-bold text-blue-400">${skill.charAt(
                                    0
                                  )}</span>`;
                                }
                              }}
                            />
                          </div>
                          <h4 className="text-lg font-bold text-white mb-2">
                            {skill}
                          </h4>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </motion.div>

          {/* Technical Skills Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {Object.entries(data.skills.technical).map(
              ([category, skills], categoryIndex) => {
                return (
                  <motion.div
                    key={category}
                    initial={{
                      opacity: 0,
                      x: categoryIndex % 2 === 0 ? -20 : 20,
                    }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="bg-slate-800/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-slate-700/50"
                  >
                    <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                      <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                      {category}
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {skills.map((skill, index) => (
                        <div
                          key={`${skill.name}-${index}`}
                          className="flex items-center bg-slate-700/50 rounded-lg p-3 hover:bg-slate-600/50 transition-all duration-300"
                        >
                          <div className="w-8 h-8 mr-3 flex items-center justify-center bg-slate-800/50 rounded-lg">
                            <img
                              src={skill.logo}
                              alt={`${skill.name} logo`}
                              className="w-5 h-5 object-contain"
                              onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.style.display = "none";
                                const parent = target.parentElement;
                                if (parent) {
                                  parent.innerHTML = `<span class="text-xs font-bold text-slate-400">${skill.name.charAt(
                                    0
                                  )}</span>`;
                                }
                              }}
                            />
                          </div>
                          <span className="text-slate-200 text-sm font-medium">
                            {skill.name}
                          </span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                );
              }
            )}
          </div>

          {/* API Integrations Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-8"
          >
            <div className="bg-slate-800/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-slate-700/50">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                API Integrations
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-4">
                {data.skills.apiIntegrations.map((api, index) => (
                  <motion.div
                    key={api.name}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.05 }}
                    className="group relative"
                  >
                    <div className="bg-slate-700/50 rounded-lg p-4 hover:bg-slate-600/50 transition-all duration-300 border border-slate-600/30 hover:border-green-500/30">
                      <div className="flex flex-col items-center text-center">
                        <div className="w-12 h-12 mb-3 flex items-center justify-center bg-slate-800/50 rounded-lg">
                          <img
                            src={api.logo}
                            alt={`${api.name} logo`}
                            className="w-8 h-8 object-contain"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.style.display = "none";
                              const parent = target.parentElement;
                              if (parent) {
                                parent.innerHTML = `<span class="text-xs font-bold text-slate-400">${api.name.charAt(
                                  0
                                )}</span>`;
                              }
                            }}
                          />
                        </div>
                        <h4 className="text-sm font-medium text-white mb-1">
                          {api.name}
                        </h4>
                        <p className="text-xs text-slate-400 text-center">
                          {api.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

        </section>

        {/* Experience */}
        <section id="experience" className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">Experience</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full"></div>
          </div>

          <div className="space-y-8">
            {data.experience.map((exp, index) => (
              <div
                key={index}
                className="bg-slate-800 rounded-2xl shadow-xl p-8 border border-slate-700 hover:border-slate-600 transition-colors duration-300"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-2">
                      {exp.title}
                    </h3>
                    <div className="text-lg text-blue-400 font-semibold">
                      {exp.company}
                    </div>
                  </div>
                  <div className="text-right mt-4 md:mt-0">
                    <div className="text-slate-300 font-medium">
                      {exp.period}
                    </div>
                    <div className="text-slate-400 text-sm">{exp.location}</div>
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mt-2 ${
                        exp.type === "Current"
                          ? "bg-green-900 text-green-300"
                          : "bg-slate-700 text-slate-300"
                      }`}
                    >
                      {exp.type}
                    </span>
                  </div>
                </div>
                <ul className="space-y-3">
                  {exp.achievements.map((achievement, achIndex) => (
                    <li
                      key={achIndex}
                      className="flex items-start text-slate-300 leading-relaxed"
                    >
                      <span className="text-blue-400 mr-3 mt-1">•</span>
                      {achievement}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Projects */}
        <section id="projects" className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">Projects</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full"></div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {data.projects.map((project, index) => (
              <div
                key={index}
                className="bg-slate-800 rounded-2xl shadow-xl p-8 border border-slate-700 hover:border-slate-600 transition-all duration-300 hover:transform hover:scale-105"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-white">
                    {project.title}
                  </h3>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      project.status === "Live"
                        ? "bg-green-900 text-green-300"
                        : project.status === "Published"
                        ? "bg-blue-900 text-blue-300"
                        : "bg-orange-900 text-orange-300"
                    }`}
                  >
                    {project.status}
                  </span>
                </div>
                <p className="text-slate-300 leading-relaxed mb-6">
                  {project.description}
                </p>
                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center bg-transparent border border-slate-600 text-slate-300 px-4 py-2 rounded-lg font-semibold hover:text-blue-400 hover:border-blue-400/50 transition-all duration-300"
                  >
                    {project.linkText}
                    <span className="ml-2">→</span>
                  </a>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Education & Certifications */}
        <section id="education" className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">Education & Certifications</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full"></div>
          </div>

          <div className="space-y-12">
            {/* Education */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                <FontAwesomeIcon icon={faUser} className="text-blue-400 mr-3" />
                Academic Background
              </h3>
              <div className="space-y-6">
                {data.educationAndCertifications.education.map((edu, index) => (
                  <div
                    key={index}
                    className="bg-slate-800 rounded-2xl shadow-xl p-8 border border-slate-700 hover:border-slate-600 transition-colors duration-300"
                  >
                    <div className="text-center">
                      <h4 className="text-2xl font-bold text-white mb-2">
                        {edu.degree}
                      </h4>
                      <div className="text-lg text-blue-400 font-semibold mb-4">
                        {edu.institution}
                      </div>
                      {edu.focus && (
                        <div className="text-slate-400 mb-2">
                          Focus: {edu.focus}
                        </div>
                      )}
                      {edu.coursework && (
                        <div className="text-slate-400">
                          Relevant Coursework: {edu.coursework.join(", ")}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Certifications */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                <FontAwesomeIcon icon={faCalendarDays} className="text-green-400 mr-3" />
                Professional Certifications
              </h3>
              <div className="grid md:grid-cols-2 gap-8">
                {data.educationAndCertifications.certifications.map((cert, index) => (
                  <div
                    key={index}
                    className="bg-slate-800 rounded-2xl shadow-xl p-8 border border-slate-700 hover:border-slate-600 transition-colors duration-300"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h4 className="text-xl font-bold text-white mb-2">
                          {cert.title}
                        </h4>
                        <div className="text-lg text-blue-400 font-semibold mb-1">
                          {cert.issuer}
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-green-900 text-green-300">
                          {cert.date}
                        </span>
                      </div>
                    </div>
                    <p className="text-slate-300 leading-relaxed">
                      {cert.description}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      {/* Footer with Contact Form */}
      <footer id="contact" className="bg-slate-800 border-t border-slate-700">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div>
              <h3 className="text-3xl font-bold text-white mb-6">
                {data.contact.formTitle}
              </h3>
              <p className="text-slate-300 leading-relaxed mb-8">
                {data.contact.formDescription}
              </p>

              <div className="space-y-4">
                <div className="flex items-center">
                  <FontAwesomeIcon
                    icon={faEnvelope}
                    className="text-slate-400 text-xl mr-4"
                  />
                  <div>
                    <div className="text-white font-semibold">Email</div>
                    <div className="text-slate-300">
                      {data.personalInfo.email}
                    </div>
                  </div>
                </div>
                <div className="flex items-center">
                  <FontAwesomeIcon
                    icon={faPhone}
                    className="text-slate-400 text-xl mr-4"
                  />
                  <div>
                    <div className="text-white font-semibold">Phone</div>
                    <div className="text-slate-300">
                      {data.personalInfo.phone}
                    </div>
                  </div>
                </div>
                <div className="flex items-center">
                  <FontAwesomeIcon
                    icon={faLocationDot}
                    className="text-slate-400 text-xl mr-4"
                  />
                  <div>
                    <div className="text-white font-semibold">Location</div>
                    <div className="text-slate-300">
                      {data.personalInfo.location}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <h3 className="text-3xl font-bold text-white mb-6">
                {data.contact.messageTitle}
              </h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Status Messages */}
                {submitStatus.type && (
                  <div
                    className={`p-4 rounded-lg border ${
                      submitStatus.type === "success"
                        ? "bg-green-900/20 border-green-500/30 text-green-300"
                        : "bg-red-900/20 border-red-500/30 text-red-300"
                    }`}
                  >
                    <p className="text-sm font-medium">
                      {submitStatus.message}
                    </p>
                  </div>
                )}

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-slate-300 mb-2"
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400 transition-colors duration-300"
                      placeholder="Your Name"
                      onChange={handleChange}
                      disabled={isSubmitting}
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-slate-300 mb-2"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400 transition-colors duration-300"
                      placeholder="your.email@example.com"
                      onChange={handleChange}
                      disabled={isSubmitting}
                      required
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="subject"
                    className="block text-sm font-medium text-slate-300 mb-2"
                  >
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400 transition-colors duration-300"
                    placeholder="Project Inquiry"
                    onChange={handleChange}
                    disabled={isSubmitting}
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-slate-300 mb-2"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={6}
                    value={formData.message}
                    className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400 transition-colors duration-300 resize-none"
                    placeholder="Tell me about your project..."
                    onChange={handleChange}
                    disabled={isSubmitting}
                    required
                  ></textarea>
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full font-semibold py-3 px-6 rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-slate-800 flex items-center justify-center ${
                    isSubmitting
                      ? "bg-slate-700 border border-slate-600 text-slate-500 cursor-not-allowed"
                      : "bg-transparent border border-slate-600 text-slate-300 hover:text-blue-400 hover:border-blue-400/50"
                  }`}
                >
                  <FontAwesomeIcon
                    icon={faPaperPlane}
                    className={`mr-2 ${isSubmitting ? "animate-pulse" : ""}`}
                  />
                  {isSubmitting ? "Sending..." : "Send Message"}
                </button>
              </form>
            </div>
          </div>

          {/* Footer Bottom */}
          <div className="border-t border-slate-700 mt-12 pt-8 text-center">
            <p className="text-slate-400">{data.footer.copyright}</p>
          </div>
        </div>
      </footer>

      {/* Fixed WhatsApp Button */}
      <a
        href={`https://wa.me/${data.personalInfo.whatsappNumber}`}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-2xl hover:shadow-green-500/25 transition-all duration-300 z-50 group hover:scale-110"
        aria-label="Contact via WhatsApp"
      >
        <FontAwesomeIcon icon={faWhatsapp} className="text-2xl" />
        <span className="absolute right-full mr-3 top-1/2 transform -translate-y-1/2 bg-slate-800 text-white px-3 py-2 rounded-lg text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
          Chat on WhatsApp
        </span>
      </a>
    </div>
  );
}
