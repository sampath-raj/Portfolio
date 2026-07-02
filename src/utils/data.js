// ============================================================
//  Sampath Raj — Portfolio Data
//  Update this file with real links, contact info, etc.
// ============================================================

export const personalInfo = {
  name: "Sampath Raj",
  title: ["AI & Machine Learning Engineer", "Full Stack Developer", "Embedded Systems Enthusiast"],
  email: "sampathraj@example.com",
  phone: "+91 98765 43210",
  location: "Tamil Nadu, India",
  linkedin: "https://linkedin.com/in/sampathraj",
  github: "https://github.com/sampathraj",
  resume: "/resume.pdf",
  bio: "Passionate AI & ML Engineer with expertise in building intelligent systems and scalable full-stack applications. I bridge the gap between cutting-edge AI research and real-world deployment.",
};

export const stats = [
  { label: "Projects Built", value: 6, suffix: "+" },
  { label: "Technologies", value: 15, suffix: "+" },
  { label: "Certifications", value: 8, suffix: "+" },
  { label: "Hackathons", value: 5, suffix: "+" },
];

export const education = [
  {
    degree: "B.E Computer Science & Engineering (AI & ML)",
    institution: "Your College Name",
    year: "2021 – 2025",
    description: "Specializing in Artificial Intelligence and Machine Learning with hands-on projects in deep learning, computer vision, and full-stack development.",
    icon: "🎓",
  },
];

export const skills = {
  Languages: [
    { name: "Python", level: 92, color: "#3776AB" },
    { name: "Java", level: 78, color: "#007396" },
    { name: "C Programming", level: 75, color: "#A8B9CC" },
    { name: "JavaScript", level: 85, color: "#F7DF1E" },
  ],
  Frontend: [
    { name: "HTML", level: 90, color: "#E34F26" },
    { name: "CSS", level: 88, color: "#1572B6" },
    { name: "React", level: 83, color: "#61DAFB" },
  ],
  Backend: [
    { name: "Node.js", level: 78, color: "#339933" },
    { name: "MySQL", level: 80, color: "#4479A1" },
  ],
  "AI / ML": [
    { name: "Machine Learning", level: 88, color: "#FF6F61" },
    { name: "Deep Learning", level: 82, color: "#A855F7" },
    { name: "OpenCV", level: 80, color: "#5C3EE8" },
  ],
  Hardware: [
    { name: "Raspberry Pi", level: 75, color: "#C51A4A" },
    { name: "Arduino", level: 73, color: "#00979D" },
  ],
  DevOps: [
    { name: "Git", level: 85, color: "#F05032" },
    { name: "AWS", level: 65, color: "#FF9900" },
  ],
};

export const projects = [
  {
    id: 1,
    title: "Driver Drowsiness Detection System",
    description: "Real-time eye tracking system using OpenCV and deep learning to detect driver fatigue and trigger alerts, potentially saving lives on the road.",
    tech: ["Python", "OpenCV", "TensorFlow", "Raspberry Pi", "Arduino"],
    github: "https://github.com/sampathraj/drowsiness-detection",
    demo: "#",
    color: "#00d4ff",
    gradient: "from-cyan-500 to-blue-700",
    icon: "🚗",
    category: "AI / Computer Vision",
  },
  {
    id: 2,
    title: "AI Smart Garbage Segregation System",
    description: "Automated waste classification system using CNNs and robotic arms to segregate biodegradable and non-biodegradable waste with 94% accuracy.",
    tech: ["Python", "Deep Learning", "OpenCV", "Raspberry Pi", "IoT"],
    github: "https://github.com/sampathraj/smart-garbage",
    demo: "#",
    color: "#7b2fff",
    gradient: "from-purple-500 to-indigo-700",
    icon: "♻️",
    category: "AI / IoT",
  },
  {
    id: 3,
    title: "Car Rental Management System",
    description: "Full-stack web application with booking management, payment integration, and admin dashboard for efficient fleet management.",
    tech: ["React", "Node.js", "MySQL", "JavaScript", "CSS"],
    github: "https://github.com/sampathraj/car-rental",
    demo: "#",
    color: "#ff6b6b",
    gradient: "from-red-500 to-orange-600",
    icon: "🚙",
    category: "Full Stack",
  },
  {
    id: 4,
    title: "Ticket Sharing Platform",
    description: "Peer-to-peer event ticket marketplace with real-time availability, secure transactions, and QR-based ticket verification.",
    tech: ["React", "Node.js", "MySQL", "JavaScript"],
    github: "https://github.com/sampathraj/ticket-sharing",
    demo: "#",
    color: "#ffd93d",
    gradient: "from-yellow-400 to-orange-500",
    icon: "🎫",
    category: "Full Stack",
  },
  {
    id: 5,
    title: "AI College Monitoring System",
    description: "Smart campus surveillance using facial recognition and behavior analysis for automated attendance tracking and security monitoring.",
    tech: ["Python", "OpenCV", "Deep Learning", "MySQL", "React"],
    github: "https://github.com/sampathraj/college-monitoring",
    demo: "#",
    color: "#00ff88",
    gradient: "from-green-400 to-teal-600",
    icon: "🏫",
    category: "AI / Full Stack",
  },
  {
    id: 6,
    title: "PIETECH Events Platform",
    description: "Dynamic event management platform for college technical festivals with registration, scheduling, and participant management features.",
    tech: ["React", "Node.js", "MySQL", "JavaScript", "CSS"],
    github: "https://github.com/sampathraj/pietech-events",
    demo: "#",
    color: "#ff00c8",
    gradient: "from-pink-500 to-purple-700",
    icon: "⚡",
    category: "Full Stack",
  },
];

