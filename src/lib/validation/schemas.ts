import { z } from "zod";

export const JobApplicationSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100, "Name is too long"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits").max(20, "Phone number is too long"),
  resumeLink: z.string().url("Must be a valid URL pointing to your resume"),
  coverLetter: z.string().min(10, "Cover letter must be at least 10 characters").max(3000, "Cover letter is too long"),
  jobId: z.string().optional(),
  jobTitle: z.string().optional(),
});

export type JobApplicationInput = z.infer<typeof JobApplicationSchema>;

export const HiringPostSchema = z.object({
  companyName: z.string().min(2, "Company name must be at least 2 characters").max(150, "Company name is too long"),
  contactName: z.string().min(2, "Contact name must be at least 2 characters").max(100, "Contact name is too long"),
  contactEmail: z.string().email("Invalid contact email address"),
  contactPhone: z.string().min(10, "Contact phone must be at least 10 digits").max(20, "Contact phone is too long"),
  roleTitle: z.string().min(2, "Role title must be at least 2 characters").max(150, "Role title is too long"),
  techStack: z.string().min(2, "Tech stack must be at least 2 characters").max(500, "Tech stack is too long"),
  locationPreference: z.enum(["Bangalore", "Nagpur", "Remote", "Hybrid", "No Preference"]),
  description: z.string().min(10, "Description must be at least 10 characters").max(3000, "Description is too long"),
});

export type HiringPostInput = z.infer<typeof HiringPostSchema>;

export const ContactPostSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100, "Name is too long"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits").max(20, "Phone number is too long"),
  subject: z.string().min(2, "Subject must be at least 2 characters").max(150, "Subject is too long"),
  enquiryType: z.enum(["General Inquiry", "Collaboration", "Technical Issue", "Feedback", "Other"]),
  message: z.string().min(10, "Message must be at least 10 characters").max(3000, "Message is too long"),
});

export type ContactPostInput = z.infer<typeof ContactPostSchema>;

