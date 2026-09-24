import { useState, useEffect } from 'react';
import { useAppData } from './hooks/useAppData';
import { useTheme } from './hooks/useTheme';
import { storageService } from './services/storageService';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Highlights } from './components/Highlights';
import { About } from './components/About';
import { Expertise } from './components/Expertise';
import { Experience } from './components/Experience';
import { Skills } from './components/Skills';
import { Software } from './components/Software';
import { EducationLanguages } from './components/Education';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { CVModal } from './components/CVModal';
import { AdminLogin } from './components/admin/AdminLogin';
import { AdminDashboard } from './components/admin/AdminDashboard';

export default function App() {
  const { 
    data, 
    updateData, 
    resetData, 
    messages, 
    addContactMessage, 
    deleteContactMessage, 
    clearContactMessages 
  } = useAppData();

  const { theme, setTheme } = useTheme();

  // Navigation & CV Modal state
  const [isCVOpen, setIsCVOpen] = useState(false);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(() => storageService.isAdminLoggedIn());

  const checkIsAdminRoute = () => {
    if (typeof window === 'undefined') return false;
    const path = window.location.pathname.toLowerCase();
    const hash = window.location.hash.toLowerCase();
    const search = window.location.search.toLowerCase();
    return (
      path === '/admin' || 
      path.startsWith('/admin/') || 
      hash === '#admin' || 
      hash === '#/admin' || 
      hash.includes('admin') ||
      search.includes('admin')
    );
  };

  const [currentRoute, setCurrentRoute] = useState<'home' | 'admin'>(() => {
    return checkIsAdminRoute() ? 'admin' : 'home';
  });

  // State for Experience main navigation selection & subtle background test effect
  const [isExperienceSelected, setIsExperienceSelected] = useState<boolean>(() => {
    return typeof window !== 'undefined' && window.location.hash === '#experience';
  });

  const handleNavSelect = (href: string) => {
    if (href === '#experience') {
      setIsExperienceSelected(true);
    } else {
      setIsExperienceSelected(false);
    }
  };

  // Listen to popstate and hashchange events for browser back/forward and direct navigation
  useEffect(() => {
    const handleLocationChange = () => {
      if (checkIsAdminRoute()) {
        setCurrentRoute('admin');
      } else {
        setCurrentRoute('home');
      }
      if (window.location.hash === '#experience') {
        setIsExperienceSelected(true);
      }
    };

    window.addEventListener('popstate', handleLocationChange);
    window.addEventListener('hashchange', handleLocationChange);

    // Observe Experience section for scroll-based detection
    const expEl = document.getElementById('experience');
    let observer: IntersectionObserver | null = null;
    if (expEl && 'IntersectionObserver' in window) {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && entry.intersectionRatio >= 0.25) {
              setIsExperienceSelected(true);
            }
          });
        },
        { threshold: [0.25] }
      );
      observer.observe(expEl);
    }

    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      window.removeEventListener('hashchange', handleLocationChange);
      if (observer && expEl) {
        observer.unobserve(expEl);
      }
    };
  }, [currentRoute]);

  const navigateToAdmin = () => {
    setCurrentRoute('admin');
    try {
      window.history.pushState({ route: 'admin' }, '', '/admin');
    } catch {
      window.location.hash = '#admin';
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToHome = () => {
    setCurrentRoute('home');
    try {
      window.history.pushState({ route: 'home' }, '', '/');
    } catch {
      window.location.hash = '';
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAdminLoginSuccess = () => {
    setIsAdminLoggedIn(true);
  };

  const handleAdminLogout = () => {
    storageService.logoutAdmin();
    setIsAdminLoggedIn(false);
    navigateToHome();
  };

  // If on /admin route: render dedicated Admin View directly
  if (currentRoute === 'admin') {
    return (
      <div className="min-h-screen bg-slate-100 text-slate-900 dark:bg-slate-950 dark:text-slate-100 transition-colors duration-200">
        {isAdminLoggedIn ? (
          <AdminDashboard
            data={data}
            onUpdateData={updateData}
            onResetData={resetData}
            messages={messages}
            onDeleteMessage={deleteContactMessage}
            onClearMessages={clearContactMessages}
            onClose={navigateToHome}
            onLogout={handleAdminLogout}
            isFullPage={true}
          />
        ) : (
          <AdminLogin
            onSuccess={handleAdminLoginSuccess}
            onCancel={navigateToHome}
            isFullPage={true}
          />
        )}
      </div>
    );
  }

  // Otherwise render public profile website
  const { settings, profile, highlights, expertise, experience, skills, software, education, languages } = data;
  const visibility = settings.sectionVisibility || {
    hero: true,
    about: true,
    highlights: true,
    expertise: true,
    experience: true,
    skills: true,
    software: true,
    education: true,
    languages: true,
    cv: true,
    contact: true,
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F4F6F8] text-[#1F2937] dark:bg-slate-950 dark:text-slate-100 transition-colors duration-200">
      
      {/* Top Navigation */}
      <Navbar
        currentTheme={theme}
        onThemeChange={setTheme}
        onOpenCV={() => setIsCVOpen(true)}
        onOpenAdmin={navigateToAdmin}
        isAdminLoggedIn={isAdminLoggedIn}
        isExperienceSelected={isExperienceSelected}
        onSelectNav={handleNavSelect}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* Hero Section */}
        {visibility.hero && (
          <Hero 
            profile={profile} 
            onOpenCV={() => setIsCVOpen(true)} 
            onSelectExperience={() => setIsExperienceSelected(true)}
          />
        )}

        {/* Highlights Section */}
        {visibility.highlights && (
          <Highlights highlights={highlights} />
        )}

        {/* About Section */}
        {visibility.about && (
          <About profile={profile} />
        )}

        {/* Accounting & Finance Expertise */}
        {visibility.expertise && (
          <Expertise expertise={expertise} />
        )}

        {/* Work Experience Timeline */}
        {visibility.experience && (
          <Experience 
            experience={experience} 
            isSelected={isExperienceSelected}
            onToggleSelect={() => setIsExperienceSelected(!isExperienceSelected)}
          />
        )}

        {/* Categorized Skills */}
        {visibility.skills && (
          <Skills skills={skills} />
        )}

        {/* ERP & Software Section */}
        {visibility.software && (
          <Software software={software} />
        )}

        {/* Education & Languages */}
        {(visibility.education || visibility.languages) && (
          <EducationLanguages
            education={visibility.education ? education : []}
            languages={visibility.languages ? languages : []}
          />
        )}

        {/* Contact Section */}
        {visibility.contact && (
          <Contact
            profile={profile}
            onSendMessage={addContactMessage}
          />
        )}
      </main>

      {/* Corporate Footer */}
      <Footer
        profile={profile}
        onOpenAdmin={navigateToAdmin}
        onOpenCV={() => setIsCVOpen(true)}
      />

      {/* Printable CV Modal */}
      <CVModal
        isOpen={isCVOpen}
        onClose={() => setIsCVOpen(false)}
        data={data}
      />

    </div>
  );
}
