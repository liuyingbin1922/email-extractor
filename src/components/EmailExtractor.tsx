import React, { useState, useRef, useEffect } from 'react';
import { Copy, Download, RefreshCw, Check, AlertCircle } from 'lucide-react';
import { extractEmails } from '../utils/emailExtractor';
import { useTranslation } from 'react-i18next';

interface ExtractedEmail {
  email: string;
  valid: boolean;
}

const EmailExtractor: React.FC = () => {
  const { t } = useTranslation();
  const [inputText, setInputText] = useState('');
  const [extractedEmails, setExtractedEmails] = useState<ExtractedEmail[]>([]);
  const [separator, setSeparator] = useState('comma');
  const [groupByDomain, setGroupByDomain] = useState(false);
  const [sortAlphabetically, setSortAlphabetically] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const outputRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Reset copied state after 2 seconds
  useEffect(() => {
    if (copied) {
      const timer = setTimeout(() => setCopied(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [copied]);

  const handleExtract = () => {
    if (!inputText.trim()) return;

    setIsProcessing(true);
    
    // Using setTimeout to avoid blocking UI during extraction
    setTimeout(() => {
      const emails = extractEmails(inputText);
      setExtractedEmails(emails);
      setIsProcessing(false);
    }, 100);
  };

  const handleReset = () => {
    setInputText('');
    setExtractedEmails([]);
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  };

  const getOutputText = () => {
    if (extractedEmails.length === 0) return '';

    let emails = [...extractedEmails];

    if (sortAlphabetically) {
      emails.sort((a, b) => a.email.localeCompare(b.email));
    }

    if (groupByDomain) {
      // Group by domain and then return formatted text
      const domainGroups: Record<string, ExtractedEmail[]> = {};
      
      emails.forEach(item => {
        const domain = item.email.split('@')[1];
        if (!domainGroups[domain]) {
          domainGroups[domain] = [];
        }
        domainGroups[domain].push(item);
      });

      return Object.entries(domainGroups)
        .map(([domain, emailList]) => {
          return `@${domain}\n${emailList.map(e => e.email).join(getSeparatorString())}`;
        })
        .join('\n\n');
    }

    return emails.map(e => e.email).join(getSeparatorString());
  };

  const getSeparatorString = () => {
    switch (separator) {
      case 'comma': return ', ';
      case 'semicolon': return '; ';
      case 'newline': return '\n';
      case 'space': return ' ';
      default: return ', ';
    }
  };

  const handleCopy = async () => {
    const text = getOutputText();
    if (!text) return;

    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const handleDownload = () => {
    const text = getOutputText();
    if (!text) return;

    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'extracted-emails.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const ext = file.name.split('.').pop()?.toLowerCase();
    if (ext === 'txt') {
      const reader = new FileReader();
      reader.onload = (event) => {
        const text = event.target?.result as string;
        setInputText(text || '');
      };
      reader.readAsText(file);
    } else if (ext === 'docx') {
      const reader = new FileReader();
      reader.onload = async (event) => {
        const arrayBuffer = event.target?.result as ArrayBuffer;
        try {
          const mammoth = await import('mammoth');
          const result = await mammoth.extractRawText({ arrayBuffer });
          setInputText(result.value || '');
        } catch (err) {
          setInputText('');
          alert('Failed to parse DOCX file.');
        }
      };
      reader.readAsArrayBuffer(file);
    } else if (ext === 'doc') {
      alert('Sorry, .doc files are not supported. Please save as .docx and upload again.');
    } else {
      alert('Unsupported file type.');
    }
  };

  return (
    <section id="email-extractor" className="py-16">
      <div className="container-custom">
        <div className="mx-auto max-w-4xl">
          <div className="mb-10 text-center">
            <h2 className="mb-4">{t('emailExtractor.title')}</h2>
            <p className="text-gray-600 dark:text-gray-400">
              {t('emailExtractor.description')}
            </p>
          </div>

          <div className="card">
            <div className="mb-6">
              <label htmlFor="input-text" className="mb-2 block font-medium">
                {t('emailExtractor.inputLabel')}
              </label>
              <textarea
                ref={textareaRef}
                id="input-text"
                className="input min-h-[200px] font-mono"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder={t('emailExtractor.placeholder')}
              ></textarea>
            </div>

            <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <label htmlFor="separator" className="mb-2 block font-medium">
                  {t('emailExtractor.separatorLabel')}
                </label>
                <select
                  id="separator"
                  className="select"
                  value={separator}
                  onChange={(e) => setSeparator(e.target.value)}
                >
                  <option value="comma">{t('emailExtractor.comma')}</option>
                  <option value="semicolon">{t('emailExtractor.semicolon')}</option>
                  <option value="newline">{t('emailExtractor.newline')}</option>
                  <option value="space">{t('emailExtractor.space')}</option>
                </select>
              </div>

              <div className="flex items-center space-x-6">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="group-by-domain"
                    className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                    checked={groupByDomain}
                    onChange={(e) => setGroupByDomain(e.target.checked)}
                  />
                  <label htmlFor="group-by-domain" className="ml-2 font-medium">
                    {t('emailExtractor.groupByDomain')}
                  </label>
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="sort-alphabetically"
                    className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                    checked={sortAlphabetically}
                    onChange={(e) => setSortAlphabetically(e.target.checked)}
                  />
                  <label htmlFor="sort-alphabetically" className="ml-2 font-medium">
                    {t('emailExtractor.sortAlphabetically')}
                  </label>
                </div>
              </div>
            </div>

            <div className="mb-6 flex flex-wrap gap-3">
              <button 
                className="btn btn-primary"
                onClick={handleExtract}
                disabled={isProcessing || !inputText.trim()}
              >
                {isProcessing ? (
                  <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  t('emailExtractor.extractEmails')
                )}
              </button>
              
              <button 
                className="btn btn-outline"
                onClick={handleReset}
              >
                {t('emailExtractor.reset')}
              </button>
            </div>

            <div className="mb-6 flex items-center space-x-4">
              <input
                type="file"
                accept=".txt,.doc,.docx"
                ref={fileInputRef}
                style={{ display: 'none' }}
                onChange={handleFileChange}
              />
              <button
                type="button"
                className="btn btn-outline"
                onClick={() => fileInputRef.current?.click()}
              >
                {t('emailExtractor.uploadFile')}
              </button>
              <span className="text-sm text-gray-500">{t('emailExtractor.supportedFileTypesDoc')}</span>
            </div>

            {extractedEmails.length > 0 && (
              <div>
                <div className="mb-2 flex items-center justify-between">
                  <label htmlFor="output-text" className="font-medium">
                    {t('emailExtractor.extractedEmails', { count: extractedEmails.length })}
                  </label>
                  <div className="flex space-x-2">
                    <button
                      onClick={handleCopy}
                      className="btn btn-outline py-1"
                      aria-label={t('emailExtractor.copyToClipboard')}
                    >
                      {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    </button>
                    <button
                      onClick={handleDownload}
                      className="btn btn-outline py-1"
                      aria-label="Download as text file"
                    >
                      <Download className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                <textarea
                  ref={outputRef}
                  id="output-text"
                  className="input min-h-[150px] font-mono"
                  value={getOutputText()}
                  readOnly
                ></textarea>
              </div>
            )}

            {extractedEmails.length === 0 && inputText.trim() && !isProcessing && (
              <div className="rounded-lg bg-warning-50 p-4 text-warning-800 dark:bg-warning-900/30 dark:text-warning-300">
                <div className="flex">
                  <AlertCircle className="mr-2 h-5 w-5 flex-shrink-0" />
                  <p>No email addresses found in the provided text.</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default EmailExtractor;