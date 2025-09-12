"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faEnvelope, 
  faPhone, 
  faLocationDot, 
  faDownload, 
  faPaperPlane,
  faUser,
  faBuilding,
  faCalendarDays
} from '@fortawesome/free-solid-svg-icons';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';

export default function Home() {
  const [activeSection, setActiveSection] = useState("summary");
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

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

  // Technical skills consolidated into one section
  const technicalSkills = {
    "Programming Languages": ["PHP", "JavaScript"],
    Frameworks: [
      "Laravel",
      "CodeIgniter",
      "Node.js",
      "jQuery",
      "React.js",
      "Next.js",
    ],
    Databases: ["MySQL", "MariaDB"],
    "Version Control": ["Git", "GitHub"],
    "API Integrations": [
      "Retell AI (Voice Agent)",
      "Cal.com",
      "Stripe",
      "PayPal",
      "Twilio",
      "Google Maps",
      "Wazzup",
      "Umnico(meta)",
      "Authorize.net",
      "Square",
    ],
    Other: ["RESTful APIs", "JWT", "OAuth", "Webhooks"],
  };

  // Non-technical skills
  const otherSkills = {
    "CRM Tools": ["Zoho CRM"],
    Collaboration: ["Slack", "Microsoft Teams"],
    "Project Management Tools": ["Jira", "Trello"],
    "Soft Skills": [
      "Observation",
      "Decision making",
      "Communication",
      "Multi-tasking",
    ],
  };

  const experiences = [
    {
      title: "Software Engineer",
      company: "Adalat Group",
      period: "Dec 24 - Present",
      location: "Pakistan",
      type: "Current",
      achievements: [
        "Developed a CRM module from scratch, including lead management, real-time client–agent communication, and integration with WhatsApp, Facebook (Meta) APIs, and Pusher for instant notifications.",
        "Built a Stock Management System from scratch, covering Normal & Lot-wise inventory, low stock and expiry alerts, plus stock movement operations (In, Out, Transfer).",
        "Collaborated in an Agile environment with Jira for sprint tracking and Git for version control, ensuring scalable and maintainable solutions.",
      ],
    },
    {
      title: "Software Engineer",
      company: "Quantum Computing Services",
      period: "Jan 24 - Nov 24",
      location: "Pakistan",
      type: "Full-time",
      achievements: [
        "Worked on an email marketing automation tool, contributing to both backend (Laravel) and frontend (Next.js) development in a collaborative team environment.",
        "Engineered a custom SQL query builder to execute core database queries without Eloquent, significantly improving performance and response times.",
        "Built and maintained RESTful APIs to ensure smooth data exchange between frontend and backend components.",
        "Integrated APIs on the frontend and used Git for version control to manage and track development tasks effectively.",
      ],
    },
    {
      title: "Mid-Level Software Engineer",
      company: "Salsoft Technologies",
      period: "Oct 21 - Dec 23",
      location: "Pakistan",
      type: "Full-time",
      achievements: [
        "Developed and maintained backend systems using PHP (Laravel), including custom CMS solutions, e-commerce platforms, and admin panels from backend to deployment.",
        "Integrated third-party APIs and payment gateways, and used Blade templating to build responsive, dynamic interfaces with a focus on performance and usability.",
      ],
    },
    {
      title: "PHP Developer",
      company: "Mad Minds Creative",
      period: "Dec 20 - Sep 21",
      location: "Pakistan",
      type: "Full-time",
      achievements: [
        "Collaborated with team members to complete assigned tasks and converted static HTML templates into responsive, cross-browser-compatible WordPress themes with clean code structure.",
      ],
    },
  ];

  const projects = [
    {
      title: "Laravel API CRUD Generator",
      description:
        "Published a Composer package on Packagist to automate CRUD API generation using Artisan commands, streamlining route, controller, and model creation with validation. Reused across projects to reduce repetitive code and accelerate development.",
      link: "https://packagist.org/packages/muhammadsami/laravel-crud-generator",
      linkText: "View on Packagist",
      status: "Published",
    },
    {
      title: "Email Marketing System",
      description:
        "Developed an email marketing platform with multi-server support for improved deliverability and load distribution. Implemented smart scheduling, audience segmentation, bounce tracking, and real-time server monitoring for high-volume, efficient email delivery.",
      status: "Production",
    },
    {
      title: "Dentalzorg ERP",
      description:
        "Independently developed a dental CRM module from scratch as part of a regional ERP system, enabling clinics to manage patients, appointments, and treatments, with role-based access and automated reminders.",
      link: "https://www.dentalzorg.nl",
      linkText: "Visit Website",
      status: "Live",
    },
  ];

  const certifications = [
    {
      title: "PHP Certified Developer",
      issuer: "Zend Technologies",
      date: "2022",
      description: "Advanced PHP programming and best practices certification"
    },
    {
      title: "Laravel Certified Developer",
      issuer: "Laravel",
      date: "2023",
      description: "Expert-level Laravel framework development certification"
    },
    {
      title: "MySQL Database Administrator",
      issuer: "Oracle",
      date: "2021",
      description: "Database design, optimization, and administration certification"
    },
    {
      title: "AWS Cloud Practitioner",
      issuer: "Amazon Web Services",
      date: "2023",
      description: "Cloud computing fundamentals and AWS services certification"
    }
  ];

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
              Muhammad Sami
            </button>
            <div className="hidden md:flex space-x-4">
              {["Summary", "Skills", "Experience", "Projects", "Education", "Certifications", "Get in Touch"].map(
                (item) => (
                  <button
                    key={item}
                    onClick={() => scrollToSection(item.toLowerCase())}
                    className={`px-4 py-2 rounded-lg transition-all duration-300 bg-transparent ${
                      (activeSection === item.toLowerCase()) || (activeSection === "contact" && item === "Get in Touch")
                        ? "text-blue-400 border border-blue-400"
                        : "text-slate-300 hover:text-blue-400 hover:border hover:border-blue-400/50"
                    }`}
                  >
                    {item}
                  </button>
                )
              )}
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
                  Muhammad Sami
                </h1>
                <div className="text-xl md:text-2xl lg:text-3xl text-blue-300 mb-3 font-semibold">
                  Software Engineer
                </div>
                <div className="text-lg md:text-xl text-gray-300 mb-2">
                  Laravel | Node.js | Full Stack Developer
                </div>
                <div className="text-base md:text-lg text-gray-400">
                  4+ Years Experience • 50+ Projects Delivered
                </div>
              </div>
              <div className="relative flex-shrink-0">
                <div className="bg-gradient-to-br from-blue-500/10 to-purple-600/10 rounded-2xl p-6 backdrop-blur-sm border border-slate-700/50 hover:border-blue-400/30 transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/10">
                  <Image
                    src="/avatar-main.png"
                    alt="Muhammad Sami - Software Engineer"
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
              <div className="flex items-center bg-slate-800/80 rounded-full px-6 py-3 shadow-lg border border-slate-600/50 hover:border-blue-400/50 transition-all duration-300">
                <FontAwesomeIcon icon={faEnvelope} className="text-blue-400 text-xl mr-3" />
                <span className="text-gray-200">
                  mohammadsami501@gmail.com
                </span>
              </div>
              <div className="flex items-center bg-slate-800/80 rounded-full px-6 py-3 shadow-lg border border-slate-600/50 hover:border-blue-400/50 transition-all duration-300">
                <FontAwesomeIcon icon={faPhone} className="text-blue-400 text-xl mr-3" />
                <span className="text-gray-200">+923132835015</span>
              </div>
              <div className="flex items-center bg-slate-800/80 rounded-full px-6 py-3 shadow-lg border border-slate-600/50 hover:border-blue-400/50 transition-all duration-300">
                <FontAwesomeIcon icon={faLocationDot} className="text-blue-400 text-xl mr-3" />
                <span className="text-gray-200">Pakistan</span>
              </div>
            </div>

            <div className="flex flex-wrap justify-center gap-4">
              <button className="bg-transparent border border-slate-600 text-gray-200 px-8 py-4 rounded-lg font-semibold hover:text-blue-400 hover:border-blue-400/50 hover:bg-blue-400/5 transition-all duration-300 flex items-center">
                <FontAwesomeIcon icon={faDownload} className="mr-2" />
                Download Resume
              </button>
              <button className="bg-transparent border border-slate-600 text-gray-200 px-8 py-4 rounded-lg font-semibold hover:text-blue-400 hover:border-blue-400/50 hover:bg-blue-400/5 transition-all duration-300 flex items-center">
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
                <div className="text-4xl font-bold text-slate-200 mb-2">4+</div>
                <div className="text-slate-300">Years Experience</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-slate-200 mb-2">
                  50+
                </div>
                <div className="text-slate-300">Projects Completed</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-slate-200 mb-2">
                  15+
                </div>
                <div className="text-slate-300">API Integrations</div>
              </div>
            </div>

            <p className="text-slate-300 leading-relaxed text-lg text-center">
              Backend Developer with 4+ years of experience building secure and
              scalable applications using PHP (Laravel). Skilled in RESTful API
              design, MySQL/MongoDB query optimization, and proficient in
              Node.js with working knowledge of React.js & Next.js. Strong focus
              on clean architecture, performance optimization, and modern
              development practices with growing full-stack expertise.
            </p>
          </div>
        </section>

        {/* Skills */}
        <section id="skills" className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">Skills</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full"></div>
          </div>

          <div className="grid gap-8">
            {/* Technical Skills - Single Card */}
            <div className="bg-slate-800 rounded-2xl shadow-xl p-8 border border-slate-700">
              <h3 className="text-2xl font-bold text-white mb-6">
                Technical Skills
              </h3>
              <div className="grid gap-6">
                {Object.entries(technicalSkills).map(
                  ([category, skills], index) => (
                    <div key={index}>
                      <h4 className="text-lg font-semibold text-slate-300 mb-3">
                        {category}
                      </h4>
                      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
                        {skills.map((skill, skillIndex) => (
                          <div
                            key={skillIndex}
                            className="flex items-center bg-slate-700 rounded-lg p-3 hover:bg-slate-600 transition-colors duration-300"
                          >
                            <div className="w-8 h-8 mr-3 flex items-center justify-center bg-slate-800 rounded-lg shadow-sm">
                              <span className="text-xs font-bold text-slate-400">
                                {skill.charAt(0)}
                              </span>
                            </div>
                            <span className="text-slate-300 text-sm font-medium">
                              {skill}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>

            {/* Other Skills */}
            <div className="bg-slate-800 rounded-2xl shadow-xl p-8 border border-slate-700">
              <h3 className="text-2xl font-bold text-white mb-6">
                Other Skills
              </h3>
              <div className="grid gap-6">
                {Object.entries(otherSkills).map(
                  ([category, skills], index) => (
                    <div key={index}>
                      <h4 className="text-lg font-semibold text-slate-300 mb-3">
                        {category}
                      </h4>
                      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
                        {skills.map((skill, skillIndex) => (
                          <div
                            key={skillIndex}
                            className="flex items-center bg-slate-700 rounded-lg p-3 hover:bg-slate-600 transition-colors duration-300"
                          >
                            <div className="w-8 h-8 mr-3 flex items-center justify-center bg-slate-800 rounded-lg shadow-sm">
                              <span className="text-xs font-bold text-purple-400">
                                {skill.charAt(0)}
                              </span>
                            </div>
                            <span className="text-slate-300 text-sm font-medium">
                              {skill}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Experience */}
        <section id="experience" className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">Experience</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full"></div>
          </div>

          <div className="space-y-8">
            {experiences.map((exp, index) => (
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
            {projects.map((project, index) => (
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

          <div className="bg-slate-800 rounded-2xl shadow-xl p-8 border border-slate-700">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-white mb-2">
                Bachelor of Science in Computer Science
              </h3>
              <div className="text-lg text-blue-400 font-semibold mb-2">
                University of Education, Lahore
              </div>
              <div className="text-slate-300">2018 - 2022</div>
              <div className="text-slate-400 mt-4">
                Focused on software engineering, database systems, and web
                development
              </div>
            </div>
          </div>
        </section>

        {/* Certifications */}
        <section id="certifications" className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">Certifications</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {certifications.map((cert, index) => (
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
              <h3 className="text-3xl font-bold text-white mb-6">Get In Touch</h3>
              <p className="text-slate-300 leading-relaxed mb-8">
                I&apos;m always interested in new opportunities and exciting projects. 
                Whether you have a question or just want to say hi, feel free to reach out!
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center">
                  <FontAwesomeIcon icon={faEnvelope} className="text-blue-400 text-xl mr-4" />
                  <div>
                    <div className="text-white font-semibold">Email</div>
                    <div className="text-slate-300">mohammadsami501@gmail.com</div>
                  </div>
                </div>
                <div className="flex items-center">
                  <FontAwesomeIcon icon={faPhone} className="text-blue-400 text-xl mr-4" />
                  <div>
                    <div className="text-white font-semibold">Phone</div>
                    <div className="text-slate-300">+923132835015</div>
                  </div>
                </div>
                <div className="flex items-center">
                  <FontAwesomeIcon icon={faLocationDot} className="text-blue-400 text-xl mr-4" />
                  <div>
                    <div className="text-white font-semibold">Location</div>
                    <div className="text-slate-300">Pakistan</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <h3 className="text-3xl font-bold text-white mb-6">Send Message</h3>
              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-slate-300 mb-2">
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
                    <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-2">
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
                  <label htmlFor="subject" className="block text-sm font-medium text-slate-300 mb-2">
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
                  <label htmlFor="message" className="block text-sm font-medium text-slate-300 mb-2">
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
            <p className="text-slate-400">
              © 2024 Muhammad Sami. All rights reserved. Built with Next.js and Tailwind CSS.
            </p>
          </div>
        </div>
      </footer>

      {/* Fixed WhatsApp Button */}
      <a 
        href="https://wa.me/923132835015" 
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
