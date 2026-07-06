import Link from "next/link";
import Image from "next/image";
import { Mail, Phone, MapPin, HelpCircle } from "lucide-react";
import { ScrollVelocity } from "@/components/animations/ScrollVelocity";

const LinkedinIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

export default function Footer() {
  return (
    <>
      {/* Global ScrollVelocity Marquee Footer Banner */}
      <div className="bg-navy-900 border-t border-gold-500/10 py-6 overflow-hidden">
        <ScrollVelocity
          texts={["EXECUTIVE SEARCH • BFSI PLACEMENTS • AI RECRUITMENT • CLOUD ARCHITECTS • TECH STAFFING •"]}
          velocity={20}
          className="text-white/10 hover:text-white/30 text-xl font-black uppercase tracking-widest cursor-default transition-colors duration-300"
        />
      </div>
      <footer className="bg-navy-800 text-slate-300 border-t border-slate-900">
      {/* Upper Footer section */}
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-4 md:grid-cols-2">
          {/* Brand Info */}
          <div className="flex flex-col gap-4">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative h-12 w-12 overflow-hidden rounded-lg bg-white p-0.5">
                <Image
                  src="/logo.jpeg"
                  alt="DSS Talent Bridge Logo"
                  fill
                  sizes="48px"
                  className="object-contain"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold tracking-tight text-white">
                  DSS <span className="text-gold-500 font-extrabold">Talent Bridge</span>
                </span>
                <span className="text-[9px] font-semibold uppercase tracking-widest text-slate-400">
                  HR Advisory & Staffing
                </span>
              </div>
            </Link>
            <p className="mt-4 text-sm text-slate-400 leading-relaxed">
              Bridging the gap between exceptional talent and exceptional organizations through innovative, reliable, and people-centric recruitment solutions.
            </p>
            <div className="flex gap-4 mt-2">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-gold-500 transition-colors p-2 rounded-full bg-slate-800/50 hover:bg-slate-800"
                aria-label="LinkedIn"
              >
                <LinkedinIcon className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Core Services */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white border-l-2 border-gold-500 pl-3 mb-6">
              Our Services
            </h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/hire" className="hover:text-gold-500 transition-colors">
                  Permanent Hiring
                </Link>
              </li>
              <li>
                <Link href="/hire" className="hover:text-gold-500 transition-colors">
                  Contract Staffing
                </Link>
              </li>
              <li>
                <Link href="/hire" className="hover:text-gold-500 transition-colors">
                  Leadership Hiring
                </Link>
              </li>
              <li>
                <Link href="/hire" className="hover:text-gold-500 transition-colors">
                  Project-Based Recruitment
                </Link>
              </li>
              <li>
                <Link href="/hire" className="hover:text-gold-500 transition-colors">
                  Customized Talent Solutions
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white border-l-2 border-gold-500 pl-3 mb-6">
              Quick Links
            </h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/" className="hover:text-gold-500 transition-colors">
                  Home / About Us
                </Link>
              </li>
              <li>
                <Link href="/jobs" className="hover:text-gold-500 transition-colors">
                  Browse Jobs (Candidates)
                </Link>
              </li>
              <li>
                <Link href="/hire" className="hover:text-gold-500 transition-colors">
                  Hiring Portal (Companies)
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-gold-500 transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <a href="#faq" className="hover:text-gold-500 transition-colors">
                  FAQ Page
                </a>
              </li>
            </ul>
          </div>

          {/* Locations & Contact */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white border-l-2 border-gold-500 pl-3 mb-6">
              Locations & Contact
            </h3>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-gold-500 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-white block">Bangalore Office:</span>
                  <span className="text-slate-400 text-xs">
                    Outer Ring Road, Tech Corridor, Bangalore, KA, India
                  </span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-gold-500 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-white block">Nagpur Office:</span>
                  <span className="text-slate-400 text-xs">
                    IT Park, Gayatri Nagar, Nagpur, MH, India
                  </span>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-gold-500 shrink-0" />
                <a href="mailto:info@dsstalentbridge.com" className="hover:text-gold-500 transition-colors">
                  info@dsstalentbridge.com
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-gold-500 shrink-0" />
                <a href="tel:+919876543210" className="hover:text-gold-500 transition-colors">
                  +91 98765 43210
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Footer Section */}
      <div className="border-t border-slate-900 py-8 bg-slate-950/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 md:flex md:items-center md:justify-between">
          <p className="text-center text-xs text-slate-500 md:text-left">
            &copy; {new Date().getFullYear()} DSS Talent Bridge. All rights reserved.
          </p>
          <div className="mt-4 flex justify-center space-x-4 md:mt-0 items-center">
            <Link href="/privacy" className="text-xs text-slate-500 hover:text-gold-500 transition-colors">
              Privacy Policy
            </Link>
            <span className="text-slate-700">|</span>
            <Link href="/terms" className="text-xs text-slate-500 hover:text-gold-500 transition-colors">
              Terms & Conditions
            </Link>
            <span className="text-slate-700">|</span>
            <span className="text-xs text-slate-500">Bangalore | Nagpur | Global</span>
          </div>
        </div>
      </div>
    </footer>
    </>
  );
}
