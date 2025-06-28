import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Type definitions for freelancing data
export interface FreelancingService {
  title: string
  description: string
  icon: string
  features: string[]
  pricing: string
  color: string
}

export interface FreelancingProject {
  title: string
  client: string
  date: string
  description: string
  image: string
  technologies: string[]
  category: string
  outcome: string
  testimonial: string
  liveUrl: string
  caseStudyUrl: string
  color: string
}

export interface FreelancingTestimonial {
  name: string
  position: string
  company: string
  image: string
  rating: number
  text: string
  project: string
  date: string
}

export interface FreelancingStats {
  projectsCompleted: number
  clientsSatisfied: number
  yearsExperience: number
  technologiesUsed: number
}

export interface FreelancingProcess {
  step: number
  title: string
  description: string
  icon: string
  duration: string
}

export interface FreelancingData {
  services: FreelancingService[]
  projects: FreelancingProject[]
  testimonials: FreelancingTestimonial[]
  stats: FreelancingStats
  process: FreelancingProcess[]
}

export const personalData: {
  name: string
  email: string
  phone: string
  github: string
  linkedin: string
  website: string
  title: string
  subtitle: string
  summary: string
  skills: {
    programming: string[]
    webFrameworks: string[]
    mobile: string[]
    database: string[]
    tools: string[]
    concepts: string[]
  }
  experience: Array<{
    company: string
    position: string
    duration: string
    achievements: string[]
  }>
  education: Array<{
    institution: string
    degree: string
    duration: string
    grade: string
  }>
  projects: Array<{
    title: string
    date: string
    description: string
    technologies: string[]
  }>
  certificates: Array<{
    title: string
    date: string
  }>
  achievements: Array<{
    title: string
    date: string
  }>
  freelancing: FreelancingData
} = {
  name: "Aniket Shinde",
  email: "shindeaniketa7328@gmail.com",
  phone: "+91-9819394470",
  github: "github.com/aniket162002",
  linkedin: "linkedin.com/in/aniket-shinde-110018231",
  website: "aniketwebsite.netlify.com",
  
  title: "Full Stack Developer",
  subtitle: "Software Engineer",
  
  summary: "Versatile and enthusiastic software engineer with solid experience in full-stack development, API integration, and machine learning. Proven ability to deliver high-quality solutions in banking and insurance sectors. Adept at collaborating in cross-functional teams, maintaining legacy systems like SMART400, and building Flutter apps with AI integration. Passionate about learning new technologies and once again, Progressing.",
  
  skills: {
    programming: ["JavaScript", "Python", "Java", "C++", "SQL"],
    webFrameworks: ["React.js", "Node.js", "Next.js", "Spring Boot", "HTML", "CSS", "TailwindCSS"],
    mobile: ["Flutter"],
    database: ["MongoDB", "MySQL"],
    tools: ["Git", "GitHub", "Apache Kafka"],
    concepts: ["Machine Learning", "RESTful APIs", "Agile Development"]
  },
  
  experience: [
    {
      company: "SUD Life",
      position: "Software Engineer Trainee",
      duration: "Dec 2024 – Present",
      achievements: [
        "Contributing to enterprise API projects for digital insurance solutions.",
        "Maintaining and enhancing legacy systems based on SMART400 architecture.",
        "Providing support and development for system improvements and debugging."
      ]
    },
    {
      company: "Utkarsh Small Finance Bank",
      position: "Software Engineer",
      duration: "Aug 2024 – Dec 2024",
      achievements: [
        "Managed and optimized IT infrastructure to ensure seamless banking system integration.",
        "Collaborated with cross-functional teams to implement secure and efficient banking solutions."
      ]
    },
    {
      company: "TT Infotech (Freelance)",
      position: "Flutter Developer",
      duration: "Jan 2025",
      achievements: [
        "Developed a full-stack Flutter photo album management app integrated with AI features.",
        "Designed backend using PHP/MySQL, implemented secure image uploads, and user authentication."
      ]
    },
    {
      company: "IDBI Intech Ltd",
      position: "Machine Learning Engineer Intern",
      duration: "Dec 2022 – Jul 2023",
      achievements: [
        "Built ML models for real-world use cases to improve operational efficiency.",
        "Preprocessed large datasets and collaborated with teams for solution deployment."
      ]
    }
  ],
  
  education: [
    {
      institution: "Annasaheb Chudaman Patil College of Engineering, India",
      degree: "B.E. in Information Technology",
      duration: "2020 – 2024",
      grade: "CGPA: 8.9"
    },
    {
      institution: "Kirti College, India",
      degree: "MSSHSE (Class XII)",
      duration: "2019 – 2020",
      grade: "Percentage: 61.4%"
    },
    {
      institution: "Raja Shivaji Vidyalaya, India",
      degree: "MSSHSE (Class X)",
      duration: "2017 – 2018",
      grade: "Percentage: 81.2%"
    }
  ],
  
  projects: [
    {
      title: "Real-Time License Plate Recognition",
      date: "Dec 2023",
      description: "Extracted and recognized plate characters using OpenCV and ML models from live video feed.",
      technologies: ["OpenCV", "Machine Learning", "Python"]
    },
    {
      title: "Anime Club (MERN Stack App)",
      date: "Jun 2023",
      description: "Created a CRUD-enabled anime management site with Node.js and MongoDB. Improved API response time by 40% via backend optimizations.",
      technologies: ["MongoDB", "Express.js", "React.js", "Node.js"]
    },
    {
      title: "Code Sync (Collaboration Tool)",
      date: "Dec 2023",
      description: "Built user login system with collaborative project to functionality.",
      technologies: ["React.js", "Node.js", "WebSocket"]
    }
  ],
  
  certificates: [
    {
      title: "Full Stack Development – Codecademy",
      date: "Dec 2023"
    },
    {
      title: "Cyber Warrior – Hackingflix Academy",
      date: "Dec 2022"
    }
  ],
  
  achievements: [
    {
      title: "Ex NSS Volunteer",
      date: "Dec 2023"
    },
    {
      title: "Ex NCC Cadet",
      date: "Jun 2021"
    }
  ],

  freelancing: {
    services: [
      {
        title: "Full Stack Web Development",
        description: "Complete web applications using modern technologies like React, Next.js, Node.js, and MongoDB",
        icon: "🌐",
        features: ["Responsive Design", "API Integration", "Database Design", "Performance Optimization"],
        pricing: "Starting from $500",
        color: "from-blue-500 to-cyan-500"
      },
      {
        title: "Mobile App Development",
        description: "Cross-platform mobile applications using Flutter with AI integration and modern UI/UX",
        icon: "📱",
        features: ["Cross-Platform", "AI Integration", "Real-time Features", "Cloud Backend"],
        pricing: "Starting from $800",
        color: "from-purple-500 to-pink-500"
      },
      {
        title: "Machine Learning Solutions",
        description: "Custom ML models for computer vision, data analysis, and predictive analytics",
        icon: "🤖",
        features: ["Computer Vision", "Data Analysis", "Predictive Models", "API Integration"],
        pricing: "Starting from $600",
        color: "from-green-500 to-emerald-500"
      },
      {
        title: "API Development & Integration",
        description: "RESTful APIs, microservices, and third-party integrations for scalable applications",
        icon: "🔗",
        features: ["RESTful APIs", "Microservices", "Third-party Integration", "Documentation"],
        pricing: "Starting from $300",
        color: "from-orange-500 to-red-500"
      }
    ],

    projects: [
      {
        title: "AI-Powered Photo Album App",
        client: "TT Infotech",
        date: "Jan 2025",
        description: "Full-stack Flutter application with AI-powered photo organization, secure cloud storage, and intelligent tagging system",
        image: "/images/freelance/photo-album.jpg",
        technologies: ["Flutter", "PHP", "MySQL", "AI/ML", "Cloud Storage"],
        category: "Mobile Development",
        outcome: "Delivered a complete photo management solution with 40% faster image processing",
        testimonial: "Exceptional work! The AI features exceeded our expectations.",
        liveUrl: "#",
        caseStudyUrl: "#",
        color: "from-blue-600 to-purple-600"
      },
      {
        title: "Banking System Integration",
        client: "Utkarsh Small Finance Bank",
        date: "Aug 2024 - Dec 2024",
        description: "Optimized IT infrastructure and implemented secure banking solutions with seamless system integration",
        image: "/images/freelance/banking-system.jpg",
        technologies: ["Java", "Spring Boot", "MySQL", "Apache Kafka", "Microservices"],
        category: "Enterprise Development",
        outcome: "Improved system performance by 35% and enhanced security protocols",
        testimonial: "Professional approach and excellent technical skills.",
        liveUrl: "#",
        caseStudyUrl: "#",
        color: "from-green-600 to-teal-600"
      },
      {
        title: "Real-Time License Plate Recognition",
        client: "Academic Project (Available for Commercial Use)",
        date: "Dec 2023",
        description: "Advanced computer vision system for real-time license plate detection and character recognition",
        image: "/images/freelance/license-plate.jpg",
        technologies: ["OpenCV", "Python", "Machine Learning", "TensorFlow", "Real-time Processing"],
        category: "Machine Learning",
        outcome: "Achieved 95% accuracy in real-time plate recognition",
        testimonial: "Innovative solution with impressive accuracy rates.",
        liveUrl: "#",
        caseStudyUrl: "#",
        color: "from-purple-600 to-pink-600"
      },
      {
        title: "E-commerce Platform",
        client: "Local Business",
        date: "Nov 2023",
        description: "Complete e-commerce solution with inventory management, payment integration, and admin dashboard",
        image: "/images/freelance/ecommerce.jpg",
        technologies: ["React.js", "Node.js", "MongoDB", "Stripe API", "AWS"],
        category: "Web Development",
        outcome: "Increased client's online sales by 60% within first month",
        testimonial: "Outstanding platform that transformed our business.",
        liveUrl: "#",
        caseStudyUrl: "#",
        color: "from-orange-600 to-red-600"
      }
    ],

    testimonials: [
      {
        name: "Rajesh Kumar",
        position: "CTO, TT Infotech",
        company: "TT Infotech",
        image: "/images/testimonials/rajesh.jpg",
        rating: 5,
        text: "Aniket delivered an exceptional Flutter app with AI integration. His technical expertise and attention to detail are remarkable. The project was completed on time and exceeded our expectations.",
        project: "AI-Powered Photo Album App",
        date: "Jan 2025"
      },
      {
        name: "Priya Sharma",
        position: "IT Manager",
        company: "Utkarsh Small Finance Bank",
        image: "/images/testimonials/priya.jpg",
        rating: 5,
        text: "Working with Aniket was a pleasure. He optimized our banking systems significantly and showed great professionalism throughout the project. Highly recommended for enterprise solutions.",
        project: "Banking System Integration",
        date: "Dec 2024"
      },
      {
        name: "Michael Chen",
        position: "Startup Founder",
        company: "TechStart Solutions",
        image: "/images/testimonials/michael.jpg",
        rating: 5,
        text: "Aniket built our entire web platform from scratch. His full-stack skills are impressive, and he delivered a scalable solution that handles our growing user base perfectly.",
        project: "E-commerce Platform",
        date: "Nov 2023"
      },
      {
        name: "Dr. Sarah Johnson",
        position: "Research Director",
        company: "AI Research Lab",
        image: "/images/testimonials/sarah.jpg",
        rating: 5,
        text: "The machine learning solution Aniket developed for us is outstanding. His understanding of computer vision and real-time processing is exceptional.",
        project: "License Plate Recognition",
        date: "Dec 2023"
      }
    ],

    stats: {
      projectsCompleted: 15,
      clientsSatisfied: 12,
      yearsExperience: 2,
      technologiesUsed: 20
    },

    process: [
      {
        step: 1,
        title: "Discovery & Planning",
        description: "Understanding your requirements, goals, and technical specifications",
        icon: "🔍",
        duration: "1-2 days"
      },
      {
        step: 2,
        title: "Design & Architecture",
        description: "Creating wireframes, system architecture, and technical documentation",
        icon: "📐",
        duration: "2-3 days"
      },
      {
        step: 3,
        title: "Development & Testing",
        description: "Agile development with regular updates and comprehensive testing",
        icon: "⚡",
        duration: "1-4 weeks"
      },
      {
        step: 4,
        title: "Deployment & Support",
        description: "Production deployment with ongoing support and maintenance",
        icon: "🚀",
        duration: "1-2 days + ongoing"
      }
    ]
  }
}
