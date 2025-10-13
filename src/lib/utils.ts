import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { enUS, fr } from 'date-fns/locale';
import { format as formatFn } from 'date-fns';



/**
 * Combines multiple class names into a single string.
 * Uses clsx for conditional class application and tailwind-merge to handle Tailwind CSS conflicts
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}


/**
 * Formats a price in FCFA currency format
 */
export function formatPrice(price: number): string {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "XAF",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
}


export function formatDate(date: string | Date | null | undefined, format: string = 'd MMMM yyyy', locale: string = 'en'): string {
    if (!date) return '';

    const localesMap: any = {
        fr,
        en: enUS,
    };
    return formatFn(new Date(date), format, { locale: localesMap[locale] });
}


export function pick(obj: any, keys: string | string[]) {
  if (Array.isArray(keys)) {
    const result : any = {};
    for (const key of keys) {
      if (key in obj) {
        result[key] = obj[key];
      }
    }
    return result;
  } else {
    return obj[keys];
  }
}

export const addNoneOption = (label: string, options: any) => {
  return [{ label: label, value: "" }, ...options];
};

export function generateRandomString(length = 8) {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * chars.length);
    result += chars[randomIndex];
  }

  return result;
}



// Modern colors array
export const colors = [
    '#F3C6B8', // Millennial Pink
    '#B7F0D4', // Neo Mint
    '#6B5B95', // Ultra Violet
    '#FF6F61', // Coral Reef
    '#FF5E3A', // Sunset Orange
    '#7FDBFF', // Aqua Sky
    '#9CAF88', // Sage Green
    '#36454F', // Charcoal Gray
    '#DCAE96', // Dusty Rose
    '#007FFF', // Electric Blue
    '#FFE5B4', // Peach Fuzz
    '#6B8E23', // Olive Drab
    '#E6E6FA', // Lavender Mist
    '#E2725B', // Terracotta
    '#008080', // Teal Tide
    '#4C6A92', // Cobalt Slate
    '#FFF1B5', // Buttercream Yellow
    '#B7410E', // Rust Red
    '#FF00FF', // Fuchsia Glow
    '#837060', // Mocha Latte
];

// Function to get first x colors, modulo 20
export function getFirstColors(x: number) {
    const result = [];
    const modulo = 20; // Wrap every 20 colors
    for (let i = 0; i < x; i++) {
        result.push(colors[i % modulo]);
    }
    return result;
}
// Example usage: