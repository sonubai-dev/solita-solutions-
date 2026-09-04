import { AdminInquiry, InquiryStatus, AdminProductMetric, ClientProject } from '../types';

export const ADMIN_CREDENTIALS = {
  email: 'help.solita@gmail.com',
  password: 'SOli1234@@',
  role: 'Super Admin & Technical Operations',
  name: 'Solita Administration Desk'
};

const STORAGE_KEY_AUTH = 'solita_admin_session';
const STORAGE_KEY_INQUIRIES = 'solita_admin_inquiries_v2';
const STORAGE_KEY_PRODUCTS = 'solita_admin_products_v2';
const STORAGE_KEY_PROJECTS = 'solita_admin_projects_v2';

const INITIAL_INQUIRIES: AdminInquiry[] = [
  {
    id: 'inq-101',
    name: 'Marcus Vance',
    company: 'Apex Logistics Global',
    email: 'm.vance@apexlogistics.io',
    phone: '+1 (415) 890-3321',
    serviceNeeded: 'Custom AI Agents & Workflows',
    budgetRange: '$25,000 - $50,000',
    message: 'We are seeking an autonomous agentic pipeline to cross-check customs declarations, automate multi-modal freight routing, and integrate with our warehouse ERP.',
    status: 'New',
    createdAt: '2026-09-03T14:32:00Z',
    priority: 'High',
    internalNotes: 'High-value enterprise lead. Needs evaluation of AutoFlow AI agent architecture.'
  },
  {
    id: 'inq-102',
    name: 'Elena Rostova',
    company: 'Aetheria Health Systems',
    email: 'elena.rostova@aetheriahealth.org',
    phone: '+1 (650) 420-9118',
    serviceNeeded: 'Enterprise Software & APIs',
    budgetRange: '$50,000+',
    message: 'Need HIPAA-compliant patient intake orchestration with real-time audit logging and biometric appointment dispatch.',
    status: 'Reviewing',
    createdAt: '2026-09-02T11:15:00Z',
    priority: 'High',
    internalNotes: 'Initial architecture review pending with Sonu Kumar. Requires signed BAA.'
  },
  {
    id: 'inq-103',
    name: 'Devin Thorne',
    company: 'Kinetix Media Labs',
    email: 'devin@kinetix.media',
    phone: '+1 (212) 555-0192',
    serviceNeeded: 'Web & Mobile Applications',
    budgetRange: '$10,000 - $25,000',
    message: 'Looking to rebuild our video creator platform using modern Next.js/React frontend with ultra-low latency playback analytics.',
    status: 'Contacted',
    createdAt: '2026-08-31T09:40:00Z',
    priority: 'Medium',
    internalNotes: 'Initial scoping call completed. Sent technical questionnaire.'
  },
  {
    id: 'inq-104',
    name: 'Sarah Chen',
    company: 'FinPulse Capital',
    email: 'sarah.chen@finpulse.co',
    phone: '+1 (408) 782-9014',
    serviceNeeded: 'Database & Infrastructure',
    budgetRange: '$50,000+',
    message: 'Zero-downtime migration of high-throughput Postgres cluster with Spanner failover and geo-replicated read replicas.',
    status: 'Proposal Sent',
    createdAt: '2026-08-28T16:20:00Z',
    priority: 'High',
    internalNotes: 'Proposal v1.2 delivered. Awaiting board budget sign-off.'
  },
  {
    id: 'inq-105',
    name: 'Robert Morales',
    company: 'UrbanScale Mobility',
    email: 'r.morales@urbanscale.io',
    phone: '+1 (312) 909-7712',
    serviceNeeded: 'System Integration & Automation',
    budgetRange: '$25,000 - $50,000',
    message: 'Vehicle telemetry webhook pipeline ingestion connecting 4,000 IoT micro-mobility scooters to dispatch API.',
    status: 'Closed',
    createdAt: '2026-08-20T10:00:00Z',
    priority: 'Medium',
    internalNotes: 'Contract executed. Handed off to Active Development pipeline.'
  }
];

