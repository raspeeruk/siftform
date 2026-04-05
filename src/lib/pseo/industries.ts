export type Industry = {
  slug: string;
  name: string;
  headline: string;
  description: string;
  painPoints: string[];
  exampleInput: string;
  exampleOutput: { label: string; value: string; confidence: number }[];
  recommendedFields: {
    name: string;
    label: string;
    type: string;
    why: string;
  }[];
  stats: { label: string; value: string }[];
  faqs: { question: string; answer: string }[];
  relatedTemplates: string[];
  relatedUseCases: string[];
};

export const industries: Industry[] = [
  // ─── 1. Law Firms ───────────────────────────────────────────────────
  {
    slug: "law-firms",
    name: "Law Firms",
    headline:
      "Stop Losing Billable Hours to Intake Paperwork",
    description:
      "Sift turns unstructured client enquiries into conflict-checked, case-ready intake records in seconds. Built for solo practitioners and Am Law 200 alike.",
    painPoints: [
      "Potential clients send rambling emails with critical dates buried mid-paragraph",
      "Conflict checks require manual re-keying of names and parties into your CMS",
      "Intake staff spend 15+ minutes per enquiry pulling out case type, jurisdiction, and deadlines",
      "Missed statute-of-limitations dates hiding in voicemail transcripts",
    ],
    exampleInput:
      "Hi, my name is Sandra Whitfield and I was injured at a Costco in Plano, Texas on March 12th. I slipped on a wet floor near the produce section and broke my left wrist. I went to Medical City Plano ER that same day. I have Blue Cross Blue Shield policy #BCB-449281. The store manager took a report but wouldn't give me a copy. My husband David witnessed the fall. I'd like to know if I have a case. My number is 469-555-0187 and email is sandra.whitfield@gmail.com.",
    exampleOutput: [
      { label: "Client Name", value: "Sandra Whitfield", confidence: 0.99 },
      { label: "Case Type", value: "Personal Injury", confidence: 0.97 },
      { label: "Incident Date", value: "2025-03-12", confidence: 0.98 },
      {
        label: "Incident Location",
        value: "Costco, Plano, TX",
        confidence: 0.96,
      },
      { label: "Injuries", value: "Broken left wrist", confidence: 0.98 },
      { label: "Opposing Party", value: "Costco", confidence: 0.92 },
      { label: "Witness", value: "David Whitfield (husband)", confidence: 0.95 },
      { label: "Phone", value: "469-555-0187", confidence: 0.99 },
    ],
    recommendedFields: [
      {
        name: "client_name",
        label: "Client Name",
        type: "text",
        why: "Required for conflict checks and matter opening",
      },
      {
        name: "case_type",
        label: "Case Type",
        type: "select",
        why: "Routes to the correct practice group automatically",
      },
      {
        name: "opposing_party",
        label: "Opposing Party",
        type: "text",
        why: "Essential for conflict-of-interest screening before any engagement",
      },
      {
        name: "incident_date",
        label: "Incident Date",
        type: "date",
        why: "Flags statute-of-limitations deadlines immediately",
      },
      {
        name: "jurisdiction",
        label: "Jurisdiction",
        type: "text",
        why: "Determines which attorneys are barred to handle the matter",
      },
      {
        name: "urgency",
        label: "Urgency",
        type: "select",
        why: "Separates emergency TROs from routine consultations in your queue",
      },
      {
        name: "email",
        label: "Email",
        type: "email",
        why: "Primary contact channel for engagement letters and follow-up",
      },
      {
        name: "summary",
        label: "Case Summary",
        type: "text",
        why: "Gives the reviewing attorney a 30-second overview before the call",
      },
    ],
    stats: [
      { label: "Average intake time reduction", value: "74%" },
      { label: "Conflict check data captured automatically", value: "98%" },
      { label: "Faster new-matter opening", value: "3.2x" },
    ],
    faqs: [
      {
        question: "Does Sift integrate with Clio or MyCase?",
        answer:
          "Sift outputs structured JSON that maps directly to Clio and MyCase contact/matter fields. Use our webhook or Zapier integration to push parsed intake data straight into your practice management system.",
      },
      {
        question: "How does Sift handle conflict-of-interest checks?",
        answer:
          "Sift extracts all party names, related entities, and opposing counsel mentions automatically. You can feed these into your existing conflict database via API, eliminating the manual re-keying that causes missed conflicts.",
      },
      {
        question: "Is client data secure and privileged?",
        answer:
          "All data is encrypted in transit (TLS 1.3) and at rest (AES-256). Sift processes text in real time and does not store raw input beyond the retention period you configure. We never use your data to train models.",
      },
      {
        question: "Can it detect statute-of-limitations deadlines?",
        answer:
          "When Sift extracts an incident date and case type, it can flag time-sensitive matters. Pair this with your calendaring system to auto-generate limitation reminders based on the jurisdiction and cause of action.",
      },
      {
        question: "What about multi-party or complex litigation intake?",
        answer:
          "Sift handles messages mentioning multiple parties, witnesses, and related entities. Each is extracted as a separate field so you can run individual conflict checks against every name in one pass.",
      },
    ],
    relatedTemplates: ["legal-intake", "lead-intake", "customer-feedback"],
    relatedUseCases: ["client-intake", "lead-capture", "complaint-handling"],
  },

  // ─── 2. Insurance ──────────────────────────────────────────────────
  {
    slug: "insurance",
    name: "Insurance",
    headline:
      "Process Claims in Seconds, Not Days",
    description:
      "Sift extracts policy numbers, incident details, and damage estimates from claimant messages instantly. Reduce first-notice-of-loss handling time by 80%.",
    painPoints: [
      "Claimants describe incidents in emotional, unstructured narratives that adjusters must decode",
      "Policy numbers and claim references are buried in attachments, subject lines, or mid-sentence",
      "First Notice of Loss forms require 20+ fields that claimants rarely fill in completely",
      "Duplicate claims slip through when names and dates are entered inconsistently",
    ],
    exampleInput:
      "I need to file a claim. Last Thursday night around 11pm there was a huge storm and a tree fell through our garage roof at 445 Birch Lane, Naperville IL 60540. The whole roof section is caved in and my wife's 2022 Honda CR-V was crushed underneath. We also lost a chest freezer full of food. Our policy number is HO-7832910-IL and our agent is Tom Brennan at the Naperville office. Please call me at 630-555-0294. - Mark Janssen",
    exampleOutput: [
      { label: "Claimant Name", value: "Mark Janssen", confidence: 0.98 },
      { label: "Policy Number", value: "HO-7832910-IL", confidence: 0.99 },
      { label: "Claim Type", value: "Home", confidence: 0.96 },
      {
        label: "Incident Date",
        value: "Last Thursday (~2025-03-27)",
        confidence: 0.88,
      },
      {
        label: "Property Address",
        value: "445 Birch Lane, Naperville, IL 60540",
        confidence: 0.99,
      },
      {
        label: "Damage Description",
        value: "Garage roof collapsed from fallen tree; 2022 Honda CR-V crushed; chest freezer and contents lost",
        confidence: 0.95,
      },
      { label: "Agent", value: "Tom Brennan, Naperville office", confidence: 0.94 },
    ],
    recommendedFields: [
      {
        name: "claimant_name",
        label: "Claimant Name",
        type: "text",
        why: "Matches the claim to the policyholder record",
      },
      {
        name: "policy_number",
        label: "Policy Number",
        type: "text",
        why: "Instant lookup against your policy admin system",
      },
      {
        name: "claim_type",
        label: "Claim Type",
        type: "select",
        why: "Routes to the correct adjusting team (auto, home, commercial)",
      },
      {
        name: "incident_date",
        label: "Incident Date",
        type: "date",
        why: "Validates coverage period and triggers timely-filing checks",
      },
      {
        name: "incident_location",
        label: "Incident Location",
        type: "text",
        why: "Cross-references weather data and validates property address",
      },
      {
        name: "estimated_damage",
        label: "Estimated Damage",
        type: "number",
        why: "Sets initial reserve and determines authority level required",
      },
      {
        name: "injuries",
        label: "Injuries Reported",
        type: "boolean",
        why: "Triggers bodily injury protocols and liability review",
      },
      {
        name: "description",
        label: "Incident Description",
        type: "text",
        why: "Gives the adjuster the full narrative without a phone call",
      },
    ],
    stats: [
      { label: "FNOL processing time reduction", value: "80%" },
      { label: "Data extraction accuracy", value: "96%" },
      { label: "Fewer follow-up calls needed per claim", value: "62%" },
    ],
    faqs: [
      {
        question: "Can Sift extract data from emailed PDFs and attachments?",
        answer:
          "Sift processes plain text and pasted content today. For PDF extraction, you can pipe document text through our API. Native attachment parsing is on the roadmap.",
      },
      {
        question: "How does Sift handle claims with incomplete information?",
        answer:
          "Each extracted field includes a confidence score. Low-confidence or missing fields are flagged so your team knows exactly what to ask in the follow-up call, cutting average handle time significantly.",
      },
      {
        question: "Does it work for commercial lines as well as personal?",
        answer:
          "Absolutely. You define the schema fields for your line of business. Commercial property, general liability, professional indemnity -- Sift adapts to whatever fields you configure.",
      },
      {
        question: "Can Sift detect potentially fraudulent claims?",
        answer:
          "Sift flags inconsistencies like mismatched dates, duplicate claimant details across submissions, and unusual damage estimates. It is not a fraud detection system, but it surfaces the signals adjusters need.",
      },
      {
        question: "What claim management systems does Sift integrate with?",
        answer:
          "Sift outputs structured JSON compatible with Guidewire, Duck Creek, and any system that accepts API or webhook input. Use our Zapier connector for no-code integrations.",
      },
    ],
    relatedTemplates: ["insurance-claim", "support-ticket", "customer-feedback"],
    relatedUseCases: ["client-intake", "complaint-handling", "support-tickets"],
  },

  // ─── 3. Healthcare ─────────────────────────────────────────────────
  {
    slug: "healthcare",
    name: "Healthcare",
    headline:
      "Turn Patient Messages into Structured Records Before the Appointment Starts",
    description:
      "Sift parses patient intake messages into structured fields -- symptoms, medications, insurance, and history -- so your clinical staff can focus on care, not data entry.",
    painPoints: [
      "Patients describe symptoms in everyday language that staff must translate into clinical terms",
      "Insurance details, medication lists, and allergies are scattered across portal messages and voicemails",
      "Front-desk staff spend 12+ minutes per patient manually entering intake data into the EHR",
      "Missed medication interactions because allergy info was buried in a free-text note",
    ],
    exampleInput:
      "Hello, I'd like to schedule an appointment. I'm James Okafor, DOB 08/14/1979. I've been having sharp chest pains on my left side for about two weeks, especially when I climb stairs. I also get short of breath. I take metoprolol 50mg and lisinopril 20mg daily for blood pressure. Allergic to penicillin and sulfa drugs. My insurance is Aetna, member ID AET-2847561, group 0042. My PCP is Dr. Reena Patel at Lakeview Medical. Best to reach me at 312-555-0198 or james.okafor@email.com.",
    exampleOutput: [
      { label: "Patient Name", value: "James Okafor", confidence: 0.99 },
      { label: "Date of Birth", value: "1979-08-14", confidence: 0.99 },
      {
        label: "Chief Complaint",
        value: "Sharp left-sided chest pain for 2 weeks, worse with exertion; shortness of breath",
        confidence: 0.96,
      },
      {
        label: "Current Medications",
        value: "Metoprolol 50mg daily, Lisinopril 20mg daily",
        confidence: 0.98,
      },
      {
        label: "Allergies",
        value: "Penicillin, Sulfa drugs",
        confidence: 0.99,
      },
      {
        label: "Insurance",
        value: "Aetna, Member ID AET-2847561, Group 0042",
        confidence: 0.98,
      },
      {
        label: "Referring Physician",
        value: "Dr. Reena Patel, Lakeview Medical",
        confidence: 0.95,
      },
    ],
    recommendedFields: [
      {
        name: "patient_name",
        label: "Patient Name",
        type: "text",
        why: "Matches the patient to their medical record number",
      },
      {
        name: "date_of_birth",
        label: "Date of Birth",
        type: "date",
        why: "Primary patient identifier alongside name for EHR lookup",
      },
      {
        name: "chief_complaint",
        label: "Chief Complaint",
        type: "text",
        why: "Drives triage priority and appointment type scheduling",
      },
      {
        name: "current_medications",
        label: "Current Medications",
        type: "text",
        why: "Critical for interaction checks and pre-visit medication reconciliation",
      },
      {
        name: "allergies",
        label: "Allergies",
        type: "text",
        why: "Patient safety -- must be captured before any treatment or prescription",
      },
      {
        name: "insurance_info",
        label: "Insurance Information",
        type: "text",
        why: "Enables eligibility verification before the appointment",
      },
      {
        name: "urgency",
        label: "Urgency",
        type: "select",
        why: "Determines same-day vs. scheduled appointment routing",
      },
      {
        name: "phone",
        label: "Phone",
        type: "phone",
        why: "For appointment confirmations and clinical call-backs",
      },
    ],
    stats: [
      { label: "Intake data entry time saved", value: "12 min/patient" },
      { label: "Pre-visit information completeness", value: "94%" },
      { label: "Reduction in registration errors", value: "67%" },
    ],
    faqs: [
      {
        question: "Is Sift HIPAA compliant?",
        answer:
          "Sift is designed with healthcare data handling in mind. Data is encrypted in transit and at rest, we offer BAA agreements, and no patient data is used for model training. Contact us for our full compliance documentation.",
      },
      {
        question: "Can Sift integrate with Epic, Cerner, or other EHR systems?",
        answer:
          "Sift outputs structured JSON that maps to FHIR-compatible fields. You can push parsed patient data into Epic, Cerner, or any EHR that accepts HL7/FHIR via API or integration engine.",
      },
      {
        question: "How does it handle medical terminology?",
        answer:
          "Sift translates patient language (e.g. 'sharp chest pains on my left side') into structured clinical fields. It does not generate diagnostic codes, but it gives your clinical team clean, organized data to work from.",
      },
      {
        question: "What about patients who provide incomplete information?",
        answer:
          "Every field includes a confidence score. Missing or ambiguous fields are flagged, so your staff can send a targeted follow-up asking only for what is missing rather than re-doing the entire intake.",
      },
      {
        question:
          "Can different departments use different intake schemas?",
        answer:
          "Yes. You can create separate schemas for primary care, specialist referrals, mental health intake, and more. Each department gets exactly the fields they need.",
      },
    ],
    relatedTemplates: ["patient-intake", "support-ticket", "customer-feedback"],
    relatedUseCases: ["patient-intake", "client-intake", "complaint-handling"],
  },

  // ─── 4. Real Estate ────────────────────────────────────────────────
  {
    slug: "real-estate",
    name: "Real Estate",
    headline:
      "Convert Every Property Enquiry into a Qualified Lead Automatically",
    description:
      "Sift parses buyer and seller enquiries into structured lead records with budget, timeline, property preferences, and contact details -- no manual data entry.",
    painPoints: [
      "Portal leads from Zillow, Realtor.com, and Redfin arrive as unstructured blobs of text",
      "Agents waste prime selling hours copy-pasting lead details into their CRM",
      "Budget, timeline, and pre-approval status are buried in casual language",
      "Hot leads go cold because it takes hours to qualify and route them",
    ],
    exampleInput:
      "Hi there, we're looking to buy our first home in the Austin area, ideally in the Mueller or Windsor Park neighborhoods. Our budget is around $425K-$475K. We're both remote workers so we need at least 3 bedrooms (one for each home office) and a decent-sized yard for our two dogs. We're pre-approved through UFCU for $480K. We'd like to close by end of July if possible since our lease is up August 1st. My name is Priya Ramaswamy, 512-555-0342, priya.rama@gmail.com. My partner is Alex Chen.",
    exampleOutput: [
      {
        label: "Lead Name",
        value: "Priya Ramaswamy & Alex Chen",
        confidence: 0.97,
      },
      { label: "Lead Type", value: "Buyer", confidence: 0.99 },
      {
        label: "Budget Range",
        value: "$425,000 - $475,000",
        confidence: 0.98,
      },
      {
        label: "Pre-Approval",
        value: "Yes - UFCU, $480K",
        confidence: 0.97,
      },
      {
        label: "Location Preference",
        value: "Austin, TX - Mueller, Windsor Park",
        confidence: 0.98,
      },
      {
        label: "Requirements",
        value: "3+ bedrooms, yard (two dogs), remote-work friendly",
        confidence: 0.95,
      },
      { label: "Timeline", value: "Close by end of July 2025", confidence: 0.96 },
      { label: "Phone", value: "512-555-0342", confidence: 0.99 },
    ],
    recommendedFields: [
      {
        name: "lead_name",
        label: "Lead Name",
        type: "text",
        why: "Identifies the prospect for CRM record creation",
      },
      {
        name: "lead_type",
        label: "Buyer / Seller / Renter",
        type: "select",
        why: "Routes to the correct agent or team immediately",
      },
      {
        name: "budget",
        label: "Budget Range",
        type: "text",
        why: "Qualifies the lead and narrows property matches instantly",
      },
      {
        name: "pre_approval",
        label: "Pre-Approval Status",
        type: "text",
        why: "Separates ready-to-offer buyers from early-stage browsers",
      },
      {
        name: "location",
        label: "Preferred Location",
        type: "text",
        why: "Matches the lead to your active listings and farm areas",
      },
      {
        name: "requirements",
        label: "Property Requirements",
        type: "text",
        why: "Feeds directly into MLS search criteria without re-asking",
      },
      {
        name: "timeline",
        label: "Timeline",
        type: "text",
        why: "Determines urgency and prioritizes hot leads in your pipeline",
      },
      {
        name: "email",
        label: "Email",
        type: "email",
        why: "Primary channel for property alerts and showing schedules",
      },
    ],
    stats: [
      { label: "Lead qualification time", value: "Under 10 seconds" },
      { label: "More leads contacted within first hour", value: "3x" },
      { label: "CRM data entry eliminated", value: "91%" },
    ],
    faqs: [
      {
        question: "Does Sift work with real estate CRMs like Follow Up Boss or kvCORE?",
        answer:
          "Sift outputs structured JSON that maps to standard CRM fields. Push parsed leads into Follow Up Boss, kvCORE, LionDesk, or any CRM that accepts webhooks or Zapier triggers.",
      },
      {
        question: "Can it distinguish buyers from sellers from renters?",
        answer:
          "Yes. Sift analyzes the language of the enquiry to classify lead type with high confidence. Mentions of budgets and pre-approval signal buyers; mentions of selling timelines and property ownership signal sellers.",
      },
      {
        question: "How does it handle leads from Zillow or Realtor.com?",
        answer:
          "Forward the lead notification email or paste the text into your Sift endpoint. It extracts all the structured details regardless of which portal the lead originated from.",
      },
      {
        question: "What if a lead mentions multiple properties?",
        answer:
          "Sift captures all mentioned addresses, neighborhoods, and criteria. You can configure it to create one lead record with multiple property interests or split them into separate entries.",
      },
      {
        question: "Can teams share schemas across a brokerage?",
        answer:
          "Yes. Create a brokerage-wide intake schema, then let individual agents customize their own fields on top of it. Ensures consistent data while allowing personalization.",
      },
    ],
    relatedTemplates: ["lead-intake", "customer-feedback", "support-ticket"],
    relatedUseCases: ["lead-capture", "client-intake", "support-tickets"],
  },

  // ─── 5. SaaS ───────────────────────────────────────────────────────
  {
    slug: "saas",
    name: "SaaS",
    headline:
      "Route Support Tickets and Feature Requests Without Reading Every One",
    description:
      "Sift classifies, prioritizes, and structures every inbound message -- support tickets, bug reports, feature requests, and churn signals -- so your team acts on data, not gut feel.",
    painPoints: [
      "Support emails mix bugs, feature requests, billing issues, and praise in one undifferentiated inbox",
      "Engineers waste sprint time triaging tickets that should have been routed to success or billing",
      "Churn signals hide in frustrated messages that sit in queue for days",
      "Feature request tracking is manual, inconsistent, and disconnected from the product roadmap",
    ],
    exampleInput:
      "Subject: URGENT -- Dashboard not loading for Enterprise users\n\nHey team, we've been having a critical issue since this morning. Our entire enterprise team (28 seats on the Scale plan, account #ENT-4410) cannot load the analytics dashboard. We get a spinning loader that never resolves. This is blocking our monthly board report which is due tomorrow. We've tried Chrome and Firefox on both Mac and Windows. Clearing cache didn't help. Our CSM is Rachel but she's OOO. Please escalate ASAP. -- David Park, VP Operations, Meridian Analytics, david.park@meridian.io",
    exampleOutput: [
      { label: "Contact Name", value: "David Park", confidence: 0.99 },
      {
        label: "Company",
        value: "Meridian Analytics",
        confidence: 0.98,
      },
      { label: "Account ID", value: "ENT-4410", confidence: 0.99 },
      { label: "Plan", value: "Scale (Enterprise, 28 seats)", confidence: 0.95 },
      { label: "Issue Type", value: "Bug Report", confidence: 0.97 },
      { label: "Severity", value: "Critical", confidence: 0.98 },
      {
        label: "Component",
        value: "Analytics Dashboard",
        confidence: 0.96,
      },
      {
        label: "Impact",
        value: "Entire enterprise team blocked; board report deadline tomorrow",
        confidence: 0.94,
      },
    ],
    recommendedFields: [
      {
        name: "contact_name",
        label: "Contact Name",
        type: "text",
        why: "Links the ticket to the user record and account",
      },
      {
        name: "company",
        label: "Company",
        type: "text",
        why: "Identifies ARR at risk and triggers enterprise escalation paths",
      },
      {
        name: "issue_type",
        label: "Issue Type",
        type: "select",
        why: "Automatically routes to support, engineering, billing, or product",
      },
      {
        name: "severity",
        label: "Severity",
        type: "select",
        why: "Drives SLA timers and paging for critical issues",
      },
      {
        name: "component",
        label: "Affected Component",
        type: "text",
        why: "Tags the owning engineering team without manual triage",
      },
      {
        name: "account_id",
        label: "Account ID",
        type: "text",
        why: "Instant lookup for plan tier, MRR, and account health score",
      },
      {
        name: "steps_to_reproduce",
        label: "Steps to Reproduce",
        type: "text",
        why: "Gives engineers what they need without a back-and-forth",
      },
    ],
    stats: [
      { label: "Ticket triage time reduction", value: "85%" },
      { label: "Mean time to correct team", value: "Under 30 seconds" },
      { label: "Churn signals surfaced earlier", value: "4.7x" },
    ],
    faqs: [
      {
        question: "Can Sift detect churn risk in support messages?",
        answer:
          "Yes. Sift analyzes sentiment, urgency language, and account context. Messages from high-value accounts with negative sentiment and escalation language are automatically flagged as churn risks.",
      },
      {
        question: "How does it integrate with Intercom, Zendesk, or Linear?",
        answer:
          "Sift outputs structured JSON that maps to ticket fields in any helpdesk or project management tool. Use webhooks or our Zapier integration to push parsed data directly into Zendesk, Intercom, Linear, or Jira.",
      },
      {
        question: "Can it separate feature requests from bug reports?",
        answer:
          "Absolutely. Sift classifies inbound messages into categories you define -- bugs, feature requests, billing questions, praise, complaints. Each gets routed to the right team with the right priority.",
      },
      {
        question: "What about messages that contain multiple issues?",
        answer:
          "Sift can extract multiple issue types from a single message. You can configure it to create separate tickets for each or group them under one record with sub-items.",
      },
      {
        question: "Does it work with our existing email workflows?",
        answer:
          "Yes. Forward emails to your Sift endpoint, use our API to process incoming messages, or embed the Sift widget directly in your support portal. No changes to your existing customer-facing workflow required.",
      },
    ],
    relatedTemplates: ["support-ticket", "bug-report", "customer-feedback"],
    relatedUseCases: ["support-tickets", "complaint-handling", "lead-capture"],
  },

  // ─── 6. Agencies ───────────────────────────────────────────────────
  {
    slug: "agencies",
    name: "Agencies",
    headline:
      "Scope Projects Accurately from the First Client Message",
    description:
      "Sift extracts budget, timeline, deliverables, and brand requirements from client briefs and RFPs so your team can quote faster and scope tighter.",
    painPoints: [
      "Client briefs arrive as unstructured emails, voice notes, or messy Google Docs with critical details buried",
      "Account managers spend hours distilling a brief into a scoping document before the strategy team even sees it",
      "Budget and timeline expectations are implied but never stated explicitly, leading to misquotes",
      "Scope creep starts at intake when requirements are captured vaguely",
    ],
    exampleInput:
      "Hey! We're launching a new DTC skincare line called 'Dew' targeting women 25-40. We need a full brand identity (logo, colors, packaging for 6 SKUs), a Shopify store, and a launch campaign across Instagram and TikTok. Our competitors are Glossier, Drunk Elephant, and The Ordinary but we want to feel more premium/clinical. Budget is $80-100K all in. We need to be live by September 1st for a fall launch. Our founder Dr. Maya Liu wants to be the face of the brand. Main contact is me, Jess Thornton, jess@dewskin.co, 415-555-0281.",
    exampleOutput: [
      {
        label: "Project Name",
        value: "Dew - DTC Skincare Launch",
        confidence: 0.96,
      },
      { label: "Contact", value: "Jess Thornton", confidence: 0.99 },
      {
        label: "Deliverables",
        value: "Brand identity, logo, packaging (6 SKUs), Shopify store, Instagram + TikTok launch campaign",
        confidence: 0.97,
      },
      {
        label: "Target Audience",
        value: "Women 25-40",
        confidence: 0.98,
      },
      { label: "Budget", value: "$80,000 - $100,000", confidence: 0.98 },
      { label: "Deadline", value: "September 1st (fall launch)", confidence: 0.97 },
      {
        label: "Competitors",
        value: "Glossier, Drunk Elephant, The Ordinary",
        confidence: 0.99,
      },
      {
        label: "Brand Direction",
        value: "Premium/clinical positioning",
        confidence: 0.93,
      },
    ],
    recommendedFields: [
      {
        name: "project_name",
        label: "Project Name",
        type: "text",
        why: "Creates a clean reference for proposals, invoices, and internal tracking",
      },
      {
        name: "contact_name",
        label: "Client Contact",
        type: "text",
        why: "Identifies the decision-maker or day-to-day point of contact",
      },
      {
        name: "deliverables",
        label: "Deliverables",
        type: "text",
        why: "Defines scope boundaries upfront to prevent creep later",
      },
      {
        name: "budget",
        label: "Budget",
        type: "text",
        why: "Determines which team configuration and approach is viable",
      },
      {
        name: "deadline",
        label: "Deadline",
        type: "date",
        why: "Drives resourcing decisions and identifies timeline conflicts early",
      },
      {
        name: "target_audience",
        label: "Target Audience",
        type: "text",
        why: "Shapes creative direction and media strategy from day one",
      },
      {
        name: "competitors",
        label: "Competitors",
        type: "text",
        why: "Gives the strategy team immediate context for positioning",
      },
      {
        name: "email",
        label: "Email",
        type: "email",
        why: "Primary channel for proposals, contracts, and approvals",
      },
    ],
    stats: [
      { label: "Brief-to-proposal time reduction", value: "65%" },
      { label: "Scope accuracy improvement", value: "42%" },
      { label: "Fewer scope change orders per project", value: "3.1x" },
    ],
    faqs: [
      {
        question: "Can Sift parse RFPs and multi-page briefs?",
        answer:
          "Sift handles long-form text excellently. Paste the full RFP content into your endpoint and it extracts deliverables, timelines, evaluation criteria, and budget details into structured fields.",
      },
      {
        question: "How does it handle vague or incomplete briefs?",
        answer:
          "Sift flags fields with low confidence scores when details are implied rather than stated. This gives your account team a targeted list of clarifying questions instead of a generic discovery call.",
      },
      {
        question: "Can different departments use it differently?",
        answer:
          "Yes. Your design team, dev team, and media team can each have their own schema. A single client brief can be parsed against multiple schemas to produce team-specific intake documents.",
      },
      {
        question: "Does it integrate with project management tools?",
        answer:
          "Sift outputs structured JSON compatible with Asana, Monday, Basecamp, ClickUp, and any tool that accepts webhook or API input. Auto-create projects with pre-populated fields from the parsed brief.",
      },
      {
        question: "Can it estimate project value for pipeline forecasting?",
        answer:
          "When Sift extracts budget data, you can feed that directly into your pipeline. Pair it with your CRM to auto-update deal values and forecast revenue from new enquiries in real time.",
      },
    ],
    relatedTemplates: ["lead-intake", "support-ticket", "customer-feedback"],
    relatedUseCases: ["lead-capture", "client-intake", "support-tickets"],
  },

  // ─── 7. Recruitment ────────────────────────────────────────────────
  {
    slug: "recruitment",
    name: "Recruitment",
    headline:
      "Screen Candidates at Scale Without Losing the Human Touch",
    description:
      "Sift extracts skills, experience, salary expectations, and availability from candidate messages and applications so recruiters spend time interviewing, not data entry.",
    painPoints: [
      "Candidates send cover letters and LinkedIn messages in wildly different formats",
      "Recruiters spend 6+ minutes per application copying details into the ATS",
      "Salary expectations and notice periods are mentioned casually but critical for screening",
      "High-volume roles generate hundreds of applications that need rapid qualification",
    ],
    exampleInput:
      "Hi, I saw the Senior DevOps Engineer role on LinkedIn and I'm very interested. I'm currently a DevOps Lead at Shopify (3 years) and before that I spent 4 years at AWS on the ECS team. I'm strong in Kubernetes, Terraform, and CI/CD (GitHub Actions, ArgoCD). I have AWS Solutions Architect Pro and CKA certifications. Looking for $180-200K base plus equity. I need to give 4 weeks notice. I'm based in Toronto but open to remote US positions. Happy to chat anytime this week. - Raj Krishnamurthy, raj.k@protonmail.com, 416-555-0173",
    exampleOutput: [
      {
        label: "Candidate Name",
        value: "Raj Krishnamurthy",
        confidence: 0.99,
      },
      {
        label: "Current Role",
        value: "DevOps Lead at Shopify (3 years)",
        confidence: 0.98,
      },
      {
        label: "Key Skills",
        value: "Kubernetes, Terraform, GitHub Actions, ArgoCD, CI/CD",
        confidence: 0.97,
      },
      {
        label: "Certifications",
        value: "AWS Solutions Architect Professional, CKA",
        confidence: 0.99,
      },
      {
        label: "Salary Expectation",
        value: "$180,000 - $200,000 base + equity",
        confidence: 0.98,
      },
      { label: "Notice Period", value: "4 weeks", confidence: 0.97 },
      {
        label: "Location",
        value: "Toronto, open to remote US",
        confidence: 0.96,
      },
    ],
    recommendedFields: [
      {
        name: "candidate_name",
        label: "Candidate Name",
        type: "text",
        why: "Creates the candidate record in your ATS",
      },
      {
        name: "current_role",
        label: "Current Role & Company",
        type: "text",
        why: "Instant seniority and company-tier assessment",
      },
      {
        name: "skills",
        label: "Key Skills",
        type: "text",
        why: "Matches against job requirements for automated screening",
      },
      {
        name: "salary_expectation",
        label: "Salary Expectation",
        type: "text",
        why: "Filters candidates within budget before the first call",
      },
      {
        name: "notice_period",
        label: "Notice Period",
        type: "text",
        why: "Critical for urgent hires and start-date planning",
      },
      {
        name: "location",
        label: "Location / Remote Preference",
        type: "text",
        why: "Validates eligibility for the role's work arrangement",
      },
      {
        name: "years_experience",
        label: "Years of Experience",
        type: "number",
        why: "Quick seniority check against the job level requirement",
      },
      {
        name: "email",
        label: "Email",
        type: "email",
        why: "Primary channel for interview scheduling and offers",
      },
    ],
    stats: [
      { label: "Time saved per application processed", value: "6 minutes" },
      { label: "Candidate screening throughput increase", value: "5x" },
      { label: "Time-to-shortlist reduction", value: "71%" },
    ],
    faqs: [
      {
        question: "Does Sift integrate with Greenhouse, Lever, or other ATS platforms?",
        answer:
          "Sift outputs structured JSON that maps to standard ATS candidate fields. Push parsed candidates into Greenhouse, Lever, Workable, or any ATS via webhooks or Zapier.",
      },
      {
        question: "Can it parse CVs and resumes?",
        answer:
          "Sift processes text content, so paste or pipe CV text through the API. It excels at extracting structured data from the unstructured narrative format of cover letters, LinkedIn messages, and email applications.",
      },
      {
        question: "How does it handle candidates who don't state salary expectations?",
        answer:
          "Missing fields get a low confidence score or are left blank, so your recruiter knows to ask. No false data is ever invented -- Sift only extracts what is actually stated.",
      },
      {
        question: "Can we customize the screening criteria per role?",
        answer:
          "Absolutely. Create a different schema for each role -- a DevOps hire needs different fields than a marketing manager. Clone and adapt schemas in seconds.",
      },
      {
        question: "Does it help with diversity and bias reduction?",
        answer:
          "Sift extracts objective, skills-based data. You can configure schemas to omit demographic fields, focusing screening on qualifications, experience, and skills rather than subjective assessments.",
      },
    ],
    relatedTemplates: ["job-application", "lead-intake", "customer-feedback"],
    relatedUseCases: ["client-intake", "lead-capture", "support-tickets"],
  },

  // ─── 8. Accounting ─────────────────────────────────────────────────
  {
    slug: "accounting",
    name: "Accounting",
    headline:
      "Onboard New Clients in Minutes, Not Meetings",
    description:
      "Sift extracts business details, entity type, revenue ranges, and compliance needs from prospect enquiries so your firm can quote accurately without a discovery call.",
    painPoints: [
      "Prospective clients send rambling emails about their business without stating what they actually need",
      "Entity type, fiscal year, and existing software are critical for quoting but rarely volunteered upfront",
      "Partners waste billable hours on discovery calls that could be replaced by structured intake",
      "Client onboarding involves re-entering the same details across practice management, tax software, and portals",
    ],
    exampleInput:
      "Hello, I was referred by Mike DeLuca. I run a small e-commerce business selling handmade ceramics -- it's an LLC registered in Oregon, been operating since 2021. Revenue was about $340K last year, expecting to hit $500K this year. I use Shopify for sales and Square for farmers markets. Currently doing my own books in Wave but it's a mess. I need someone to clean up 2024, file my taxes (haven't filed yet, I know...), and handle bookkeeping going forward. I also just hired my first two employees so I need payroll set up. Sarah Novak, sarah@claypottery.com, 503-555-0162.",
    exampleOutput: [
      { label: "Client Name", value: "Sarah Novak", confidence: 0.99 },
      {
        label: "Business Name",
        value: "Clay pottery / e-commerce ceramics",
        confidence: 0.88,
      },
      { label: "Entity Type", value: "LLC", confidence: 0.99 },
      { label: "State", value: "Oregon", confidence: 0.98 },
      {
        label: "Revenue Range",
        value: "$340K (2024), projecting $500K (2025)",
        confidence: 0.97,
      },
      {
        label: "Services Needed",
        value: "Bookkeeping cleanup (2024), tax filing (overdue), ongoing bookkeeping, payroll setup",
        confidence: 0.96,
      },
      {
        label: "Current Software",
        value: "Shopify, Square, Wave",
        confidence: 0.98,
      },
      { label: "Employees", value: "2 (newly hired)", confidence: 0.95 },
      { label: "Referral Source", value: "Mike DeLuca", confidence: 0.97 },
    ],
    recommendedFields: [
      {
        name: "client_name",
        label: "Client Name",
        type: "text",
        why: "Creates the client record in your practice management system",
      },
      {
        name: "entity_type",
        label: "Entity Type",
        type: "select",
        why: "Determines tax treatment, filing requirements, and engagement scope",
      },
      {
        name: "state",
        label: "State of Registration",
        type: "text",
        why: "Drives state tax obligations and compliance requirements",
      },
      {
        name: "revenue_range",
        label: "Revenue Range",
        type: "text",
        why: "Primary input for engagement pricing and complexity assessment",
      },
      {
        name: "services_needed",
        label: "Services Needed",
        type: "text",
        why: "Scopes the engagement accurately from first contact",
      },
      {
        name: "current_software",
        label: "Current Software",
        type: "text",
        why: "Identifies migration needs and integration points",
      },
      {
        name: "employee_count",
        label: "Number of Employees",
        type: "number",
        why: "Triggers payroll service offering and determines pricing tier",
      },
      {
        name: "referral_source",
        label: "Referral Source",
        type: "text",
        why: "Tracks referral partnerships and attribution for marketing",
      },
    ],
    stats: [
      { label: "Client onboarding time reduction", value: "68%" },
      { label: "Quote accuracy from first contact", value: "89%" },
      { label: "Discovery calls eliminated", value: "45%" },
    ],
    faqs: [
      {
        question: "Does Sift work with practice management tools like Karbon or Canopy?",
        answer:
          "Sift outputs structured JSON that maps to client fields in Karbon, Canopy, TaxDome, and similar platforms. Use webhooks or Zapier to auto-create client records with pre-populated data.",
      },
      {
        question: "Can it handle enquiries about multiple service lines?",
        answer:
          "Yes. A single message mentioning tax, bookkeeping, and advisory is parsed into distinct service categories. Your workflow can auto-generate separate engagement items for each.",
      },
      {
        question: "How accurate is the entity type detection?",
        answer:
          "When clients state their entity type (LLC, S-Corp, sole prop), Sift captures it with 99%+ confidence. When it is implied, Sift flags the field as low-confidence so you can confirm.",
      },
      {
        question: "Can different firm departments use different schemas?",
        answer:
          "Absolutely. Tax, audit, advisory, and bookkeeping teams can each have their own intake schema with fields relevant to their engagement type.",
      },
      {
        question: "What about compliance and data security?",
        answer:
          "Sift encrypts all data in transit and at rest. No client financial data is used for model training. You control retention periods and can purge processed data on demand.",
      },
    ],
    relatedTemplates: ["lead-intake", "support-ticket", "customer-feedback"],
    relatedUseCases: ["client-intake", "lead-capture", "support-tickets"],
  },

  // ─── 9. Construction ───────────────────────────────────────────────
  {
    slug: "construction",
    name: "Construction",
    headline:
      "Turn Job Enquiries and Site Reports into Actionable Records Instantly",
    description:
      "Sift structures project enquiries, maintenance requests, and site reports so your team quotes faster, schedules smarter, and never loses a lead in the inbox.",
    painPoints: [
      "Homeowners and property managers describe projects in vague, non-technical terms",
      "Project details, addresses, and timelines are scattered across emails, texts, and voicemails",
      "Estimators waste hours chasing basic details before they can even begin a quote",
      "Maintenance requests pile up with no consistent format, making prioritization impossible",
    ],
    exampleInput:
      "Hi, we need a full bathroom remodel at our rental property at 28 Oak Street, Unit 3B, Hartford CT. The current bathroom is about 60 sq ft with a tub/shower combo. We want to replace it with a walk-in shower with glass enclosure, new vanity, toilet, and tile floor. The subfloor might have water damage -- there's been a slow leak. We'd like this done in the next 6-8 weeks while the unit is vacant. Budget is $15-20K. I manage 12 properties so if this goes well there's plenty more work. - Tom Galloway, Galloway Property Group, tom@gallowaypg.com, 860-555-0219",
    exampleOutput: [
      { label: "Contact Name", value: "Tom Galloway", confidence: 0.99 },
      {
        label: "Company",
        value: "Galloway Property Group",
        confidence: 0.98,
      },
      { label: "Project Type", value: "Bathroom Remodel", confidence: 0.97 },
      {
        label: "Address",
        value: "28 Oak Street, Unit 3B, Hartford, CT",
        confidence: 0.99,
      },
      { label: "Budget", value: "$15,000 - $20,000", confidence: 0.98 },
      { label: "Timeline", value: "6-8 weeks", confidence: 0.97 },
      {
        label: "Scope Details",
        value: "Walk-in shower (glass enclosure), vanity, toilet, tile floor; possible subfloor water damage repair",
        confidence: 0.95,
      },
      {
        label: "Repeat Potential",
        value: "Manages 12 properties, ongoing work possible",
        confidence: 0.92,
      },
    ],
    recommendedFields: [
      {
        name: "contact_name",
        label: "Contact Name",
        type: "text",
        why: "Links the enquiry to a customer record for follow-up",
      },
      {
        name: "project_type",
        label: "Project Type",
        type: "select",
        why: "Routes to the correct estimator or trade team",
      },
      {
        name: "address",
        label: "Project Address",
        type: "text",
        why: "Required for site visits, permitting, and scheduling",
      },
      {
        name: "budget",
        label: "Budget",
        type: "text",
        why: "Determines whether the project fits your capacity and minimums",
      },
      {
        name: "timeline",
        label: "Timeline",
        type: "text",
        why: "Checked against crew availability before committing",
      },
      {
        name: "scope",
        label: "Scope of Work",
        type: "text",
        why: "Gives estimators enough detail to prepare an accurate initial quote",
      },
      {
        name: "phone",
        label: "Phone",
        type: "phone",
        why: "Construction clients prefer phone for scheduling and site coordination",
      },
    ],
    stats: [
      { label: "Enquiry-to-quote time reduction", value: "58%" },
      { label: "Lead response time improvement", value: "4x faster" },
      { label: "Fewer site visits needed for scoping", value: "35%" },
    ],
    faqs: [
      {
        question: "Can Sift handle maintenance requests as well as new project enquiries?",
        answer:
          "Yes. Create separate schemas for new project leads, maintenance requests, warranty claims, and punch list items. Each gets its own fields and routing logic.",
      },
      {
        question: "Does it work with construction management software?",
        answer:
          "Sift outputs structured JSON compatible with Buildertrend, CoConstruct, Procore, and any system that accepts API or webhook input.",
      },
      {
        question: "How does it handle vague project descriptions?",
        answer:
          "Sift extracts what it can and flags vague or missing fields with low confidence scores. Your team gets a specific list of clarifying questions instead of a generic 'tell me more' response.",
      },
      {
        question:
          "Can it distinguish residential from commercial enquiries?",
        answer:
          "Yes. Sift picks up signals like company names, property management references, unit counts, and project scale to classify enquiries as residential, commercial, or multi-family.",
      },
      {
        question: "What about enquiries that come in via text message?",
        answer:
          "Sift processes any text input regardless of source. Forward SMS messages to your Sift endpoint via Twilio or any SMS gateway and get the same structured output.",
      },
    ],
    relatedTemplates: [
      "maintenance-request",
      "lead-intake",
      "support-ticket",
    ],
    relatedUseCases: ["lead-capture", "client-intake", "complaint-handling"],
  },

  // ─── 10. Financial Services ────────────────────────────────────────
  {
    slug: "financial-services",
    name: "Financial Services",
    headline:
      "Qualify Prospects and Capture Compliance Details from the First Interaction",
    description:
      "Sift structures advisory enquiries into client profiles with assets, goals, risk tolerance, and compliance flags -- so advisors spend time advising, not administrating.",
    painPoints: [
      "Prospects describe their financial situation in scattered, non-standard ways across emails and web forms",
      "KYC and suitability data must be extracted manually before any advisory relationship can begin",
      "Compliance teams need consistent, auditable intake records but advisors submit inconsistent notes",
      "High-net-worth leads get the same slow intake process as routine enquiries",
    ],
    exampleInput:
      "I'm looking for a financial advisor to help with retirement planning. I'm 52, plan to retire at 62. Currently have about $1.2M in a 401(k) through Fidelity from my job at Lockheed Martin, plus $350K in a joint brokerage account at Schwab with my wife. We also have the house worth about $650K with $180K left on the mortgage. Combined income is about $245K. We're fairly conservative investors -- lost a lot in 2008 and don't want that again. Also need to think about college funding for our youngest (she's 14). I'm Robert Chen, 703-555-0461, robert.chen@outlook.com.",
    exampleOutput: [
      { label: "Prospect Name", value: "Robert Chen", confidence: 0.99 },
      { label: "Age", value: "52", confidence: 0.99 },
      {
        label: "Goals",
        value: "Retirement planning (target age 62), college funding (daughter, age 14)",
        confidence: 0.97,
      },
      {
        label: "Investable Assets",
        value: "$1.55M ($1.2M 401k + $350K brokerage)",
        confidence: 0.96,
      },
      {
        label: "Real Estate",
        value: "$650K home, $180K mortgage remaining",
        confidence: 0.97,
      },
      { label: "Household Income", value: "$245,000", confidence: 0.98 },
      {
        label: "Risk Tolerance",
        value: "Conservative (scarred by 2008 losses)",
        confidence: 0.94,
      },
      {
        label: "Current Custodians",
        value: "Fidelity (401k), Schwab (brokerage)",
        confidence: 0.98,
      },
    ],
    recommendedFields: [
      {
        name: "prospect_name",
        label: "Prospect Name",
        type: "text",
        why: "Creates the client record and initiates KYC documentation",
      },
      {
        name: "financial_goals",
        label: "Financial Goals",
        type: "text",
        why: "Drives the advisory approach and product recommendations",
      },
      {
        name: "investable_assets",
        label: "Investable Assets",
        type: "text",
        why: "Determines fee tier, service level, and minimum thresholds",
      },
      {
        name: "risk_tolerance",
        label: "Risk Tolerance",
        type: "select",
        why: "Required for suitability assessment and compliance documentation",
      },
      {
        name: "household_income",
        label: "Household Income",
        type: "text",
        why: "Impacts retirement projections and savings rate analysis",
      },
      {
        name: "current_custodians",
        label: "Current Custodians / Accounts",
        type: "text",
        why: "Identifies consolidation opportunities and transfer logistics",
      },
      {
        name: "age",
        label: "Age",
        type: "number",
        why: "Critical for retirement timeline calculations and life-stage planning",
      },
      {
        name: "email",
        label: "Email",
        type: "email",
        why: "Secure channel for financial documents and engagement agreements",
      },
    ],
    stats: [
      { label: "Prospect qualification time", value: "Under 15 seconds" },
      { label: "Compliance data completeness at intake", value: "91%" },
      { label: "Advisor admin time reduction", value: "62%" },
    ],
    faqs: [
      {
        question: "How does Sift support compliance and audit requirements?",
        answer:
          "Every parsed submission is logged with timestamps, confidence scores, and the original input text. This creates an auditable trail showing exactly how client data was captured and classified.",
      },
      {
        question: "Can it integrate with Salesforce Financial Services Cloud or Redtail?",
        answer:
          "Sift outputs structured JSON that maps to standard CRM contact and opportunity fields. Push parsed prospect data into Salesforce, Redtail, Wealthbox, or any CRM via webhooks or Zapier.",
      },
      {
        question: "Does it handle KYC data extraction?",
        answer:
          "Sift extracts stated identity details, financial information, and risk indicators from prospect messages. You still need your formal KYC process, but Sift pre-populates the data so advisors skip the manual entry.",
      },
      {
        question: "What about prospects with complex financial situations?",
        answer:
          "Sift handles multi-account, multi-goal scenarios well. Business owners mentioning both personal and business finances get each aspect captured separately with appropriate field mapping.",
      },
      {
        question: "Is the data handling compliant with SEC and FINRA guidelines?",
        answer:
          "Sift provides encrypted data processing with configurable retention periods. We recommend reviewing our security documentation with your compliance officer to confirm alignment with your firm's specific regulatory requirements.",
      },
    ],
    relatedTemplates: ["lead-intake", "customer-feedback", "support-ticket"],
    relatedUseCases: ["client-intake", "lead-capture", "complaint-handling"],
  },

  // ─── 11. E-commerce ────────────────────────────────────────────────
  {
    slug: "ecommerce",
    name: "E-commerce",
    headline:
      "Resolve Customer Issues Before They Become Refund Requests",
    description:
      "Sift classifies order issues, extracts tracking numbers, and identifies product defects from customer messages so your support team resolves tickets 5x faster.",
    painPoints: [
      "Customers describe order problems in emotional language without including order numbers or specifics",
      "Support agents waste time asking for basic details that were buried in the original message",
      "Return and refund requests need product, reason, and order data pulled from unstructured complaints",
      "High-volume periods (BFCM, holidays) overwhelm manual triage and slow resolution times",
    ],
    exampleInput:
      "This is ridiculous. I ordered the Navy Blue Wool Peacoat in size Medium on Black Friday (order #WH-89234) and it finally arrived today -- THREE WEEKS late. And it's the wrong size, this is clearly an XL. The sleeve length is way past my wrists and it's enormous in the chest. I paid $189 plus $12.99 express shipping for THIS? I want a full refund including shipping, and I'm not paying to send this back. This is the second time you've messed up my order. Last time was the leather gloves in October. I've been a customer for 4 years. - Amanda Torres, amanda.t@yahoo.com, order email was same.",
    exampleOutput: [
      {
        label: "Customer Name",
        value: "Amanda Torres",
        confidence: 0.99,
      },
      { label: "Order Number", value: "WH-89234", confidence: 0.99 },
      {
        label: "Product",
        value: "Navy Blue Wool Peacoat, ordered Medium, received XL",
        confidence: 0.97,
      },
      { label: "Issue Type", value: "Wrong item / Size mismatch", confidence: 0.98 },
      { label: "Order Total", value: "$201.99 ($189 + $12.99 shipping)", confidence: 0.96 },
      {
        label: "Resolution Requested",
        value: "Full refund including shipping; free return label",
        confidence: 0.97,
      },
      { label: "Sentiment", value: "Very Negative", confidence: 0.99 },
      {
        label: "Customer History",
        value: "4-year customer, prior order issue (leather gloves, October)",
        confidence: 0.93,
      },
    ],
    recommendedFields: [
      {
        name: "customer_name",
        label: "Customer Name",
        type: "text",
        why: "Matches to the customer account for order lookup",
      },
      {
        name: "order_number",
        label: "Order Number",
        type: "text",
        why: "Instant order lookup without asking the customer to repeat it",
      },
      {
        name: "issue_type",
        label: "Issue Type",
        type: "select",
        why: "Routes to the right resolution workflow (return, replace, refund)",
      },
      {
        name: "product",
        label: "Product",
        type: "text",
        why: "Identifies the SKU for inventory and quality tracking",
      },
      {
        name: "resolution_requested",
        label: "Resolution Requested",
        type: "text",
        why: "Tells the agent exactly what the customer wants before opening the ticket",
      },
      {
        name: "sentiment",
        label: "Sentiment",
        type: "select",
        why: "Prioritizes angry customers and at-risk accounts in the queue",
      },
      {
        name: "email",
        label: "Email",
        type: "email",
        why: "Primary contact for return labels, refund confirmations, and follow-up",
      },
    ],
    stats: [
      { label: "Ticket resolution time reduction", value: "78%" },
      { label: "First-reply accuracy improvement", value: "3.4x" },
      { label: "Order detail extraction accuracy", value: "97%" },
    ],
    faqs: [
      {
        question: "Does Sift integrate with Shopify, WooCommerce, or BigCommerce?",
        answer:
          "Sift outputs structured data that includes order numbers and product details. Use our webhook integration to auto-look up orders in Shopify, WooCommerce, or BigCommerce and attach the full order context to each ticket.",
      },
      {
        question: "Can it detect repeat complainers or high-value customers?",
        answer:
          "Sift extracts customer history signals from messages (e.g. 'I've been a customer for 4 years'). Pair this with your CRM data to flag VIP customers and repeat issues for priority handling.",
      },
      {
        question: "How does it handle messages about multiple orders?",
        answer:
          "Sift extracts all mentioned order numbers and associated issues. You can configure it to create separate tickets per order or group them under one customer interaction record.",
      },
      {
        question: "Can it auto-classify return reasons for reporting?",
        answer:
          "Yes. Sift categorizes issues into configurable types (wrong item, damaged, late delivery, quality, etc.) that feed directly into your returns analytics dashboard.",
      },
      {
        question: "Does it work during high-volume periods like Black Friday?",
        answer:
          "Sift processes messages in milliseconds regardless of volume. During peak periods, automated classification and routing keeps your team focused on resolutions instead of triage.",
      },
    ],
    relatedTemplates: ["support-ticket", "customer-feedback", "bug-report"],
    relatedUseCases: [
      "support-tickets",
      "complaint-handling",
      "lead-capture",
    ],
  },

  // ─── 12. Education ─────────────────────────────────────────────────
  {
    slug: "education",
    name: "Education",
    headline:
      "Streamline Admissions and Student Enquiries Without Adding Headcount",
    description:
      "Sift structures student and parent enquiries into admissions-ready records with program interest, timeline, prerequisites, and financial aid needs extracted automatically.",
    painPoints: [
      "Prospective students send long, unstructured emails mixing questions about multiple programs",
      "Admissions staff re-type the same information across CRM, SIS, and financial aid systems",
      "International applicants include credentials, visa status, and language proficiency in inconsistent formats",
      "Peak enrollment periods create backlogs that delay responses and lose prospective students",
    ],
    exampleInput:
      "Hi, I'm interested in applying to your MBA program starting Fall 2026. I graduated from UC Berkeley in 2019 with a BA in Economics (3.6 GPA) and I've been working at Deloitte for 6 years in management consulting. My GMAT is 710. I'm also curious about the part-time option since my company might sponsor tuition -- do you have an employer sponsorship track? I'd need financial aid regardless. I'm a US citizen currently based in San Francisco. Can someone walk me through the application process? Nadia Petrov, nadia.petrov@deloitte.com, 415-555-0398.",
    exampleOutput: [
      { label: "Applicant Name", value: "Nadia Petrov", confidence: 0.99 },
      {
        label: "Program Interest",
        value: "MBA (Full-time and Part-time)",
        confidence: 0.96,
      },
      { label: "Target Start", value: "Fall 2026", confidence: 0.99 },
      {
        label: "Academic Background",
        value: "BA Economics, UC Berkeley, 2019, 3.6 GPA",
        confidence: 0.98,
      },
      { label: "GMAT Score", value: "710", confidence: 0.99 },
      {
        label: "Work Experience",
        value: "6 years, Management Consulting, Deloitte",
        confidence: 0.97,
      },
      { label: "Financial Aid", value: "Needed; possible employer sponsorship", confidence: 0.95 },
      { label: "Citizenship", value: "US citizen", confidence: 0.98 },
    ],
    recommendedFields: [
      {
        name: "applicant_name",
        label: "Applicant Name",
        type: "text",
        why: "Creates the prospect record in your admissions CRM",
      },
      {
        name: "program_interest",
        label: "Program of Interest",
        type: "select",
        why: "Routes to the correct admissions counselor and program materials",
      },
      {
        name: "target_start",
        label: "Target Start Term",
        type: "text",
        why: "Assigns the prospect to the correct enrollment cycle",
      },
      {
        name: "academic_background",
        label: "Academic Background",
        type: "text",
        why: "Pre-screens for program prerequisites and eligibility",
      },
      {
        name: "test_scores",
        label: "Test Scores",
        type: "text",
        why: "Enables quick competitiveness assessment for selective programs",
      },
      {
        name: "work_experience",
        label: "Work Experience",
        type: "text",
        why: "Critical for graduate and professional program evaluation",
      },
      {
        name: "financial_aid",
        label: "Financial Aid Interest",
        type: "boolean",
        why: "Triggers financial aid office outreach and scholarship matching",
      },
      {
        name: "email",
        label: "Email",
        type: "email",
        why: "Primary channel for application instructions and enrollment communications",
      },
    ],
    stats: [
      { label: "Admissions enquiry processing time", value: "90% faster" },
      { label: "Prospective student data completeness", value: "87%" },
      { label: "Enquiry-to-application conversion improvement", value: "34%" },
    ],
    faqs: [
      {
        question: "Does Sift work with Student Information Systems?",
        answer:
          "Sift outputs structured JSON compatible with Banner, PeopleSoft, Slate, and other SIS/CRM platforms. Use webhooks or API integration to push parsed applicant data directly into your system of record.",
      },
      {
        question: "Can it handle international applicant enquiries?",
        answer:
          "Yes. Sift extracts visa status, country of origin, language proficiency, and foreign credential details from applicant messages, even when formatted inconsistently.",
      },
      {
        question: "How does it handle enquiries about multiple programs?",
        answer:
          "Sift identifies all mentioned programs and captures interest level for each. You can route the enquiry to multiple department counselors or create separate prospect records per program.",
      },
      {
        question: "Can we customize schemas for different enrollment types?",
        answer:
          "Absolutely. Undergraduate, graduate, continuing education, and certificate programs can each have their own intake schema with relevant fields and routing rules.",
      },
      {
        question: "Does it help during peak enrollment periods?",
        answer:
          "Sift processes enquiries in milliseconds regardless of volume. During peak periods, automated classification ensures every prospective student gets a fast, relevant response even when staff is stretched thin.",
      },
    ],
    relatedTemplates: ["lead-intake", "support-ticket", "customer-feedback"],
    relatedUseCases: ["client-intake", "lead-capture", "support-tickets"],
  },

  // ─── 13. Nonprofits ────────────────────────────────────────────────
  {
    slug: "nonprofits",
    name: "Nonprofits",
    headline:
      "Spend Less Time on Admin, More Time on Mission",
    description:
      "Sift structures donor enquiries, volunteer applications, and grant correspondence so your small team can focus on impact instead of inbox management.",
    painPoints: [
      "Donor enquiries mix giving intent with program questions and event RSVPs in a single email",
      "Volunteer applications arrive in inconsistent formats with availability and skills buried in paragraphs",
      "Grant correspondence contains compliance deadlines and reporting requirements scattered across threads",
      "Small teams juggle intake across donors, volunteers, beneficiaries, and partners with no automation",
    ],
    exampleInput:
      "Hello, my name is Catherine Reyes and I work at the Packard Foundation. We're interested in your youth literacy program in East Oakland. We have a $75K grant cycle opening in Q3 for education nonprofits serving underrepresented communities. Could you send us your most recent impact report and audited financials? We'd also like to schedule a site visit in June or July. Our program officer is Diane Tran (diane.tran@packard.org) and I'm the grants coordinator. Please respond by May 15th. My email is catherine.reyes@packard.org, 650-555-0417.",
    exampleOutput: [
      {
        label: "Contact Name",
        value: "Catherine Reyes (Grants Coordinator)",
        confidence: 0.99,
      },
      {
        label: "Organization",
        value: "Packard Foundation",
        confidence: 0.99,
      },
      {
        label: "Opportunity Type",
        value: "Grant ($75K, Q3 cycle)",
        confidence: 0.97,
      },
      {
        label: "Program of Interest",
        value: "Youth literacy program, East Oakland",
        confidence: 0.98,
      },
      {
        label: "Documents Requested",
        value: "Impact report (most recent), audited financials",
        confidence: 0.97,
      },
      {
        label: "Site Visit",
        value: "Requested, June or July",
        confidence: 0.96,
      },
      { label: "Deadline", value: "May 15th", confidence: 0.99 },
      {
        label: "Program Officer",
        value: "Diane Tran, diane.tran@packard.org",
        confidence: 0.98,
      },
    ],
    recommendedFields: [
      {
        name: "contact_name",
        label: "Contact Name",
        type: "text",
        why: "Identifies the person and their role in the relationship",
      },
      {
        name: "organization",
        label: "Organization",
        type: "text",
        why: "Links to your donor/funder database for relationship tracking",
      },
      {
        name: "enquiry_type",
        label: "Enquiry Type",
        type: "select",
        why: "Routes to the right team: development, programs, volunteer coordination, or executive",
      },
      {
        name: "amount",
        label: "Gift / Grant Amount",
        type: "text",
        why: "Determines prioritization and the appropriate staff level to respond",
      },
      {
        name: "program_interest",
        label: "Program of Interest",
        type: "text",
        why: "Connects the enquiry to the right program director",
      },
      {
        name: "deadline",
        label: "Deadline",
        type: "date",
        why: "Ensures time-sensitive funder requests never fall through the cracks",
      },
      {
        name: "action_items",
        label: "Action Items",
        type: "text",
        why: "Creates a clear to-do list from the message without re-reading it",
      },
      {
        name: "email",
        label: "Email",
        type: "email",
        why: "Primary channel for formal grant and donor communications",
      },
    ],
    stats: [
      { label: "Admin time saved per enquiry", value: "8 minutes" },
      { label: "Grant deadline compliance", value: "99%" },
      { label: "Donor response time improvement", value: "3.5x" },
    ],
    faqs: [
      {
        question: "Can Sift handle donor management alongside volunteer intake?",
        answer:
          "Yes. Create separate schemas for donor enquiries, volunteer applications, beneficiary intake, and grant correspondence. Each type routes to the appropriate team with the right fields.",
      },
      {
        question: "Does it integrate with nonprofit CRMs like Bloomerang or Little Green Light?",
        answer:
          "Sift outputs structured JSON compatible with Bloomerang, Little Green Light, Salesforce NPSP, and any CRM that accepts API or webhook input.",
      },
      {
        question: "How can it help with grant compliance?",
        answer:
          "Sift extracts deadlines, reporting requirements, and document requests from funder correspondence. Pair this with your calendar system to auto-generate reminders and task lists.",
      },
      {
        question: "Is the pricing affordable for nonprofits?",
        answer:
          "Sift offers nonprofit pricing tiers. Our free tier handles a generous volume of submissions, and paid tiers are discounted for registered 501(c)(3) organizations.",
      },
      {
        question: "Can volunteers self-serve through the intake form?",
        answer:
          "Yes. Embed the Sift widget on your volunteer page. Applicants type their availability, skills, and interests in natural language and Sift structures it into a complete application record.",
      },
    ],
    relatedTemplates: ["lead-intake", "job-application", "customer-feedback"],
    relatedUseCases: ["client-intake", "lead-capture", "support-tickets"],
  },

  // ─── 14. Dental ────────────────────────────────────────────────────
  {
    slug: "dental",
    name: "Dental",
    headline:
      "Fill Your Schedule with Pre-Qualified Patients, Not Phone Tag",
    description:
      "Sift turns patient enquiry calls, website messages, and referrals into structured appointment-ready records with insurance, symptoms, and urgency extracted automatically.",
    painPoints: [
      "New patient enquiries arrive via phone, web form, and Google messages in completely different formats",
      "Front desk staff spend 8+ minutes per new patient manually entering insurance and medical history",
      "Emergency patients describe symptoms vaguely ('my tooth hurts') with no indication of which tooth or severity",
      "Insurance verification requires policy details that patients rarely provide upfront",
    ],
    exampleInput:
      "Hi, I need to see a dentist pretty urgently. I cracked my back molar on the left side biting into an olive pit yesterday at dinner. There's a sharp edge cutting my tongue and it's really sensitive to cold. I haven't been to a dentist in about 2 years (I know, I know). No major dental history except I had my wisdom teeth out in college. I'm on Delta Dental PPO through my employer, member ID DD-773920-06. No drug allergies. I can come in any morning this week. Lisa Hwang, 925-555-0283, lisa.hwang@gmail.com.",
    exampleOutput: [
      { label: "Patient Name", value: "Lisa Hwang", confidence: 0.99 },
      {
        label: "Chief Complaint",
        value: "Cracked back molar (left side), sharp edge cutting tongue, cold sensitivity",
        confidence: 0.97,
      },
      { label: "Urgency", value: "Urgent (happened yesterday)", confidence: 0.95 },
      {
        label: "Cause",
        value: "Bit into olive pit",
        confidence: 0.98,
      },
      {
        label: "Dental History",
        value: "Wisdom teeth extraction (college); no dentist visit in ~2 years",
        confidence: 0.94,
      },
      { label: "Allergies", value: "None reported", confidence: 0.96 },
      {
        label: "Insurance",
        value: "Delta Dental PPO, Member ID DD-773920-06",
        confidence: 0.99,
      },
      {
        label: "Availability",
        value: "Any morning this week",
        confidence: 0.97,
      },
    ],
    recommendedFields: [
      {
        name: "patient_name",
        label: "Patient Name",
        type: "text",
        why: "Creates the patient chart and checks for existing records",
      },
      {
        name: "chief_complaint",
        label: "Chief Complaint",
        type: "text",
        why: "Determines appointment type and duration for scheduling",
      },
      {
        name: "urgency",
        label: "Urgency",
        type: "select",
        why: "Prioritizes same-day emergencies over routine new patient slots",
      },
      {
        name: "insurance",
        label: "Insurance Information",
        type: "text",
        why: "Enables eligibility verification before the patient arrives",
      },
      {
        name: "allergies",
        label: "Allergies",
        type: "text",
        why: "Patient safety -- must be in the chart before treatment",
      },
      {
        name: "dental_history",
        label: "Dental History",
        type: "text",
        why: "Gives the dentist context before the exam",
      },
      {
        name: "availability",
        label: "Availability",
        type: "text",
        why: "Enables the front desk to book without a call-back",
      },
      {
        name: "phone",
        label: "Phone",
        type: "phone",
        why: "For appointment confirmations and day-of reminders",
      },
    ],
    stats: [
      { label: "New patient intake time saved", value: "8 minutes" },
      { label: "Insurance pre-verification rate", value: "92%" },
      { label: "Same-day appointment booking increase", value: "47%" },
    ],
    faqs: [
      {
        question: "Does Sift integrate with Dentrix, Eaglesoft, or Open Dental?",
        answer:
          "Sift outputs structured JSON that maps to standard dental PMS patient fields. Use our API or Zapier integration to push parsed patient data into Dentrix, Eaglesoft, Open Dental, or any PMS that accepts external input.",
      },
      {
        question: "Can it handle multiple family members in one message?",
        answer:
          "Yes. When a parent enquires for themselves and their children, Sift extracts each patient's details separately and can create individual patient records for each family member.",
      },
      {
        question: "How does it prioritize emergency vs. routine enquiries?",
        answer:
          "Sift analyzes symptom descriptions, time-since-onset, and urgency language to classify enquiries. Emergencies (pain, fractures, swelling) are flagged for immediate scheduling.",
      },
      {
        question: "Is it HIPAA compliant for dental patient data?",
        answer:
          "Sift encrypts data in transit and at rest, offers BAA agreements, and does not use patient data for model training. Contact us for our full HIPAA compliance documentation.",
      },
      {
        question: "Can the front desk use it without technical training?",
        answer:
          "Absolutely. Your front desk staff simply paste or forward patient messages. Sift returns a structured patient card they can review and push into your PMS with one click.",
      },
    ],
    relatedTemplates: ["patient-intake", "support-ticket", "lead-intake"],
    relatedUseCases: ["patient-intake", "client-intake", "lead-capture"],
  },

  // ─── 15. Veterinary ────────────────────────────────────────────────
  {
    slug: "veterinary",
    name: "Veterinary",
    headline:
      "Triage Pet Emergencies and Book Appointments from Every Message",
    description:
      "Sift extracts pet details, symptoms, owner information, and urgency from client messages so your veterinary team can prioritize care, not admin.",
    painPoints: [
      "Pet owners describe symptoms emotionally and vaguely ('my dog is acting weird') with no clinical detail",
      "Breed, age, weight, and medication history are critical for triage but rarely volunteered upfront",
      "Emergency calls get mixed with routine appointment requests in the same inbox",
      "Vet techs spend the first 5 minutes of every call collecting details that could be captured before",
    ],
    exampleInput:
      "Please help, our golden retriever Bailey has been vomiting since last night -- at least 5 or 6 times. She's 7 years old, about 68 lbs. She got into the kitchen trash yesterday evening and we think she ate some chicken bones and possibly chocolate cake. She's lethargic now and won't drink water. She's up to date on shots, last visit was October for her annual. She's on Apoquel 16mg daily for allergies. No other health issues. We're the Morrison family, we've been coming to your practice since Bailey was a puppy. Kevin Morrison, 508-555-0394, kevinm@gmail.com. Can we get an emergency appointment today?",
    exampleOutput: [
      { label: "Owner Name", value: "Kevin Morrison", confidence: 0.99 },
      {
        label: "Pet Name",
        value: "Bailey",
        confidence: 0.99,
      },
      {
        label: "Species / Breed",
        value: "Dog, Golden Retriever",
        confidence: 0.98,
      },
      { label: "Age", value: "7 years", confidence: 0.99 },
      { label: "Weight", value: "68 lbs", confidence: 0.99 },
      {
        label: "Symptoms",
        value: "Repeated vomiting (5-6x since last night), lethargy, refusing water",
        confidence: 0.97,
      },
      {
        label: "Possible Ingestion",
        value: "Chicken bones, chocolate cake (from trash)",
        confidence: 0.96,
      },
      {
        label: "Current Medications",
        value: "Apoquel 16mg daily",
        confidence: 0.99,
      },
      { label: "Urgency", value: "Emergency -- requesting same-day appointment", confidence: 0.98 },
    ],
    recommendedFields: [
      {
        name: "owner_name",
        label: "Owner Name",
        type: "text",
        why: "Links to the client account and patient records",
      },
      {
        name: "pet_name",
        label: "Pet Name",
        type: "text",
        why: "Identifies the specific patient in multi-pet households",
      },
      {
        name: "species_breed",
        label: "Species / Breed",
        type: "text",
        why: "Critical for breed-specific health risks and drug dosing",
      },
      {
        name: "age",
        label: "Pet Age",
        type: "text",
        why: "Determines life stage and changes differential diagnosis priorities",
      },
      {
        name: "weight",
        label: "Weight",
        type: "text",
        why: "Required for medication dosing and anesthesia calculations",
      },
      {
        name: "symptoms",
        label: "Symptoms",
        type: "text",
        why: "Drives triage urgency and pre-visit preparation",
      },
      {
        name: "current_medications",
        label: "Current Medications",
        type: "text",
        why: "Prevents drug interactions and informs treatment decisions",
      },
      {
        name: "urgency",
        label: "Urgency",
        type: "select",
        why: "Separates true emergencies from routine care requests immediately",
      },
    ],
    stats: [
      { label: "Triage time for urgent cases", value: "Under 20 seconds" },
      { label: "Intake data captured pre-arrival", value: "94%" },
      { label: "Client callback time reduction", value: "61%" },
    ],
    faqs: [
      {
        question: "Does Sift integrate with veterinary PMS like eVetPractice or Cornerstone?",
        answer:
          "Sift outputs structured JSON that maps to patient and client fields in eVetPractice, Cornerstone, AVImark, and other veterinary PMS platforms. Use our API or Zapier integration to push data directly.",
      },
      {
        question: "Can it handle multi-pet households?",
        answer:
          "Yes. When a message mentions multiple pets, Sift creates separate records for each with their individual species, breed, age, weight, and symptom details.",
      },
      {
        question: "How does it triage emergencies vs. routine appointments?",
        answer:
          "Sift analyzes symptom severity, ingestion reports, and urgency language. Potential toxin ingestion, breathing difficulty, trauma, and similar keywords trigger emergency flags automatically.",
      },
      {
        question: "Can it detect potential toxin ingestion?",
        answer:
          "Yes. Sift identifies mentions of known pet toxins (chocolate, xylitol, certain plants, medications) and flags these as high-urgency regardless of how casually the owner mentions them.",
      },
      {
        question: "Is it easy for front desk staff to use?",
        answer:
          "Very. Your team pastes or forwards client messages and gets back a structured patient card with all the clinical details organized. No training beyond a 5-minute walkthrough.",
      },
    ],
    relatedTemplates: ["patient-intake", "support-ticket", "lead-intake"],
    relatedUseCases: ["patient-intake", "client-intake", "support-tickets"],
  },
];
