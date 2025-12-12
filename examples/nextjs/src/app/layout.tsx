import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'ParticleText.js - Next.js Example',
  description: 'Interactive particle text animation built with Next.js',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
