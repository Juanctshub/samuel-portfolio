import React, { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as random from 'maath/random';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import Lenis from 'lenis';

const COLLAGE_IMAGES = [
  "/images/ffffffff.jpg",
  "/images/fffffff.jpg",
  "/images/ffffff.jpg"
];

const GALLERY_IMAGES = [
  "/images/ffffffff.jpg",
  "/images/fffffff.jpg",
  "/images/ffffff.jpg",
  "/images/fffff.jpg",
  "/images/ffff.jpg",
  "/images/fff.jpg",
  "/images/ff.jpg",
  "/images/f.jpg"
];

const TERMINAL_LINES = [
  "// Booting framework v2.1.0",
  "> establish_connection(port: 3000)",
  "Connection established.",
  "> load_module('architecture.tsx')",
  "Module loaded: Architecture",
  "> render_structure(0x0A)",
  "Compiling visual nodes...",
  "Nodes compiled: 1042",
  "> init_music_synth()",
  "Audio engine standing by",
  "> fetch('photography/feed')",
  "Feed synchronized.",
  "Parsing layout geometry...",
  "Calculating viewport dimensions...",
  "System running at 60 FPS",
  "Awaiting parameters..."
];

const WORKS = [
  {
    title: "KAMEMUN",
    role: "Desarrollador de la Página Web",
    link: "https://kamemun.vercel.app/",
    image: "/images/kame.png",
    description: "Plataforma oficial de la delegación independiente del Estado Lara. KAMEMUN rompe barreras académicas tradicionales, impulsando el talento universitario y demostrando que la diplomacia es una herramienta universal para todas las disciplinas."
  },
  {
    title: "Metanoia",
    role: "Desarrollador de la Página",
    link: "https://metanoiacontacto.lovable.app/",
    image: "/images/2.png",
    description: "Plataforma enfocada en elevar el estándar de la formación continua en psicología mediante programas de alta calidad científica, a la vez que brinda servicios de psicoeducación estratégica a empresas y centros educativos para mejorar la productividad sustentada en el bienestar mental."
  },
  {
    title: "PAVIMUN",
    role: "Desarrollador de la Página",
    link: "https://pavimun.vercel.app/",
    image: "/images/3.png",
    description: "Sitio web oficial donde se encuentra centralizada toda la información de la delegación del Modelo de Naciones Unidas PAVIMUN, detallando de forma interactiva los comités y eventos que conformaron su exitosa primera edición."
  },
  {
    title: "Eatly APP",
    role: "Desarrollador de la PWA",
    link: "https://eatlyweb.vercel.app/",
    image: "/images/eatly.png",
    description: "Aplicación Web Progresiva (PWA) enfocada en la seguridad alimentaria. Utilizando escaneo instantáneo y comandos de voz, detecta riesgos dietéticos y sugiere alternativas seguras en segundos gracias a la integración con Open Food Facts."
  }
];

function ParticleBackground() {
  const ref = useRef();
  const sphere = useMemo(() => random.inSphere(new Float32Array(3000), { radius: 2.2 }), []);
  
  useFrame((state, delta) => {
    ref.current.rotation.x -= delta / 30;
    ref.current.rotation.y -= delta / 40;
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled={false}>
        <PointMaterial transparent color="#ffffff" size={0.002} sizeAttenuation={true} depthWrite={false} opacity={0.4}/>
      </Points>
    </group>
  );
}

function CinematicLoader({ onStart }) {
  const container = useRef();
  const handleStart = () => {
    const tl = gsap.timeline({ onComplete: onStart });
    tl.to('.start-btn, .loader-text', { opacity: 0, duration: 0.5, ease: 'power2.inOut' })
      .to('.loader-panel-top', { yPercent: -100, duration: 1.2, ease: 'power4.inOut' }, 0.5)
      .to('.loader-panel-bottom', { yPercent: 100, duration: 1.2, ease: 'power4.inOut' }, 0.5)
      .set(container.current, { display: 'none' });
  };

  return (
    <div className="loader-overlay" ref={container}>
       <div className="loader-panel-top"></div>
       <div className="loader-panel-bottom"></div>
       <div className="loader-content">
         <h2 className="loader-text">SAMUEL AGREDA</h2>
         <button className="start-btn" onClick={handleStart}>INICIAR EXPERIENCIA</button>
       </div>
    </div>
  );
}

function PageTransitionLoader() {
  return (
    <div className="page-transition-overlay" style={{ display: 'none', background: 'transparent' }}>
      <div className="wipe-panel"></div>
      <div className="wipe-panel"></div>
      <div className="wipe-panel"></div>
      <div className="wipe-panel"></div>
    </div>
  );
}

function Nav({ currentPage, onNavigate }) {
  return (
    <nav className="original-nav">
      <div className="nav-left">
        <h2 onClick={() => onNavigate('home')} style={{cursor: 'pointer'}}>
          <span className="desktop-text">Samuel Agreda</span>
          <span className="mobile-text">SA</span>
        </h2>
        <p className="desktop-text">Architect & Developer</p>
      </div>
      <div className="nav-right">
        <div className="nav-links">
          <button className={currentPage === 'home' ? 'active' : ''} onClick={() => onNavigate('home')} aria-label="Information">
            <span className="desktop-text">Information</span>
            <span className="mobile-icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
            </span>
          </button>
          <span className="separator desktop-text">/</span>
          <button className={currentPage === 'works' ? 'active' : ''} onClick={() => onNavigate('works')} aria-label="Selected Works">
            <span className="desktop-text">Selected Works</span>
            <span className="mobile-icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 12 17 22 12"></polyline></svg>
            </span>
          </button>
        </div>
        <a href="https://www.instagram.com/fotagreda" target="_blank" rel="noreferrer" className="instagram-btn" aria-label="Instagram">
          <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
          </svg>
        </a>
      </div>
    </nav>
  );
}

function AutoTypingTerminal() {
  const [visibleLines, setVisibleLines] = useState([]);

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setVisibleLines(prev => {
        const nextLines = [...prev, TERMINAL_LINES[index]];
        // Limit to 6 lines to keep the code card compact
        if (nextLines.length > 6) {
           return nextLines.slice(nextLines.length - 6);
        }
        return nextLines;
      });
      index = (index + 1) % TERMINAL_LINES.length;
    }, 1000); 
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="code-lines" style={{ display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'flex-start' }}>
      {visibleLines.map((line, i) => (
        <p key={i}>
          {line.startsWith('//') ? <span className="comment">{line}</span> : 
           line.startsWith('>') ? <><span style={{color:'#5a5a5a', marginRight:'0.5rem'}}>&gt;</span>{line.substring(1)}</> : 
           line}
        </p>
      ))}
      <p className="pulse"><span style={{color:'#5a5a5a', marginRight:'0.5rem'}}>&gt;</span>_</p>
    </div>
  );
}

