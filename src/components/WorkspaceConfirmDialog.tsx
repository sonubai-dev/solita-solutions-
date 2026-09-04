import React from 'react';
import { AlertCircle, Check, X, Mail, FileText } from 'lucide-react';

export interface WorkspaceConfirmAction {
  type: 'send_gmail' | 'draft_gmail' | 'create_form';
  title: string;
  description: string;
  recipient?: string;
  subject?: string;
  previewContent?: string;
  onConfirm: () => Promise<void> | void;
}

interface WorkspaceConfirmDialogProps {
  isOpen: boolean;
  action: WorkspaceConfirmAction | null;
  onClose: () => void;
  isLoading: boolean;
  darkMode: boolean;
}

export const WorkspaceConfirmDialog: React.FC<WorkspaceConfirmDialogProps> = ({
  isOpen,
  action,
  onClose,
  isLoading,
  darkMode
}) => {
  if (!isOpen || !action) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="confirm-dialog-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/75 backdrop-blur-sm transition-opacity"
        onClick={() => !isLoading && onClose()}
      />

      {/* Modal Container */}
      <div
        className={`relative w-full max-w-lg rounded-2xl p-6 sm:p-7 border shadow-2xl transition-all z-10 ${
          darkMode ? 'bg-[#0E111C] border-slate-700 text-slate-100' : 'bg-white border-slate-200 text-slate-900'
        }`}
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center shrink-0">
              {action.type === 'create_form' ? (
                <FileText className="w-5 h-5 text-purple-400" />
              ) : (
                <Mail className="w-5 h-5 text-indigo-400" />
              )}
            </div>
            <div>
              <h3 id="confirm-dialog-title" className="text-lg font-bold">
                {action.title}
              </h3>
              <p className={`text-xs ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                User Authorization & Confirmation
              </p>
            </div>
          </div>

          <button
            type="button"
            disabled={isLoading}
            onClick={onClose}
            aria-label="Close dialog"
            className={`p-1.5 rounded-lg border transition-colors cursor-pointer ${
              darkMode ? 'border-slate-800 text-slate-400 hover:text-white' : 'border-slate-200 text-slate-500 hover:text-black'
            }`}
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Informative notice */}
        <div className="mb-4 p-3.5 rounded-xl border border-amber-500/30 bg-amber-500/10 flex items-start gap-3">
          <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
          <p className="text-xs leading-relaxed text-amber-300/90 font-medium">
            {action.description}
          </p>
        </div>

        {/* Payload details preview */}
        <div className={`p-4 rounded-xl border mb-6 text-xs space-y-2.5 font-mono ${
          darkMode ? 'bg-slate-950/60 border-slate-800 text-slate-300' : 'bg-slate-50 border-slate-200 text-slate-700'
        }`}>
          {action.recipient && (
            <div>
              <span className={`uppercase text-[10px] tracking-wider block ${darkMode ? 'text-slate-500' : 'text-slate-400'}`}>Recipient:</span>
              <span className="font-semibold text-indigo-400">{action.recipient}</span>
            </div>
          )}

          {action.subject && (
            <div>
              <span className={`uppercase text-[10px] tracking-wider block ${darkMode ? 'text-slate-500' : 'text-slate-400'}`}>Subject:</span>
              <span className="font-semibold">{action.subject}</span>
            </div>
          )}

          {action.previewContent && (
            <div>
              <span className={`uppercase text-[10px] tracking-wider block mb-1 ${darkMode ? 'text-slate-500' : 'text-slate-400'}`}>Content Preview:</span>
              <div className={`p-2.5 rounded border max-h-36 overflow-y-auto whitespace-pre-wrap text-[11px] leading-relaxed ${
                darkMode ? 'bg-slate-900 border-slate-800 text-slate-300' : 'bg-white border-slate-200 text-slate-800'
              }`}>
                {action.previewContent}
              </div>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            type="button"
            disabled={isLoading}
            onClick={onClose}
            className={`px-4 py-2.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
              darkMode ? 'border-slate-700 text-slate-300 hover:bg-slate-800' : 'border-slate-300 text-slate-700 hover:bg-slate-100'
            }`}
          >
            Cancel
          </button>

          <button
            type="button"
            disabled={isLoading}
            onClick={async () => {
              await action.onConfirm();
            }}
            className="px-5 py-2.5 rounded-xl text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 shadow-md shadow-indigo-600/30 flex items-center gap-2 cursor-pointer disabled:opacity-50"
          >
            {isLoading ? (
              <span className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <Check className="w-4 h-4" />
            )}
            <span>
              {action.type === 'send_gmail'
                ? 'Confirm & Send Email'
                : action.type === 'draft_gmail'
                ? 'Confirm & Create Draft'
                : 'Confirm & Create Form'}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};
