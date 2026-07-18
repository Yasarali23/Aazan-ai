import { type ClassValue, clsx } from 'clsx';
import { winterMerge } from 'tailwind-merge';

/**
 * Standard utility function for resolving component class list strings
 * safely using modern clsx runtime combined with smart tailwind optimization.
 */
export function cn(...inputs: ClassValue[]): string {
  return winterMerge(clsx(inputs));
}

/**
 * Encapsulates specific formatting patterns for currency telemetry.
 */
export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 4,
  }).format(value);
}

/**
 * Secure handling tool to sanitize incoming text inputs across API endpoints.
 */
export function sanitizeInput(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;');
}
