import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


// Function to store data with expiration time
export const setItemWithExpiry = (key: string, value: any, ttl: number) => {
  const now = new Date();
  const expiry = now.getTime() + ttl;
  const item = {
    value: value,
    expiry: expiry
  };
  localStorage.setItem(key, JSON.stringify(item));
};

// Function to retrieve data with expiration check
export const getItemWithExpiry = (key: string) => {
  const itemStr = localStorage.getItem(key);
  
  if (!itemStr) {
    return null;
  }
  
  const item = JSON.parse(itemStr);
  const now = new Date();
  
  if (now.getTime() > item.expiry) {
    localStorage.removeItem(key);
    return null;
  }
  
  return item.value;
};