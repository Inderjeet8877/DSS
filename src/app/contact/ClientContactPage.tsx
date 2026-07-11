"use client";

import React, { useState } from "react";
import { Mail, Phone, MapPin, Send, Loader2, CheckCircle2, MessageSquare, Clock, HelpCircle } from "lucide-react";
import { ContactPostInput } from "@/lib/validation/schemas";
import ScrollFloat from "@/components/animations/ScrollFloat";
import TextType from "@/components/animations/TextType";

export default function ClientContactPage() {
  const [formData, setFormData] = useState<ContactPostInput>({
    name: "",
    email: "",
    phone: "",
    subject: "",
    enquiryType: "General Inquiry",
    message: "",
  });

  const [errors, setErrors] = useState<Partial<Record<keyof ContactPostInput, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof ContactPostInput]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof ContactPostInput, string>> = {};

    if (!formData.name.trim()) newErrors.name = "Your name is required";
    else if (formData.name.length < 2) newErrors.name = "Name must be at least 2 characters";

    if (!formData.email.trim()) newErrors.email = "Email address is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Invalid email format";

    if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
    else if (formData.phone.replace(/\D/g, "").length < 10) newErrors.phone = "Must be a valid 10+ digit phone number";

    if (!formData.subject.trim()) newErrors.subject = "Subject is required";
    else if (formData.subject.length < 2) newErrors.subject = "Subject must be at least 2 characters";

    if (!formData.message.trim()) newErrors.message = "Message is required";
    else if (formData.message.length < 10) newErrors.message = "Message must be at least 10 characters";

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
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        setSubmitStatus("success");
        setFormData({
          name: "",
          email: "",
          phone: "",
          subject: "",
          enquiryType: "General Inquiry",
          message: "",
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

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      {/* Header Info */}
      <div className="mb-12 text-center max-w-3xl mx-auto">
        <span className="text-xs font-bold uppercase tracking-widest text-gold-500 bg-gold-500/10 px-3 py-1 rounded-full">
          Get In Touch
        </span>
        <ScrollFloat
          containerClassName="mt-3"
          textClassName="text-4xl font-extrabold text-navy-800 tracking-tight sm:text-5xl leading-tight"
        >
          Contact Our Recruitment Team
        </ScrollFloat>
        <div className="mt-4 text-lg text-slate-600 min-h-[56px] sm:min-h-[48px]">
          <TextType
            text={[
              "Reach out for collaborations, staffing agreements, and placements.",
              "Our recruitment experts respond within 24 business hours.",
              "Connect with our operational hubs in Bangalore & Nagpur."
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
        {/* Left Side: Office & Contact Information */}
        <div className="lg:col-span-1 space-y-6">
          {/* Bangalore Hub */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-navy-800 text-white">
                <MapPin className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-bold text-navy-800 text-base">Bangalore Hub (HQ)</h3>
                <span className="text-[10px] font-semibold uppercase tracking-wider text-gold-600 block">Silicon Valley Corridor</span>
              </div>
            </div>
          </div>

          {/* Nagpur Hub */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-navy-800 text-white">
                <MapPin className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-bold text-navy-800 text-base">Nagpur Hub</h3>
                <span className="text-[10px] font-semibold uppercase tracking-wider text-gold-600 block">Sourcing & Digital Hub</span>
              </div>
            </div>
          </div>

          {/* Communications */}
          <div className="bg-navy-800 rounded-2xl p-8 text-white shadow-lg border border-slate-700/50 space-y-6">
            <h3 className="text-lg font-bold border-b border-white/10 pb-3">Direct Channels</h3>

            <div className="flex items-center gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/10 text-gold-400">
                <Mail className="h-5 w-5" />
              </div>
              <div>
                <span className="text-xs text-slate-400 block font-medium">Email Address</span>
                <a href="mailto:hr@dsstalentbridge.com" className="text-sm font-semibold text-white hover:text-gold-400 transition-colors">
                  hr@dsstalentbridge.com
                </a>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/10 text-gold-400">
                <Phone className="h-5 w-5" />
              </div>
              <div>
                <span className="text-xs text-slate-400 block font-medium">Phone Support</span>
                <a href="tel:+919876543210" className="text-sm font-semibold text-white hover:text-gold-400 transition-colors">
                  +91 6361026230
                </a>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/10 text-gold-400">
                <Clock className="h-5 w-5" />
              </div>
              <div>
                <span className="text-xs text-slate-400 block font-medium">Business Hours</span>
                <span className="text-sm font-semibold text-slate-200 block">Mon - Sat: 9:30 AM - 6:30 PM</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl shadow-md border border-slate-100 p-8">
            {submitStatus === "success" ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <CheckCircle2 className="h-16 w-16 text-emerald-500 mb-4 animate-bounce" />
                <h3 className="text-2xl font-bold text-navy-800">Inquiry Sent!</h3>
                <p className="mt-2 text-slate-600 max-w-md">
                  Thank you for contacting DSS Talent Bridge. Your message has been logged in our tracking systems and emailed to our support administrators. A representative will connect with you shortly.
                </p>
                <button
                  onClick={() => setSubmitStatus("idle")}
                  className="mt-8 rounded-lg bg-navy-800 px-6 py-2.5 text-sm font-semibold text-white shadow-md hover:bg-navy-700 transition-colors"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="flex items-center gap-3 border-b border-slate-100 pb-4 mb-6">
                  <MessageSquare className="h-6 w-6 text-gold-500" />
                  <h2 className="text-lg font-bold text-navy-800">Contact Form</h2>
                </div>

                {submitStatus === "error" && (
                  <div className="rounded-lg bg-rose-50 border border-rose-200 p-4 text-sm text-rose-700">
                    {errorMessage}
                  </div>
                )}

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  {/* Full Name */}
                  <div>
                    <label htmlFor="name" className="block text-sm font-semibold text-slate-700 mb-1">
                      Full Name <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      value={formData.name}
                      onChange={handleChange}
                      className={`w-full rounded-lg border px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gold-500/30 ${errors.name ? "border-rose-400 focus:border-rose-500" : "border-slate-200 focus:border-gold-500"
                        }`}
                      placeholder="Jane Doe"
                      disabled={isSubmitting}
                    />
                    {errors.name && <p className="mt-1 text-xs text-rose-500">{errors.name}</p>}
                  </div>

                  {/* Email */}
                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-slate-700 mb-1">
                      Email Address <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`w-full rounded-lg border px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gold-500/30 ${errors.email ? "border-rose-400 focus:border-rose-500" : "border-slate-200 focus:border-gold-500"
                        }`}
                      placeholder="jane@example.com"
                      disabled={isSubmitting}
                    />
                    {errors.email && <p className="mt-1 text-xs text-rose-500">{errors.email}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  {/* Phone */}
                  <div>
                    <label htmlFor="phone" className="block text-sm font-semibold text-slate-700 mb-1">
                      Phone Number <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      id="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className={`w-full rounded-lg border px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gold-500/30 ${errors.phone ? "border-rose-400 focus:border-rose-500" : "border-slate-200 focus:border-gold-500"
                        }`}
                      placeholder="+91 6361026230"
                      disabled={isSubmitting}
                    />
                    {errors.phone && <p className="mt-1 text-xs text-rose-500">{errors.phone}</p>}
                  </div>

                  {/* Enquiry Type */}
                  <div>
                    <label htmlFor="enquiryType" className="block text-sm font-semibold text-slate-700 mb-1">
                      Enquiry Purpose
                    </label>
                    <select
                      name="enquiryType"
                      id="enquiryType"
                      value={formData.enquiryType}
                      onChange={handleChange}
                      className="w-full rounded-lg border border-slate-200 px-4 py-2.5 text-sm bg-white focus:outline-none focus:border-gold-500 focus:ring-2 focus:ring-gold-500/20"
                      disabled={isSubmitting}
                    >
                      <option value="General Inquiry">General Inquiry</option>
                      <option value="Collaboration">Collaboration / Business Partnership</option>
                      <option value="Technical Issue">Technical Issue</option>
                      <option value="Feedback">Feedback</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>

                {/* Subject */}
                <div>
                  <label htmlFor="subject" className="block text-sm font-semibold text-slate-700 mb-1">
                    Subject <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="subject"
                    id="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className={`w-full rounded-lg border px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gold-500/30 ${errors.subject ? "border-rose-400 focus:border-rose-500" : "border-slate-200 focus:border-gold-500"
                      }`}
                    placeholder="e.g. Sourcing collaboration query"
                    disabled={isSubmitting}
                  />
                  {errors.subject && <p className="mt-1 text-xs text-rose-500">{errors.subject}</p>}
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="message" className="block text-sm font-semibold text-slate-700 mb-1">
                    Message Details <span className="text-rose-500">*</span>
                  </label>
                  <textarea
                    name="message"
                    id="message"
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    className={`w-full rounded-lg border px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gold-500/30 ${errors.message ? "border-rose-400 focus:border-rose-500" : "border-slate-200 focus:border-gold-500"
                      }`}
                    placeholder="Detail your request, issue, or collaboration proposal here..."
                    disabled={isSubmitting}
                  />
                  {errors.message && <p className="mt-1 text-xs text-rose-500">{errors.message}</p>}
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
                        Sending Message...
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4" />
                        Send Message
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
