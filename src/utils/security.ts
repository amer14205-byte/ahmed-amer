// Security and Anti-Scraping / Sanitization Utilities

/**
 * SHA-256 Hasher using Web Crypto API
 * Converts plain text string into SHA-256 hex digest
 */
export async function hashText(plainText: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(plainText);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
}

/**
 * Sanitizes input text to prevent XSS (Cross Site Scripting) and HTML Injection
 */
export function sanitizeInput(str: string): string {
  if (!str) return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;')
    .replace(/javascript:/gi, '')
    .replace(/onerror=/gi, '')
    .replace(/onload=/gi, '');
}

/**
 * Known hash for default password '19981988'
 */
export const DEFAULT_ADMIN_HASH = '1f6da21b4a3a60a77fa42d7634f19b165b4c4fa6132bc29ffbf7db0ef7f7a750';
