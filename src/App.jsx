import React, { useState, useEffect, createContext, useContext, useRef } from 'react';
import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'framer-motion';
import { FaGithub, FaLinkedin, FaWhatsapp, FaArrowRight, FaReact, FaNodeJs, FaDatabase, FaPython, FaDocker, FaHtml5, FaCss3Alt, FaJava, FaCode, FaWordpress, FaPhp } from "react-icons/fa6";
import { SiTailwindcss, SiJavascript, SiMongodb, SiSolidity, SiFramer, SiWebgl, SiMysql, SiNetlify } from "react-icons/si";

// --- ASSETS & CONFIG ---
const ResumePDF = 'src/assets/Dharam Vir.pdf'; // Replace with your resume path
const ProfilePhoto = 'src/assets/Profile.jpg'; // Replace with your photo URL

// --- USER DATA ---
const user = {
    name: 'Dharam Vir',
    role: 'Full Stack Developer',
    tagline: "I craft elegant and robust digital solutions, blending creativity with cutting-edge technology.",
    about: {
        intro: "As a Full Stack Developer with a keen eye for design and a passion for problem-solving, I thrive on turning complex ideas into beautiful, functional, and user-centric applications. My journey in technology is driven by a relentless curiosity and a desire to build things that make a difference.",
        bio: "Based in Bangalore, I've honed my skills across the entire development stack, from crafting responsive front-ends with React and Framer Motion to building scalable back-end systems with Node.js and MongoDB. I'm not just a coder; I'm a product enthusiast who is committed to understanding user needs and delivering exceptional digital experiences. When I'm not at my keyboard, I'm exploring the latest in WebGL, contributing to open-source, or searching for the perfect espresso."
    },
    contact: {
        email: 'ss143mk@gmail.com',
        linkedin: 'https://www.linkedin.com/in/dharam-vir-92048a252/',
        github: 'https://github.com/Dharam2003',
        whatsapp: 'https://wa.me/917439219425', // Replace with your number
    }
};

