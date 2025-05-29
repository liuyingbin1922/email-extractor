import React from 'react';
import { Star } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface Testimonial {
  name: string;
  role: string;
  company: string;
  image: string;
  stars: number;
  content: string;
}

const testimonials: Testimonial[] = [
  {
    name: 'Emily Johnson',
    role: 'Marketing Director',
    company: 'GrowthPulse',
    image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150',
    stars: 5,
    content: 'This email extractor has been a game-changer for our outreach campaigns. It saves us hours of manual work and delivers clean, usable email lists every time.'
  },
  {
    name: 'Michael Chen',
    role: 'Recruiter',
    company: 'TalentSphere',
    image: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=150',
    stars: 5,
    content: 'As a recruiter, I deal with hundreds of resumes daily. This tool helps me quickly extract and organize candidate emails, making my workflow significantly more efficient.'
  },
  {
    name: 'Sarah Williams',
    role: 'Content Creator',
    company: 'DigitalNomad',
    image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150',
    stars: 4,
    content: 'I\'ve tried many email extractors, but this one stands out for its simplicity and effectiveness. The grouping by domain feature is especially useful for my newsletter campaigns.'
  },
  {
    name: 'David Rodriguez',
    role: 'Sales Manager',
    company: 'NexusConnect',
    image: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150',
    stars: 5,
    content: 'Our sales team relies on this tool daily. The ability to quickly extract, sort, and export emails has boosted our prospecting efficiency by at least 40%. Highly recommended!'
  }
];

const Testimonials: React.FC = () => {
  const { t } = useTranslation();

  const renderStars = (count: number) => {
    return Array(5)
      .fill(0)
      .map((_, i) => (
        <Star
          key={i}
          className={`h-5 w-5 ${
            i < count ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
          }`}
        />
      ));
  };

  return (
    <section id="testimonials" className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container-custom">
        <div className="mb-16 text-center">
          <h2 className="mb-4">{t('testi_title')}</h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-600 dark:text-gray-400">
            {t('testi_description')}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="card flex h-full flex-col transition-all duration-300 hover:shadow-lg"
            >
              <div className="mb-4 flex items-center">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="mr-4 h-12 w-12 rounded-full object-cover"
                />
                <div>
                  <h4 className="text-base font-semibold">{testimonial.name}</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {testimonial.role}, {testimonial.company}
                  </p>
                </div>
              </div>
              
              <div className="mb-4 flex">{renderStars(testimonial.stars)}</div>
              
              <p className="flex-grow text-gray-700 dark:text-gray-300">
                "{testimonial.content}"
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;