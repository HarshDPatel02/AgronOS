/**
 * @file utils.ts
 * @path /lib/utils.ts
 * @project AgronOS - Precision Agriculture Platform
 * @description Helper utilities for Tailwind class concatenation, formatting, and data parsing.
 * @author AgronOS Engineering Team
 * @copyright © 2026 AgronOS Technologies Inc. All rights reserved.
 */

import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merges Tailwind classes cleanly without specificity collisions.
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

/**
 * Formats full location components into a standardized location display string.
 */
export function formatAddress(address: string, city: string, province: string, country: string): string {
  return `${address}, ${city}, ${province}, ${country}`;
}