const projects = [
  {
    id: 'sign-language-recognition',
    title: 'Sign-Language Recognition',
    description: 'A real-time sign language to text translator empowering communication.',
    stack: ['Python', 'OpenCV', 'MediaPipe', 'Flask', 'Pickle', 'NumPy'],
    image: "src/assets/Project 1.png",
    live: 'https://github.com/Dharam2003/sign-language', 
    github: 'https://github.com/Dharam2003/sign-language',
    caseStudy: {
    problem: "Communication barriers for the deaf and hard of hearing community often result in social exclusion and limited access to essential services due to a lack of widespread sign language understanding.",
    solution: "Developed a real-time sign language recognition system that captures hand gestures through a webcam and translates them into readable text, enabling smoother communication between sign language users and non-signers.",
    process: "Built using Python, OpenCV, and MediaPipe for hand landmark detection, combined with a pre-trained machine learning model (loaded via Pickle) to classify signs. Integrated this into a Flask web application that streams live predictions and allows users to store and review recognized signs.",
    learnings: "Deepened understanding of computer vision, real-time video processing, and gesture-based recognition. Enhanced skills in model integration, MediaPipe landmark extraction, and building inclusive technology for accessibility.",
    }
  },
  {
    id: 'blockchain-voting-system',
    title: 'Blockchain Voting System',
    description: 'A secure and transparent e-voting platform leveraging blockchain technology.',
    stack: ['HTML', 'CSS', 'JavaScript', 'Netlify'],
    image: "src/assets/Project 2.png",
    live: 'https://votingbyd.netlify.app/', 
    github: 'https://github.com/Dharam2003',
    caseStudy: {
    problem: "Traditional voting systems often face challenges such as lack of accessibility, risk of tampering, and inefficiencies in real-time result tracking.",
    solution: "Built a secure, web-based voting platform that allows users to register, log in, and cast their vote digitally, ensuring accessibility and transparency in the voting process.",
    process: "Designed and developed a front-end interface using HTML, CSS, and JavaScript, hosted on Netlify. Implemented user login, admin panel, and voting functionality with client-side routing and session simulation. Emphasized UI clarity to ensure ease of use for both voters and administrators.",
    learnings: "Learned how to manage client-side routing and form validation, simulate session handling in static environments, and create a responsive, single-page application. Gained experience in structuring multi-role systems (user/admin) and deploying front-end apps to a live server.",
}

  },
  {
    id: 'project-submission-platform',
    title: 'Project Submission Platform',
    description: 'A web app for students and teachers to manage projects.',
    stack: ['HTML', 'CSS', 'JavaScript', 'Netlify'],
    image: "src/assets/Project 3.png",
    live: 'https://submitmate.netlify.app/', 
    github: 'https://github.com/Dharam2003',
    caseStudy: {
    problem: "Traditional websites often lack backend support for handling form submissions, making it challenging for non-developers to collect user input without extra infrastructure.",
    solution: "Created SubmitMate, a static, yet dynamic, web app that enables seamless form submissions using Netlify Forms—no custom backend required.",
    process: "Designed an intuitive single-page form interface using HTML, CSS, and JavaScript, hosted on Netlify. Leveraged Netlify’s automatic form detection and serverless form handling to receive submissions, view them in the Netlify Admin UI, and configure email or webhook notifications :contentReference[oaicite:0]{index=0}. Utilized simple client-side validation and user feedback mechanisms for submission success.",
    learnings: "Acquired hands-on experience with the JAMstack model and serverless workflows. Learned to integrate static site deployments with dynamic functionality via Netlify Forms, set up notification workflows, manage spam protection, and improve UX with validation and feedback—all without building a backend.",
}

  },
  {
    id: 'phishing-protection-extension',
    title: 'Phishing Protection Extension',
    description: 'A browser extension that blocks phishing websites.',
    stack: ['Python', 'Flask', 'Flask-CORS', 'REST API', 'JSON'],
    image: "src/assets/Project 4.png",
    live: 'https://your-live-demo-link.com', 
    github: 'https://github.com/Dharam2003/phishing-protection-extension',
    caseStudy: {
    problem: "Users browsing the web, especially via extensions or custom tools, often encounter unknown links that may lead to unsafe or malicious domains. Without a backend to verify them, extensions lack the intelligence to assess risk.",
    solution: "(UNDER DEVELOPMENT) Built a lightweight Flask API that checks whether a given URL is from a predefined list of trusted domains and returns a simple safety prediction.",
    process: "Developed a RESTful API using Flask with CORS enabled to allow interaction with browser extensions or frontend apps. The `/predict` endpoint accepts a URL via POST request and checks it against a list of known safe domains. Based on the result, it returns a JSON response indicating if the URL is considered safe.",
    learnings: "Learned how to build secure and minimal Flask APIs, handle JSON POST requests, and implement CORS for browser-extension compatibility. Also gained experience in designing client-server communication for security-based tools.",
}

  }
];

const skills = [
    { name: 'HTML', icon: <FaHtml5 />, color: 'text-orange-500' },
    { name: 'CSS', icon: <FaCss3Alt />, color: 'text-blue-500' },
    { name: 'React', icon: <FaReact />, color: 'text-blue-400' },
    { name: 'Python', icon: <FaPython />, color: 'text-yellow-400' },
    { name: 'Java', icon: <FaJava />, color: 'text-red-500' },
    { name: 'C', icon: <FaCode />, color: 'text-gray-400' },
    { name: 'MySQL', icon: <SiMysql />, color: 'text-blue-600' },
    { name: 'MongoDB', icon: <SiMongodb />, color: 'text-green-500' },
    { name: 'Github', icon: <FaGithub />, color: 'text-white' },
    { name: 'Wordpress', icon: <FaWordpress />, color: 'text-blue-700' },
    { name: 'Netlify', icon: <SiNetlify />, color: 'text-teal-500' },
    { name: 'PHP', icon: <FaPhp />, color: 'text-indigo-500' },
];

const experience = [
    {
        year: "2022 - 2025",
        role: "Bachelor of Computer Applications",
        company: "Presidency University, Bangalore",
        description: "Graduated with a focus on software development, data structures, and algorithms. Actively participated in coding competitions and developed several personal projects."
    },
    {
        year: "2020 - 2022",
        role: "Class XII",
        company: "PM SHRI Kendriya Vidyalaya ",
        description: "Completed higher secondary education in the Arts stream with subjects including geography, History, and English. Developed strong analytical and communication skills through essays, debates, and classroom discussions."
    },
    {
        year: "2010 - 2020",
        role: "Class X",
        company: "PM SHRI Kendriya Vidyalaya",
        description: "Completed secondary education with academic excellence across core subjects. Built foundational knowledge in science and mathematics while participating in various extracurricular and co-curricular activities."
    }
];

