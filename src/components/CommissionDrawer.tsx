import React, { useEffect, useState } from 'react';
import { CommissionInquiry, validateCommissionInquiry } from '../data/portfolioData';
import { ArrowUpRight, CheckCircle2, Mail, Send, X } from 'lucide-react';

interface CommissionDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  prefillSubject?: string;
  inquiries: CommissionInquiry[];
  onAddInquiry: (inquiry: CommissionInquiry) => void;
}

export const CommissionDrawer: React.FC<CommissionDrawerProps> = ({
  isOpen,
  onClose,
  prefillSubject,
  inquiries,
  onAddInquiry,
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [domain, setDomain] = useState('Full-Stack & 3D Web Architecture');
  const [budgetTier, setBudgetTier] = useState('Bespoke Enterprise Commission');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [justSubmitted, setJustSubmitted] = useState(false);

  useEffect(() => {
    if (prefillSubject) {
      setMessage((prev) => (prev ? prev : `${prefillSubject} — We would like to discuss a collaboration or engineering engagement.`));
    }
  }, [prefillSubject]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validation = validateCommissionInquiry({ name, email, domain, message });
    if (!validation.valid) {
      setErrors(validation.errors);
      setJustSubmitted(false);
      return;
    }

    setErrors({});
    const newInquiry: CommissionInquiry = {
      id: `INQ-${Date.now()}`,
      name: name.trim(),
      email: email.trim(),
      domain,
      budgetTier,
      message: message.trim(),
      createdAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    onAddInquiry(newInquiry);
    setJustSubmitted(true);
    setName('');
    setEmail('');
    setMessage('');
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Commission Inquiry and Direct Contact"
      className="fixed inset-0 z-50 flex justify-end bg-black/80"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg h-full overflow-y-auto bg-[#09090F] border-l border-[#D4AF37]/35 p-6 sm:p-8 shadow-2xl flex flex-col justify-between space-y-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-start justify-between gap-4 border-b border-white/10 pb-4">
            <div className="space-y-1">
              <div className="text-xs font-mono-tabular text-[#D4AF37]">
                ROYAL COURTESY · DIRECT COMMISSION & COLLABORATION
              </div>
              <h2 className="font-display text-3xl font-semibold text-[#F4F1EA]">
                Connect with Mohammad Saad
              </h2>
              <p className="text-xs sm:text-sm text-[#A1A1AA]">
                Have a project, collaboration, or want to discuss custom systems, 3D worlds, or full-stack platforms? Reach out directly.
              </p>
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close Commission Drawer"
              className="p-2 text-[#A1A1AA] hover:text-[#F4F1EA] bg-[#14141F] rounded-lg border border-white/10 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Direct Verified Channels */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            <a
              href="mailto:mohammadsaad35786@gmail.com"
              className="p-3 rounded-lg bg-[#11111A] hover:bg-[#181826] border border-white/10 hover:border-[#D4AF37]/40 transition-colors space-y-1"
            >
              <div className="flex items-center justify-between text-xs font-semibold text-[#D4AF37]">
                <span>Direct Email</span>
                <Mail className="w-3.5 h-3.5" />
              </div>
              <div className="text-[11px] text-[#E4E4E7] truncate">
                mohammadsaad35786@gmail.com
              </div>
            </a>

            <a
              href="https://github.com/MohammadSaad006"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-lg bg-[#11111A] hover:bg-[#181826] border border-white/10 hover:border-[#D4AF37]/40 transition-colors space-y-1"
            >
              <div className="flex items-center justify-between text-xs font-semibold text-[#D4AF37]">
                <span>GitHub</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </div>
              <div className="text-[11px] text-[#E4E4E7] truncate">
                @MohammadSaad006
              </div>
            </a>

            <a
              href="https://www.linkedin.com/in/mohammad-saad-mohammad-farooque-791a45328/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-lg bg-[#11111A] hover:bg-[#181826] border border-white/10 hover:border-[#D4AF37]/40 transition-colors space-y-1"
            >
              <div className="flex items-center justify-between text-xs font-semibold text-[#D4AF37]">
                <span>LinkedIn</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </div>
              <div className="text-[11px] text-[#E4E4E7] truncate">
                Mohammad Saad
              </div>
            </a>
          </div>

          {/* Commission Inquiry Form */}
          <form onSubmit={handleSubmit} noValidate className="space-y-4">
            <div className="space-y-1.5">
              <label htmlFor="commission-name" className="block text-xs font-medium text-[#E4E4E7]">
                Your Name or Organization
              </label>
              <input
                id="commission-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g., Tariq Al-Futtaim · Horizon Ventures"
                className="w-full px-3.5 py-2 text-xs sm:text-sm text-[#F4F1EA] bg-[#12121C] border border-white/15 rounded-lg focus:outline-none focus:border-[#D4AF37]"
              />
              {errors.name && (
                <p role="alert" className="text-xs text-[#F87171]">
                  {errors.name}
                </p>
              )}
            </div>

            <div className="space-y-1.5">
              <label htmlFor="commission-email" className="block text-xs font-medium text-[#E4E4E7]">
                Return Email Address
              </label>
              <input
                id="commission-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@organization.com"
                className="w-full px-3.5 py-2 text-xs sm:text-sm text-[#F4F1EA] bg-[#12121C] border border-white/15 rounded-lg focus:outline-none focus:border-[#D4AF37]"
              />
              {errors.email && (
                <p role="alert" className="text-xs text-[#F87171]">
                  {errors.email}
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label htmlFor="commission-domain" className="block text-xs font-medium text-[#E4E4E7]">
                  Engineering Discipline
                </label>
                <select
                  id="commission-domain"
                  value={domain}
                  onChange={(e) => setDomain(e.target.value)}
                  className="w-full px-3 py-2 text-xs text-[#F4F1EA] bg-[#12121C] border border-white/15 rounded-lg focus:outline-none focus:border-[#D4AF37]"
                >
                  <option value="Full-Stack & 3D Web Architecture">Full-Stack & 3D Web Architecture</option>
                  <option value="Game Development (Unreal / Unity / Godot)">Game Development (Unreal / Unity)</option>
                  <option value="Custom Systems / FLYNAX / ECO AI">Custom Systems / FLYNAX / ECO AI</option>
                  <option value="Embedded Hardware & Robotics (ESP32)">Embedded Hardware & Robotics</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label htmlFor="commission-tier" className="block text-xs font-medium text-[#E4E4E7]">
                  Engagement Scope
                </label>
                <select
                  id="commission-tier"
                  value={budgetTier}
                  onChange={(e) => setBudgetTier(e.target.value)}
                  className="w-full px-3 py-2 text-xs text-[#F4F1EA] bg-[#12121C] border border-white/15 rounded-lg focus:outline-none focus:border-[#D4AF37]"
                >
                  <option value="Bespoke Enterprise Commission">Bespoke Enterprise Commission</option>
                  <option value="R&D Systems Collaboration">R&D Systems Collaboration</option>
                  <option value="Full-Time / Advisory Role">Full-Time / Advisory Role</option>
                </select>
              </div>
            </div>

            <div className="space-y-1.5">
              <label htmlFor="commission-message" className="block text-xs font-medium text-[#E4E4E7]">
                Project Brief & Architectural Objectives
              </label>
              <textarea
                id="commission-message"
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Describe your timeline, technical goals, or collaboration idea..."
                className="w-full px-3.5 py-2 text-xs sm:text-sm text-[#F4F1EA] bg-[#12121C] border border-white/15 rounded-lg focus:outline-none focus:border-[#D4AF37]"
              />
              {errors.message && (
                <p role="alert" className="text-xs text-[#F87171]">
                  {errors.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 text-xs sm:text-sm font-semibold text-[#060609] bg-[#D4AF37] hover:bg-[#E5C358] rounded-lg transition-colors cursor-pointer"
            >
              <Send className="w-4 h-4" />
              <span>Record Commission Brief</span>
            </button>
          </form>

          {justSubmitted && (
            <div
              role="status"
              className="p-3.5 rounded-lg bg-[#121E18] border border-emerald-500/40 text-xs text-[#E4E4E7] flex items-start gap-2.5"
            >
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <div className="font-semibold text-emerald-300">
                  Commission Brief Logged in Session Dispatch
                </div>
                <p className="text-[#A1A1AA]">
                  Your brief is recorded below. You can also launch your mail client directly via{' '}
                  <a
                    href="mailto:mohammadsaad35786@gmail.com"
                    className="text-[#D4AF37] underline"
                  >
                    mohammadsaad35786@gmail.com
                  </a>
                  .
                </p>
              </div>
            </div>
          )}

          {/* Recorded Session Inquiries List */}
          {inquiries.length > 0 && (
            <div className="space-y-2 pt-3 border-t border-white/10">
              <div className="text-xs font-semibold text-[#D4AF37]">
                Recorded Session Briefs ({inquiries.length})
              </div>
              <div className="space-y-2">
                {inquiries.map((inq) => (
                  <div
                    key={inq.id}
                    className="p-3 rounded-lg bg-[#111119] border border-white/10 space-y-1"
                  >
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-[#F4F1EA]">{inq.name}</span>
                      <span className="font-mono-tabular text-[11px] text-[#D4AF37]">
                        {inq.domain} · {inq.createdAt}
                      </span>
                    </div>
                    <p className="text-xs text-[#A1A1AA]">{inq.message}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Quiet Copyright Footer */}
        <footer className="pt-4 border-t border-white/10 text-[11px] text-[#A1A1AA] flex items-center justify-between">
          <span>© 2026 Mohammad Saad Mohammad Farooque</span>
          <span>Spatial Atelier</span>
        </footer>
      </div>
    </div>
  );
};
