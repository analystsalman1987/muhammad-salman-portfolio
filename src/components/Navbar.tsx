import { useState } from 'react';
import { 
  FileText, 
  Menu, 
  X, 
  Sun, 
  Moon, 
  Monitor, 
  Lock, 
  Briefcase,
  ChevronRight
} from 'lucide-react';
import { ThemeMode } from '../types';

interface NavbarProps {
  currentTheme: ThemeMode;
  onThemeChange: (theme: ThemeMode) => void;
  onOpenCV: () => void;
  onOpenAdmin: () => void;
  isAdminLoggedIn?: boolean;
}

export function Navbar({
  currentTheme,
  onThemeChange,
  onOpenCV,
  onOpenAdmin,
  isAdminLoggedIn = false,
}: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const cycleTheme = () => {
    if (currentTheme === 'light') onThemeChange('dark');
    else if (currentTheme === 'dark') onThemeChange('system');
    else onThemeChange('light');
  };

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Experience', href: '#experience' },
    { name: 'Skills', href: '#skills' },
    { name: 'ERP & Software', href: '#software' },
    { name: 'Education', href: '#education' },
    { name: 'Contact', href: '#contact' },
  ];

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors duration-200 no-print">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Monogram & Name */}
          <a 
            href="#home" 
            className="flex items-center gap-3.5 group focus:outline-none focus:ring-2 focus:ring-[#0F766E] rounded-lg p-1"
          >
            <div className="w-11 h-11 rounded-lg bg-[#0F2747] border border-[#0F766E]/40 text-teal-300 font-bold flex items-center justify-center text-lg tracking-wider shadow-sm group-hover:border-[#0F766E] transition-all">
              MS
            </div>
            <div>
              <span className="block text-base font-bold text-[#0F2747] dark:text-slate-100 tracking-tight leading-none group-hover:text-[#0F766E] dark:group-hover:text-teal-400 transition-colors">
                Muhammad Salman
              </span>
              <span className="block text-xs font-medium text-[#64748B] dark:text-slate-400 mt-1">
                Accountant | MBA Finance
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => handleNavClick(link.href)}
                className="px-3 py-2 text-sm font-medium text-[#1F2937] hover:text-[#0F766E] dark:text-slate-300 dark:hover:text-teal-400 rounded-md transition-colors hover:bg-[#E6F4F1]/70 dark:hover:bg-slate-800/60"
              >
                {link.name}
              </button>
            ))}
          </nav>

          {/* Actions & Theme & CV */}
          <div className="hidden sm:flex items-center gap-2.5">
            {/* Theme switcher */}
            <button
              onClick={cycleTheme}
              className="p-2 text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors border border-transparent hover:border-slate-200 dark:hover:border-slate-700"
              title={`Theme: ${currentTheme} (click to cycle)`}
              aria-label="Toggle theme mode"
            >
              {currentTheme === 'light' && <Sun className="w-4 h-4 text-amber-500" />}
              {currentTheme === 'dark' && <Moon className="w-4 h-4 text-blue-400" />}
              {currentTheme === 'system' && <Monitor className="w-4 h-4 text-[#0F766E]" />}
            </button>

            {/* View CV button */}
            <button
              onClick={onOpenCV}
              className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-[#0F766E] dark:text-teal-300 bg-[#E6F4F1] dark:bg-teal-950/60 hover:bg-[#d5eee8] dark:hover:bg-teal-900/60 border border-[#0F766E]/30 dark:border-teal-800 rounded-lg transition-all shadow-xs"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>CV / Resume</span>
            </button>

            {/* Admin button */}
            <a
              href="/admin"
              onClick={(e) => {
                e.preventDefault();
                onOpenAdmin();
              }}
              className={`inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium rounded-lg transition-all border cursor-pointer ${
                isAdminLoggedIn
                  ? 'bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 border-amber-300 dark:border-amber-700'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
              title="Admin Panel"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>{isAdminLoggedIn ? 'Admin Active' : 'Admin'}</span>
            </a>
          </div>

          {/* Mobile hamburger button */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={cycleTheme}
              className="p-2 text-slate-600 dark:text-slate-300 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
              aria-label="Toggle theme"
            >
              {currentTheme === 'light' && <Sun className="w-4 h-4 text-amber-500" />}
              {currentTheme === 'dark' && <Moon className="w-4 h-4 text-blue-400" />}
              {currentTheme === 'system' && <Monitor className="w-4 h-4 text-emerald-500" />}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 pt-3 pb-6 space-y-2 shadow-xl animate-in slide-in-from-top duration-200">
          <div className="grid grid-cols-1 gap-1">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => handleNavClick(link.href)}
                className="flex items-center justify-between w-full px-3 py-2.5 text-left text-sm font-medium text-[#1F2937] dark:text-slate-200 hover:bg-[#E6F4F1]/60 dark:hover:bg-slate-800/80 hover:text-[#0F766E] rounded-md"
              >
                <span>{link.name}</span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </button>
            ))}
          </div>

          <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex flex-col gap-2.5">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenCV();
              }}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-[#0F766E] hover:bg-[#0c625c] text-white rounded-lg text-sm font-semibold shadow-xs"
            >
              <FileText className="w-4 h-4" />
              <span>View & Download CV</span>
            </button>

            <a
              href="/admin"
              onClick={(e) => {
                e.preventDefault();
                setMobileMenuOpen(false);
                onOpenAdmin();
              }}
              className="w-full flex items-center justify-center gap-2 px-4 py-2 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-medium hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
            >
              <Lock className="w-4 h-4" />
              <span>{isAdminLoggedIn ? 'Open Admin Dashboard' : 'Admin Login'}</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
