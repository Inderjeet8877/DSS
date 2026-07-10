import { MetadataRoute } from "next";
import { blogPosts } from "@/lib/data/blogs";

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

  return [...routes, ...blogRoutes];
}
