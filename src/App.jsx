import React, { useState, useEffect, createContext, useContext, useRef } from 'react';
import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'framer-motion';
import { FaGithub, FaLinkedin, FaWhatsapp, FaArrowRight, FaReact, FaNodeJs, FaDatabase, FaPython, FaDocker } from "react-icons/fa6";
import { SiTailwindcss, SiJavascript, SiMongodb, SiSolidity, SiFramer, SiWebgl } from "react-icons/si";

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
    stack: ['Python', 'OpenCV', 'TensorFlow', 'Keras'],
    image: "src/assets/Project 1.png",
    live: '#', github: '#',
    caseStudy: { /* ... case study content ... */  }
  },
  {
    id: 'blockchain-voting-system',
    title: 'Blockchain Voting System',
    description: 'A secure and transparent e-voting platform leveraging blockchain technology.',
    stack: ['Solidity', 'React', 'Hardhat', 'Ethers.js'],
    image: "src/assets/Project 2.png",
    live: '#', github: '#',
    caseStudy: { /* ... case study content ... */ }
  },
  {
    id: 'project-submission-platform',
    title: 'Project Submission Platform',
    description: 'A web app for students and teachers to manage projects.',
    stack: ['React', 'Node.js', 'MongoDB', 'Express'],
    image: "src/assets/Project 3.png",
    live: '#', github: '#',
    caseStudy: { /* ... case study content ... */ }
  },
  {
    id: 'phishing-protection-extension',
    title: 'Phishing Protection Extension',
    description: 'A browser extension that blocks phishing websites.',
    stack: ['JavaScript', 'HTML/CSS', 'Machine Learning'],
    image: "src/assets/Project 4.png",
    live: '#', github: '#',
    caseStudy: { /* ... case study content ... */ }
  }
];

const skills = [
  { name: 'JavaScript (ES6+)', icon: <SiJavascript />, color: 'text-yellow-400' },
  { name: 'React', icon: <FaReact />, color: 'text-blue-400' },
  { name: 'Tailwind CSS', icon: <SiTailwindcss />, color: 'text-cyan-400' },
  { name: 'Framer Motion', icon: <SiFramer />, color: 'text-purple-400' },
  { name: 'Node.js', icon: <FaNodeJs />, color: 'text-green-400' },
  { name: 'MongoDB', icon: <SiMongodb />, color: 'text-green-500' },
  { name: 'Python', icon: <FaPython />, color: 'text-blue-500' },
  { name: 'Solidity', icon: <SiSolidity />, color: 'text-gray-400' },
  { name: 'Docker', icon: <FaDocker />, color: 'text-blue-600' },
  { name: 'WebGL/Three.js', icon: <SiWebgl />, color: 'text-orange-400' },
  { name: 'REST APIs', icon: <FaDatabase />, color: 'text-red-400' },
  { name: 'GitHub', icon: <FaGithub />, color: 'text-white' },
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
        description: "Completed higher secondary education in the Arts stream with subjects including Political Science, History, and English. Developed strong analytical and communication skills through essays, debates, and classroom discussions."
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

    const navItems = ['about', 'projects', 'contact'];

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
                    <motion.div initial={{opacity:0}} whileInView={{opacity:1}} transition={{duration:1, delay:0.5}} viewport={{once:true}}>
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
    const { scrollYProgress } = useScroll({ target: targetRef, offset: ["start end", "end start"] });
    const x = useTransform(scrollYProgress, [0.1, 0.9], ["0%", "-75%"]);

    return (
        <section ref={targetRef} id="projects" className="relative h-[300vh] bg-black">
            <div className="sticky top-0 h-screen flex items-center overflow-hidden">
                <motion.div style={{ x }} className="flex gap-8 px-8">
                     <div className="flex-shrink-0 w-screen flex flex-col justify-center items-start pl-[10vw]">
                         <h2 className="text-5xl md:text-7xl font-bold text-white">Selected Work</h2>
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
    // This is a placeholder. A full implementation would fetch project data based on ID.
    const { navigateTo } = useApp();
    return (
         <div className="min-h-screen flex flex-col justify-center items-center bg-black text-white">
            <h2 className="text-3xl mb-4">Project Detail Page</h2>
            <p className="text-slate-400 mb-8">This is where the detailed case study would go.</p>
            <button onClick={() => navigateTo('home')} className="text-cyan-400">&larr; Back Home</button>
        </div>
    )
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
