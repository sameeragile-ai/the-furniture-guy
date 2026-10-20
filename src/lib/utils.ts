/**
 * Helper utilities for class names, UK validation, references, and calendar files
 */

export function cn(...classes: (string | boolean | undefined | null)[]): string {
  return classes.filter(Boolean).join(' ');
}

export function generateBookingRef(): string {
  const num = Math.floor(10000 + Math.random() * 90000);
  return `TFG-${num}`;
}

export function generateOrderRef(): string {
  const num = Math.floor(10000 + Math.random() * 90000);
  return `TFG-ORD-${num}`;
}

export function isValidUKPhone(phone: string): boolean {
  // Accepts standard UK formats (+44 or 07/01/02)
  const cleaned = phone.replace(/[\s\-()]/g, '');
  return /^((\+44)|(0))([1-9]\d{8,9})$/.test(cleaned);
}

export function isValidUKPostcode(postcode: string): boolean {
  const cleaned = postcode.trim().toUpperCase();
  return /^[A-Z]{1,2}[0-9][A-Z0-9]? ?[0-9][A-Z]{2}$/.test(cleaned);
}

export function getGoogleCalendarUrl(details: {
  title: string;
  description: string;
  location: string;
  dateStr: string; // YYYY-MM-DD
  timeStr: string; // HH:mm
}): string {
  const [hours, minutes] = details.timeStr.split(':');
  const start = new Date(`${details.dateStr}T${hours}:${minutes}:00`);
  const end = new Date(start.getTime() + 45 * 60 * 1000); // 45-minute appointment

  const formatIso = (date: Date) => date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';

  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: details.title,
    details: details.description,
    location: details.location,
    dates: `${formatIso(start)}/${formatIso(end)}`,
  });

  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

export function downloadIcsFile(details: {
  title: string;
  description: string;
  location: string;
  dateStr: string;
  timeStr: string;
  reference: string;
}) {
  const [hours, minutes] = details.timeStr.split(':');
  const start = new Date(`${details.dateStr}T${hours}:${minutes}:00`);
  const end = new Date(start.getTime() + 45 * 60 * 1000);

  const formatIso = (date: Date) => date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';

  const icsContent = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//The Furniture Guy//King of Bling Appointment//EN',
    'BEGIN:VEVENT',
    `UID:${details.reference}@thefurnitureguy.co.uk`,
    `DTSTAMP:${formatIso(new Date())}`,
    `DTSTART:${formatIso(start)}`,
    `DTEND:${formatIso(end)}`,
    `SUMMARY:${details.title}`,
    `DESCRIPTION:${details.description.replace(/\n/g, '\\n')}`,
    `LOCATION:${details.location}`,
    'STATUS:CONFIRMED',
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n');

  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
  const link = document.createElement('a');
  link.href = window.URL.createObjectURL(blob);
  link.setAttribute('download', `${details.reference}-appointment.ics`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
