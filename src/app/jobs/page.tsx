import { Metadata } from "next";
import ClientJobsPage from "./ClientJobsPage";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// SEO generateMetadata implementation
export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Careers & Open Positions | DSS Talent Bridge Recruitment",
    description: "Explore premium job opportunities in AI, Cloud Computing, BFSI, Cybersecurity, and Software Engineering in Bangalore, Nagpur, and remote locations. Apply today!",
    keywords: ["Recruitment", "Jobs in Bangalore", "Jobs in Nagpur", "AI Engineering Jobs", "Cloud Architects", "BFSI Staffing", "DSS Talent Bridge Careers"],
    openGraph: {
      title: "Careers & Open Positions | DSS Talent Bridge",
      description: "Find your next career milestone. Access roles with top enterprises and startups in tech-driven sectors.",
      url: "https://dsstalentbridge.com/jobs",
      type: "website",
    },
  };
}

import Breadcrumbs from "@/components/Breadcrumbs";

interface JobsPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function JobsPage({ searchParams }: JobsPageProps) {
  const resolvedSearchParams = await searchParams;
  const jobId = typeof resolvedSearchParams.id === "string" ? resolvedSearchParams.id : undefined;

  return (
    <>
      <Header />
      <Breadcrumbs />
      <main className="flex-grow bg-slate-50 py-12">
        <ClientJobsPage initialJobId={jobId} />
      </main>
      <Footer />
    </>
  );
}