// --- CONTEXT & HOOKS ---
const AppContext = createContext();

const AppProvider = ({ children }) => {
    const [page, setPage] = useState('home');
    const [cursorVariant, setCursorVariant] = useState("default");

    const navigateTo = (newPage) => {
        window.location.hash = newPage;
        setPage(newPage);
        window.scrollTo(0, 0); // Scroll to top on page change
    };

    useEffect(() => {
        const handleHashChange = () => {
            const hash = window.location.hash.replace('#', '');
            setPage(hash || 'home');
        };
        window.addEventListener('hashchange', handleHashChange);
        handleHashChange();
        return () => window.removeEventListener('hashchange', handleHashChange);
    }, []);

    const cursorActions = {
        textEnter: () => setCursorVariant("text"),
        textLeave: () => setCursorVariant("default"),
        linkEnter: () => setCursorVariant("link"),
        linkLeave: () => setCursorVariant("default"),
    };

    return (
        <AppContext.Provider value={{ page, navigateTo, cursorVariant, ...cursorActions }}>
            {children}
        </AppContext.Provider>
    );
};

const useApp = () => useContext(AppContext);

// --- MAIN COMPONENTS ---

const AnimatedText = ({ text, el: Wrapper = "span", className, stagger = 0.02, once = true }) => {
    const { textEnter, textLeave } = useApp();
    const ref = useRef(null);
    const isInView = useInView(ref, { amount: 0.5, once });

    const variants = {
        hidden: { y: "110%" },
        visible: (i) => ({
            y: 0,
            transition: {
                delay: i * stagger,
                duration: 0.6,
                ease: [0.22, 1, 0.36, 1] // Quintic Out
            },
        }),
    };

    return (
        <Wrapper ref={ref} className={className} onMouseEnter={textEnter} onMouseLeave={textLeave}>
            {text.split(" ").map((word, wordIndex) => (
                <span key={wordIndex} className="inline-block overflow-hidden pb-1">
                    <motion.span
                        className="inline-block"
                        custom={wordIndex}
                        initial="hidden"
                        animate={isInView ? "visible" : "hidden"}
                        variants={variants}
                    >
                        {word}&nbsp;
                    </motion.span>
                </span>
            ))}
        </Wrapper>
    );
};


const CustomCursor = () => {
    const { cursorVariant } = useApp();
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const mouseMove = (e) => setMousePosition({ x: e.clientX, y: e.clientY });
        window.addEventListener("mousemove", mouseMove);
        return () => window.removeEventListener("mousemove", mouseMove);
    }, []);

    const variants = {
        default: { x: mousePosition.x - 8, y: mousePosition.y - 8, height: 16, width: 16, backgroundColor: "#e2e8f0", mixBlendMode: 'difference' },
        text: { x: mousePosition.x - 30, y: mousePosition.y - 30, height: 60, width: 60, backgroundColor: "#e2e8f0", mixBlendMode: 'difference' },
        link: { x: mousePosition.x - 15, y: mousePosition.y - 15, height: 30, width: 30, backgroundColor: "#fff", mixBlendMode: 'difference', border: '2px solid #0f172a' }
    };

    return <motion.div className="fixed top-0 left-0 rounded-full z-[9999] pointer-events-none hidden md:block" variants={variants} animate={cursorVariant} transition={{ type: "spring", stiffness: 600, damping: 30 }} />;
};

const Header = () => {
    const { navigateTo, page, linkEnter, linkLeave } = useApp();
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navItems = ['about', 'projects', 'skills', 'contact'];

    return (
        <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-black/50 backdrop-blur-sm' : 'bg-transparent'}`}>
            <nav className="container mx-auto px-6 py-4 flex justify-between items-center text-slate-100">
                <a href="#home" onClick={() => navigateTo('home')} onMouseEnter={linkEnter} onMouseLeave={linkLeave} className="font-black text-2xl tracking-tighter hover:text-cyan-400 transition-colors">DR</a>
                <div className="hidden md:flex items-center space-x-8">
                    {navItems.map(item => (
                        <a key={item} href={`#${item}`} onClick={() => navigateTo(item)} onMouseEnter={linkEnter} onMouseLeave={linkLeave} className={`capitalize text-sm font-medium transition-colors relative group ${page.startsWith(item) ? 'text-cyan-400' : 'text-slate-300 hover:text-white'}`}>
                            {item}
                            <span className={`absolute -bottom-1 left-0 w-full h-0.5 bg-cyan-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ${page.startsWith(item) ? 'scale-x-100' : ''}`}></span>
                        </a>
                    ))}
                </div>
                <a href={ResumePDF} download onMouseEnter={linkEnter} onMouseLeave={linkLeave} className="px-4 py-2 text-sm border border-slate-400 rounded-full text-slate-300 hover:bg-white hover:text-black transition-colors">
                    Resume
                </a>
            </nav>
        </header>
    );
};


