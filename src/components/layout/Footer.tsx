import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { Phone, Mail, MapPin, MessageCircle } from 'lucide-react';
import Container from '@/components/ui/Container';

export default function Footer() {
  const t = useTranslations('footer');
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-brand-black text-white">
      <Container>
        <div className="py-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Column 1: Logo + Description + Social */}
          <div className="space-y-4">
            <span className="text-2xl font-heading font-bold tracking-wider">
              HYPPO <span className="text-brand-orange">MOBILE</span>
            </span>
            <p className="text-brand-gray-300 text-sm leading-relaxed mt-3">
              {t('description')}
            </p>
            <div className="flex items-center gap-3 pt-2">
              {/* Placeholder social icons */}
              {['facebook', 'instagram', 'linkedin', 'twitter'].map((social) => (
                <a
                  key={social}
                  href="#"
                  aria-label={social}
                  className="w-9 h-9 flex items-center justify-center rounded-full bg-brand-gray-800 text-brand-gray-300 hover:bg-brand-orange hover:text-white transition-all duration-200"
                >
                  <span className="text-xs font-bold uppercase">
                    {social[0]}
                  </span>
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-brand-gray-300 mb-4">
              {t('company')}
            </h3>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="text-sm text-white/70 hover:text-brand-orange transition-colors">
                  {t('aboutUs')}
                </Link>
              </li>
              <li>
                <Link href="/fleet" className="text-sm text-white/70 hover:text-brand-orange transition-colors">
                  {t('ourFleet')}
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-sm text-white/70 hover:text-brand-orange transition-colors">
                  {t('careers')}
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-sm text-white/70 hover:text-brand-orange transition-colors">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Services */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-brand-gray-300 mb-4">
              {t('services')}
            </h3>
            <ul className="space-y-3">
              <li>
                <Link href="/services" className="text-sm text-white/70 hover:text-brand-orange transition-colors">
                  {t('airportTransfers')}
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-sm text-white/70 hover:text-brand-orange transition-colors">
                  {t('hourlyChauffeur')}
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-sm text-white/70 hover:text-brand-orange transition-colors">
                  {t('customJourneys')}
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-sm text-white/70 hover:text-brand-orange transition-colors">
                  {t('corporateTravel')}
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-sm text-white/70 hover:text-brand-orange transition-colors">
                  {t('weddingService')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact Info */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-brand-gray-300 mb-4">
              {t('contact')}
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin className="h-4 w-4 text-brand-orange mt-0.5 shrink-0" />
                <span className="text-sm text-white/70">
                  {t('address')}
                  <br />
                  {t('city')}
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-brand-orange shrink-0" />
                <a href="tel:+33123456789" className="text-sm text-white/70 hover:text-brand-orange transition-colors">
                  {t('phone')}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-brand-orange shrink-0" />
                <a href="mailto:contact@hyppomobile.com" className="text-sm text-white/70 hover:text-brand-orange transition-colors">
                  {t('email')}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <MessageCircle className="h-4 w-4 text-brand-orange shrink-0" />
                <a href="https://wa.me/33612345678" target="_blank" rel="noopener noreferrer" className="text-sm text-white/70 hover:text-brand-orange transition-colors">
                  WhatsApp
                </a>
              </li>
            </ul>
          </div>
        </div>
      </Container>

      {/* Bottom Bar */}
      <div className="border-t border-brand-gray-800">
        <Container>
          <div className="py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-brand-gray-300">
            <p>&copy; {currentYear} {t('copyright')}</p>
            <div className="flex items-center gap-6">
              <Link href="/terms" className="hover:text-brand-orange transition-colors">
                {t('termsConditions')}
              </Link>
              <Link href="/privacy" className="hover:text-brand-orange transition-colors">
                {t('privacyPolicy')}
              </Link>
            </div>
          </div>
        </Container>
      </div>
    </footer>
  );
}
