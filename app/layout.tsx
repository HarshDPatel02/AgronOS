/**
 * @file layout.tsx
 * @path /app/layout.tsx
 * @project AgronOS - Precision Agriculture Platform
 * @description Root layout component injecting global CSS variables, HTML wrappers,
 *              and foundational metadata across all sub-routes.
 * @author AgronOS Engineering Team
 * @copyright © 2026 AgronOS Technologies Inc. All rights reserved.
 */

import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AgronOS | Precision Agriculture & Farm Management",
  description: "Enterprise regional soil analysis, crop recommendation, and multi-season rotation planning.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 min-h-screen">
        {children}
      </body>
    </html>
  );
}