function BentoHero({ hasStarted }) {
  const container = useRef();
  
  useGSAP(() => {
    if (hasStarted) {
      gsap.from('.glass-card', {
        y: 40, opacity: 0, duration: 1.2, stagger: 0.15, ease: 'power3.out', delay: 0.2
      });
      gsap.to('.bar', {
        height: () => gsap.utils.random(10, 50),
        duration: 0.3, repeat: -1, yoyo: true, ease: 'none', stagger: 0.1
      });
    }
  }, [hasStarted, container]);

  if (!hasStarted) return null;

  return (
    <section className="bento-wrapper" ref={container}>
      <div className="bento-hero">
        
        <div className="glass-card card-main">
          <p className="badge">CREATIVE DIRECTORY</p>
          <h1 className="mac-headline">
            Creo lógica,<br/>
            estructuras & <span className="serif-italic">sinfonías</span>.
          </h1>
          <p className="fade-text">¡Bienvenido a la página!</p>
        </div>
        
        <div className="glass-card card-music">
           <div className="eq-container">
             <div className="bar"></div>
             <div className="bar"></div>
             <div className="bar"></div>
             <div className="bar"></div>
             <div className="bar"></div>
           </div>
           <p className="card-label">Audio</p>
        </div>

        <div className="glass-card card-code">
          <AutoTypingTerminal />
          <p className="card-label">Código</p>
        </div>

        <div className="glass-card card-photo">
          <div className="slider-track">
            {COLLAGE_IMAGES.map((img, i) => <img key={`a-${i}`} src={img} alt="Collage" />)}
            {COLLAGE_IMAGES.map((img, i) => <img key={`b-${i}`} src={img} alt="Collage" />)}
          </div>
          <div className="photo-overlay">
            <p className="card-label">Perspectiva Visual</p>
          </div>
        </div>
        
      </div>
    </section>
  );
}

