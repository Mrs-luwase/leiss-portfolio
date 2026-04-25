import { useState, useEffect, useRef } from 'react';
import { Github, Mail, Phone, Menu, X } from 'lucide-react';
import { Badge } from './components/ui/badge';
import { Card } from './components/ui/card';
import { Button } from './components/ui/button';
import profilePhoto from '../imports/WhatsApp_Image_2025-03-13_at_20.37.05_b8236415-1.jpg';
import heroPhoto from '../imports/mydp.jfif';
import aboutPhoto from '../imports/WhatsApp_Image_2025-03-13_at_20.37.05_b8236415-1.jpg';

// Hook for scroll-triggered animations
function useScrollAnimation() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return { ref, visible };
}

// Animated wrapper component
function AnimateIn({
  children,
  delay = 0,
  className = '',
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const { ref, visible } = useScrollAnimation();

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(28px)',
        transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
    setMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 bg-background/80 backdrop-blur-md border-b border-border z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="text-xl font-semibold hover:text-primary transition-colors"
              >
                Leiss Uwase
              </button>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-8">
              <button onClick={() => scrollToSection('about')} className="hover:text-primary transition-colors">About</button>
              <button onClick={() => scrollToSection('experience')} className="hover:text-primary transition-colors">Experience</button>
              <button onClick={() => scrollToSection('skills')} className="hover:text-primary transition-colors">Skills</button>
              <button onClick={() => scrollToSection('projects')} className="hover:text-primary transition-colors">Projects</button>
              <button onClick={() => scrollToSection('education')} className="hover:text-primary transition-colors">Education</button>
              <button onClick={() => scrollToSection('contact')} className="hover:text-primary transition-colors">Contact</button>
            </div>

            {/* Mobile menu button */}
            <button
              className="md:hidden p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="md:hidden py-4 space-y-2">
              <button onClick={() => scrollToSection('about')} className="block w-full text-left py-2 hover:text-primary transition-colors">About</button>
              <button onClick={() => scrollToSection('experience')} className="block w-full text-left py-2 hover:text-primary transition-colors">Experience</button>
              <button onClick={() => scrollToSection('skills')} className="block w-full text-left py-2 hover:text-primary transition-colors">Skills</button>
              <button onClick={() => scrollToSection('projects')} className="block w-full text-left py-2 hover:text-primary transition-colors">Projects</button>
              <button onClick={() => scrollToSection('education')} className="block w-full text-left py-2 hover:text-primary transition-colors">Education</button>
              <button onClick={() => scrollToSection('contact')} className="block w-full text-left py-2 hover:text-primary transition-colors">Contact</button>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <style>{`
          @keyframes heroFadeIn {
            from { opacity: 0; transform: translateY(24px); }
            to   { opacity: 1; transform: translateY(0); }
          }
          @keyframes heroImgIn {
            from { opacity: 0; transform: scale(1.04); }
            to   { opacity: 1; transform: scale(1); }
          }
          .hero-scroll-btn {
            display: inline-flex;
            align-items: center;
            gap: 10px;
            padding: 12px 28px;
            border: 1px solid rgba(159,100,150,0.5);
            border-radius: 0.625rem;
            color: #f0ece8;
            font-size: 1.6rem;
            font-weight: 500;
            cursor: pointer;
            background: rgba(159,100,150,0.08);
            transition: background 0.25s, border-color 0.25s;
          }
          .hero-scroll-btn:hover {
            background: rgba(159,100,150,0.2);
            border-color: rgba(159,100,150,0.7);
          }
          .hero-scroll-btn svg {
            transition: transform 0.25s;
          }
          .hero-scroll-btn:hover svg {
            transform: translateY(3px);
          }

          /* ── Section personality tweaks ── */
          #about {
            background: linear-gradient(160deg, rgba(159,100,150,0.07) 0%, rgba(14,11,18,0.0) 60%);
            border-top: 2px solid rgba(159,100,150,0.25);
          }
          #experience { background: #0c0910; }
          #experience .exp-card {
            border-left: 3px solid rgba(159,100,150,0.5);
            border-top: 1px solid rgba(159,100,150,0.1);
            border-radius: 0.625rem;
          }
          #skills { background: #111018; position: relative; }
          #skills::before {
            content: '';
            position: absolute;
            inset: 0;
            background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E");
            pointer-events: none;
            opacity: 0.5;
          }
          #projects { background: linear-gradient(135deg, rgba(123,70,106,0.09) 0%, #0e0b12 50%, rgba(159,100,150,0.05) 100%); }
          #education {
            background: #09080d;
            border-top: 2px solid rgba(159,100,150,0.35);
            box-shadow: inset 0 1px 60px rgba(159,100,150,0.04);
          }
          #contact { background: radial-gradient(ellipse 60% 50% at 50% 30%, rgba(159,100,150,0.11) 0%, #0e0b12 70%); }
        `}</style>

        {/* Full-bleed background photo */}
        <div
          className="absolute inset-0 w-full h-full"
          style={{ animation: 'heroImgIn 1.1s ease forwards' }}
        >
          <img
            src={heroPhoto}
            alt=""
            className="w-full h-full object-cover"
            style={{ objectPosition: '75% 25%' }}
          />
          {/* Dark gradient overlays */}
          <div className="absolute inset-0" style={{
            background: 'linear-gradient(to right, rgba(9,8,13,0.98) 28%, rgba(9,8,13,0.65) 50%, rgba(9,8,13,0.1) 100%)'
          }} />
          <div className="absolute inset-0" style={{
            background: 'linear-gradient(to top, rgba(9,8,13,0.6) 0%, transparent 40%)'
          }} />
          {/* Subtle purple tint on photo side */}
          <div className="absolute inset-0" style={{
            background: 'radial-gradient(ellipse 50% 80% at 75% 50%, rgba(159,100,150,0.12) 0%, transparent 70%)'
          }} />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-24 pb-16">
          <div className="max-w-xl" style={{ animation: 'heroFadeIn 0.8s ease 0.2s both' }}>

            {/* Eyebrow label */}
            <div className="flex items-center gap-3 mb-6">
              <div style={{ width: '32px', height: '2px', background: 'var(--primary)', borderRadius: '2px' }} />
              <span style={{ fontSize: '0.8rem', letterSpacing: '0.12em', color: '#9F6496', fontWeight: 500, textTransform: 'uppercase' }}>
                IT Student & Business Operations Professional
              </span>
            </div>

            {/* Main heading — content unchanged */}
            <h1 className="text-5xl md:text-6xl mb-6" style={{ lineHeight: 1.1 }}>
              Hi, I'm <span className="text-primary">Leiss Uwase</span>
            </h1>

            {/* Body text — content unchanged */}
            <p className="text-lg mb-6 leading-relaxed" style={{ color: 'rgba(240,236,232,0.85)' }}>
              With hands-on experience in Business Operations, Customer Service, and Programming.
              I bring both analytical thinking and practical experience to any role I take on.
            </p>
            <p className="text-base mb-10 italic" style={{ color: 'rgba(168,152,160,0.9)' }}>
              "I believe there is nothing better than building solutions that make the world a better place"
            </p>

            {/* CTA */}
            <button className="hero-scroll-btn" onClick={() => scrollToSection('about')}>
              Learn More
            </button>
          </div>
        </div>

        {/* Bottom name card — like the reference screenshot */}
        
      </section>

      {/* About Section */}
  
<section id="about" className="py-20 px-4 sm:px-6 lg:px-8">
  <div className="max-w-6xl mx-auto">
    <AnimateIn>
      <div className="text-center mb-14">
        <h2 className="text-4xl mb-3">About Me</h2>
        <div style={{width:'40px',height:'3px',background:'var(--primary)',borderRadius:'2px',margin:'0 auto'}} />
      </div>
    </AnimateIn>

    <div className="grid md:grid-cols-5 gap-14 items-center">

      {/* Photo — takes 2 of 5 columns */}
      <AnimateIn delay={0} className="md:col-span-2">
        <div
          className="rounded-2xl overflow-hidden"
          style={{
            aspectRatio: '3/4',
            boxShadow: '0 0 0 1px rgba(159,100,150,0.18), 0 32px 64px rgba(0,0,0,0.45)',
          }}
        >
          <img
            src={aboutPhoto}
            alt="Leiss Uwase"
            className="w-full h-full object-cover object-center"
          />
        </div>
      </AnimateIn>

      {/* Info — takes 3 of 5 columns */}
      <AnimateIn delay={150} className="md:col-span-3">

        {/* Bio */}
        <p className="text-xl leading-relaxed mb-8" style={{color:'rgba(240,236,232,0.9)'}}>
          I'm <span className="text-primary font-medium">Leiss Uwase</span>, an IT student
          majoring in Information Management at AUCA, Kigali. I sit at the intersection of
          technology and people: I think in systems, communicate clearly, and care about
          the experience on the other side of every interface I build or manage.
        </p>

        {/* Key facts — clean list, no grid clutter */}
        <div className="space-y-4 mb-10">
          {[
            { label: 'Based in',  value: 'Kigali, Rwanda' },
            { label: 'Study',     value: 'BSc IT · Information Management — AUCA' },
            { label: 'Languages', value: 'Kinyarwanda · English · French (DELF B2)' },
            { label: 'Email',     value: 'leisswase@gmail.com' },
          ].map(({ label, value }) => (
            <div key={label} className="flex items-baseline gap-4">
              <span
                className="text-sm font-medium shrink-0"
                style={{color:'var(--primary)', minWidth:'80px'}}
              >
                {label}
              </span>
              <span
                className="text-base"
                style={{
                  color:'rgba(200,190,210,0.85)',
                  borderBottom:'1px solid rgba(159,100,150,0.15)',
                  paddingBottom:'0.5rem',
                  width:'100%',
                }}
              >
                {value}
              </span>
            </div>
          ))}
        </div>

        {/* Availability */}
        <div className="flex flex-wrap gap-3">
          <Badge className="px-4 py-1.5 text-sm">Open to Internships</Badge>
          <Badge variant="outline" className="px-4 py-1.5 text-sm">
            Freelance · Interpreter / CX / Web
          </Badge>
        </div>

      </AnimateIn>
    </div>
  </div>
</section>

      {/* Experience Section */}
      <section id="experience" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <AnimateIn>
            <div className="text-center mb-12">
              <h2 className="text-4xl mb-3">Professional Experience</h2>
              <div style={{width:'40px',height:'3px',background:'var(--primary)',borderRadius:'2px',margin:'0 auto'}} />
            </div>
          </AnimateIn>
          <div className="space-y-8">
            <AnimateIn delay={0}>
              <Card className="p-8 exp-card">
                <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4">
                  <div>
                    <h3 className="mb-2">Business Operations Assistant</h3>
                    <p className="text-muted-foreground">Le Paon Supermarket ltd.</p>
                  </div>
                  <Badge variant="outline">November 2023 - October 2025</Badge>
                </div>
                <ul className="space-y-2 text-muted-foreground list-disc list-inside">
                  <li>Managed daily operations, ensuring efficient inventory and staff coordination</li>
                  <li>Operated EBM systems and maintained business documentation for accuracy</li>
                  <li>Developed effective communication strategies to enhance customer satisfaction</li>
                </ul>
              </Card>
            </AnimateIn>

            <AnimateIn delay={100}>
              <Card className="p-8 exp-card">
                <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4">
                  <div>
                    <h3 className="mb-2">Customer Contact Center Agent</h3>
                    <p className="text-muted-foreground">CCI Rwanda | JetBlue Airline</p>
                  </div>
                  <Badge variant="outline">January 2023 - September 2023</Badge>
                </div>
                <ul className="space-y-2 text-muted-foreground list-disc list-inside">
                  <li>Provided real-time solutions and support to enhance customer travel experiences</li>
                  <li>Collaborated with team members to improve operational efficiency and service delivery</li>
                  <li>Conducted follow-ups to ensure all customer issues were addressed satisfactorily</li>
                </ul>
              </Card>
            </AnimateIn>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      
     {/* Skills Section */}
      <section id="skills" className="py-24 px-4 sm:px-6 lg:px-8 relative">
        <style>{`
          .skill-tag {
            display: inline-flex;
            align-items: center;
            padding: 5px 14px;
            border-radius: 4px;
            font-size: 0.78rem;
            font-family: 'Courier New', monospace;
            font-weight: 600;
            letter-spacing: 0.04em;
            background: rgba(159,100,150,0.12);
            color: rgba(220,185,230,0.95);
            border: 1px solid rgba(159,100,150,0.3);
            transition: background 0.2s, border-color 0.2s, box-shadow 0.2s;
          }
          .skill-tag:hover {
            background: rgba(159,100,150,0.25);
            border-color: rgba(159,100,150,0.6);
            box-shadow: 0 0 12px rgba(159,100,150,0.2);
          }
          .tool-chip {
            display: flex;
            align-items: center;
            gap: 8px;
            padding: 8px 14px;
            border-radius: 6px;
            font-size: 0.82rem;
            font-weight: 500;
            background: rgba(255,255,255,0.03);
            border: 1px solid rgba(159,100,150,0.18);
            color: rgba(205,188,218,0.9);
            transition: background 0.2s, border-color 0.2s, box-shadow 0.2s;
            cursor: default;
          }
          .tool-chip:hover {
            background: rgba(159,100,150,0.1);
            border-color: rgba(159,100,150,0.45);
            box-shadow: 0 0 16px rgba(159,100,150,0.15);
          }
          .tool-chip-dot {
            width: 6px; height: 6px;
            border-radius: 50%;
            background: var(--primary);
            box-shadow: 0 0 6px rgba(159,100,150,0.8);
            flex-shrink: 0;
          }
          .soft-bar-track {
            flex: 1;
            height: 3px;
            border-radius: 2px;
            background: rgba(159,100,150,0.12);
            overflow: hidden;
          }
          .soft-bar-fill {
            height: 100%;
            border-radius: 2px;
            background: linear-gradient(90deg, rgba(159,100,150,0.5), rgba(200,140,210,0.85));
            box-shadow: 0 0 8px rgba(159,100,150,0.4);
          }
          .skills-section-divider {
            width: 1px;
            background: linear-gradient(to bottom, transparent, rgba(159,100,150,0.35), transparent);
            align-self: stretch;
          }
          .skills-category-label {
            font-size: 0.65rem;
            font-family: 'Courier New', monospace;
            font-weight: 700;
            letter-spacing: 0.15em;
            text-transform: uppercase;
            color: rgba(159,100,150,0.65);
            margin-bottom: 10px;
          }
        `}</style>

        <div className="max-w-6xl mx-auto">
          <AnimateIn>
            <div className="text-center mb-16">
              <h2 className="text-4xl mb-3">Skills & Expertise</h2>
              <div style={{width:'40px',height:'3px',background:'var(--primary)',borderRadius:'2px',margin:'0 auto'}} />
            </div>
          </AnimateIn>

          {/* ── Technical Skills ── full width */}
          <AnimateIn delay={0}>
            <div
              className="rounded-xl p-8 mb-6"
              style={{
                background:'rgba(255,255,255,0.02)',
                border:'1px solid rgba(159,100,150,0.22)',
                boxShadow:'inset 0 1px 0 rgba(159,100,150,0.1), 0 24px 48px rgba(0,0,0,0.3)',
              }}
            >
              {/* header row */}
              <div className="flex items-center gap-3 mb-8">
                <div style={{width:'3px',height:'20px',background:'var(--primary)',borderRadius:'2px',boxShadow:'0 0 8px rgba(159,100,150,0.6)'}} />
                <h3 style={{fontSize:'1rem',fontWeight:600,letterSpacing:'0.06em',textTransform:'uppercase',color:'rgba(220,200,235,0.9)'}}>
                  Technical Skills
                </h3>
              </div>

              {/* 4 subcategories */}
              <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8">
                {[
                  { category: 'Languages',        items: ['Python','Java','C','SQL','HTML'] },
                  { category: 'Data & Analytics', items: ['Data Handling','MySQL','Big Data Analytics','Machine Learning'] },
                  { category: 'Security & Comms', items: ['Cybersecurity','VoIP','VRI'] },
                  { category: 'Design',           items: ['UI Design'] },
                ].map(({ category, items }) => (
                  <div key={category}>
                    <p className="skills-category-label">{category}</p>
                    <div className="flex flex-wrap gap-2">
                      {items.map(item => (
                        <span key={item} className="skill-tag">{item}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </AnimateIn>

          {/* ── Bottom row ── */}
          <div className="grid md:grid-cols-2 gap-6">

            {/* Tools & Platforms */}
            <AnimateIn delay={100}>
              <div
                className="rounded-xl p-8 h-full"
                style={{
                  background:'rgba(255,255,255,0.02)',
                  border:'1px solid rgba(159,100,150,0.22)',
                  boxShadow:'inset 0 1px 0 rgba(159,100,150,0.1), 0 24px 48px rgba(0,0,0,0.3)',
                }}
              >
                <div className="flex items-center gap-3 mb-8">
                  <div style={{width:'3px',height:'20px',background:'var(--primary)',borderRadius:'2px',boxShadow:'0 0 8px rgba(159,100,150,0.6)'}} />
                  <h3 style={{fontSize:'1rem',fontWeight:600,letterSpacing:'0.06em',textTransform:'uppercase',color:'rgba(220,200,235,0.9)'}}>
                    Tools & Platforms
                  </h3>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {['GitHub','Figma','Canva','MS Teams','Sabre','EBM Systems','MS Office','Google Workspace'].map(tool => (
                    <div key={tool} className="tool-chip">
                      <span className="tool-chip-dot" />
                      {tool}
                    </div>
                  ))}
                </div>
              </div>
            </AnimateIn>

            {/* Soft Skills */}
            <AnimateIn delay={200}>
              <div
                className="rounded-xl p-8 h-full"
                style={{
                  background:'rgba(255,255,255,0.02)',
                  border:'1px solid rgba(159,100,150,0.22)',
                  boxShadow:'inset 0 1px 0 rgba(159,100,150,0.1), 0 24px 48px rgba(0,0,0,0.3)',
                }}
              >
                <div className="flex items-center gap-3 mb-8">
                  <div style={{width:'3px',height:'20px',background:'var(--primary)',borderRadius:'2px',boxShadow:'0 0 8px rgba(159,100,150,0.6)'}} />
                  <h3 style={{fontSize:'1rem',fontWeight:600,letterSpacing:'0.06em',textTransform:'uppercase',color:'rgba(220,200,235,0.9)'}}>
                    Soft Skills
                  </h3>
                </div>
                <div className="space-y-5">
                  {[
                    { skill:'Communication',       note:'Multilingual · written & verbal',  w:'92%' },
                    { skill:'Problem Solving',     note:'Analytical, structured thinking',  w:'88%' },
                    { skill:'Adaptability',        note:'Fast learner across industries',   w:'90%' },
                    { skill:'Teamwork',            note:'Collaborative, accountable',       w:'85%' },
                    { skill:'Time Management',     note:'Academics + training + freelance', w:'83%' },
                    { skill:'Analytical Thinking', note:'Data-driven decisions',            w:'87%' },
                  ].map(({ skill, note, w }) => (
                    <div key={skill}>
                      <div className="flex justify-between items-baseline mb-2">
                        <span style={{fontSize:'0.84rem',fontWeight:600,color:'rgba(215,198,228,0.95)'}}>
                          {skill}
                        </span>
                        <span style={{fontSize:'0.7rem',color:'rgba(155,138,168,0.75)'}}>
                          {note}
                        </span>
                      </div>
                      <div className="soft-bar-track">
                        <div className="soft-bar-fill" style={{width: w}} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </AnimateIn>

          </div>
        </div>
      </section>
      {/* Projects Section */}
      <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <AnimateIn>
            <div className="text-center mb-12">
              <h2 className="text-4xl mb-3">Featured Projects</h2>
              <div style={{width:'40px',height:'3px',background:'var(--primary)',borderRadius:'2px',margin:'0 auto'}} />
            </div>
          </AnimateIn>
          <div className="grid md:grid-cols-2 gap-8">
            <AnimateIn delay={0}>
              <Card className="p-8">
                <h3 className="mb-4">Crop Disease Detection System</h3>
                <div className="mb-4">
                  <Badge>Python</Badge>
                  <Badge className="ml-2">Machine Learning</Badge>
                  <Badge variant="outline" className="ml-2">Team Project</Badge>
                </div>
                <p className="text-muted-foreground mb-4">
                  Collaborated in a team to develop a Machine Learning model that detects crop diseases
                  by analyzing crop leaves. This project demonstrates practical application of ML in agriculture.
                </p>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <p><strong>Key Features:</strong></p>
                  <ul className="list-disc list-inside ml-4">
                    <li>Image processing and analysis</li>
                    <li>Disease classification model</li>
                    <li>Real-time detection capabilities</li>
                  </ul>
                </div>
              </Card>
            </AnimateIn>

            <AnimateIn delay={100}>
              <Card className="p-8">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-4">
                  <h3>Photography Studio Management System</h3>
                  {/* ADDED: GitHub link for Photography Studio project */}
                  <a
                    href="https://github.com/Mrs-luwase"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition-colors shrink-0"
                  >
                    <Github className="w-4 h-4" />
                    View on GitHub
                  </a>
                </div>
                <div className="mb-4">
                  <Badge>Oracle</Badge>
                  <Badge className="ml-2">PL/SQL</Badge>
                  <Badge variant="outline" className="ml-2">Database System</Badge>
                </div>
                <p className="text-muted-foreground mb-4">
                  Developed a customized Oracle PL/SQL Database system for a photography studio
                  to centralize all their operations in one place.
                </p>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <p><strong>Key Features:</strong></p>
                  <ul className="list-disc list-inside ml-4">
                    <li>Client management</li>
                    <li>Booking and scheduling</li>
                    <li>Inventory tracking</li>
                    <li>Invoice generation</li>
                  </ul>
                </div>
              </Card>
            </AnimateIn>
          </div>
        </div>
      </section>

      {/* Education & Training Section */}
      <section id="education" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <AnimateIn>
            <div className="text-center mb-12">
              <h2 className="text-4xl mb-3">Education & Training</h2>
              <div style={{width:'40px',height:'3px',background:'var(--primary)',borderRadius:'2px',margin:'0 auto'}} />
            </div>
          </AnimateIn>

          {/* Formal Education */}
          <div className="mb-12">
            <AnimateIn>
              <h3 className="text-2xl mb-6">Education Background</h3>
            </AnimateIn>
            <div className="space-y-6">
              <AnimateIn delay={0}>
                <Card className="p-8">
                  <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4">
                    <div>
                      <h4 className="text-xl mb-2">BSc in Information Technology</h4>
                      <p className="text-muted-foreground">Adventist University of Central Africa</p>
                      <p className="text-sm text-muted-foreground mt-1">Major in Information Management</p>
                    </div>
                    <Badge variant="outline">2023 - Present</Badge>
                  </div>
                </Card>
              </AnimateIn>

              <AnimateIn delay={100}>
                <Card className="p-8">
                  <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4">
                    <div>
                      <h4 className="text-xl mb-2">Advanced Certificate of Education A2</h4>
                      <p className="text-muted-foreground">Lycée Notre Dame de Citeaux</p>
                      <p className="text-sm text-muted-foreground mt-1">Mathematics - Chemistry - Biology</p>
                    </div>
                    <Badge variant="outline">2016 - 2022</Badge>
                  </div>
                </Card>
              </AnimateIn>
            </div>
          </div>

          {/* Professional Training */}
          <div>
            <AnimateIn>
              <h3 className="text-2xl mb-6">Professional Training</h3>
            </AnimateIn>
            <AnimateIn delay={100}>
              <Card className="p-8 border-primary/50 bg-primary/5">
                <div className="flex items-start gap-4 mb-4">
                  <div className="flex-1">
                    <h4 className="text-xl mb-2">AUCA Innovation Center Training Program</h4>
                    <p className="text-muted-foreground mb-2">Funded by Mastercard Foundation</p>
                    <Badge>In Progress - 11 Months Program</Badge>
                  </div>
                </div>
                <p className="text-muted-foreground mb-6">
                  An intensive hands-on training program designed to bridge the gap between academic
                  coursework and real-world industry requirements. The program focuses on practical
                  skills development through project-based learning.
                </p>

                <div className="space-y-4">
                  <div>
                    <h5 className="text-lg mb-3">Modules Covered:</h5>
                    <div className="grid sm:grid-cols-3 gap-4">
                      <div className="bg-background p-4 rounded-lg border">
                        <h6 className="font-medium mb-2">UI/UX Design</h6>
                        <p className="text-sm text-muted-foreground">
                          User interface design, user experience principles, prototyping, and design thinking
                        </p>
                      </div>
                      <div className="bg-background p-4 rounded-lg border">
                        <h6 className="font-medium mb-2">Cyber Security</h6>
                        <p className="text-sm text-muted-foreground">
                          Security fundamentals, threat analysis, risk assessment, and security best practices
                        </p>
                      </div>
                      <div className="bg-background p-4 rounded-lg border">
                        <h6 className="font-medium mb-2">Big Data Analytics & ML</h6>
                        <p className="text-sm text-muted-foreground">
                          Data processing, machine learning algorithms, predictive modeling, and data visualization
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-background p-4 rounded-lg border border-primary/30">
                    <p className="text-sm">
                      <strong>Program Objective:</strong> To equip students with industry-relevant skills
                      and practical experience that complements academic learning, preparing them for
                      successful careers in technology.
                    </p>
                  </div>
                </div>
              </Card>
            </AnimateIn>
          </div>

          {/* Training & Certificates */}
          <div className="mt-12">
            <AnimateIn>
              <h3 className="text-2xl mb-6">Training & Certificates</h3>
            </AnimateIn>
            <div className="grid md:grid-cols-2 gap-6">

              {/* Harambee Rwanda */}
              <AnimateIn delay={0}>
                <Card className="p-6 h-full border-primary/30">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 mb-3">
                    <div>
                      <h4 className="text-lg mb-1">Work-Readiness & BPO Training</h4>
                      <p className="text-primary font-medium text-sm">Harambee Rwanda</p>
                    </div>
                    <Badge variant="outline" className="shrink-0">2023</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Completed Harambee's intensive youth employment accelerator — a not-for-profit programme
                    focused on bridging the gap between school and work. Training covered professional
                    readiness, BPO/contact center fundamentals, communication skills, and workplace
                    conduct, preparing participants for entry into Rwanda's growing services sector.
                  </p>
                </Card>
              </AnimateIn>

              {/* CCI Rwanda / JetBlue */}
              <AnimateIn delay={100}>
                <Card className="p-6 h-full border-primary/30">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 mb-3">
                    <div>
                      <h4 className="text-lg mb-1">Crew Member Certification</h4>
                      <p className="text-primary font-medium text-sm">CCI Rwanda | JetBlue Airline</p>
                    </div>
                    <Badge variant="outline" className="shrink-0">2023</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Earned the official "Crew Member" agent certification from CCI Rwanda — Africa's
                    leading BPO outsourcer — in partnership with JetBlue Airlines. Certification
                    covered airline customer support operations, reservation systems (Sabre), VoIP
                    communication, quality assurance standards, and JetBlue's service protocols.
                  </p>
                </Card>
              </AnimateIn>

              {/* DELF B2 */}
              <AnimateIn delay={150}>
                <Card className="p-6 h-full border-primary/30">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 mb-3">
                    <div>
                      <h4 className="text-lg mb-1">DELF B2 . French Language Diploma</h4>
                      <p className="text-primary font-medium text-sm">Institute of French Language and Culture</p>
                    </div>
                    <Badge className="shrink-0">Lifetime Valid</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Holder of the DELF B2 (Diplôme d'Études en Langue Française) — an internationally
                    recognised, lifetime-valid certification issued by the French Ministry of Education.
                    B2 level certifies upper-intermediate to advanced French proficiency, including the
                    ability to communicate fluently and spontaneously in professional and academic contexts.
                  </p>
                </Card>
              </AnimateIn>

              {/* Imbuto Foundation */}
              <AnimateIn delay={200}>
                <Card className="p-6 h-full border-primary/30">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 mb-3">
                    <div>
                      <h4 className="text-lg mb-1">Chair President — School Leadership Club</h4>
                      <p className="text-primary font-medium text-sm">Imbuto Foundation</p>
                    </div>
                    <Badge variant="outline" className="shrink-0">2021</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Recognised by the Imbuto Foundation — founded by First Lady Jeannette Kagame —
                    for outstanding student leadership. Served as Chair President of the school
                    leadership club, driving initiatives in peer mentorship, community engagement,
                    and values-based leadership aligned with the Foundation's mission of youth empowerment.
                  </p>
                </Card>
              </AnimateIn>

              {/* Itorero */}
              <AnimateIn delay={250} className="md:col-span-2">
                <Card className="p-6 border-primary/30">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 mb-3">
                    <div>
                      <h4 className="text-lg mb-1">Itorero — National Civic Education Programme</h4>
                      <p className="text-primary font-medium text-sm">Republic of Rwanda</p>
                    </div>
                    <Badge variant="outline" className="shrink-0">2022</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Completed Rwanda's national civic education programme for high school leavers,
                    delivered in two phases: a theoretical phase covering Rwandan history, values,
                    patriotism, and governance, followed by a national service phase involving
                    community work and applied civic responsibility. Itorero reinforces unity,
                    integrity, and a commitment to national development.
                  </p>
                </Card>
              </AnimateIn>

            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <AnimateIn>
            <h2 className="text-4xl mb-3">Get In Touch</h2>
            <div style={{width:'40px',height:'3px',background:'var(--primary)',borderRadius:'2px',margin:'0 auto 1.5rem'}} />
            <p className="text-lg text-muted-foreground mb-12">
              I'm always open to discussing new opportunities, collaborations, or just having a chat about technology!
            </p>
          </AnimateIn>

          <div className="grid sm:grid-cols-3 gap-6 mb-12">
            <AnimateIn delay={0}>
              <Card className="p-6">
                <Mail className="w-8 h-8 mx-auto mb-4 text-primary" />
                <p className="text-sm text-muted-foreground mb-2">Email</p>
                <a href="mailto:leisswase@gmail.com" className="hover:text-primary transition-colors">
                  leisswase@gmail.com
                </a>
              </Card>
            </AnimateIn>

            <AnimateIn delay={100}>
              <Card className="p-6">
                <Phone className="w-8 h-8 mx-auto mb-4 text-primary" />
                <p className="text-sm text-muted-foreground mb-2">Phone</p>
                <a href="tel:+250790250596" className="hover:text-primary transition-colors">
                  +250 790 250 596
                </a>
              </Card>
            </AnimateIn>

            <AnimateIn delay={200}>
              <Card className="p-6">
                <Github className="w-8 h-8 mx-auto mb-4 text-primary" />
                <p className="text-sm text-muted-foreground mb-2">GitHub</p>
                <a
                  href="https://github.com/Mrs-luwase"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-colors"
                >
                  Mrs-luwase
                </a>
              </Card>
            </AnimateIn>
          </div>

          <AnimateIn delay={100}>
            <div className="flex justify-center gap-4">
              <Button asChild size="lg">
                <a href="mailto:leisswase@gmail.com">Send Email</a>
              </Button>
              <Button asChild variant="outline" size="lg">
                <a href="https://github.com/Mrs-luwase" target="_blank" rel="noopener noreferrer">
                  View GitHub
                </a>
              </Button>
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 sm:px-6 lg:px-8 border-t border-border">
        <div className="max-w-7xl mx-auto text-center text-muted-foreground">
          <p>&copy; 2026 Leiss Uwase. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
