import { Metadata } from "next";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Compass, Award, Shield, Users, Clock, MapPin, CheckCircle, Sparkles } from "lucide-react";
import ScrollFloat from "@/components/animations/ScrollFloat";
import TextType from "@/components/animations/TextType";

import Breadcrumbs from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "About Us | DSS Talent Bridge",
  description: "Learn about DSS Talent Bridge, a technology-driven HR Advisory and Staffing firm with over 7 years of experience in Bangalore and Nagpur.",
};

export default function AboutPage() {
  const expertises = [
    "Technology & Software Engineering",
    "BFSI (Banking & Financial Services)",
    "AI & Machine Learning Sourcing",
    "Cloud Computing & DevOps Solutions",
    "ERP & SAP HANA Systems",
    "Data Science & Advanced Analytics",
    "Cybersecurity & Threat Defense",
    "Digital Transformation Initiatives"
  ];

  return (
    <>
      <Header />
      <Breadcrumbs />
      <main className="flex-grow bg-slate-50">
        
        {/* Banner Section */}
        <section className="bg-navy-800 text-white py-16 sm:py-24 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(184,144,71,0.12),transparent)] pointer-events-none" />
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative text-center">
            <span className="text-xs font-bold uppercase tracking-widest text-gold-300 bg-gold-500/10 px-4 py-1.5 rounded-full border border-gold-500/20">
              Corporate Overview
            </span>
            <ScrollFloat
              containerClassName="mt-3"
              textClassName="text-4xl font-extrabold tracking-tight sm:text-5xl text-white leading-tight"
            >
              About DSS Talent Bridge
            </ScrollFloat>
            <div className="mt-4 text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed min-h-[56px] sm:min-h-[48px]">
              <TextType
                text={[
                  "Founded by recruitment professionals with over 7 years of experience.",
                  "Connecting elite technology and BFSI talent with global enterprises.",
                  "Reliable, tailored hiring solutions with speed, precision, and integrity."
                ]}
                typingSpeed={50}
                pauseDuration={2500}
                deletingSpeed={30}
                showCursor={true}
                cursorCharacter="|"
                cursorClassName="text-gold-500 font-bold"
                className="text-slate-300 font-medium inline"
              />
            </div>
          </div>
        </section>

        {/* Tagline Banner */}
        <section className="bg-white border-b border-slate-200 py-8 shadow-sm">
          <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
            <p className="text-xl font-bold text-navy-800 italic">
              "Bridging the Gap Between Exceptional Talent and Exceptional Companies."
            </p>
          </div>
        </section>

        {/* Mission & Vision Section */}
        <section className="py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
              {/* Mission Card */}
              <div className="bg-white rounded-2xl p-8 sm:p-10 shadow-sm border border-slate-100 flex flex-col gap-5 hover:border-gold-500/30 transition-all duration-300">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-navy-800 text-white shrink-0">
                  <Compass className="h-6 w-6 text-gold-400" />
                </div>
                <h2 className="text-2xl font-bold text-navy-800">Our Mission</h2>
                <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
                  To bridge the gap between exceptional talent and exceptional organizations through innovative, reliable, and people-centric recruitment solutions. We focus on building deep partnerships built on performance, mutual respect, and transparency.
                </p>
              </div>

              {/* Vision Card */}
              <div className="bg-white rounded-2xl p-8 sm:p-10 shadow-sm border border-slate-100 flex flex-col gap-5 hover:border-gold-500/30 transition-all duration-300">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gold-500 text-white shrink-0">
                  <Award className="h-6 w-6" />
                </div>
                <h2 className="text-2xl font-bold text-navy-800">Our Vision</h2>
                <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
                  To become a trusted global recruitment partner known for quality, transparency, and excellence in talent acquisition. We aim to shape the future of recruitment by leveraging advanced sourcing technologies and market intelligence.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Core Expertise Section */}
        <section className="py-16 bg-navy-800 text-white relative">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-xs font-bold uppercase tracking-widest text-gold-300">
                Niche Focus Areas
              </span>
              <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl mt-3 text-white">
                Sourcing & Staffing Expertise
              </h2>
              <p className="mt-4 text-slate-300">
                Our recruiting professionals leverage database metrics and technology integrations to find qualified professionals in high-complexity niches.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {expertises.map((exp, i) => (
                <div
                  key={i}
                  className="bg-navy-900/60 rounded-xl p-5 border border-slate-700/50 flex items-center gap-3 hover:border-gold-500/50 transition-all duration-200"
                >
                  <CheckCircle className="h-5 w-5 text-gold-400 shrink-0" />
                  <span className="text-sm font-semibold tracking-wide text-slate-200">{exp}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Philosophy & Sourcing Core */}
        <section className="py-16 sm:py-20 bg-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              {/* Graphic Logo */}
              <div className="lg:col-span-5 flex justify-center">
                <div className="relative h-64 w-64 sm:h-80 sm:w-80 rounded-2xl bg-slate-50 border border-slate-100 p-6 flex flex-col justify-center items-center shadow-inner gap-4">
                  <div className="relative h-40 w-40 overflow-hidden rounded-xl bg-white border border-slate-100">
                    <Image
                      src="/logo.jpeg"
                      alt="DSS Talent Bridge logo"
                      fill
                      sizes="160px"
                      className="object-contain p-2"
                    />
                  </div>
                  <div className="text-center">
                    <p className="text-lg font-bold text-navy-800">DSS Talent Bridge</p>
                    <p className="text-xs text-slate-500 font-semibold tracking-wide">Bangalore & Nagpur Hubs</p>
                  </div>
                </div>
              </div>

              {/* Sourcing details */}
              <div className="lg:col-span-7 space-y-6">
                <span className="text-xs font-bold uppercase tracking-widest text-gold-600">
                  How We Do It
                </span>
                <h2 className="text-3xl font-extrabold text-navy-800 tracking-tight">
                  Speed, Precision, and integrity.
                </h2>
                <p className="text-slate-600 leading-relaxed">
                  At DSS Talent Bridge, we believe recruitment is more than filling positions—it's about creating long-term partnerships. By combining market intelligence, technology-enabled sourcing, and a consultative approach, we deliver quality talent with speed, precision, and integrity.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
                  <div className="flex gap-3">
                    <Clock className="h-6 w-6 text-gold-500 shrink-0 mt-1" />
                    <div>
                      <h4 className="font-bold text-navy-800 text-sm">Rapid Sourcing Systems</h4>
                      <p className="text-xs text-slate-500 mt-1">Accelerated workflows that identify pre-screened professionals within 48 business hours.</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <Shield className="h-6 w-6 text-gold-500 shrink-0 mt-1" />
                    <div>
                      <h4 className="font-bold text-navy-800 text-sm">Consultative Alignment</h4>
                      <p className="text-xs text-slate-500 mt-1">Deep analysis of tech stacks, team culture, and business milestones prior to shortlisting.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Local Office Presence - GEO / local SEO */}
        <section className="py-16 sm:py-20 bg-slate-50 border-t border-slate-100">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <span className="text-xs font-bold uppercase tracking-widest text-gold-600">
                Operational Reach
              </span>
              <h2 className="text-3xl font-extrabold text-navy-800 tracking-tight sm:text-4xl mt-3">
                Local Offices Serving Enterprises
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Bangalore Card */}
              <div className="bg-white rounded-2xl p-8 border border-slate-100 flex flex-col gap-4 shadow-sm">
                <div className="flex items-center gap-3">
                  <MapPin className="h-6 w-6 text-gold-500 shrink-0" />
                  <h3 className="text-xl font-bold text-navy-800">Bangalore Headquarters</h3>
                </div>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Nestled in the heart of India's tech corridor, our Bangalore team serves major IT networks, fintech enterprises, and startups. We lead local headhunting and global advisory boards.
                </p>
                <div className="border-t border-slate-100 pt-4 text-xs text-slate-500 font-medium space-y-1">
                  <p><strong>Address:</strong> Outer Ring Road, Tech Corridor, Bangalore, KA, India</p>
                  <p><strong>Focus:</strong> AI & Machine Learning, BFSI Software, Cloud Infrastructure, leadership hiring.</p>
                </div>
              </div>

              {/* Nagpur Card */}
              <div className="bg-white rounded-2xl p-8 border border-slate-100 flex flex-col gap-4 shadow-sm">
                <div className="flex items-center gap-3">
                  <MapPin className="h-6 w-6 text-gold-500 shrink-0" />
                  <h3 className="text-xl font-bold text-navy-800">Nagpur Sourcing Center</h3>
                </div>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Catering to the expanding industrial and technological ecosystem of Central India, our Nagpur center focuses on digital transformation execution, contract staffing, and SAP support.
                </p>
                <div className="border-t border-slate-100 pt-4 text-xs text-slate-500 font-medium space-y-1">
                  <p><strong>Address:</strong> IT Park, Gayatri Nagar, Nagpur, MH, India</p>
                  <p><strong>Focus:</strong> Full Stack Software Engineering, SAP Consulting, cybersecurity audits, client intake support.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
