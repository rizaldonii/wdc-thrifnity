import Link from "next/link";
import {
  Facebook,
  Instagram,
  Twitter,
  Mail,
  Phone,
  MapPin,
  ExternalLink,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative mt-auto bg-[var(--background-start-rgb)] dark:bg-[var(--color-accent)]">
      {/* Decorative top border */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[var(--color-primary)] via-[var(--color-secondary)] to-[var(--color-primary-light)]" />

      <div className="container mx-auto px-4 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* About Section */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-[var(--text-primary)] dark:text-[var(--text-primary)]">
              About Thrifnity
            </h3>
            <p className="text-[var(--text-secondary)] dark:text-[var(--text-secondary)] leading-relaxed">
              Platform sustainable fashion terbaik di Indonesia untuk belanja,
              repair, dan trade pakaian second-hand.
            </p>
            <div className="flex items-center gap-4 pt-4">
              <a
                href="https://facebook.com"
                className="group"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5 text-[var(--text-subtle)] transition-colors duration-300 group-hover:text-[var(--color-primary)]" />
              </a>
              <a
                href="https://instagram.com"
                className="group"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5 text-[var(--text-subtle)] transition-colors duration-300 group-hover:text-[var(--color-primary)]" />
              </a>
              <a
                href="https://twitter.com"
                className="group"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5 text-[var(--text-subtle)] transition-colors duration-300 group-hover:text-[var(--color-primary)]" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-[var(--text-primary)] dark:text-[var(--text-primary)]">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {[
                { href: "/shop", label: "Shop" },
                { href: "/repair", label: "Repair" },
                { href: "/trade", label: "Trade" },
                { href: "/about", label: "About Us" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="group flex items-center text-[var(--text-secondary)] dark:text-[var(--text-secondary)] transition-colors duration-300 hover:text-[var(--color-primary)] dark:hover:text-[var(--color-primary-light)]"
                  >
                    <ExternalLink className="w-4 h-4 mr-2 opacity-0 -translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-[var(--text-primary)] dark:text-[var(--text-primary)]">
              Contact
            </h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-[var(--text-secondary)] dark:text-[var(--text-secondary)]">
                <Mail className="w-5 h-5 text-[var(--color-primary)] dark:text-[var(--color-primary-light)]" />
                hello@thrifnity.com
              </li>
              <li className="flex items-center gap-3 text-[var(--text-secondary)] dark:text-[var(--text-secondary)]">
                <Phone className="w-5 h-5 text-[var(--color-primary)] dark:text-[var(--color-primary-light)]" />
                (021) 1234-5678
              </li>
              <li className="flex items-start gap-3 text-[var(--text-secondary)] dark:text-[var(--text-secondary)]">
                <MapPin className="w-5 h-5 text-[var(--color-primary)] dark:text-[var(--color-primary-light)]" />
                <span>Jakarta, Indonesia</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-[var(--text-primary)] dark:text-[var(--text-primary)]">
              Stay Updated
            </h3>
            <p className="text-[var(--text-secondary)] dark:text-[var(--text-secondary)]">
              Subscribe to our newsletter for updates and exclusive offers.
            </p>
            <div className="relative mt-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2 rounded-lg bg-white dark:bg-[var(--color-accent)] border border-[var(--color-primary)]/20 focus:border-[var(--color-primary)] dark:border-[var(--color-primary-light)]/20 dark:focus:border-[var(--color-primary-light)] transition-colors duration-300"
              />
              <button className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-1 bg-[var(--color-primary)] dark:bg-[var(--color-primary-light)] text-white rounded-md text-sm font-medium transition-colors duration-300 hover:bg-[var(--color-primary-dark)]">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-16 pt-8 border-t border-[var(--color-primary)]/10 dark:border-[var(--color-primary-light)]/10">
          <p className="text-center text-[var(--text-subtle)] dark:text-[var(--text-subtle)]">
            &copy; {new Date().getFullYear()} Thrifnity. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
