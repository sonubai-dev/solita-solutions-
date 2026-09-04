import React, { useState, useEffect } from 'react';
import {
  MessageSquare,
  Phone,
  Mail,
  Send,
  CheckCircle2,
  ArrowUpRight,
  MessageCircle,
  Copy,
  Check,
  FileText,
  Sparkles,
  ExternalLink,
  ShieldCheck,
  AlertCircle
} from 'lucide-react';
import { User } from 'firebase/auth';
import { COMPANY_INFO, SERVICE_OPTIONS, BUDGET_RANGES } from '../config/solitaData';
import { ContactFormData } from '../types';
import { GoogleSignInButton } from './GoogleSignInButton';
import { WorkspaceConfirmDialog, WorkspaceConfirmAction } from './WorkspaceConfirmDialog';
import {
  initAuth,
  googleSignIn,
  getAccessToken,
  sendEmailViaGmail,
  createGmailDraft,
  createIntakeGoogleForm
} from '../lib/workspaceAuth';

import { recordNewInquiry } from '../lib/adminStorage';

interface ContactSectionProps {
  darkMode: boolean;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ darkMode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    company: '',
    email: '',
    phone: '',
    serviceNeeded: SERVICE_OPTIONS[0],
    budgetRange: BUDGET_RANGES[0],
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);
  
  // Workspace API States
  const [confirmAction, setConfirmAction] = useState<WorkspaceConfirmAction | null>(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [isProcessingWorkspace, setIsProcessingWorkspace] = useState(false);
  const [workspaceSuccessMessage, setWorkspaceSuccessMessage] = useState<{
    type: 'gmail_sent' | 'gmail_draft' | 'form_created';
    title: string;
    details: string;
    url?: string;
  } | null>(null);
  const [workspaceError, setWorkspaceError] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = initAuth((currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        // Pre-fill form if empty
        setFormData((prev) => ({
          ...prev,
          name: prev.name || currentUser.displayName || '',
          email: prev.email || currentUser.email || ''
        }));
      }
    });
    return () => unsubscribe();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    try {
      recordNewInquiry({
        name: formData.name,
        company: formData.company,
        email: formData.email,
        phone: formData.phone,
        serviceNeeded: formData.serviceNeeded,
        budgetRange: formData.budgetRange,
        message: formData.message
      });
    } catch (err) {
      console.error('Error saving inquiry', err);
    }
    setSubmitted(true);
  };

  const handleCopyInquiry = () => {
    const text = `Inquiry for Solita Solutions:
Name: ${formData.name}
Company: ${formData.company || 'N/A'}
Email: ${formData.email}
Phone: ${formData.phone || 'N/A'}
Service Needed: ${formData.serviceNeeded}
Budget Range: ${formData.budgetRange}
Message: ${formData.message}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const constructEmailBody = () => {
    return [
      `Hello Solita Solutions Team,`,
      ``,
      `A new project consultation inquiry has been submitted:`,
      `----------------------------------------------------`,
      `Client Name: ${formData.name}`,
      `Company / Brand: ${formData.company || 'Not Specified'}`,
      `Email Address: ${formData.email}`,
      `Phone Number: ${formData.phone || 'Not Specified'}`,
      `Service Needed: ${formData.serviceNeeded}`,
      `Budget Range: ${formData.budgetRange}`,
      `----------------------------------------------------`,
      ``,
      `Project Scope & Problem Statement:`,
      `${formData.message}`,
      ``,
      `----------------------------------------------------`,
      `Submitted via Solita Solutions Direct Portal (Verified Google Workspace Auth)`
    ].join('\n');
  };

  // 1. Send via Gmail API (Requires confirmation)
  const triggerGmailSend = async () => {
    setWorkspaceError(null);
    let activeToken = await getAccessToken();

    if (!user || !activeToken) {
      try {
        const signResult = await googleSignIn();
        if (!signResult) return;
        setUser(signResult.user);
      } catch (err: any) {
        setWorkspaceError('Sign-in required to dispatch via Gmail.');
        return;
      }
    }

    const subject = `Project Inquiry: ${formData.serviceNeeded} — ${formData.name || 'Client'}`;
    const body = constructEmailBody();

    setConfirmAction({
      type: 'send_gmail',
      title: 'Authorize & Send Email via Gmail',
      description: `With your permission, this will send an email from your authenticated Gmail account directly to Solita Solutions (${COMPANY_INFO.contact.email}).`,
      recipient: COMPANY_INFO.contact.email,
      subject: subject,
      previewContent: body,
      onConfirm: async () => {
        setIsProcessingWorkspace(true);
        try {
          await sendEmailViaGmail({
            to: COMPANY_INFO.contact.email,
            subject,
            bodyText: body
          });
          setConfirmOpen(false);
          setWorkspaceSuccessMessage({
            type: 'gmail_sent',
            title: 'Email Sent Successfully via Gmail API',
            details: `Your project brief has been dispatched directly to ${COMPANY_INFO.contact.email} from your Gmail account.`
          });
        } catch (err: any) {
          console.error(err);
          setWorkspaceError(err.message || 'Failed to send email via Gmail.');
        } finally {
          setIsProcessingWorkspace(false);
        }
      }
    });
    setConfirmOpen(true);
  };

  // 2. Create Draft in Gmail API (Requires confirmation)
  const triggerGmailDraft = async () => {
    setWorkspaceError(null);
    let activeToken = await getAccessToken();

    if (!user || !activeToken) {
      try {
        const signResult = await googleSignIn();
        if (!signResult) return;
        setUser(signResult.user);
      } catch (err: any) {
        setWorkspaceError('Sign-in required to create Gmail draft.');
        return;
      }
    }

    const subject = `Project Inquiry: ${formData.serviceNeeded} — ${formData.name || 'Client'}`;
    const body = constructEmailBody();

    setConfirmAction({
      type: 'draft_gmail',
      title: 'Create Draft in Your Gmail',
      description: `With your permission, this will create a saved draft inside your personal Gmail account addressed to ${COMPANY_INFO.contact.email}.`,
      recipient: COMPANY_INFO.contact.email,
      subject: subject,
      previewContent: body,
      onConfirm: async () => {
        setIsProcessingWorkspace(true);
        try {
          await createGmailDraft({
            to: COMPANY_INFO.contact.email,
            subject,
            bodyText: body
          });
          setConfirmOpen(false);
          setWorkspaceSuccessMessage({
            type: 'gmail_draft',
            title: 'Gmail Draft Created',
            details: `A new draft has been saved into your Gmail mailbox ready for final review before sending.`
          });
        } catch (err: any) {
          console.error(err);
          setWorkspaceError(err.message || 'Failed to create Gmail draft.');
        } finally {
          setIsProcessingWorkspace(false);
        }
      }
    });
    setConfirmOpen(true);
  };

  // 3. Create Google Form Intake (Requires confirmation)
  const triggerGoogleFormCreation = async () => {
    setWorkspaceError(null);
    let activeToken = await getAccessToken();

    if (!user || !activeToken) {
      try {
        const signResult = await googleSignIn();
        if (!signResult) return;
        setUser(signResult.user);
      } catch (err: any) {
        setWorkspaceError('Sign-in required to create Google Form.');
        return;
      }
    }

    const formTitle = `Solita Technical Intake — ${formData.company || formData.name || 'Client'}`;

    setConfirmAction({
      type: 'create_form',
      title: 'Create Official Google Intake Form',
      description: `With your permission, this will create an official Google Form inside your Google Drive with structured technical intake questions.`,
      subject: formTitle,
      previewContent: `Questions to include:\n1. Full Name & Organization\n2. Technical Requirement / Service Needed\n3. Detailed Problem Description & Current Bottlenecks\n4. Estimated Budget & Desired Delivery Horizon`,
      onConfirm: async () => {
        setIsProcessingWorkspace(true);
        try {
          const formResult = await createIntakeGoogleForm({
            title: formTitle,
            serviceName: formData.serviceNeeded,
            clientName: formData.name
          });
          setConfirmOpen(false);
          setWorkspaceSuccessMessage({
            type: 'form_created',
            title: 'Google Form Created in Google Drive',
            details: `Your project scoping intake form is live. You can share the link with stakeholders or edit the questions in Google Forms.`,
            url: formResult.responderUri
          });
        } catch (err: any) {
          console.error(err);
          setWorkspaceError(err.message || 'Failed to create Google Form.');
        } finally {
          setIsProcessingWorkspace(false);
        }
      }
    });
    setConfirmOpen(true);
  };

  const whatsappInquiryLink = `https://wa.me/${COMPANY_INFO.contact.whatsappNumber}?text=${encodeURIComponent(
    `Hi Solita Solutions,\nI would like to discuss a technology solution:\nName: ${formData.name || 'Client'}\nService: ${formData.serviceNeeded}\nMessage: ${formData.message || 'I would like to connect.'}`
  )}`;

  const mailtoInquiryLink = `mailto:${COMPANY_INFO.contact.email}?subject=${encodeURIComponent(
    `Project Inquiry: ${formData.serviceNeeded} — ${formData.name || 'Business'}`
  )}&body=${encodeURIComponent(
    `Name: ${formData.name}\nCompany: ${formData.company}\nPhone: ${formData.phone}\nService: ${formData.serviceNeeded}\nBudget: ${formData.budgetRange}\n\nMessage:\n${formData.message}`
  )}`;

  return (
    <section
      id="contact"
      aria-label="Contact Section"
      className={`py-24 border-t ${
        darkMode ? 'bg-[#080808] border-zinc-800/80' : 'bg-[#FAFAFA] border-zinc-200'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12 space-y-4">
          <div className="flex items-center space-x-2">
            <span className="text-indigo-500 text-[11px] font-bold uppercase tracking-[0.3em]">
              Direct Channels & Scoping
            </span>
            <span className="text-zinc-600">•</span>
            <span className="text-[11px] font-mono uppercase tracking-widest text-zinc-500">
              Technical Intake Desk
            </span>
          </div>

          <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight ${
            darkMode ? 'text-white' : 'text-zinc-950'
          }`}>
            Have a Problem Worth Solving?
          </h2>

          <p className={`text-base sm:text-lg leading-relaxed ${
            darkMode ? 'text-zinc-400' : 'text-zinc-600'
          }`}>
            Tell us what you're building, what you're trying to automate, or what engineering challenge you're trying to conquer.
          </p>
        </div>

        {/* Workspace Notifications */}
        {workspaceSuccessMessage && (
          <div className="mb-8 p-5 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 flex items-start justify-between gap-4 animate-fadeIn">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <h4 className={`text-sm font-bold ${darkMode ? 'text-white' : 'text-zinc-900'}`}>
                  {workspaceSuccessMessage.title}
                </h4>
                <p className={`text-xs mt-1 ${darkMode ? 'text-zinc-300' : 'text-zinc-600'}`}>
                  {workspaceSuccessMessage.details}
                </p>
                {workspaceSuccessMessage.url && (
                  <a
                    href={workspaceSuccessMessage.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 mt-3 text-xs font-semibold text-emerald-400 hover:underline"
                  >
                    <span>Open Generated Google Form</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            </div>
            <button
              type="button"
              onClick={() => setWorkspaceSuccessMessage(null)}
              className="text-xs text-zinc-400 hover:text-white cursor-pointer px-2 py-1 rounded"
            >
              Dismiss
            </button>
          </div>
        )}

        {workspaceError && (
          <div className="mb-8 p-4 rounded-2xl border border-rose-500/30 bg-rose-500/10 flex items-start justify-between gap-3 text-xs text-rose-300">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
              <span>{workspaceError}</span>
            </div>
            <button
              type="button"
              onClick={() => setWorkspaceError(null)}
              className="hover:underline cursor-pointer text-zinc-400"
            >
              Dismiss
            </button>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Direct Communication Channels (Section 14) */}
          <div className="lg:col-span-5 space-y-5">
            
            {/* WhatsApp Card */}
            <div className={`p-6 rounded-3xl border transition-all ${
              darkMode ? 'bg-zinc-900/30 border-zinc-800' : 'bg-white border-zinc-200 shadow-sm'
            }`}>
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-2xl bg-zinc-800 border border-zinc-700 text-emerald-400 flex items-center justify-center">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-mono uppercase tracking-widest px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold">
                  Fastest
                </span>
              </div>
              <h3 className={`text-base font-bold mb-1 tracking-tight ${darkMode ? 'text-white' : 'text-zinc-950'}`}>
                WhatsApp Direct
              </h3>
              <p className={`text-xs mb-3 ${darkMode ? 'text-zinc-400' : 'text-zinc-500'}`}>
                Instant connection with our engineering & leadership desk.
              </p>
              <div className="font-mono text-sm font-semibold mb-4 text-emerald-400">
                {COMPANY_INFO.contact.whatsappDisplay}
              </div>
              <a
                id="contact-whatsapp-btn"
                href={`https://wa.me/${COMPANY_INFO.contact.whatsappNumber}?text=${encodeURIComponent(COMPANY_INFO.contact.whatsappMessage)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-4 rounded-full bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 text-white font-bold text-[11px] uppercase tracking-widest transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm shadow-emerald-600/20"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>Chat on WhatsApp</span>
              </a>
            </div>

            {/* Direct Phone Call Card */}
            <div className={`p-6 rounded-3xl border transition-all ${
              darkMode ? 'bg-zinc-900/30 border-zinc-800' : 'bg-white border-zinc-200 shadow-sm'
            }`}>
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-2xl bg-zinc-800 border border-zinc-700 text-indigo-400 flex items-center justify-center">
                  <Phone className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-mono uppercase tracking-widest px-2.5 py-1 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 font-bold">
                  Direct Line
                </span>
              </div>
              <h3 className={`text-base font-bold mb-1 tracking-tight ${darkMode ? 'text-white' : 'text-zinc-950'}`}>
                Telephone
              </h3>
              <p className={`text-xs mb-3 ${darkMode ? 'text-zinc-400' : 'text-zinc-500'}`}>
                Direct technical consultation for priority requirements.
              </p>
              <div className="font-mono text-sm font-semibold mb-4 text-indigo-400">
                {COMPANY_INFO.contact.phone}
              </div>
              <a
                id="contact-call-btn"
                href={`tel:${COMPANY_INFO.contact.phone.replace(/\s+/g, '')}`}
                className="w-full py-3 px-4 rounded-full bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 text-white font-bold text-[11px] uppercase tracking-widest transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm shadow-indigo-600/20"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Call Us</span>
              </a>
            </div>

            {/* Direct Emails Card */}
            <div className={`p-6 rounded-3xl border transition-all ${
              darkMode ? 'bg-zinc-900/30 border-zinc-800' : 'bg-white border-zinc-200 shadow-sm'
            }`}>
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-2xl bg-zinc-800 border border-zinc-700 text-indigo-400 flex items-center justify-center">
                  <Mail className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-mono uppercase tracking-widest px-2.5 py-1 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 font-bold">
                  Inboxes
                </span>
              </div>
              <h3 className={`text-base font-bold mb-1 tracking-tight ${darkMode ? 'text-white' : 'text-zinc-950'}`}>
                Email Inquiries
              </h3>
              <p className={`text-xs mb-3 ${darkMode ? 'text-zinc-400' : 'text-zinc-500'}`}>
                Detailed briefs, RFPs, and developer proposals.
              </p>
              <div className="space-y-2 mb-4 font-mono text-xs">
                <div>
                  <span className="block text-[10px] uppercase text-zinc-500">General Inquiries</span>
                  <a href={`mailto:${COMPANY_INFO.contact.email}`} className="text-indigo-400 hover:underline">
                    {COMPANY_INFO.contact.email}
                  </a>
                </div>
                <div>
                  <span className="block text-[10px] uppercase text-zinc-500">Development & Engineering</span>
                  <a href={`mailto:${COMPANY_INFO.contact.devEmail}`} className="text-indigo-400 hover:underline">
                    {COMPANY_INFO.contact.devEmail}
                  </a>
                </div>
              </div>
              <a
                id="contact-email-btn"
                href={`mailto:${COMPANY_INFO.contact.email}`}
                className={`w-full py-3 px-4 rounded-full border font-bold text-[11px] uppercase tracking-widest transition-all flex items-center justify-center gap-2 cursor-pointer ${
                  darkMode ? 'border-zinc-800 bg-zinc-900/60 hover:bg-zinc-800 text-zinc-200' : 'border-zinc-300 bg-white hover:bg-zinc-100 text-zinc-800'
                }`}
              >
                <Mail className="w-3.5 h-3.5" />
                <span>Email Us</span>
              </a>
            </div>

          </div>

          {/* Right Column: Modern Contact Form (Section 15) */}
          <div className="lg:col-span-7">
            <div className={`p-6 sm:p-8 rounded-3xl border transition-all ${
              darkMode ? 'bg-zinc-900/30 border-zinc-800 shadow-xl' : 'bg-white border-zinc-200 shadow-md'
            }`}>
              
              <div className="mb-6">
                <h3 className={`text-2xl font-bold tracking-tight mb-2 ${
                  darkMode ? 'text-white' : 'text-zinc-950'
                }`}>
                  Project & Solution Consultation
                </h3>
                <p className={`text-sm ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
                  Fill in your requirements below. We review all incoming technical queries within 24 hours.
                </p>
              </div>

              {submitted ? (
                <div className="p-8 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 text-center space-y-5">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h4 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-zinc-900'}`}>
                    Consultation Brief Ready!
                  </h4>
                  <p className={`text-sm max-w-md mx-auto ${darkMode ? 'text-zinc-300' : 'text-zinc-600'}`}>
                    Thank you, {formData.name}. Your project brief has been recorded. Dispatch it directly using our connected channels:
                  </p>
                  
                  {/* Primary Dispatch Action Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    {/* Send via Gmail API */}
                    <button
                      type="button"
                      onClick={triggerGmailSend}
                      className="w-full py-3 px-4 rounded-full bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 text-white font-bold text-[11px] uppercase tracking-widest transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-indigo-600/30"
                    >
                      <Mail className="w-3.5 h-3.5" />
                      <span>Send Directly via Gmail API</span>
                    </button>

                    {/* Create Google Form Intake */}
                    <button
                      type="button"
                      onClick={triggerGoogleFormCreation}
                      className="w-full py-3 px-4 rounded-full bg-purple-600 hover:bg-purple-500 active:bg-purple-700 text-white font-bold text-[11px] uppercase tracking-widest transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-purple-600/30"
                    >
                      <FileText className="w-3.5 h-3.5" />
                      <span>Generate Intake Google Form</span>
                    </button>

                    {/* Send via WhatsApp */}
                    <a
                      href={whatsappInquiryLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-3 px-4 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white text-[11px] font-bold uppercase tracking-widest flex items-center justify-center gap-1.5"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>Send to WhatsApp</span>
                    </a>

                    {/* Save Draft in Gmail */}
                    <button
                      type="button"
                      onClick={triggerGmailDraft}
                      className={`w-full py-3 px-4 rounded-full border text-[11px] font-bold uppercase tracking-widest flex items-center justify-center gap-1.5 cursor-pointer transition-colors ${
                        darkMode ? 'border-zinc-700 hover:bg-zinc-800 text-zinc-200' : 'border-zinc-300 hover:bg-zinc-100 text-zinc-800'
                      }`}
                    >
                      <Mail className="w-3.5 h-3.5" />
                      <span>Save as Gmail Draft</span>
                    </button>
                  </div>

                  {/* Secondary Options */}
                  <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                    <a
                      href={mailtoInquiryLink}
                      className={`px-5 py-2.5 rounded-full text-xs font-medium border transition-colors ${
                        darkMode ? 'border-zinc-800 text-zinc-300 hover:bg-zinc-800' : 'border-zinc-200 text-zinc-600 hover:bg-zinc-100'
                      }`}
                    >
                      Open in Mail Client
                    </a>

                    <button
                      type="button"
                      onClick={handleCopyInquiry}
                      className={`px-5 py-2.5 rounded-full text-xs font-medium border transition-colors flex items-center gap-1.5 cursor-pointer ${
                        darkMode ? 'border-zinc-800 text-zinc-300 hover:bg-zinc-800' : 'border-zinc-200 text-zinc-600 hover:bg-zinc-100'
                      }`}
                    >
                      {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copied ? 'Copied' : 'Copy Brief'}</span>
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({
                        name: user?.displayName || '',
                        company: '',
                        email: user?.email || '',
                        phone: '',
                        serviceNeeded: SERVICE_OPTIONS[0],
                        budgetRange: BUDGET_RANGES[0],
                        message: ''
                      });
                    }}
                    className={`mt-4 text-xs underline cursor-pointer ${darkMode ? 'text-zinc-400' : 'text-zinc-500'}`}
                  >
                    Submit another inquiry
                  </button>
                </div>
              ) : (
                <form id="solita-contact-form" onSubmit={handleSubmit} className="space-y-4">
                  
                  {/* Row 1: Name & Business/Company */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="contact-name" className="block text-[10px] font-mono uppercase tracking-[0.2em] mb-1.5 text-zinc-400 font-bold">
                        Your Name <span className="text-indigo-500">*</span>
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Alex Morgan"
                        className={`w-full px-4 py-2.5 rounded-xl border text-sm transition-all focus:outline-none focus:border-indigo-500 ${
                          darkMode
                            ? 'bg-zinc-900/60 border-zinc-800 text-white placeholder-zinc-500'
                            : 'bg-white border-zinc-300 text-zinc-900 placeholder-zinc-400'
                        }`}
                      />
                    </div>

                    <div>
                      <label htmlFor="contact-company" className="block text-[10px] font-mono uppercase tracking-[0.2em] mb-1.5 text-zinc-400 font-bold">
                        Business / Company
                      </label>
                      <input
                        id="contact-company"
                        type="text"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        placeholder="e.g. Nexus Enterprises"
                        className={`w-full px-4 py-2.5 rounded-xl border text-sm transition-all focus:outline-none focus:border-indigo-500 ${
                          darkMode
                            ? 'bg-zinc-900/60 border-zinc-800 text-white placeholder-zinc-500'
                            : 'bg-white border-zinc-300 text-zinc-900 placeholder-zinc-400'
                        }`}
                      />
                    </div>
                  </div>

                  {/* Row 2: Email & Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="contact-email" className="block text-[10px] font-mono uppercase tracking-[0.2em] mb-1.5 text-zinc-400 font-bold">
                        Email Address <span className="text-indigo-500">*</span>
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="alex@company.com"
                        className={`w-full px-4 py-2.5 rounded-xl border text-sm transition-all focus:outline-none focus:border-indigo-500 ${
                          darkMode
                            ? 'bg-zinc-900/60 border-zinc-800 text-white placeholder-zinc-500'
                            : 'bg-white border-zinc-300 text-zinc-900 placeholder-zinc-400'
                        }`}
                      />
                    </div>

                    <div>
                      <label htmlFor="contact-phone" className="block text-[10px] font-mono uppercase tracking-[0.2em] mb-1.5 text-zinc-400 font-bold">
                        Phone Number
                      </label>
                      <input
                        id="contact-phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+91..."
                        className={`w-full px-4 py-2.5 rounded-xl border text-sm transition-all focus:outline-none focus:border-indigo-500 ${
                          darkMode
                            ? 'bg-zinc-900/60 border-zinc-800 text-white placeholder-zinc-500'
                            : 'bg-white border-zinc-300 text-zinc-900 placeholder-zinc-400'
                        }`}
                      />
                    </div>
                  </div>

                  {/* Row 3: What do you need? & Budget Range */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="contact-service" className="block text-[10px] font-mono uppercase tracking-[0.2em] mb-1.5 text-zinc-400 font-bold">
                        What do you need? <span className="text-indigo-500">*</span>
                      </label>
                      <select
                        id="contact-service"
                        value={formData.serviceNeeded}
                        onChange={(e) => setFormData({ ...formData, serviceNeeded: e.target.value })}
                        className={`w-full px-4 py-2.5 rounded-xl border text-sm transition-all focus:outline-none focus:border-indigo-500 ${
                          darkMode
                            ? 'bg-zinc-900 border-zinc-800 text-white'
                            : 'bg-white border-zinc-300 text-zinc-900'
                        }`}
                      >
                        {SERVICE_OPTIONS.map((opt) => (
                          <option key={opt} value={opt} className={darkMode ? 'bg-zinc-900 text-white' : 'bg-white text-zinc-900'}>
                            {opt}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label htmlFor="contact-budget" className="block text-[10px] font-mono uppercase tracking-[0.2em] mb-1.5 text-zinc-400 font-bold">
                        Budget Range
                      </label>
                      <select
                        id="contact-budget"
                        value={formData.budgetRange}
                        onChange={(e) => setFormData({ ...formData, budgetRange: e.target.value })}
                        className={`w-full px-4 py-2.5 rounded-xl border text-sm transition-all focus:outline-none focus:border-indigo-500 ${
                          darkMode
                            ? 'bg-zinc-900 border-zinc-800 text-white'
                            : 'bg-white border-zinc-300 text-zinc-900'
                        }`}
                      >
                        {BUDGET_RANGES.map((b) => (
                          <option key={b} value={b} className={darkMode ? 'bg-zinc-900 text-white' : 'bg-white text-zinc-900'}>
                            {b}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Row 4: Message */}
                  <div>
                    <label htmlFor="contact-message" className="block text-[10px] font-mono uppercase tracking-[0.2em] mb-1.5 text-zinc-400 font-bold">
                      Message / Problem Scope <span className="text-indigo-500">*</span>
                    </label>
                    <textarea
                      id="contact-message"
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Describe what you are building, trying to automate, or the technical problem you need solved..."
                      className={`w-full px-4 py-2.5 rounded-xl border text-sm transition-all focus:outline-none focus:border-indigo-500 ${
                        darkMode
                          ? 'bg-zinc-900/60 border-zinc-800 text-white placeholder-zinc-500'
                          : 'bg-white border-zinc-300 text-zinc-900 placeholder-zinc-400'
                      }`}
                    />
                  </div>

                  {/* Submission Action Buttons */}
                  <div className="space-y-3 pt-2">
                    <button
                      id="contact-submit-btn"
                      type="submit"
                      className="w-full py-3.5 px-6 rounded-full bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 text-white font-bold text-[11px] uppercase tracking-widest transition-all flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/20 cursor-pointer"
                    >
                      <span>Start a Conversation</span>
                      <Send className="w-3.5 h-3.5" />
                    </button>

                    {/* Quick Gmail Direct Option */}
                    <div className="flex items-center justify-between gap-2 pt-1">
                      <button
                        type="button"
                        onClick={() => {
                          if (!formData.name || !formData.email || !formData.message) {
                            setWorkspaceError('Please fill in your name, email, and message first.');
                            return;
                          }
                          triggerGmailSend();
                        }}
                        className={`text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer ${
                          darkMode ? 'text-zinc-400 hover:text-indigo-400' : 'text-zinc-600 hover:text-indigo-600'
                        }`}
                      >
                        <Mail className="w-3.5 h-3.5 text-indigo-400" />
                        <span>Or send directly via your Gmail</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          if (!formData.name || !formData.email || !formData.message) {
                            setWorkspaceError('Please fill in your name, email, and message first.');
                            return;
                          }
                          triggerGoogleFormCreation();
                        }}
                        className={`text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer ${
                          darkMode ? 'text-zinc-400 hover:text-purple-400' : 'text-zinc-600 hover:text-purple-600'
                        }`}
                      >
                        <FileText className="w-3.5 h-3.5 text-purple-400" />
                        <span>Create Google Intake Form</span>
                      </button>
                    </div>
                  </div>

                  <p className={`text-[10px] text-center font-mono ${
                    darkMode ? 'text-zinc-500' : 'text-zinc-500'
                  }`}>
                    Confidential & Direct. Solita Solutions does not share or sell inquiry details.
                  </p>

                </form>
              )}

            </div>
          </div>

        </div>

      </div>

      {/* Mandatory User Confirmation Dialog for Gmail and Google Forms actions */}
      <WorkspaceConfirmDialog
        isOpen={confirmOpen}
        action={confirmAction}
        onClose={() => {
          if (!isProcessingWorkspace) {
            setConfirmOpen(false);
          }
        }}
        isLoading={isProcessingWorkspace}
        darkMode={darkMode}
      />
    </section>
  );
};
