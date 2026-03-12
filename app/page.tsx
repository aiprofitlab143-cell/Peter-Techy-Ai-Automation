"use client";

import { useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Sphere, MeshDistortMaterial } from "@react-three/drei";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ChevronRight,
  Zap,
  Bot,
  Workflow,
  Mail,
  MessageSquare,
  Database,
  BarChart3,
  ArrowRight,
  Menu,
  X,
  Linkedin,
  Twitter,
  Github,
  Send,
  CheckCircle,
  Star,
  Play,
} from "lucide-react";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// 3D Sphere Component
function AnimatedSphere() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.2;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3;
    }
  });

  return (
    <Sphere ref={meshRef} args={[1, 64, 64]} scale={2.2}>
      <MeshDistortMaterial
        color="#6366F1"
        attach="material"
        distort={0.4}
        speed={2}
        roughness={0.2}
        metalness={0.8}
      />
    </Sphere>
  );
}

// Navbar Component
function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "Services", href: "#services" },
    { name: "Projects", href: "#projects" },
    { name: "Case Studies", href: "#case-studies" },
    { name: "About", href: "#about" },
    { name: "Blog", href: "#blog" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "glass py-3" : "py-5"
      }`}
    >
      <div className="container-custom">
        <div className="flex items-center justify-between">
          <a href="#home" className="text-2xl font-bold font-heading">
            <span className="gradient-text">PETER TECHY</span>
          </a>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-gray-300 hover:text-primary transition-colors text-sm font-medium"
              >
                {link.name}
              </a>
            ))}
          </div>

          <div className="hidden md:block">
            <a
              href="#contact"
              className="btn-primary text-sm flex items-center gap-2"
            >
              Book Automation Call
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden mt-4 glass rounded-xl p-4"
          >
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="block py-2 text-gray-300 hover:text-primary transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </a>
            ))}
            <a
              href="#contact"
              className="btn-primary text-sm mt-4 inline-block"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Book Automation Call
            </a>
          </motion.div>
        )}
      </div>
    </nav>
  );
}

// Hero Section
function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".hero-title", {
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
      });
      gsap.from(".hero-subtitle", {
        y: 30,
        opacity: 0,
        duration: 1,
        delay: 0.3,
        ease: "power3.out",
      });
      gsap.from(".hero-buttons", {
        y: 30,
        opacity: 0,
        duration: 1,
        delay: 0.5,
        ease: "power3.out",
      });
      gsap.from(".hero-3d", {
        scale: 0.8,
        opacity: 0,
        duration: 1.2,
        delay: 0.2,
        ease: "power3.out",
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="home"
      ref={heroRef}
      className="min-h-screen flex items-center pt-20 section animated-bg grid-pattern"
    >
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="hero-content">
            <h1 className="hero-title text-4xl md:text-5xl lg:text-6xl font-bold font-heading leading-tight mb-6">
              AI Automation That{" "}
              <span className="gradient-text">Scales Your Business</span> While
              You Sleep
            </h1>
            <p className="hero-subtitle text-gray-400 text-lg md:text-xl mb-8 max-w-xl">
              Custom AI workflows, lead generation systems, and intelligent
              automations built for modern businesses.
            </p>
            <div className="hero-buttons flex flex-col sm:flex-row gap-4">
              <a href="#projects" className="btn-primary flex items-center justify-center gap-2">
                <Play className="w-4 h-4" />
                View Projects
              </a>
              <a href="#contact" className="btn-secondary flex items-center justify-center gap-2">
                Book Strategy Call
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div className="hero-3d relative">
            <div className="absolute inset-0 bg-primary/20 blur-[100px] rounded-full" />
            <Canvas camera={{ position: [0, 0, 5] }}>
              <AnimatedSphere />
              <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
            </Canvas>
          </div>
        </div>
      </div>
    </section>
  );
}

// Automation Card Component
interface AutomationCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay?: number;
}

function AutomationCard({ icon, title, description, delay = 0 }: AutomationCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true }}
      className="card group"
    >
      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
        <div className="text-primary">{icon}</div>
      </div>
      <h3 className="text-xl font-semibold font-heading mb-3">{title}</h3>
      <p className="text-gray-400 text-sm">{description}</p>
    </motion.div>
  );
}

// Automation Showcase Section
function AutomationShowcase() {
  const automations = [
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Lead Generation Bots",
      description:
        "Automated systems that capture, qualify, and nurture leads 24/7 across multiple platforms.",
    },
    {
      icon: <Bot className="w-6 h-6" />,
      title: "AI Chatbots",
      description:
        "Intelligent conversational agents powered by GPT models for customer support and sales.",
    },
    {
      icon: <Database className="w-6 h-6" />,
      title: "CRM Automations",
      description:
        "Seamless data synchronization and workflow automation between your CRM and other tools.",
    },
    {
      icon: <BarChart3 className="w-6 h-6" />,
      title: "Marketing Funnels",
      description:
        "Automated multi-channel marketing campaigns that convert leads into customers.",
    },
    {
      icon: <Workflow className="w-6 h-6" />,
      title: "Data Scrapers",
      description:
        "Custom web scraping solutions to gather competitive intelligence and market data.",
    },
    {
      icon: <ArrowRight className="w-6 h-6" />,
      title: "Workflow Automation",
      description:
        "End-to-end business process automation to eliminate manual tasks and reduce errors.",
    },
    {
      icon: <Mail className="w-6 h-6" />,
      title: "Email Automation",
      description:
        "Personalized email sequences that engage leads and drive conversions automatically.",
    },
    {
      icon: <MessageSquare className="w-6 h-6" />,
      title: "AI Customer Support",
      description:
        "24/7 AI-powered support system that resolves issues and escalates when needed.",
    },
  ];

  return (
    <section id="services" className="section bg-secondary/30">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4">
            Automation Systems <span className="gradient-text">I Build</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Cutting-edge automation solutions designed to streamline your
            business operations and maximize efficiency.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {automations.map((item, index) => (
            <AutomationCard
              key={index}
              icon={item.icon}
              title={item.title}
              description={item.description}
              delay={index * 0.1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

// Project Card Component
interface ProjectCardProps {
  name: string;
  industry: string;
  type: string;
  result: string;
  delay?: number;
}

function ProjectCard({ name, industry, type, result, delay = 0 }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true }}
      className="card cursor-pointer group"
    >
      <div className="h-48 bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg mb-4 flex items-center justify-center group-hover:from-primary/30 group-hover:to-accent/30 transition-all">
        <Workflow className="w-16 h-16 text-primary/50" />
      </div>
      <div className="flex items-center gap-2 mb-2">
        <span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary">
          {industry}
        </span>
        <span className="text-xs px-2 py-1 rounded-full bg-accent/10 text-accent">
          {type}
        </span>
      </div>
      <h3 className="text-lg font-semibold font-heading mb-2">{name}</h3>
      <p className="text-gray-400 text-sm">{result}</p>
    </motion.div>
  );
}

// Projects Section
function ProjectsSection() {
  const projects = [
    {
      name: "Real Estate AI Lead Generator",
      industry: "Real Estate",
      type: "Lead Generation",
      result: "Generated 300+ leads per month automatically",
    },
    {
      name: "E-commerce Order Processor",
      industry: "E-commerce",
      type: "Workflow Automation",
      result: "Processed 1000+ orders with 99% accuracy",
    },
    {
      name: "SaaS Customer Support Bot",
      industry: "SaaS",
      type: "AI Chatbot",
      result: "Reduced support tickets by 70%",
    },
    {
      name: "Financial Data Aggregator",
      industry: "Finance",
      type: "Data Scraping",
      result: "Collected data from 50+ sources in real-time",
    },
    {
      name: "Healthcare Appointment System",
      industry: "Healthcare",
      type: "Workflow Automation",
      result: "Booked 200+ appointments weekly",
    },
    {
      name: "Marketing Automation Suite",
      industry: "Marketing",
      type: "Email Automation",
      result: "Increased email engagement by 150%",
    },
  ];

  return (
    <section id="projects" className="section">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4">
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Real-world automation solutions that have transformed businesses
            and delivered measurable results.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <ProjectCard key={index} {...project} delay={index * 0.1} />
          ))}
        </div>

        <div className="text-center mt-12">
          <a href="#contact" className="btn-secondary inline-flex items-center gap-2">
            View All Projects
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
}

// Case Study Component
interface CaseStudyProps {
  client: string;
  problem: string;
  solution: string;
  tools: string[];
  results: string;
  delay?: number;
}

function CaseStudyCard({ client, problem, solution, tools, results, delay = 0 }: CaseStudyProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true }}
      className="card"
    >
      <div className="flex items-center gap-2 mb-4">
        <Star className="w-5 h-5 text-yellow-500" />
        <span className="text-sm font-medium text-gray-300">Case Study</span>
      </div>
      <h3 className="text-xl font-semibold font-heading mb-4">{client}</h3>
      
      <div className="space-y-4">
        <div>
          <h4 className="text-sm font-medium text-primary mb-1">Problem</h4>
          <p className="text-gray-400 text-sm">{problem}</p>
        </div>
        <div>
          <h4 className="text-sm font-medium text-primary mb-1">Solution</h4>
          <p className="text-gray-400 text-sm">{solution}</p>
        </div>
        <div>
          <h4 className="text-sm font-medium text-primary mb-2">Tools Used</h4>
          <div className="flex flex-wrap gap-2">
            {tools.map((tool, index) => (
              <span
                key={index}
                className="text-xs px-2 py-1 rounded-full bg-muted text-gray-300"
              >
                {tool}
              </span>
            ))}
          </div>
        </div>
        <div className="pt-4 border-t border-border">
          <h4 className="text-sm font-medium text-accent mb-1">Results</h4>
          <p className="text-white font-semibold">{results}</p>
        </div>
      </div>
    </motion.div>
  );
}

// Case Studies Section
function CaseStudiesSection() {
  const caseStudies = [
    {
      client: "E-commerce Brand",
      problem: "Manual order processing was taking 20+ hours per week",
      solution: "AI-powered order processing automation with OCR and instant notifications",
      tools: ["Zapier", "OpenAI API", "Airtable", "Slack"],
      results: "80% time saved, processing time reduced from 30min to 30 seconds",
    },
    {
      client: "Real Estate Agency",
      problem: "Lost leads due to slow follow-up times (average 4+ hours)",
      solution: "Instant lead capture and AI-powered nurturing sequences",
      tools: ["Make.com", "Twilio", "ChatGPT", "HubSpot"],
      results: "300% increase in lead response rate, 150 new monthly leads",
    },
    {
      client: "SaaS Startup",
      problem: "Customer support team overwhelmed with repetitive inquiries",
      solution: "AI chatbot with knowledge base integration and ticket escalation",
      tools: ["Botpress", "OpenAI", "Zendesk", "Intercom"],
      results: "70% reduction in support tickets, 24/7 instant responses",
    },
  ];

  return (
    <section id="case-studies" className="section bg-secondary/30">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4">
            Client <span className="gradient-text">Success Stories</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            See how automation has transformed businesses across various
            industries.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {caseStudies.map((study, index) => (
            <CaseStudyCard key={index} {...study} delay={index * 0.15} />
          ))}
        </div>
      </div>
    </section>
  );
}

// Pricing Plan Component
interface PricingPlanProps {
  name: string;
  price: string;
  description: string;
  features: string[];
  popular?: boolean;
  delay?: number;
}

function PricingCard({ name, price, description, features, popular, delay = 0 }: PricingPlanProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true }}
      className={`card relative ${popular ? "border-primary" : ""}`}
    >
      {popular && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <span className="bg-primary text-white text-xs px-3 py-1 rounded-full">
            Most Popular
          </span>
        </div>
      )}
      <h3 className="text-xl font-semibold font-heading mb-2">{name}</h3>
      <div className="mb-4">
        <span className="text-4xl font-bold">{price}</span>
        <span className="text-gray-400 text-sm">/project</span>
      </div>
      <p className="text-gray-400 text-sm mb-6">{description}</p>
      <ul className="space-y-3 mb-8">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center gap-2 text-sm">
            <CheckCircle className="w-4 h-4 text-accent flex-shrink-0" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>
      <a
        href="#contact"
        className={`block text-center py-3 rounded-lg font-semibold transition-all ${
          popular
            ? "btn-primary"
            : "border border-primary text-primary hover:bg-primary/10"
        }`}
      >
        Get Started
      </a>
    </motion.div>
  );
}

// Pricing Section
function PricingSection() {
  const plans = [
    {
      name: "Starter Automation",
      price: "$2,500",
      description: "Perfect for small businesses looking to automate basic processes",
      features: [
        "1-2 Automated Workflows",
        "Lead Generation Setup",
        "Email Automation",
        "Basic Chatbot Integration",
        "30 Days Support",
      ],
    },
    {
      name: "Growth Automation",
      price: "$5,000",
      description: "Comprehensive automation for growing businesses",
      features: [
        "5-7 Automated Workflows",
        "Advanced Lead Scoring",
        "Multi-channel Marketing",
        "AI Chatbot with Custom Knowledge",
        "CRM Integration",
        "60 Days Support",
      ],
      popular: true,
    },
    {
      name: "Enterprise Automation",
      price: "$10,000+",
      description: "Full-scale automation solutions for large organizations",
      features: [
        "Unlimited Workflows",
        "Custom AI Development",
        "Advanced Analytics & Reporting",
        "Multi-platform Integration",
        "Dedicated Account Manager",
        "90 Days Support",
      ],
    },
  ];

  return (
    <section className="section">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4">
            Simple, Transparent <span className="gradient-text">Pricing</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Choose the automation package that fits your business needs.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <PricingCard key={index} {...plan} delay={index * 0.15} />
          ))}
        </div>
      </div>
    </section>
  );
}

// Testimonial Component
interface TestimonialProps {
  quote: string;
  author: string;
  role: string;
  delay?: number;
}

function Testimonial({ quote, author, role, delay = 0 }: TestimonialProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true }}
      className="card min-w-[300px] md:min-w-[400px]"
    >
      <div className="flex gap-1 mb-4">
        {[...Array(5)].map((_, i) => (
          <Star key={i} className="w-4 h-4 text-yellow-500 fill-yellow-500" />
        ))}
      </div>
      <p className="text-gray-300 mb-6 italic">"{quote}"</p>
      <div>
        <p className="font-semibold">{author}</p>
        <p className="text-gray-400 text-sm">{role}</p>
      </div>
    </motion.div>
  );
}

// Testimonials Section
function TestimonialsSection() {
  const testimonials = [
    {
      quote:
        "Peter built an automation that replaced 3 employees. Our ROI was achieved in just 2 months.",
      author: "Sarah Johnson",
      role: "Startup Founder",
    },
    {
      quote:
        "The AI chatbot transformed our customer support. Response time went from hours to seconds.",
      author: "Michael Chen",
      role: "E-commerce CEO",
    },
    {
      quote:
        "Incredible work! The lead generation system generated $500K in new business in the first quarter.",
      author: "David Williams",
      role: "Real Estate Broker",
    },
    {
      quote:
        "Peter's automation expertise helped us scale from $100K to $1M ARR without adding headcount.",
      author: "Emily Rodriguez",
      role: "SaaS Founder",
    },
  ];

  return (
    <section className="section bg-secondary/30 overflow-hidden">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4">
            What Clients <span className="gradient-text">Say</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Don't just take my word for it - hear from satisfied clients.
          </p>
        </motion.div>

        <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide">
          {testimonials.map((testimonial, index) => (
            <Testimonial key={index} {...testimonial} delay={index * 0.1} />
          ))}
        </div>
      </div>
    </section>
  );
}

// Contact Form Component
function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    service: "",
    budget: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus("success");
        setFormData({
          name: "",
          email: "",
          company: "",
          service: "",
          budget: "",
          message: "",
        });
      } else {
        setSubmitStatus("error");
      }
    } catch (error) {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium mb-2">Name *</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 bg-secondary border border-border rounded-lg focus:border-primary focus:outline-none transition-colors"
            placeholder="Your name"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Email *</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 bg-secondary border border-border rounded-lg focus:border-primary focus:outline-none transition-colors"
            placeholder="your@email.com"
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium mb-2">Company</label>
          <input
            type="text"
            name="company"
            value={formData.company}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-secondary border border-border rounded-lg focus:border-primary focus:outline-none transition-colors"
            placeholder="Your company"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Service Needed *</label>
          <select
            name="service"
            value={formData.service}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 bg-secondary border border-border rounded-lg focus:border-primary focus:outline-none transition-colors"
          >
            <option value="">Select a service</option>
            <option value="ai-chatbot">AI Chatbot Development</option>
            <option value="lead-generation">AI Lead Generation</option>
            <option value="crm-automation">CRM Automation</option>
            <option value="workflow-automation">Workflow Automation</option>
            <option value="marketing-automation">Marketing Automation</option>
            <option value="other">Other</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Budget Range</label>
        <select
          name="budget"
          value={formData.budget}
          onChange={handleChange}
          className="w-full px-4 py-3 bg-secondary border border-border rounded-lg focus:border-primary focus:outline-none transition-colors"
        >
          <option value="">Select budget range</option>
          <option value="under-2k">Under $2,500</option>
          <option value="2k-5k">$2,500 - $5,000</option>
          <option value="5k-10k">$5,000 - $10,000</option>
          <option value="10k+">$10,000+</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Message *</label>
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
          rows={5}
          className="w-full px-4 py-3 bg-secondary border border-border rounded-lg focus:border-primary focus:outline-none transition-colors resize-none"
          placeholder="Tell me about your automation needs..."
        />
      </div>

      {submitStatus === "success" && (
        <div className="p-4 bg-accent/10 border border-accent/30 rounded-lg flex items-center gap-2">
          <CheckCircle className="w-5 h-5 text-accent" />
          <span className="text-accent">
            Thanks for contacting Peter Techy Automation! We'll respond within 24 hours.
          </span>
        </div>
      )}

      {submitStatus === "error" && (
        <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400">
          Something went wrong. Please try again or email directly.
        </div>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full btn-primary flex items-center justify-center gap-2 disabled:opacity-50"
      >
        {isSubmitting ? (
          "Sending..."
        ) : (
          <>
            Send Message
            <Send className="w-4 h-4" />
          </>
        )}
      </button>
    </form>
  );
}

// Contact Section
function ContactSection() {
  return (
    <section id="contact" className="section">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4">
            Let's <span className="gradient-text">Automate</span> Your Business
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Ready to transform your business with AI automation? Get in touch for
            a free strategy consultation.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          <div>
            <div className="mb-8">
              <h3 className="text-xl font-semibold font-heading mb-4">
                Get In Touch
              </h3>
              <p className="text-gray-400">
                Schedule a free 30-minute strategy call to discuss how AI
                automation can transform your business.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Mail className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Email</p>
                  <p className="font-medium">contact@petertechy.com</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center">
                  <MessageSquare className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Availability</p>
                  <p className="font-medium">Currently accepting new clients</p>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <h4 className="font-semibold mb-4">Follow Along</h4>
              <div className="flex gap-4">
                <a
                  href="#"
                  className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center hover:bg-primary/20 transition-colors"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center hover:bg-primary/20 transition-colors"
                >
                  <Twitter className="w-5 h-5" />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center hover:bg-primary/20 transition-colors"
                >
                  <Github className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="card"
          >
            <ContactForm />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// Footer Component
function Footer() {
  return (
    <footer className="section bg-secondary/50 border-t border-border">
      <div className="container-custom">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          <div className="md:col-span-2">
            <a href="#home" className="text-2xl font-bold font-heading mb-4 inline-block">
              <span className="gradient-text">PETER TECHY</span>
            </a>
            <p className="text-gray-400 max-w-md mb-6">
              Building intelligent automation systems that scale businesses
              while they sleep. AI-powered solutions for modern enterprises.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a href="#services" className="text-gray-400 hover:text-primary transition-colors">
                  Services
                </a>
              </li>
              <li>
                <a href="#projects" className="text-gray-400 hover:text-primary transition-colors">
                  Projects
                </a>
              </li>
              <li>
                <a href="#case-studies" className="text-gray-400 hover:text-primary transition-colors">
                  Case Studies
                </a>
              </li>
              <li>
                <a href="#contact" className="text-gray-400 hover:text-primary transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Services</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                  AI Chatbots
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                  Lead Generation
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                  CRM Automation
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                  Workflow Automation
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} Peter Techy Automation. All rights reserved.
          </p>
          <div className="flex gap-4">
            <a href="#" className="text-gray-400 hover:text-primary transition-colors text-sm">
              Privacy Policy
            </a>
            <a href="#" className="text-gray-400 hover:text-primary transition-colors text-sm">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

// About Section
function AboutSection() {
  return (
    <section id="about" className="section">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold font-heading mb-6">
              About <span className="gradient-text">Peter Techy</span>
            </h2>
            <div className="space-y-4 text-gray-400">
              <p>
                I'm a Senior Full-Stack Engineer and AI Automation Architect with
                10+ years of experience building scalable solutions for startups
                and enterprises.
              </p>
              <p>
                My expertise spans React, Node.js, Python, and cutting-edge AI
                technologies including GPT models, machine learning, and automation
                platforms like Zapier, Make.com, and n8n.
              </p>
              <p>
                I've helped over 50 businesses automate their operations, saving
                thousands of hours and generating millions in revenue through
                intelligent automation systems.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-4 mt-8">
              <div className="text-center">
                <p className="text-3xl font-bold gradient-text">50+</p>
                <p className="text-sm text-gray-400">Clients</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold gradient-text">100+</p>
                <p className="text-sm text-gray-400">Projects</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold gradient-text">10+</p>
                <p className="text-sm text-gray-400">Years Exp.</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl blur-3xl" />
            <div className="relative bg-card border border-border rounded-2xl p-8">
              <h3 className="text-xl font-semibold font-heading mb-6">
                Tech Stack
              </h3>
              <div className="flex flex-wrap gap-3">
                {[
                  "React",
                  "Next.js",
                  "Node.js",
                  "Python",
                  "GPT-4",
                  "Zapier",
                  "Make.com",
                  "n8n",
                  "Airtable",
                  "HubSpot",
                  "Twilio",
                  "OpenAI API",
                ].map((tech, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-muted rounded-full text-sm"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// Blog Section
function BlogSection() {
  const posts = [
    {
      title: "How AI is Revolutionizing Lead Generation in 2024",
      excerpt:
        "Discover the latest AI-powered strategies for capturing and converting leads automatically.",
      category: "AI Automation",
      date: "March 15, 2024",
    },
    {
      title: "5 Business Processes You Should Automate Today",
      excerpt:
        "Stop wasting time on manual tasks. Here are 5 processes that AI can handle for you.",
      category: "Business Automation",
      date: "March 10, 2024",
    },
    {
      title: "Building Your First AI Chatbot: A Complete Guide",
      excerpt:
        "Step-by-step tutorial on creating an intelligent chatbot for customer support.",
      category: "Development",
      date: "March 5, 2024",
    },
  ];

  return (
    <section id="blog" className="section bg-secondary/30">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4">
            Latest <span className="gradient-text">Insights</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Stay updated with the latest trends in AI automation and business
            growth.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {posts.map((post, index) => (
            <motion.article
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="card cursor-pointer group"
            >
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary">
                  {post.category}
                </span>
                <span className="text-xs text-gray-500">{post.date}</span>
              </div>
              <h3 className="text-lg font-semibold font-heading mb-2 group-hover:text-primary transition-colors">
                {post.title}
              </h3>
              <p className="text-gray-400 text-sm">{post.excerpt}</p>
              <div className="mt-4 flex items-center text-primary text-sm font-medium">
                Read More <ChevronRight className="w-4 h-4" />
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

// CTA Section
function CTASection() {
  return (
    <section className="section relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-accent/10" />
      <div className="absolute inset-0 grid-pattern opacity-50" />
      
      <div className="container-custom relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto"
        >
          <h2 className="text-3xl md:text-5xl font-bold font-heading mb-6">
            Ready to <span className="gradient-text">Scale</span> Your Business?
          </h2>
          <p className="text-xl text-gray-400 mb-8">
            Let's discuss how AI automation can transform your business
            operations and drive growth.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#contact" className="btn-primary text-lg px-8 py-4">
              Book Free Strategy Call
            </a>
            <a href="#projects" className="btn-secondary text-lg px-8 py-4">
              View My Work
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// Main Page Component
export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <HeroSection />
      <AutomationShowcase />
      <AboutSection />
      <ProjectsSection />
      <CaseStudiesSection />
      <PricingSection />
      <TestimonialsSection />
      <BlogSection />
      <CTASection />
      <ContactSection />
      <Footer />
    </main>
  );
}

