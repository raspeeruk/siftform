export type UseCase = {
  slug: string;
  name: string;
  headline: string;
  description: string;
  problem: string;
  solution: string;
  exampleInput: string;
  exampleOutput: { label: string; value: string; confidence: number }[];
  benefits: { title: string; description: string }[];
  roiStats: { metric: string; value: string; description: string }[];
  recommendedFields: { name: string; label: string; type: string }[];
  faqs: { question: string; answer: string }[];
  relatedTemplates: string[];
  relatedUseCases: string[];
};

export const useCases: UseCase[] = [
  // ---------------------------------------------------------------------------
  // 1. Support Tickets
  // ---------------------------------------------------------------------------
  {
    slug: "support-tickets",
    name: "Support Tickets",
    headline: "Route support tickets to the right team before your customer finishes typing",
    description:
      "Sift analyses free-text support tickets in real time, extracts priority, category, and sentiment, and routes them to the correct team instantly.",
    problem:
      "Support teams waste hours manually reading, tagging, and routing tickets. Mis-routed tickets bounce between queues, inflating response times and frustrating customers who already feel ignored.",
    solution:
      "Sift reads each submission the moment it arrives, pulls out the issue category, urgency level, and customer sentiment, then assigns a priority score and routes it to the right queue. No rules engine to maintain, no manual triage.",
    exampleInput:
      "I've been waiting 3 days for a response about my billing issue. I was charged twice for my March subscription and nobody seems to care. This is unacceptable and I want a refund immediately.",
    exampleOutput: [
      { label: "Category", value: "Billing / Duplicate Charge", confidence: 0.96 },
      { label: "Priority", value: "High", confidence: 0.93 },
      { label: "Sentiment", value: "Frustrated / Angry", confidence: 0.95 },
      { label: "Suggested Action", value: "Escalate to Billing Team — refund review", confidence: 0.91 },
    ],
    benefits: [
      {
        title: "Instant triage",
        description:
          "Every ticket is categorised and prioritised in under two seconds, eliminating the manual sorting bottleneck entirely.",
      },
      {
        title: "Fewer mis-routes",
        description:
          "AI classification sends tickets to the correct team first time, cutting internal bounces by up to 70%.",
      },
      {
        title: "Faster first response",
        description:
          "Agents spend time solving problems instead of reading and tagging, dropping average first-response time dramatically.",
      },
      {
        title: "Sentiment-aware escalation",
        description:
          "High-frustration tickets surface immediately so your team can intervene before a cancellation or public complaint.",
      },
    ],
    roiStats: [
      {
        metric: "Triage time reduction",
        value: "80%",
        description: "Average time spent manually categorising and routing tickets drops from minutes to seconds.",
      },
      {
        metric: "First-response time",
        value: "3x faster",
        description: "Agents receive pre-classified tickets with context, enabling faster, more accurate replies.",
      },
      {
        metric: "Mis-route rate",
        value: "Down 70%",
        description: "AI routing eliminates most human classification errors that cause tickets to bounce between teams.",
      },
    ],
    recommendedFields: [
      { name: "subject", label: "Subject", type: "text" },
      { name: "description", label: "Describe your issue", type: "textarea" },
      { name: "email", label: "Email address", type: "email" },
      { name: "account_id", label: "Account ID (optional)", type: "text" },
      { name: "urgency", label: "How urgent is this?", type: "select" },
    ],
    faqs: [
      {
        question: "How does Sift decide the priority of a ticket?",
        answer:
          "Sift analyses the language, sentiment, keywords, and context of the submission. Mentions of outages, security issues, or strong negative sentiment automatically increase priority. You can also define custom priority rules in your dashboard.",
      },
      {
        question: "Can I customise the routing categories?",
        answer:
          "Yes. You define your own categories and team mappings. Sift learns from your historical tickets and adapts its classification to match your taxonomy.",
      },
      {
        question: "Does it work with our existing helpdesk?",
        answer:
          "Sift integrates via webhook or API. Incoming form submissions are processed and the structured output can be pushed to Zendesk, Freshdesk, Intercom, or any system that accepts webhooks.",
      },
      {
        question: "What happens if Sift is unsure about the category?",
        answer:
          "If confidence falls below your configured threshold, the ticket is flagged for human review rather than auto-routed. You always stay in control.",
      },
      {
        question: "How quickly are tickets processed?",
        answer:
          "Extraction typically completes in under two seconds. For most teams, tickets are routed before the customer even sees the confirmation screen.",
      },
    ],
    relatedTemplates: ["helpdesk-ticket", "bug-report", "feedback-form"],
    relatedUseCases: ["complaint-handling", "bug-reporting", "customer-feedback"],
  },

  // ---------------------------------------------------------------------------
  // 2. Lead Capture
  // ---------------------------------------------------------------------------
  {
    slug: "lead-capture",
    name: "Lead Capture",
    headline: "Turn messy form fills into scored, enriched leads your sales team actually wants",
    description:
      "Sift extracts intent, budget signals, and urgency from free-text lead forms, then scores and enriches every submission so sales can prioritise instantly.",
    problem:
      "Most lead forms collect a name, email, and a vague message. Sales reps waste time deciphering intent, chasing low-quality leads, and letting hot prospects go cold while they sort through noise.",
    solution:
      "Sift parses the free-text message, extracts buying signals, timeline, budget range, and company size, then assigns a lead score. Your sales team gets a structured lead card instead of a wall of text.",
    exampleInput:
      "Hi, we're a 50-person logistics company looking to replace our current CRM by Q3. Budget is around $30-40k annually. Would love a demo if you support custom integrations with our WMS.",
    exampleOutput: [
      { label: "Company Size", value: "50 employees", confidence: 0.98 },
      { label: "Timeline", value: "Q3 (within 3-6 months)", confidence: 0.94 },
      { label: "Budget", value: "$30,000-$40,000/year", confidence: 0.96 },
      { label: "Lead Score", value: "92 / 100 — Hot", confidence: 0.91 },
      { label: "Key Requirement", value: "Custom WMS integration", confidence: 0.93 },
    ],
    benefits: [
      {
        title: "Instant lead scoring",
        description:
          "Every submission is scored the moment it arrives, so sales reps know exactly which leads to call first.",
      },
      {
        title: "No more guesswork",
        description:
          "Budget, timeline, and company size are extracted automatically. Reps open a structured card, not a paragraph.",
      },
      {
        title: "Higher conversion rates",
        description:
          "Hot leads get contacted faster because they are surfaced immediately, not buried under low-intent enquiries.",
      },
      {
        title: "CRM-ready output",
        description:
          "Structured fields map directly to your CRM properties. No manual data entry, no copy-paste errors.",
      },
    ],
    roiStats: [
      {
        metric: "Leads captured",
        value: "3x more",
        description: "Free-text forms lower friction vs. long dropdowns, dramatically increasing completion rates.",
      },
      {
        metric: "Sales response time",
        value: "60% faster",
        description: "Pre-scored leads eliminate the sorting step, letting reps act on hot opportunities immediately.",
      },
      {
        metric: "Qualification accuracy",
        value: "90%+",
        description: "AI extraction matches or exceeds manual SDR qualification on budget, timeline, and authority signals.",
      },
    ],
    recommendedFields: [
      { name: "name", label: "Your name", type: "text" },
      { name: "email", label: "Work email", type: "email" },
      { name: "company", label: "Company name", type: "text" },
      { name: "message", label: "Tell us what you need", type: "textarea" },
    ],
    faqs: [
      {
        question: "How does lead scoring work?",
        answer:
          "Sift analyses buying signals (budget mentions, timeline urgency, decision-maker language) and scores each lead from 0-100. You can weight the signals that matter most to your business.",
      },
      {
        question: "Will this replace our SDRs?",
        answer:
          "No. It replaces the manual sorting and data-entry work SDRs do. They spend more time selling and less time reading form submissions.",
      },
      {
        question: "Can I push leads directly to Salesforce or HubSpot?",
        answer:
          "Yes. Sift outputs structured JSON that maps to standard CRM fields. Use our webhook integration or Zapier connector to push leads directly into your pipeline.",
      },
      {
        question: "What if someone submits gibberish?",
        answer:
          "Sift flags low-confidence or nonsensical submissions separately. They never pollute your sales pipeline.",
      },
      {
        question: "Does the form design affect conversion?",
        answer:
          "Absolutely. Sift's single-textarea approach removes friction. Prospects type naturally instead of hunting through dropdowns, which increases completion rates significantly.",
      },
    ],
    relatedTemplates: ["contact-form", "demo-request", "consultation-booking"],
    relatedUseCases: ["quote-requests", "client-intake", "appointment-booking"],
  },

  // ---------------------------------------------------------------------------
  // 3. Client Intake
  // ---------------------------------------------------------------------------
  {
    slug: "client-intake",
    name: "Client Intake",
    headline: "Onboard new clients in minutes, not days of back-and-forth emails",
    description:
      "Sift transforms free-text client intake submissions into structured profiles with goals, requirements, and red flags extracted automatically.",
    problem:
      "Client onboarding is a grind of multi-page forms, follow-up emails, and manual data entry. Agencies and professional services firms lose billable hours before the engagement even starts. Critical details slip through the cracks.",
    solution:
      "Sift lets new clients describe their needs in their own words. The AI extracts project scope, goals, constraints, budget, timeline, and contact details into a structured intake profile. Your team starts with a complete brief, not scattered emails.",
    exampleInput:
      "We're a mid-size accounting firm (around 120 staff) looking for a website redesign. Our current site is 5 years old and doesn't generate leads. We need it done before tax season starts in January. Budget is flexible but probably £15-25k. Main concern is making sure our compliance certifications are prominently displayed.",
    exampleOutput: [
      { label: "Business Type", value: "Accounting firm, 120 staff", confidence: 0.97 },
      { label: "Project Type", value: "Website redesign", confidence: 0.99 },
      { label: "Deadline", value: "Before January (tax season)", confidence: 0.94 },
      { label: "Budget Range", value: "£15,000-£25,000", confidence: 0.95 },
      { label: "Key Requirement", value: "Compliance certifications prominently displayed", confidence: 0.92 },
    ],
    benefits: [
      {
        title: "Complete briefs from day one",
        description:
          "Every intake submission is parsed into a structured profile. No follow-up emails asking for details the client already provided.",
      },
      {
        title: "Faster time-to-kickoff",
        description:
          "Teams can scope projects and prepare proposals the same day a client submits, cutting onboarding time from days to hours.",
      },
      {
        title: "Red-flag detection",
        description:
          "Sift highlights unrealistic timelines, budget mismatches, or scope creep signals so you can address them early.",
      },
      {
        title: "Consistent data quality",
        description:
          "Every client profile follows the same structure regardless of how the client chose to describe their needs.",
      },
    ],
    roiStats: [
      {
        metric: "Onboarding time",
        value: "75% faster",
        description: "Structured intake eliminates most back-and-forth emails typically needed to clarify requirements.",
      },
      {
        metric: "Data completeness",
        value: "95%+",
        description: "AI extraction captures details clients mention naturally but often skip in structured forms.",
      },
      {
        metric: "Proposal turnaround",
        value: "Same-day",
        description: "Teams receive a complete brief immediately, enabling same-day scoping and proposal generation.",
      },
    ],
    recommendedFields: [
      { name: "contact_name", label: "Your name", type: "text" },
      { name: "email", label: "Email address", type: "email" },
      { name: "company", label: "Company / organisation", type: "text" },
      { name: "brief", label: "Tell us about your project", type: "textarea" },
      { name: "phone", label: "Phone number (optional)", type: "tel" },
    ],
    faqs: [
      {
        question: "What industries does this work for?",
        answer:
          "Any professional services firm: agencies, law firms, consultancies, architects, accountants. If you onboard clients, Sift structures the intake.",
      },
      {
        question: "Can I define what fields get extracted?",
        answer:
          "Yes. You configure the extraction schema in your dashboard. Sift pulls exactly the fields your onboarding process requires.",
      },
      {
        question: "What if the client leaves out critical information?",
        answer:
          "Sift flags missing required fields and can trigger an automated follow-up requesting only the specific details that were absent.",
      },
      {
        question: "Is client data secure?",
        answer:
          "All data is encrypted in transit and at rest. Sift processes submissions ephemerally and does not use client data for model training.",
      },
      {
        question: "How does this compare to a multi-step form?",
        answer:
          "Multi-step forms have higher abandonment rates. A single free-text field lowers friction, captures richer context, and converts better. Sift gives you structure without forcing it on the client.",
      },
    ],
    relatedTemplates: ["client-onboarding", "project-brief", "consultation-booking"],
    relatedUseCases: ["lead-capture", "quote-requests", "appointment-booking"],
  },

  // ---------------------------------------------------------------------------
  // 4. Patient Intake
  // ---------------------------------------------------------------------------
  {
    slug: "patient-intake",
    name: "Patient Intake",
    headline: "Capture patient history accurately without the clipboard and pen routine",
    description:
      "Sift extracts symptoms, medical history, medications, and urgency from free-text patient intake forms so clinics can prepare before the appointment begins.",
    problem:
      "Patients fill out the same long paper forms every visit, staff re-key data manually, and clinicians still ask the same questions because the intake was incomplete or illegible. Time is wasted and details are lost.",
    solution:
      "Sift lets patients describe their symptoms and history naturally. The AI extracts structured data: symptom list, duration, severity, current medications, allergies, and relevant history. Clinicians walk into the room prepared.",
    exampleInput:
      "I've had a persistent headache on the right side for about 2 weeks now. It gets worse in the morning. I'm currently on metformin for type 2 diabetes and lisinopril for blood pressure. Allergic to penicillin. Had a similar episode last year that resolved with physiotherapy.",
    exampleOutput: [
      { label: "Primary Symptom", value: "Right-sided headache, 2 weeks, worse mornings", confidence: 0.97 },
      { label: "Current Medications", value: "Metformin (diabetes), Lisinopril (hypertension)", confidence: 0.98 },
      { label: "Allergies", value: "Penicillin", confidence: 0.99 },
      { label: "Relevant History", value: "Similar episode last year, resolved with physiotherapy", confidence: 0.94 },
      { label: "Urgency", value: "Moderate — persistent, 2-week duration", confidence: 0.88 },
    ],
    benefits: [
      {
        title: "Clinicians arrive prepared",
        description:
          "Structured symptom summaries mean clinicians review a clear snapshot before entering the room, reducing redundant questions.",
      },
      {
        title: "Fewer data-entry errors",
        description:
          "Automated extraction eliminates transcription mistakes from illegible handwriting or rushed front-desk data entry.",
      },
      {
        title: "Shorter wait times",
        description:
          "Front-desk staff spend less time processing paperwork, allowing more patients to be seen per day.",
      },
      {
        title: "Better patient experience",
        description:
          "Patients describe symptoms in their own words once, rather than filling out repetitive checkbox forms.",
      },
    ],
    roiStats: [
      {
        metric: "Intake processing time",
        value: "70% faster",
        description: "AI extraction replaces manual data entry from paper forms, freeing administrative staff.",
      },
      {
        metric: "Data accuracy",
        value: "95%+ match",
        description: "Structured extraction captures medication names, dosages, and allergy details with high precision.",
      },
      {
        metric: "Appointments per day",
        value: "15% more",
        description: "Reduced admin overhead per patient allows clinics to schedule and see more appointments.",
      },
    ],
    recommendedFields: [
      { name: "patient_name", label: "Full name", type: "text" },
      { name: "dob", label: "Date of birth", type: "date" },
      { name: "symptoms", label: "Describe your symptoms", type: "textarea" },
      { name: "medications", label: "Current medications (if any)", type: "textarea" },
      { name: "phone", label: "Contact number", type: "tel" },
    ],
    faqs: [
      {
        question: "Is this HIPAA/GDPR compliant?",
        answer:
          "Sift is designed with healthcare privacy in mind. Data is encrypted end-to-end, processed ephemerally, and never used for model training. You retain full control over data storage and retention policies.",
      },
      {
        question: "Can it handle complex medical histories?",
        answer:
          "Yes. Sift extracts multiple conditions, medications with dosages, surgical history, family history, and lifestyle factors from a single free-text description.",
      },
      {
        question: "Does it integrate with our EHR system?",
        answer:
          "Sift outputs structured data via webhook or API. It can be mapped to HL7 FHIR resources or pushed directly into common EHR systems.",
      },
      {
        question: "What if a patient reports an emergency symptom?",
        answer:
          "Sift flags high-urgency keywords (chest pain, difficulty breathing, etc.) and can trigger immediate alerts to clinical staff.",
      },
      {
        question: "Do patients need to use medical terminology?",
        answer:
          "Not at all. Sift understands everyday language. A patient can say 'my sugar medicine' and Sift will flag it as a likely diabetes medication for clinical review.",
      },
    ],
    relatedTemplates: ["medical-intake", "symptom-checker", "appointment-request"],
    relatedUseCases: ["appointment-booking", "insurance-claims", "client-intake"],
  },

  // ---------------------------------------------------------------------------
  // 5. Bug Reporting
  // ---------------------------------------------------------------------------
  {
    slug: "bug-reporting",
    name: "Bug Reporting",
    headline: "Extract reproducible bug reports from user descriptions automatically",
    description:
      "Sift parses free-text bug reports to extract steps to reproduce, expected vs actual behaviour, environment details, and severity so dev teams can fix faster.",
    problem:
      "Users report bugs in vague, inconsistent ways. 'It doesn't work' tells your engineering team nothing. PMs spend hours triaging, asking for reproduction steps, and manually filling in Jira fields. Real bugs hide in the noise.",
    solution:
      "Sift analyses the user's natural-language description and extracts structured bug data: steps to reproduce, expected vs actual behaviour, browser/OS, severity, and affected feature area. Engineers get actionable tickets from day one.",
    exampleInput:
      "When I try to export my report as PDF on Chrome (Mac), it just spins forever and then shows a blank page. This worked fine last week. I'm on the Pro plan. It's blocking me from sending the Q1 report to my board.",
    exampleOutput: [
      { label: "Issue", value: "PDF export — infinite loading, blank output", confidence: 0.97 },
      { label: "Environment", value: "Chrome on macOS", confidence: 0.95 },
      { label: "Regression", value: "Yes — worked previously", confidence: 0.92 },
      { label: "Severity", value: "High — blocking business-critical workflow", confidence: 0.94 },
      { label: "Affected Feature", value: "Report export (PDF)", confidence: 0.98 },
    ],
    benefits: [
      {
        title: "Actionable tickets instantly",
        description:
          "Engineers receive structured reproduction steps and environment details without waiting for PM follow-up.",
      },
      {
        title: "Severity auto-classification",
        description:
          "Business-impact language triggers higher severity scores, ensuring critical bugs surface immediately.",
      },
      {
        title: "Regression detection",
        description:
          "Sift identifies when users mention something 'used to work,' flagging potential regressions for immediate attention.",
      },
      {
        title: "Reduced duplicate reports",
        description:
          "Structured extraction enables automatic matching against existing tickets, cutting duplicate filings significantly.",
      },
    ],
    roiStats: [
      {
        metric: "Triage time",
        value: "80% reduction",
        description: "Structured extraction eliminates the manual back-and-forth to gather reproduction details.",
      },
      {
        metric: "Bug resolution speed",
        value: "2x faster",
        description: "Engineers start debugging immediately with environment details and repro steps in hand.",
      },
      {
        metric: "Duplicate reports",
        value: "Down 50%",
        description: "Structured data enables automatic de-duplication against the existing issue backlog.",
      },
    ],
    recommendedFields: [
      { name: "title", label: "Brief title for the issue", type: "text" },
      { name: "description", label: "What happened?", type: "textarea" },
      { name: "email", label: "Your email", type: "email" },
      { name: "url", label: "Page URL where it occurred (optional)", type: "url" },
    ],
    faqs: [
      {
        question: "Can Sift integrate with Jira or Linear?",
        answer:
          "Yes. Sift outputs structured JSON that maps directly to issue-tracker fields. Use webhooks to auto-create tickets in Jira, Linear, GitHub Issues, or any tool that accepts API input.",
      },
      {
        question: "What if the user's description is too vague?",
        answer:
          "Sift extracts what it can and flags missing critical fields (like steps to reproduce). You can configure auto-follow-up prompts to request the missing details.",
      },
      {
        question: "Does it detect duplicate bug reports?",
        answer:
          "Sift structures each report into comparable fields, making it straightforward to match against existing tickets via your issue tracker's dedup rules or a simple similarity check.",
      },
      {
        question: "Can non-technical users file useful bug reports this way?",
        answer:
          "That's the whole point. Users describe the problem naturally. Sift translates their description into the structured format your engineering team needs.",
      },
      {
        question: "How does severity classification work?",
        answer:
          "Sift analyses business-impact language ('blocking me', 'can't access', 'data loss'), user tier (if provided), and affected feature criticality to assign a severity level.",
      },
    ],
    relatedTemplates: ["bug-report", "feature-request", "helpdesk-ticket"],
    relatedUseCases: ["support-tickets", "incident-reports", "complaint-handling"],
  },

  // ---------------------------------------------------------------------------
  // 6. Customer Feedback
  // ---------------------------------------------------------------------------
  {
    slug: "customer-feedback",
    name: "Customer Feedback",
    headline: "Mine actionable insights from every piece of customer feedback automatically",
    description:
      "Sift analyses free-text customer feedback to extract sentiment, feature requests, pain points, and praise so product teams can prioritise what actually matters.",
    problem:
      "Feedback pours in from forms, surveys, and reviews, but it sits in a spreadsheet nobody analyses. Product teams make gut-feel decisions because reading thousands of free-text responses is impractical. Real patterns stay buried.",
    solution:
      "Sift processes every feedback submission in real time, extracting sentiment, topic, specific feature mentions, and actionable suggestions. Product teams get a live dashboard of what customers love, hate, and want next.",
    exampleInput:
      "I love the reporting dashboard — it's the reason I upgraded to Pro. But the mobile app is painfully slow, especially loading the analytics tab. Also, would be great if I could schedule reports to send automatically every Monday morning.",
    exampleOutput: [
      { label: "Overall Sentiment", value: "Mixed — positive on desktop, negative on mobile", confidence: 0.94 },
      { label: "Praise", value: "Reporting dashboard quality (upgrade driver)", confidence: 0.96 },
      { label: "Pain Point", value: "Mobile app performance — analytics tab loading", confidence: 0.95 },
      { label: "Feature Request", value: "Scheduled/automated report delivery", confidence: 0.97 },
    ],
    benefits: [
      {
        title: "Real-time sentiment tracking",
        description:
          "See how customer sentiment shifts over time, correlated with releases, outages, or pricing changes.",
      },
      {
        title: "Feature request aggregation",
        description:
          "Automatically group and rank feature requests by frequency, so product roadmaps reflect actual demand.",
      },
      {
        title: "Pain point detection",
        description:
          "Surface recurring complaints before they become churn drivers. Fix what matters, not what's loudest.",
      },
      {
        title: "Actionable over anecdotal",
        description:
          "Replace cherry-picked customer quotes with quantified trends across your entire feedback corpus.",
      },
    ],
    roiStats: [
      {
        metric: "Feedback analysis time",
        value: "90% reduction",
        description: "AI processes thousands of submissions in seconds versus weeks of manual reading and tagging.",
      },
      {
        metric: "Feature prioritisation accuracy",
        value: "Data-driven",
        description: "Product decisions are backed by aggregated customer demand rather than gut feeling or recency bias.",
      },
      {
        metric: "Churn risk detection",
        value: "Weeks earlier",
        description: "Negative sentiment patterns surface before they appear in cancellation metrics.",
      },
    ],
    recommendedFields: [
      { name: "feedback", label: "Share your feedback", type: "textarea" },
      { name: "email", label: "Email (optional)", type: "email" },
      { name: "rating", label: "Overall rating", type: "select" },
    ],
    faqs: [
      {
        question: "How is this different from a regular survey tool?",
        answer:
          "Survey tools collect data. Sift analyses it. Instead of exporting a CSV and manually tagging responses, Sift extracts structured insights from every submission automatically.",
      },
      {
        question: "Can it handle feedback in different languages?",
        answer:
          "Yes. Sift processes feedback in all major languages and normalises the extracted insights into your configured language.",
      },
      {
        question: "What if feedback contains both positive and negative sentiments?",
        answer:
          "Sift performs aspect-level sentiment analysis. A single submission can have positive sentiment on one feature and negative on another. Both are captured separately.",
      },
      {
        question: "Can I track sentiment over time?",
        answer:
          "Yes. Each submission is timestamped and categorised. You can monitor sentiment trends by feature, topic, or customer segment over any time period.",
      },
      {
        question: "Does it work with NPS or CSAT surveys?",
        answer:
          "Absolutely. Combine Sift's free-text analysis with your numeric scores to understand not just what the score is, but why customers gave it.",
      },
    ],
    relatedTemplates: ["feedback-form", "nps-survey", "product-review"],
    relatedUseCases: ["support-tickets", "complaint-handling", "lead-capture"],
  },

  // ---------------------------------------------------------------------------
  // 7. Insurance Claims
  // ---------------------------------------------------------------------------
  {
    slug: "insurance-claims",
    name: "Insurance Claims",
    headline: "Process insurance claims in seconds instead of days of manual review",
    description:
      "Sift extracts incident details, policy data, damage assessments, and supporting evidence from free-text insurance claims to accelerate processing and reduce errors.",
    problem:
      "Claims adjusters manually review long-form incident descriptions, cross-reference policy details, and key data into multiple systems. Processing takes days, errors slip through, and claimants grow frustrated with delays.",
    solution:
      "Sift reads the claimant's incident description, extracts the event type, date, location, damage details, involved parties, and claimed amount. Adjusters receive a structured claim summary ready for review and approval.",
    exampleInput:
      "On March 15th, a pipe burst in our upstairs bathroom while we were at work. When we got home around 6pm the ceiling in the kitchen below had collapsed and there was extensive water damage to the flooring and cabinets. Policy number is HO-2847193. We've had a plumber quote £3,200 for repairs and a builder quoted £8,500 for the ceiling and kitchen. We have photos and the plumber's report.",
    exampleOutput: [
      { label: "Incident Type", value: "Water damage — burst pipe", confidence: 0.98 },
      { label: "Date of Loss", value: "March 15th", confidence: 0.99 },
      { label: "Policy Number", value: "HO-2847193", confidence: 1.0 },
      { label: "Total Claimed", value: "£11,700 (plumbing £3,200 + structural £8,500)", confidence: 0.96 },
      { label: "Supporting Evidence", value: "Photos + plumber's report (referenced)", confidence: 0.93 },
    ],
    benefits: [
      {
        title: "Faster claims processing",
        description:
          "Structured extraction cuts the initial review from hours to seconds, letting adjusters focus on decision-making.",
      },
      {
        title: "Reduced data-entry errors",
        description:
          "Automated extraction eliminates transposition mistakes on policy numbers, dates, and monetary amounts.",
      },
      {
        title: "Fraud signal detection",
        description:
          "Inconsistencies in dates, amounts, or descriptions are flagged automatically for further investigation.",
      },
      {
        title: "Better claimant experience",
        description:
          "Claimants describe the incident once in plain language instead of navigating complex claim forms.",
      },
    ],
    roiStats: [
      {
        metric: "Processing speed",
        value: "5x faster",
        description: "Initial claim intake and structuring completes in seconds versus hours of manual review.",
      },
      {
        metric: "Data-entry errors",
        value: "Down 85%",
        description: "Automated extraction of policy numbers, dates, and amounts eliminates manual transposition errors.",
      },
      {
        metric: "Claims handled per adjuster",
        value: "3x more",
        description: "Structured intake means adjusters spend time on decisions, not paperwork.",
      },
    ],
    recommendedFields: [
      { name: "policy_number", label: "Policy number", type: "text" },
      { name: "incident_description", label: "Describe what happened", type: "textarea" },
      { name: "incident_date", label: "When did this occur?", type: "date" },
      { name: "claimant_name", label: "Your full name", type: "text" },
      { name: "contact_email", label: "Email address", type: "email" },
    ],
    faqs: [
      {
        question: "Can Sift handle different types of insurance claims?",
        answer:
          "Yes. Sift works with property, auto, health, liability, and specialty claims. The extraction schema adapts to the claim type based on the incident description.",
      },
      {
        question: "Does it detect potential fraud?",
        answer:
          "Sift flags inconsistencies such as mismatched dates, unusual damage-to-claim ratios, and language patterns commonly associated with fraudulent claims. These are flagged for human review, not auto-rejected.",
      },
      {
        question: "How does it handle supporting documents?",
        answer:
          "Sift processes the text description and notes when documents are referenced. Document analysis (photos, receipts, reports) can be handled via integration with your existing document processing pipeline.",
      },
      {
        question: "Can it calculate claim reserves automatically?",
        answer:
          "Sift extracts the claimed amounts and can apply your reserve calculation rules to suggest initial reserve figures for adjuster approval.",
      },
      {
        question: "Is it compliant with insurance regulations?",
        answer:
          "Sift assists with data extraction and structuring. All claim decisions remain with licensed adjusters. The tool supports compliance by ensuring complete, consistent data capture.",
      },
    ],
    relatedTemplates: ["insurance-claim", "incident-report", "damage-assessment"],
    relatedUseCases: ["incident-reports", "complaint-handling", "expense-reports"],
  },

  // ---------------------------------------------------------------------------
  // 8. Job Applications
  // ---------------------------------------------------------------------------
  {
    slug: "job-applications",
    name: "Job Applications",
    headline: "Screen job applications in seconds without losing the human signal",
    description:
      "Sift extracts skills, experience, qualifications, and culture-fit signals from free-text job applications so hiring teams can shortlist faster and fairer.",
    problem:
      "Recruiters drown in applications. Each one requires manual reading, skill matching against the job spec, and data entry into the ATS. Top candidates slip through when volume overwhelms capacity. Unconscious bias creeps into manual screening.",
    solution:
      "Sift parses each application's free-text cover letter or response, extracts relevant skills, years of experience, qualifications, and standout factors, then scores the application against your job requirements. Recruiters review ranked shortlists, not piles.",
    exampleInput:
      "I'm a senior full-stack developer with 7 years of experience, primarily in React and Node.js. Led a team of 4 at my current role at a Series B fintech startup. I've shipped two products from zero to 50K MAU. Looking for a role where I can move into engineering management. Available to start in 4 weeks. Based in Manchester but happy to relocate.",
    exampleOutput: [
      { label: "Experience", value: "7 years — Senior Full-Stack Developer", confidence: 0.98 },
      { label: "Key Skills", value: "React, Node.js, team leadership, 0-to-1 product builds", confidence: 0.96 },
      { label: "Leadership", value: "Led team of 4, seeking management track", confidence: 0.95 },
      { label: "Availability", value: "4 weeks notice", confidence: 0.99 },
      { label: "Location", value: "Manchester, open to relocation", confidence: 0.97 },
    ],
    benefits: [
      {
        title: "10x faster screening",
        description:
          "Structured extraction and scoring replaces manual reading. A 200-application pile becomes a ranked shortlist in minutes.",
      },
      {
        title: "Consistent evaluation",
        description:
          "Every application is scored against the same criteria. No variation based on which recruiter reviews it or when.",
      },
      {
        title: "Surface hidden talent",
        description:
          "Career changers and non-traditional backgrounds get fair evaluation based on actual skills, not just keyword matching.",
      },
      {
        title: "ATS-ready output",
        description:
          "Extracted data maps directly to ATS fields, eliminating manual data entry for every applicant.",
      },
    ],
    roiStats: [
      {
        metric: "Screening time per role",
        value: "85% reduction",
        description: "AI-scored shortlists replace manual reading of every application cover letter and CV summary.",
      },
      {
        metric: "Qualified candidates surfaced",
        value: "40% more",
        description: "Structured analysis catches strong candidates that keyword-only screening would miss.",
      },
      {
        metric: "Time to first interview",
        value: "3 days faster",
        description: "Ranked shortlists enable same-day outreach to top candidates instead of week-long screening cycles.",
      },
    ],
    recommendedFields: [
      { name: "name", label: "Full name", type: "text" },
      { name: "email", label: "Email address", type: "email" },
      { name: "application", label: "Tell us about yourself and why you're interested", type: "textarea" },
      { name: "linkedin", label: "LinkedIn profile (optional)", type: "url" },
      { name: "availability", label: "When could you start?", type: "text" },
    ],
    faqs: [
      {
        question: "Does this introduce AI bias into hiring?",
        answer:
          "Sift extracts factual data (skills, experience, qualifications) and scores against your defined criteria. It does not evaluate names, demographics, or protected characteristics. It is more consistent than human screening, though we recommend human review of all shortlisted candidates.",
      },
      {
        question: "Can I customise the scoring criteria per role?",
        answer:
          "Yes. Each job listing can have its own extraction schema and scoring weights. A frontend role weights React experience differently than a backend role weights distributed systems.",
      },
      {
        question: "Does it replace recruiters?",
        answer:
          "No. It replaces the hours of reading and data entry. Recruiters spend their time on relationship-building and interviews instead of screening.",
      },
      {
        question: "Can it process CV/resume uploads alongside the text?",
        answer:
          "Sift focuses on text-based extraction. For document processing, integrate Sift alongside your existing resume parser to get the best of both.",
      },
      {
        question: "How does it handle candidates who undersell themselves?",
        answer:
          "Sift extracts factual claims (years of experience, technologies used, team size led) rather than relying on confident language. Modest candidates with strong facts score accurately.",
      },
    ],
    relatedTemplates: ["job-application", "screening-questionnaire", "referral-form"],
    relatedUseCases: ["client-intake", "lead-capture", "incident-reports"],
  },

  // ---------------------------------------------------------------------------
  // 9. Quote Requests
  // ---------------------------------------------------------------------------
  {
    slug: "quote-requests",
    name: "Quote Requests",
    headline: "Turn vague quote requests into scoped, priceable specifications instantly",
    description:
      "Sift extracts project scope, quantities, materials, timelines, and special requirements from free-text quote requests so you can respond with accurate estimates faster.",
    problem:
      "Quote requests arrive as unstructured emails or form messages. Sales teams spend hours asking follow-up questions to understand scope before they can even begin pricing. Slow responses lose deals to faster competitors.",
    solution:
      "Sift parses the request, extracts every specification detail the prospect mentioned — quantities, dimensions, materials, delivery timelines, custom requirements — and structures it into a quotable specification. Your team prices it the same hour.",
    exampleInput:
      "We need 500 custom branded tote bags for our company retreat in September. Canvas material, screen-printed with our logo on both sides, in navy blue with white text. Would need them delivered to our Manchester office by August 20th. Can you also quote for 200 matching water bottles?",
    exampleOutput: [
      { label: "Item 1", value: "500x canvas tote bags, navy, screen-printed logo (both sides)", confidence: 0.97 },
      { label: "Item 2", value: "200x branded water bottles (matching design)", confidence: 0.95 },
      { label: "Delivery Deadline", value: "August 20th", confidence: 0.99 },
      { label: "Delivery Location", value: "Manchester office", confidence: 0.98 },
      { label: "Event Date", value: "September (company retreat)", confidence: 0.94 },
    ],
    benefits: [
      {
        title: "Quote in hours, not days",
        description:
          "Structured specs eliminate the back-and-forth clarification cycle. Your team can price the request the same day it arrives.",
      },
      {
        title: "Nothing gets missed",
        description:
          "AI extraction catches every detail — quantities, materials, colours, delivery requirements — even when buried in rambling text.",
      },
      {
        title: "Win more deals on speed",
        description:
          "The first accurate quote often wins. Faster turnaround means fewer prospects shopping elsewhere while waiting.",
      },
      {
        title: "Standardised quote input",
        description:
          "Regardless of how the prospect writes, your quoting team receives a consistent, complete specification format.",
      },
    ],
    roiStats: [
      {
        metric: "Quote turnaround",
        value: "Same-day",
        description: "Structured extraction eliminates the clarification phase, enabling same-day quote responses.",
      },
      {
        metric: "Win rate",
        value: "Up 35%",
        description: "Faster, more accurate quotes outpace competitors who take days to respond.",
      },
      {
        metric: "Follow-up emails",
        value: "Down 60%",
        description: "Complete extraction from the initial request means fewer rounds of clarification questions.",
      },
    ],
    recommendedFields: [
      { name: "name", label: "Your name", type: "text" },
      { name: "email", label: "Email address", type: "email" },
      { name: "company", label: "Company name", type: "text" },
      { name: "request", label: "Describe what you need quoted", type: "textarea" },
      { name: "deadline", label: "When do you need this by?", type: "date" },
    ],
    faqs: [
      {
        question: "What if the request is too vague to quote?",
        answer:
          "Sift extracts what it can and flags missing critical details. It generates a targeted follow-up checklist so your team asks for exactly what's missing, not generic questions.",
      },
      {
        question: "Can it handle multi-line-item requests?",
        answer:
          "Yes. Sift identifies individual items within a single description and structures each with its own specifications, quantities, and requirements.",
      },
      {
        question: "Does it integrate with our quoting software?",
        answer:
          "Sift outputs structured JSON via webhook. Map the extracted fields to your quoting tool, ERP, or CRM to auto-populate draft quotes.",
      },
      {
        question: "What industries is this useful for?",
        answer:
          "Any business that receives quote requests: manufacturing, print shops, agencies, construction, logistics, custom products, event services, and more.",
      },
      {
        question: "Can it suggest pricing based on past quotes?",
        answer:
          "Sift focuses on extraction and structuring. However, the structured output makes it straightforward to build pricing automation on top — match against your historical quote database for suggested pricing.",
      },
    ],
    relatedTemplates: ["quote-request", "rfp-response", "project-brief"],
    relatedUseCases: ["lead-capture", "client-intake", "order-intake"],
  },

  // ---------------------------------------------------------------------------
  // 10. Complaint Handling
  // ---------------------------------------------------------------------------
  {
    slug: "complaint-handling",
    name: "Complaint Handling",
    headline: "Resolve complaints faster by understanding them the moment they arrive",
    description:
      "Sift analyses customer complaints to extract the core issue, severity, desired resolution, and emotional tone so your team can respond with precision and empathy.",
    problem:
      "Complaints arrive as emotional, unstructured messages. Agents spend time interpreting what actually happened, what the customer wants, and how urgent it is. Slow resolution escalates frustration and drives churn.",
    solution:
      "Sift reads the complaint, separates the factual issue from the emotional context, identifies what resolution the customer is seeking, and flags the severity level. Your team responds to the right problem with the right tone from the first message.",
    exampleInput:
      "I'm absolutely livid. I ordered a birthday cake for my daughter's party on Saturday and it arrived a day late, completely squashed, and it was chocolate when I specifically ordered vanilla. I've spent £85 on a cake nobody could eat. I want a full refund AND a replacement delivered by this weekend or I'm going to every review site I can find.",
    exampleOutput: [
      { label: "Issues", value: "Late delivery, damaged product, wrong flavour (chocolate vs vanilla)", confidence: 0.98 },
      { label: "Financial Impact", value: "£85 — total loss", confidence: 0.97 },
      { label: "Desired Resolution", value: "Full refund AND replacement by this weekend", confidence: 0.96 },
      { label: "Severity", value: "Critical — churn + public review threat", confidence: 0.95 },
      { label: "Emotional Tone", value: "Angry, frustrated, escalation-ready", confidence: 0.94 },
    ],
    benefits: [
      {
        title: "Understand before you respond",
        description:
          "Agents see the structured breakdown — what went wrong, what the customer wants, and how they feel — before typing a single word.",
      },
      {
        title: "Escalation prevention",
        description:
          "High-severity complaints with public review or legal threats are flagged immediately for senior team intervention.",
      },
      {
        title: "Faster resolution cycles",
        description:
          "Clear issue identification means agents resolve the right problem first time instead of going back and forth.",
      },
      {
        title: "Pattern detection",
        description:
          "Aggregated complaint data reveals systemic issues (delivery partner, product defects, billing errors) before they become crises.",
      },
    ],
    roiStats: [
      {
        metric: "Resolution time",
        value: "50% faster",
        description: "Structured issue extraction eliminates the interpretation phase, letting agents act immediately.",
      },
      {
        metric: "Escalation rate",
        value: "Down 40%",
        description: "First-contact accuracy improves when agents understand the full picture before responding.",
      },
      {
        metric: "Customer retention",
        value: "Up 25%",
        description: "Faster, more empathetic resolution converts angry customers into loyal ones.",
      },
    ],
    recommendedFields: [
      { name: "name", label: "Your name", type: "text" },
      { name: "email", label: "Email address", type: "email" },
      { name: "order_ref", label: "Order or reference number (if applicable)", type: "text" },
      { name: "complaint", label: "Tell us what happened", type: "textarea" },
    ],
    faqs: [
      {
        question: "How does Sift determine complaint severity?",
        answer:
          "Sift analyses language intensity, financial impact, mentions of legal action or public reviews, repeat complaint indicators, and business-critical keywords to assign severity levels.",
      },
      {
        question: "Can it suggest resolutions?",
        answer:
          "Sift extracts what the customer is asking for. You can configure resolution policies (e.g., auto-approve refunds under a certain amount) to suggest or even automate responses.",
      },
      {
        question: "Does it work for B2B complaints?",
        answer:
          "Yes. B2B complaints often involve contract references, SLA breaches, and escalation chains. Sift extracts all of these from the complaint text.",
      },
      {
        question: "Can I track complaint trends over time?",
        answer:
          "Yes. Each complaint is categorised and timestamped. You can monitor issue types, severity trends, and resolution outcomes across any time period.",
      },
      {
        question: "What if a complaint contains multiple issues?",
        answer:
          "Sift identifies and separates each distinct issue within a single complaint, ensuring none are overlooked in the resolution process.",
      },
    ],
    relatedTemplates: ["complaint-form", "feedback-form", "helpdesk-ticket"],
    relatedUseCases: ["support-tickets", "customer-feedback", "incident-reports"],
  },

  // ---------------------------------------------------------------------------
  // 11. Appointment Booking
  // ---------------------------------------------------------------------------
  {
    slug: "appointment-booking",
    name: "Appointment Booking",
    headline: "Let clients book appointments by describing what they need, not navigating a calendar widget",
    description:
      "Sift extracts appointment type, preferred times, service requirements, and special needs from free-text booking requests so your scheduling team can confirm instantly.",
    problem:
      "Calendar widgets force clients into rigid time slots without understanding what they need. Clients book the wrong appointment type, forget to mention accessibility needs, or abandon the process when their preferred time isn't shown. Phone bookings waste admin time.",
    solution:
      "Sift lets clients describe what they need in plain language — the service, their preferences, constraints, and special requirements. The AI extracts everything into a structured booking request your team can confirm or adjust with one click.",
    exampleInput:
      "I need to book a 90-minute deep tissue massage, preferably with Sarah if she's available. Any afternoon slot next week works, but not Wednesday — I have a meeting until 3pm on other days so 3:30pm onwards would be ideal. I have a lower back injury so please note that.",
    exampleOutput: [
      { label: "Service", value: "Deep tissue massage, 90 minutes", confidence: 0.99 },
      { label: "Therapist Preference", value: "Sarah", confidence: 0.97 },
      { label: "Preferred Times", value: "Next week, afternoons 3:30pm+, not Wednesday", confidence: 0.95 },
      { label: "Medical Note", value: "Lower back injury — requires therapist awareness", confidence: 0.96 },
    ],
    benefits: [
      {
        title: "Natural language booking",
        description:
          "Clients describe their needs conversationally instead of clicking through rigid form fields and calendar grids.",
      },
      {
        title: "Capture what calendars miss",
        description:
          "Special requirements, provider preferences, and medical notes are extracted from the same request. No separate forms.",
      },
      {
        title: "Higher booking completion",
        description:
          "Free-text forms have dramatically lower abandonment than multi-step calendar widgets, especially on mobile.",
      },
      {
        title: "Reduced phone calls",
        description:
          "Clients who would have phoned for complex bookings can now describe everything in the form. Your admin team confirms instead of transcribes.",
      },
    ],
    roiStats: [
      {
        metric: "Booking completion rate",
        value: "Up 45%",
        description: "Free-text booking eliminates the friction that causes abandonment in traditional calendar widgets.",
      },
      {
        metric: "Admin phone time",
        value: "Down 60%",
        description: "Complex bookings that previously required a phone call are now handled via the form.",
      },
      {
        metric: "No-show rate",
        value: "Down 20%",
        description: "Better upfront matching of service, provider, and time preferences leads to fewer cancellations.",
      },
    ],
    recommendedFields: [
      { name: "name", label: "Your name", type: "text" },
      { name: "email", label: "Email address", type: "email" },
      { name: "phone", label: "Phone number", type: "tel" },
      { name: "booking_request", label: "What would you like to book?", type: "textarea" },
    ],
    faqs: [
      {
        question: "Can it check live availability?",
        answer:
          "Sift extracts the booking request. For live availability checking, integrate Sift's structured output with your calendar/scheduling system via webhook to auto-match open slots.",
      },
      {
        question: "What if the client's preferred time isn't available?",
        answer:
          "Sift structures the request with primary and fallback preferences. Your team or automated system can suggest alternatives based on the extracted constraints.",
      },
      {
        question: "Does it handle recurring appointments?",
        answer:
          "Yes. If a client mentions 'every Tuesday' or 'weekly for 6 weeks', Sift extracts the recurrence pattern for your scheduling system.",
      },
      {
        question: "Can it handle group bookings?",
        answer:
          "Yes. Sift identifies party size, multiple service types, and coordinated timing requirements from a single request.",
      },
      {
        question: "What industries use this?",
        answer:
          "Salons, clinics, consultancies, repair services, fitness studios, restaurants — any business that books appointments and wants to reduce phone traffic.",
      },
    ],
    relatedTemplates: ["appointment-request", "consultation-booking", "service-booking"],
    relatedUseCases: ["patient-intake", "client-intake", "quote-requests"],
  },

  // ---------------------------------------------------------------------------
  // 12. Order Intake
  // ---------------------------------------------------------------------------
  {
    slug: "order-intake",
    name: "Order Intake",
    headline: "Accept complex orders from a single text field and get every detail right",
    description:
      "Sift extracts items, quantities, specifications, delivery requirements, and special instructions from free-text orders so your fulfilment team processes them error-free.",
    problem:
      "Complex orders with custom specifications, mixed quantities, and special instructions get mangled in rigid form fields. Customers leave out details, order the wrong SKU, or abandon the form entirely. Staff spend time on the phone clarifying.",
    solution:
      "Sift lets customers describe their entire order naturally. The AI parses every line item, specification, quantity, delivery requirement, and special instruction into a structured order ready for fulfilment. No more phone clarifications.",
    exampleInput:
      "We need to order supplies for our new office fit-out: 25 ergonomic desk chairs in charcoal grey, 25 height-adjustable desks (140cm width), 10 meeting room chairs in the same charcoal, and 5 round meeting tables (120cm diameter). Delivery to Unit 4, Riverside Business Park, Leeds LS1 4AP. Need everything by March 1st. Please use the goods lift at the back — main entrance is too narrow for the desks.",
    exampleOutput: [
      { label: "Item 1", value: "25x ergonomic desk chairs, charcoal grey", confidence: 0.98 },
      { label: "Item 2", value: "25x height-adjustable desks, 140cm width", confidence: 0.97 },
      { label: "Item 3", value: "10x meeting room chairs, charcoal grey", confidence: 0.97 },
      { label: "Item 4", value: "5x round meeting tables, 120cm diameter", confidence: 0.96 },
      { label: "Delivery", value: "Unit 4, Riverside Business Park, Leeds LS1 4AP — goods lift at rear", confidence: 0.95 },
      { label: "Deadline", value: "March 1st", confidence: 0.99 },
    ],
    benefits: [
      {
        title: "Multi-item orders, one text field",
        description:
          "Customers describe complex, multi-item orders naturally. Sift separates each line item with its own specs and quantities.",
      },
      {
        title: "Delivery intelligence",
        description:
          "Access instructions, loading dock details, and delivery windows are extracted alongside the order itself.",
      },
      {
        title: "Zero-error fulfilment",
        description:
          "Structured extraction catches every specification — colour, size, material, quantity — reducing fulfilment errors.",
      },
      {
        title: "Faster order-to-fulfilment",
        description:
          "No clarification cycle. Orders go straight from submission to processing with complete specifications.",
      },
    ],
    roiStats: [
      {
        metric: "Order accuracy",
        value: "98%+",
        description: "AI extraction captures specifications that customers often miss in dropdown-based order forms.",
      },
      {
        metric: "Order processing time",
        value: "70% faster",
        description: "Complete structured orders eliminate the back-and-forth clarification cycle.",
      },
      {
        metric: "Cart abandonment",
        value: "Down 40%",
        description: "Free-text ordering removes the friction that causes customers to abandon complex order forms.",
      },
    ],
    recommendedFields: [
      { name: "company", label: "Company name", type: "text" },
      { name: "contact", label: "Contact name", type: "text" },
      { name: "email", label: "Email address", type: "email" },
      { name: "order", label: "Describe your order", type: "textarea" },
      { name: "delivery_address", label: "Delivery address", type: "textarea" },
    ],
    faqs: [
      {
        question: "Can it handle orders with custom specifications?",
        answer:
          "Yes. Sift extracts dimensions, colours, materials, finishes, and any other specifications mentioned in the text. Custom details are structured alongside standard fields.",
      },
      {
        question: "What if a customer orders something you don't stock?",
        answer:
          "Sift extracts the request as-is. Your team or automated system can flag unrecognised items and suggest alternatives.",
      },
      {
        question: "Does it integrate with inventory systems?",
        answer:
          "Sift outputs structured JSON via webhook. Connect it to your ERP, inventory management, or fulfilment system to auto-check stock and generate pick lists.",
      },
      {
        question: "Can it calculate order totals?",
        answer:
          "Sift extracts items and quantities. Pricing can be applied downstream by matching extracted items against your product catalogue and price list.",
      },
      {
        question: "What about recurring orders?",
        answer:
          "If a customer mentions recurring delivery (weekly, monthly, etc.), Sift extracts the schedule. Your system can then set up automated reorders.",
      },
    ],
    relatedTemplates: ["order-form", "purchase-request", "wholesale-inquiry"],
    relatedUseCases: ["quote-requests", "maintenance-requests", "expense-reports"],
  },

  // ---------------------------------------------------------------------------
  // 13. Incident Reports
  // ---------------------------------------------------------------------------
  {
    slug: "incident-reports",
    name: "Incident Reports",
    headline: "Capture complete incident reports from the field in real time",
    description:
      "Sift extracts incident type, location, people involved, timeline, severity, and corrective actions from free-text incident reports for compliance and rapid response.",
    problem:
      "Incident reports are filed hours or days after the event on cumbersome paper forms. Critical details are forgotten, timelines are vague, and compliance teams chase staff for missing information. Reporting fatigue leads to underreporting.",
    solution:
      "Sift lets field staff describe what happened in their own words, immediately. The AI extracts the incident type, exact timeline, location, people involved, injuries, root cause indicators, and suggested corrective actions. Compliance teams get complete, structured reports in real time.",
    exampleInput:
      "At around 2:15pm today on the warehouse floor near bay 7, a forklift operated by James Chen clipped a stack of pallets while reversing. The pallets fell and one struck a nearby worker, Maria Gonzalez, on her left shoulder. She was conscious and could move her arm but was in pain. First aid was administered on site and she was sent to A&E as a precaution. The area was cordoned off. I believe the reversing alarm on the forklift wasn't functioning.",
    exampleOutput: [
      { label: "Incident Type", value: "Workplace injury — forklift/pallet collision", confidence: 0.97 },
      { label: "Time & Location", value: "~2:15 PM, warehouse floor near bay 7", confidence: 0.96 },
      { label: "People Involved", value: "James Chen (forklift operator), Maria Gonzalez (injured)", confidence: 0.98 },
      { label: "Injury", value: "Left shoulder impact — conscious, mobile, sent to A&E", confidence: 0.95 },
      { label: "Root Cause Signal", value: "Forklift reversing alarm not functioning", confidence: 0.93 },
      { label: "Immediate Actions", value: "First aid on site, area cordoned off, A&E referral", confidence: 0.96 },
    ],
    benefits: [
      {
        title: "Real-time reporting from the field",
        description:
          "Staff can file a report by typing or dictating what happened immediately. No waiting for paperwork, no forgotten details.",
      },
      {
        title: "Compliance-ready structure",
        description:
          "Every report automatically contains the fields regulators require: who, what, when, where, injuries, and corrective actions.",
      },
      {
        title: "Root cause extraction",
        description:
          "Sift identifies equipment failures, process gaps, and environmental factors mentioned in the description.",
      },
      {
        title: "Trend analysis",
        description:
          "Structured incident data enables pattern detection across locations, shifts, and incident types to prevent recurrence.",
      },
    ],
    roiStats: [
      {
        metric: "Reporting compliance",
        value: "Up 60%",
        description: "Lower friction means more incidents are reported, giving you a more accurate safety picture.",
      },
      {
        metric: "Report completeness",
        value: "95%+",
        description: "AI extraction captures details that are typically missing from hastily completed paper forms.",
      },
      {
        metric: "Response time",
        value: "Real-time",
        description: "Incidents are structured and routed immediately, not at the end of a shift or the next day.",
      },
    ],
    recommendedFields: [
      { name: "reporter_name", label: "Your name", type: "text" },
      { name: "incident_description", label: "Describe what happened", type: "textarea" },
      { name: "location", label: "Where did it happen?", type: "text" },
      { name: "date_time", label: "When did it happen?", type: "datetime-local" },
      { name: "email", label: "Your email", type: "email" },
    ],
    faqs: [
      {
        question: "Does this meet OSHA/HSE reporting requirements?",
        answer:
          "Sift structures reports with the fields required by major regulatory frameworks. Your compliance team should verify the output meets your specific jurisdiction's requirements.",
      },
      {
        question: "Can field staff use voice-to-text to file reports?",
        answer:
          "Yes. Staff can dictate their report using their phone's speech-to-text, and Sift processes the transcription the same as typed input.",
      },
      {
        question: "How does it handle near-miss reporting?",
        answer:
          "Near-misses follow the same flow. Sift identifies whether injury occurred and classifies the report accordingly. Near-miss reporting is essential for prevention and Sift makes it frictionless.",
      },
      {
        question: "Can I configure automatic escalation for severe incidents?",
        answer:
          "Yes. Set severity thresholds that trigger immediate notifications to safety officers, management, or external authorities.",
      },
      {
        question: "Does it support photo or video attachments?",
        answer:
          "Sift processes the text description. Photo and video uploads can be handled via your form's standard file upload fields alongside the AI-processed text.",
      },
    ],
    relatedTemplates: ["incident-report", "safety-report", "near-miss-form"],
    relatedUseCases: ["bug-reporting", "complaint-handling", "insurance-claims"],
  },

  // ---------------------------------------------------------------------------
  // 14. Expense Reports
  // ---------------------------------------------------------------------------
  {
    slug: "expense-reports",
    name: "Expense Reports",
    headline: "Submit expenses by describing the trip, not filling in a spreadsheet",
    description:
      "Sift extracts individual expenses, amounts, categories, dates, and business justifications from free-text expense descriptions so finance teams can process reimbursements faster.",
    problem:
      "Employees hate expense reports. They hoard receipts, forget details, and either procrastinate or submit incomplete forms. Finance teams chase missing information and manually categorise every line item. The whole process wastes everyone's time.",
    solution:
      "Sift lets employees describe their expenses naturally: 'Had dinner with the client team, £85 at Dishoom. Grabbed an Uber there and back, about £30 total. Also paid for parking at the office on Tuesday, £12.' The AI extracts every expense with amount, category, date, and purpose.",
    exampleInput:
      "London client trip last Tuesday. Train from Manchester to Euston, £67 return. Grabbed a coffee at Pret before the meeting, £4.50. Lunch with the client at Hawksmoor, £95 — she's the procurement lead for the Q2 deal. Uber back to Euston, £18. Also need to claim the hotel from Monday night, Premier Inn Kings Cross, £129.",
    exampleOutput: [
      { label: "Expense 1", value: "Train Manchester-London return, £67.00 — Travel", confidence: 0.98 },
      { label: "Expense 2", value: "Coffee (Pret), £4.50 — Meals & Subsistence", confidence: 0.96 },
      { label: "Expense 3", value: "Client lunch (Hawksmoor), £95.00 — Client Entertainment", confidence: 0.97 },
      { label: "Expense 4", value: "Uber to Euston, £18.00 — Travel", confidence: 0.95 },
      { label: "Expense 5", value: "Hotel (Premier Inn Kings Cross), £129.00 — Accommodation", confidence: 0.98 },
      { label: "Total", value: "£313.50", confidence: 0.99 },
    ],
    benefits: [
      {
        title: "Natural language expense filing",
        description:
          "Employees describe their trip in a paragraph. Sift turns it into a categorised expense report with line items.",
      },
      {
        title: "Automatic categorisation",
        description:
          "Every expense is tagged to the correct category (travel, meals, accommodation, client entertainment) without manual selection.",
      },
      {
        title: "Business justification captured",
        description:
          "Context like 'lunch with procurement lead for Q2 deal' is extracted as the business purpose, satisfying audit requirements.",
      },
      {
        title: "Higher compliance, lower friction",
        description:
          "Employees actually submit expenses on time when the process is a single text field instead of a spreadsheet.",
      },
    ],
    roiStats: [
      {
        metric: "Submission time",
        value: "80% faster",
        description: "A paragraph takes two minutes. A traditional expense form takes 20-30 minutes per trip.",
      },
      {
        metric: "On-time submissions",
        value: "Up 70%",
        description: "Lower friction means employees stop procrastinating and submit expenses promptly.",
      },
      {
        metric: "Finance processing time",
        value: "60% reduction",
        description: "Pre-categorised, structured reports require less manual review and fewer follow-up queries.",
      },
    ],
    recommendedFields: [
      { name: "employee_name", label: "Your name", type: "text" },
      { name: "email", label: "Email address", type: "email" },
      { name: "department", label: "Department", type: "text" },
      { name: "expenses", label: "Describe your expenses", type: "textarea" },
      { name: "trip_dates", label: "Trip dates", type: "text" },
    ],
    faqs: [
      {
        question: "Can it handle multiple currencies?",
        answer:
          "Yes. Sift detects and tags the currency for each expense. It can also apply conversion rates if you configure your base currency.",
      },
      {
        question: "Do employees still need to attach receipts?",
        answer:
          "Receipt requirements depend on your company policy. Sift handles the text extraction; receipts can be attached as files alongside the form submission.",
      },
      {
        question: "How does it categorise expenses?",
        answer:
          "Sift uses context (restaurant names, transport providers, hotel mentions) and your configured category taxonomy to classify each expense automatically.",
      },
      {
        question: "Can it flag policy violations?",
        answer:
          "Yes. Configure spending limits per category and Sift flags any expense that exceeds thresholds (e.g., meal over £50 per person) for manager review.",
      },
      {
        question: "Does it integrate with accounting software?",
        answer:
          "Sift outputs structured JSON that maps to standard expense categories. Push to Xero, QuickBooks, SAP, or any system via webhook.",
      },
    ],
    relatedTemplates: ["expense-report", "travel-request", "reimbursement-form"],
    relatedUseCases: ["order-intake", "incident-reports", "insurance-claims"],
  },

  // ---------------------------------------------------------------------------
  // 15. Maintenance Requests
  // ---------------------------------------------------------------------------
  {
    slug: "maintenance-requests",
    name: "Maintenance Requests",
    headline: "Turn tenant and occupant maintenance requests into dispatched work orders instantly",
    description:
      "Sift extracts the issue type, location, urgency, access instructions, and tenant details from free-text maintenance requests so facilities teams can dispatch repairs faster.",
    problem:
      "Tenants and building occupants report maintenance issues via phone, email, or vague form submissions. Facilities teams manually triage, categorise, and assign each one. Urgent issues like leaks or heating failures get lost in the queue alongside lightbulb requests.",
    solution:
      "Sift parses the maintenance request, identifies the issue type, specific location, urgency level, access requirements, and preferred scheduling. Facilities managers receive structured work orders ready for dispatch to the right trade.",
    exampleInput:
      "The radiator in flat 4B has been making a loud banging noise for three days and now it's leaking onto the carpet. It's getting worse — there's a visible wet patch about 2 feet across now. I work from home on Mondays and Fridays so those would be best for access. The building code for the main entrance is 4721#.",
    exampleOutput: [
      { label: "Issue", value: "Radiator — banging noise + active leak onto carpet", confidence: 0.98 },
      { label: "Location", value: "Flat 4B", confidence: 0.99 },
      { label: "Urgency", value: "High — active leak, spreading water damage", confidence: 0.96 },
      { label: "Trade Required", value: "Plumber / Heating Engineer", confidence: 0.94 },
      { label: "Access", value: "Monday or Friday preferred, building code 4721#", confidence: 0.97 },
      { label: "Duration", value: "3 days and worsening", confidence: 0.93 },
    ],
    benefits: [
      {
        title: "Priority-based dispatch",
        description:
          "Active leaks, heating failures, and safety hazards are flagged as urgent and dispatched immediately. Cosmetic issues queue normally.",
      },
      {
        title: "Right trade, first time",
        description:
          "Sift identifies whether the job needs a plumber, electrician, locksmith, or general maintenance, reducing mis-dispatches.",
      },
      {
        title: "Access details captured upfront",
        description:
          "Building codes, available times, and access instructions are extracted from the initial request. No follow-up calls needed.",
      },
      {
        title: "Tenant satisfaction",
        description:
          "Tenants describe the issue once and see it actioned quickly. No more feeling like their request disappeared into a void.",
      },
    ],
    roiStats: [
      {
        metric: "Dispatch time",
        value: "75% faster",
        description: "Structured work orders go straight to the correct trade, eliminating the manual triage bottleneck.",
      },
      {
        metric: "First-visit fix rate",
        value: "Up 30%",
        description: "Better issue descriptions mean technicians arrive with the right parts and expectations.",
      },
      {
        metric: "Admin calls",
        value: "Down 50%",
        description: "Access details and scheduling preferences captured in the initial form eliminate follow-up phone calls.",
      },
    ],
    recommendedFields: [
      { name: "tenant_name", label: "Your name", type: "text" },
      { name: "unit", label: "Unit / flat number", type: "text" },
      { name: "email", label: "Email address", type: "email" },
      { name: "phone", label: "Phone number", type: "tel" },
      { name: "issue", label: "Describe the issue", type: "textarea" },
    ],
    faqs: [
      {
        question: "Can it handle emergency vs routine requests differently?",
        answer:
          "Yes. Sift detects emergency keywords (flooding, gas smell, no heating in winter, security breach) and flags them for immediate dispatch. Routine requests follow standard priority queuing.",
      },
      {
        question: "Does it integrate with property management software?",
        answer:
          "Sift outputs structured JSON via webhook. Connect it to Buildium, AppFolio, Fixflo, or any PM system that accepts API input to auto-create work orders.",
      },
      {
        question: "Can tenants submit via mobile?",
        answer:
          "Yes. The Sift form widget is fully responsive. Tenants can even use voice-to-text on their phone to describe the issue.",
      },
      {
        question: "How does it handle repeat issues?",
        answer:
          "When a tenant mentions a recurring problem ('this is the third time'), Sift flags it as a repeat issue. Your team can investigate root causes instead of applying another temporary fix.",
      },
      {
        question: "Can it estimate repair costs?",
        answer:
          "Sift focuses on issue extraction and classification. Cost estimation can be layered on top by matching the structured issue type against your historical repair cost data.",
      },
    ],
    relatedTemplates: ["maintenance-request", "work-order", "facility-report"],
    relatedUseCases: ["incident-reports", "complaint-handling", "order-intake"],
  },
];
