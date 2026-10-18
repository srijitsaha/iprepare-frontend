
import { useState } from "react";
import {
  ShieldCheck,
  FileText,
  UserRound,
  BookOpenCheck,
  Trophy,
  Ban,
  Scale,
  ChevronRight,
  Mail,
  CalendarDays,
  ArrowUp,
} from "lucide-react";



const sections = [
  { id: "acceptance", title: "Acceptance of Terms", icon: FileText },
  { id: "eligibility", title: "Eligibility and Accounts", icon: UserRound },
  { id: "services", title: "Our Services", icon: BookOpenCheck },
  { id: "challenges", title: "Quizzes and Challenge Mode", icon: Trophy },
  { id: "conduct", title: "Acceptable Use", icon: Ban },
  { id: "intellectual-property", title: "Intellectual Property", icon: ShieldCheck },
  { id: "disclaimer", title: "Disclaimers", icon: Scale },
  { id: "liability", title: "Limitation of Liability", icon: Scale },
  { id: "termination", title: "Termination", icon: Ban },
  { id: "changes", title: "Changes to These Terms", icon: FileText },
  { id: "law", title: "Governing Law", icon: Scale },
  { id: "contact", title: "Contact Us", icon: Mail },
];

interface sectionInterface {
  id: string;
  title: string;
  children: any;
}



const Section = ({ id, title, children } : sectionInterface) => {
  return (
    <section id={id} className="scroll-mt-24 border-b pb-8 last:border-0">
      <h2 className="mb-4 text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
        {title}
      </h2>
      <div className="space-y-4 text-sm leading-7 text-muted-foreground sm:text-base">
        {children}
      </div>
    </section>
  );
}

