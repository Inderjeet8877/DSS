"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight, Home } from "lucide-react";
import { blogPosts } from "@/lib/data/blogs";
import { useMemo } from "react";

export default function Breadcrumbs() {
  const pathname = usePathname();

  const breadcrumbs = useMemo(() => {
    if (pathname === "/") return [];

    const segments = pathname.split("/").filter((x) => x);
    const crumbs = segments.map((segment, index) => {
      const href = "/" + segments.slice(0, index + 1).join("/");
      
      // Determine user-friendly title
      let title = segment.charAt(0).toUpperCase() + segment.slice(1);
      
      if (segment === "about") title = "About Us";
      else if (segment === "jobs") title = "Find Jobs";
      else if (segment === "hire") title = "Hire Talent";
      else if (segment === "contact") title = "Contact Us";
      else if (segment === "privacy") title = "Privacy Policy";
      else if (segment === "terms") title = "Terms & Conditions";
      else if (segment === "blog") title = "Blog Hub";
      else {
        // Check if it's a blog post slug
        const matchingPost = blogPosts.find((p) => p.slug === segment);
        if (matchingPost) {
          title = matchingPost.title;
        }
      }

      return { title, href };
    });

    return crumbs;
  }, [pathname]);

  // Schema.org BreadcrumbList JSON-LD
  const schemaJsonLd = useMemo(() => {
    if (breadcrumbs.length === 0) return null;

    const baseDomain = "https://dsstalentbridge.com";
    return {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": baseDomain
        },
        ...breadcrumbs.map((crumb, idx) => ({
          "@type": "ListItem",
          "position": idx + 2,
          "name": crumb.title,
          "item": `${baseDomain}${crumb.href}`
        }))
      ]
    };
  }, [breadcrumbs]);

  if (pathname === "/" || breadcrumbs.length === 0) return null;

  return (
    <nav aria-label="Breadcrumb" className="bg-slate-100 border-b border-slate-200/80 py-3.5">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Schema injection */}
        {schemaJsonLd && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaJsonLd) }}
          />
        )}

        <ol className="flex items-center space-x-2 text-xs font-semibold text-slate-500">
          <li>
            <Link href="/" className="flex items-center gap-1.5 hover:text-navy-800 transition-colors">
              <Home className="h-3.5 w-3.5 text-gold-500 shrink-0" />
              <span>Home</span>
            </Link>
          </li>
          
          {breadcrumbs.map((crumb, idx) => {
            const isLast = idx === breadcrumbs.length - 1;
            return (
              <li key={crumb.href} className="flex items-center space-x-2">
                <ChevronRight className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                {isLast ? (
                  <span className="text-navy-800 font-bold max-w-[200px] sm:max-w-xs truncate" aria-current="page">
                    {crumb.title}
                  </span>
                ) : (
                  <Link href={crumb.href} className="hover:text-navy-800 transition-colors">
                    {crumb.title}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </div>
    </nav>
  );
}
