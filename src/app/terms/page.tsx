import { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

import Breadcrumbs from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Terms & Conditions | DSS Talent Bridge",
  description: "Read our Terms and Conditions governing candidate placements, recruitment, and employer staffing agreements.",
};

export default function TermsPage() {
  return (
    <>
      <Header />
      <Breadcrumbs />
      <main className="flex-grow bg-slate-50 py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8 sm:p-12">
            <span className="text-xs font-bold uppercase tracking-widest text-gold-500 bg-gold-500/10 px-3 py-1 rounded-full">
              Legal
            </span>
            <h1 className="text-3xl font-extrabold text-navy-800 tracking-tight sm:text-4xl mt-3 mb-8">
              Terms & Conditions
            </h1>
            
            <div className="prose prose-slate max-w-none text-slate-600 space-y-6 text-sm sm:text-base leading-relaxed">
              <p>
                <strong>Last Updated: July 6, 2026</strong>
              </p>
              
              <p>
                Welcome to DSS Talent Bridge. These Terms and Conditions govern your access to and use of our website, recruiting portals, and general staffing services. By using our site, you agree to comply with these terms.
              </p>

              <h2 className="text-lg font-bold text-navy-800 mt-8 mb-2">1. Use of Services</h2>
              <p>
                DSS Talent Bridge provides Human Resource recruitment, permanent staffing, contract hiring, and executive search services. You agree to use this website solely for lawful purposes, such as searching for open job opportunities or submitting staffing requisites.
              </p>

              <h2 className="text-lg font-bold text-navy-800 mt-8 mb-2">2. Candidate Submissions</h2>
              <p>
                When applying for job opportunities on our platform, you warrant that all submitted details (including your name, contact phone, email, resume links, and cover letters) are accurate, truthful, and representative of your professional background. We reserve the right to remove entries containing fraudulent details.
              </p>

              <h2 className="text-lg font-bold text-navy-800 mt-8 mb-2">3. Employer Postings</h2>
              <p>
                Clients submitting corporate details and tech requirements on our Hiring Portal represent that they have the authority to act on behalf of their company. Sourcing agreements, placement fees, and service guarantees will be separately governed by signed master service agreements (MSAs) or commercial staffing contracts.
              </p>

              <h2 className="text-lg font-bold text-navy-800 mt-8 mb-2">4. Intellectual Property</h2>
              <p>
                The branding, custom graphics, logo designs, web interface layout, and written content on this site are protected by copyright and intellectual property rights owned by DSS Talent Bridge. You may not copy, replicate, or redistribute our assets without explicit written consent.
              </p>

              <h2 className="text-lg font-bold text-navy-800 mt-8 mb-2">5. Limitation of Liability</h2>
              <p>
                DSS Talent Bridge acts as a bridge matching candidates and employers. While we verify and screen profiles diligently, we are not liable for candidate performance post-hire, employer site conditions, or system downtime resulting from third-party API or server outages.
              </p>

              <h2 className="text-lg font-bold text-navy-800 mt-8 mb-2">6. Contact Information</h2>
              <p>
                For questions regarding these Terms & Conditions, please contact us at:
              </p>
              <ul className="list-none pl-0 space-y-1">
                <li><strong>Email:</strong> <a href="mailto:info@dsstalentbridge.com" className="text-gold-600 font-semibold hover:underline">info@dsstalentbridge.com</a></li>
                <li><strong>Bangalore Office:</strong> Outer Ring Road, Tech Corridor, Bangalore, KA, India</li>
                <li><strong>Nagpur Office:</strong> IT Park, Gayatri Nagar, Nagpur, MH, India</li>
              </ul>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
