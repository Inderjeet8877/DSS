"use client";

import React, { useState, useMemo } from "react";
import { Building2, Send, Loader2, CheckCircle2, ChevronRight, HelpCircle } from "lucide-react";
import { HiringPostInput } from "@/lib/validation/schemas";
import ScrollFloat from "@/components/animations/ScrollFloat";
import TextType from "@/components/animations/TextType";

export default function ClientHirePage() {
  const [formData, setFormData] = useState<HiringPostInput>({
    companyName: "",
    contactName: "",
    contactEmail: "",
    contactPhone: "",
    roleTitle: "",
    techStack: "",
    locationPreference: "No Preference",
    description: "",
  });

  const [errors, setErrors] = useState<Partial<Record<keyof HiringPostInput, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof HiringPostInput]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof HiringPostInput, string>> = {};

    if (!formData.companyName.trim()) newErrors.companyName = "Company name is required";
    else if (formData.companyName.length < 2) newErrors.companyName = "Company name must be at least 2 characters";

    if (!formData.contactName.trim()) newErrors.contactName = "Contact person name is required";
    else if (formData.contactName.length < 2) newErrors.contactName = "Contact name must be at least 2 characters";

    if (!formData.contactEmail.trim()) newErrors.contactEmail = "Contact email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.contactEmail)) newErrors.contactEmail = "Invalid email format";

    if (!formData.contactPhone.trim()) newErrors.contactPhone = "Contact phone is required";
    else if (formData.contactPhone.replace(/\D/g, "").length < 10) newErrors.contactPhone = "Must be a valid 10+ digit phone number";

    if (!formData.roleTitle.trim()) newErrors.roleTitle = "Role title is required";
    else if (formData.roleTitle.length < 2) newErrors.roleTitle = "Role title must be at least 2 characters";

    if (!formData.techStack.trim()) newErrors.techStack = "Tech stack is required";

    if (!formData.description.trim()) newErrors.description = "Role description is required";
    else if (formData.description.length < 10) newErrors.description = "Description must be at least 10 characters";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setSubmitStatus("idle");
    setErrorMessage("");

    try {
      const response = await fetch("/api/post-job", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        setSubmitStatus("success");
        setFormData({
          companyName: "",
          contactName: "",
          contactEmail: "",
          contactPhone: "",
          roleTitle: "",
          techStack: "",
          locationPreference: "No Preference",
          description: "",
        });
      } else {
        setSubmitStatus("error");
        setErrorMessage(result.error || "Submission failed. Please try again.");
      }
    } catch (err) {
      setSubmitStatus("error");
      setErrorMessage("Network error. Please check your connection and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Structured Data Schema for Organization / Local Business
  const organizationSchema = useMemo(() => {
    return {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "DSS Talent Bridge",
      "alternateName": "DSS Talent Acquisition & Staffing",
      "url": "https://dsstalentbridge.com",
      "logo": "https://dsstalentbridge.com/logo.jpeg",
      "contactPoint": [
        {
          "@type": "ContactPoint",
          "telephone": "+91-98765-43210",
          "contactType": "customer service",
          "areaServed": "IN",
          "availableLanguage": ["en", "hi"]
        }
      ],
      "address": [
        {
          "@type": "PostalAddress",
          "addressLocality": "Bangalore",
          "addressRegion": "KA",
          "addressCountry": "IN"
        },
        {
          "@type": "PostalAddress",
          "addressLocality": "Nagpur",
          "addressRegion": "MH",
          "addressCountry": "IN"
        }
      ]
    };
  }, []);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      {/* Schema Injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />

      {/* Banner */}
      <div className="mb-12 text-center max-w-3xl mx-auto">
        <span className="text-xs font-bold uppercase tracking-widest text-gold-500 bg-gold-500/10 px-3 py-1 rounded-full">
          Employer Portal
        </span>
        <ScrollFloat
          containerClassName="mt-3"
          textClassName="text-4xl font-extrabold text-navy-800 tracking-tight sm:text-5xl leading-tight"
        >
          Partner With Recruiting Experts
        </ScrollFloat>
        <div className="mt-4 text-lg text-slate-600 min-h-[56px] sm:min-h-[48px]">
          <TextType
            text={[
              "Access high-caliber talent to drive your organizational growth.",
              "Submit your recruitment requirements to tap into our vetted pipeline.",
              "Our specialists in Bangalore and Nagpur map premium resources."
            ]}
            typingSpeed={50}
            pauseDuration={2500}
            deletingSpeed={30}
            showCursor={true}
            cursorCharacter="|"
            cursorClassName="text-gold-500 font-bold"
            className="text-slate-600 font-medium inline"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
        {/* Left Side: Information */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-navy-800 rounded-2xl p-8 text-white shadow-lg border border-slate-700/50">
            <h2 className="text-xl font-bold border-b border-white/10 pb-4 mb-6">
              Why Partner With Us?
            </h2>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <ChevronRight className="h-5 w-5 text-gold-400 shrink-0 mt-0.5" />
                <p className="text-sm text-slate-300">
                  <span className="font-semibold text-white">Niche Expertise:</span> Deeps roots in AI, Cloud Computing, BFSI, ERP/SAP, and Cybersecurity.
                </p>
              </li>
              <li className="flex items-start gap-3">
                <ChevronRight className="h-5 w-5 text-gold-400 shrink-0 mt-0.5" />
                <p className="text-sm text-slate-300">
                  <span className="font-semibold text-white">Rapid TAT:</span> Leverage our pre-screened pipeline to close critical positions in record time.
                </p>
              </li>
              <li className="flex items-start gap-3">
                <ChevronRight className="h-5 w-5 text-gold-400 shrink-0 mt-0.5" />
                <p className="text-sm text-slate-300">
                  <span className="font-semibold text-white">7+ Years of Trust:</span> Driven by industry veterans committed to quality and operational transparency.
                </p>
              </li>
            </ul>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100">
            <h3 className="text-base font-bold text-navy-800 mb-4">
              How the Process Works
            </h3>
            <ol className="space-y-4 text-sm text-slate-600">
              <li className="flex gap-3">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gold-500/10 text-xs font-bold text-gold-600 shrink-0">
                  1
                </span>
                <p>Submit your hiring requirements via this portal.</p>
              </li>
              <li className="flex gap-3">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gold-500/10 text-xs font-bold text-gold-600 shrink-0">
                  2
                </span>
                <p>A designated account manager reviews the tech stack and roles.</p>
              </li>
              <li className="flex gap-3">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gold-500/10 text-xs font-bold text-gold-600 shrink-0">
                  3
                </span>
                <p>We source, screen, and present top-tier matches within 48 hours.</p>
              </li>
            </ol>
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl shadow-md border border-slate-100 p-8">
            {submitStatus === "success" ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <CheckCircle2 className="h-16 w-16 text-emerald-500 mb-4" />
                <h3 className="text-2xl font-bold text-navy-800">Requirements Received!</h3>
                <p className="mt-2 text-slate-600 max-w-md">
                  Thank you for submitting your hiring request. A consultant from our{" "}
                  <span className="font-semibold">DSS Talent Bridge</span> advisory team will reach out to you within 24 business hours to coordinate.
                </p>
                <button
                  onClick={() => setSubmitStatus("idle")}
                  className="mt-8 rounded-lg bg-navy-800 px-6 py-2.5 text-sm font-semibold text-white shadow-md hover:bg-navy-700 transition-colors"
                >
                  Submit Another Requirement
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="flex items-center gap-3 border-b border-slate-100 pb-4 mb-6">
                  <Building2 className="h-6 w-6 text-gold-500" />
                  <h2 className="text-lg font-bold text-navy-800">Intake Form</h2>
                </div>

                {submitStatus === "error" && (
                  <div className="rounded-lg bg-rose-50 border border-rose-200 p-4 text-sm text-rose-700">
                    {errorMessage}
                  </div>
                )}

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  {/* Company Name */}
                  <div>
                    <label htmlFor="companyName" className="block text-sm font-semibold text-slate-700 mb-1">
                      Company Name <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="companyName"
                      id="companyName"
                      value={formData.companyName}
                      onChange={handleChange}
                      className={`w-full rounded-lg border px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gold-500/30 ${
                        errors.companyName ? "border-rose-400 focus:border-rose-500" : "border-slate-200 focus:border-gold-500"
                      }`}
                      placeholder="e.g. Acme Tech Solutions"
                      disabled={isSubmitting}
                    />
                    {errors.companyName && <p className="mt-1 text-xs text-rose-500">{errors.companyName}</p>}
                  </div>

                  {/* Role Title */}
                  <div>
                    <label htmlFor="roleTitle" className="block text-sm font-semibold text-slate-700 mb-1">
                      Role to Fill <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="roleTitle"
                      id="roleTitle"
                      value={formData.roleTitle}
                      onChange={handleChange}
                      className={`w-full rounded-lg border px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gold-500/30 ${
                        errors.roleTitle ? "border-rose-400 focus:border-rose-500" : "border-slate-200 focus:border-gold-500"
                      }`}
                      placeholder="e.g. Lead React Developer"
                      disabled={isSubmitting}
                    />
                    {errors.roleTitle && <p className="mt-1 text-xs text-rose-500">{errors.roleTitle}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  {/* Tech Stack */}
                  <div>
                    <label htmlFor="techStack" className="block text-sm font-semibold text-slate-700 mb-1">
                      Required Tech Stack <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="techStack"
                      id="techStack"
                      value={formData.techStack}
                      onChange={handleChange}
                      className={`w-full rounded-lg border px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gold-500/30 ${
                        errors.techStack ? "border-rose-400 focus:border-rose-500" : "border-slate-200 focus:border-gold-500"
                      }`}
                      placeholder="e.g. Next.js, Node.js, AWS, Postgres"
                      disabled={isSubmitting}
                    />
                    {errors.techStack && <p className="mt-1 text-xs text-rose-500">{errors.techStack}</p>}
                  </div>

                  {/* Location Preference */}
                  <div>
                    <label htmlFor="locationPreference" className="block text-sm font-semibold text-slate-700 mb-1">
                      Location Preference
                    </label>
                    <select
                      name="locationPreference"
                      id="locationPreference"
                      value={formData.locationPreference}
                      onChange={handleChange}
                      className="w-full rounded-lg border border-slate-200 px-4 py-2.5 text-sm bg-white focus:outline-none focus:border-gold-500 focus:ring-2 focus:ring-gold-500/20"
                      disabled={isSubmitting}
                    >
                      <option value="No Preference">No Preference</option>
                      <option value="Bangalore">Bangalore</option>
                      <option value="Nagpur">Nagpur</option>
                      <option value="Remote">Remote</option>
                      <option value="Hybrid">Hybrid</option>
                    </select>
                  </div>
                </div>

                {/* Divider for Contact Info */}
                <div className="relative py-4">
                  <div className="absolute inset-0 flex items-center" aria-hidden="true">
                    <div className="w-full border-t border-slate-100"></div>
                  </div>
                  <div className="relative flex justify-start">
                    <span className="bg-white pr-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
                      Contact Information
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
                  {/* Contact Name */}
                  <div>
                    <label htmlFor="contactName" className="block text-sm font-semibold text-slate-700 mb-1">
                      Your Name <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="contactName"
                      id="contactName"
                      value={formData.contactName}
                      onChange={handleChange}
                      className={`w-full rounded-lg border px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gold-500/30 ${
                        errors.contactName ? "border-rose-400 focus:border-rose-500" : "border-slate-200 focus:border-gold-500"
                      }`}
                      placeholder="Jane Smith"
                      disabled={isSubmitting}
                    />
                    {errors.contactName && <p className="mt-1 text-xs text-rose-500">{errors.contactName}</p>}
                  </div>

                  {/* Contact Email */}
                  <div>
                    <label htmlFor="contactEmail" className="block text-sm font-semibold text-slate-700 mb-1">
                      Business Email <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="email"
                      name="contactEmail"
                      id="contactEmail"
                      value={formData.contactEmail}
                      onChange={handleChange}
                      className={`w-full rounded-lg border px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gold-500/30 ${
                        errors.contactEmail ? "border-rose-400 focus:border-rose-500" : "border-slate-200 focus:border-gold-500"
                      }`}
                      placeholder="jane@company.com"
                      disabled={isSubmitting}
                    />
                    {errors.contactEmail && <p className="mt-1 text-xs text-rose-500">{errors.contactEmail}</p>}
                  </div>

                  {/* Contact Phone */}
                  <div>
                    <label htmlFor="contactPhone" className="block text-sm font-semibold text-slate-700 mb-1">
                      Phone Number <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="tel"
                      name="contactPhone"
                      id="contactPhone"
                      value={formData.contactPhone}
                      onChange={handleChange}
                      className={`w-full rounded-lg border px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gold-500/30 ${
                        errors.contactPhone ? "border-rose-400 focus:border-rose-500" : "border-slate-200 focus:border-gold-500"
                      }`}
                      placeholder="+91 98765 43210"
                      disabled={isSubmitting}
                    />
                    {errors.contactPhone && <p className="mt-1 text-xs text-rose-500">{errors.contactPhone}</p>}
                  </div>
                </div>

                {/* Job Description / Special Requirements */}
                <div>
                  <label htmlFor="description" className="block text-sm font-semibold text-slate-700 mb-1">
                    Role Description & Requirements <span className="text-rose-500">*</span>
                  </label>
                  <textarea
                    name="description"
                    id="description"
                    rows={5}
                    value={formData.description}
                    onChange={handleChange}
                    className={`w-full rounded-lg border px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gold-500/30 ${
                      errors.description ? "border-rose-400 focus:border-rose-500" : "border-slate-200 focus:border-gold-500"
                    }`}
                    placeholder="Outline job details, target salary, duration, and key candidate specifications..."
                    disabled={isSubmitting}
                  />
                  {errors.description && <p className="mt-1 text-xs text-rose-500">{errors.description}</p>}
                </div>

                {/* Submit Action */}
                <div className="flex justify-end pt-4 border-t border-slate-100">
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 rounded-lg bg-navy-800 px-8 py-3 text-sm font-semibold text-white shadow-md hover:bg-navy-700 hover:shadow-lg transition-all duration-200 border border-transparent hover:border-gold-400"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Submitting Proposal...
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4" />
                        Post Requirements
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
