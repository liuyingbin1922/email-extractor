import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

const faqItems: FAQItem[] = [
  {
    question: 'How does the Email Extractor tool work?',
    answer: 'Our Email Extractor tool uses advanced pattern matching to identify and extract email addresses from any text. Simply paste your text into the input field, click "Extract Emails," and the tool will automatically find all valid email addresses within the content.'
  },
  {
    question: 'Is there a limit to how much text I can process?',
    answer: 'The tool is designed to handle large volumes of text efficiently. However, browser performance may vary depending on your device. For extremely large texts (over 1MB), you might experience slight delays during processing.'
  },
  {
    question: 'Is my data safe when using this tool?',
    answer: 'Absolutely! All processing happens directly in your browser. We don\'t store, transmit, or have access to any of the text you paste. Your data never leaves your device, ensuring complete privacy and security.'
  },
  {
    question: 'Can I extract emails from a website using this tool?',
    answer: 'This tool is designed to extract emails from text that you provide. To extract emails from a website, you would need to copy the text content from the website and paste it into our tool. For advanced website scraping, you might need specialized solutions.'
  },
  {
    question: 'What format can I export the extracted emails in?',
    answer: 'You can choose from several separator options: comma, semicolon, new line, or space. Additionally, you can group emails by domain and sort them alphabetically. The extracted emails can be copied to clipboard or downloaded as a text file.'
  },
  {
    question: 'Will the tool remove duplicate emails?',
    answer: 'Yes, the Email Extractor automatically removes duplicate email addresses to ensure your results are clean and unique. This helps in maintaining high-quality email lists for your marketing or outreach efforts.'
  },
  {
    question: 'Can I use this tool on my mobile device?',
    answer: 'Yes, our Email Extractor tool is fully responsive and works on desktops, tablets, and mobile phones. You can extract emails on any device with a web browser.'
  },
  {
    question: 'Is this tool free to use?',
    answer: 'Yes, the Email Extractor tool is completely free to use with no limitations on the number of extractions or emails. We believe in providing useful tools to help streamline your workflow without any cost barriers.'
  }
];

const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-20">
      <div className="container-custom">
        <div className="mb-16 text-center">
          <h2 className="mb-4">Frequently Asked Questions</h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-600 dark:text-gray-400">
            Find answers to common questions about our Email Extractor tool
          </p>
        </div>

        <div className="mx-auto max-w-3xl divide-y divide-gray-200 rounded-xl bg-white shadow-md dark:divide-gray-700 dark:bg-gray-800">
          {faqItems.map((item, index) => (
            <div key={index} className="px-6 py-4">
              <button
                className="flex w-full items-center justify-between text-left focus:outline-none"
                onClick={() => toggleFAQ(index)}
                aria-expanded={openIndex === index}
              >
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                  {item.question}
                </h3>
                <span className="ml-6 flex-shrink-0 text-gray-500 dark:text-gray-400">
                  {openIndex === index ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </span>
              </button>
              {openIndex === index && (
                <div className="mt-3 pr-12">
                  <p className="text-base text-gray-600 dark:text-gray-400">{item.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;