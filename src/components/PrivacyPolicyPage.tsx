import React, { useEffect } from 'react';
import { ArrowLeft, Shield, Sparkles, Lock, CheckCircle2 } from 'lucide-react';
import { AestificArchIcon } from './AestificLogo';
import { updatePageSEO } from '../lib/seo';

interface PrivacyPolicyPageProps {
  onBack: () => void;
  onNavigate?: (path: string) => void;
}

export const PrivacyPolicyPage: React.FC<PrivacyPolicyPageProps> = ({ onBack, onNavigate }) => {
  useEffect(() => {
    updatePageSEO('privacy');
  }, []);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    e.preventDefault();
    if (onNavigate) {
      onNavigate(path);
    } else {
      window.history.pushState({}, '', path);
      window.dispatchEvent(new PopStateEvent('popstate'));
    }
  };
  return (
    <div className="fixed inset-0 z-50 flex flex-col w-screen h-screen bg-white dark:bg-black text-zinc-900 dark:text-zinc-100 overflow-hidden font-sans">
      {/* Top Header Bar */}
      <header className="h-16 px-4 sm:px-6 border-b border-zinc-200 dark:border-white/10 bg-zinc-50/90 dark:bg-zinc-950/80 backdrop-blur-md flex items-center justify-between z-20 shrink-0">
        <div className="flex items-center gap-3.5">
          <button
            type="button"
            onClick={onBack}
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-medium text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white hover:bg-zinc-200 dark:hover:bg-white/10 transition-colors border border-zinc-300 dark:border-white/10 cursor-pointer"
            title="Return to Aestific"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Aestific</span>
          </button>
          
          <div className="flex items-center gap-2.5">
            <AestificArchIcon size={20} className="text-black dark:text-white shrink-0" />
            <span
              className="lowercase font-medium tracking-[0.18em] text-sm sm:text-base text-zinc-900 dark:text-white select-none"
              style={{ fontFamily: "'Comfortaa', cursive, sans-serif", fontWeight: 500 }}
            >
              aestific platform
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-zinc-100 dark:bg-white/5 text-zinc-600 dark:text-zinc-400 border border-zinc-200/80 dark:border-white/10">
            <Shield className="w-3.5 h-3.5 text-zinc-800 dark:text-zinc-200" />
            <span>Official Privacy Policy</span>
          </span>
        </div>
      </header>

      {/* Main Content Scrollable Area */}
      <div className="flex-1 overflow-y-auto px-4 sm:px-8 py-8 sm:py-12 relative">
        <div className="max-w-4xl mx-auto space-y-8 relative z-10 pb-16">
          
          {/* Title Header */}
          <div className="pb-6 border-b border-zinc-200 dark:border-white/10 space-y-3">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-medium bg-zinc-100 dark:bg-white/10 text-zinc-800 dark:text-zinc-200">
              <Sparkles className="w-3 h-3 text-zinc-700 dark:text-zinc-300" />
              <span>DATA GOVERNANCE &amp; PRIVACY</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900 dark:text-white">
              Privacy Policy for Aestific AI
            </h1>
            <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 font-medium">
              <strong>Last Updated:</strong> October 2026 &nbsp;|&nbsp; <strong>Effective Date:</strong> Immediate upon use
            </p>
          </div>

          {/* Privacy Policy Content Article */}
          <article className="space-y-8 leading-relaxed text-zinc-800 dark:text-zinc-200 text-xs sm:text-[13.5px] font-normal">

            {/* 1. Introduction and scope */}
            <section className="space-y-3">
              <h2 className="text-sm sm:text-base font-semibold text-zinc-900 dark:text-white flex items-center gap-2">
                <span className="w-1.5 h-4 rounded-full bg-zinc-900 dark:bg-white shrink-0" />
                1. Introduction and Scope
              </h2>
              <p className="leading-relaxed font-normal">
                Welcome to <strong className="text-zinc-900 dark:text-white font-semibold">Aestific AI</strong> (&ldquo;Aestific&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;). We respect your privacy and are deeply committed to safeguarding your personal data. This Privacy Policy describes how we collect, use, store, process, and protect your information when you access or use our artificial intelligence assistant platform, web interface, APIs, and associated services (collectively, the &ldquo;Service&rdquo;).
              </p>
              <p className="leading-relaxed font-normal">
                By accessing or using Aestific AI at <strong className="text-zinc-900 dark:text-white font-semibold">https://aestific.com</strong>, you agree to the practices outlined in this Privacy Policy. If you do not agree with this policy, please discontinue use of the Service immediately.
              </p>
            </section>

            {/* 2. Information We Collect */}
            <section className="space-y-3">
              <h2 className="text-sm sm:text-base font-semibold text-zinc-900 dark:text-white flex items-center gap-2">
                <span className="w-1.5 h-4 rounded-full bg-zinc-900 dark:bg-white shrink-0" />
                2. Information We Collect
              </h2>
              <p className="leading-relaxed font-normal">
                We collect information necessary to provide, secure, and improve our AI workspace platform:
              </p>
              <ul className="grid sm:grid-cols-2 gap-2.5 pt-1">
                {[
                  'Account Registration Data: Name, email address, and cryptographic bcrypt password hash.',
                  'Authentication & Verification: 6-digit email verification codes and password reset tokens.',
                  'Conversations & Prompts: Chat threads, messages, multi-turn prompts, and AI-generated outputs.',
                  'Uploaded Files & Documents: Files, PDFs, code snippets, and attachments submitted for analysis.',
                  'Media & Generation Assets: AI-generated images, voice audio recordings, and voice transcription text.',
                  'User Personalization: Custom communication preferences, tone, role, and custom system instructions.',
                  'Guest Session Data: Unique stable guest ID and chat records stored locally and synchronized when active.',
                  'Technical Telemetry: IP address, device headers, browser details, and rate-limiting audit logs.',
                ].map((item, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-2.5 p-3 rounded-xl bg-zinc-50 dark:bg-white/[0.03] border border-zinc-200/70 dark:border-white/5"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-zinc-900 dark:bg-zinc-300 mt-1.5 shrink-0" />
                    <span className="text-xs text-zinc-800 dark:text-zinc-200 font-normal">{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* 3. Account Registration and Authentication */}
            <section className="space-y-3">
              <h2 className="text-sm sm:text-base font-semibold text-zinc-900 dark:text-white flex items-center gap-2">
                <span className="w-1.5 h-4 rounded-full bg-zinc-900 dark:bg-white shrink-0" />
                3. Account Registration and Authentication
              </h2>
              <p className="leading-relaxed font-normal">
                When you register an account, we require your name, email, and password. Passwords are never stored in plaintext; they are securely hashed using <strong className="text-zinc-900 dark:text-white font-semibold">bcrypt</strong>.
              </p>
              <p className="leading-relaxed font-normal">
                To prevent spam and verify account ownership, we dispatch time-sensitive 6-digit verification codes to your email address using our transactional email partner, <strong className="text-zinc-900 dark:text-white font-semibold">Brevo</strong>. Once verified, access tokens are securely managed via HTTP-only session cookies.
              </p>
            </section>

            {/* 4. Google Sign-In and Third-Party Authentication */}
            <section className="space-y-3">
              <h2 className="text-sm sm:text-base font-semibold text-zinc-900 dark:text-white flex items-center gap-2">
                <span className="w-1.5 h-4 rounded-full bg-zinc-900 dark:bg-white shrink-0" />
                4. Google Sign-In and Third-Party Authentication
              </h2>
              <p className="leading-relaxed font-normal">
                Aestific currently supports robust email/password authentication alongside secure cryptographic session tokens. Where third-party authentication providers (such as Google Sign-In) are integrated or enabled, we receive only authorized profile identifiers (such as your verified email address and display name) required to authenticate your session. We do not access or store your third-party account passwords.
              </p>
            </section>

            {/* 5. How We Use Information */}
            <section className="space-y-3">
              <h2 className="text-sm sm:text-base font-semibold text-zinc-900 dark:text-white flex items-center gap-2">
                <span className="w-1.5 h-4 rounded-full bg-zinc-900 dark:bg-white shrink-0" />
                5. How We Use Information
              </h2>
              <p className="leading-relaxed font-normal">
                We use the information we collect strictly to operate, maintain, and enhance Aestific AI:
              </p>
              <ul className="grid sm:grid-cols-2 gap-2.5 pt-1">
                {[
                  'Providing and routing AI chat responses across supported model engines.',
                  'Maintaining account-level persistent memory and personalization settings.',
                  'Synchronizing and retrieving your conversation history across sessions.',
                  'Processing multimodal file uploads and image generation requests.',
                  'Enforcing security, multi-tier rate limits, and abuse prevention safeguards.',
                  'Dispatching email verification and password reset notifications.',
                ].map((item, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-2.5 p-3 rounded-xl bg-zinc-50 dark:bg-white/[0.03] border border-zinc-200/70 dark:border-white/5"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-zinc-900 dark:bg-zinc-300 mt-1.5 shrink-0" />
                    <span className="text-xs text-zinc-800 dark:text-zinc-200 font-normal">{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* 6. AI Processing and Third-Party AI Providers */}
            <section className="space-y-3">
              <h2 className="text-sm sm:text-base font-semibold text-zinc-900 dark:text-white flex items-center gap-2">
                <span className="w-1.5 h-4 rounded-full bg-zinc-900 dark:bg-white shrink-0" />
                6. AI Processing and Third-Party AI Providers
              </h2>
              <p className="leading-relaxed font-normal">
                Aestific acts as an intelligent orchestration layer. When you submit prompts, queries, or files, relevant text and context are securely transmitted to our integrated AI inference providers—principally <strong className="text-zinc-900 dark:text-white font-semibold">Google Gemini</strong> (via the `@google/genai` SDK) and <strong className="text-zinc-900 dark:text-white font-semibold">Groq</strong>—to generate responses, transcriptions, or images.
              </p>
              <div className="p-3.5 rounded-xl bg-zinc-100 dark:bg-white/5 border border-zinc-200 dark:border-white/10 text-xs font-normal">
                These third-party AI partners process data in accordance with their respective enterprise data privacy commitments and API terms.
              </div>
            </section>

            {/* 7. Conversation and Chat History */}
            <section className="space-y-3">
              <h2 className="text-sm sm:text-base font-semibold text-zinc-900 dark:text-white flex items-center gap-2">
                <span className="w-1.5 h-4 rounded-full bg-zinc-900 dark:bg-white shrink-0" />
                7. Conversation and Chat History
              </h2>
              <p className="leading-relaxed font-normal">
                Your chat messages and conversation titles are stored in our secure database, associated exclusively with your user account or stable guest identifier. You retain full control over your chat history: you can delete individual conversations, clear your local vault, or permanently delete your account at any time.
              </p>
            </section>

            {/* 8. Data Storage and Retention */}
            <section className="space-y-3">
              <h2 className="text-sm sm:text-base font-semibold text-zinc-900 dark:text-white flex items-center gap-2">
                <span className="w-1.5 h-4 rounded-full bg-zinc-900 dark:bg-white shrink-0" />
                8. Data Storage and Retention
              </h2>
              <p className="leading-relaxed font-normal">
                Data is stored securely on resilient cloud database infrastructure (PostgreSQL / SQLite via robust ORM models). We retain your account data and conversation history for as long as your account remains active.
              </p>
              <p className="leading-relaxed font-normal">
                We also maintain automated background cleanup jobs (such as 30-day retention maintenance) to remove stale transient records. When you delete your account, all associated conversations, messages, files, and personal data are permanently removed from our active database.
              </p>
            </section>

            {/* 9. Cookies and Authentication Technologies */}
            <section className="space-y-3">
              <h2 className="text-sm sm:text-base font-semibold text-zinc-900 dark:text-white flex items-center gap-2">
                <span className="w-1.5 h-4 rounded-full bg-zinc-900 dark:bg-white shrink-0" />
                9. Cookies and Authentication Technologies
              </h2>
              <p className="leading-relaxed font-normal">
                Aestific uses secure, HTTP-only session cookies (`aestific_token`) containing encrypted JWT payloads to maintain your login state securely across requests. We also use browser `localStorage` to store client-side preferences (such as theme mode, chat settings, and stable guest session identifiers). We do not deploy third-party advertising cookies or cross-site tracking beacons.
              </p>
            </section>

            {/* 10. Data Security */}
            <section className="space-y-3">
              <h2 className="text-sm sm:text-base font-semibold text-zinc-900 dark:text-white flex items-center gap-2">
                <span className="w-1.5 h-4 rounded-full bg-zinc-900 dark:bg-white shrink-0" />
                10. Data Security
              </h2>
              <p className="leading-relaxed font-normal">
                We implement robust technical and organizational security controls—including TLS encryption in transit, secure database isolation, password hashing, and strict API rate limiting—to protect your information against unauthorized access, alteration, disclosure, or destruction.
              </p>
            </section>

            {/* 11. Third-Party Services */}
            <section className="space-y-3">
              <h2 className="text-sm sm:text-base font-semibold text-zinc-900 dark:text-white flex items-center gap-2">
                <span className="w-1.5 h-4 rounded-full bg-zinc-900 dark:bg-white shrink-0" />
                11. Third-Party Services
              </h2>
              <p className="leading-relaxed font-normal">
                To operate seamlessly, Aestific integrates with trusted third-party cloud and infrastructure services:
              </p>
              <ul className="grid sm:grid-cols-2 gap-2.5 pt-1">
                {[
                  'Google Cloud Platform & AI Studio (Hosting & Gemini API)',
                  'Groq Cloud (Ultra-fast LLM inference)',
                  'Brevo (Transactional email delivery for verification & password resets)',
                  'Supabase / PostgreSQL (Secure cloud database storage)',
                ].map((item, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-2.5 p-3 rounded-xl bg-zinc-50 dark:bg-white/[0.03] border border-zinc-200/70 dark:border-white/5"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-zinc-900 dark:bg-zinc-300 mt-1.5 shrink-0" />
                    <span className="text-xs text-zinc-800 dark:text-zinc-200 font-normal">{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* 12. User Privacy Rights and Requests */}
            <section className="space-y-3">
              <h2 className="text-sm sm:text-base font-semibold text-zinc-900 dark:text-white flex items-center gap-2">
                <span className="w-1.5 h-4 rounded-full bg-zinc-900 dark:bg-white shrink-0" />
                12. User Privacy Rights and Requests
              </h2>
              <p className="leading-relaxed font-normal">
                You have the right to access, update, export, or delete your personal data. You can export your data or delete your account directly through your account settings modal within the Aestific workspace at any time. For additional privacy inquiries or assistance, you can contact us directly.
              </p>
            </section>

            {/* 13. Children's Privacy */}
            <section className="space-y-3">
              <h2 className="text-sm sm:text-base font-semibold text-zinc-900 dark:text-white flex items-center gap-2">
                <span className="w-1.5 h-4 rounded-full bg-zinc-900 dark:bg-white shrink-0" />
                13. Children&apos;s Privacy
              </h2>
              <p className="leading-relaxed font-normal">
                Aestific AI is not directed at children under the age of 13 (or higher where mandated by local law). We do not knowingly collect personal data from minors. If you believe a minor has provided us with personal data, please contact us immediately so we can remove it.
              </p>
            </section>

            {/* 14. Changes to This Privacy Policy */}
            <section className="space-y-3">
              <h2 className="text-sm sm:text-base font-semibold text-zinc-900 dark:text-white flex items-center gap-2">
                <span className="w-1.5 h-4 rounded-full bg-zinc-900 dark:bg-white shrink-0" />
                14. Changes to This Privacy Policy
              </h2>
              <p className="leading-relaxed font-normal">
                We may update this Privacy Policy periodically to reflect changes in our platform features, technology stack, or legal requirements. When we post updates, we will revise the &ldquo;Last Updated&rdquo; date at the top of this policy.
              </p>
            </section>

            {/* 15. Contact Information */}
            <section className="space-y-4 pt-4 border-t border-zinc-200 dark:border-white/10">
              <h2 className="text-sm sm:text-base font-semibold text-zinc-900 dark:text-white flex items-center gap-2">
                <span className="w-1.5 h-4 rounded-full bg-zinc-900 dark:bg-white shrink-0" />
                15. Contact Information
              </h2>
              <p className="leading-relaxed font-normal">
                If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices, please reach out to us:
              </p>
              <div className="p-4 rounded-2xl bg-zinc-100 dark:bg-white/5 border border-zinc-200 dark:border-white/10 space-y-2 text-xs">
                <p><strong>Platform:</strong> Aestific AI (aestific.com)</p>
                <p><strong>Developer / Creator:</strong> Atif Al Wasi</p>
                <p><strong>Support Email:</strong> <a href="mailto:atifwasee1048@gmail.com" className="text-zinc-900 dark:text-white font-medium hover:underline">atifwasee1048@gmail.com</a></p>
                <p><strong>Support Center:</strong> Accessible via the built-in Support Center within your Aestific workspace.</p>
              </div>
            </section>

            {/* Important Review Notice */}
            <div className="p-4 sm:p-5 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-900 dark:text-amber-200 text-xs leading-relaxed space-y-1.5">
              <p className="font-semibold">⚠️ Important Review Notice:</p>
              <p>
                This Privacy Policy is structured to reflect Aestific AI&apos;s actual technical implementation (auth, DB, guest mode, AI providers, and session tokens). It is provided for review and refinement before formal legal publication.
              </p>
            </div>

            {/* Internal Navigation Footer */}
            <footer className="mt-12 pt-6 border-t border-zinc-200 dark:border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
              <div className="flex flex-wrap items-center gap-4">
                <a
                  href="/"
                  onClick={(e) => handleLinkClick(e, '/')}
                  className="hover:text-zinc-900 dark:hover:text-white transition-colors underline-offset-4 hover:underline"
                >
                  Aestific AI Home
                </a>
                <a
                  href="/about"
                  onClick={(e) => handleLinkClick(e, '/about')}
                  className="hover:text-zinc-900 dark:hover:text-white transition-colors underline-offset-4 hover:underline"
                >
                  About Aestific
                </a>
                <a
                  href="/founder"
                  onClick={(e) => handleLinkClick(e, '/founder')}
                  className="hover:text-zinc-900 dark:hover:text-white transition-colors underline-offset-4 hover:underline"
                >
                  Meet the Founder
                </a>
                <a
                  href="/signup"
                  onClick={(e) => handleLinkClick(e, '/signup')}
                  className="hover:text-zinc-900 dark:hover:text-white transition-colors underline-offset-4 hover:underline"
                >
                  Sign Up
                </a>
                <a
                  href="/terms"
                  onClick={(e) => handleLinkClick(e, '/terms')}
                  className="hover:text-zinc-900 dark:hover:text-white transition-colors underline-offset-4 hover:underline"
                >
                  Terms of Service
                </a>
              </div>
              <p>© {new Date().getFullYear()} Aestific. All rights reserved.</p>
            </footer>

          </article>
        </div>
      </div>
    </div>
  );
};
