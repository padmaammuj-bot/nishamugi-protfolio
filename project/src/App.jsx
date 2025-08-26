import { useState, useEffect, useRef } from 'react'

function App() {
  const [activeSection, setActiveSection] = useState('home')
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [formStatus, setFormStatus] = useState('')
  
  const sectionsRef = useRef({})
  const observerRef = useRef(null)

  // Intersection Observer for scroll animations and active section
  useEffect(() => {
    const observerOptions = {
      threshold: 0.3,
      rootMargin: '-100px 0px -100px 0px'
    }

    observerRef.current = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id)
          entry.target.style.opacity = '1'
          entry.target.style.transform = 'translateY(0)'
        }
      })
    }, observerOptions)

    // Observe all sections
    Object.values(sectionsRef.current).forEach(section => {
      if (section) {
        observerRef.current.observe(section)
      }
    })

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect()
      }
    }
  }, [])

  const smoothScrollTo = (elementId) => {
    const element = document.getElementById(elementId)
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      })
    }
    setIsMenuOpen(false)
  }

  const handleFormChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleFormSubmit = (e) => {
    e.preventDefault()
    setFormStatus('Message sent successfully!')
    setFormData({ name: '', email: '', message: '' })
    setTimeout(() => setFormStatus(''), 3000)
  }

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Projects' },
    { id: 'contact', label: 'Contact' }
  ]

  const skills = [
    'React', 'JavaScript', 'CSS3', 'Node.js', 'HTML5', 'Git',
    'MongoDB', 'Express', 'TypeScript', 'Python', 'Figma', 'AWS'
  ]

  const projects = [
    {
    title: 'TraceMe: Predictive System for No Parking Vehicle Owner Identification using LPRNet',
    tech: ['HTML', 'CSS', 'Bootstrap'],
    description: 'A full-stack no-parking vehicle with payment integration and admin dashboard.',
      link: '#'
    },
    {
    title: 'Bionic Eye Model to Provide Vision or Restore Sight for Blindness using Vision Transformer',
    tech: ['python3.7.4', 'TensorFlow', 'Pandas', 'Sikit Learn'],
    description: 'Visual implants are intended to produce an artificial vision leading to some levels of functional.',
      link: '#'
    },
    {
      title: 'Weather Dashboard',
      tech: ['JavaScript', 'API', 'CSS3'],
      description: 'Interactive weather application with location-based forecasts and data visualization.',
      link: '#'
    }
  ]

  const baseStyles = {
    section: {
      opacity: 0,
      transform: 'translateY(30px)',
      transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)'
    }
  }

  return (
    <div style={{
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
      backgroundColor: '#0f0f23',
      color: '#ffffff',
      lineHeight: 1.6,
      minHeight: '100vh'
    }}>
      {/* Navigation */}
      <nav style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        background: 'rgba(15, 15, 35, 0.9)',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        transition: 'all 0.3s ease'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '1rem 2rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div style={{
            fontSize: '1.5rem',
            fontWeight: '700',
            background: 'linear-gradient(135deg, #8B5CF6 0%, #3B82F6 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            Resume
          </div>

          {/* Desktop Navigation */}
          <div style={{
            display: 'none',
            '@media (min-width: 768px)': { display: 'flex' }
          }} className="desktop-nav">
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => smoothScrollTo(item.id)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: activeSection === item.id ? '#8B5CF6' : '#ffffff',
                  padding: '0.5rem 1rem',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  fontSize: '0.95rem',
                  fontWeight: '500'
                }}
                onMouseEnter={(e) => {
                  if (activeSection !== item.id) {
                    e.target.style.color = '#A78BFA'
                  }
                }}
                onMouseLeave={(e) => {
                  if (activeSection !== item.id) {
                    e.target.style.color = '#ffffff'
                  }
                }}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            style={{
              display: 'block',
              background: 'none',
              border: 'none',
              color: '#ffffff',
              fontSize: '1.5rem',
              cursor: 'pointer',
              '@media (min-width: 768px)': { display: 'none' }
            }}
            className="mobile-menu-btn"
          >
            ☰
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            background: 'rgba(15, 15, 35, 0.95)',
            backdropFilter: 'blur(10px)',
            borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
            padding: '1rem'
          }}>
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => smoothScrollTo(item.id)}
                style={{
                  display: 'block',
                  width: '100%',
                  background: 'none',
                  border: 'none',
                  color: '#ffffff',
                  padding: '0.75rem',
                  cursor: 'pointer',
                  textAlign: 'left',
                  fontSize: '1rem',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = 'rgba(139, 92, 246, 0.1)'
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = 'transparent'
                }}
              >
                {item.label}
              </button>
            ))}
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section
        id="home"
        ref={el => sectionsRef.current.home = el}
        style={{
          ...baseStyles.section,
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #0f0f23 0%, #1a1a3a 100%)',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'radial-gradient(circle at 30% 50%, rgba(139, 92, 246, 0.1) 0%, transparent 50%), radial-gradient(circle at 70% 50%, rgba(59, 130, 246, 0.1) 0%, transparent 50%)'
        }} />
        
        <div style={{
          textAlign: 'center',
          maxWidth: '800px',
          padding: '2rem',
          position: 'relative',
          zIndex: 1
        }}>
          <h1
          style={{
            fontSize: 'clamp(2.5rem, 5vw, 4rem)',
            fontWeight: '800',
            marginBottom: '1rem',
            background: 'linear-gradient(135deg, #8B5CF6 0%, #3B82F6 50%, #06B6D4 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
        lineHeight: 1.1,
        transition: 'background 0.5s ease-in-out', // smooth transition
        cursor: 'pointer',
        
            }}
         onMouseEnter={(e) => {
          e.currentTarget.style.background =
          'linear-gradient(135deg, #F59E0B 0%, #EF4444 50%, #EC4899 100%)'; // Hover gradient
              e.currentTarget.style.WebkitBackgroundClip = 'text';
              e.currentTarget.style.WebkitTextFillColor = 'transparent';

            }}
         onMouseLeave={(e) => {
          e.currentTarget.style.background =
          'linear-gradient(135deg, #8B5CF6 0%, #3B82F6 50%, #06B6D4 100%)'; // Original gradient
              e.currentTarget.style.WebkitBackgroundClip = 'text';
              e.currentTarget.style.WebkitTextFillColor = 'transparent';

        }}
           >
           Nishamugi
          </h1>
          
          
          <h2 style={{
            fontSize: 'clamp(1.25rem, 3vw, 1.75rem)',
            fontWeight: '400',
            color: '#A78BFA',
            marginBottom: '2rem'
          }}>
            Full Stack Developer
          </h2>
          
          <p style={{
            fontSize: 'clamp(1rem, 2vw, 1.25rem)',
            color: '#CBD5E1',
            marginBottom: '3rem',
            lineHeight: 1.6
          }}>
            I create beautiful, responsive web applications with modern technologies.
            Passionate about clean code and exceptional user experiences.
          </p>
          
          <button
            onClick={() => smoothScrollTo('contact')}
            style={{
              background: 'linear-gradient(135deg, #8B5CF6 0%, #3B82F6 100%)',
              border: 'none',
              color: '#ffffff',
              padding: '1rem 2rem',
              fontSize: '1.1rem',
              fontWeight: '600',
              borderRadius: '50px',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              boxShadow: '0 8px 25px rgba(139, 92, 246, 0.3)'
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = 'translateY(-2px)'
              e.target.style.boxShadow = '0 12px 35px rgba(139, 92, 246, 0.4)'
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'translateY(0)'
              e.target.style.boxShadow = '0 8px 25px rgba(139, 92, 246, 0.3)'
            }}
          >
            Get In Touch
          </button>
        </div>
      </section>

      {/* About Section */}
      <section
        id="about"
        ref={el => sectionsRef.current.about = el}
        style={{
          ...baseStyles.section,
          padding: '5rem 2rem',
          maxWidth: '1200px',
      margin: '0 auto',
      background: 'rgba(255, 255, 255, 0.02)',
      borderRadius: '20px',
      transition: 'background 0.5s ease, transform 0.3s ease',
      }}
      onMouseEnter={(e) => {
      e.currentTarget.style.background = 'rgba(139, 92, 246, 0.08)'; // soft purple
      e.currentTarget.style.transform = 'skew(5deg, 5deg)';
      }}
      onMouseLeave={(e) => {
      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.02)'; // original
      e.currentTarget.style.transform = 'scale(1)';
     }}  >
        <h1
          style={{
            fontSize: 'clamp(2.5rem, 5vw, 4rem)',
            fontWeight: '800',
            marginBottom: '1rem',
            textAlign:'center',
            background: 'linear-gradient(135deg, #8B5CF6 0%, #3B82F6 50%, #06B6D4 100%)',
          WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
        lineHeight: 1.1,
        transition: 'background 0.5s ease-in-out', // smooth transition
        cursor: 'pointer',
        
            }}
         onMouseEnter={(e) => {
          e.currentTarget.style.background =
          'linear-gradient(135deg, #F59E0B 0%, #EF4444 50%, #EC4899 100%)'; // Hover gradient
              e.currentTarget.style.WebkitBackgroundClip = 'text';
              e.currentTarget.style.WebkitTextFillColor = 'transparent';

            }}
         onMouseLeave={(e) => {
          e.currentTarget.style.background =
          'linear-gradient(135deg, #8B5CF6 0%, #3B82F6 50%, #06B6D4 100%)'; // Original gradient
              e.currentTarget.style.WebkitBackgroundClip = 'text';
              e.currentTarget.style.WebkitTextFillColor = 'transparent';

        }}
           >
           About me
          </h1>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '3rem',
          alignItems: 'center'
        }}>
          <div style={{
            background: 'rgba(255, 255, 255, 0.05)',
            backdropFilter: 'blur(10px)',
            borderRadius: '20px',
            padding: '2rem',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            textAlign: 'center'
          }}>
            <div style={{
              width: '200px',
              height: '200px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #8B5CF6 0%, #3B82F6 100%)',
              margin: '0 auto 2rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '4rem'
            }}>
              👨‍💻
            </div>
            
            <button style={{
              background: 'linear-gradient(135deg, #8B5CF6 0%, #3B82F6 100%)',
              border: 'none',
              color: '#ffffff',
              padding: '0.75rem 1.5rem',
              borderRadius: '25px',
              cursor: 'pointer',
              fontSize: '1rem',
              fontWeight: '600',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = 'scale(1.05)'
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'scale(1)'
            }}
            >
              Download Resume
            </button>
          </div>

          <div>
            <h3 style={{
              fontSize: '1.5rem',
              fontWeight: '600',
              marginBottom: '1.5rem',
              color: '#A78BFA'
            }}>
              Hi, I'm Nisha!
            </h3>
            
            <p style={{
              color: '#CBD5E1',
              marginBottom: '1.5rem',
              fontSize: '1.1rem'
            }}>
              I'm a passionate full-stack developer with over 0 years of experience creating 
              digital solutions that make a difference. I love turning complex problems into 
              simple, beautiful, and intuitive designs.
            </p>
            
            <p style={{
              color: '#CBD5E1',
              marginBottom: '1.5rem',
              fontSize: '1.1rem'
            }}>
              When I'm not coding, you can find me exploring new technologies, contributing to 
              open-source projects, or sharing knowledge with the developer community.
            </p>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
              gap: '1rem',
              marginTop: '2rem'
            }}>
              {['5+ Years', '50+ Projects', '10+ Clients', ].map((stat, index) => (
                <div key={index} style={{
                  textAlign: 'center',
                  background: 'rgba(139, 92, 246, 0.1)',
                  padding: '1rem',
                  borderRadius: '10px',
                  border: '1px solid rgba(139, 92, 246, 0.2)'
                }}>
                  <div style={{
                    fontSize: '1.5rem',
                    fontWeight: '700',
                    color: '#8B5CF6'
                  }}>
                    {stat.split(' ')[0]}
                  </div>
                  <div style={{
                    fontSize: '0.9rem',
                    color: '#CBD5E1'
                  }}>
                    {stat.split(' ').slice(1).join(' ') }
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section
        id="skills"
        ref={el => sectionsRef.current.skills = el}
        style={{
          ...baseStyles.section,
          padding: '5rem 2rem',
          maxWidth: '1200px',
          margin: '0 auto'
        }}
      >
       <h1
          style={{
            fontSize: 'clamp(2.5rem, 5vw, 4rem)',
            fontWeight: '800',
            marginBottom: '1rem',
            textAlign:'center',
            background: 'linear-gradient(135deg, #8B5CF6 0%, #3B82F6 50%, #06B6D4 100%)',
          WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
        lineHeight: 1.1,
        transition: 'background 0.5s ease-in-out', // smooth transition
        cursor: 'pointer',
        
            }}
         onMouseEnter={(e) => {
          e.currentTarget.style.background =
          'linear-gradient(135deg, #F59E0B 0%, #EF4444 50%, #EC4899 100%)'; // Hover gradient
              e.currentTarget.style.WebkitBackgroundClip = 'text';
              e.currentTarget.style.WebkitTextFillColor = 'transparent';

            }}
         onMouseLeave={(e) => {
          e.currentTarget.style.background =
          'linear-gradient(135deg, #8B5CF6 0%, #3B82F6 50%, #06B6D4 100%)'; // Original gradient
              e.currentTarget.style.WebkitBackgroundClip = 'text';
              e.currentTarget.style.WebkitTextFillColor = 'transparent';

        }}
           >
          Skills & Technologies
          </h1>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
          gap: '1.5rem'
        }}>
          {skills.map((skill, index) => (
            <div
              key={skill}
              style={{
                background: 'rgba(255, 255, 255, 0.05)',
                backdropFilter: 'blur(10px)',
                borderRadius: '15px',
                padding: '1.5rem 1rem',
                textAlign: 'center',
                border: '1px solid rgba(255, 255, 255, 0.1)',
               transition: 'background 0.4s ease, transform 0.3s ease, border-color 0.4s ease',
                cursor: 'pointer',
               boxshadow: "0 0 20px #8b5cf6",

              }}
              onMouseEnter={(e) => {
              e.currentTarget.style.background = 'linear-gradient(135deg, rgba(139,92,246,0.2), rgba(59,130,246,0.2))'; // Gradient on hover
              e.currentTarget.style.transform = 'translateY(-8px) rotate(5deg)'; // Lift + scale
              e.currentTarget.style.borderColor = 'rgba(139, 92, 246, 0.4)'; // Highlighted border
              }}
              onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)'; // Original
              e.currentTarget.style.transform = 'translateY(0) scale(1)'; // Reset
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)'; // Reset
              }}
            >
              <div style={{
                fontSize: '2rem',
                marginBottom: '0.5rem',     
                
              }}>
                {skill === 'React' ? '⚛️' : 
                 skill === 'JavaScript' ? '🟨' :
                 skill === 'CSS3' ? '🎨' :
                 skill === 'Node.js' ? '🟢' :
                 skill === 'HTML5' ? '🔴' :
                 skill === 'Git' ? '📝' :
                 skill === 'MongoDB' ? '🍃' :
                 skill === 'Express' ? '⚡' :
                 skill === 'TypeScript' ? '🔵' :
                 skill === 'Python' ? '🐍' :
                 skill === 'Figma' ? '🎯' : '☁️'}
              </div>
              <h3 style={{
                fontSize: '1.1rem',
                fontWeight: '600',
                color: '#ffffff',
                margin: 0
              }}>
                {skill}
              </h3>
            </div>
          ))}
        </div>
      </section>

      {/* Projects Section */}
      <section
        id="projects"
        ref={el => sectionsRef.current.projects = el}
        style={{
          ...baseStyles.section,
          padding: '5rem 2rem',
          maxWidth: '1200px',
          margin: '0 auto'
        }}
      >
      <h1
          style={{
            fontSize: 'clamp(2.5rem, 5vw, 4rem)',
            fontWeight: '800',
            marginBottom: '1rem',
            textAlign:'center',
            background: 'linear-gradient(135deg, #8B5CF6 0%, #3B82F6 50%, #06B6D4 100%)',
          WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
        lineHeight: 1.1,
        transition: 'background 0.5s ease-in-out', // smooth transition
        cursor: 'pointer',
        
            }}
         onMouseEnter={(e) => {
          e.currentTarget.style.background =
          'linear-gradient(135deg, #F59E0B 0%, #EF4444 50%, #EC4899 100%)'; // Hover gradient
              e.currentTarget.style.WebkitBackgroundClip = 'text';
              e.currentTarget.style.WebkitTextFillColor = 'transparent';

            }}
         onMouseLeave={(e) => {
          e.currentTarget.style.background =
          'linear-gradient(135deg, #8B5CF6 0%, #3B82F6 50%, #06B6D4 100%)'; // Original gradient
              e.currentTarget.style.WebkitBackgroundClip = 'text';
              e.currentTarget.style.WebkitTextFillColor = 'transparent';

        }}
           >
           Feature Projects
          </h1>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
          gap: '2rem'
        }}>
          {projects.map((project, index) => (
            <div
              key={project.title}
              style={{
                background: 'rgba(255, 255, 255, 0.05)',
                backdropFilter: 'blur(10px)',
                borderRadius: '20px',
                padding: '2rem',
                border: '1px solid rgba(255, 255, 255, 0.1)',
              transition: 'transform 0.4s ease, box-shadow 0.4s ease',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              height: '100%',
              minHeight: '480px', // ensures all equal height
              justifyContent: 'space-between'
              }}
              onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-10px) scale(1.02)';
              e.currentTarget.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.4)';
              }}
              onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0) scale(1)';
              e.currentTarget.style.boxShadow = 'none';
              }}
            >
            <div>
              <div style={{
                width: '100%',
                height: '200px',
                borderRadius: '10px',
                background: `linear-gradient(135deg, ${index === 0 ? '#8B5CF6' : index === 1 ? '#3B82F6' : '#06B6D4'} 0%, rgba(255, 255, 255, 0.1) 100%)`,
                marginBottom: '1.5rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '3rem'
              }}>
                {index === 0 ? '🛒' : index === 1 ? '📋' : '🌤️'}
              </div>

              <h3 style={{
                fontSize: '1.5rem',
                fontWeight: '600',
                marginBottom: '1rem',
                color: '#ffffff'
              }}>
                {project.title}
              </h3>

              <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '0.5rem',
                marginBottom: '1rem'
              }}>
                {project.tech.map(tech => (
                  <span
                    key={tech}
                    style={{
                      background: 'rgba(139, 92, 246, 0.2)',
                      color: '#A78BFA',
                      padding: '0.25rem 0.75rem',
                      borderRadius: '15px',
                      fontSize: '0.9rem',
                      fontWeight: '500',
                      border: '1px solid rgba(139, 92, 246, 0.3)'
                    }}
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <p style={{
                color: '#CBD5E1',
                marginBottom: '2rem',
                lineHeight: 1.6
              }}>
                {project.description}
              </p>
            </div>

              <button
                style={{
                  background: 'linear-gradient(135deg, #8B5CF6 0%, #3B82F6 100%)',
                  border: 'none',
                  color: '#ffffff',
                  padding: '0.75rem 1.5rem',
                  borderRadius: '25px',
                  cursor: 'pointer',
                  fontSize: '1rem',
                  fontWeight: '600',
                transition: 'transform 0.3s ease, background 0.3s ease',
                  width: '100%'
                }}
                onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.05)';
                e.currentTarget.style.background = 'linear-gradient(135deg, #7C3AED 0%, #2563EB 100%)';
                }}
                onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.background = 'linear-gradient(135deg, #8B5CF6 0%, #3B82F6 100%)';
                }}
              >
                View Project →
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section
        id="contact"
        ref={el => sectionsRef.current.contact = el}
        style={{
          ...baseStyles.section,
          padding: '5rem 2rem',
          maxWidth: '1200px',
          margin: '0 auto'
        }}
      >
        <h1
          style={{
            fontSize: 'clamp(2.5rem, 5vw, 4rem)',
            fontWeight: '800',
            marginBottom: '1rem',
            textAlign:'center',
            background: 'linear-gradient(135deg, #8B5CF6 0%, #3B82F6 50%, #06B6D4 100%)',
          WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
        lineHeight: 1.1,
        transition: 'background 0.5s ease-in-out', // smooth transition
        cursor: 'pointer',
        
            }}
         onMouseEnter={(e) => {
          e.currentTarget.style.background =
          'linear-gradient(135deg, #F59E0B 0%, #EF4444 50%, #EC4899 100%)'; // Hover gradient
              e.currentTarget.style.WebkitBackgroundClip = 'text';
              e.currentTarget.style.WebkitTextFillColor = 'transparent';

            }}
         onMouseLeave={(e) => {
          e.currentTarget.style.background =
          'linear-gradient(135deg, #8B5CF6 0%, #3B82F6 50%, #06B6D4 100%)'; // Original gradient
              e.currentTarget.style.WebkitBackgroundClip = 'text';
              e.currentTarget.style.WebkitTextFillColor = 'transparent';

        }}
           >
           Get in touch
          </h1>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
          gap: '3rem',
          alignItems: 'start'
        }}>
          {/* Contact Form */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.05)',
            backdropFilter: 'blur(10px)',
            borderRadius: '20px',
            padding: '2rem',
            border: '1px solid rgba(255, 255, 255, 0.1)'
          }}>
            <form onSubmit={handleFormSubmit}>
              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{
                  display: 'block',
                  marginBottom: '0.5rem',
                  color: '#CBD5E1',
                  fontWeight: '500'
                }}>
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleFormChange}
                  required
                  style={{
                    width: '100%',
                    padding: '0.75rem 1rem',
                    borderRadius: '10px',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    background: 'rgba(255, 255, 255, 0.05)',
                    color: '#ffffff',
                    fontSize: '1rem',
                    transition: 'all 0.3s ease',
                    outline: 'none'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#8B5CF6'
                    e.target.style.boxShadow = '0 0 0 3px rgba(139, 92, 246, 0.1)'
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = 'rgba(255, 255, 255, 0.2)'
                    e.target.style.boxShadow = 'none'
                  }}
                />
              </div>

              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{
                  display: 'block',
                  marginBottom: '0.5rem',
                  color: '#CBD5E1',
                  fontWeight: '500'
                }}>
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleFormChange}
                  required
                  style={{
                    width: '100%',
                    padding: '0.75rem 1rem',
                    borderRadius: '10px',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    background: 'rgba(255, 255, 255, 0.05)',
                    color: '#ffffff',
                    fontSize: '1rem',
                    transition: 'all 0.3s ease',
                    outline: 'none'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#8B5CF6'
                    e.target.style.boxShadow = '0 0 0 3px rgba(139, 92, 246, 0.1)'
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = 'rgba(255, 255, 255, 0.2)'
                    e.target.style.boxShadow = 'none'
                  }}
                />
              </div>

              <div style={{ marginBottom: '2rem' }}>
                <label style={{
                  display: 'block',
                  marginBottom: '0.5rem',
                  color: '#CBD5E1',
                  fontWeight: '500'
                }}>
                  Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleFormChange}
                  required
                  rows="5"
                  style={{
                    width: '100%',
                    padding: '0.75rem 1rem',
                    borderRadius: '10px',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    background: 'rgba(255, 255, 255, 0.05)',
                    color: '#ffffff',
                    fontSize: '1rem',
                    transition: 'all 0.3s ease',
                    outline: 'none',
                    resize: 'vertical',
                    fontFamily: 'inherit'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#8B5CF6'
                    e.target.style.boxShadow = '0 0 0 3px rgba(139, 92, 246, 0.1)'
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = 'rgba(255, 255, 255, 0.2)'
                    e.target.style.boxShadow = 'none'
                  }}
                />
              </div>

              <button
                type="submit"
                style={{
                  width: '100%',
                  background: 'linear-gradient(135deg, #8B5CF6 0%, #3B82F6 100%)',
                  border: 'none',
                  color: '#ffffff',
                  padding: '1rem',
                  borderRadius: '10px',
                  cursor: 'pointer',
                  fontSize: '1.1rem',
                  fontWeight: '600',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'translateY(-2px)'
                  e.target.style.boxShadow = '0 8px 25px rgba(139, 92, 246, 0.3)'
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'translateY(0)'
                  e.target.style.boxShadow = 'none'
                }}
              >
                Send Message
              </button>

              {formStatus && (
                <div style={{
                  marginTop: '1rem',
                  padding: '0.75rem',
                  borderRadius: '10px',
                  background: 'rgba(34, 197, 94, 0.1)',
                  border: '1px solid rgba(34, 197, 94, 0.3)',
                  color: '#4ADE80',
                  textAlign: 'center'
                }}>
                  {formStatus}
                </div>
              )}
            </form>
          </div>

          {/* Contact Info & Social Links */}
          <div>
            <div style={{
              background: 'rgba(255, 255, 255, 0.05)',
              backdropFilter: 'blur(10px)',
              borderRadius: '20px',
              padding: '2rem',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              marginBottom: '2rem'
            }}>
              <h3 style={{
                fontSize: '1.5rem',
                fontWeight: '600',
                marginBottom: '1.5rem',
                color: '#A78BFA'
              }}>
                Let's work together
              </h3>
              
              <p style={{
                color: '#CBD5E1',
                marginBottom: '2rem',
                lineHeight: 1.6
              }}>
                I'm always interested in new opportunities and exciting projects. 
                Whether you have a question or just want to say hi, I'll do my best 
                to get back to you!
              </p>

              <div style={{
                display: 'flex',
                gap: '1rem',
                marginBottom: '1rem'
              }}>
                <div style={{
                  padding: '0.75rem',
                  background: 'rgba(139, 92, 246, 0.1)',
                  borderRadius: '10px',
                  border: '1px solid rgba(139, 92, 246, 0.3)'
                }}>
                  📧
                </div>
                <div>
                  <div style={{ color: '#CBD5E1', fontSize: '0.9rem' }}>Email</div>
                  <div style={{ color: '#ffffff', fontWeight: '500' }}>padmaammuj@example.com</div>
                </div>
              </div>

              <div style={{
                display: 'flex',
                gap: '1rem'
              }}>
                <div style={{
                  padding: '0.75rem',
                  background: 'rgba(139, 92, 246, 0.1)',
                  borderRadius: '10px',
                  border: '1px solid rgba(139, 92, 246, 0.3)'
                }}>
                  📍
                </div>
                <div>
                  <div style={{ color: '#CBD5E1', fontSize: '0.9rem' }}>Location</div>
                  <div style={{ color: '#ffffff', fontWeight: '500' }}>Erode,Tamilnadu</div>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div style={{
              background: 'rgba(255, 255, 255, 0.05)',
              backdropFilter: 'blur(10px)',
              borderRadius: '20px',
              padding: '2rem',
              border: '1px solid rgba(255, 255, 255, 0.1)'
            }}>
              <h4 style={{
                fontSize: '1.25rem',
                fontWeight: '600',
                marginBottom: '1.5rem',
                color: '#A78BFA'
              }}>
                Follow Me
              </h4>
              
              <div style={{
                display: 'flex',
                gap: '1rem',
                flexWrap: 'wrap',
                background: "rgba(255, 255, 255, 0.05)",
                backdropFilter: 'blur(10px)',
                borderRadius: '15px',
                padding: '1.5rem 1rem',
                textAlign: 'center',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                transition: 'background 0.4s ease, transform 0.3s ease, border-color 0.4s ease',
                cursor: 'pointer',
                }}
                onMouseEnter={(e) => {
                e.currentTarget.style.background = 'linear-gradient(135deg, rgba(139,92,246,0.2), rgba(59,130,246,0.2))'; // Gradient on hover
                e.currentTarget.style.transform = 'translateY(-8px) skew(5deg, 5deg)'; // Lift + scale
                e.currentTarget.style.borderColor = 'rgba(139, 92, 246, 0.4)'; // Highlighted border
                }}
                onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)'; // Original
                e.currentTarget.style.transform = 'translateY(0) scale(1)'; // Reset
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)'; // Reset
                }}
              >
                {[
                  
                  { name: 'LinkedIn', icon: '💼', link: '#' },
                  { name: 'Twitter', icon: '🐦', link: '#' },
                  { name: 'Instagram', icon: '📷', link: '#' }
                ].map(social => (
                  <a
                    key={social.name}
                    href={social.link}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      padding: '0.75rem 1rem',
                      background: 'rgba(139, 92, 246, 0.1)',
                      borderRadius: '10px',
                      border: '1px solid rgba(139, 92, 246, 0.3)',
                      color: '#A78BFA',
                      textDecoration: 'none',
                      fontSize: '0.95rem',
                      fontWeight: '500',
                      transition: 'all 0.3s ease',
                      background: "rgba(255, 255, 255, 0.05)",
                      backdropFilter: 'blur(10px)',
                      borderRadius: '15px',
                      padding: '1.5rem 1rem',
                      textAlign: 'center',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      transition: 'background 0.4s ease, transform 0.3s ease, border-color 0.4s ease',
                      cursor: 'pointer',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'linear-gradient(135deg, rgba(139,92,246,0.2), rgba(59,130,246,0.2))'; // Gradient on hover
                      e.currentTarget.style.transform = 'translateY(-8px) skew(5deg, 5deg)'; // Lift + scale
                      e.currentTarget.style.borderColor = 'rgba(139, 92, 246, 0.4)'; // Highlighted border
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)'; // Original
                      e.currentTarget.style.transform = 'translateY(0) scale(1)'; // Reset
                      e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)'; // Reset
                    }}
                    
                  >
                    <span>{social.icon}</span>
                    {social.name}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{
        textAlign: 'center',
        padding: '2rem',
        borderTop: '1px solid rgba(255, 255, 255, 0.1)',
        marginTop: '3rem'
      }}>
        <p style={{
          color: '#CBD5E1',
          margin: 0
        }}>
          © 2025 Nishamugi. Built with React and ❤️
        </p>
      </footer>
    </div>
  )
}

export default App