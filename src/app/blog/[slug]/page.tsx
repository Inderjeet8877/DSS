import { Metadata } from "next";
import { notFound } from "next/navigation";
import { blogPosts } from "@/lib/data/blogs";
import ClientBlogPost from "./ClientBlogPost";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

// Generate static routes for each blog post slug at build-time
export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

// Generate dynamic metadata for search optimization
export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const post = blogPosts.find((p) => p.slug === resolvedParams.slug);
  
  if (!post) {
    return {
      title: "Article Not Found | DSS Talent Bridge",
    };
  }

  return {
    title: `${post.title} | DSS Talent Bridge Blog`,
    description: post.excerpt,
    keywords: [...post.tags, "DSS Talent Bridge", "Recruitment Insights"],
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: `https://dsstalentbridge.com/blog/${post.slug}`,
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
      tags: post.tags,
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const resolvedParams = await params;
  const post = blogPosts.find((p) => p.slug === resolvedParams.slug);

  if (!post) {
    notFound();
  }

  return (
    <>
      <Header />
      <Breadcrumbs />
      <main className="flex-grow bg-slate-50 py-12">
        <ClientBlogPost post={post} />
      </main>
      <Footer />
    </>
  );
}
