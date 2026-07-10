import { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import ClientAboutPage from "./ClientAboutPage";

export const metadata: Metadata = {
  title: "About Us | DSS Talent Bridge",
  description: "Learn about DSS Talent Bridge, a technology-driven Human Resource Recruitment and Staffing firm with over 7 years of experience in Bangalore and Nagpur.",
};

export default function AboutPage() {
  return (
    <>
      <Header />
      <Breadcrumbs />
      <ClientAboutPage />
      <Footer />
    </>
  );
}
