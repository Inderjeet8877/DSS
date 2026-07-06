import { Metadata } from "next";
import ClientHirePage from "./ClientHirePage";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// SEO generateMetadata implementation
export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Hire Elite Talent | DSS Talent Bridge Staffing Solutions",
    description: "Partner with DSS Talent Bridge to recruit pre-vetted professionals in technology, BFSI, AI, and Cloud in Bangalore and Nagpur. Submit your requirements today.",
    keywords: ["Recruitment Agency", "Hire Developers", "Staffing Solutions Bangalore", "Nagpur Recruitment Partner", "BFSI Staffing Services", "Executive Search"],
    openGraph: {
      title: "Hiring Portal | DSS Talent Bridge",
      description: "Accelerate your hiring. Submit roles to tap into our pre-screened talent pipeline in AI, Cloud, SAP, and BFSI.",
      url: "https://dsstalentbridge.com/hire",
      type: "website",
    },
  };
}

import Breadcrumbs from "@/components/Breadcrumbs";

export default function HirePage() {
  return (
    <>
      <Header />
      <Breadcrumbs />
      <main className="flex-grow bg-slate-50 py-12">
        <ClientHirePage />
      </main>
      <Footer />
    </>
  );
}
