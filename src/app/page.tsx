import { Metadata } from "next";
import ClientHomePage from "./ClientHomePage";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// Premium SEO Metadata
export const metadata: Metadata = {
  title: "DSS Talent Bridge | Premium Technology & BFSI Recruitment Advisory",
  description: "DSS Talent Bridge connects exceptional talent with forward-thinking organizations in Bangalore, Nagpur, and globally. Over 7 years of expertise in AI, Cloud, BFSI, ERP, and Software Engineering.",
  keywords: [
    "Recruitment Firm",
    "Staffing Agency Bangalore",
    "Tech Recruitment Nagpur",
    "AI Recruitment Agency",
    "BFSI Staffing Services",
    "Cloud Computing Recruitment",
    "ERP SAP Staffing",
    "Human Resource Advisory"
  ],
  openGraph: {
    title: "DSS Talent Bridge | HR Advisory & Staffing",
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
