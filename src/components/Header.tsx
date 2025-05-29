import React, { useState, useEffect } from 'react';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useTranslation } from 'react-i18next';

const LANGUAGES = [
  { code: 'en', label: 'English' },
  { code: 'zh-CN', label: '简体中文' },
  { code: 'zh-TW', label: '繁體中文' },
  { code: 'es', label: 'Español' },
  { code: 'de', label: 'Deutsch' },
  { code: 'pt', label: 'Português' },
];

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { i18n } = useTranslation();

  // Handle scroll effect for header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header 
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white shadow-md dark:bg-gray-800' 
          : 'bg-transparent dark:bg-transparent'
      }`}
    >
      <div className="container-custom flex h-16 items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          <a href="/" className="flex items-center">
            <span className="text-2xl font-bold text-primary-600 dark:text-primary-400">Email Extractor Pro</span>
          </a>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:block">
          <ul className="flex space-x-8">
            <li><a href="#features" className="font-medium text-gray-700 hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400">Features</a></li>
            <li><a href="#faq" className="font-medium text-gray-700 hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400">FAQ</a></li>
            <li><a href="#testimonials" className="font-medium text-gray-700 hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400">Testimonials</a></li>
          </ul>
        </nav>

        {/* Language Switcher */}
        <div className="flex items-center">
          <select
            className="mr-4 rounded border px-2 py-1 text-sm bg-white dark:bg-gray-800 dark:text-gray-100"
            value={i18n.language}
            onChange={e => i18n.changeLanguage(e.target.value)}
            aria-label="Select language"
          >
            {LANGUAGES.map(lang => (
              <option key={lang.code} value={lang.code}>{lang.label}</option>
            ))}
          </select>
          <button
            onClick={toggleTheme}
            className="mr-4 rounded-full p-2 text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700"
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          
          <button
            className="block rounded p-1 text-gray-700 hover:bg-gray-100 md:hidden dark:text-gray-300 dark:hover:bg-gray-700"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="absolute left-0 right-0 bg-white px-4 py-2 shadow-lg md:hidden dark:bg-gray-800 animate-slide-down">
          <nav>
            <ul className="space-y-4 py-4">
              <li><a href="#features" className="block py-2 font-medium text-gray-700 hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400" onClick={toggleMenu}>Features</a></li>
              <li><a href="#faq" className="block py-2 font-medium text-gray-700 hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400" onClick={toggleMenu}>FAQ</a></li>
              <li><a href="#testimonials" className="block py-2 font-medium text-gray-700 hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400" onClick={toggleMenu}>Testimonials</a></li>
            </ul>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;