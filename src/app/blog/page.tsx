import { Metadata } from "next";
import ClientBlogPage from "./ClientBlogPage";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Recruitment Insights & Staffing Blog | DSS Talent Bridge",
  description: "Stay updated with specialized staffing trends, interview guides, and industry analyses in AI, Cloud, SAP, BFSI, and regional developer hiring across Bangalore and Nagpur.",
  keywords: ["Staffing Insights", "Recruitment Blog", "Tech Recruitment Trends", "Hiring Developers Bangalore", "Nagpur Software Market", "BFSI Placements"],
};

export default function BlogHubPage() {
  return (
    <>
      <Header />
      <Breadcrumbs />
      <main className="flex-grow bg-slate-50 py-12">
        <ClientBlogPage />
      </main>
      <Footer />
    </>
  );
}
