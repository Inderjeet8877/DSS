"use client";

import { useState, useMemo, useEffect } from "react";
import { Search, MapPin, Briefcase, IndianRupee, Clock, ArrowRight, Filter } from "lucide-react";
import { mockJobs, Job } from "@/lib/data/jobs";
import JobApplicationModal from "@/components/JobApplicationModal";
import ScrollFloat from "@/components/animations/ScrollFloat";
import TextType from "@/components/animations/TextType";

export default function ClientJobsPage({ initialJobId }: { initialJobId?: string }) {
  // If initialJobId is provided, pre-populate search state for SEO server-render
  const initialJob = useMemo(() => {
    if (!initialJobId) return null;
    return mockJobs.find((j) => j.id === initialJobId) || null;
  }, [initialJobId]);

  const [searchTerm, setSearchTerm] = useState(initialJob ? initialJob.title : "");
  const [selectedDept, setSelectedDept] = useState<string>("All");
  const [selectedLoc, setSelectedLoc] = useState<string>("All");
  const [activeJob, setActiveJob] = useState<Job | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Synchronize search filters with URL parameters (search/id queries)
  useEffect(() => {
    const handleUrlParams = () => {
      const params = new URLSearchParams(window.location.search);
      const searchVal = params.get("search");
      const idVal = params.get("id");
      
      if (searchVal) {
        setSearchTerm(searchVal);
      } else if (idVal) {
        const matched = mockJobs.find((j) => j.id === idVal);
        if (matched) {
          setSearchTerm(matched.title);
          // Clear filters to ensure the job is visible
          setSelectedDept("All");
          setSelectedLoc("All");
        }
      }
    };

    handleUrlParams();
    
    window.addEventListener("popstate", handleUrlParams);
    return () => window.removeEventListener("popstate", handleUrlParams);
  }, []);

  // Departments list for filter
  const departments = useMemo(() => {
    const depts = new Set(mockJobs.map((j) => j.department));
    return ["All", ...Array.from(depts)];
  }, []);

  // Locations list for filter
  const locations = useMemo(() => {
    const locs = new Set(mockJobs.map((j) => j.location));
    return ["All", ...Array.from(locs)];
  }, []);

  // Filtered jobs list
  const filteredJobs = useMemo(() => {
    return mockJobs.filter((job) => {
      const matchesSearch =
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.techStack.some((tech) => tech.toLowerCase().includes(searchTerm.toLowerCase()));

      const matchesDept = selectedDept === "All" || job.department === selectedDept;
      const matchesLoc = selectedLoc === "All" || job.location === selectedLoc;

      return matchesSearch && matchesDept && matchesLoc;
    });
  }, [searchTerm, selectedDept, selectedLoc]);

  // JSON-LD JobPosting schema list
  const schemaJsonLd = useMemo(() => {
    return {
      "@context": "https://schema.org",
      "@graph": filteredJobs.map((job) => ({
        "@type": "JobPosting",
        "title": job.title,
        "description": `<p>${job.description}</p><h3>Key Requirements:</h3><ul>${job.requirements.map((req) => `<li>${req}</li>`).join("")}</ul><h3>Tech Stack:</h3><p>${job.techStack.join(", ")}</p>`,
        "datePosted": job.postedDate,
        "validThrough": "2026-12-31T23:59:59Z",
        "employmentType": job.type === "Full-Time" ? "FULL_TIME" : job.type === "Contract" ? "CONTRACTOR" : "PART_TIME",
        "hiringOrganization": {
          "@type": "Organization",
          "name": "DSS Talent Bridge",
          "sameAs": "https://dsstalentbridge.com",
          "logo": "https://dsstalentbridge.com/logo.jpeg"
        },
        "jobLocation": {
          "@type": "Place",
          "address": {
            "@type": "PostalAddress",
            "addressLocality": job.location === "Remote" ? "Bangalore" : job.location,
            "addressRegion": job.location === "Nagpur" ? "MH" : "KA",
            "addressCountry": "IN"
          }
        },
        "baseSalary": {
          "@type": "MonetaryAmount",
          "currency": "INR",
          "value": {
            "@type": "QuantitativeValue",
            "value": job.salaryRange.includes("PA") ? 2000000 : 100000,
            "unitText": job.type === "Contract" ? "MONTH" : "YEAR"
          }
        }
      }))
    };
  }, [filteredJobs]);

  const handleApplyClick = (job: Job) => {
    setActiveJob(job);
    setIsModalOpen(true);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      
      {/* JSON-LD Structured Data Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaJsonLd) }}
      />

      {/* Header Banner */}
      <div className="mb-12 text-center max-w-3xl mx-auto">
        <span className="text-xs font-bold uppercase tracking-widest text-gold-500 bg-gold-500/10 px-3 py-1 rounded-full">
          Candidate Portal
        </span>
        <ScrollFloat
          containerClassName="mt-3"
          textClassName="text-4xl font-extrabold text-navy-800 tracking-tight sm:text-5xl leading-tight"
        >
          Build Your Career Path
        </ScrollFloat>
        <div className="mt-4 text-lg text-slate-600 min-h-[56px] sm:min-h-[48px]">
          <TextType
            text={[
              "Find exceptional roles with forward-thinking organizations.",
              "Sourcing senior engineers across AI, Cloud, and BFSI sectors.",
              "Connecting top-tier talent in Bangalore, Nagpur, and globally."
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

      {/* Search and Filters Section */}
      <div className="bg-white rounded-xl shadow-md border border-slate-100 p-6 mb-8">
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-4 md:grid-cols-2">
          {/* Search bar */}
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search className="h-5 w-5 text-slate-400" />
            </span>
            <input
              type="text"
              placeholder="Search roles, tech stack..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-lg border border-slate-200 pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:border-gold-500 focus:ring-2 focus:ring-gold-500/20"
            />
          </div>

          {/* Department Filter */}
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Filter className="h-5 w-5 text-slate-400" />
            </span>
            <select
              value={selectedDept}
              onChange={(e) => setSelectedDept(e.target.value)}
              className="w-full rounded-lg border border-slate-200 pl-10 pr-4 py-2.5 text-sm appearance-none bg-white focus:outline-none focus:border-gold-500"
            >
              {departments.map((dept) => (
                <option key={dept} value={dept}>
                  {dept === "All" ? "All Departments" : dept}
                </option>
              ))}
            </select>
          </div>

          {/* Location Filter */}
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <MapPin className="h-5 w-5 text-slate-400" />
            </span>
            <select
              value={selectedLoc}
              onChange={(e) => setSelectedLoc(e.target.value)}
              className="w-full rounded-lg border border-slate-200 pl-10 pr-4 py-2.5 text-sm appearance-none bg-white focus:outline-none focus:border-gold-500"
            >
              {locations.map((loc) => (
                <option key={loc} value={loc}>
                  {loc === "All" ? "All Locations" : loc}
                </option>
              ))}
            </select>
          </div>

          {/* Search Result Stats */}
          <div className="flex items-center justify-end text-sm text-slate-500 font-semibold">
            Showing {filteredJobs.length} {filteredJobs.length === 1 ? "Job Opportunity" : "Job Opportunities"}
          </div>
        </div>
      </div>

      {/* Jobs Listing */}
      <div className="space-y-6">
        {filteredJobs.length > 0 ? (
          filteredJobs.map((job) => (
            <article
              key={job.id}
              className="bg-white rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition-all duration-300 overflow-hidden flex flex-col md:flex-row md:items-center justify-between p-6 md:p-8 hover:border-navy-600/30 group"
            >
              <div className="flex-1 md:pr-8">
                <div className="flex items-center gap-3">
                  <span className="inline-flex items-center rounded-md bg-navy-50 px-2.5 py-0.5 text-xs font-semibold text-navy-800">
                    {job.department}
                  </span>
                  <span className="inline-flex items-center rounded-md bg-slate-100 px-2.5 py-0.5 text-xs font-semibold text-slate-600">
                    {job.type}
                  </span>
                </div>
                
                <h3 className="text-xl font-bold text-navy-800 mt-3 group-hover:text-navy-900 transition-colors">
                  {job.title}
                </h3>

                <p className="mt-3 text-slate-600 text-sm leading-relaxed max-w-3xl">
                  {job.description}
                </p>

                {/* Tags / Stack */}
                <div className="flex flex-wrap gap-2 mt-4">
                  {job.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="inline-flex items-center rounded-full bg-slate-50 border border-slate-200/65 px-3 py-1 text-xs font-medium text-slate-600"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Metadata Row */}
                <div className="mt-6 flex flex-wrap gap-y-2 gap-x-6 text-xs text-slate-500 font-medium">
                  <div className="flex items-center gap-1.5">
                    <MapPin className="h-4 w-4 text-gold-500 shrink-0" />
                    <span>Office: {job.location}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <IndianRupee className="h-4 w-4 text-gold-500 shrink-0" />
                    <span>{job.salaryRange}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Briefcase className="h-4 w-4 text-gold-500 shrink-0" />
                    <span>Experience: {job.experience}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="h-4 w-4 text-gold-500 shrink-0" />
                    <span>Posted: {job.postedDate}</span>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="mt-6 md:mt-0 flex items-center shrink-0">
                <button
                  onClick={() => handleApplyClick(job)}
                  className="w-full md:w-auto inline-flex items-center justify-center gap-2 rounded-lg bg-navy-800 px-6 py-3 text-sm font-semibold text-white shadow-md hover:bg-navy-700 hover:shadow-lg transition-all duration-200 border border-transparent hover:border-gold-400 group-hover:bg-navy-700"
                >
                  Apply Now
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </article>
          ))
        ) : (
          <div className="bg-white rounded-xl shadow-sm border border-slate-100 text-center py-16 px-4">
            <Briefcase className="mx-auto h-12 w-12 text-slate-300" />
            <h3 className="mt-4 text-lg font-bold text-navy-800">No roles match your search</h3>
            <p className="mt-2 text-sm text-slate-500 max-w-sm mx-auto">
              We update our job board daily. Try adjusting your search filters or check back soon for roles in Bangalore and Nagpur.
            </p>
            <button
              onClick={() => {
                setSearchTerm("");
                setSelectedDept("All");
                setSelectedLoc("All");
              }}
              className="mt-6 text-sm font-semibold text-gold-600 hover:text-gold-500 transition-colors"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>

      {/* Modal Application Form */}
      <JobApplicationModal
        job={activeJob}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setActiveJob(null);
        }}
      />
    </div>
  );
}