const INITIAL_PRODUCTS: AdminProductMetric[] = [
  {
    id: 'prod-1',
    name: 'AutoFlow AI',
    category: 'Autonomous Agents',
    status: 'Live',
    activeUsers: 4280,
    uptime: '99.99%',
    latencyMs: 84,
    apiCallsToday: 142980
  },
  {
    id: 'prod-2',
    name: 'Solita CRM Intelligence',
    category: 'Enterprise Revenue',
    status: 'Live',
    activeUsers: 1850,
    uptime: '99.98%',
    latencyMs: 112,
    apiCallsToday: 89400
  },
  {
    id: 'prod-3',
    name: 'DataPulse Analytics',
    category: 'Real-Time Telemetry',
    status: 'Live',
    activeUsers: 3100,
    uptime: '100%',
    latencyMs: 45,
    apiCallsToday: 320500
  },
  {
    id: 'prod-4',
    name: 'Nexus Commerce Engine',
    category: 'Headless Checkout',
    status: 'Beta',
    activeUsers: 640,
    uptime: '99.95%',
    latencyMs: 95,
    apiCallsToday: 41200
  },
  {
    id: 'prod-5',
    name: 'OmniDesk AI',
    category: 'Unified Support',
    status: 'Live',
    activeUsers: 2200,
    uptime: '99.97%',
    latencyMs: 104,
    apiCallsToday: 76800
  },
  {
    id: 'prod-6',
    name: 'HyperScale Cloud Engine',
    category: 'Cloud Infrastructure',
    status: 'Development',
    activeUsers: 120,
    uptime: '99.90%',
    latencyMs: 38,
    apiCallsToday: 18500
  }
];

const INITIAL_PROJECTS: ClientProject[] = [
  {
    id: 'proj-1',
    clientName: 'UrbanScale Mobility',
    projectName: 'Fleet Telemetry & Dispatch Gateway',
    serviceType: 'System Integration & Automation',
    budget: '$48,000',
    progress: 75,
    stage: 'Active Development',
    lead: 'Sonu Kumar',
    targetDate: 'Oct 15, 2026'
  },
  {
    id: 'proj-2',
    clientName: 'Aetheria Health Systems',
    projectName: 'Compliant Intake & Orchestration Hub',
    serviceType: 'Enterprise Software & APIs',
    budget: '$62,000',
    progress: 30,
    stage: 'Architecture',
    lead: 'Sonu Kumar',
    targetDate: 'Nov 30, 2026'
  },
  {
    id: 'proj-3',
    clientName: 'Apex Logistics Global',
    projectName: 'Autonomous Customs Verification Agent',
    serviceType: 'Custom AI Agents & Workflows',
    budget: '$38,000',
    progress: 15,
    stage: 'Discovery',
    lead: 'Sonu Kumar',
    targetDate: 'Dec 10, 2026'
  }
];

// --- Authentication Helpers ---

export function checkAdminSession(): boolean {
  try {
    const session = localStorage.getItem(STORAGE_KEY_AUTH);
    if (!session) return false;
    const parsed = JSON.parse(session);
    return parsed.email === ADMIN_CREDENTIALS.email && parsed.authenticated === true;
  } catch {
    return false;
  }
}

export function authenticateAdmin(email: string, pass: string): { success: boolean; error?: string } {
  const cleanEmail = email.trim().toLowerCase();
  const cleanPass = pass.trim();

  if (cleanEmail === ADMIN_CREDENTIALS.email.toLowerCase() && cleanPass === ADMIN_CREDENTIALS.password) {
    const sessionData = {
      email: ADMIN_CREDENTIALS.email,
      role: ADMIN_CREDENTIALS.role,
      name: ADMIN_CREDENTIALS.name,
      authenticated: true,
      loginTimestamp: new Date().toISOString()
    };
    try {
      localStorage.setItem(STORAGE_KEY_AUTH, JSON.stringify(sessionData));
    } catch (e) {
      console.error('Storage error', e);
    }
    return { success: true };
  }

  return {
    success: false,
    error: 'Invalid credentials. Please verify your admin email and password.'
  };
}

