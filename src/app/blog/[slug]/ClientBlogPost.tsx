"use client";

import { useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { Calendar, Clock, User, ArrowLeft, ArrowRight, Sparkles, Building, Briefcase } from "lucide-react";
import { BlogPost } from "@/lib/data/blogs";

interface ClientBlogPostProps {
  post: BlogPost;
}

export default function ClientBlogPost({ post }: ClientBlogPostProps) {
  
  // JSON-LD Structured Data Schema for BlogPosting
  const blogSchema = useMemo(() => {
    return {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "headline": post.title,
      "description": post.excerpt,
      "datePublished": `${post.date}T09:00:00Z`,
      "dateModified": `${post.date}T10:00:00Z`,
      "author": {
        "@type": "Person",
        "name": post.author,
        "jobTitle": post.authorRole
      },
      "publisher": {
        "@type": "Organization",
        "name": "DSS Talent Bridge",
        "logo": {
          "@type": "ImageObject",
          "url": "https://dsstalentbridge.com/logo.jpeg"
        }
      },
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": `https://dsstalentbridge.com/blog/${post.slug}`
      }
    };
  }, [post]);

  return (
    <article className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      {/* Schema Injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }}
      />

      {/* Back to Hub Link */}
      <div className="mb-6">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-navy-800 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Blog Hub
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        
        {/* Main Content (left) */}
        <div className="lg:col-span-8 bg-white rounded-2xl shadow-sm border border-slate-100 p-8 sm:p-12">
          {/* Tags */}
          <div className="flex gap-2 mb-4">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center rounded-md bg-navy-50 px-2.5 py-0.5 text-xs font-semibold text-navy-800"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Title H1 */}
          <h1 className="text-3xl font-extrabold text-navy-800 tracking-tight sm:text-4xl leading-tight mb-6">
            {post.title}
          </h1>

          {/* Author/Date Row */}
          <div className="flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-slate-400 font-medium pb-6 border-b border-slate-100 mb-8">
            <div className="flex items-center gap-1.5">
              <Calendar className="h-4 w-4 text-gold-500" />
              <span>Published: {post.date}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="h-4 w-4 text-gold-500" />
              <span>Reading: {post.readTime}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <User className="h-4 w-4 text-gold-500" />
              <span>Written by: {post.author}</span>
            </div>
          </div>

          {/* Featured Image */}
          <div className="relative h-64 sm:h-96 w-full overflow-hidden rounded-xl mb-8 border border-slate-100 bg-slate-50">
            <Image
              src={post.image}
              alt={post.title}
              fill
              priority
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 75vw, 800px"
              className="object-cover"
            />
          </div>

          {/* HTML parsed body */}
          <div
            className="prose prose-slate max-w-none text-slate-600 space-y-6 text-sm sm:text-base leading-relaxed
                       prose-headings:text-navy-800 prose-headings:font-bold prose-headings:mt-8 prose-headings:mb-3
                       prose-h2:text-xl prose-h3:text-lg prose-ul:list-disc prose-ul:pl-6 prose-ul:space-y-2"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </div>

        {/* Sidebar Info (right) */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Author Card */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 space-y-4">
            <h3 className="font-bold text-navy-800 text-base border-b border-slate-100 pb-3">
              About the Author
            </h3>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gold-500/10 text-gold-600 font-bold">
                {post.author.charAt(0)}
              </div>
              <div>
                <h4 className="font-bold text-navy-800 text-sm">{post.author}</h4>
                <p className="text-xs text-slate-500 font-medium">{post.authorRole}</p>
              </div>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">
              Provides strategic human resource insights and staffing advisory for cloud computing, ERP, AI integrations, and BFSI operations across India.
            </p>
          </div>

          {/* Context Locations */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 space-y-4">
            <h3 className="font-bold text-navy-800 text-base border-b border-slate-100 pb-3">
              Operational Hubs
            </h3>
            <ul className="text-xs text-slate-500 space-y-2.5 font-medium">
              <li className="flex items-start gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-gold-500 mt-1.5 shrink-0" />
                <span><strong>Bangalore HQ:</strong> Technology, AI/ML, and BFSI placement corridor.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-gold-500 mt-1.5 shrink-0" />
                <span><strong>Nagpur Office:</strong> Sourcing, contract staffing, and digital consultation.</span>
              </li>
            </ul>
          </div>

          {/* Action CTAs */}
          <div className="bg-navy-800 rounded-2xl p-6 text-white shadow-lg border border-slate-700/50 space-y-5">
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-gold-400 shrink-0" />
              <h3 className="font-bold text-white text-base">Partner with DSS</h3>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Let us solve your resource challenges. We deploy certified specialists to align with your deadlines.
            </p>
            <div className="grid grid-cols-1 gap-2 pt-2">
              <Link
                href="/hire"
                className="flex items-center justify-center gap-2 rounded-lg bg-gold-500 px-4 py-2.5 text-xs font-bold text-navy-800 shadow hover:bg-gold-400 transition-colors"
              >
                <Building className="h-4 w-4" />
                Submit Job Requirement
              </Link>
              <Link
                href="/jobs"
                className="flex items-center justify-center gap-2 rounded-lg border border-slate-500 px-4 py-2.5 text-xs font-bold text-white hover:bg-white/10 transition-colors"
              >
                <Briefcase className="h-4 w-4" />
                Browse Open Roles
              </Link>
            </div>
          </div>

        </div>

      </div>
    </article>
  );
}
