import React from 'react';
import { Mail, Github as GitHub, Twitter, Linkedin } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const Footer: React.FC = () => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 py-12 text-gray-300">
      <div className="container-custom">
        <div className="mb-8 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <h3 className="mb-4 text-xl font-bold text-white">{t('appName')}</h3>
            <p className="mb-4">
              {t('featureSectionDesc')}
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white" aria-label="GitHub">
                <GitHub size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white" aria-label="Twitter">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white" aria-label="LinkedIn">
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="mb-4 text-lg font-semibold text-white">{t('quickLinks')}</h4>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-white">{t('home')}</a></li>
              <li><a href="#features" className="hover:text-white">{t('features')}</a></li>
              <li><a href="#testimonials" className="hover:text-white">{t('testimonials')}</a></li>
              <li><a href="#faq" className="hover:text-white">{t('faq')}</a></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-lg font-semibold text-white">{t('resources')}</h4>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-white">{t('privacyPolicy')}</a></li>
              <li><a href="#" className="hover:text-white">{t('termsOfService')}</a></li>
              <li><a href="#" className="hover:text-white">{t('blog')}</a></li>
              <li><a href="#" className="hover:text-white">{t('support')}</a></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-lg font-semibold text-white">{t('contactUs')}</h4>
            <p className="mb-2 flex items-center">
              <Mail className="mr-2 h-5 w-5" />
              <a href="mailto:info@emailextractorpro.com" className="hover:text-white">
                info@emailextractorpro.com
              </a>
            </p>
            <p className="text-sm">
              {t('faqSectionDesc')}
            </p>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col items-center justify-between space-y-4 text-sm md:flex-row md:space-y-0">
            <p>{t('copyright', { year: currentYear })}</p>
            <div className="flex space-x-6">
              <a href="#" className="hover:text-white">{t('privacyPolicy')}</a>
              <a href="#" className="hover:text-white">{t('termsOfService')}</a>
              <a href="#" className="hover:text-white">{t('cookiePolicy')}</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;