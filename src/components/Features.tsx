import React from 'react';
import { Mail, Filter, Download, Clock, ShieldCheck, Sparkles, Zap, Laptop } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const Features: React.FC = () => {
  const { t } = useTranslation();
  const features = [
    {
      icon: <Mail />,
      title: t('extractAllEmails'),
      description: t('extractAllEmailsDesc')
    },
    {
      icon: <Filter />,
      title: t('filterSort'),
      description: t('filterSortDesc')
    },
    {
      icon: <Download />,
      title: t('exportOptions'),
      description: t('exportOptionsDesc')
    },
    {
      icon: <Clock />,
      title: t('timeSaving'),
      description: t('timeSavingDesc')
    },
    {
      icon: <ShieldCheck />,
      title: t('privacyFocused'),
      description: t('privacyFocusedDesc')
    },
    {
      icon: <Sparkles />,
      title: t('cleanResults'),
      description: t('cleanResultsDesc')
    },
    {
      icon: <Zap />,
      title: t('lightningFast'),
      description: t('lightningFastDesc')
    },
    {
      icon: <Laptop />,
      title: t('worksEverywhere'),
      description: t('worksEverywhereDesc')
    }
  ];
  return (
    <section id="features" className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container-custom">
        <div className="mb-16 text-center">
          <h2 className="mb-4">{t('powerfulFeatures')}</h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-600 dark:text-gray-400">
            {t('featureSectionDesc')}
          </p>
        </div>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="card transform transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary-100 text-primary-600 dark:bg-primary-900/30 dark:text-primary-400">
                {feature.icon}
              </div>
              <h3 className="mb-3 text-xl font-semibold">{feature.title}</h3>
              <p className="text-gray-600 dark:text-gray-400">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;