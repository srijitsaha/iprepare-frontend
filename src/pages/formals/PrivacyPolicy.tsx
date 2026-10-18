
import React, { useState } from "react";
import {
  ShieldCheck,
  LockKeyhole,
  UserRound,
  Database,
  ChartNoAxesCombined,
  Cookie,
  UserCheck,
  Scale,
  Mail,
  CalendarDays,
  ChevronRight,
  ArrowUp,
  FileText,
} from "lucide-react";

interface sectionInterface {
  id: string;
  title: string;
  children: any;
}

const sections = [
  { id: "introduction", title: "Introduction", icon: ShieldCheck },
  { id: "information", title: "Information We Collect", icon: Database },
  { id: "usage", title: "How We Use Information", icon: ChartNoAxesCombined },
  { id: "quizzes", title: "Quizzes and Challenges", icon: FileText },
  { id: "sharing", title: "Data Sharing", icon: UserRound },
  { id: "cookies", title: "Cookies and Technologies", icon: Cookie },
  { id: "security", title: "Data Security", icon: LockKeyhole },
  { id: "retention", title: "Data Retention", icon: Database },
  { id: "rights", title: "Your Privacy Rights", icon: UserCheck },
  { id: "children", title: "Children's Privacy", icon: UserRound },
  { id: "third-party", title: "Third-Party Services", icon: Scale },
  { id: "changes", title: "Policy Updates", icon: FileText },
  { id: "contact", title: "Contact Us", icon: Mail },
];

function Section({ id, title, children }: sectionInterface ) {
  return (
    <section
      id={id}
      className="scroll-mt-24 border-b pb-8 last:border-0"
    >
      <h2 className="mb-4 text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
        {title}
      </h2>

      <div className="space-y-4 text-sm leading-7 text-muted-foreground sm:text-base">
        {children}
      </div>
    </section>
  );
}

