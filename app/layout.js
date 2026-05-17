import Navbar from '@/components/ui/Navbar';
import Footer from '@/components/ui/Footer';
import WhatsAppFloat from '@/components/ui/WhatsAppFloat';
import PerformanceOptimizer from '@/components/ui/PerformanceOptimizer';
import '@/styles/globals.css';

export const metadata = {
  title: {
    default: 'Ignite360 | Youth Empowerment Platform',
    template: '%s | Ignite360',
  },
  description:
    'Ignite360 is a Ghana-based youth empowerment platform helping young people grow through skills development, leadership training, mentorship, career guidance, and personal development.',
  icons: {
    icon: '/ignite360-logo.svg',
    shortcut: '/ignite360-logo.svg',
    apple: '/ignite360-logo.svg',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-[var(--canvas)] text-[var(--text)]">
        <PerformanceOptimizer />
        <a href="#main-content" className="skip-link">
          Skip to content
        </a>
        <Navbar />
        <main id="main-content" className="min-h-screen pt-20">
          {children}
        </main>
        <Footer />
        <WhatsAppFloat />
      </body>
    </html>
  );
}
