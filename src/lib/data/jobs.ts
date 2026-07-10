export interface Job {
  id: string;
  title: string;
  department: string;
  location: "Bangalore" | "Nagpur" | "Remote" | "Hybrid";
  type: "Full-Time" | "Contract" | "Part-Time";
  salaryRange: string;
  experience: string;
  description: string;
  requirements: string[];
  techStack: string[];
  postedDate: string;
}

export const mockJobs: Job[] = [
  {
    id: "job-001",
    title: "Senior AI / Machine Learning Engineer",
    department: "AI & Machine Learning",
    location: "Bangalore",
    type: "Full-Time",
    salaryRange: "₹25,00,000 - ₹35,00,000 PA",
    experience: "5 - 8 Years",
    description: "We are seeking a senior AI/ML Engineer to design and deploy large-scale machine learning systems for an enterprise BFSI platform. You will build and optimize NLP pipelines and predictive models to improve real-time decision-making.",
    requirements: [
      "Extensive experience with PyTorch, TensorFlow, and HuggingFace transformers.",
      "Solid understanding of Deep Learning, NLP, and LLM fine-tuning techniques.",
      "Experience deploying models as scalable APIs in AWS or Azure environments.",
      "Prior experience in financial technology or banking projects is highly valued."
    ],
    techStack: ["Python", "PyTorch", "AWS", "FastAPI", "Transformers", "SQL"],
    postedDate: "2026-07-01"
  },
  {
    id: "job-002",
    title: "Cloud Infrastructure Architect",
    department: "Cloud Computing",
    location: "Nagpur",
    type: "Full-Time",
    salaryRange: "₹20,00,000 - ₹30,00,000 PA",
    experience: "7 - 10 Years",
    description: "Join a leading software consultancy to design secure, highly available multi-region cloud infrastructures. This role focuses on container orchestration, CI/CD automation, and infrastructure-as-code standardizations.",
    requirements: [
      "Expert-level knowledge of AWS or Microsoft Azure architecture.",
      "Hands-on experience with Terraform, Kubernetes (EKS/AKS), and Docker.",
      "Strong scripting skills in Bash, Go, or Python.",
      "Proven track record of migrating legacy monoliths to cloud-native microservices."
    ],
    techStack: ["Terraform", "Kubernetes", "AWS", "Docker", "CI/CD", "Go"],
    postedDate: "2026-07-03"
  },
  {
    id: "job-003",
    title: "SAP ABAP Consultant (HANA)",
    department: "ERP & SAP",
    location: "Bangalore",
    type: "Contract",
    salaryRange: "₹1,20,000 - ₹1,50,000 / Month",
    experience: "4 - 7 Years",
    description: "We are hiring an SAP ABAP Consultant for a 12-month renewable contract. You will design, develop, and deliver customized technical solutions on S/4HANA systems, focusing on OData services and AMDP.",
    requirements: [
      "Strong experience in SAP ABAP on HANA developments (AMDP, CDS Views).",
      "Expertise in OData service creation and integration.",
      "Knowledge of SAP Fiori / UI5 is a major plus.",
      "Excellent communication skills for stakeholder management."
    ],
    techStack: ["SAP ABAP", "S/4HANA", "OData", "CDS Views", "Fiori"],
    postedDate: "2026-07-04"
  },
  {
    id: "job-004",
    title: "Lead Cybersecurity Specialist",
    department: "Cybersecurity",
    location: "Hybrid",
    type: "Full-Time",
    salaryRange: "₹28,00,000 - ₹38,00,000 PA",
    experience: "6 - 9 Years",
    description: "Protect critical infrastructure for our premier BFSI client in Bangalore. The role involves leading vulnerability assessments, setting up SOC guidelines, and designing resilient security frameworks.",
    requirements: [
      "CISSP, CEH, or equivalent industry-standard security certifications.",
      "Experience conducting penetration testing and threat intelligence modeling.",
      "Familiarity with compliance standards like ISO 27001, SOC2, and GDPR.",
      "Ability to coordinate incident response operations."
    ],
    techStack: ["SIEM", "Penetration Testing", "ISO 27001", "Wireshark", "Splunk"],
    postedDate: "2026-07-05"
  },
  {
    id: "job-005",
    title: "Senior Full Stack Software Engineer",
    department: "Software Engineering",
    location: "Remote",
    type: "Full-Time",
    salaryRange: "₹18,00,000 - ₹24,00,000 PA",
    experience: "3 - 6 Years",
    description: "We are looking for a versatile Full-Stack Software Engineer to build and scale features for a high-growth SaaS platform. You will collaborate on core features, optimize database queries, and improve frontend performance.",
    requirements: [
      "Professional experience with React/Next.js and Node.js.",
      "Strong understanding of database systems (PostgreSQL, MongoDB).",
      "Familiarity with TypeScript and modern Tailwind CSS UI development.",
      "Writing clean, testable code with robust unit and integration testing."
    ],
    techStack: ["Next.js", "Node.js", "TypeScript", "PostgreSQL", "Tailwind CSS"],
    postedDate: "2026-07-05"
  }
];

export const faqData = [
  {
    question: "What industries does DSS Talent Bridge specialize in?",
    answer: "Our expertise spans Technology, BFSI, AI & Machine Learning, Cloud Computing, ERP & SAP, Data Science, Software Engineering, Cybersecurity, and Digital Transformation."
  },
  {
    question: "Where are the office locations of DSS Talent Bridge?",
    answer: "Our operational hubs are in Bangalore and Nagpur, enabling us to serve local markets while catering to global talent demands."
  },
  {
    question: "What hiring models do you offer?",
    answer: "We support organizations with Permanent Hiring, Contract Staffing, Leadership Hiring, Project-Based Recruitment, and Customized Talent Acquisition Solutions."
  },
  {
    question: "How can candidates apply for open roles?",
    answer: "Candidates can browse all active opportunities on our Job Board and apply directly by submitting their name, email, phone number, resume link, and a brief cover letter. The information is securely routed and processed."
  },
  {
    question: "How can businesses partner with DSS Talent Bridge?",
    answer: "Businesses can submit their recruitment requirements through our Hiring Portal. A specialized HR consultant from our Bangalore or Nagpur offices will get in touch within 24 business hours to discuss custom solutions."
  }
];
