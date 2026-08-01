import { MetadataRoute } from "next";
import { blogPosts } from "@/lib/data/blogs";
import { mockJobs } from "@/lib/data/jobs";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://dsstalentbridge.com";

  // Static routes
  const routes = ["", "/about", "/jobs", "/contact", "/privacy", "/terms", "/blog"].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "daily" as const,
    priority: route === "" ? 1.0 : 0.8,
  }));

  // Dynamic blog routes
  const blogRoutes = blogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));

  // Dynamic job routes (by query param)
  const jobRoutes = mockJobs.map((job) => ({
    url: `${baseUrl}/jobs?id=${job.id}`,
    lastModified: new Date(job.postedDate),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  return [...routes, ...blogRoutes, ...jobRoutes];
}
