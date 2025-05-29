interface ExtractedEmail {
  email: string;
  valid: boolean;
}

/**
 * Extract email addresses from a text string
 * @param text - The text to extract emails from
 * @returns Array of extracted emails with validation status
 */
export function extractEmails(text: string): ExtractedEmail[] {
  if (!text) return [];

  // Regular expression for email matching
  // This regex is designed to match most common email formats
  const emailRegex = /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi;
  
  // Extract all matches
  const matches = text.match(emailRegex) || [];
  
  // Remove duplicates
  const uniqueEmails = [...new Set(matches.map(email => email.toLowerCase()))];
  
  // Validate each email and create result objects
  return uniqueEmails.map(email => ({
    email,
    valid: validateEmail(email)
  }));
}

/**
 * Validate an email address using a more strict regex
 * @param email - The email address to validate
 * @returns Boolean indicating if the email is valid
 */
function validateEmail(email: string): boolean {
  // More strict regex for validation
  const strictEmailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return strictEmailRegex.test(email);
}

/**
 * Groups emails by domain
 * @param emails - Array of email objects
 * @returns Object with domains as keys and arrays of emails as values
 */
export function groupEmailsByDomain(emails: ExtractedEmail[]): Record<string, string[]> {
  const groups: Record<string, string[]> = {};
  
  emails.forEach(({ email }) => {
    const domain = email.split('@')[1];
    if (!groups[domain]) {
      groups[domain] = [];
    }
    groups[domain].push(email);
  });
  
  return groups;
}