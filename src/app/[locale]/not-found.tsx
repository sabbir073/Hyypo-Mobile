import { Search, Home, ArrowLeft } from 'lucide-react';
import Container from '@/components/ui/Container';
import { Link } from '@/i18n/navigation';

export default function NotFound() {
  return (
    <section className="min-h-[70vh] flex items-center justify-center bg-white">
      <Container>
        <div className="text-center max-w-lg mx-auto py-16">
          {/* Decorative 404 illustration */}
          <div className="relative mb-8">
            <div className="text-[10rem] md:text-[14rem] font-heading font-bold text-brand-gray-100 leading-none select-none">
              404
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-20 h-20 bg-brand-orange/10 rounded-full flex items-center justify-center">
                <Search className="w-10 h-10 text-brand-orange" />
              </div>
            </div>
          </div>

          <h1 className="font-heading text-3xl md:text-4xl font-bold text-brand-black mb-4">
            Page Not Found
          </h1>
          <p className="text-brand-gray-300 text-lg mb-8 leading-relaxed">
            The page you are looking for does not exist or has been moved. Let us help you find your way.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-brand-orange text-white font-semibold rounded-xl hover:bg-brand-orange-dark transition-colors duration-300"
            >
              <Home className="w-5 h-5" />
              Go Home
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-brand-orange text-brand-orange font-semibold rounded-xl hover:bg-brand-orange hover:text-white transition-all duration-300"
            >
              <ArrowLeft className="w-5 h-5" />
              Contact Us
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
