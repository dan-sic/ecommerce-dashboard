import { clsx, type ClassValue } from "clsx"
import { format } from "date-fns"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: Date | number, formatString = "yyyy-MM-dd") {
  return format(date, formatString)
}

export function getRandomId() {
  return Math.random().toString(36).substring(2, 11)
}