export const PrivacyPolicy: React.FC = () => {
  const [activeSection, setActiveSection] = useState("introduction");

  const navigateToSection = (id: any) => {
    setActiveSection(id);

    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="border-b">
        <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-5 sm:px-6 lg:px-8">
          <div className="flex size-10 items-center justify-center rounded-xl bg-primary text-primary-foreground">
            <ShieldCheck className="size-6" />
          </div>

          <div>
            <p className="text-lg font-bold tracking-tight">
              iPrepare
            </p>
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
            <LockKeyhole className="size-4" />
            Privacy & Data Protection
          </div>

          <h1 className="max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl">
            Privacy Policy
          </h1>

          <p className="mt-5 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
            Your privacy matters to us. This policy explains what
            information iPrepare may collect, how it is used, and
            the choices available to you when using our platform.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-5 text-sm text-muted-foreground">
            <span className="flex items-center gap-2">
              <CalendarDays className="size-4" />
              Last updated: October 18, 2026
            </span>

            <span className="flex items-center gap-2">
              <ShieldCheck className="size-4" />
              Privacy and transparency
            </span>
          </div>
        </div>
      </section>

      {/* Main content */}
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-4 py-10 sm:px-6 lg:grid-cols-[260px_minmax(0,1fr)] lg:px-8 lg:py-14">
        {/* Table of contents */}
        <aside className="h-fit lg:sticky lg:top-6">
          <div className="rounded-xl border bg-card p-4">
            <h2 className="mb-4 px-2 text-sm font-semibold">
              On this page
            </h2>

            <nav aria-label="Privacy Policy sections" className="space-y-1">
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

                    {isActive && (
                      <ChevronRight className="size-4" />
                    )}
                  </button>
                );
              })}
            </nav>
          </div>
        </aside>

        {/* Policy content */}
        <article className="min-w-0 space-y-8">
          <div className="rounded-xl border bg-muted/30 p-5 sm:p-6">
            <h2 className="mb-2 font-semibold">
              Your information, your privacy
            </h2>

            <p className="text-sm leading-7 text-muted-foreground">
              iPrepare is a platform for quiz practice, performance
              tracking, and interactive challenges. We aim to handle
              personal information responsibly and explain our data
              practices clearly. The information we collect depends
              on the features you use and the services enabled in
              your account.
            </p>
          </div>

          <Section id="introduction" title="1. Introduction">
            <p>
              This Privacy Policy describes how iPrepare ("we,"
              "our," or "us") collects, uses, stores, and discloses
              information when you access or use our website,
              application, and related services.
            </p>

            <p>
              By using iPrepare, you acknowledge this policy.
              Where applicable law requires consent for a particular
              processing activity, we will obtain that consent
              separately.
            </p>

            <p>
              This policy should be read together with our Terms
              of Service. If you do not agree with our data
              practices, please discontinue use of the platform
              and contact us with any privacy concerns.
            </p>
          </Section>

          <Section id="information" title="2. Information We Collect">
            <h3 className="font-semibold text-foreground">
              2.1 Account information
            </h3>

            <p>
              When you register or use an account, we may collect
              information such as:
            </p>

            <ul className="list-disc space-y-2 pl-6">
              <li>Name or display name.</li>
              <li>Email address and account identifier.</li>
              <li>
                Authentication information needed to verify your
                identity and maintain your account.
              </li>
              <li>
                Profile information that you choose to provide.
              </li>
            </ul>

            <p>
              We do not intend to collect your account password
              in readable form. Where passwords are managed by
              our application, they should be stored using an
              appropriate secure password-hashing method.
            </p>

            <h3 className="font-semibold text-foreground">
              2.2 Quiz and performance information
            </h3>

            <p>
              To provide quizzes and progress-tracking features,
              we may process:
            </p>

            <ul className="list-disc space-y-2 pl-6">
              <li>Quiz attempts, selected answers, and scores.</li>
              <li>Topics, subjects, and exam categories selected.</li>
              <li>
                Number of questions attempted and correct answers.
              </li>
              <li>
                Quiz dates, durations, completion status, and
                related performance statistics, where recorded.
              </li>
              <li>Bookmarks and saved questions.</li>
              <li>
                Challenge participation, results, and rankings,
                where these features are available.
              </li>
            </ul>

            <h3 className="font-semibold text-foreground">
              2.3 Technical and usage information
            </h3>

            <p>
              When you use iPrepare, our servers or enabled
              third-party services may process technical information
              such as IP address, browser type, device information,
              request timestamps, diagnostic logs, and information
              about interactions with the platform.
            </p>

            <p>
              The exact information collected depends on our
              hosting, security, analytics, and application
              configuration.
            </p>

            <h3 className="font-semibold text-foreground">
              2.4 Information you provide voluntarily
            </h3>

            <p>
              If you contact support, report a problem, or send
              feedback, we may collect the information you include
              in your message and any information reasonably
              necessary to respond.
            </p>
          </Section>

          <Section id="usage" title="3. How We Use Your Information">
            <p>
              We may use information for the following purposes,
              where applicable and permitted by law:
            </p>

            <ul className="list-disc space-y-2 pl-6">
              <li>
                Create and manage user accounts and authenticate
                users.
              </li>
              <li>
                Deliver quizzes, calculate scores, and display
                results.
              </li>
              <li>
                Track quiz history, bookmarks, and study progress.
              </li>
              <li>
                Support challenge mode and display relevant
                competition results.
              </li>
              <li>
                Maintain the security, stability, and functionality
                of the application.
              </li>
              <li>
                Diagnose errors, prevent abuse, and investigate
                suspected fraud or misuse.
              </li>
              <li>
                Respond to questions, feedback, and support requests.
              </li>
              <li>
                Meet legal obligations and enforce our terms where
                necessary.
              </li>
            </ul>

            <p>
              We will not use personal information for a materially
              different purpose without an appropriate legal basis
              or any additional consent required by law.
            </p>
          </Section>

          <Section id="quizzes" title="4. Quizzes, Progress, and Challenges">
            <p>
              iPrepare processes quiz and activity information to
              calculate scores and provide progress statistics.
              This information may be associated with your account
              so that you can review your previous activity.
            </p>

            <p>
              If you participate in challenge mode, certain
              information, such as your display name, score, or
              challenge outcome, may be visible to the other
              participant or to other users if the relevant feature
              displays public results or rankings.
            </p>

            <p>
              We recommend avoiding sensitive personal information
              in your display name or any optional profile field.
              We do not promise that challenge participation or
              account activity will be anonymous to other
              participants.
            </p>
          </Section>

          <Section id="sharing" title="5. How We Share Information">
            <p>
              We do not sell personal information as part of the
              ordinary operation described by this policy. We may
              disclose information in the following circumstances,
              when applicable:
            </p>

            <ul className="list-disc space-y-2 pl-6">
              <li>
                <strong className="text-foreground">
                  Service providers:
                </strong>{" "}
                To hosting providers, database providers, email
                services, security providers, and other vendors
                that help operate iPrepare.
              </li>

              <li>
                <strong className="text-foreground">
                  Other users:
                </strong>{" "}
                To the extent necessary for challenge mode,
                leaderboards, or other features that display
                participant information.
              </li>

              <li>
                <strong className="text-foreground">
                  Legal requirements:
                </strong>{" "}
                When disclosure is required by law, a valid legal
                process, or a competent authority.
              </li>

              <li>
                <strong className="text-foreground">
                  Security and protection:
                </strong>{" "}
                When reasonably necessary to investigate fraud,
                protect the platform, or safeguard users' rights
                and safety, subject to applicable law.
              </li>

              <li>
                <strong className="text-foreground">
                  Business changes:
                </strong>{" "}
                In connection with a merger, acquisition, or
                transfer of business assets, subject to applicable
                legal requirements and appropriate safeguards.
              </li>
            </ul>

            <p>
              Where third parties process personal information on
              our behalf, we aim to use appropriate contractual
              and security safeguards.
            </p>
          </Section>

          <Section id="cookies" title="6. Cookies and Similar Technologies">
            <p>
              iPrepare or its service providers may use cookies,
              local storage, session identifiers, or similar
              technologies to support functions such as maintaining
              login sessions, protecting accounts, remembering
              preferences, and improving reliability.
            </p>

            <p>
              Whether analytics or other non-essential technologies
              are used depends on the services enabled on our
              platform. Where consent is required, we will seek
              it before using the relevant technologies.
            </p>

            <p>
              You can manage cookies through your browser settings.
              Blocking essential storage or cookies may affect
              login sessions or other features.
            </p>
          </Section>

          <Section id="security" title="7. Data Security">
            <p>
              We take reasonable technical and organizational
              measures designed to protect personal information
              against unauthorized access, disclosure, alteration,
              loss, or destruction.
            </p>

            <p>
              Depending on our implementation, safeguards may
              include access controls, secure authentication,
              encryption in transit, protected database access,
              backups, and security monitoring.
            </p>

            <p>
              No website, network, or storage system can be
              guaranteed to be completely secure. We therefore
              cannot promise absolute security. If a personal
              data breach occurs, we will take appropriate
              steps and provide notifications where required
              by applicable law.
            </p>
          </Section>

          <Section id="retention" title="8. Data Retention and Deletion">
            <p>
              We retain personal information only for as long as
              reasonably necessary for the purposes described in
              this policy, including providing the service,
              maintaining account history, resolving disputes,
              preventing abuse, and meeting legal obligations.
            </p>

            <p>
              Retention periods may differ depending on the type
              of information, its purpose, applicable law, and
              technical requirements.
            </p>

            <p>
              You may request account deletion or deletion of
              eligible personal information by contacting us
              through the details below or using an available
              account-deletion feature.
            </p>

            <p>
              Following a valid request, we will handle deletion
              in accordance with applicable law and our retention
              obligations. Some information may need to be retained
              for a lawful reason, and residual copies may remain
              temporarily in protected backups until those backups
              are rotated or deleted.
            </p>
          </Section>

          <Section id="rights" title="9. Your Privacy Rights and Choices">
            <p>
              Depending on your location and applicable law, you
              may have rights relating to your personal information,
              including the right to:
            </p>

            <ul className="list-disc space-y-2 pl-6">
              <li>
                Request information about personal data we process.
              </li>
              <li>
                Request correction of inaccurate or incomplete
                information.
              </li>
              <li>
                Request deletion of personal information where
                applicable.
              </li>
              <li>
                Withdraw consent where processing is based on
                consent, subject to legal and practical limitations.
              </li>
              <li>
                Raise a grievance or submit a privacy-related
                complaint through the appropriate channel.
              </li>
              <li>
                Exercise any additional rights provided by
                applicable data-protection law.
              </li>
            </ul>

            <p>
              To exercise a right, contact us using the details
              in the Contact Us section. We may need to verify
              your identity before responding. We will handle
              requests within the time limits prescribed by
              applicable law.
            </p>
          </Section>

          <Section id="children" title="10. Children's Privacy">
            <p>
              iPrepare may be used by students, including minors.
              Where users are children under applicable law, we
              will handle their personal information in accordance
              with the requirements that apply to the service and
              the relevant age group.
            </p>

            <p>
              Where required by law, we will obtain verifiable
              parental or guardian consent before processing a
              child's personal data and implement applicable
              protections.
            </p>

            <p>
              We do not intend to collect more personal information
              from children than is reasonably necessary for the
              relevant service. If you believe a child's
              information has been collected or processed
              improperly, please contact us.
            </p>
          </Section>

          <Section id="third-party" title="11. Third-Party Services and Links">
            <p>
              iPrepare may rely on external providers for services
              such as hosting, databases, authentication, email
              delivery, security, or analytics. If enabled, these
              providers may process information as necessary to
              deliver their services.
            </p>

            <p>
              The platform may also link to third-party websites.
              We do not control the privacy practices of websites
              that we do not operate. Please review their privacy
              policies before providing personal information.
            </p>

            <p>
              We will update this policy or provide additional
              notices where required to explain material data
              processing arrangements.
            </p>
          </Section>

          <Section id="changes" title="12. Changes to This Privacy Policy">
            <p>
              We may update this policy to reflect changes in our
              services, data practices, or legal requirements.
              When material changes are made, we will take
              reasonable steps to notify users where appropriate
              or required by law.
            </p>

            <p>
              The latest version will display its effective or
              last-updated date. Where required, we will obtain
              renewed consent before implementing changes that
              require it.
            </p>
          </Section>

          <Section id="contact" title="13. Contact Us">
            <p>
              If you have a question, wish to exercise your privacy
              rights, or want to raise a concern about how your
              personal information is handled, contact the iPrepare
              team using the details below.
            </p>

            <div className="mt-4 rounded-xl border bg-card p-5">
              <div className="flex items-start gap-3">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Mail className="size-5" />
                </div>

                <div>
                  <h3 className="font-semibold text-foreground">
                    iPrepare Privacy Support
                  </h3>

                  <p className="mt-1 text-sm text-muted-foreground">
                    Privacy inquiries and grievances
                  </p>

                  <a
                    href="mailto:privacypolicy@iprepare.com"
                    className="break-all text-sm font-medium text-primary hover:underline"
                  >
                    privacypolicy@iprepare.com
                  </a>

                  <p className="mt-3 text-xs leading-5 text-muted-foreground">
                    Replace this placeholder with your monitored
                    privacy or support email address before
                    publishing. Add any legally required grievance
                    officer or data-protection contact details.
                  </p>
                </div>
              </div>
            </div>
          </Section>

          {/* Footer */}
          <footer className="flex flex-col gap-4 border-t pt-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="font-semibold">iPrepare</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Practise. Challenge. Track your progress.
              </p>
            </div>

            <button
              type="button"
              onClick={() =>
                window.scrollTo({ top: 0, behavior: "smooth" })
              }
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