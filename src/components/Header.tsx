"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, Briefcase, Building, Info, FileText, Users, Mail, BookOpen, Search } from "lucide-react";
import { mockJobs } from "@/lib/data/jobs";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const searchInputRef = useRef<HTMLInputElement>(null);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  // Focus search input when opened
  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchOpen]);

  // Click outside to close search
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target as Node)
      ) {
        setIsSearchOpen(false);
        setSearchQuery("");
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Filter jobs based on query
  const filteredSearchJobs = searchQuery
    ? mockJobs.filter(
        (job) =>
          job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          job.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
          job.techStack.some((tech) =>
            tech.toLowerCase().includes(searchQuery.toLowerCase())
          )
      )
    : [];

  const navigation = [
    { name: "Home", href: "/", icon: Info },
    { name: "Find Jobs", href: "/jobs", icon: Briefcase },
    { name: "About Us", href: "/about", icon: Users },
    { name: "Blog Hub", href: "/blog", icon: BookOpen },
    { name: "Contact Us", href: "/contact", icon: Mail },
  ];

  const isActive = (path: string) => {
    if (path === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(path);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/80 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          {/* Logo Brand */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative h-12 w-12 overflow-hidden rounded-lg border border-slate-100 bg-white p-0.5 transition-transform duration-300 group-hover:scale-105">
                <Image
                  src="/logo.jpeg"
                  alt="DSS Talent Bridge Logo"
                  fill
                  sizes="48px"
                  className="object-contain"
                  priority
                />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold tracking-tight text-navy-800 transition-colors group-hover:text-navy-700">
                  DSS <span className="text-gold-500 font-extrabold">Talent Bridge</span>
                </span>
                <span className="text-[9px] font-semibold uppercase tracking-widest text-slate-500">
                  Recruitment & Staffing
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`relative text-sm font-semibold tracking-wide transition-colors duration-200 py-2 ${
                  isActive(item.href)
                    ? "text-navy-800"
                    : "text-slate-600 hover:text-navy-800"
                }`}
              >
                {item.name}
                {isActive(item.href) && (
                  <span className="absolute bottom-0 left-0 h-0.5 w-full bg-gold-500 rounded-full animate-fade-in" />
                )}
              </Link>
            ))}

            {/* Expandable Search Bar */}
            <div ref={searchContainerRef} className="relative flex items-center">
              {isSearchOpen ? (
                <div className="flex items-center gap-2 bg-slate-50 border border-slate-200/80 rounded-full px-3 py-1.5 transition-all duration-300 w-64 shadow-sm">
                  <Search className="h-4 w-4 text-slate-500 shrink-0" />
                  <input
                    ref={searchInputRef}
                    type="text"
                    placeholder="Search active roles..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="bg-transparent text-xs w-full focus:outline-none text-navy-800 font-semibold"
                  />
                  <button
                    onClick={() => {
                      setIsSearchOpen(false);
                      setSearchQuery("");
                    }}
                    className="text-slate-400 hover:text-navy-800 transition-colors"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setIsSearchOpen(true)}
                  className="p-2 text-slate-600 hover:text-navy-800 transition-colors rounded-full hover:bg-slate-50"
                  title="Search Jobs"
                >
                  <Search className="h-5 w-5" />
                </button>
              )}

              {/* Suggestions dropdown */}
              {isSearchOpen && searchQuery && (
                <div className="absolute right-0 top-full mt-2 w-72 bg-white rounded-xl shadow-xl border border-slate-150 py-3 z-50 animate-fade-in divide-y divide-slate-100">
                  <div className="px-4 pb-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    Matching Positions
                  </div>
                  <div className="max-h-60 overflow-y-auto pt-1">
                    {filteredSearchJobs.length > 0 ? (
                      filteredSearchJobs.map((job) => (
                        <Link
                          key={job.id}
                          href={`/jobs?id=${job.id}`}
                          onClick={() => {
                            setIsSearchOpen(false);
                            setSearchQuery("");
                          }}
                          className="flex flex-col gap-1 px-4 py-2 hover:bg-slate-50 transition-colors text-left"
                        >
                          <span className="text-xs font-bold text-navy-800">
                            {job.title}
                          </span>
                          <div className="flex items-center justify-between text-[10px] text-slate-500 font-medium">
                            <span>{job.department}</span>
                            <span className="text-gold-600 font-semibold">{job.location}</span>
                          </div>
                        </Link>
                      ))
                    ) : (
                      <div className="px-4 py-4 text-center text-xs text-slate-400">
                        No matching jobs found
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </nav>

          {/* CTAs */}
          <div className="hidden md:flex items-center gap-4">
            <Link
              href="/jobs"
              className="rounded-lg bg-navy-800 px-5 py-2.5 text-sm font-semibold text-white shadow-md hover:bg-navy-700 hover:shadow-lg transition-all duration-200 border border-transparent hover:border-gold-400"
            >
              Browse Jobs
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="inline-flex items-center justify-center rounded-md p-2 text-slate-500 hover:bg-slate-100 hover:text-navy-800 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-navy-600"
              aria-controls="mobile-menu"
              aria-expanded={isOpen}
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      {isOpen && (
        <div className="md:hidden animate-fade-in" id="mobile-menu">
          <div className="space-y-1 px-4 pb-4 pt-2 border-t border-slate-100 bg-white shadow-inner">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center gap-3 rounded-lg px-4 py-3 text-base font-semibold transition-colors ${
                    isActive(item.href)
                      ? "bg-navy-800 text-white"
                      : "text-slate-600 hover:bg-slate-50 hover:text-navy-800"
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  {item.name}
                </Link>
              );
            })}
            <div className="mt-4 pt-4 border-t border-slate-100">
              <Link
                href="/jobs"
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-center rounded-lg bg-navy-800 px-4 py-3 text-sm font-semibold text-white shadow-sm hover:bg-navy-700 transition-colors"
              >
                Find Jobs
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
