import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = { title: 'GangHouse | Franchise Partnership', description: 'Explore the GangHouse franchise opportunity in Da Nang.' };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="en"><body>{children}</body></html>; }
