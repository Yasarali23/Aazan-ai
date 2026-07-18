import React from 'react';
import type { Metadata } from 'next';
import '@/styles/globals.css';

export const metadata: Metadata = {
  title: 'Aazan AI - Enterprise Intelligence Engine',
  description: 'Advanced Multi-Agent Orchestration Platform & Collaborative Studio',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-background text-foreground antialiased min-h-screen selection:bg-primary/20">
        {children}
      </body>
    </html>
  );
}
