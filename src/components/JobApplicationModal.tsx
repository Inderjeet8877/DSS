"use client";

import React, { useState, useEffect } from "react";
import { X, Send, Loader2, CheckCircle2 } from "lucide-react";
import { Job } from "@/lib/data/jobs";
import { JobApplicationInput } from "@/lib/validation/schemas";

interface JobApplicationModalProps {
  job: Job | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function JobApplicationModal({ job, isOpen, onClose }: JobApplicationModalProps) {
  const [formData, setFormData] = useState<JobApplicationInput>({
    name: "",
    email: "",
    phone: "",
    resumeLink: "",
    coverLetter: "",
    jobId: "",
    jobTitle: "",
  });

  const [errors, setErrors] = useState<Partial<Record<keyof JobApplicationInput, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  // Sync job details when open
  useEffect(() => {
    if (job && isOpen) {
      setFormData((prev) => ({
        ...prev,
        jobId: job.id,
        jobTitle: job.title,
      }));
      setSubmitStatus("idle");
      setErrors({});
      setErrorMessage("");
    }
  }, [job, isOpen]);

  // Prevent scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen || !job) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof JobApplicationInput]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof JobApplicationInput, string>> = {};

    if (!formData.name.trim()) newErrors.name = "Full name is required";
    else if (formData.name.length < 2) newErrors.name = "Name must be at least 2 characters";

    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Invalid email format";

    if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
    else if (formData.phone.replace(/\D/g, "").length < 10) newErrors.phone = "Must be a valid 10+ digit phone number";

    if (!formData.resumeLink.trim()) newErrors.resumeLink = "Resume link is required";
    else if (!/^https?:\/\/[^\s$.?#].[^\s]*$/i.test(formData.resumeLink)) newErrors.resumeLink = "Must be a valid URL starting with http/https";

    if (!formData.coverLetter.trim()) newErrors.coverLetter = "Cover letter is required";
    else if (formData.coverLetter.length < 10) newErrors.coverLetter = "Cover letter must be at least 10 characters";

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
      const response = await fetch("/api/apply", {
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
          resumeLink: "",
          coverLetter: "",
          jobId: "",
          jobTitle: "",
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-2xl overflow-hidden rounded-2xl bg-white shadow-2xl border border-slate-100 flex flex-col max-h-[90vh]">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-slate-100 bg-navy-800 p-6 text-white">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-gold-300">
              Applying for Role
            </span>
            <h2 className="text-xl font-bold tracking-tight mt-0.5">{job.title}</h2>
            <p className="text-xs text-slate-300 mt-1">
              {job.department} &bull; {job.location} &bull; {job.type}
            </p>
          </div>
          <button
            onClick={onClose}
            className="rounded-full p-2 text-white/80 hover:bg-white/10 hover:text-white transition-colors"
            aria-label="Close modal"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {submitStatus === "success" ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <CheckCircle2 className="h-16 w-16 text-emerald-500 mb-4 animate-bounce" />
              <h3 className="text-2xl font-bold text-navy-800">Application Submitted!</h3>
              <p className="mt-2 text-slate-600 max-w-md">
                Thank you for applying. Your details have been securely logged in our system. A recruiter from our{" "}
                <span className="font-semibold">{job.location === "Nagpur" ? "Nagpur" : "Bangalore"}</span> office will contact you if your profile matches the role.
              </p>
              <button
                onClick={onClose}
                className="mt-8 rounded-lg bg-navy-800 px-6 py-2.5 text-sm font-semibold text-white shadow-md hover:bg-navy-700 transition-colors"
              >
                Close Window
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              {submitStatus === "error" && (
                <div className="rounded-lg bg-rose-50 border border-rose-200 p-4 text-sm text-rose-700">
                  {errorMessage}
                </div>
              )}

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
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
                    className={`w-full rounded-lg border px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gold-500/30 ${
                      errors.name ? "border-rose-400 focus:border-rose-500" : "border-slate-200 focus:border-gold-500"
                    }`}
                    placeholder="John Doe"
                    disabled={isSubmitting}
                  />
                  {errors.name && <p className="mt-1 text-xs text-rose-500">{errors.name}</p>}
                </div>

                {/* Email Address */}
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
                    className={`w-full rounded-lg border px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gold-500/30 ${
                      errors.email ? "border-rose-400 focus:border-rose-500" : "border-slate-200 focus:border-gold-500"
                    }`}
                    placeholder="john@example.com"
                    disabled={isSubmitting}
                  />
                  {errors.email && <p className="mt-1 text-xs text-rose-500">{errors.email}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                {/* Phone Number */}
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
                    className={`w-full rounded-lg border px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gold-500/30 ${
                      errors.phone ? "border-rose-400 focus:border-rose-500" : "border-slate-200 focus:border-gold-500"
                    }`}
                    placeholder="+91 98765 43210"
                    disabled={isSubmitting}
                  />
                  {errors.phone && <p className="mt-1 text-xs text-rose-500">{errors.phone}</p>}
                </div>

                {/* Resume Link */}
                <div>
                  <label htmlFor="resumeLink" className="block text-sm font-semibold text-slate-700 mb-1">
                    Resume Link (Google Drive / Dropbox) <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="url"
                    name="resumeLink"
                    id="resumeLink"
                    value={formData.resumeLink}
                    onChange={handleChange}
                    className={`w-full rounded-lg border px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gold-500/30 ${
                      errors.resumeLink ? "border-rose-400 focus:border-rose-500" : "border-slate-200 focus:border-gold-500"
                    }`}
                    placeholder="https://drive.google.com/.../my-resume"
                    disabled={isSubmitting}
                  />
                  {errors.resumeLink && <p className="mt-1 text-xs text-rose-500">{errors.resumeLink}</p>}
                </div>
              </div>

              {/* Cover Letter */}
              <div>
                <label htmlFor="coverLetter" className="block text-sm font-semibold text-slate-700 mb-1">
                  Cover Letter / Brief Profile Summary <span className="text-rose-500">*</span>
                </label>
                <textarea
                  name="coverLetter"
                  id="coverLetter"
                  rows={4}
                  value={formData.coverLetter}
                  onChange={handleChange}
                  className={`w-full rounded-lg border px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gold-500/30 ${
                    errors.coverLetter ? "border-rose-400 focus:border-rose-500" : "border-slate-200 focus:border-gold-500"
                  }`}
                  placeholder="Outline your experience, expertise, and why you fit this role..."
                  disabled={isSubmitting}
                />
                {errors.coverLetter && <p className="mt-1 text-xs text-rose-500">{errors.coverLetter}</p>}
              </div>

              {/* Form Actions */}
              <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={onClose}
                  className="rounded-lg border border-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
                  disabled={isSubmitting}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 rounded-lg bg-navy-800 px-6 py-2.5 text-sm font-semibold text-white shadow-md hover:bg-navy-700 hover:shadow-lg transition-all duration-200 border border-transparent hover:border-gold-400"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4" />
                      Submit Application
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