export const experience = [
  {
    type: "Internship",
    title: "AI/ML Intern",
    organization: "Tech Company Name",
    duration: "Jun 2024 – Aug 2024",
    description: "Developed machine learning models for predictive analytics. Worked on data preprocessing pipelines and model deployment using Flask APIs.",
    icon: "💼",
    color: "#00d4ff",
  },
  {
    type: "Certification",
    title: "Machine Learning Specialization",
    organization: "Coursera / DeepLearning.AI",
    duration: "2024",
    description: "Completed Andrew Ng's Machine Learning Specialization covering supervised learning, unsupervised learning, and recommender systems.",
    icon: "🏅",
    color: "#7b2fff",
  },
  {
    type: "Certification",
    title: "AWS Cloud Practitioner",
    organization: "Amazon Web Services",
    duration: "2024",
    description: "Foundational AWS certification covering cloud concepts, security, and core AWS services.",
    icon: "☁️",
    color: "#FF9900",
  },
  {
    type: "Certification",
    title: "Python for Data Science",
    organization: "IBM / Coursera",
    duration: "2023",
    description: "Comprehensive Python programming for data science including NumPy, Pandas, Matplotlib, and Scikit-learn.",
    icon: "🐍",
    color: "#3776AB",
  },
  {
    type: "Workshop",
    title: "Deep Learning & Neural Networks",
    organization: "IIT Workshop Series",
    duration: "2024",
    description: "Intensive workshop on deep learning architectures — CNNs, RNNs, Transformers, and their real-world applications.",
    icon: "🧠",
    color: "#ff6b6b",
  },
  {
    type: "Workshop",
    title: "IoT & Embedded Systems",
    organization: "College Technical Department",
    duration: "2023",
    description: "Hands-on workshop covering Arduino, Raspberry Pi programming, sensor integration, and IoT protocols (MQTT, HTTP).",
    icon: "🔧",
    color: "#00ff88",
  },
  {
    type: "Hackathon",
    title: "National Level Hackathon — Runner Up",
    organization: "Smart India Hackathon",
    duration: "2024",
    description: "Built an AI-powered traffic management system in 36 hours. Secured runner-up position among 500+ teams nationwide.",
    icon: "🏆",
    color: "#ffd93d",
  },
  {
    type: "Hackathon",
    title: "College Hackathon — 1st Place",
    organization: "PIETECH Hackathon",
    duration: "2023",
    description: "Won first place developing a real-time sign language translation app using computer vision and deep learning.",
    icon: "🥇",
    color: "#FFD700",
  },
];

export const achievements = [
  {
    title: "Smart India Hackathon Runner-Up",
    description: "Secured 2nd place among 500+ teams nationwide",
    icon: "🥈",
    color: "#C0C0C0",
    year: "2024",
  },
  {
    title: "College Hackathon Champion",
    description: "1st place in college-level technical hackathon",
    icon: "🥇",
    color: "#FFD700",
    year: "2023",
  },
  {
    title: "Best Project Award",
    description: "Best final year project — Driver Drowsiness Detection",
    icon: "🏆",
    color: "#CD7F32",
    year: "2025",
  },
  {
    title: "AWS Certified",
    description: "AWS Cloud Practitioner Certification",
    icon: "☁️",
    color: "#FF9900",
    year: "2024",
  },
  {
    title: "Machine Learning Specialization",
    description: "DeepLearning.AI — Top Performer",
    icon: "🧠",
    color: "#7b2fff",
    year: "2024",
  },
  {
    title: "Open Source Contributor",
    description: "Active contributor to ML open source projects",
    icon: "⭐",
    color: "#00d4ff",
    year: "2024",
  },
];

export const chatbotResponses = {
  greeting: ["Hi! I'm Sampath's AI assistant 🤖", "Hello! Ask me anything about Sampath Raj!", "Hey there! I can tell you all about Sampath's skills and projects!"],
  skills: "Sampath is proficient in Python, Java, JavaScript, React, Node.js, Machine Learning, Deep Learning, OpenCV, and more! He's especially strong in AI/ML and full-stack development.",
  projects: "Sampath has built 6 major projects including a Driver Drowsiness Detection System, AI Smart Garbage Segregation, Car Rental Management System, and more!",
  contact: "You can reach Sampath at sampathraj@example.com or connect on LinkedIn at linkedin.com/in/sampathraj",
  education: "Sampath is pursuing B.E in Computer Science & Engineering with specialization in AI & ML.",
  experience: "Sampath has done internships, earned multiple certifications (AWS, ML, Python), participated in hackathons, and won awards!",
  default: "That's a great question! Feel free to explore the portfolio or contact Sampath directly for more information.",
};
