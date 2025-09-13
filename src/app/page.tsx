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
  faBuilding,
  faCalendarDays,
} from "@fortawesome/free-solid-svg-icons";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import portfolioData from "../data/portfolio.json";
import { PortfolioData } from "../types/portfolio";

// Type assertion for the imported JSON data
const data: PortfolioData = portfolioData as PortfolioData;

export default function Home() {
  const [activeSection, setActiveSection] = useState("home");
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Check if we're at the top of the page (Home section)
      if (window.scrollY < 100) {
        setActiveSection("home");
        return;
      }

      // Get all sections
      const sections = [
        "summary",
        "skills",
        "experience",
        "projects",
        "education",
        "certifications",
        "contact",
      ];
      const scrollPosition = window.scrollY + 100; // Offset for navbar

      // Find which section is currently in view
      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(sectionId);
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
      {/* Navigation */}
      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-slate-900/95 backdrop-blur-md shadow-lg border-b border-slate-700"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <button className="text-2xl font-bold text-white bg-transparent hover:text-blue-400 transition-colors duration-300">
              {data.personalInfo.profileName}
            </button>
            <div className="hidden md:flex space-x-4">
              {data.navigation.map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className={`px-4 py-2 rounded-lg transition-all duration-300 bg-transparent ${
                    activeSection === item.toLowerCase() ||
                    (activeSection === "contact" && item === "Get in Touch")
                      ? "text-slate-100 border border-slate-400 bg-slate-700/30"
                      : "text-slate-300 hover:text-slate-100 hover:border hover:border-slate-400/50"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section with Avatar */}
      <section className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center">
            {/* Professional Avatar and Name Container */}
            <div className="flex flex-col lg:flex-row items-center justify-center gap-12 mb-8">
              <div className="text-center lg:text-left">
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-100 mb-4 leading-tight">
                  {data.personalInfo.profileName}
                </h1>
                <div className="text-xl md:text-2xl lg:text-3xl text-slate-300 mb-3 font-semibold">
                  Software Engineer
                </div>
                <div className="text-lg md:text-xl text-gray-300 mb-2">
                  {data.personalInfo.title}
                </div>
                <div className="text-base md:text-lg text-gray-400">
                  {data.professionalSummary.stats.yearsExperience} Years
                  Experience •{" "}
                  {data.professionalSummary.stats.projectsCompleted} Projects
                  Delivered
                </div>
              </div>
              <div className="relative flex-shrink-0">
                <div className="bg-gradient-to-br from-blue-500/10 to-purple-600/10 rounded-2xl p-6 backdrop-blur-sm border border-slate-700/50 hover:border-blue-400/30 transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/10">
                  <Image
                    src={data.personalInfo.avatar}
                    alt={`${data.personalInfo.profileName} - Software Engineer`}
                    width={0}
                    height={0}
                    sizes="100vw"
                    className="w-auto h-48 md:h-56 lg:h-64 object-contain filter drop-shadow-2xl hover:scale-105 transition-all duration-500 hover:drop-shadow-[0_0_30px_rgba(59,130,246,0.3)]"
                    priority
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <div className="flex items-center bg-slate-800/80 rounded-full px-6 py-3 shadow-lg border border-slate-600/50 hover:border-slate-400/50 transition-all duration-300">
                <FontAwesomeIcon
                  icon={faEnvelope}
                  className="text-slate-400 text-xl mr-3"
                />
                <span className="text-gray-200">{data.personalInfo.email}</span>
              </div>
              <div className="flex items-center bg-slate-800/80 rounded-full px-6 py-3 shadow-lg border border-slate-600/50 hover:border-slate-400/50 transition-all duration-300">
                <FontAwesomeIcon
                  icon={faPhone}
                  className="text-slate-400 text-xl mr-3"
                />
                <span className="text-gray-200">{data.personalInfo.phone}</span>
              </div>
              <div className="flex items-center bg-slate-800/80 rounded-full px-6 py-3 shadow-lg border border-slate-600/50 hover:border-slate-400/50 transition-all duration-300">
                <FontAwesomeIcon
                  icon={faLocationDot}
                  className="text-slate-400 text-xl mr-3"
                />
                <span className="text-gray-200">
                  {data.personalInfo.location}
                </span>
              </div>
            </div>

            <div className="flex flex-wrap justify-center gap-4">
              <a
                href={data.personalInfo.resumePath}
                download="Muhammad Sami Resume.pdf"
                className="bg-transparent border border-slate-600 text-gray-200 px-8 py-4 rounded-lg font-semibold hover:text-slate-100 hover:border-slate-400 hover:bg-slate-700/30 transition-all duration-300 flex items-center"
              >
                <FontAwesomeIcon icon={faDownload} className="mr-2" />
                Download Resume
              </a>
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

      <main className="max-w-7xl mx-auto px-4 pb-16">
        {/* Professional Summary */}
        <section id="summary" className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">
              Professional Summary
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full"></div>
          </div>

          <div className="bg-slate-800 rounded-2xl shadow-xl p-8 md:p-12 border border-slate-700">
            <div className="grid md:grid-cols-3 gap-8 mb-8">
              <div className="text-center">
                <div className="text-4xl font-bold text-slate-200 mb-2">
                  {data.professionalSummary.stats.yearsExperience}
                </div>
                <div className="text-slate-300">Years Experience</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-slate-200 mb-2">
                  {data.professionalSummary.stats.projectsCompleted}
                </div>
                <div className="text-slate-300">Projects Completed</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-slate-200 mb-2">
                  {data.professionalSummary.stats.apiIntegrations}
                </div>
                <div className="text-slate-300">API Integrations</div>
              </div>
            </div>

            <p className="text-slate-300 leading-relaxed text-lg text-center">
              {data.professionalSummary.text}
            </p>
          </div>
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
                    "PHP": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg",
                    "JavaScript": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
                    "Laravel": "https://laravel.com/img/logomark.min.svg",
                    "MySQL": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",
                    "REST APIs": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg",
                    "Git": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg"
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
                                  parent.innerHTML = `<span class="text-2xl font-bold text-blue-400">${skill.charAt(0)}</span>`;
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
          <div className="grid lg:grid-cols-2 gap-8 mb-8">
            {Object.entries(data.skills.technical).map(([category, skills], categoryIndex) => {
              // Define logos for technical skills
              const techLogos: { [key: string]: string } = {
                // Programming Languages
                "PHP": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg",
                "JavaScript": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
                
                // Frameworks
                "Laravel": "https://laravel.com/img/logomark.min.svg",
                "CodeIgniter": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/codeigniter/codeigniter-plain.svg",
                "Node.js": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
                "jQuery": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jquery/jquery-original.svg",
                "React.js": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
                "Next.js": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
                
                // Databases
                "MySQL": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",
                "MariaDB": "https://cdn.worldvectorlogo.com/logos/mariadb.svg",
                
                // Version Control
                "Git": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
                "GitHub": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg"
              };

              return (
                <motion.div
                  key={category}
                  initial={{ opacity: 0, x: categoryIndex % 2 === 0 ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                  className="bg-slate-800/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-slate-700/50"
                >
                  <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                    {category}
                  </h3>
                  <div className="grid grid-cols-1 gap-3">
                    {skills.map((skill, index) => (
                      <div
                        key={skill}
                        className="flex items-center bg-slate-700/50 rounded-lg p-3 hover:bg-slate-600/50 transition-all duration-300"
                      >
                        <div className="w-8 h-8 mr-3 flex items-center justify-center bg-slate-800/50 rounded-lg">
                          <img
                            src={techLogos[skill]}
                            alt={`${skill} logo`}
                            className="w-5 h-5 object-contain"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.style.display = "none";
                              const parent = target.parentElement;
                              if (parent) {
                                parent.innerHTML = `<span class="text-xs font-bold text-slate-400">${skill.charAt(0)}</span>`;
                              }
                            }}
                          />
                        </div>
                        <span className="text-slate-200 text-sm font-medium">
                          {skill}
                        </span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              );
            })}
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
                                parent.innerHTML = `<span class="text-xs font-bold text-slate-400">${api.name.charAt(0)}</span>`;
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

          {/* Zoho Experience Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-8"
          >
            <div className="bg-slate-800/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-slate-700/50">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                <span className="w-2 h-2 bg-orange-500 rounded-full mr-3"></span>
                Zoho Experience
              </h3>
              <p className="text-slate-300 mb-6">
                Experienced with Zoho Products and their scripting language Deluge
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {data.skills.zohoExperience.map((zoho, index) => (
                  <motion.div
                    key={zoho.name}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.05 }}
                    className="group relative"
                  >
                    <div className="bg-slate-700/50 rounded-lg p-4 hover:bg-slate-600/50 transition-all duration-300 border border-slate-600/30 hover:border-orange-500/30">
                      <div className="flex flex-col items-center text-center">
                        <div className="w-12 h-12 mb-3 flex items-center justify-center bg-slate-800/50 rounded-lg">
                          <img
                            src={zoho.logo}
                            alt={`${zoho.name} logo`}
                            className="w-8 h-8 object-contain"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.style.display = "none";
                              const parent = target.parentElement;
                              if (parent) {
                                parent.innerHTML = `<span class="text-xs font-bold text-slate-400">${zoho.name.charAt(0)}</span>`;
                              }
                            }}
                          />
                        </div>
                        <h4 className="text-sm font-medium text-white mb-1">
                          {zoho.name}
                        </h4>
                        <p className="text-xs text-slate-400 text-center">
                          {zoho.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Other Skills */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-8"
          >
            <div className="bg-slate-800/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-slate-700/50">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                <span className="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
                Additional Skills
              </h3>
              <div className="grid lg:grid-cols-3 gap-6">
                {Object.entries(data.skills.other).map(([category, skills]) => (
                  <div key={category}>
                    <h4 className="text-lg font-semibold text-slate-200 mb-3">
                      {category}
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {skills.map((skill) => (
                        <span
                          key={skill}
                          className="px-3 py-1.5 bg-slate-700/50 text-slate-200 rounded-lg text-sm font-medium hover:bg-purple-900/30 hover:text-purple-300 transition-all duration-300 cursor-default border border-slate-600/30 hover:border-purple-500/30"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
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

        {/* Education */}
        <section id="education" className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">Education</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full"></div>
          </div>

          <div className="space-y-8">
            {data.education.map((edu, index) => (
              <div
                key={index}
                className="bg-slate-800 rounded-2xl shadow-xl p-8 border border-slate-700"
              >
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-white mb-2">
                    {edu.degree}
                  </h3>
                  <div className="text-lg text-blue-400 font-semibold mb-2">
                    {edu.institution}
                  </div>
                  <div className="text-slate-300 mb-4">{edu.duration}</div>
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
        </section>

        {/* Certifications */}
        <section id="certifications" className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">
              Certifications
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {data.certifications.map((cert, index) => (
              <div
                key={index}
                className="bg-slate-800 rounded-2xl shadow-xl p-8 border border-slate-700 hover:border-slate-600 transition-colors duration-300"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white mb-2">
                      {cert.title}
                    </h3>
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
              <form className="space-y-6">
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
                      className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400 transition-colors duration-300"
                      placeholder="Your Name"
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
                      className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400 transition-colors duration-300"
                      placeholder="your.email@example.com"
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
                    className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400 transition-colors duration-300"
                    placeholder="Project Inquiry"
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
                    className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400 transition-colors duration-300 resize-none"
                    placeholder="Tell me about your project..."
                    required
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full bg-transparent border border-slate-600 text-slate-300 font-semibold py-3 px-6 rounded-lg hover:text-blue-400 hover:border-blue-400/50 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-slate-800 flex items-center justify-center"
                >
                  <FontAwesomeIcon icon={faPaperPlane} className="mr-2" />
                  Send Message
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
