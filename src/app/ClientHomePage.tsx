"use client";

import React, { useState, useMemo, useEffect, useRef } from "react";
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
  Workflow,
  ArrowRight,
} from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { faqData, mockJobs } from "@/lib/data/jobs";
import Counter from "@/components/Counter";
import { ScrollVelocity } from "@/components/animations/ScrollVelocity";
import ScrollFloat from "@/components/animations/ScrollFloat";
import ScrollReveal from "@/components/animations/ScrollReveal";
import TextType from "@/components/animations/TextType";

// Define a custom JSX wrapper for the Web Component to satisfy TypeScript
const DotLottieWC = "dotlottie-wc" as any;

export default function ClientHomePage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  const specialties = useMemo(() => [
    "AI & Machine Learning Placements.",
    "BFSI Technology Operations.",
    "Cloud Computing & DevOps Pipelines.",
    "SAP ERP Consulting Corridors.",
    "Executive Search & Leadership Hiring."
  ], []);

  const [specialtyIdx, setSpecialtyIdx] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setSpecialtyIdx((prev) => (prev + 1) % specialties.length);
        setFade(true);
      }, 150);
    }, 1000);
    return () => clearInterval(interval);
  }, [specialties]);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const heroBgRef = useRef<HTMLDivElement>(null);
  const heroTextRef = useRef<HTMLDivElement>(null);
  const heroGraphicRef = useRef<HTMLDivElement>(null);
  const sloganBgRef = useRef<HTMLDivElement>(null);

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

    gsap.registerPlugin(ScrollTrigger);

    // 1. Hero Text Elements Staggered Zoom-out Animation
    if (heroTextRef.current) {
      const elements = heroTextRef.current.children;
      gsap.fromTo(
        elements,
        { scale: 1.3, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 1.8,
          ease: "power3.out",
          stagger: 0.15,
        }
      );
    }

    // Hero Graphic Zoom Out and Fit Animation (starts scale: 1.35, fits screen in 1.8s)
    if (heroGraphicRef.current) {
      gsap.fromTo(
        heroGraphicRef.current,
        { scale: 1.35, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1.8, ease: "power3.out" }
      );
    }

    // Hero Background Zoom Out, Fit and Continuous Breathing Animation
    if (heroBgRef.current) {
      gsap.fromTo(
        heroBgRef.current,
        { scale: 1.3 },
        {
          scale: 1,
          duration: 1.8,
          ease: "power3.out",
          onComplete: () => {
            gsap.to(heroBgRef.current, {
              scale: 1.06,
              duration: 25,
              repeat: -1,
              yoyo: true,
              ease: "sine.inOut",
            });
          }
        }
      );
    }

    // Floating Constellation Nodes Animation
    const nodes = document.querySelectorAll(".constellation-node");
    nodes.forEach((node, i) => {
      gsap.to(node, {
        x: "random(-20, 20)",
        y: "random(-20, 20)",
        duration: "random(5, 10)",
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: i * 0.1,
      });
    });

    // 3. Slogan Background Parallax Animation
    if (sloganBgRef.current) {
      gsap.to(sloganBgRef.current, {
        yPercent: 12,
        ease: "none",
        scrollTrigger: {
          trigger: sloganBgRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    }



    // 5. Scroll-linked fade-in & slide-up for other text & elements
    const fadeUpElements = document.querySelectorAll(".scroll-fade-up");
    fadeUpElements.forEach((el) => {
      gsap.fromTo(
        el,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top bottom-=10%",
            end: "center center+=15%",
            scrub: 1,
          },
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

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
      title: "Customized Talent Acquisition Solutions",
      description: "Consultative services tailored to shape compensation plans, talent retention, and employer branding.",
      icon: TrendingUp,
    },
    {
      title: "Recruitment Process Outsourcing (RPO)",
      description: "End-to-end management of your talent pipelines, handling sourcing, screening, and onboarding for peak efficiency.",
      icon: Workflow,
    },
  ];

  const expertises = [
    { name: "Technology", icon: Sparkles },
    { name: "BFSI", icon: Shield },
    { name: "AI & Machine Learning", icon: Cpu },
    { name: "Cloud Computing", icon: CloudLightning },
    { name: "ERP & SAP", icon: Database },
    { name: "Data Science", icon: Database },
    { name: "Software Engineering", icon: Sparkles },
    { name: "Cybersecurity", icon: Shield },
    { name: "Digital Transformation", icon: TrendingUp },
  ];

  return (
    <div className="flex flex-col w-full overflow-x-hidden">
      {/* Schema Injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-slate-50 text-navy-900 py-24 sm:py-32 min-h-[85vh] flex items-center">
        {/* Background Parallax Image with Overlay - Lighter Theme */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: "url('/hero_manufacturing.png')" }}
            ref={heroBgRef}
          />
          {/* Lighter overlay letting the image hint through, but keeping it light and soft */}
          <div className="absolute inset-0 bg-slate-50/92 z-10" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(184,144,71,0.15),transparent)] z-20 pointer-events-none" />
        </div>

        {/* Network/Constellation Vector graphic overlay on left side - Darker stroke on light bg */}
        <svg className="absolute left-0 top-0 h-full w-[80%] opacity-30 z-10 pointer-events-none" viewBox="0 0 800 600" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M100 150 L250 100 L400 200 L300 350 L150 300 Z" stroke="rgba(14, 37, 79, 0.15)" strokeWidth="1" />
          <path d="M250 100 L450 80 L600 180 L400 200 Z" stroke="rgba(14, 37, 79, 0.15)" strokeWidth="1" />
          <path d="M300 350 L500 300 L600 180 Z" stroke="rgba(14, 37, 79, 0.15)" strokeWidth="1" />
          <path d="M150 300 L200 480 L380 450 L300 350 Z" stroke="rgba(14, 37, 79, 0.15)" strokeWidth="1" />
          <path d="M380 450 L550 420 L500 300 Z" stroke="rgba(14, 37, 79, 0.15)" strokeWidth="1" />
          
          <circle cx="100" cy="150" r="4" fill="#B89047" className="constellation-node" />
          <circle cx="250" cy="100" r="5" fill="#0E254F" className="constellation-node" />
          <circle cx="400" cy="200" r="4" fill="#B89047" className="constellation-node" />
          <circle cx="300" cy="350" r="6" fill="#0E254F" className="constellation-node" />
          <circle cx="150" cy="300" r="4" fill="#B89047" className="constellation-node" />
          <circle cx="450" cy="80" r="5" fill="#0E254F" className="constellation-node" />
          <circle cx="600" cy="180" r="4" fill="#B89047" className="constellation-node" />
          <circle cx="500" cy="300" r="5" fill="#0E254F" className="constellation-node" />
          <circle cx="200" cy="480" r="4" fill="#B89047" className="constellation-node" />
          <circle cx="380" cy="450" r="6" fill="#0E254F" className="constellation-node" />
          <circle cx="550" cy="420" r="4" fill="#B89047" className="constellation-node" />
        </svg>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-30 w-full">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 flex flex-col items-start gap-6" ref={heroTextRef}>
              <div className="flex flex-wrap gap-3">
                <span className="inline-flex items-center gap-2 rounded-full bg-gold-500/10 px-4 py-1 text-sm font-semibold tracking-wide text-gold-700 border border-gold-500/20">
                  <Sparkles className="h-4 w-4" />
                  Trusted Corporate Staffing Experts
                </span>
                <span className="inline-flex items-center gap-2 rounded-full bg-white/80 px-4 py-1 text-xs font-semibold tracking-wide text-slate-700 border border-slate-200 shadow-sm backdrop-blur-md">
                  DSS Talent Bridge • 7+ Years Sourcing Excellence
                </span>
              </div>
              
              <h1 className="text-4xl font-extrabold tracking-tight text-navy-900 sm:text-6xl leading-[1.1]">
                Bridging the Gap Between{" "}
                <span className="text-gold-600">Exceptional Talent</span> and{" "}
                <span className="text-gold-600">Exceptional Companies</span>.
              </h1>
              
              <div className="text-lg text-slate-600 max-w-xl leading-relaxed min-h-[56px] sm:min-h-[48px] flex flex-wrap items-center gap-x-2">
                <span className="text-gold-600 font-bold">Specialized in:</span>
                <span
                  className={`text-navy-900 font-semibold transition-all duration-200 transform ${
                    fade ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-1"
                  }`}
                >
                  {specialties[specialtyIdx]}
                </span>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto mt-4">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-lg bg-navy-800 px-6 py-3.5 text-base font-bold text-white shadow-lg hover:bg-navy-700 transition-all duration-200"
                >
                  <Building className="mr-2 h-5 w-5" />
                  Partner With Us
                </Link>
                <Link
                  href="/jobs"
                  className="inline-flex items-center justify-center rounded-lg border border-slate-300 px-6 py-3.5 text-base font-bold text-slate-700 hover:bg-slate-100 transition-colors"
                >
                  <Briefcase className="mr-2 h-5 w-5" />
                  Explore Jobs
                </Link>
              </div>
            </div>

            {/* Right Graphic/Logo Box */}
            <div className="lg:col-span-5 flex justify-center z-10 w-full" ref={heroGraphicRef}>
              <div className="relative w-full h-[320px] sm:h-[450px] max-w-[500px] flex items-center justify-center">
                {isMounted ? (
                  <DotLottieWC
                    src="https://lottie.host/644cd00a-3130-4ab1-aae6-6c87d1f1e5b5/j839HorRzH.lottie"
                    autoplay
                    loop
                    style={{ width: "100%", height: "100%" }}
                  />
                ) : (
                  <div className="w-full h-full bg-navy-950/10" />
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Stats Bar */}
      <section className="bg-white border-y border-slate-200 py-10 shadow-sm scroll-fade-up">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center items-center">
            <div>
              <p className="text-4xl font-extrabold text-navy-800">
                <Counter target={7} suffix="+" />
              </p>
              <p className="text-sm font-medium text-slate-500 mt-1">Years Sourcing Experience</p>
            </div>
            <div>
              <p className="text-4xl font-extrabold text-navy-800">
                <Counter target={10000} suffix="+" />
              </p>
              <p className="text-sm font-medium text-slate-500 mt-1">Candidate Database</p>
            </div>
            <div>
              <p className="text-4xl font-extrabold text-navy-800">
                <Counter target={7} />
              </p>
              <p className="text-sm font-medium text-slate-500 mt-1">Active Clients</p>
            </div>
            <div>
              <p className="text-2xl font-extrabold text-navy-800 h-10 flex items-center justify-center">
                Back Support
              </p>
              <p className="text-sm font-medium text-slate-500 mt-1">Partner Agency Network</p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Profile & Journey Section */}
      <section className="py-24 bg-slate-50 border-t border-slate-200/60 space-y-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          {/* Block 1: Who We Are */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6">
              <span className="text-xs font-bold uppercase tracking-widest text-gold-600">
                Who We Are
              </span>
              <ScrollFloat
                containerClassName="my-2"
                textClassName="text-3xl font-extrabold text-navy-800 tracking-tight sm:text-4xl leading-tight text-left"
              >
                Technology-Driven Human Resource Recruitment and Staffing Partner
              </ScrollFloat>
              <div className="space-y-4 text-slate-600 leading-relaxed text-sm">
                <p>
                  DSS Talent Bridge is a technology-driven Human Resource Recruitment and Staffing firm committed to connecting exceptional talent with forward-thinking organizations. Founded by recruitment professionals with over 7 years of industry experience, we specialize in delivering tailored hiring solutions that help businesses build high-performing teams.
                </p>
                <p>
                  Our expertise spans Technology, BFSI, AI & Machine Learning, Cloud Computing, ERP & SAP, Data Science, Software Engineering, Cybersecurity, and Digital Transformation. We support organizations with permanent, contract, leadership, and project-based hiring across India and global markets.
                </p>
                <p>
                  At DSS Talent Bridge, we believe recruitment is more than filling positions—it's about creating long-term partnerships. By combining market intelligence, technology-enabled sourcing, and a consultative approach, we deliver quality talent with speed, precision, and integrity.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8">
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex flex-col gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-navy-800 text-white shrink-0">
                    <Compass className="h-5 w-5" />
                  </div>
                  <h3 className="text-base font-bold text-navy-800">Our Mission</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    To bridge the gap between exceptional talent and exceptional organizations through innovative, reliable, and people-centric recruitment solutions.
                  </p>
                </div>

                <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex flex-col gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gold-500 text-white shrink-0">
                    <Award className="h-5 w-5" />
                  </div>
                  <h3 className="text-base font-bold text-navy-800">Our Vision</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    To become a trusted global recruitment partner known for quality, transparency, and excellence in talent acquisition.
                  </p>
                </div>
              </div>
            </div>

            {/* Right Graphic */}
            <div className="lg:col-span-5 flex justify-center w-full">
              <div className="relative w-full h-[320px] sm:h-[400px] max-w-[460px] rounded-3xl bg-gradient-to-tr from-navy-900 to-navy-700/80 p-6 shadow-xl border border-slate-700/50 flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-navy-950/20 z-10 pointer-events-none" />
                {isMounted ? (
                  <DotLottieWC
                    src="https://lottie.host/855fb9c9-3416-492b-a997-4593a6436b98/y10m8zau5l.lottie"
                    autoplay
                    loop
                    style={{ width: "100%", height: "100%" }}
                  />
                ) : (
                  <div className="w-full h-full bg-navy-950/10" />
                )}
              </div>
            </div>
          </div>

          <hr className="my-20 border-slate-200/60" />

          {/* Block 2: Niche Industry Focus */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Graphic (Alternating) */}
            <div className="lg:col-span-5 order-2 lg:order-1 flex justify-center w-full">
              <div className="relative w-full h-[320px] sm:h-[400px] max-w-[460px] rounded-3xl bg-gradient-to-tr from-navy-900 to-navy-700/80 p-6 shadow-xl border border-slate-700/50 flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-navy-950/20 z-10 pointer-events-none" />
                {isMounted ? (
                  <DotLottieWC
                    src="https://lottie.host/a2184b50-4a28-4032-9280-4e95f8cbe905/vC2hn36Arg.lottie"
                    autoplay
                    loop
                    style={{ width: "100%", height: "100%" }}
                  />
                ) : (
                  <div className="w-full h-full bg-navy-950/10" />
                )}
              </div>
            </div>

            {/* Right Content */}
            <div className="lg:col-span-7 order-1 lg:order-2 space-y-6">
              <span className="text-xs font-bold uppercase tracking-widest text-gold-600">
                Specialized Portfolios
              </span>
              <h2 className="text-3xl font-extrabold text-navy-800 tracking-tight sm:text-4xl leading-tight">
                Niche Verticals We Serve
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                From enterprise banking systems to advanced machine learning pipelines, we map skillsets across high-complexity sectors.
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-8">
                {expertises.map((exp, i) => {
                  const Icon = exp.icon;
                  return (
                    <div
                      key={i}
                      className="bg-white rounded-xl p-4 border border-slate-100 flex flex-col gap-3 shadow-sm hover:border-gold-500/50 hover:shadow-md transition-all duration-300"
                    >
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gold-500/10 text-gold-600 shrink-0">
                        <Icon className="h-5 w-5" />
                      </div>
                      <span className="text-xs font-bold text-navy-800 leading-snug">{exp.name}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <hr className="my-20 border-slate-200/60" />

          {/* Block 3: Our Primary Operational Hubs */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6">
              <span className="text-xs font-bold uppercase tracking-widest text-gold-600">
                Local Authority
              </span>
              <h2 className="text-3xl font-extrabold text-navy-800 tracking-tight sm:text-4xl leading-tight">
                Our Primary Operational Hubs
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                Positioned in major tech corridors across India to tap into regional excellence pipelines and manage localized requirements.
              </p>

              <div className="space-y-6 mt-8">
                {/* Bangalore Hub */}
                <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 flex flex-col sm:flex-row gap-4 hover:border-navy-600/20 transition-all">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-navy-800 text-white shrink-0">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div className="space-y-1.5">
                    <h3 className="text-base font-bold text-navy-800">Bangalore Hub (HQ)</h3>
                    <p className="text-[10px] font-semibold text-gold-600 uppercase tracking-wider">
                      Technology, AI & BFSI Sourcing Center
                    </p>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Located in India's Silicon Valley, our Bangalore office connects cloud architects, data scientists, and BFSI software engineers with global enterprise clients.
                    </p>
                    <div className="text-[11px] text-slate-500 font-medium pt-1">
                      <span className="font-bold text-slate-700 block mb-0.5">Regional Specializations:</span>
                      AI & ML Engineers, Azure/AWS Architects, ERP & SAP HANA, Cyber Defense Teams.
                    </div>
                  </div>
                </div>

                {/* Nagpur Hub */}
                <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 flex flex-col sm:flex-row gap-4 hover:border-navy-600/20 transition-all">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-navy-800 text-white shrink-0">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div className="space-y-1.5">
                    <h3 className="text-base font-bold text-navy-800">Nagpur Hub</h3>
                    <p className="text-[10px] font-semibold text-gold-600 uppercase tracking-wider">
                      Software Engineering & Digital Transformation Center
                    </p>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Serving the growing tech ecosystem in central India, our Nagpur team handles contract staffing and core software engineering placements.
                    </p>
                    <div className="text-[11px] text-slate-500 font-medium pt-1">
                      <span className="font-bold text-slate-700 block mb-0.5">Regional Specializations:</span>
                      Full Stack Developers, ERP Specialists, Project Managers, Cybersecurity Analysts.
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Graphic */}
            <div className="lg:col-span-5 flex justify-center w-full">
              <div className="relative w-full h-[320px] sm:h-[400px] max-w-[460px] rounded-3xl bg-gradient-to-tr from-navy-900 to-navy-700/80 p-6 shadow-xl border border-slate-700/50 flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-navy-950/20 z-10 pointer-events-none" />
                {isMounted ? (
                  <DotLottieWC
                    src="https://lottie.host/f15d366d-6095-4d36-8bd3-1e5a59893557/bKnL9WnoZy.lottie"
                    autoplay
                    loop
                    style={{ width: "100%", height: "100%" }}
                  />
                ) : (
                  <div className="w-full h-full bg-navy-950/10" />
                )}
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Featured Jobs Section */}
      <section id="featured-jobs" className="py-24 bg-white border-b border-slate-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 scroll-fade-up">
            <span className="text-xs font-bold uppercase tracking-widest text-gold-600 bg-gold-600/10 px-3 py-1 rounded-full">
              Featured Opportunities
            </span>
            <h2 className="mt-3 text-3xl font-extrabold text-navy-800 tracking-tight sm:text-4xl">
              Explore Active Career Openings
            </h2>
            <p className="mt-4 text-slate-600">
              Apply to high-impact technical and leadership roles with top enterprises and rapid-growth technology companies.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {mockJobs.slice(0, 3).map((job) => (
              <div
                key={job.id}
                className="bg-slate-50 border border-slate-100 rounded-2xl p-6 flex flex-col justify-between hover:shadow-xl hover:border-gold-500/30 transition-all duration-300 transform hover:-translate-y-1 group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-navy-700 bg-navy-50 px-2.5 py-1 rounded-md">
                      {job.department}
                    </span>
                    <span className="text-[10px] font-semibold text-slate-500 bg-white border border-slate-200/50 px-2.5 py-1 rounded-md">
                      {job.type}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-navy-800 group-hover:text-navy-950 transition-colors mb-2 line-clamp-1">
                    {job.title}
                  </h3>

                  <p className="text-xs text-slate-600 leading-relaxed mb-6 line-clamp-3">
                    {job.description}
                  </p>

                  <div className="space-y-2 mb-6">
                    <div className="flex items-center gap-2 text-xs text-slate-500">
                      <MapPin className="h-4 w-4 text-gold-500 shrink-0" />
                      <span>{job.location} Hub</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-slate-500">
                      <Briefcase className="h-4 w-4 text-gold-500 shrink-0" />
                      <span>Experience: {job.experience}</span>
                    </div>
                  </div>
                </div>

                <Link
                  href={`/jobs?id=${job.id}`}
                  className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-navy-800 hover:bg-navy-700 text-white font-bold text-xs py-3 px-4 shadow transition-all duration-200"
                >
                  View Details
                  <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            ))}
          </div>

          <div className="text-center mt-12 scroll-fade-up">
            <Link
              href="/jobs"
              className="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-navy-800 text-navy-800 font-bold text-sm py-3.5 px-8 hover:bg-navy-800 hover:text-white transition-all duration-200"
            >
              Browse All Open Positions
              <Briefcase className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Slogan Reveal Section */}
      <section className="relative py-24 text-white overflow-hidden border-y border-slate-700/50">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center scale-110"
            style={{ backgroundImage: "url('/hero_manufacturing.png')" }}
            ref={sloganBgRef}
          />
          <div className="absolute inset-0 bg-navy-950/90 z-10" />
        </div>
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center relative z-20 scroll-fade-up flex flex-col items-center gap-8">
          <div className="bg-navy-950/50 backdrop-blur-md rounded-3xl p-8 sm:p-10 border border-white/10 max-w-4xl mx-auto shadow-2xl">
            <span className="text-xs font-bold uppercase tracking-widest text-gold-400">Our Slogan</span>
            <ScrollReveal
              baseOpacity={0.05}
              enableBlur={true}
              baseRotation={2}
              blurStrength={6}
              textClassName="text-white text-center text-2xl sm:text-4xl font-extrabold max-w-3xl mx-auto leading-relaxed mt-4 animate-font-heading"
            >
              Bridging the Gap Between Exceptional Talent and Exceptional Companies.
            </ScrollReveal>
          </div>

          {/* Slogan Animations Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 justify-center items-center w-full max-w-4xl mt-10">
            {isMounted ? (
              <>
                <div className="flex flex-col items-center justify-center bg-navy-900/60 backdrop-blur-lg rounded-2xl p-6 border border-white/15 hover:border-gold-500/50 transition-all duration-300 transform hover:scale-[1.03] shadow-lg">
                  <div className="w-[180px] h-[180px]">
                    <DotLottieWC
                      src="https://lottie.host/b8ee9e92-4486-49e0-bb0e-0c8e5a9c2dfc/bZADDsJGUq.lottie"
                      autoplay
                      loop
                      style={{ width: "100%", height: "100%" }}
                    />
                  </div>
                  <span className="text-sm font-bold uppercase tracking-widest text-gold-400 mt-4 drop-shadow-md">Innovative Solutions</span>
                </div>

                <div className="flex flex-col items-center justify-center bg-navy-900/60 backdrop-blur-lg rounded-2xl p-6 border border-white/15 hover:border-gold-500/50 transition-all duration-300 transform hover:scale-[1.03] shadow-lg">
                  <div className="w-[180px] h-[180px]">
                    <DotLottieWC
                      src="https://lottie.host/a7fa4a4f-abc5-4c3e-b646-4b1c4bbae31f/mRqZLQZGDM.lottie"
                      autoplay
                      loop
                      style={{ width: "100%", height: "100%" }}
                    />
                  </div>
                  <span className="text-sm font-bold uppercase tracking-widest text-gold-400 mt-4 drop-shadow-md">Exceptional Talent</span>
                </div>

                <div className="flex flex-col items-center justify-center bg-navy-900/60 backdrop-blur-lg rounded-2xl p-6 border border-white/15 hover:border-gold-500/50 transition-all duration-300 transform hover:scale-[1.03] shadow-lg">
                  <div className="w-[180px] h-[180px]">
                    <DotLottieWC
                      src="https://lottie.host/959fcaa7-1746-4121-b133-57ec740b141f/by86ozfyle.lottie"
                      autoplay
                      loop
                      style={{ width: "100%", height: "100%" }}
                    />
                  </div>
                  <span className="text-sm font-bold uppercase tracking-widest text-gold-400 mt-4 drop-shadow-md">Global Network</span>
                </div>
              </>
            ) : (
              <>
                <div className="h-[240px] rounded-2xl bg-navy-950/20" />
                <div className="h-[240px] rounded-2xl bg-navy-950/20" />
                <div className="h-[240px] rounded-2xl bg-navy-950/20" />
              </>
            )}
          </div>
        </div>
      </section>

      {/* Services Showcase */}
      <section id="services" className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 scroll-fade-up">
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
                <Link
                  key={i}
                  href="/contact"
                  className="bg-slate-50 hover:bg-white rounded-2xl p-8 border border-slate-100 service-card-hover flex flex-col gap-4 group scroll-fade-up"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-navy-800 text-white group-hover:bg-navy-700 transition-colors">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-bold text-navy-800 mt-2">{svc.title}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{svc.description}</p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 bg-white border-t border-slate-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 scroll-fade-up">
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
              Clear, transparent answers regarding our recruitment workflows, locations, and staffing services.
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-4 scroll-fade-up">
            {faqData.map((faq, i) => (
              <div
                key={i}
                className="bg-slate-50 rounded-xl border border-slate-100 overflow-hidden transition-all duration-200"
              >
                <button
                  onClick={() => toggleFaq(i)}
                  className="w-full flex items-center justify-between p-5 text-left font-bold text-navy-800 focus:outline-none"
                  suppressHydrationWarning
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
