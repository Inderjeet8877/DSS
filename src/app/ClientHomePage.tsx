"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Briefcase,
  Building,
  ChevronDown,
  ChevronUp,
  Cpu,
  Shield,
  Layers,
  MapPin,
  TrendingUp,
  Award,
  Users,
  Compass,
  Database,
  CloudLightning,
  Sparkles,
  HelpCircle,
} from "lucide-react";
import { faqData } from "@/lib/data/jobs";
import Counter from "@/components/Counter";
import { ScrollVelocity } from "@/components/animations/ScrollVelocity";
import ScrollFloat from "@/components/animations/ScrollFloat";
import ScrollReveal from "@/components/animations/ScrollReveal";
import TextType from "@/components/animations/TextType";

export default function ClientHomePage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  // Structured Data Schema for AEO - FAQPage
  const faqSchema = useMemo(() => {
    return {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": faqData.map((faq) => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.answer,
        },
      })),
    };
  }, []);

  const services = [
    {
      title: "Permanent Hiring",
      description: "Direct hire talent mapping and acquisition designed for long-term organizational alignment and scale.",
      icon: Users,
    },
    {
      title: "Contract Staffing",
      description: "Flexible, project-oriented resource deployments to bridge dynamic skill gaps with zero payroll overhead.",
      icon: Layers,
    },
    {
      title: "Leadership Hiring",
      description: "Executive search strategies to locate visionary leaders who steer transformation in high-impact sectors.",
      icon: Award,
    },
    {
      title: "Project-Based Recruitment",
      description: "Rapid, coordinated team assemblies tailored to execute specific high-priority technology and business deliverables.",
      icon: Briefcase,
    },
    {
      title: "Customized Talent Solutions",
      description: "Consultative HR advisory services tailored to shape compensation plans, talent retention, and employer branding.",
      icon: TrendingUp,
    },
  ];

  const expertises = [
    { name: "Artificial Intelligence & ML", icon: Cpu },
    { name: "Banking & Financial Services (BFSI)", icon: Shield },
    { name: "Cloud Computing & DevOps", icon: CloudLightning },
    { name: "Enterprise Systems (ERP & SAP)", icon: Database },
    { name: "Software Engineering & Architecture", icon: Sparkles },
    { name: "Cybersecurity & Cryptography", icon: Shield },
  ];

  return (
    <div className="flex flex-col w-full">
      {/* Schema Injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-navy-800 text-white py-24 sm:py-32">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(184,144,71,0.15),transparent)] pointer-events-none" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 flex flex-col items-start gap-6 animate-slide-in-left">
              <span className="inline-flex items-center gap-2 rounded-full bg-gold-500/10 px-4 py-1 text-sm font-semibold tracking-wide text-gold-300 border border-gold-500/20">
                <Sparkles className="h-4 w-4" />
                Trusted Corporate Staffing Experts
              </span>
              <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-6xl leading-[1.1]">
                Bridging the Gap Between{" "}
                <span className="text-gold-400">Exceptional Talent</span> and{" "}
                <span className="text-gold-400">Exceptional Companies</span>.
              </h1>
              <div className="text-lg text-slate-300 max-w-xl leading-relaxed min-h-[56px] sm:min-h-[48px]">
                <span className="text-gold-300 font-bold block sm:inline">Specialized in: </span>
                <TextType
                  text={[
                    "AI & Machine Learning Placements.",
                    "BFSI Technology Operations.",
                    "Cloud Computing & DevOps Pipelines.",
                    "SAP ERP Consulting Corridors.",
                    "Executive Search & Leadership Hiring."
                  ]}
                  typingSpeed={60}
                  pauseDuration={2000}
                  deletingSpeed={40}
                  showCursor={true}
                  cursorCharacter="|"
                  cursorClassName="text-gold-500 font-bold"
                  className="text-white font-semibold inline"
                />
              </div>
              <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto mt-4">
                <Link
                  href="/hire"
                  className="inline-flex items-center justify-center rounded-lg bg-gold-500 px-6 py-3.5 text-base font-bold text-navy-800 shadow-lg hover:bg-gold-400 transition-all duration-200"
                >
                  <Building className="mr-2 h-5 w-5" />
                  Hire Top Talent
                </Link>
                <Link
                  href="/jobs"
                  className="inline-flex items-center justify-center rounded-lg border border-slate-500 px-6 py-3.5 text-base font-bold text-white hover:bg-white/10 transition-colors"
                >
                  <Briefcase className="mr-2 h-5 w-5" />
                  Explore Jobs
                </Link>
              </div>
            </div>

            {/* Right Graphic/Logo Box */}
            <div className="lg:col-span-5 flex justify-center animate-slide-in-right">
              <div className="relative h-[340px] w-[340px] sm:h-[400px] sm:w-[400px] rounded-3xl bg-gradient-to-tr from-navy-900 to-navy-700/80 p-8 shadow-2xl border border-slate-700/50 flex flex-col items-center justify-center gap-6">
                <div className="relative h-44 w-44 overflow-hidden rounded-2xl bg-white p-1">
                  <Image
                    src="/logo.jpeg"
                    alt="DSS Talent Bridge Logo"
                    fill
                    sizes="176px"
                    className="object-contain"
                  />
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold tracking-tight text-white">
                    DSS <span className="text-gold-500">Talent Bridge</span>
                  </p>
                  <p className="text-xs uppercase tracking-widest text-slate-400 font-semibold mt-1">
                    7+ Years Sourcing Excellence
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Stats Bar */}
      <section className="bg-white border-y border-slate-200 py-10 shadow-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <p className="text-4xl font-extrabold text-navy-800">
                <Counter target={7} suffix="+ Years" />
              </p>
              <p className="text-sm font-medium text-slate-500 mt-1">Industry Experience</p>
            </div>
            <div>
              <p className="text-4xl font-extrabold text-navy-800">
                <Counter target={500} suffix="+" />
              </p>
              <p className="text-sm font-medium text-slate-500 mt-1">Candidates Placed</p>
            </div>
            <div>
              <p className="text-4xl font-extrabold text-navy-800">
                <Counter target={98} suffix="%" />
              </p>
              <p className="text-sm font-medium text-slate-500 mt-1">Client Retention Rate</p>
            </div>
            <div>
              <p className="text-4xl font-extrabold text-navy-800">
                <Counter target={24} suffix="/7" />
              </p>
              <p className="text-sm font-medium text-slate-500 mt-1">Advisory Response</p>
            </div>
          </div>
        </div>
      </section>

      {/* ScrollVelocity Marquee Banner */}
      <section className="bg-navy-900 text-white py-8 border-y border-gold-500/20 overflow-hidden">
        <ScrollVelocity
          texts={[
            "EXECUTIVE SEARCH • BFSI STAFFING • AI & ML PLACEMENTS • CLOUD ARCHITECTS •",
            "SAP HANA CONSULTANTS • TECH STAFFING • PERMANENT HIRING • CONTRACT STAFFING •"
          ]}
          velocity={40}
          className="text-white/20 hover:text-white font-extrabold uppercase tracking-widest cursor-pointer transition-colors duration-300"
        />
      </section>

      {/* About Us, Mission & Vision */}
      <section id="about" className="py-20 bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-start">
            {/* About text */}
            <div className="lg:col-span-6 space-y-6 animate-slide-in-left">
              <span className="text-xs font-bold uppercase tracking-widest text-gold-600">
                Who We Are
              </span>
              <ScrollFloat
                containerClassName="my-2"
                textClassName="text-3xl font-extrabold text-navy-800 tracking-tight sm:text-4xl leading-tight"
              >
                Technology-Driven HR Advisory and Staffing Partner
              </ScrollFloat>
              <p className="text-slate-600 leading-relaxed text-base">
                DSS Talent Bridge is a technology-driven Human Resource Advisory and Staffing firm committed to connecting exceptional talent with forward-thinking organizations. Founded by recruitment professionals with over 7 years of industry experience, we specialize in delivering tailored hiring solutions that help businesses build high-performing teams.
              </p>
              <p className="text-slate-600 leading-relaxed text-base">
                We support organizations with permanent, contract, leadership, and project-based hiring across India and global markets, combining market intelligence, technology-enabled sourcing, and a consultative approach to deliver quality talent with speed, precision, and integrity.
              </p>
            </div>

            {/* Mission & Vision cards */}
            <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-6 animate-slide-in-right">
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex flex-col gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-navy-800 text-white shrink-0">
                  <Compass className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-bold text-navy-800">Our Mission</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  To bridge the gap between exceptional talent and exceptional organizations through innovative, reliable, and people-centric recruitment solutions.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex flex-col gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gold-500 text-white shrink-0">
                  <Award className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-bold text-navy-800">Our Vision</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  To become a trusted global recruitment partner known for quality, transparency, and excellence in talent acquisition.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Slogan Reveal Section */}
      <section className="bg-navy-800 text-white py-20 relative overflow-hidden border-y border-slate-700/50">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(184,144,71,0.08),transparent)] pointer-events-none" />
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-xs font-bold uppercase tracking-widest text-gold-400">Our Slogan</span>
          <ScrollReveal
            baseOpacity={0.05}
            enableBlur={true}
            baseRotation={2}
            blurStrength={6}
            textClassName="text-white text-center text-2xl sm:text-4xl font-extrabold max-w-4xl mx-auto leading-relaxed mt-4"
          >
            Bridging the Gap Between Exceptional Talent and Exceptional Companies. Delivering innovative, reliable, and people-centric recruitment solutions globally.
          </ScrollReveal>
        </div>
      </section>

      {/* Services Showcase */}
      <section id="services" className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-gold-600">
              Our Expertise
            </span>
            <ScrollFloat
              containerClassName="mt-3"
              textClassName="text-3xl font-extrabold text-navy-800 tracking-tight sm:text-4xl leading-tight"
            >
              Comprehensive Staffing & HR Solutions
            </ScrollFloat>
            <p className="mt-4 text-slate-600">
              We tailor our strategic sourcing pipelines to align with your organization's specific resource cycles, structure, and technical requirements.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((svc, i) => {
              const Icon = svc.icon;
              return (
                <div
                  key={i}
                  className="bg-slate-50 hover:bg-white rounded-2xl p-8 border border-slate-100 hover:border-gold-400 hover:shadow-md transition-all duration-300 flex flex-col gap-4 group"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-navy-800 text-white group-hover:bg-navy-700 transition-colors">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-bold text-navy-800 mt-2">{svc.title}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{svc.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Niche Industry Focus Section */}
      <section className="py-20 bg-navy-800 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-gold-300">
              Specialized Portfolios
            </span>
            <ScrollFloat
              containerClassName="mt-3"
              textClassName="text-3xl font-extrabold tracking-tight sm:text-4xl text-white leading-tight"
            >
              Niche Verticals We Serve
            </ScrollFloat>
            <p className="mt-4 text-slate-300">
              From enterprise banking systems to advanced machine learning pipelines, we map skillsets across high-complexity sectors.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {expertises.map((exp, i) => {
              const Icon = exp.icon;
              return (
                <div
                  key={i}
                  className="bg-navy-900/60 rounded-xl p-6 border border-slate-700/50 flex flex-col items-center justify-center text-center gap-4 hover:border-gold-500/50 hover:bg-navy-900 transition-all duration-200"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gold-500/10 text-gold-400">
                    <Icon className="h-6 w-6" />
                  </div>
                  <span className="text-sm font-semibold tracking-wide">{exp.name}</span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Local Office Operations - GEO / SEO optimization */}
      <section id="locations" className="py-20 bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-gold-600">
              Local Authority
            </span>
            <ScrollFloat
              containerClassName="mt-3"
              textClassName="text-3xl font-extrabold text-navy-800 tracking-tight sm:text-4xl leading-tight"
            >
              Our Primary Operational Hubs
            </ScrollFloat>
            <p className="mt-4 text-slate-600">
              Positioned in major tech corridors across India to tap into regional excellence pipelines and manage localized requirements.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Bangalore Hub */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8 flex flex-col md:flex-row gap-6 hover:shadow-md hover:border-navy-600/20 transition-all animate-slide-in-left">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-navy-800 text-white shrink-0">
                <MapPin className="h-6 w-6" />
              </div>
              <div className="space-y-3">
                <h3 className="text-xl font-bold text-navy-800">Bangalore Hub (HQ)</h3>
                <p className="text-xs font-semibold text-gold-600 uppercase tracking-wider">
                  Technology, AI & BFSI Sourcing Center
                </p>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Located in India's Silicon Valley, our Bangalore office connects cloud architects, data scientists, and BFSI software engineers with global enterprise clients.
                </p>
                <div className="text-xs text-slate-500 font-medium">
                  <span className="font-bold text-slate-700 block mb-1">Regional Specializations:</span>
                  AI & ML Engineers, Azure/AWS Architects, SAP HANA Advisory, Cyber Defense Teams.
                </div>
              </div>
            </div>

            {/* Nagpur Hub */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8 flex flex-col md:flex-row gap-6 hover:shadow-md hover:border-navy-600/20 transition-all animate-slide-in-right">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-navy-800 text-white shrink-0">
                <MapPin className="h-6 w-6" />
              </div>
              <div className="space-y-3">
                <h3 className="text-xl font-bold text-navy-800">Nagpur Hub</h3>
                <p className="text-xs font-semibold text-gold-600 uppercase tracking-wider">
                  Software Engineering & Digital Transformation Center
                </p>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Serving the growing tech ecosystem in central India, our Nagpur team handles contract staffing and core software engineering placements.
                </p>
                <div className="text-xs text-slate-500 font-medium">
                  <span className="font-bold text-slate-700 block mb-1">Regional Specializations:</span>
                  Full Stack Developers, ERP Specialists, Project Managers, Cybersecurity Analysts.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-gold-600">
              Questions
            </span>
            <ScrollFloat
              containerClassName="mt-3"
              textClassName="text-3xl font-extrabold text-navy-800 tracking-tight sm:text-4xl leading-tight"
            >
              Frequently Asked Questions
            </ScrollFloat>
            <p className="mt-4 text-slate-600">
              Clear, transparent answers regarding our recruitment workflows, locations, and advisory services.
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {faqData.map((faq, i) => (
              <div
                key={i}
                className="bg-slate-50 rounded-xl border border-slate-100 overflow-hidden transition-all duration-200"
              >
                <button
                  onClick={() => toggleFaq(i)}
                  className="w-full flex items-center justify-between p-5 text-left font-bold text-navy-800 focus:outline-none"
                >
                  <span className="flex items-center gap-3">
                    <HelpCircle className="h-5 w-5 text-gold-500 shrink-0" />
                    {faq.question}
                  </span>
                  {openFaq === i ? (
                    <ChevronUp className="h-5 w-5 text-slate-500 shrink-0" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-slate-500 shrink-0" />
                  )}
                </button>
                {openFaq === i && (
                  <div className="px-5 pb-5 pt-1 text-sm text-slate-600 leading-relaxed border-t border-slate-100 bg-white/50 animate-fade-in">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
