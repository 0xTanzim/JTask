import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const colorMap: Record<string, { bg: string; light: string }> = {
  'text-blue-500': { bg: 'bg-blue-500', light: 'bg-blue-500/10' },
  'text-purple-500': { bg: 'bg-purple-500', light: 'bg-purple-500/10' },
  'text-green-500': { bg: 'bg-green-500', light: 'bg-green-500/10' },
  'text-orange-500': { bg: 'bg-orange-500', light: 'bg-orange-500/10' },
  'text-red-500': { bg: 'bg-red-500', light: 'bg-red-500/10' },
  'text-pink-500': { bg: 'bg-pink-500', light: 'bg-pink-500/10' },
  'text-cyan-500': { bg: 'bg-cyan-500', light: 'bg-cyan-500/10' },
  'text-yellow-500': { bg: 'bg-yellow-500', light: 'bg-yellow-500/10' },
};

export function getCategoryBg(textColor: string | undefined) {
  if (!textColor) return '';
  return colorMap[textColor]?.bg || '';
}

export function getCategoryLightBg(textColor: string | undefined) {
  if (!textColor) return '';
  return colorMap[textColor]?.light || '';
}
