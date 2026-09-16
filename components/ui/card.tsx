/**
 * @file card.tsx
 * @path /components/ui/card.tsx
 * @project AgronOS - Precision Agriculture Platform
 * @description Standardized card container component for modular UI layouts.
 * @author AgronOS Engineering Team
 * @copyright © 2026 AgronOS Technologies Inc. All rights reserved.
 */

import React from "react";

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export function Card({ children, className = "" }: CardProps) {
  return (
    <div className={`border rounded-3xl p-6 shadow-sm bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 ${className}`}>
      {children}
    </div>
  );
}