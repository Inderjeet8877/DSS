"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, Calendar, Clock, User, ArrowRight, BookOpen } from "lucide-react";
import { blogPosts, BlogPost } from "@/lib/data/blogs";
import ScrollFloat from "@/components/animations/ScrollFloat";
import TextType from "@/components/animations/TextType";

export default function ClientBlogPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTag, setSelectedTag] = useState<string>("All");

  // Dynamically extract all unique tags
  const tagsList = useMemo(() => {
    const tags = new Set<string>();
    blogPosts.forEach((post) => post.tags.forEach((tag) => tags.add(tag)));
    return ["All", ...Array.from(tags)];
  }, []);

  // Filter posts
  const filteredPosts = useMemo(() => {
    return blogPosts.filter((post) => {
      const matchesSearch =
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.tags.some((t) => t.toLowerCase().includes(searchTerm.toLowerCase()));

      const matchesTag = selectedTag === "All" || post.tags.includes(selectedTag);

      return matchesSearch && matchesTag;
    });
  }, [searchTerm, selectedTag]);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      {/* Banner */}
      <div className="mb-12 text-center max-w-3xl mx-auto">
        <span className="text-xs font-bold uppercase tracking-widest text-gold-500 bg-gold-500/10 px-3 py-1 rounded-full">
          Insights Hub
        </span>
        <ScrollFloat
          containerClassName="mt-3"
          textClassName="text-4xl font-extrabold text-navy-800 tracking-tight sm:text-5xl leading-tight"
        >
          Sourcing & Recruitment Blog
        </ScrollFloat>
        <div className="mt-4 text-lg text-slate-600 min-h-[56px] sm:min-h-[48px]">
          <TextType
            text={[
              "In-depth perspectives, trends, and playbooks written by specialists.",
              "Staffing intelligence spanning AI, Cloud, SAP, and BFSI sectors.",
              "Weekly insights covering Bangalore, Nagpur, and global corridors."
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

      {/* Search and Tag Filter Bar */}
      <div className="bg-white rounded-xl shadow-md border border-slate-100 p-6 mb-10 flex flex-col md:flex-row gap-4 items-center justify-between">
        
        {/* Search */}
        <div className="relative w-full md:max-w-md">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search className="h-5 w-5 text-slate-400" />
          </span>
          <input
            type="text"
            placeholder="Search articles, keywords..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-lg border border-slate-200 pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:border-gold-500 focus:ring-2 focus:ring-gold-500/20"
          />
        </div>

        {/* Filter tags list */}
        <div className="flex flex-wrap gap-2 justify-start md:justify-end w-full md:w-auto">
          {tagsList.map((tag) => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              className={`rounded-full px-4 py-1.5 text-xs font-semibold tracking-wide transition-all ${
                selectedTag === tag
                  ? "bg-navy-800 text-white shadow-sm"
                  : "bg-slate-50 text-slate-600 border border-slate-200/60 hover:bg-slate-100 hover:text-navy-800"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Blog Cards Grid */}
      {filteredPosts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post) => (
            <article
              key={post.slug}
              className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-lg hover:border-navy-600/10 transition-all duration-300 flex flex-col h-full group"
            >
              {/* Graphic Card Header with image */}
              <div className="h-48 relative overflow-hidden bg-slate-100">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-black/20" />
                <div className="absolute inset-x-6 top-6 flex justify-between items-center z-10">
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-navy-800/80 text-white border border-slate-700/50 px-2.5 py-1 rounded-full">
                    {post.tags[0]}
                  </span>
                  <span className="text-[10px] font-bold text-gold-300 bg-navy-800/80 px-2.5 py-1 rounded-full">
                    {post.readTime}
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 flex flex-col flex-grow">
                {/* Meta details */}
                <div className="flex items-center gap-4 text-xs text-slate-400 font-medium mb-3">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3.5 w-3.5 shrink-0" />
                    <span>{post.date}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <User className="h-3.5 w-3.5 shrink-0" />
                    <span>{post.author}</span>
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold text-navy-800 tracking-tight leading-snug group-hover:text-navy-700 transition-colors line-clamp-2">
                  <Link href={`/blog/${post.slug}`} className="hover:underline">
                    {post.title}
                  </Link>
                </h3>

                {/* Excerpt */}
                <p className="mt-3 text-slate-500 text-sm leading-relaxed line-clamp-3 flex-grow">
                  {post.excerpt}
                </p>

                {/* Footer Action */}
                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                  <div className="flex gap-1.5">
                    {post.tags.slice(0, 2).map((t) => (
                      <span key={t} className="text-[9px] font-bold uppercase tracking-wide text-slate-400">
                        #{t.replace(/\s+/g, "")}
                      </span>
                    ))}
                  </div>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="inline-flex items-center gap-1 text-xs font-bold text-gold-600 hover:text-gold-500 transition-colors group/link"
                  >
                    Read Post
                    <ArrowRight className="h-3.5 w-3.5 group-hover/link:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 text-center py-16 px-4">
          <BookOpen className="mx-auto h-12 w-12 text-slate-300" />
          <h3 className="mt-4 text-lg font-bold text-navy-800">No articles match your search</h3>
          <p className="mt-2 text-sm text-slate-500 max-w-sm mx-auto">
            Try adjusting your search criteria or look through other categories.
          </p>
          <button
            onClick={() => {
              setSearchTerm("");
              setSelectedTag("All");
            }}
            className="mt-6 text-sm font-semibold text-gold-600 hover:text-gold-500 transition-colors"
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
}