const Footer = () => {
    const { linkEnter, linkLeave } = useApp();
    return (
        <footer className="py-10 bg-black text-slate-500">
            <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
                <p>&copy; {new Date().getFullYear()} {user.name}. Crafted with React & ❤️</p>
                <div className="flex justify-center space-x-6">
                    <a href={user.contact.github} onMouseEnter={linkEnter} onMouseLeave={linkLeave} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors"><FaGithub size={24} /></a>
                    <a href={user.contact.linkedin} onMouseEnter={linkEnter} onMouseLeave={linkLeave} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors"><FaLinkedin size={24} /></a>
                    <a href={user.contact.whatsapp} onMouseEnter={linkEnter} onMouseLeave={linkLeave} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors"><FaWhatsapp size={24} /></a>
                </div>
            </div>
        </footer>
    );
};

// --- PAGES & SECTIONS ---

const HomePage = () => {
    return (
        <div className="bg-black">
            <HeroSection />
            <AboutSection />
            <HorizontalProjectsSection />
            <SkillsSection />
            <ExperienceSection />
            <ContactSection />
        </div>
    );
};

const HeroSection = () => {
    const title = user.name.split(' ');
    const subtitle = user.role.split(' ');
    
    return (
        <section id="home" className="h-screen flex flex-col justify-center items-center text-white bg-black p-6">
            <div className="text-center">
                <h1 className="text-5xl md:text-8xl lg:text-9xl font-black uppercase">
                    {title.map((word, i) => (
                        <span key={i} className="inline-block overflow-hidden">
                            <motion.span className="inline-block" initial={{ y: '110%' }} animate={{ y: 0 }} transition={{ duration: 1, delay: i * 0.2, ease: [0.22, 1, 0.36, 1] }}>{word}</motion.span>
                        </span>
                    ))}
                </h1>
                <h2 className="text-xl md:text-3xl font-light text-slate-300 mt-4">
                     {subtitle.map((word, i) => (
                        <span key={i} className="inline-block overflow-hidden">
                            <motion.span className="inline-block" initial={{ y: '110%' }} animate={{ y: 0 }} transition={{ duration: 1, delay: 0.5 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}>{word}&nbsp;</motion.span>
                        </span>
                    ))}
                </h2>
            </div>
        </section>
    );
};

const AboutSection = () => {
    return (
        <section id="about" className="py-24 sm:py-32 bg-black text-white">
            <div className="container mx-auto px-6">
                 <AnimatedText text={user.about.intro} el="h2" className="text-2xl md:text-4xl font-medium max-w-4xl mb-12" />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-start">
                    <motion.div 
                        initial={{opacity:0}} 
                        whileInView={{opacity:1}} 
                        transition={{duration:1, delay:0.5}} 
                        viewport={{once:true}}
                        className="ml-4" // Added margin to move the image
                    >
                        <img src={ProfilePhoto} alt={user.name} className="w-48 h-48 rounded-full object-cover"/>
                    </motion.div>
                    <div className="md:col-span-2">
                        <AnimatedText text={user.about.bio} el="p" className="text-lg text-slate-300 leading-relaxed" stagger={0.01}/>
                    </div>
                </div>
            </div>
        </section>
    );
};

const HorizontalProjectsSection = () => {
    const { navigateTo, linkEnter, linkLeave } = useApp();
    const targetRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: targetRef,
        offset: ["start start", "end end"],
    });

    const x = useTransform(scrollYProgress, [0, 1], ["0%", "-80%"]);

    return (
        <section ref={targetRef} id="projects" className="relative h-[500vh] bg-black">
            <div className="sticky top-0 h-screen flex items-center overflow-hidden">
                <motion.div style={{ x }} className="flex gap-8 items-center">
                    <div className="flex-shrink-0 w-screen flex flex-col justify-center items-start pl-[10vw]">
                        <h2 className="text-5xl md:text-7xl font-bold text-white">
                            Selected Work
                        </h2>
                    </div>
                    {projects.map((project) => (
                        <div key={project.id} className="group relative w-[80vw] h-[70vh] md:w-[60vw] flex-shrink-0 rounded-2xl overflow-hidden" onMouseEnter={linkEnter} onMouseLeave={linkLeave} onClick={() => navigateTo(`project/${project.id}`)}>
                            <img src={project.image} alt={project.title} className="absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-in-out group-hover:scale-110" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                            <div className="absolute bottom-0 left-0 p-8 text-white">
                                <h3 className="text-3xl md:text-4xl font-bold">{project.title}</h3>
                                <p className="text-slate-300 mt-2">{project.description}</p>
                                <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center gap-2 text-cyan-400 font-bold">
                                    View Case Study <FaArrowRight/>
                                </div>
                            </div>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

const SkillsSection = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.2 });

    return (
        <section id="skills" className="py-24 sm:py-32 bg-black text-white" ref={ref}>
            <div className="container mx-auto px-6">
                <AnimatedText text="My Skills" el="h2" className="text-4xl md:text-5xl font-bold mb-16 text-center"/>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8 max-w-6xl mx-auto">
                    {skills.map((skill, i) => (
                        <motion.div
                            key={i}
                            className="flex flex-col items-center justify-center gap-4 p-4 border border-slate-800 rounded-lg"
                            initial="hidden"
                            animate={isInView ? "visible" : "hidden"}
                            custom={i}
                            variants={{
                                hidden: { opacity: 0, y: 50 },
                                visible: (i) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1 } })
                            }}
                        >
                            <div className={`text-5xl ${skill.color}`}>
                                {skill.icon}
                            </div>
                            <p className="font-semibold text-center">{skill.name}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

const ExperienceSection = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.2 });

    return (
        <section id="experience" className="py-24 sm:py-32 bg-black text-white" ref={ref}>
            <div className="container mx-auto px-6">
                <AnimatedText text="Experience & Education" el="h2" className="text-4xl md:text-5xl font-bold mb-16 text-center"/>
                <div className="max-w-3xl mx-auto">
                    {experience.map((item, i) => (
                        <motion.div
                            key={i}
                            className="flex gap-6 md:gap-12 border-l border-slate-700 pl-6 md:pl-12 pb-16 relative"
                            initial="hidden"
                            animate={isInView ? "visible" : "hidden"}
                            custom={i}
                            variants={{
                                hidden: { opacity: 0, y: 50 },
                                visible: (i) => ({ opacity: 1, y: 0, transition: { delay: i * 0.2 } })
                            }}
                        >
                           <div className="absolute -left-2 top-0 w-4 h-4 rounded-full bg-cyan-400 border-4 border-black"></div>
                           <div className="w-1/4 pt-1">
                               <p className="text-sm text-slate-400">{item.year}</p>
                           </div>
                           <div className="w-3/4">
                               <h3 className="font-bold text-xl text-slate-100">{item.role}</h3>
                               <p className="text-cyan-400 font-medium mb-3">{item.company}</p>
                               <p className="text-slate-300">{item.description}</p>
                           </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}

const ContactSection = () => {
    const { textEnter, textLeave } = useApp();
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.5 });
    
    return (
        <section id="contact" ref={ref} className="min-h-screen py-24 sm:py-32 bg-black text-white flex flex-col justify-center">
            <div className="container mx-auto px-6 text-center">
                <p className="text-lg text-cyan-400 mb-4">Open to opportunities</p>
                <a href={`mailto:${user.contact.email}`} onMouseEnter={textEnter} onMouseLeave={textLeave}>
                  <h2 className="text-5xl md:text-8xl font-black uppercase text-slate-200 hover:text-white transition-colors duration-500">
                    Hire Me
                  </h2>
                </a>
            </div>
        </section>
    );
};

const ProjectDetailPage = () => {
    const { navigateTo } = useApp();
    const { page } = useApp();
    const projectId = page.split('/')[1];
    const project = projects.find(p => p.id === projectId);

    if (!project) {
        return (
            <div className="min-h-screen flex flex-col justify-center items-center bg-black text-white">
                <h2 className="text-3xl mb-4">Project not found</h2>
                <button onClick={() => navigateTo('home')} className="text-cyan-400">&larr; Back Home</button>
            </div>
        );
    }

    return (
        <motion.div 
            className="min-h-screen bg-black text-white py-24 px-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
        >
            <div className="container mx-auto max-w-4xl">
                <motion.button 
                    onClick={() => navigateTo('projects')} 
                    className="text-cyan-400 mb-8 flex items-center gap-2"
                    whileHover={{ gap: "1rem" }}
                >
                    <FaArrowRight className="transform rotate-180" />
                    Back to Projects
                </motion.button>
                <motion.h1 
                    className="text-4xl md:text-6xl font-bold mb-4"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                >
                    {project.title}
                </motion.h1>
                <motion.p 
                    className="text-lg text-slate-400 mb-8"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                >
                    {project.description}
                </motion.p>
                <motion.img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-auto rounded-lg mb-12 shadow-lg"
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                />
                
                <div className="bg-light-navy p-8 rounded-lg mb-12">
                    <h2 className="text-3xl font-bold mb-6 text-white">Case Study</h2>
                    <div className="space-y-6">
                        <div>
                            <h3 className="text-xl font-semibold text-cyan-400 mb-2">Problem</h3>
                            <p className="text-slate-300">{project.caseStudy.problem}</p>
                        </div>
                        <div>
                            <h3 className="text-xl font-semibold text-cyan-400 mb-2">Solution</h3>
                            <p className="text-slate-300">{project.caseStudy.solution}</p>
                        </div>
                        <div>
                            <h3 className="text-xl font-semibold text-cyan-400 mb-2">Process</h3>
                            <p className="text-slate-300">{project.caseStudy.process}</p>
                        </div>
                        <div>
                            <h3 className="text-xl font-semibold text-cyan-400 mb-2">Learnings</h3>
                            <p className="text-slate-300">{project.caseStudy.learnings}</p>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row gap-8">
                    <div className="flex-1">
                        <h2 className="text-2xl font-bold mb-4 text-white">Tech Stack</h2>
                        <div className="flex flex-wrap gap-2">
                            {project.stack.map(tech => (
                                <span key={tech} className="bg-lightest-navy text-slate-300 px-3 py-1 rounded-full text-sm">
                                    {tech}
                                </span>
                            ))}
                        </div>
                    </div>
                    <div className="flex-1 flex md:justify-end items-center gap-4">
                        <a href={project.live} target="_blank" rel="noopener noreferrer" className="bg-cyan-400 text-black font-bold py-3 px-6 rounded-full hover:bg-cyan-300 transition-colors">
                            Live Demo
                        </a>
                        <a href={project.github} target="_blank" rel="noopener noreferrer" className="border border-slate-400 text-slate-300 font-bold py-3 px-6 rounded-full hover:bg-slate-700 transition-colors">
                            Repository
                        </a>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};


// --- APP ROUTER & LAYOUT ---
function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000); 
    return () => clearTimeout(timer);
  }, []);

  const { page } = useApp();

  const renderPage = () => {
      if (page.startsWith('project/')) {
        return <ProjectDetailPage />;
      }
      switch (page) {
          case 'home': return <HomePage />;
          case 'about': return <AboutSection />;
          case 'projects': return <HorizontalProjectsSection />;
          case 'skills': return <SkillsSection />;
          case 'contact': return <ContactSection />;
          default: return <HomePage />;
      }
  }

  return (
    <>
      <AnimatePresence>
        {loading && (
          <motion.div
            key="loader"
            className="fixed inset-0 z-[99999] flex justify-center items-center bg-black"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="font-black text-5xl text-white"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: [0, 1, 1, 0], scale: 1 }}
              transition={{ duration: 1.8, times: [0, 0.2, 0.8, 1] }}
            >
              DV
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {!loading && (
        <div className="bg-black font-sans">
            <CustomCursor />
            <Header />
            <main>
              {renderPage()}
            </main>
            <Footer />
        </div>
      )}
    </>
  );
}

// Wrap the App with the provider
export default function ProvidedApp() {
    return (
        <AppProvider>
            <App />
        </AppProvider>
    )
};