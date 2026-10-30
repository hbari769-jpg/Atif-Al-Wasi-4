import React from 'react';
import { ArrowLeft, FileText, Sparkles, Shield, CheckCircle2 } from 'lucide-react';
import { AestificArchIcon } from './AestificLogo';

interface TermsOfServicePageProps {
  onBack: () => void;
  onOpenPrivacy?: () => void;
}

export const TermsOfServicePage: React.FC<TermsOfServicePageProps> = ({ onBack, onOpenPrivacy }) => {
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
            <FileText className="w-3.5 h-3.5 text-zinc-800 dark:text-zinc-200" />
            <span>Terms of Service</span>
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
              <span>LEGAL AGREEMENT &amp; CONDITIONS</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900 dark:text-white">
              Terms of Service for Aestific AI
            </h1>
            <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 font-medium">
              <strong>Last Updated:</strong> October 2026 &nbsp;|&nbsp; <strong>Effective Date:</strong> Immediate upon use
            </p>
          </div>

          {/* Terms Article Content */}
          <article className="space-y-8 leading-relaxed text-zinc-800 dark:text-zinc-200 text-xs sm:text-[13.5px] font-normal">

            {/* 1. Acceptance of Terms */}
            <section className="space-y-3">
              <h2 className="text-sm sm:text-base font-semibold text-zinc-900 dark:text-white flex items-center gap-2">
                <span className="w-1.5 h-4 rounded-full bg-zinc-900 dark:bg-white shrink-0" />
                1. Acceptance of Terms
              </h2>
              <p className="leading-relaxed font-normal">
                Welcome to <strong className="text-zinc-900 dark:text-white font-semibold">Aestific AI</strong> (&ldquo;Aestific&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;). By accessing, browsing, registering for, or using our artificial intelligence workspace platform, web interface, APIs, or any associated features at <strong className="text-zinc-900 dark:text-white font-semibold">https://aestific.com</strong> (collectively, the &ldquo;Service&rdquo;), you agree to be bound by these Terms of Service.
              </p>
              <p className="leading-relaxed font-normal">
                If you are using the Service on behalf of an organization, company, or legal entity, you represent and warrant that you have the full authority to bind that entity to these Terms. If you do not agree to these Terms, you must immediately cease all access and use of the Service.
              </p>
            </section>

            {/* 2. About Aestific AI */}
            <section className="space-y-3">
              <h2 className="text-sm sm:text-base font-semibold text-zinc-900 dark:text-white flex items-center gap-2">
                <span className="w-1.5 h-4 rounded-full bg-zinc-900 dark:bg-white shrink-0" />
                2. About Aestific AI
              </h2>
              <p className="leading-relaxed font-normal">
                Aestific AI is an advanced artificial intelligence workspace and intelligent orchestration layer designed to assist users with multi-turn chat interactions, code analysis, document processing, voice transcription, and image generation. Aestific integrates multiple state-of-the-art AI model providers (including Google Gemini and Groq) to deliver seamless multimodal experiences.
              </p>
            </section>

            {/* 3. Eligibility and Age Requirements */}
            <section className="space-y-3">
              <h2 className="text-sm sm:text-base font-semibold text-zinc-900 dark:text-white flex items-center gap-2">
                <span className="w-1.5 h-4 rounded-full bg-zinc-900 dark:bg-white shrink-0" />
                3. Eligibility and Age Requirements
              </h2>
              <p className="leading-relaxed font-normal">
                You must be at least 13 years of age (or the minimum age of digital consent required in your jurisdiction) to use Aestific AI. If you are under the age of 18, you may only use the Service with the explicit consent and supervision of a parent or legal guardian. By using Aestific, you affirm that you meet these age eligibility requirements.
              </p>
            </section>

            {/* 4. User Accounts and Account Security */}
            <section className="space-y-3">
              <h2 className="text-sm sm:text-base font-semibold text-zinc-900 dark:text-white flex items-center gap-2">
                <span className="w-1.5 h-4 rounded-full bg-zinc-900 dark:bg-white shrink-0" />
                4. User Accounts and Account Security
              </h2>
              <p className="leading-relaxed font-normal">
                To access full platform features, you may register an account using your name, email address, and a secure password. You are solely responsible for maintaining the strict confidentiality of your password and account credentials.
              </p>
              <ul className="grid sm:grid-cols-2 gap-2.5 pt-1">
                {[
                  'You agree to provide accurate, current, and complete registration information.',
                  'You are fully responsible for all activities and chat sessions that occur under your account.',
                  'You must immediately notify us of any unauthorized use or security breach of your account.',
                  'We employ secure bcrypt password hashing and HTTP-only session cookies to protect login sessions.',
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

            {/* 5. Guest Access */}
            <section className="space-y-3">
              <h2 className="text-sm sm:text-base font-semibold text-zinc-900 dark:text-white flex items-center gap-2">
                <span className="w-1.5 h-4 rounded-full bg-zinc-900 dark:bg-white shrink-0" />
                5. Guest Access
              </h2>
              <p className="leading-relaxed font-normal">
                Aestific permits unauthenticated guest access with stable guest identifiers and message limitations (up to 5 messages per guest session). Guest sessions are stored locally and transiently synchronized. Certain advanced features—such as unlimited chat history, file uploads, and image generation—require account registration. We reserve the right to modify or terminate guest access tiers at any time.
              </p>
            </section>

            {/* 6. Acceptable Use */}
            <section className="space-y-3">
              <h2 className="text-sm sm:text-base font-semibold text-zinc-900 dark:text-white flex items-center gap-2">
                <span className="w-1.5 h-4 rounded-full bg-zinc-900 dark:bg-white shrink-0" />
                6. Acceptable Use
              </h2>
              <p className="leading-relaxed font-normal">
                You agree to use Aestific AI only for lawful, ethical, and constructive purposes. You strictly agree not to use the Service to:
              </p>
              <ul className="grid sm:grid-cols-2 gap-2.5 pt-1">
                {[
                  'Generate or disseminate illegal, harmful, threatening, abusive, defamatory, or harassing content.',
                  'Infringe upon intellectual property, privacy, copyright, or proprietary rights of third parties.',
                  'Attempt to bypass rate limits, probe security vulnerabilities, or reverse-engineer system code.',
                  'Distribute malware, spam, phishing materials, or automated scraping scripts.',
                  'Impersonate any person or misrepresent your affiliation with any individual or entity.',
                  'Generate malicious code, cyberattack payloads, or deceptive deepfake media.',
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

            {/* 7. AI-Generated Content and Its Limitations */}
            <section className="space-y-3">
              <h2 className="text-sm sm:text-base font-semibold text-zinc-900 dark:text-white flex items-center gap-2">
                <span className="w-1.5 h-4 rounded-full bg-zinc-900 dark:bg-white shrink-0" />
                7. AI-Generated Content and Its Limitations
              </h2>
              <p className="leading-relaxed font-normal">
                Responses, code snippets, summaries, and images generated by Aestific AI are produced by artificial intelligence models. AI outputs may occasionally contain inaccuracies, hallucinations, or incomplete information.
              </p>
              <div className="p-3.5 rounded-xl bg-zinc-100 dark:bg-white/5 border border-zinc-200 dark:border-white/10 text-xs font-normal">
                You acknowledge that you are solely responsible for reviewing, verifying, and evaluating all AI-generated content before relying upon, publishing, or executing it. Aestific does not guarantee absolute accuracy or fitness for any particular purpose.
              </div>
            </section>

            {/* 8. User Content and Ownership */}
            <section className="space-y-3">
              <h2 className="text-sm sm:text-base font-semibold text-zinc-900 dark:text-white flex items-center gap-2">
                <span className="w-1.5 h-4 rounded-full bg-zinc-900 dark:bg-white shrink-0" />
                8. User Content and Ownership
              </h2>
              <p className="leading-relaxed font-normal">
                You retain full ownership of all prompts, text, documents, files, and content you submit to Aestific (&ldquo;User Content&rdquo;). We do not claim ownership of your data. You grant Aestific the necessary limited license to process, store, and transmit your User Content solely to provide and maintain the AI services you request.
              </p>
            </section>

            {/* 9. Third-Party AI Providers and Services */}
            <section className="space-y-3">
              <h2 className="text-sm sm:text-base font-semibold text-zinc-900 dark:text-white flex items-center gap-2">
                <span className="w-1.5 h-4 rounded-full bg-zinc-900 dark:bg-white shrink-0" />
                9. Third-Party AI Providers and Services
              </h2>
              <p className="leading-relaxed font-normal">
                Aestific relies on third-party infrastructure and AI inference providers (such as Google Gemini and Groq) as well as transactional email services (Brevo). Your interactions involve transmission through these third-party services, which operate under their respective terms and privacy policies.
              </p>
            </section>

            {/* 10. Service Availability and Changes */}
            <section className="space-y-3">
              <h2 className="text-sm sm:text-base font-semibold text-zinc-900 dark:text-white flex items-center gap-2">
                <span className="w-1.5 h-4 rounded-full bg-zinc-900 dark:bg-white shrink-0" />
                10. Service Availability and Changes
              </h2>
              <p className="leading-relaxed font-normal">
                We strive to maintain high availability of Aestific AI, but we do not guarantee uninterrupted access. We reserve the right to modify, suspend, or discontinue any feature, model, or the entire Service at any time with or without notice.
              </p>
            </section>

            {/* 11. Account Suspension and Termination */}
            <section className="space-y-3">
              <h2 className="text-sm sm:text-base font-semibold text-zinc-900 dark:text-white flex items-center gap-2">
                <span className="w-1.5 h-4 rounded-full bg-zinc-900 dark:bg-white shrink-0" />
                11. Account Suspension and Termination
              </h2>
              <p className="leading-relaxed font-normal">
                You may terminate your account at any time through your account settings. We reserve the right to suspend or terminate your account or access to the Service immediately if we determine that you have violated these Terms, engaged in abusive behavior, or threatened platform security.
              </p>
            </section>

            {/* 12. Data and Privacy */}
            <section className="space-y-3">
              <h2 className="text-sm sm:text-base font-semibold text-zinc-900 dark:text-white flex items-center gap-2">
                <span className="w-1.5 h-4 rounded-full bg-zinc-900 dark:bg-white shrink-0" />
                12. Data and Privacy
              </h2>
              <p className="leading-relaxed font-normal">
                Our collection and use of personal data is governed by our Privacy Policy. By using Aestific, you also agree to the terms outlined in our{' '}
                {onOpenPrivacy ? (
                  <button
                    type="button"
                    onClick={onOpenPrivacy}
                    className="text-zinc-900 dark:text-white font-semibold underline hover:text-black dark:hover:text-zinc-200 cursor-pointer inline"
                  >
                    Privacy Policy
                  </button>
                ) : (
                  <a href="/privacy" className="text-zinc-900 dark:text-white font-semibold underline hover:text-black dark:hover:text-zinc-200">
                    Privacy Policy
                  </a>
                )}
                .
              </p>
            </section>

            {/* 13. Disclaimer of Warranties */}
            <section className="space-y-3">
              <h2 className="text-sm sm:text-base font-semibold text-zinc-900 dark:text-white flex items-center gap-2">
                <span className="w-1.5 h-4 rounded-full bg-zinc-900 dark:bg-white shrink-0" />
                13. Disclaimer of Warranties
              </h2>
              <p className="leading-relaxed font-normal uppercase text-[11px] tracking-wider text-zinc-600 dark:text-zinc-400 font-semibold">
                The service is provided on an &ldquo;as is&rdquo; and &ldquo;as available&rdquo; basis without warranties of any kind, whether express or implied. To the fullest extent permissible under applicable law, Aestific disclaims all warranties, merchantability, fitness for a particular purpose, and non-infringement.
              </p>
            </section>

            {/* 14. Limitation of Liability */}
            <section className="space-y-3">
              <h2 className="text-sm sm:text-base font-semibold text-zinc-900 dark:text-white flex items-center gap-2">
                <span className="w-1.5 h-4 rounded-full bg-zinc-900 dark:bg-white shrink-0" />
                14. Limitation of Liability
              </h2>
              <p className="leading-relaxed font-normal uppercase text-[11px] tracking-wider text-zinc-600 dark:text-zinc-400 font-semibold">
                In no event shall Aestific, its creator, or affiliates be liable for any indirect, incidental, special, consequential, or punitive damages arising out of or relating to your use of or inability to use the service.
              </p>
            </section>

            {/* 15. Changes to These Terms */}
            <section className="space-y-3">
              <h2 className="text-sm sm:text-base font-semibold text-zinc-900 dark:text-white flex items-center gap-2">
                <span className="w-1.5 h-4 rounded-full bg-zinc-900 dark:bg-white shrink-0" />
                15. Changes to These Terms
              </h2>
              <p className="leading-relaxed font-normal">
                We may revise these Terms of Service from time to time to reflect updates in our features or legal obligations. The most current version will always be posted at https://aestific.com/terms. Continued use of the Service after changes become effective constitutes your acceptance of the revised terms.
              </p>
            </section>

            {/* 16. Contact Information */}
            <section className="space-y-4 pt-4 border-t border-zinc-200 dark:border-white/10">
              <h2 className="text-sm sm:text-base font-semibold text-zinc-900 dark:text-white flex items-center gap-2">
                <span className="w-1.5 h-4 rounded-full bg-zinc-900 dark:bg-white shrink-0" />
                16. Contact Information
              </h2>
              <p className="leading-relaxed font-normal">
                If you have any questions or concerns regarding these Terms of Service, please reach out to us:
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
                These Terms of Service reflect Aestific AI&apos;s actual platform capabilities (free-to-use access, guest mode, auth, and AI model routing). They are provided for developer review and legal alignment prior to formal publication.
              </p>
            </div>

          </article>
        </div>
      </div>
    </div>
  );
};
