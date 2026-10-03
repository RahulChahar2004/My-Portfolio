import './globals.css';
import LenisProvider from '@/components/LenisProvider';

export const metadata = {
  title: 'ROHNYROCKSTAR // Rahul Chahar — Portfolio Engine',
  description: 'Full-Stack Systems Architect & AI Engineer portfolio featuring an advanced 3D antigravity scrollytelling experience powered by Next.js 14, HTML5 Canvas, Tailwind CSS, Lenis, and Framer Motion.',
  icons: {
    icon: [
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    shortcut: '/icon.svg',
    apple: '/icon.svg',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark bg-[#050505]">
      <body className="bg-[#050505] text-white antialiased selection:bg-cyan-500 selection:text-black">
        <LenisProvider>{children}</LenisProvider>
      </body>
    </html>
  );
}