export const TermsOfService = () => {
  const [activeSection, setActiveSection] = useState("acceptance");

  const navigateToSection = (id: string) => {
    setActiveSection(id);
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Page header */}
      <header className="border-b">
        <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-5 sm:px-6 lg:px-8">
          <div className="flex size-10 items-center justify-center rounded-xl bg-primary text-primary-foreground">
            <img src="/Icon Without Logo.png" className="size-6" />
          </div>

          <div>
            <p className="text-lg font-bold tracking-tight">iPrepare</p>
            <p className="text-xs text-muted-foreground">
              Exam Preparation & Quiz Platform
            </p>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="border-b bg-muted/30">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border bg-background px-3 py-1.5 text-sm text-muted-foreground">
            <FileText className="size-4" />
            Legal Information
          </div>

          <h1 className="max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl">
            Terms of Service
          </h1>

          <p className="mt-5 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
            Please read these terms carefully before using iPrepare.
            They explain your rights, responsibilities, and the rules
            that apply when you use our platform.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-5 text-sm text-muted-foreground">
            <span className="flex items-center gap-2">
              <CalendarDays className="size-4" />
              Last updated: October 18, 2026
            </span>
            <span className="flex items-center gap-2">
              <ShieldCheck className="size-4" />
              Your use of iPrepare
            </span>
          </div>
        </div>
      </section>

      {/* Content */}
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-4 py-10 sm:px-6 lg:grid-cols-[260px_minmax(0,1fr)] lg:px-8 lg:py-14">
        {/* Table of contents */}
        <aside className="h-fit lg:sticky lg:top-6">
          <div className="rounded-xl border bg-card p-4">
            <h2 className="mb-4 px-2 text-sm font-semibold">
              On this page
            </h2>

            <nav aria-label="Terms of Service sections" className="space-y-1">
              {sections.map((section) => {
                const Icon = section.icon;
                const isActive = activeSection === section.id;

                return (
                  <button
                    key={section.id}
                    type="button"
                    onClick={() => navigateToSection(section.id)}
                    className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm transition-colors ${
                      isActive
                        ? "bg-primary/10 font-medium text-primary"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    }`}
                  >
                    <Icon className="size-4 shrink-0" />
                    <span className="flex-1">{section.title}</span>
                    {isActive && <ChevronRight className="size-4" />}
                  </button>
                );
              })}
            </nav>
          </div>
        </aside>

        {/* Terms */}
        <article className="min-w-0 space-y-8">
          <div className="rounded-xl border bg-muted/30 p-5 sm:p-6">
            <h2 className="mb-2 font-semibold">A quick introduction</h2>
            <p className="text-sm leading-7 text-muted-foreground">
              iPrepare helps users practise through multiple-choice
              quizzes, track their study activity, and challenge other
              users. These Terms of Service govern your access to and
              use of the website, application, and related features.
            </p>
          </div>

          <Section id="acceptance" title="1. Acceptance of Terms">
            <p>
              By accessing or using iPrepare, you agree to these Terms
              of Service and any applicable laws and regulations. If
              you do not agree to these terms, you must stop using
              the platform.
            </p>
            <p>
              These terms should be read together with our Privacy
              Policy, which explains how we collect, use, store, and
              protect personal information.
            </p>
          </Section>

          <Section id="eligibility" title="2. Eligibility and Accounts">
            <p>
              You must provide accurate information when creating an
              account and keep your account details up to date.
              You are responsible for safeguarding your login
              credentials and for activities carried out through
              your account, subject to applicable law.
            </p>
            <p>
              If you are under 18, you may use iPrepare only with
              the involvement and permission of a parent or legal
              guardian where required by applicable law. Additional
              age-related requirements may apply to particular
              features.
            </p>
            <p>
              Do not impersonate another person, create accounts
              using false information, or attempt to access another
              user's account without authorization. Contact us
              promptly if you suspect unauthorized account access.
            </p>
          </Section>

          <Section id="services" title="3. Our Services">
            <p>
              iPrepare provides tools intended to help users practise
              and assess their knowledge through features that may
              include:
            </p>
            <ul className="list-disc space-y-2 pl-6">
              <li>
                Multiple-choice quizzes for competitive examinations
                such as JEE, NEET, UPSC, and other examinations or
                state-board subjects.
              </li>
              <li>
                Programming-related quizzes covering languages such
                as JavaScript, Python, C#, and other technical topics.
              </li>
              <li>
                Quizzes involving programming libraries, frameworks,
                and related technologies.
              </li>
              <li>
                Study activity, performance statistics, progress
                history, and other tracking features.
              </li>
              <li>
                Competitive challenges and other interactive quiz
                features.
              </li>
            </ul>
            <p>
              Features may change, be temporarily unavailable, or
              be discontinued as the platform develops. We do not
              guarantee uninterrupted access to every feature.
            </p>
          </Section>

          <Section id="challenges" title="4. Quizzes and Challenge Mode">
            <p>
              You agree to participate honestly and follow the
              instructions and rules associated with quizzes and
              challenges.
            </p>
            <ul className="list-disc space-y-2 pl-6">
              <li>
                Do not manipulate scores, exploit software bugs, or
                interfere with the results of a quiz or challenge.
              </li>
              <li>
                Do not use bots, scripts, unauthorized automation,
                or other methods to gain an unfair advantage.
              </li>
              <li>
                Do not collude with other users or misrepresent
                your performance.
              </li>
              <li>
                Challenge results, rankings, and statistics may
                depend on the rules and scoring mechanisms of the
                relevant feature.
              </li>
            </ul>
            <p>
              Quiz questions, answers, explanations, and scoring
              information may contain errors or omissions. Unless
              expressly stated otherwise, results are intended for
              practice and self-assessment and are not official
              examination results.
            </p>
          </Section>

          <Section id="conduct" title="5. Acceptable Use">
            <p>
              You must use iPrepare lawfully and respectfully.
              You must not:
            </p>
            <ul className="list-disc space-y-2 pl-6">
              <li>
                Use the platform for fraud, harassment, threats,
                unlawful activities, or abusive conduct.
              </li>
              <li>
                Upload or transmit malicious code or attempt to
                compromise the security of the platform.
              </li>
              <li>
                Reverse engineer, scrape, copy, or systematically
                extract platform data except where permitted by law
                or expressly authorized by us.
              </li>
              <li>
                Circumvent access controls, rate limits, account
                restrictions, or other security measures.
              </li>
              <li>
                Interfere with the normal operation or availability
                of iPrepare or other users' access to it.
              </li>
              <li>
                Use the platform to infringe the rights of others,
                including their intellectual property or privacy.
              </li>
            </ul>
            <p>
              We may investigate suspected violations and take
              proportionate action where appropriate and legally
              permitted.
            </p>
          </Section>

          <Section id="intellectual-property" title="6. Intellectual Property">
            <p>
              Unless otherwise indicated, the iPrepare name, logo,
              interface, design, software, and original platform
              materials are owned by or licensed to the platform
              operator and are protected by applicable intellectual
              property laws.
            </p>
            <p>
              You may use iPrepare for personal, non-commercial
              practice in accordance with these terms. You may not
              reproduce, redistribute, sell, or commercially exploit
              platform materials without permission, except where
              permitted by applicable law.
            </p>
            <p>
              Third-party names, trademarks, programming technologies,
              and examination names belong to their respective owners.
              Their appearance on iPrepare does not necessarily imply
              sponsorship, endorsement, or affiliation.
            </p>
          </Section>

          <Section id="disclaimer" title="7. Educational Disclaimer">
            <p>
              iPrepare is a practice and performance-tracking tool.
              It does not guarantee examination success, improved
              scores, admission to an institution, employment, or
              any particular academic or professional outcome.
            </p>
            <p>
              We strive to provide useful and accurate quiz material,
              but we do not warrant that every question, answer,
              explanation, score, or statistic will be error-free,
              complete, or suitable for every examination syllabus.
            </p>
            <p>
              You should verify important examination information,
              eligibility requirements, syllabuses, deadlines, and
              official results with the relevant examination
              authorities.
            </p>
          </Section>

          <Section id="liability" title="8. Limitation of Liability">
            <p>
              To the extent permitted by applicable law, iPrepare
              and its operator will not be liable for indirect,
              incidental, special, or consequential losses arising
              from your use of, or inability to use, the platform.
              Examples may include loss of data, interruption of
              access, or reliance on inaccurate practice material.
            </p>
            <p>
              Nothing in these terms excludes or limits liability
              where such exclusion or limitation is prohibited by
              law, including any mandatory consumer rights that
              apply to you.
            </p>
          </Section>

          <Section id="termination" title="9. Suspension and Termination">
            <p>
              You may stop using iPrepare at any time. Where account
              deletion is available, you may use the relevant
              account settings or contact us for assistance.
            </p>
            <p>
              We may suspend, restrict, or terminate access where
              reasonably necessary to protect users, investigate
              abuse, address security risks, enforce these terms,
              or comply with legal obligations. Where appropriate
              and legally permitted, we will provide notice or an
              opportunity to address the issue.
            </p>
            <p>
              Termination does not affect provisions that by their
              nature should continue to apply, such as intellectual
              property, disclaimers, and applicable liability
              limitations.
            </p>
          </Section>

          <Section id="changes" title="10. Changes to These Terms">
            <p>
              We may update these terms to reflect changes to
              iPrepare, our practices, or applicable legal
              requirements. When we make material changes, we
              will take reasonable steps to communicate them,
              where appropriate.
            </p>
            <p>
              The updated version will display a revised
              "Last updated" date. Your continued use of iPrepare
              after the updated terms take effect is subject to
              applicable law and any consent requirements.
            </p>
          </Section>

          <Section id="law" title="11. Governing Law and Disputes">
            <p>
              These terms are subject to the laws of India,
              without depriving you of any mandatory protections
              available under applicable law.
            </p>
            <p>
              Disputes will be addressed through good-faith
              communication where possible. Any court proceedings
              will be brought before a court with appropriate
              jurisdiction under applicable law.
            </p>
          </Section>

          <Section id="contact" title="12. Contact Us">
            <p>
              If you have questions about these Terms of Service,
              need assistance with your account, or wish to report
              a suspected violation, please contact the iPrepare
              team using the contact details below.
            </p>

            <div className="mt-4 rounded-xl border bg-card p-5">
              <div className="flex items-start gap-3">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Mail className="size-5" />
                </div>
                <div>
                  <h3 className="font-semibold">iPrepare Support</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Email
                  </p>
                  <a
                    href="mailto:support@iprepare.com"
                    className="break-all text-sm font-medium text-primary hover:underline"
                  >
                    support@iprepare.com
                  </a>
                </div>
              </div>
            </div>
          </Section>

          {/* Footer */}
          <footer className="flex flex-col gap-4 border-t pt-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="font-semibold">iPrepare</p>
              <p className="mt-1 text-sm text-muted-foreground">
                iPrepare - State boards, Competitive Exams & Coding Preparation, MCQ Quizzes & Challenges.
              </p>
            </div>

            <button
              type="button"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="inline-flex items-center gap-2 self-start rounded-lg border px-4 py-2 text-sm font-medium transition-colors hover:bg-muted sm:self-auto"
            >
              Back to top
              <ArrowUp className="size-4" />
            </button>
          </footer>
        </article>
      </div>
    </main>
  );
}