export function terminateAdminSession(): void {
  try {
    localStorage.removeItem(STORAGE_KEY_AUTH);
  } catch (e) {
    console.error('Storage error', e);
  }
}

// --- Inquiry Storage Helpers ---

export function getAdminInquiries(): AdminInquiry[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_INQUIRIES);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY_INQUIRIES, JSON.stringify(INITIAL_INQUIRIES));
      return INITIAL_INQUIRIES;
    }
    return JSON.parse(raw);
  } catch {
    return INITIAL_INQUIRIES;
  }
}

export function recordNewInquiry(data: {
  name: string;
  company: string;
  email: string;
  phone: string;
  serviceNeeded: string;
  budgetRange: string;
  message: string;
}): AdminInquiry {
  const inquiries = getAdminInquiries();
  const newRecord: AdminInquiry = {
    id: `inq-${Date.now()}`,
    ...data,
    status: 'New',
    createdAt: new Date().toISOString(),
    priority: data.budgetRange.includes('50,000') ? 'High' : 'Medium'
  };

  const updated = [newRecord, ...inquiries];
  try {
    localStorage.setItem(STORAGE_KEY_INQUIRIES, JSON.stringify(updated));
  } catch (e) {
    console.error('Failed to save inquiry', e);
  }
  return newRecord;
}

export function updateInquiryStatus(id: string, status: InquiryStatus, notes?: string): AdminInquiry[] {
  const inquiries = getAdminInquiries();
  const updated = inquiries.map((item) => {
    if (item.id === id) {
      return {
        ...item,
        status,
        internalNotes: notes !== undefined ? notes : item.internalNotes
      };
    }
    return item;
  });

  try {
    localStorage.setItem(STORAGE_KEY_INQUIRIES, JSON.stringify(updated));
  } catch (e) {
    console.error('Failed to update inquiry', e);
  }
  return updated;
}

export function deleteInquiry(id: string): AdminInquiry[] {
  const inquiries = getAdminInquiries();
  const updated = inquiries.filter((item) => item.id !== id);
  try {
    localStorage.setItem(STORAGE_KEY_INQUIRIES, JSON.stringify(updated));
  } catch (e) {
    console.error('Failed to delete inquiry', e);
  }
  return updated;
}

export function resetDemoInquiries(): AdminInquiry[] {
  try {
    localStorage.setItem(STORAGE_KEY_INQUIRIES, JSON.stringify(INITIAL_INQUIRIES));
  } catch (e) {
    console.error('Reset error', e);
  }
  return INITIAL_INQUIRIES;
}

// --- Product & Project Metrics ---

export function getProductMetrics(): AdminProductMetric[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_PRODUCTS);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY_PRODUCTS, JSON.stringify(INITIAL_PRODUCTS));
      return INITIAL_PRODUCTS;
    }
    return JSON.parse(raw);
  } catch {
    return INITIAL_PRODUCTS;
  }
}

export function toggleProductStatus(id: string, status: 'Live' | 'Beta' | 'Development' | 'Maintenance'): AdminProductMetric[] {
  const products = getProductMetrics();
  const updated = products.map(p => p.id === id ? { ...p, status } : p);
  try {
    localStorage.setItem(STORAGE_KEY_PRODUCTS, JSON.stringify(updated));
  } catch (e) {
    console.error(e);
  }
  return updated;
}

export function getClientProjects(): ClientProject[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_PROJECTS);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY_PROJECTS, JSON.stringify(INITIAL_PROJECTS));
      return INITIAL_PROJECTS;
    }
    return JSON.parse(raw);
  } catch {
    return INITIAL_PROJECTS;
  }
}
