import { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

import Breadcrumbs from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Privacy Policy | DSS Talent Bridge",
  description: "Read our Privacy Policy to understand how DSS Talent Bridge handles candidate and employer information in Bangalore and Nagpur.",
};

export default function PrivacyPage() {
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
              Privacy Policy
            </h1>
            
            <div className="prose prose-slate max-w-none text-slate-600 space-y-6 text-sm sm:text-base leading-relaxed">
              <p>
                <strong>Last Updated: July 6, 2026</strong>
              </p>
              
              <p>
                At DSS Talent Bridge, we are committed to protecting the privacy and security of our candidates, clients, and website visitors. This Privacy Policy describes how we collect, use, store, and share your personal information when you use our Human Resource Recruitment and Staffing services or visit our website.
              </p>

              <h2 className="text-lg font-bold text-navy-800 mt-8 mb-2">1. Information We Collect</h2>
              <p>
                We collect personal information to provide staffing and recruitment solutions. This includes:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>For Candidates:</strong> Name, email address, phone number, physical address, work experience, resume document link, cover letters, and other professional profile details.</li>
                <li><strong>For Employers:</strong> Company name, contact representative name, business email, contact phone, recruitment requirements, tech stack preferences, and role descriptions.</li>
                <li><strong>Automated Data:</strong> IP address, browser type, referral URLs, pages visited, and general usage metrics.</li>
              </ul>

              <h2 className="text-lg font-bold text-navy-800 mt-8 mb-2">2. How We Use Your Information</h2>
              <p>
                We utilize the collected information for operations including:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Evaluating candidate profiles against active job openings.</li>
                <li>Communicating with companies and job seekers regarding interviews, role fit, and staffing agreements.</li>
                <li>Processing submissions securely and routing data to our administrative sheets via API pipelines.</li>
                <li>Improving our web presence, marketing, and Generative Engine Optimization (GEO) relevance.</li>
              </ul>

              <h2 className="text-lg font-bold text-navy-800 mt-8 mb-2">3. Information Sharing and Disclosure</h2>
              <p>
                We do not sell your personal data. We only share candidate information with registered hiring clients who have active roles matching your profile. Furthermore, your data is processed through secure Next.js serverless routes and forwarded to our internal Google Sheets repositories.
              </p>

              <h2 className="text-lg font-bold text-navy-800 mt-8 mb-2">4. Data Retention</h2>
              <p>
                We retain your information as long as necessary to fulfill staffing engagements or comply with legal requirements in India. If you wish to have your candidate or employer data removed from our database, please contact our Bangalore or Nagpur offices.
              </p>

              <h2 className="text-lg font-bold text-navy-800 mt-8 mb-2">5. Contact Us</h2>
              <p>
                If you have questions about this Privacy Policy, please reach out to our team:
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
