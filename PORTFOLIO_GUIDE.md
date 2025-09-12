# Dynamic Portfolio Guide

## Overview
Your portfolio is now fully dynamic and driven by a JSON configuration file. All content can be easily updated by modifying the `src/data/portfolio.json` file without touching any code.

## File Structure
```
src/
├── data/
│   └── portfolio.json          # Main configuration file with all your data
├── types/
│   └── portfolio.ts           # TypeScript interfaces for type safety
└── app/
    └── page.tsx              # Main portfolio component (now dynamic)
```

## How to Update Your Portfolio

### 1. Personal Information
Edit the `personalInfo` section in `portfolio.json`:
```json
{
  "personalInfo": {
    "name": "MUHAMMAD SAMI",
    "title": "Software Engineer | Laravel | Node.js",
    "subtitle": "Backend Developer",
    "email": "mohammadsami501@gmail.com",
    "phone": "+923132835015",
    "location": "Pakistan",
    "profileName": "Muhammad Sami",
    "avatar": "/avatar-main.png",
    "whatsappNumber": "923132835015"
  }
}
```

### 2. Professional Summary
Update your summary and stats:
```json
{
  "professionalSummary": {
    "text": "Your professional summary here...",
    "stats": {
      "yearsExperience": "4+",
      "projectsCompleted": "50+",
      "apiIntegrations": "15+"
    }
  }
}
```

### 3. Skills
Add or modify skills in two categories:
```json
{
  "skills": {
    "technical": {
      "Programming Languages": ["PHP", "JavaScript"],
      "Frameworks": ["Laravel", "Node.js", "React.js"],
      "Databases": ["MySQL", "MariaDB"]
    },
    "other": {
      "Soft Skills": ["Communication", "Problem Solving"],
      "Tools": ["Git", "Docker"]
    }
  }
}
```

### 4. Experience
Add new jobs or update existing ones:
```json
{
  "experience": [
    {
      "title": "Software Engineer",
      "company": "Company Name",
      "period": "Jan 2024 - Present",
      "location": "Pakistan",
      "type": "Current", // or "Full-time", "Part-time", etc.
      "achievements": [
        "Achievement 1",
        "Achievement 2"
      ]
    }
  ]
}
```

### 5. Projects
Add or update your projects:
```json
{
  "projects": [
    {
      "title": "Project Name",
      "description": "Project description...",
      "link": "https://example.com", // Optional
      "linkText": "View Project", // Optional
      "status": "Live" // "Live", "Published", "Production", etc.
    }
  ]
}
```

### 6. Education
Update your educational background:
```json
{
  "education": [
    {
      "degree": "Bachelor of Science in Software Engineering",
      "institution": "University Name",
      "duration": "2021 - Present",
      "focus": "Software Engineering", // Optional
      "coursework": ["Course 1", "Course 2"] // Optional
    }
  ]
}
```

### 7. Certifications
Add your certifications:
```json
{
  "certifications": [
    {
      "title": "Certification Name",
      "issuer": "Issuing Organization",
      "date": "Apr 2023",
      "description": "Certification description"
    }
  ]
}
```

### 8. Contact Information
Update contact form text:
```json
{
  "contact": {
    "formTitle": "Get In Touch",
    "formDescription": "Your contact description...",
    "messageTitle": "Send Message"
  }
}
```

### 9. Navigation
Customize navigation menu items:
```json
{
  "navigation": [
    "Summary",
    "Skills", 
    "Experience",
    "Projects",
    "Education",
    "Certifications",
    "Get in Touch"
  ]
}
```

## Key Features

### ✅ Fully Dynamic Content
- All text, links, and data are loaded from JSON
- No code changes needed for content updates
- Type-safe with TypeScript interfaces

### ✅ Easy Maintenance
- Single file (`portfolio.json`) contains all your information
- Clear structure and organization
- JSON validation ensures data integrity

### ✅ Flexible Structure
- Add/remove skills, experiences, projects easily
- Optional fields (like project links, education coursework)
- Expandable for future needs

### ✅ Professional Features
- Dynamic WhatsApp integration
- Responsive design maintained
- SEO-friendly structure
- Professional styling preserved

## Quick Update Workflow

1. **Open** `src/data/portfolio.json`
2. **Edit** the relevant section (personal info, experience, etc.)
3. **Save** the file
4. **Refresh** your browser to see changes

## Example: Adding a New Job

```json
{
  "title": "Senior Software Engineer",
  "company": "New Company",
  "period": "Jan 2025 - Present",
  "location": "Pakistan",
  "type": "Current",
  "achievements": [
    "Led a team of 5 developers",
    "Implemented microservices architecture",
    "Reduced system response time by 40%"
  ]
}
```

## Example: Adding a New Skill Category

```json
{
  "skills": {
    "technical": {
      "Cloud Platforms": ["AWS", "Google Cloud", "Azure"],
      "DevOps": ["Docker", "Kubernetes", "Jenkins"]
    }
  }
}
```

## Tips for Best Results

1. **Keep descriptions concise** but informative
2. **Use consistent formatting** for dates and periods
3. **Update stats regularly** (years of experience, project count)
4. **Maintain professional tone** throughout
5. **Test links** before adding them to projects
6. **Use proper JSON syntax** to avoid errors

## Troubleshooting

### JSON Syntax Errors
- Ensure all strings are in quotes
- Check for missing commas
- Validate JSON structure online if needed

### Missing Data
- All required fields must be present
- Optional fields can be omitted or set to null
- Check TypeScript interfaces for field requirements

### Image Issues
- Ensure avatar image exists in `/public` folder
- Use correct path format (starting with `/`)
- Optimize images for web use

## Future Enhancements

The structure is designed to be easily expandable. You can add:
- Social media links
- Blog posts section
- Testimonials
- Awards and achievements
- Language proficiencies
- Volunteer experience

Your portfolio is now completely dynamic and easy to maintain!
