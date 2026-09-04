export interface ProductItem {
  id: string;
  name: string;
  category: string;
  tagline: string;
  description: string;
  status: 'Product' | 'In Development' | 'Experiment';
  useCases: string[];
  ctaText: string;
  url: string;
  highlights: string[];
  isHighlighted?: boolean;
}

export interface ServiceCategory {
  id: string;
  title: string;
  shortDesc: string;
  iconName: string;
  services: string[];
  systemCapability: string;
}

export interface WhySolitaPoint {
  id: string;
  title: string;
  description: string;
  metricLabel?: string;
  badge: string;
}

export interface LeaderProfile {
  name: string;
  role: string;
  bio: string;
  focus: string[];
  imagePlaceholderText: string;
  resumeUrl?: string;
  githubUrl?: string;
}

export interface CareerRole {
  title: string;
  category: string;
  type: string;
  location: string;
  description: string;
  status: 'Current / Upcoming Opportunities';
}

export interface ContactFormData {
  name: string;
  company: string;
  email: string;
  phone: string;
  serviceNeeded: string;
  budgetRange: string;
  message: string;
}

export type InquiryStatus = 'New' | 'Reviewing' | 'Contacted' | 'Proposal Sent' | 'Closed';

export interface AdminInquiry {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  serviceNeeded: string;
  budgetRange: string;
  message: string;
  status: InquiryStatus;
  createdAt: string;
  internalNotes?: string;
  priority?: 'High' | 'Medium' | 'Low';
}

export interface AdminProductMetric {
  id: string;
  name: string;
  category: string;
  status: 'Live' | 'Beta' | 'Development' | 'Maintenance';
  activeUsers: number;
  uptime: string;
  latencyMs: number;
  apiCallsToday: number;
}

export interface ClientProject {
  id: string;
  clientName: string;
  projectName: string;
  serviceType: string;
  budget: string;
  progress: number;
  stage: 'Discovery' | 'Architecture' | 'Active Development' | 'QA & Testing' | 'Production';
  lead: string;
  targetDate: string;
}

export interface FAQItem {
  id: string;
  category: 'timelines' | 'communication' | 'engagement' | 'ownership';
  categoryLabel: string;
  question: string;
  answer: string;
  highlights?: string[];
}
