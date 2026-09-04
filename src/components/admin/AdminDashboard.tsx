import React, { useState, useEffect } from 'react';
import {
  Shield,
  LogOut,
  ExternalLink,
  Search,
  Filter,
  Plus,
  Trash2,
  Mail,
  Phone,
  Building2,
  Calendar,
  Clock,
  CheckCircle2,
  AlertCircle,
  MessageSquare,
  ArrowUpRight,
  Download,
  RotateCcw,
  Sparkles,
  Server,
  Layers,
  Users,
  KeyRound,
  FileText,
  Activity,
  Zap,
  TrendingUp,
  Sun,
  Moon,
  X,
  Send,
  Sliders,
  Check
} from 'lucide-react';
import {
  ADMIN_CREDENTIALS,
  getAdminInquiries,
  updateInquiryStatus,
  deleteInquiry,
  recordNewInquiry,
  resetDemoInquiries,
  getProductMetrics,
  toggleProductStatus,
  getClientProjects
} from '../../lib/adminStorage';
import { AdminInquiry, InquiryStatus, AdminProductMetric, ClientProject } from '../../types';
import { SERVICE_OPTIONS, BUDGET_RANGES, COMPANY_INFO } from '../../config/solitaData';

interface AdminDashboardProps {
  onLogout: () => void;
  onExitToSite: () => void;
  darkMode: boolean;
  setDarkMode: (val: boolean) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  onLogout,
  onExitToSite,
  darkMode,
  setDarkMode
}) => {
  // Navigation tabs
  const [activeTab, setActiveTab] = useState<'inquiries' | 'products' | 'pipeline' | 'security'>('inquiries');

  // Inquiries State
  const [inquiries, setInquiries] = useState<AdminInquiry[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [selectedInquiry, setSelectedInquiry] = useState<AdminInquiry | null>(null);
  const [internalNoteDraft, setInternalNoteDraft] = useState('');

  // Products & Pipeline State
  const [products, setProducts] = useState<AdminProductMetric[]>([]);
  const [projects, setProjects] = useState<ClientProject[]>([]);

  // Modals
  const [isNewLeadOpen, setIsNewLeadOpen] = useState(false);
  const [copiedStatus, setCopiedStatus] = useState<string | null>(null);

  // New Lead Form State
  const [newLead, setNewLead] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    serviceNeeded: SERVICE_OPTIONS[0],
    budgetRange: BUDGET_RANGES[0],
    message: ''
  });

  // Load data
  useEffect(() => {
    setInquiries(getAdminInquiries());
    setProducts(getProductMetrics());
    setProjects(getClientProjects());
  }, []);

  // Update selected inquiry notes draft when selection changes
  useEffect(() => {
    if (selectedInquiry) {
      setInternalNoteDraft(selectedInquiry.internalNotes || '');
    }
  }, [selectedInquiry]);

  // Handle Inquiry Status Update
  const handleStatusChange = (id: string, newStatus: InquiryStatus) => {
    const updated = updateInquiryStatus(id, newStatus);
    setInquiries(updated);
    if (selectedInquiry && selectedInquiry.id === id) {
      setSelectedInquiry({ ...selectedInquiry, status: newStatus });
    }
  };

  // Handle Save Internal Note
  const handleSaveNote = () => {
    if (!selectedInquiry) return;
    const updated = updateInquiryStatus(selectedInquiry.id, selectedInquiry.status, internalNoteDraft);
    setInquiries(updated);
    setSelectedInquiry({ ...selectedInquiry, internalNotes: internalNoteDraft });
    setCopiedStatus('notes_saved');
    setTimeout(() => setCopiedStatus(null), 2500);
  };

  // Handle Delete Inquiry
  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this client inquiry?')) {
      const updated = deleteInquiry(id);
      setInquiries(updated);
      if (selectedInquiry?.id === id) {
        setSelectedInquiry(null);
      }
    }
  };

  // Handle Create Lead
  const handleCreateLeadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLead.name || !newLead.email || !newLead.message) return;

    recordNewInquiry(newLead);
    setInquiries(getAdminInquiries());
    setIsNewLeadOpen(false);
    setNewLead({
      name: '',
      company: '',
      email: '',
      phone: '',
      serviceNeeded: SERVICE_OPTIONS[0],
      budgetRange: BUDGET_RANGES[0],
      message: ''
    });
  };

  // Handle Reset Demo
  const handleResetData = () => {
    if (window.confirm('Reset inquiries back to original verified sample inquiries?')) {
      const reset = resetDemoInquiries();
      setInquiries(reset);
      setSelectedInquiry(null);
    }
  };

  // Filtered Inquiries
  const filteredInquiries = inquiries.filter((inq) => {
    const matchesSearch =
      inq.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inq.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inq.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inq.serviceNeeded.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inq.message.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === 'All' || inq.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Export CSV
  const handleExportCSV = () => {
    const headers = ['ID', 'Date', 'Name', 'Company', 'Email', 'Phone', 'Service', 'Budget', 'Status', 'Message', 'Notes'];
    const rows = inquiries.map((i) => [
      i.id,
      new Date(i.createdAt).toLocaleDateString(),
      `"${i.name.replace(/"/g, '""')}"`,
      `"${i.company.replace(/"/g, '""')}"`,
      i.email,
      i.phone,
      `"${i.serviceNeeded}"`,
      `"${i.budgetRange}"`,
      i.status,
      `"${i.message.replace(/"/g, '""')}"`,
      `"${(i.internalNotes || '').replace(/"/g, '""')}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `solita_client_inquiries_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Metrics
  const newInquiriesCount = inquiries.filter(i => i.status === 'New').length;
  const inProgressCount = inquiries.filter(i => i.status === 'Reviewing' || i.status === 'Contacted').length;

  const getStatusBadge = (status: InquiryStatus) => {
    switch (status) {
      case 'New':
        return 'bg-amber-500/10 text-amber-400 border-amber-500/20';
      case 'Reviewing':
        return 'bg-sky-500/10 text-sky-400 border-sky-500/20';
      case 'Contacted':
        return 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20';
      case 'Proposal Sent':
        return 'bg-purple-500/10 text-purple-400 border-purple-500/20';
      case 'Closed':
        return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
      default:
        return 'bg-zinc-800 text-zinc-300 border-zinc-700';
    }
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-[#080808] text-zinc-100' : 'bg-[#FAFAFA] text-zinc-900'}`}>
      
      {/* 1. Top Admin Operations Bar */}
      <header className={`sticky top-0 z-40 border-b backdrop-blur-md ${
        darkMode ? 'bg-[#080808]/90 border-zinc-800' : 'bg-white/90 border-zinc-200 shadow-xs'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          
          {/* Logo & Operational Status */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-indigo-400">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-sm tracking-tight">Solita Command</span>
                <span className="text-[10px] font-mono uppercase tracking-widest px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  Operational
                </span>
              </div>
              <div className="text-[10px] font-mono text-zinc-500">
                Backend Desk • {ADMIN_CREDENTIALS.email}
              </div>
            </div>
          </div>

          {/* Right Header Controls */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* View Live Public Site */}
            <button
              onClick={onExitToSite}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider border transition-all cursor-pointer ${
                darkMode
                  ? 'border-zinc-800 bg-zinc-900/60 text-zinc-300 hover:text-white hover:border-zinc-700'
                  : 'border-zinc-200 bg-zinc-50 text-zinc-700 hover:text-zinc-950 hover:border-zinc-300'
              }`}
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Public Website</span>
            </button>

            {/* Dark / Light Toggle */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`p-2 rounded-full border transition-colors cursor-pointer ${
                darkMode
                  ? 'border-zinc-800 bg-zinc-900/60 text-zinc-400 hover:text-white'
                  : 'border-zinc-200 bg-white text-zinc-600 hover:text-zinc-950'
              }`}
              title="Toggle theme"
            >
              {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* Logout */}
            <button
              onClick={onLogout}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/20 text-rose-400 text-xs font-mono uppercase tracking-wider font-bold transition-all cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Sign Out</span>
            </button>
          </div>
        </div>
      </header>

      {/* 2. Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* KPI Strip */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className={`p-5 rounded-3xl border ${
            darkMode ? 'bg-zinc-900/30 border-zinc-800' : 'bg-white border-zinc-200 shadow-xs'
          }`}>
            <div className="flex items-center justify-between text-zinc-500 text-xs font-mono uppercase tracking-wider mb-2">
              <span>New Inquiries</span>
              <MessageSquare className="w-4 h-4 text-amber-400" />
            </div>
            <div className="text-2xl sm:text-3xl font-bold">{newInquiriesCount}</div>
            <div className="text-[11px] font-mono text-zinc-500 mt-1">
              {inquiries.length} total client intakes
            </div>
          </div>

          <div className={`p-5 rounded-3xl border ${
            darkMode ? 'bg-zinc-900/30 border-zinc-800' : 'bg-white border-zinc-200 shadow-xs'
          }`}>
            <div className="flex items-center justify-between text-zinc-500 text-xs font-mono uppercase tracking-wider mb-2">
              <span>In Pipeline</span>
              <Activity className="w-4 h-4 text-sky-400" />
            </div>
            <div className="text-2xl sm:text-3xl font-bold">{inProgressCount}</div>
            <div className="text-[11px] font-mono text-zinc-500 mt-1">
              Active engineering briefs
            </div>
          </div>

          <div className={`p-5 rounded-3xl border ${
            darkMode ? 'bg-zinc-900/30 border-zinc-800' : 'bg-white border-zinc-200 shadow-xs'
          }`}>
            <div className="flex items-center justify-between text-zinc-500 text-xs font-mono uppercase tracking-wider mb-2">
              <span>Live Products</span>
              <Server className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-2xl sm:text-3xl font-bold">{products.filter(p => p.status === 'Live').length} / 6</div>
            <div className="text-[11px] font-mono text-zinc-500 mt-1">
              99.98% platform uptime
            </div>
          </div>

          <div className={`p-5 rounded-3xl border ${
            darkMode ? 'bg-zinc-900/30 border-zinc-800' : 'bg-white border-zinc-200 shadow-xs'
          }`}>
            <div className="flex items-center justify-between text-zinc-500 text-xs font-mono uppercase tracking-wider mb-2">
              <span>Delivery Value</span>
              <TrendingUp className="w-4 h-4 text-indigo-400" />
            </div>
            <div className="text-2xl sm:text-3xl font-bold">$148,000</div>
            <div className="text-[11px] font-mono text-zinc-500 mt-1">
              3 ongoing contracts
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-zinc-800/80 pb-4">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('inquiries')}
              className={`px-4 py-2 rounded-full text-xs font-mono uppercase tracking-widest font-bold transition-all cursor-pointer ${
                activeTab === 'inquiries'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
                  : darkMode
                    ? 'bg-zinc-900/40 border border-zinc-800 text-zinc-400 hover:text-white'
                    : 'bg-zinc-100 border border-zinc-200 text-zinc-600 hover:text-zinc-950'
              }`}
            >
              Inquiries Desk ({inquiries.length})
            </button>

            <button
              onClick={() => setActiveTab('products')}
              className={`px-4 py-2 rounded-full text-xs font-mono uppercase tracking-widest font-bold transition-all cursor-pointer ${
                activeTab === 'products'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
                  : darkMode
                    ? 'bg-zinc-900/40 border border-zinc-800 text-zinc-400 hover:text-white'
                    : 'bg-zinc-100 border border-zinc-200 text-zinc-600 hover:text-zinc-950'
              }`}
            >
              Product Systems
            </button>

            <button
              onClick={() => setActiveTab('pipeline')}
              className={`px-4 py-2 rounded-full text-xs font-mono uppercase tracking-widest font-bold transition-all cursor-pointer ${
                activeTab === 'pipeline'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
                  : darkMode
                    ? 'bg-zinc-900/40 border border-zinc-800 text-zinc-400 hover:text-white'
                    : 'bg-zinc-100 border border-zinc-200 text-zinc-600 hover:text-zinc-950'
              }`}
            >
              Delivery Pipeline
            </button>

            <button
              onClick={() => setActiveTab('security')}
              className={`px-4 py-2 rounded-full text-xs font-mono uppercase tracking-widest font-bold transition-all cursor-pointer ${
                activeTab === 'security'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
                  : darkMode
                    ? 'bg-zinc-900/40 border border-zinc-800 text-zinc-400 hover:text-white'
                    : 'bg-zinc-100 border border-zinc-200 text-zinc-600 hover:text-zinc-950'
              }`}
            >
              Access & Security
            </button>
          </div>

          {/* Quick Tab Actions */}
          {activeTab === 'inquiries' && (
            <div className="flex items-center gap-2">
              <button
                onClick={handleExportCSV}
                className={`px-3 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider border flex items-center gap-1.5 transition-colors cursor-pointer ${
                  darkMode ? 'border-zinc-800 bg-zinc-900/60 text-zinc-300 hover:text-white' : 'border-zinc-200 bg-white text-zinc-700 hover:text-zinc-950'
                }`}
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export CSV</span>
              </button>

              <button
                onClick={() => setIsNewLeadOpen(true)}
                className="px-3.5 py-1.5 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-mono uppercase tracking-wider font-bold flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>New Lead</span>
              </button>
            </div>
          )}
        </div>

        {/* 3. TAB CONTENT: INQUIRIES DESK */}
        {activeTab === 'inquiries' && (
          <div className="space-y-6">
            
            {/* Search and Filters Bar */}
            <div className="flex flex-col sm:flex-row gap-4 justify-between items-stretch sm:items-center">
              
              {/* Search Bar */}
              <div className="relative flex-1 max-w-md">
                <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500" />
                <input
                  type="text"
                  placeholder="Search by client, company, service or keyword..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={`w-full pl-10 pr-4 py-2 rounded-full border text-xs font-mono transition-all focus:outline-none focus:ring-1 ${
                    darkMode
                      ? 'bg-zinc-900/40 border-zinc-800 text-white placeholder-zinc-500 focus:border-indigo-500 focus:ring-indigo-500'
                      : 'bg-white border-zinc-200 text-zinc-900 placeholder-zinc-400 focus:border-indigo-600 focus:ring-indigo-600'
                  }`}
                />
              </div>

              {/* Status Filter Buttons */}
              <div className="flex flex-wrap items-center gap-1.5">
                {['All', 'New', 'Reviewing', 'Contacted', 'Proposal Sent', 'Closed'].map((st) => (
                  <button
                    key={st}
                    onClick={() => setStatusFilter(st)}
                    className={`px-3 py-1 rounded-full text-[11px] font-mono uppercase tracking-wider transition-colors cursor-pointer ${
                      statusFilter === st
                        ? 'bg-zinc-200 text-zinc-950 font-bold dark:bg-zinc-700 dark:text-white'
                        : darkMode
                          ? 'text-zinc-400 hover:text-white hover:bg-zinc-800/40'
                          : 'text-zinc-600 hover:text-zinc-950 hover:bg-zinc-100'
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>

            {/* Inquiries Table / Grid */}
            <div className={`rounded-3xl border overflow-hidden ${
              darkMode ? 'bg-zinc-900/20 border-zinc-800' : 'bg-white border-zinc-200 shadow-sm'
            }`}>
              {filteredInquiries.length === 0 ? (
                <div className="p-12 text-center space-y-3">
                  <div className="w-12 h-12 rounded-2xl bg-zinc-800 text-zinc-500 flex items-center justify-center mx-auto">
                    <Search className="w-5 h-5" />
                  </div>
                  <h4 className="text-base font-bold">No Inquiries Found</h4>
                  <p className="text-xs text-zinc-500 max-w-sm mx-auto font-mono">
                    Try adjusting your search query or status filter. You can also restore sample leads anytime.
                  </p>
                  <button
                    onClick={handleResetData}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-zinc-700 text-xs font-mono uppercase tracking-wider text-zinc-300 hover:bg-zinc-800 cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Restore Sample Data</span>
                  </button>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className={`border-b font-mono uppercase tracking-wider text-[10px] ${
                      darkMode ? 'bg-zinc-900/60 border-zinc-800 text-zinc-400' : 'bg-zinc-50 border-zinc-200 text-zinc-500'
                    }`}>
                      <tr>
                        <th className="py-3.5 px-4">Status</th>
                        <th className="py-3.5 px-4">Client / Company</th>
                        <th className="py-3.5 px-4">Service Required</th>
                        <th className="py-3.5 px-4">Budget</th>
                        <th className="py-3.5 px-4">Received</th>
                        <th className="py-3.5 px-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-800/50">
                      {filteredInquiries.map((inq) => (
                        <tr
                          key={inq.id}
                          className={`transition-colors cursor-pointer ${
                            selectedInquiry?.id === inq.id
                              ? darkMode ? 'bg-indigo-950/30' : 'bg-indigo-50/50'
                              : darkMode ? 'hover:bg-zinc-900/40' : 'hover:bg-zinc-50'
                          }`}
                          onClick={() => setSelectedInquiry(inq)}
                        >
                          <td className="py-4 px-4 whitespace-nowrap">
                            <span className={`inline-block px-2.5 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider border font-bold ${getStatusBadge(inq.status)}`}>
                              {inq.status}
                            </span>
                          </td>

                          <td className="py-4 px-4">
                            <div className="font-bold text-sm tracking-tight">{inq.name}</div>
                            <div className="text-[11px] text-zinc-500 flex items-center gap-1.5 mt-0.5">
                              <Building2 className="w-3 h-3 text-zinc-500 shrink-0" />
                              <span>{inq.company || 'Direct Client'}</span>
                              <span>•</span>
                              <span>{inq.email}</span>
                            </div>
                          </td>

                          <td className="py-4 px-4">
                            <div className="font-medium text-zinc-300 dark:text-zinc-200">{inq.serviceNeeded}</div>
                            <div className="text-[11px] text-zinc-500 truncate max-w-xs mt-0.5 font-mono">
                              {inq.message}
                            </div>
                          </td>

                          <td className="py-4 px-4 whitespace-nowrap font-mono text-zinc-400">
                            {inq.budgetRange}
                          </td>

                          <td className="py-4 px-4 whitespace-nowrap text-zinc-500 font-mono text-[11px]">
                            {new Date(inq.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                          </td>

                          <td className="py-4 px-4 whitespace-nowrap text-right space-x-1" onClick={(e) => e.stopPropagation()}>
                            <button
                              onClick={() => setSelectedInquiry(inq)}
                              className="px-2.5 py-1 rounded-full border border-zinc-700 hover:bg-zinc-800 text-zinc-300 font-mono text-[10px] uppercase font-bold cursor-pointer transition-colors"
                            >
                              Review
                            </button>
                            <button
                              onClick={() => handleDelete(inq.id)}
                              className="p-1.5 rounded-full hover:bg-rose-500/20 text-zinc-500 hover:text-rose-400 cursor-pointer transition-colors"
                              title="Delete inquiry"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            {/* Inquiries Footnote / Reset */}
            <div className="flex items-center justify-between text-xs text-zinc-500 font-mono">
              <div>
                Showing {filteredInquiries.length} of {inquiries.length} inquiries
              </div>
              <button
                onClick={handleResetData}
                className="hover:text-zinc-300 flex items-center gap-1 cursor-pointer transition-colors"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset Default Inquiries</span>
              </button>
            </div>
          </div>
        )}

        {/* 4. TAB CONTENT: PRODUCTS & SYSTEMS */}
        {activeTab === 'products' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold tracking-tight">Proprietary Product Fleet</h3>
                <p className="text-xs text-zinc-500 font-mono mt-1">
                  Active monitoring & runtime telemetry across Solita's 6 software suites
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((p) => (
                <div
                  key={p.id}
                  className={`p-6 rounded-3xl border flex flex-col justify-between ${
                    darkMode ? 'bg-zinc-900/30 border-zinc-800' : 'bg-white border-zinc-200 shadow-sm'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-[10px] font-mono uppercase tracking-widest px-2.5 py-1 rounded-full bg-zinc-800 text-zinc-300 font-bold">
                        {p.category}
                      </span>
                      
                      {/* Status Toggle Dropdown */}
                      <select
                        value={p.status}
                        onChange={(e) => {
                          const updated = toggleProductStatus(p.id, e.target.value as any);
                          setProducts(updated);
                        }}
                        className={`text-[10px] font-mono uppercase tracking-wider px-2 py-1 rounded-full border font-bold cursor-pointer ${
                          p.status === 'Live'
                            ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                            : p.status === 'Beta'
                              ? 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                              : 'bg-zinc-800 text-zinc-400 border-zinc-700'
                        }`}
                      >
                        <option value="Live">Live</option>
                        <option value="Beta">Beta</option>
                        <option value="Development">Development</option>
                        <option value="Maintenance">Maintenance</option>
                      </select>
                    </div>

                    <h4 className="text-lg font-bold tracking-tight mb-4">{p.name}</h4>

                    <div className="grid grid-cols-2 gap-3 py-3 border-y border-zinc-800/60 text-xs font-mono mb-4">
                      <div>
                        <div className="text-zinc-500 text-[10px] uppercase">Active Tenants</div>
                        <div className="font-bold text-sm mt-0.5">{p.activeUsers.toLocaleString()}</div>
                      </div>
                      <div>
                        <div className="text-zinc-500 text-[10px] uppercase">API Uptime</div>
                        <div className="font-bold text-sm mt-0.5 text-emerald-400">{p.uptime}</div>
                      </div>
                      <div>
                        <div className="text-zinc-500 text-[10px] uppercase">Avg Latency</div>
                        <div className="font-bold text-sm mt-0.5">{p.latencyMs}ms</div>
                      </div>
                      <div>
                        <div className="text-zinc-500 text-[10px] uppercase">Calls (24h)</div>
                        <div className="font-bold text-sm mt-0.5">{p.apiCallsToday.toLocaleString()}</div>
                      </div>
                    </div>
                  </div>

                  <div className="pt-2 flex items-center justify-between text-[11px] font-mono text-zinc-500">
                    <span className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                      <span>Health Check OK</span>
                    </span>
                    <a
                      href="#products"
                      onClick={onExitToSite}
                      className="hover:text-indigo-400 flex items-center gap-1 cursor-pointer transition-colors"
                    >
                      <span>Public Card</span>
                      <ArrowUpRight className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 5. TAB CONTENT: DELIVERY PIPELINE */}
        {activeTab === 'pipeline' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-bold tracking-tight">Active Client Engineering Contracts</h3>
              <p className="text-xs text-zinc-500 font-mono mt-1">
                Phase tracking and milestone execution for client engagements
              </p>
            </div>

            <div className="space-y-4">
              {projects.map((proj) => (
                <div
                  key={proj.id}
                  className={`p-6 rounded-3xl border flex flex-col md:flex-row md:items-center justify-between gap-6 ${
                    darkMode ? 'bg-zinc-900/30 border-zinc-800' : 'bg-white border-zinc-200 shadow-sm'
                  }`}
                >
                  <div className="space-y-1.5 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 font-bold">
                        {proj.serviceType}
                      </span>
                      <span className="text-xs text-zinc-500">•</span>
                      <span className="text-xs font-mono text-zinc-400">{proj.clientName}</span>
                    </div>

                    <h4 className="text-base sm:text-lg font-bold tracking-tight">{proj.projectName}</h4>

                    <div className="text-xs font-mono text-zinc-500 flex items-center gap-4 pt-1">
                      <span>Tech Lead: {proj.lead}</span>
                      <span>Target: {proj.targetDate}</span>
                      <span>Contract: {proj.budget}</span>
                    </div>
                  </div>

                  <div className="w-full md:w-64 space-y-2">
                    <div className="flex justify-between text-xs font-mono">
                      <span className="text-zinc-400">{proj.stage}</span>
                      <span className="font-bold text-indigo-400">{proj.progress}%</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-zinc-800 overflow-hidden">
                      <div
                        className="h-full bg-indigo-600 rounded-full transition-all duration-500"
                        style={{ width: `${proj.progress}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 6. TAB CONTENT: SECURITY & SYSTEM */}
        {activeTab === 'security' && (
          <div className="max-w-3xl space-y-6">
            <div>
              <h3 className="text-xl font-bold tracking-tight">Security & Admin Profile</h3>
              <p className="text-xs text-zinc-500 font-mono mt-1">
                Authorized credentials and environment health configuration
              </p>
            </div>

            <div className={`p-8 rounded-3xl border space-y-6 ${
              darkMode ? 'bg-zinc-900/30 border-zinc-800' : 'bg-white border-zinc-200 shadow-sm'
            }`}>
              <div className="flex items-center gap-4 pb-6 border-b border-zinc-800">
                <div className="w-14 h-14 rounded-2xl bg-zinc-800 border border-zinc-700 flex items-center justify-center font-bold text-indigo-400 font-mono text-lg">
                  SS
                </div>
                <div>
                  <h4 className="text-lg font-bold">{ADMIN_CREDENTIALS.name}</h4>
                  <div className="text-xs font-mono text-zinc-400 mt-0.5">{ADMIN_CREDENTIALS.email}</div>
                  <div className="inline-block mt-2 px-2.5 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 text-[10px] font-mono uppercase tracking-widest font-bold">
                    {ADMIN_CREDENTIALS.role}
                  </div>
                </div>
              </div>

              <div className="space-y-4 text-xs font-mono">
                <div className="flex justify-between py-2 border-b border-zinc-800/60">
                  <span className="text-zinc-500 uppercase">Primary Contact Email:</span>
                  <span className="text-zinc-200 font-bold">{COMPANY_INFO.contact.email}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-zinc-800/60">
                  <span className="text-zinc-500 uppercase">Phone Dispatch:</span>
                  <span className="text-zinc-200 font-bold">{COMPANY_INFO.contact.phone}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-zinc-800/60">
                  <span className="text-zinc-500 uppercase">Registered Organization:</span>
                  <span className="text-zinc-200">{COMPANY_INFO.name}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-zinc-800/60">
                  <span className="text-zinc-500 uppercase">Google Workspace Scope:</span>
                  <span className="text-emerald-400 font-bold">Gmail API & Forms Configured</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-zinc-500 uppercase">Session Expiry:</span>
                  <span className="text-zinc-400">Continuous Local Session</span>
                </div>
              </div>

              <div className="pt-4 flex items-center justify-between">
                <button
                  onClick={onLogout}
                  className="px-6 py-2.5 rounded-full bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/20 text-rose-400 text-xs font-mono uppercase tracking-widest font-bold transition-colors cursor-pointer"
                >
                  Terminate Admin Session
                </button>

                <a
                  href={`mailto:${COMPANY_INFO.contact.email}`}
                  className="text-xs font-mono text-indigo-400 hover:underline"
                >
                  Open Gmail Client
                </a>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* 7. INQUIRY INSPECTION DRAWER / MODAL */}
      {selectedInquiry && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn"
        >
          <div className={`relative max-w-2xl w-full rounded-3xl border p-6 sm:p-8 max-h-[90vh] overflow-y-auto ${
            darkMode ? 'bg-[#0E0E0E] border-zinc-800 text-zinc-200' : 'bg-white border-zinc-200 text-zinc-900 shadow-2xl'
          }`}>
            <button
              onClick={() => setSelectedInquiry(null)}
              className={`absolute top-5 right-5 p-2 rounded-full border transition-colors cursor-pointer ${
                darkMode ? 'border-zinc-800 hover:bg-zinc-800 text-zinc-400 hover:text-white' : 'border-zinc-200 hover:bg-zinc-100 text-zinc-600'
              }`}
            >
              <X className="w-4 h-4" />
            </button>

            {/* Header */}
            <div className="flex items-center gap-2 mb-4">
              <span className={`px-2.5 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider border font-bold ${getStatusBadge(selectedInquiry.status)}`}>
                {selectedInquiry.status}
              </span>
              <span className="text-xs font-mono text-zinc-500">
                ID: {selectedInquiry.id} • {new Date(selectedInquiry.createdAt).toLocaleString()}
              </span>
            </div>

            <h3 className="text-2xl font-bold tracking-tight mb-1">{selectedInquiry.name}</h3>
            <div className="text-sm font-mono text-zinc-400 mb-6 flex items-center gap-2">
              <Building2 className="w-3.5 h-3.5" />
              <span>{selectedInquiry.company || 'Direct Client'}</span>
            </div>

            {/* Contact details grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-4 rounded-2xl bg-zinc-900/40 border border-zinc-800/80 text-xs font-mono mb-6">
              <div>
                <span className="text-zinc-500 uppercase text-[10px]">Email Address</span>
                <div className="font-bold text-zinc-200 mt-0.5">{selectedInquiry.email}</div>
              </div>
              <div>
                <span className="text-zinc-500 uppercase text-[10px]">Phone Number</span>
                <div className="font-bold text-zinc-200 mt-0.5">{selectedInquiry.phone || 'Not Provided'}</div>
              </div>
              <div>
                <span className="text-zinc-500 uppercase text-[10px]">Service Requested</span>
                <div className="font-bold text-indigo-400 mt-0.5">{selectedInquiry.serviceNeeded}</div>
              </div>
              <div>
                <span className="text-zinc-500 uppercase text-[10px]">Target Budget</span>
                <div className="font-bold text-zinc-200 mt-0.5">{selectedInquiry.budgetRange}</div>
              </div>
            </div>

            {/* Scope / Message */}
            <div className="mb-6 space-y-2">
              <div className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 font-bold">
                Project Scope & Client Requirements
              </div>
              <div className={`p-4 rounded-2xl border text-xs leading-relaxed whitespace-pre-wrap ${
                darkMode ? 'bg-zinc-900/60 border-zinc-800 text-zinc-300' : 'bg-zinc-50 border-zinc-200 text-zinc-800'
              }`}>
                {selectedInquiry.message}
              </div>
            </div>

            {/* Internal Admin Notes */}
            <div className="mb-6 space-y-2">
              <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-widest text-zinc-500 font-bold">
                <span>Internal Engineering Notes</span>
                {copiedStatus === 'notes_saved' && (
                  <span className="text-emerald-400 flex items-center gap-1 font-bold">
                    <Check className="w-3 h-3" /> Saved
                  </span>
                )}
              </div>
              <textarea
                rows={3}
                value={internalNoteDraft}
                onChange={(e) => setInternalNoteDraft(e.target.value)}
                placeholder="Add architecture thoughts, assigned lead, or next actions..."
                className={`w-full p-3 rounded-2xl border text-xs font-mono transition-all focus:outline-none focus:ring-1 ${
                  darkMode
                    ? 'bg-zinc-900/60 border-zinc-800 text-white placeholder-zinc-600 focus:border-indigo-500'
                    : 'bg-zinc-50 border-zinc-200 text-zinc-900 placeholder-zinc-400 focus:border-indigo-600'
                }`}
              />
              <button
                type="button"
                onClick={handleSaveNote}
                className="px-4 py-1.5 rounded-full bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-[10px] font-mono uppercase font-bold tracking-wider cursor-pointer transition-colors"
              >
                Save Notes
              </button>
            </div>

            {/* Status Changer & Quick Dispatch */}
            <div className="pt-4 border-t border-zinc-800/80 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-mono text-zinc-500 uppercase">Change Status:</span>
                <select
                  value={selectedInquiry.status}
                  onChange={(e) => handleStatusChange(selectedInquiry.id, e.target.value as InquiryStatus)}
                  className="text-xs font-mono px-3 py-1.5 rounded-full border border-zinc-700 bg-zinc-800 text-zinc-200 font-bold cursor-pointer"
                >
                  <option value="New">New</option>
                  <option value="Reviewing">Reviewing</option>
                  <option value="Contacted">Contacted</option>
                  <option value="Proposal Sent">Proposal Sent</option>
                  <option value="Closed">Closed</option>
                </select>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href={`mailto:${selectedInquiry.email}?subject=${encodeURIComponent(`Solita Solutions Consultation: ${selectedInquiry.serviceNeeded}`)}&body=${encodeURIComponent(`Hi ${selectedInquiry.name},\n\nThank you for reaching out to Solita Solutions regarding ${selectedInquiry.serviceNeeded}.\n\n`)}`}
                  className="px-4 py-2 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-mono uppercase tracking-wider font-bold flex items-center gap-1.5 cursor-pointer transition-colors"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>Reply via Email</span>
                </a>

                {selectedInquiry.phone && (
                  <a
                    href={`tel:${selectedInquiry.phone}`}
                    className="p-2 rounded-full border border-zinc-700 hover:bg-zinc-800 text-zinc-300 cursor-pointer transition-colors"
                    title="Call Phone"
                  >
                    <Phone className="w-4 h-4" />
                  </a>
                )}

                <button
                  onClick={() => handleDelete(selectedInquiry.id)}
                  className="p-2 rounded-full hover:bg-rose-500/20 text-zinc-500 hover:text-rose-400 cursor-pointer transition-colors"
                  title="Delete inquiry"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 8. NEW LEAD MANUAL INTAKE MODAL */}
      {isNewLeadOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn"
        >
          <div className={`relative max-w-lg w-full rounded-3xl border p-6 sm:p-8 max-h-[90vh] overflow-y-auto ${
            darkMode ? 'bg-[#0E0E0E] border-zinc-800 text-zinc-200' : 'bg-white border-zinc-200 text-zinc-900 shadow-2xl'
          }`}>
            <button
              onClick={() => setIsNewLeadOpen(false)}
              className={`absolute top-5 right-5 p-2 rounded-full border transition-colors cursor-pointer ${
                darkMode ? 'border-zinc-800 hover:bg-zinc-800 text-zinc-400 hover:text-white' : 'border-zinc-200 hover:bg-zinc-100 text-zinc-600'
              }`}
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-2 mb-2">
              <span className="text-indigo-500 text-[10px] font-bold uppercase tracking-[0.25em]">
                Direct Record
              </span>
            </div>

            <h3 className="text-xl font-bold tracking-tight mb-4">Add Client Lead / Inquiry</h3>

            <form onSubmit={handleCreateLeadSubmit} className="space-y-4 text-xs font-mono">
              <div>
                <label className="block text-zinc-400 uppercase tracking-wider mb-1">Client Name *</label>
                <input
                  type="text"
                  required
                  value={newLead.name}
                  onChange={(e) => setNewLead({ ...newLead, name: e.target.value })}
                  placeholder="e.g. David Vance"
                  className="w-full px-3.5 py-2 rounded-xl border border-zinc-700 bg-zinc-900/60 text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-zinc-400 uppercase tracking-wider mb-1">Company</label>
                  <input
                    type="text"
                    value={newLead.company}
                    onChange={(e) => setNewLead({ ...newLead, company: e.target.value })}
                    placeholder="Company name"
                    className="w-full px-3.5 py-2 rounded-xl border border-zinc-700 bg-zinc-900/60 text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-zinc-400 uppercase tracking-wider mb-1">Email *</label>
                  <input
                    type="email"
                    required
                    value={newLead.email}
                    onChange={(e) => setNewLead({ ...newLead, email: e.target.value })}
                    placeholder="client@domain.com"
                    className="w-full px-3.5 py-2 rounded-xl border border-zinc-700 bg-zinc-900/60 text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-zinc-400 uppercase tracking-wider mb-1">Service</label>
                  <select
                    value={newLead.serviceNeeded}
                    onChange={(e) => setNewLead({ ...newLead, serviceNeeded: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-zinc-700 bg-zinc-900/60 text-white focus:outline-none focus:border-indigo-500"
                  >
                    {SERVICE_OPTIONS.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-zinc-400 uppercase tracking-wider mb-1">Budget</label>
                  <select
                    value={newLead.budgetRange}
                    onChange={(e) => setNewLead({ ...newLead, budgetRange: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-zinc-700 bg-zinc-900/60 text-white focus:outline-none focus:border-indigo-500"
                  >
                    {BUDGET_RANGES.map((b) => (
                      <option key={b} value={b}>{b}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-zinc-400 uppercase tracking-wider mb-1">Project Scope / Message *</label>
                <textarea
                  rows={4}
                  required
                  value={newLead.message}
                  onChange={(e) => setNewLead({ ...newLead, message: e.target.value })}
                  placeholder="Describe technical requirements, problem statement, or target integrations..."
                  className="w-full px-3.5 py-2 rounded-xl border border-zinc-700 bg-zinc-900/60 text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="pt-2 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsNewLeadOpen(false)}
                  className="px-4 py-2 rounded-full border border-zinc-700 hover:bg-zinc-800 text-zinc-300 uppercase font-bold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white uppercase font-bold cursor-pointer"
                >
                  Create Lead
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
