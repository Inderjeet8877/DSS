"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Compass, Award, Shield, Clock, MapPin, CheckCircle } from "lucide-react";
import ScrollFloat from "@/components/animations/ScrollFloat";
import TextType from "@/components/animations/TextType";

// Define custom JSX wrapper for Web Component to satisfy TypeScript
const DotLottieWC = "dotlottie-wc" as any;

export default function ClientAboutPage() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);

    // Dynamically load Lottie Web Component Script on client mount
    const scriptId = "dotlottie-wc-script";
    if (!document.getElementById(scriptId)) {
      const script = document.createElement("script");
      script.id = scriptId;
      script.src = "https://unpkg.com/@lottiefiles/dotlottie-wc@0.9.14/dist/dotlottie-wc.js";
      script.type = "module";
      document.head.appendChild(script);
    }
  }, []);

  const expertises = [
    "Technology",
    "BFSI",
    "AI & Machine Learning",
    "Cloud Computing",
    "ERP & SAP",
    "Data Science",
    "Software Engineering",
    "Cybersecurity",
    "Digital Transformation"
  ];

  return (
    <main className="flex-grow bg-slate-50">
      
      {/* Banner Section */}
      <section className="relative bg-navy-800 text-white py-16 sm:py-24 overflow-hidden">
        {/* Background Lottie Animation */}
        <div className="absolute inset-0 z-0 opacity-20 flex items-center justify-center pointer-events-none">
          {isMounted ? (
            <DotLottieWC
              src="https://lottie.host/d3e18b91-70b8-4d8d-9bdb-462cc97cfec9/z0aKCSpVT0.lottie"
              autoplay
              loop
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          ) : (
            <div className="w-full h-full bg-navy-950/20" />
          )}
        </div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(184,144,71,0.15),transparent)] pointer-events-none z-10" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative text-center z-20">
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
                To bridge the gap between exceptional talent and exceptional organizations through innovative, reliable, and people-centric recruitment solutions.
              </p>
            </div>

            {/* Vision Card */}
            <div className="bg-white rounded-2xl p-8 sm:p-10 shadow-sm border border-slate-100 flex flex-col gap-5 hover:border-gold-500/30 transition-all duration-300">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gold-500 text-white shrink-0">
                <Award className="h-6 w-6" />
              </div>
              <h2 className="text-2xl font-bold text-navy-800">Our Vision</h2>
              <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
                To become a trusted global recruitment partner known for quality, transparency, and excellence in talent acquisition.
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

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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

      {/* Our Value Pillars Section with the requested 4 animations */}
      <section className="py-20 bg-white border-b border-slate-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-gold-600 bg-gold-600/10 px-3 py-1 rounded-full">
              Our Core Pillars
            </span>
            <h2 className="text-3xl font-extrabold text-navy-800 tracking-tight sm:text-4xl mt-3">
              How We Deliver Excellence
            </h2>
            <p className="mt-4 text-slate-600">
              We combine industry-leading technology pipelines with absolute compliance and global placement networks.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Pillar 1 */}
            <div className="bg-slate-50 border border-slate-100 rounded-2xl p-6 flex flex-col items-center text-center shadow-sm hover:shadow-xl hover:border-gold-500/30 transition-all duration-300 transform hover:-translate-y-1">
              <div className="w-48 h-48 flex items-center justify-center mb-4">
                {isMounted ? (
                  <DotLottieWC
                    src="https://lottie.host/167fec2b-55ed-4c18-855c-9156850735f8/11aViRNtWx.lottie"
                    autoplay
                    loop
                    style={{ width: "100%", height: "100%" }}
                  />
                ) : (
                  <div className="w-full h-full bg-navy-950/10" />
                )}
              </div>
              <h3 className="text-lg font-bold text-navy-800 mb-2">Talent Integration</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Seamlessly onboarding exceptional specialists to align with your internal culture and milestones.
              </p>
            </div>

            {/* Pillar 2 */}
            <div className="bg-slate-50 border border-slate-100 rounded-2xl p-6 flex flex-col items-center text-center shadow-sm hover:shadow-xl hover:border-gold-500/30 transition-all duration-300 transform hover:-translate-y-1">
              <div className="w-48 h-48 flex items-center justify-center mb-4">
                {isMounted ? (
                  <DotLottieWC
                    src="https://lottie.host/e6ee57ce-4e2b-4333-acd1-4587c9c601ee/w9gbHTjU6v.lottie"
                    autoplay
                    loop
                    style={{ width: "100%", height: "100%" }}
                  />
                ) : (
                  <div className="w-full h-full bg-navy-950/10" />
                )}
              </div>
              <h3 className="text-lg font-bold text-navy-800 mb-2">Advanced Screening</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Leveraging AI-powered systems and technical evaluations to qualify pre-screened professionals rapidly.
              </p>
            </div>

            {/* Pillar 3 */}
            <div className="bg-slate-50 border border-slate-100 rounded-2xl p-6 flex flex-col items-center text-center shadow-sm hover:shadow-xl hover:border-gold-500/30 transition-all duration-300 transform hover:-translate-y-1">
              <div className="w-48 h-48 flex items-center justify-center mb-4">
                {isMounted ? (
                  <DotLottieWC
                    src="https://lottie.host/3f5d36a8-127c-43e5-a2ec-05be0f136151/3xfNCpbOZR.lottie"
                    autoplay
                    loop
                    style={{ width: "100%", height: "100%" }}
                  />
                ) : (
                  <div className="w-full h-full bg-navy-950/10" />
                )}
              </div>
              <h3 className="text-lg font-bold text-navy-800 mb-2">Secure Compliance</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Enforcing strict corporate standards, verification protocols, and ironclad NDA compliance.
              </p>
            </div>

            {/* Pillar 4 */}
            <div className="bg-slate-50 border border-slate-100 rounded-2xl p-6 flex flex-col items-center text-center shadow-sm hover:shadow-xl hover:border-gold-500/30 transition-all duration-300 transform hover:-translate-y-1">
              <div className="w-48 h-48 flex items-center justify-center mb-4">
                {isMounted ? (
                  <DotLottieWC
                    src="https://lottie.host/b2c22d1b-5737-4de2-a8e7-347856928038/kTgdXqKFuL.lottie"
                    autoplay
                    loop
                    style={{ width: "100%", height: "100%" }}
                  />
                ) : (
                  <div className="w-full h-full bg-navy-950/10" />
                )}
              </div>
              <h3 className="text-lg font-bold text-navy-800 mb-2">Global Operations</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Deploying regional and international networks to source leadership and software engineering roles.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy & Sourcing Core */}
      <section className="py-16 sm:py-20 bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Graphic Logo */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative h-64 w-64 sm:h-80 sm:w-80 rounded-2xl bg-white border border-slate-100 p-6 flex flex-col justify-center items-center shadow-sm gap-4">
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
                Speed, Precision, and Integrity
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
      <section className="py-16 sm:py-20 bg-white border-t border-slate-100">
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
            <div className="bg-slate-50 rounded-2xl p-8 border border-slate-150 flex flex-col gap-4 shadow-sm">
              <div className="flex items-center gap-3">
                <MapPin className="h-6 w-6 text-gold-500 shrink-0" />
                <h3 className="text-xl font-bold text-navy-800">Bangalore Headquarters</h3>
              </div>
              <p className="text-sm text-slate-600 leading-relaxed">
                Nestled in the heart of India's tech corridor, our Bangalore team serves major IT networks, fintech enterprises, and startups. We lead local headhunting and staffing placements.
              </p>
              <div className="border-t border-slate-200 pt-4 text-xs text-slate-500 font-medium space-y-1">
                <p><strong>Focus:</strong> AI & Machine Learning, BFSI Software, Cloud Infrastructure, leadership hiring.</p>
              </div>
            </div>

            {/* Nagpur Card */}
            <div className="bg-slate-50 rounded-2xl p-8 border border-slate-150 flex flex-col gap-4 shadow-sm">
              <div className="flex items-center gap-3">
                <MapPin className="h-6 w-6 text-gold-500 shrink-0" />
                <h3 className="text-xl font-bold text-navy-800">Nagpur Sourcing Center</h3>
              </div>
              <p className="text-sm text-slate-600 leading-relaxed">
                Catering to the expanding industrial and technological ecosystem of Central India, our Nagpur center focuses on digital transformation execution, contract staffing, and SAP support.
              </p>
              <div className="border-t border-slate-200 pt-4 text-xs text-slate-500 font-medium space-y-1">
                <p><strong>Focus:</strong> Full Stack Software Engineering, SAP Consulting, cybersecurity audits, client intake support.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}
