import { Metadata } from "next";
import ClientHomePage from "./ClientHomePage";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// Premium SEO Metadata
export const metadata: Metadata = {
  title: "DSS Talent Bridge | Technology & BFSI Recruitment & Staffing",
  description: "DSS Talent Bridge is a technology-driven Human Resource Recruitment and Staffing firm connecting exceptional talent with forward-thinking organizations. Founded by recruitment professionals with over 7 years of experience.",
  keywords: [
    "Recruitment Firm",
    "Staffing Agency Bangalore",
    "Tech Recruitment Nagpur",
    "AI Recruitment Agency",
    "BFSI Staffing Services",
    "Cloud Computing Recruitment",
    "ERP SAP Staffing",
    "Human Resource Recruitment"
  ],
  openGraph: {
    title: "DSS Talent Bridge | Recruitment & Staffing",
    description: "Bridging the Gap Between Exceptional Talent and Exceptional Companies.",
    url: "https://dsstalentbridge.com",
    siteName: "DSS Talent Bridge",
    images: [
      {
        url: "https://dsstalentbridge.com/logo.jpeg",
        width: 800,
        height: 800,
        alt: "DSS Talent Bridge Logo",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
};

export default function HomePage() {
  return (
    <>
      <Header />
      <main className="flex-grow">
        <ClientHomePage />
      </main>
      <Footer />
    </>
  );
}