function PhotographySection({ hasStarted }) {
  if (!hasStarted) return null;

  return (
    <section className="photo-gallery-section" id="information">
      <div className="gallery-header">
        <h2>Fotografías</h2>
        <div className="gallery-bio">
          <p>Hola!, tengo 16 años me gusta demasiado la Fotografia los paisajes todos esos aspectos, me encanta demasiado y pienso que cada imagen es un mundo, me gusta explorar y obviamente de ahi fotografiar lo que veo (apenas ando empezando JAJAJAJ)</p>
        </div>
      </div>
      <div className="gallery-grid">
         {GALLERY_IMAGES.map((img, i) => (
           <div className="gallery-item-wrapper" key={`g-${i}`}>
             <img src={img} className="gallery-item" alt="Gallery" />
           </div>
         ))}
      </div>
    </section>
  );
}

function WorksSection({ hasStarted }) {
  if (!hasStarted) return null;

  // Add useGSAP to animate entrance when this page loads
  const container = useRef();
  useGSAP(() => {
    if (hasStarted) {
      gsap.from('.work-card', {
        y: 50, opacity: 0, duration: 1, stagger: 0.2, ease: 'power3.out', delay: 0.4
      });
    }
  }, [hasStarted, container]);

  return (
    <section className="works-section-page" ref={container}>
      <div className="section-header">
        <h2>Trabajos Destacados</h2>
        <p>Desarrollo Web & Arquitectura UI</p>
      </div>
      
      <div className="works-container">
        {WORKS.map((work, idx) => (
          <div className={`work-card ${idx % 2 !== 0 ? 'reverse' : ''}`} key={idx}>
            <div className="work-image-wrapper">
              <a href={work.link} target="_blank" rel="noreferrer">
                <img src={work.image} alt={work.title} className="work-image" />
                <div className="work-hover-overlay">
                  <span>VISITAR SITIO WEB</span>
                </div>
              </a>
            </div>
            <div className="work-info">
              <p className="work-role">{work.role}</p>
              <h3>{work.title}</h3>
              <p className="work-description">{work.description}</p>
              <a href={work.link} target="_blank" rel="noreferrer" className="work-link">
                Explorar Proyecto
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default function App() {
  const [started, setStarted] = useState(false);
  const [currentPage, setCurrentPage] = useState('home'); // 'home' | 'works'
  const audioRef = useRef(null);

  useEffect(() => {
    if (started && audioRef.current) {
      audioRef.current.volume = 0.2;
      audioRef.current.play().catch(e => console.log("Audio play error:", e));
    }

    const handleVisibilityChange = () => {
      if (document.hidden) {
        if (audioRef.current) audioRef.current.pause();
      } else {
        if (started && audioRef.current) {
          audioRef.current.play().catch(e => console.log("Audio resume error:", e));
        }
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [started]);

  useEffect(() => {
    const lenis = new Lenis({ duration: 1.2, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
    function raf(time) { lenis.raf(time); requestAnimationFrame(raf); }
    requestAnimationFrame(raf);
    return () => lenis.destroy();
  }, []);

  const handleNavigate = (page) => {
    if (page === currentPage) return;
    const tl = gsap.timeline();
    tl.set('.page-transition-overlay', { display: 'flex', top: 0, left: 0 })
      .set('.wipe-panel', { scaleY: 0, transformOrigin: 'bottom' })
      .to('.wipe-panel', { scaleY: 1, duration: 0.6, stagger: 0.1, ease: 'power4.inOut' })
      .add(() => {
        setCurrentPage(page);
        window.scrollTo(0, 0);
      })
      .set('.wipe-panel', { transformOrigin: 'top' })
      .to('.wipe-panel', { scaleY: 0, duration: 0.6, stagger: 0.1, ease: 'power4.inOut', delay: 0.1 })
      .set('.page-transition-overlay', { display: 'none' });
  };

  return (
    <main>
      <audio ref={audioRef} src="/Waiting.mp3" loop />
      {!started && <CinematicLoader onStart={() => setStarted(true)} />}
      <PageTransitionLoader />
      
      <div className="canvas-container" style={{ opacity: started ? 1 : 0, transition: 'opacity 1s ease' }}>
        <Canvas camera={{ position: [0, 0, 1] }}>
          <ParticleBackground />
        </Canvas>
      </div>
      
      {started && <Nav currentPage={currentPage} onNavigate={handleNavigate} />}
      
      {currentPage === 'home' && (
        <div className="page-home">
          <BentoHero hasStarted={started} />
          <PhotographySection hasStarted={started} />
        </div>
      )}

      {currentPage === 'works' && (
        <div className="page-works">
          <WorksSection hasStarted={started} />
        </div>
      )}

    </main>
  );
}
