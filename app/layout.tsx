import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = { title: 'Diego Lopes / Career Map', description: 'A visual career map for Diego Lopes, Principal Data & AI Engineer.' };
export default function RootLayout({ children }: Readonly<{children: React.ReactNode}>) { return <html lang="en"><body>{children}</body></html>; }
