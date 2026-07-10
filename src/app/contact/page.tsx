import { Metadata } from "next";
import ClientContactPage from "./ClientContactPage";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Contact Us | DSS Talent Bridge Recruitment & Staffing",
  description: "Get in touch with recruitment experts at DSS Talent Bridge. Reach out for corporate collaborations, job seeker support, and technical inquiries in Bangalore and Nagpur.",
  keywords: ["Contact DSS Talent Bridge", "Recruitment Agency Phone", "Staffing Email", "Bangalore HR Contact", "Nagpur Office Details", "Collaborations"],
};

import Breadcrumbs from "@/components/Breadcrumbs";

export default function ContactPage() {
  return (
    <>
      <Header />
      <Breadcrumbs />
      <main className="flex-grow bg-slate-50 py-12">
        <ClientContactPage />
      </main>
      <Footer />
    </>
  );
}
