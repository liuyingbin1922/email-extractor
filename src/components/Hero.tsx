import React from 'react';
import { Mail, ArrowDown } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const Hero: React.FC = () => {
  const { t } = useTranslation();
  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="container-custom">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-4 inline-flex items-center rounded-full bg-primary-100 px-4 py-1.5 text-sm font-medium text-primary-800 dark:bg-primary-900/30 dark:text-primary-300">
            <span className="mr-2">✨</span>
            <span>{t('tagline')}</span>
          </div>
          
          <h1 className="mb-6 bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent dark:from-primary-400 dark:to-secondary-400">
            {t('appName')}
          </h1>
          
          <p className="mb-8 text-xl text-gray-600 dark:text-gray-300">
            {t('featureSectionDesc')}
          </p>
          
          <div className="flex flex-col items-center justify-center space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
            <a 
              href="#email-extractor" 
              className="btn btn-primary px-8 py-3"
            >
              <Mail className="mr-2 h-5 w-5" />
              {t('startExtracting')}
            </a>
            <a 
              href="#features" 
              className="btn btn-outline px-8 py-3"
            >
              {t('learnMore')}
            </a>
          </div>
        </div>
        
        <div className="mt-16 flex justify-center">
          <a
            href="#email-extractor"
            className="animate-bounce rounded-full bg-white p-2 shadow-lg dark:bg-gray-800"
            aria-label="Scroll down"
          >
            <ArrowDown className="h-6 w-6 text-primary-600 dark:text-primary-400" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;