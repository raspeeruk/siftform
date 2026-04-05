import type { SchemaField } from "@/lib/db/schema";

// ─── Types ───

export type TemplateCategory =
  | "support"
  | "sales"
  | "legal"
  | "healthcare"
  | "insurance"
  | "hr"
  | "engineering"
  | "property";

export type PseoTemplate = {
  slug: string;
  name: string;
  category: TemplateCategory;
  description: string;
  longDescription: string;
  icon: string;
  fields: SchemaField[];
  exampleInput: string;
  exampleOutput: { label: string; value: string; confidence: number }[];
};

// ─── Categories ───

export const templateCategories: {
  id: TemplateCategory;
  label: string;
  description: string;
}[] = [
  {
    id: "support",
    label: "Customer Support",
    description:
      "Tickets, returns, warranty claims, complaints, and feature requests parsed from freeform customer messages.",
  },
  {
    id: "sales",
    label: "Sales & Pipeline",
    description:
      "Lead intake, demo requests, quotes, partnership inquiries, and RFP responses extracted from inbound messages.",
  },
  {
    id: "legal",
    label: "Legal & Compliance",
    description:
      "Client intake, contract review, compliance reports, IP filings, and dispute resolutions structured from narratives.",
  },
  {
    id: "healthcare",
    label: "Healthcare",
    description:
      "Patient intake, referrals, prescription refills, symptom reports, and appointment requests from patient messages.",
  },
  {
    id: "insurance",
    label: "Insurance",
    description:
      "Claims, policy changes, coverage inquiries, damage assessments, and beneficiary updates from policyholder messages.",
  },
  {
    id: "hr",
    label: "Human Resources",
    description:
      "Job applications, leave requests, expense reports, incident reports, and onboarding checklists from employee submissions.",
  },
  {
    id: "engineering",
    label: "Engineering & DevOps",
    description:
      "Bug reports, change requests, incident postmortems, deployment requests, and vulnerability disclosures from technical teams.",
  },
  {
    id: "property",
    label: "Property Management",
    description:
      "Maintenance requests, tenant applications, inspections, lease inquiries, and move-out requests from tenants and prospects.",
  },
];

// ─── Templates ───

export const pseoTemplates: PseoTemplate[] = [
  // ============================================================
  // SUPPORT (5)
  // ============================================================
  {
    slug: "support-ticket",
    name: "Support Ticket",
    category: "support",
    description:
      "Parse freeform customer messages into structured support tickets with priority and category.",
    longDescription:
      "Customers rarely fill out structured forms when something goes wrong. They fire off an email or chat message describing the problem in their own words. This template extracts the customer identity, issue description, product involved, urgency level, and preferred resolution from natural language, routing tickets faster and cutting first-response time.",
    icon: "ticket",
    fields: [
      { name: "customer_name", label: "Customer Name", type: "text", required: true },
      { name: "email", label: "Email Address", type: "email", required: true },
      { name: "product", label: "Product / Service", type: "text", required: true },
      { name: "issue_summary", label: "Issue Summary", type: "text", required: true },
      { name: "priority", label: "Priority", type: "select", required: true, options: ["Low", "Medium", "High", "Critical"] },
      { name: "category", label: "Category", type: "select", required: false, options: ["Billing", "Technical", "Account", "Shipping", "Other"] },
    ],
    exampleInput:
      "Hi, my name is Rachel Torres and I've been trying to export reports from the Pro dashboard for the last two days but it just spins and times out every time. This is blocking a board presentation on Friday. My email is rachel.torres@lumenco.io and I really need this sorted today.",
    exampleOutput: [
      { label: "Customer Name", value: "Rachel Torres", confidence: 0.99 },
      { label: "Email Address", value: "rachel.torres@lumenco.io", confidence: 0.99 },
      { label: "Product / Service", value: "Pro Dashboard - Report Export", confidence: 0.94 },
      { label: "Issue Summary", value: "Report export from Pro dashboard spins and times out, blocking a board presentation Friday", confidence: 0.96 },
      { label: "Priority", value: "High", confidence: 0.92 },
      { label: "Category", value: "Technical", confidence: 0.97 },
    ],
  },
  {
    slug: "product-return",
    name: "Product Return",
    category: "support",
    description:
      "Extract return details from customer messages including order info, reason, and preferred resolution.",
    longDescription:
      "Return requests arrive as unstructured emails mixing order numbers, reasons, and emotional context. This template pulls out the order reference, item details, reason for return, condition of the product, and whether the customer wants a refund or replacement, letting your returns team process requests without back-and-forth emails.",
    icon: "package-x",
    fields: [
      { name: "customer_name", label: "Customer Name", type: "text", required: true },
      { name: "email", label: "Email", type: "email", required: true },
      { name: "order_number", label: "Order Number", type: "text", required: true },
      { name: "item_name", label: "Item", type: "text", required: true },
      { name: "return_reason", label: "Return Reason", type: "text", required: true },
      { name: "condition", label: "Item Condition", type: "select", required: true, options: ["Unopened", "Like New", "Used", "Damaged"] },
      { name: "preferred_resolution", label: "Preferred Resolution", type: "select", required: true, options: ["Refund", "Replacement", "Store Credit"] },
    ],
    exampleInput:
      "I ordered the Ember ceramic mug (order #EM-20267841) last week and it arrived with a crack running down the handle. Honestly it looks like the packaging wasn't padded enough. I'm Marcus Chen, marcus.c88@gmail.com. I'd rather just get a replacement sent out if you have stock.",
    exampleOutput: [
      { label: "Customer Name", value: "Marcus Chen", confidence: 0.99 },
      { label: "Email", value: "marcus.c88@gmail.com", confidence: 0.99 },
      { label: "Order Number", value: "EM-20267841", confidence: 0.99 },
      { label: "Item", value: "Ember Ceramic Mug", confidence: 0.97 },
      { label: "Return Reason", value: "Arrived with crack in handle due to insufficient packaging", confidence: 0.95 },
      { label: "Item Condition", value: "Damaged", confidence: 0.98 },
      { label: "Preferred Resolution", value: "Replacement", confidence: 0.97 },
    ],
  },
  {
    slug: "warranty-claim",
    name: "Warranty Claim",
    category: "support",
    description:
      "Structure warranty claim details from customer descriptions including purchase date and defect info.",
    longDescription:
      "Warranty claims require specific data points that customers almost never provide in the right format. This template extracts product model, serial number, purchase date, defect description, and proof of purchase references from natural language claims, reducing the average processing time from days to minutes.",
    icon: "shield-check",
    fields: [
      { name: "customer_name", label: "Customer Name", type: "text", required: true },
      { name: "phone", label: "Phone Number", type: "phone", required: false },
      { name: "product_model", label: "Product Model", type: "text", required: true },
      { name: "serial_number", label: "Serial Number", type: "text", required: false },
      { name: "purchase_date", label: "Purchase Date", type: "date", required: true },
      { name: "defect_description", label: "Defect Description", type: "text", required: true },
      { name: "has_receipt", label: "Has Proof of Purchase", type: "boolean", required: true },
    ],
    exampleInput:
      "My Dynavac cordless V12 Pro stopped holding charge after about 10 minutes. Serial number is DV12-449821-UK. I bought it from John Lewis on 15th September last year and I still have the receipt. Name is Priya Kapoor, you can reach me on 07881 334 209.",
    exampleOutput: [
      { label: "Customer Name", value: "Priya Kapoor", confidence: 0.99 },
      { label: "Phone Number", value: "07881 334 209", confidence: 0.99 },
      { label: "Product Model", value: "Dynavac Cordless V12 Pro", confidence: 0.97 },
      { label: "Serial Number", value: "DV12-449821-UK", confidence: 0.99 },
      { label: "Purchase Date", value: "2025-09-15", confidence: 0.93 },
      { label: "Defect Description", value: "Battery stops holding charge after approximately 10 minutes of use", confidence: 0.96 },
      { label: "Has Proof of Purchase", value: "Yes", confidence: 0.98 },
    ],
  },
  {
    slug: "service-complaint",
    name: "Service Complaint",
    category: "support",
    description:
      "Parse customer complaints to identify the service issue, impact, and expected resolution.",
    longDescription:
      "Angry customers write long, emotional messages that bury the actual issue. This template separates the signal from the noise, extracting the specific service failure, when it happened, the business impact, and what the customer considers an acceptable resolution. Teams can prioritize by severity rather than volume.",
    icon: "message-circle-warning",
    fields: [
      { name: "customer_name", label: "Customer Name", type: "text", required: true },
      { name: "email", label: "Email", type: "email", required: true },
      { name: "service_area", label: "Service Area", type: "text", required: true },
      { name: "complaint_summary", label: "Complaint Summary", type: "text", required: true },
      { name: "incident_date", label: "Incident Date", type: "date", required: false },
      { name: "severity", label: "Severity", type: "select", required: true, options: ["Minor Inconvenience", "Service Degradation", "Service Outage", "Data / Security"] },
      { name: "desired_outcome", label: "Desired Outcome", type: "text", required: false },
    ],
    exampleInput:
      "This is James Whitfield, james.w@northstarlogistics.com. Your managed hosting went down for six hours on March 28th and took our entire client portal with it. We had three enterprise clients unable to access their shipment tracking during peak hours. We need a full post-incident report and I want to discuss SLA credits because this is the second outage this quarter.",
    exampleOutput: [
      { label: "Customer Name", value: "James Whitfield", confidence: 0.99 },
      { label: "Email", value: "james.w@northstarlogistics.com", confidence: 0.99 },
      { label: "Service Area", value: "Managed Hosting", confidence: 0.97 },
      { label: "Complaint Summary", value: "Six-hour hosting outage on March 28th took down client portal, affecting three enterprise clients' shipment tracking during peak hours. Second outage this quarter.", confidence: 0.95 },
      { label: "Incident Date", value: "2026-03-28", confidence: 0.96 },
      { label: "Severity", value: "Service Outage", confidence: 0.98 },
      { label: "Desired Outcome", value: "Full post-incident report and SLA credit discussion", confidence: 0.94 },
    ],
  },
  {
    slug: "feature-request",
    name: "Feature Request",
    category: "support",
    description:
      "Extract feature requests, use cases, and priority signals from customer feedback messages.",
    longDescription:
      "Feature requests come disguised as complaints, suggestions, workaround descriptions, and comparison-to-competitors anecdotes. This template identifies the core feature being requested, the use case driving it, the business value to the customer, and any urgency signals, feeding your product backlog with structured, prioritizable input.",
    icon: "lightbulb",
    fields: [
      { name: "requester_name", label: "Requester Name", type: "text", required: true },
      { name: "email", label: "Email", type: "email", required: true },
      { name: "feature_title", label: "Feature Title", type: "text", required: true },
      { name: "use_case", label: "Use Case", type: "text", required: true },
      { name: "current_workaround", label: "Current Workaround", type: "text", required: false },
      { name: "priority", label: "Priority", type: "select", required: true, options: ["Nice to Have", "Important", "Critical"] },
    ],
    exampleInput:
      "Hey team, love the product but we desperately need a way to set recurring schedules on report generation. Right now our ops manager Danielle Kim (danielle.k@freshproduce.co) manually kicks off the same five reports every Monday morning. It takes her about an hour each week. If you could add even a basic cron-style scheduler we'd upgrade to the enterprise plan immediately.",
    exampleOutput: [
      { label: "Requester Name", value: "Danielle Kim", confidence: 0.91 },
      { label: "Email", value: "danielle.k@freshproduce.co", confidence: 0.99 },
      { label: "Feature Title", value: "Recurring Report Schedule / Cron Scheduler", confidence: 0.93 },
      { label: "Use Case", value: "Automate five weekly reports currently generated manually every Monday morning", confidence: 0.95 },
      { label: "Current Workaround", value: "Ops manager manually triggers the same five reports each Monday, taking approximately one hour", confidence: 0.96 },
      { label: "Priority", value: "Important", confidence: 0.88 },
    ],
  },

  // ============================================================
  // SALES (5)
  // ============================================================
  {
    slug: "lead-intake",
    name: "Lead Intake",
    category: "sales",
    description:
      "Structure inbound leads from contact form submissions, emails, or chat messages into CRM-ready records.",
    longDescription:
      "Inbound leads arrive through a dozen channels and never in the same format. This template normalises everything into a clean lead record with contact details, company info, budget signals, and timeline, so your sales team can prioritize and route without manual data entry.",
    icon: "user-plus",
    fields: [
      { name: "contact_name", label: "Contact Name", type: "text", required: true },
      { name: "email", label: "Email", type: "email", required: true },
      { name: "company", label: "Company", type: "text", required: false },
      { name: "phone", label: "Phone", type: "phone", required: false },
      { name: "interest", label: "Product Interest", type: "text", required: true },
      { name: "budget_range", label: "Budget Range", type: "text", required: false },
      { name: "timeline", label: "Timeline", type: "text", required: false },
      { name: "source", label: "Lead Source", type: "select", required: false, options: ["Website", "Referral", "Event", "LinkedIn", "Cold Outreach", "Other"] },
    ],
    exampleInput:
      "Hi there, I'm Alex Drummond from Kinetic Retail (about 80 staff). We saw your platform at the NRF show in January and our Head of Digital mentioned your AI analytics tier. We're budgeting around $40-60k for analytics tooling this year and need something live before Black Friday. Best to reach me at alex.drummond@kineticretail.com or 415-209-3381.",
    exampleOutput: [
      { label: "Contact Name", value: "Alex Drummond", confidence: 0.99 },
      { label: "Email", value: "alex.drummond@kineticretail.com", confidence: 0.99 },
      { label: "Company", value: "Kinetic Retail (~80 staff)", confidence: 0.97 },
      { label: "Phone", value: "415-209-3381", confidence: 0.99 },
      { label: "Product Interest", value: "AI Analytics Tier", confidence: 0.94 },
      { label: "Budget Range", value: "$40,000 - $60,000 / year", confidence: 0.96 },
      { label: "Timeline", value: "Live before Black Friday 2026", confidence: 0.93 },
      { label: "Lead Source", value: "Event", confidence: 0.91 },
    ],
  },
  {
    slug: "demo-request",
    name: "Demo Request",
    category: "sales",
    description:
      "Parse demo request messages to capture attendee details, use case, and scheduling preferences.",
    longDescription:
      "Demo requests often include valuable qualifying information buried in casual language. This template extracts who wants the demo, how many attendees, the specific use case they want to see addressed, preferred dates, and any technical environment details that help your SE prepare a tailored demo instead of a generic walkthrough.",
    icon: "presentation",
    fields: [
      { name: "contact_name", label: "Contact Name", type: "text", required: true },
      { name: "email", label: "Email", type: "email", required: true },
      { name: "company", label: "Company", type: "text", required: false },
      { name: "role", label: "Role / Title", type: "text", required: false },
      { name: "use_case", label: "Use Case", type: "text", required: true },
      { name: "attendees", label: "Number of Attendees", type: "number", required: false },
      { name: "preferred_date", label: "Preferred Date", type: "text", required: false },
    ],
    exampleInput:
      "We're evaluating document management platforms and I'd like to get a demo set up for our legal ops team. There'll be four of us on the call, including our General Counsel. Main thing we want to see is how your redaction and version control works for M&A due diligence rooms. Any Thursday afternoon works for us. I'm Samira Osei, VP Legal Ops at Bridgeway Capital, samira.osei@bridgewaycap.com.",
    exampleOutput: [
      { label: "Contact Name", value: "Samira Osei", confidence: 0.99 },
      { label: "Email", value: "samira.osei@bridgewaycap.com", confidence: 0.99 },
      { label: "Company", value: "Bridgeway Capital", confidence: 0.98 },
      { label: "Role / Title", value: "VP Legal Ops", confidence: 0.99 },
      { label: "Use Case", value: "Redaction and version control for M&A due diligence rooms", confidence: 0.95 },
      { label: "Number of Attendees", value: "4", confidence: 0.99 },
      { label: "Preferred Date", value: "Any Thursday afternoon", confidence: 0.97 },
    ],
  },
  {
    slug: "quote-request",
    name: "Quote Request",
    category: "sales",
    description:
      "Extract quote requirements including specifications, quantities, delivery needs, and budget constraints.",
    longDescription:
      "Quote requests come with varying levels of detail, from a one-liner to a multi-paragraph spec. This template captures the product or service being quoted, quantities, specifications, delivery timeline, budget constraints, and any special requirements, giving your quoting team everything they need to respond accurately on the first pass.",
    icon: "calculator",
    fields: [
      { name: "contact_name", label: "Contact Name", type: "text", required: true },
      { name: "email", label: "Email", type: "email", required: true },
      { name: "company", label: "Company", type: "text", required: false },
      { name: "product_service", label: "Product / Service", type: "text", required: true },
      { name: "quantity", label: "Quantity", type: "text", required: false },
      { name: "specifications", label: "Specifications", type: "text", required: false },
      { name: "delivery_deadline", label: "Delivery Deadline", type: "text", required: false },
      { name: "budget_constraint", label: "Budget Constraint", type: "text", required: false },
    ],
    exampleInput:
      "Hello, I need a quote for 500 custom branded tote bags for our company offsite in August. Material should be organic cotton, 12oz, natural colour with a single-colour screen print of our logo on one side. Bags need to be 15x16 inches with a 4-inch gusset. We'd like to keep it under $8 per unit. Please send the quote to omar.reeves@trellisgroup.com. Thanks, Omar Reeves.",
    exampleOutput: [
      { label: "Contact Name", value: "Omar Reeves", confidence: 0.99 },
      { label: "Email", value: "omar.reeves@trellisgroup.com", confidence: 0.99 },
      { label: "Company", value: "Trellis Group", confidence: 0.89 },
      { label: "Product / Service", value: "Custom branded tote bags", confidence: 0.98 },
      { label: "Quantity", value: "500", confidence: 0.99 },
      { label: "Specifications", value: "Organic cotton, 12oz, natural colour, single-colour screen print, 15x16 inches, 4-inch gusset", confidence: 0.97 },
      { label: "Delivery Deadline", value: "August 2026 (company offsite)", confidence: 0.91 },
      { label: "Budget Constraint", value: "Under $8 per unit ($4,000 total)", confidence: 0.95 },
    ],
  },
  {
    slug: "partnership-inquiry",
    name: "Partnership Inquiry",
    category: "sales",
    description:
      "Structure inbound partnership proposals with company details, proposed collaboration, and mutual value.",
    longDescription:
      "Partnership inquiries range from vague LinkedIn messages to detailed proposals. This template extracts the proposing company, their audience or market, the specific partnership model they envision, what they bring to the table, and what they need from you, helping BD teams quickly assess fit and priority.",
    icon: "handshake",
    fields: [
      { name: "contact_name", label: "Contact Name", type: "text", required: true },
      { name: "email", label: "Email", type: "email", required: true },
      { name: "company", label: "Company", type: "text", required: true },
      { name: "company_url", label: "Company Website", type: "url", required: false },
      { name: "partnership_type", label: "Partnership Type", type: "select", required: true, options: ["Integration", "Reseller", "Co-Marketing", "White Label", "Referral", "Other"] },
      { name: "proposal_summary", label: "Proposal Summary", type: "text", required: true },
      { name: "audience_size", label: "Audience / Customer Base", type: "text", required: false },
    ],
    exampleInput:
      "Hey, I'm Lena Park from CloudStack (cloudstack.dev) and we have about 12,000 SMB customers using our deployment platform. We've had a ton of requests for built-in form handling and think an integration with Sift could be a great fit. Thinking either a native integration in our marketplace or potentially a white-label version for our enterprise tier. Happy to chat details at lena@cloudstack.dev.",
    exampleOutput: [
      { label: "Contact Name", value: "Lena Park", confidence: 0.99 },
      { label: "Email", value: "lena@cloudstack.dev", confidence: 0.99 },
      { label: "Company", value: "CloudStack", confidence: 0.99 },
      { label: "Company Website", value: "https://cloudstack.dev", confidence: 0.96 },
      { label: "Partnership Type", value: "Integration", confidence: 0.88 },
      { label: "Proposal Summary", value: "Native integration in CloudStack marketplace or white-label version for enterprise tier to serve form handling demand", confidence: 0.93 },
      { label: "Audience / Customer Base", value: "~12,000 SMB customers", confidence: 0.98 },
    ],
  },
  {
    slug: "rfp-response",
    name: "RFP Response",
    category: "sales",
    description:
      "Parse RFP requirements and evaluation criteria from procurement documents into structured fields.",
    longDescription:
      "RFPs are dense, jargon-heavy documents where key requirements hide in paragraphs of boilerplate. This template identifies the issuing organisation, submission deadline, budget envelope, mandatory requirements, evaluation criteria, and point of contact so your proposal team can build a response matrix without reading the whole document twice.",
    icon: "file-text",
    fields: [
      { name: "issuing_org", label: "Issuing Organisation", type: "text", required: true },
      { name: "contact_name", label: "Contact Name", type: "text", required: false },
      { name: "email", label: "Contact Email", type: "email", required: false },
      { name: "rfp_title", label: "RFP Title", type: "text", required: true },
      { name: "submission_deadline", label: "Submission Deadline", type: "date", required: true },
      { name: "budget_range", label: "Budget Range", type: "text", required: false },
      { name: "key_requirements", label: "Key Requirements", type: "text", required: true },
    ],
    exampleInput:
      "We're issuing RFP #2026-DT-041 for a city-wide digital forms platform to replace our current paper-based permitting system. The City of Ashland Public Works department needs a solution supporting at least 200 form types with conditional logic, e-signatures, and integration with our Tyler Munis ERP. Budget is $150-250k over 3 years. Submissions due by May 30, 2026 to procurement lead Diana Flores at dflores@ashlandor.gov.",
    exampleOutput: [
      { label: "Issuing Organisation", value: "City of Ashland Public Works Department", confidence: 0.97 },
      { label: "Contact Name", value: "Diana Flores", confidence: 0.99 },
      { label: "Contact Email", value: "dflores@ashlandor.gov", confidence: 0.99 },
      { label: "RFP Title", value: "City-Wide Digital Forms Platform (RFP #2026-DT-041)", confidence: 0.96 },
      { label: "Submission Deadline", value: "2026-05-30", confidence: 0.98 },
      { label: "Budget Range", value: "$150,000 - $250,000 over 3 years", confidence: 0.97 },
      { label: "Key Requirements", value: "200+ form types, conditional logic, e-signatures, Tyler Munis ERP integration, replace paper-based permitting", confidence: 0.94 },
    ],
  },

  // ============================================================
  // LEGAL (5)
  // ============================================================
  {
    slug: "legal-intake",
    name: "Legal Client Intake",
    category: "legal",
    description:
      "Extract client details, case type, and key facts from initial legal consultation messages.",
    longDescription:
      "Prospective clients describe their legal situation in their own words, mixing relevant facts with emotional context. This template extracts the client identity, area of law, key dates, adverse parties, and the specific outcome the client seeks, giving attorneys a structured intake sheet before the first consultation.",
    icon: "scale",
    fields: [
      { name: "client_name", label: "Client Name", type: "text", required: true },
      { name: "email", label: "Email", type: "email", required: true },
      { name: "phone", label: "Phone", type: "phone", required: false },
      { name: "case_type", label: "Case Type", type: "select", required: true, options: ["Employment", "Family", "Personal Injury", "Business", "Real Estate", "Criminal", "Immigration", "Other"] },
      { name: "case_summary", label: "Case Summary", type: "text", required: true },
      { name: "adverse_party", label: "Adverse Party", type: "text", required: false },
      { name: "key_date", label: "Key Date / Deadline", type: "date", required: false },
      { name: "desired_outcome", label: "Desired Outcome", type: "text", required: false },
    ],
    exampleInput:
      "My name is Kevin Okafor and I was let go from Meridian Consulting on March 3rd after filing an internal harassment complaint two weeks earlier. They called it a restructuring but nobody else in my team was affected. I think this is retaliation and I want to explore my options. I'm at kevin.okafor77@proton.me or 312-555-0148. I believe there's a 180-day filing window with the EEOC.",
    exampleOutput: [
      { label: "Client Name", value: "Kevin Okafor", confidence: 0.99 },
      { label: "Email", value: "kevin.okafor77@proton.me", confidence: 0.99 },
      { label: "Phone", value: "312-555-0148", confidence: 0.99 },
      { label: "Case Type", value: "Employment", confidence: 0.98 },
      { label: "Case Summary", value: "Terminated from Meridian Consulting on March 3rd, two weeks after filing internal harassment complaint. Believes termination is retaliatory as no other team members were affected.", confidence: 0.96 },
      { label: "Adverse Party", value: "Meridian Consulting", confidence: 0.97 },
      { label: "Key Date / Deadline", value: "180 days from termination (EEOC filing window)", confidence: 0.89 },
      { label: "Desired Outcome", value: "Explore legal options for potential retaliation claim", confidence: 0.91 },
    ],
  },
  {
    slug: "contract-review",
    name: "Contract Review Request",
    category: "legal",
    description:
      "Parse contract review requests to capture document type, parties, key terms, and concerns.",
    longDescription:
      "Business teams send contract review requests to legal with varying levels of context. This template captures the contract type, counterparty, value, key terms of concern, deadline for execution, and any specific clauses the requestor wants scrutinised, helping legal teams triage and prioritize their review queue.",
    icon: "file-search",
    fields: [
      { name: "requester_name", label: "Requester Name", type: "text", required: true },
      { name: "email", label: "Email", type: "email", required: true },
      { name: "contract_type", label: "Contract Type", type: "select", required: true, options: ["SaaS Agreement", "NDA", "Employment", "Vendor / Supplier", "Lease", "Licensing", "Other"] },
      { name: "counterparty", label: "Counterparty", type: "text", required: true },
      { name: "contract_value", label: "Contract Value", type: "text", required: false },
      { name: "key_concerns", label: "Key Concerns", type: "text", required: true },
      { name: "execution_deadline", label: "Execution Deadline", type: "date", required: false },
    ],
    exampleInput:
      "Hi legal team, I'm Nadia Alvarez from procurement (nadia.a@ourdomain.com). We need a review of the master services agreement with DataPulse Inc before we sign. It's a 3-year deal worth about $480k. I'm worried about the data processing addendum since it references US-only hosting and we have EU customers. Also the liability cap seems unusually low at 1x annual fees. We need this signed by April 18th.",
    exampleOutput: [
      { label: "Requester Name", value: "Nadia Alvarez", confidence: 0.99 },
      { label: "Email", value: "nadia.a@ourdomain.com", confidence: 0.99 },
      { label: "Contract Type", value: "SaaS Agreement", confidence: 0.90 },
      { label: "Counterparty", value: "DataPulse Inc", confidence: 0.99 },
      { label: "Contract Value", value: "$480,000 over 3 years", confidence: 0.97 },
      { label: "Key Concerns", value: "Data processing addendum references US-only hosting (EU customer conflict); liability cap at 1x annual fees seems unusually low", confidence: 0.95 },
      { label: "Execution Deadline", value: "2026-04-18", confidence: 0.98 },
    ],
  },
  {
    slug: "compliance-report",
    name: "Compliance Report",
    category: "legal",
    description:
      "Structure compliance incident reports with regulation details, findings, and remediation steps.",
    longDescription:
      "Compliance teams describe findings in narrative form that needs to be broken into regulation, scope, severity, evidence, and remediation timeline for tracking and reporting. This template structures compliance observations into actionable records that feed directly into your GRC platform.",
    icon: "clipboard-check",
    fields: [
      { name: "reporter_name", label: "Reporter Name", type: "text", required: true },
      { name: "regulation", label: "Regulation / Standard", type: "text", required: true },
      { name: "finding_type", label: "Finding Type", type: "select", required: true, options: ["Non-Conformity", "Observation", "Opportunity for Improvement"] },
      { name: "finding_summary", label: "Finding Summary", type: "text", required: true },
      { name: "affected_department", label: "Affected Department", type: "text", required: false },
      { name: "severity", label: "Severity", type: "select", required: true, options: ["Low", "Medium", "High", "Critical"] },
      { name: "remediation_deadline", label: "Remediation Deadline", type: "date", required: false },
    ],
    exampleInput:
      "During our Q1 SOC 2 Type II prep, I found that the engineering team's AWS access keys haven't been rotated since November. This is a non-conformity against CC6.1 (logical access controls). Three service accounts still have root-level permissions that should have been scoped down after the January reorg. We need this fixed before the auditor arrives on April 25th. Filed by Tom Hensley.",
    exampleOutput: [
      { label: "Reporter Name", value: "Tom Hensley", confidence: 0.99 },
      { label: "Regulation / Standard", value: "SOC 2 Type II - CC6.1 (Logical Access Controls)", confidence: 0.96 },
      { label: "Finding Type", value: "Non-Conformity", confidence: 0.99 },
      { label: "Finding Summary", value: "AWS access keys not rotated since November; three service accounts retain root-level permissions that should have been scoped after January reorg", confidence: 0.97 },
      { label: "Affected Department", value: "Engineering", confidence: 0.98 },
      { label: "Severity", value: "High", confidence: 0.93 },
      { label: "Remediation Deadline", value: "2026-04-25", confidence: 0.95 },
    ],
  },
  {
    slug: "ip-filing",
    name: "IP Filing Request",
    category: "legal",
    description:
      "Extract intellectual property filing details including invention description, inventors, and prior art.",
    longDescription:
      "Inventors and product teams describe their innovations in conversational language that needs to be mapped to formal IP filing fields. This template captures the invention title, description, named inventors, priority dates, prior art references, and filing jurisdiction, accelerating the path from idea to provisional filing.",
    icon: "badge",
    fields: [
      { name: "primary_inventor", label: "Primary Inventor", type: "text", required: true },
      { name: "email", label: "Email", type: "email", required: true },
      { name: "invention_title", label: "Invention Title", type: "text", required: true },
      { name: "invention_description", label: "Invention Description", type: "text", required: true },
      { name: "filing_type", label: "Filing Type", type: "select", required: true, options: ["Provisional Patent", "Utility Patent", "Design Patent", "Trademark", "Copyright"] },
      { name: "prior_art", label: "Known Prior Art", type: "text", required: false },
      { name: "jurisdiction", label: "Jurisdiction", type: "text", required: false },
    ],
    exampleInput:
      "I want to file a provisional patent for our new method of real-time form field prediction using transformer attention patterns on partial user input. We've built a working prototype and it's novel because existing autocomplete systems use n-gram models, not attention-weighted contextual prediction. I'm the lead inventor, Dr. Yuki Tanaka (y.tanaka@siftlabs.ai). We should also name Marco Pellegrini from the ML team. Filing in US first, then PCT. Prior art is mostly Google's Smart Compose paper from 2019 and the TabNet architecture.",
    exampleOutput: [
      { label: "Primary Inventor", value: "Dr. Yuki Tanaka", confidence: 0.99 },
      { label: "Email", value: "y.tanaka@siftlabs.ai", confidence: 0.99 },
      { label: "Invention Title", value: "Real-Time Form Field Prediction Using Transformer Attention Patterns on Partial User Input", confidence: 0.94 },
      { label: "Invention Description", value: "Method using transformer attention patterns to predict form field values from partial user input in real time, as opposed to existing n-gram autocomplete approaches", confidence: 0.92 },
      { label: "Filing Type", value: "Provisional Patent", confidence: 0.99 },
      { label: "Known Prior Art", value: "Google Smart Compose (2019), TabNet architecture", confidence: 0.96 },
      { label: "Jurisdiction", value: "US (initial), then PCT international", confidence: 0.95 },
    ],
  },
  {
    slug: "dispute-resolution",
    name: "Dispute Resolution",
    category: "legal",
    description:
      "Structure dispute details including parties, claims, evidence, and preferred resolution method.",
    longDescription:
      "Disputes arrive as one-sided narratives packed with grievances and demands. This template separates the parties, the factual claims, the monetary amounts, the evidence each side references, and the preferred resolution path (mediation, arbitration, litigation), giving dispute resolution teams a balanced starting framework.",
    icon: "gavel",
    fields: [
      { name: "claimant_name", label: "Claimant Name", type: "text", required: true },
      { name: "email", label: "Email", type: "email", required: true },
      { name: "respondent", label: "Respondent", type: "text", required: true },
      { name: "dispute_type", label: "Dispute Type", type: "select", required: true, options: ["Contract Breach", "Payment", "Service Failure", "Employment", "Property", "Other"] },
      { name: "claim_summary", label: "Claim Summary", type: "text", required: true },
      { name: "amount_in_dispute", label: "Amount in Dispute", type: "text", required: false },
      { name: "preferred_resolution", label: "Preferred Resolution", type: "select", required: true, options: ["Mediation", "Arbitration", "Litigation", "Negotiation"] },
    ],
    exampleInput:
      "I'm Rosa Gutierrez (r.gutierrez@vistamktg.com) and I'm filing a dispute against Crescent Digital. We contracted them to deliver a new website by January 15th with a fixed price of $75,000. They missed the deadline by six weeks, delivered a site full of broken features, and are now demanding the final $25,000 payment. We've withheld it and want to negotiate a partial refund of the $50,000 already paid. We'd prefer mediation but will escalate if necessary.",
    exampleOutput: [
      { label: "Claimant Name", value: "Rosa Gutierrez", confidence: 0.99 },
      { label: "Email", value: "r.gutierrez@vistamktg.com", confidence: 0.99 },
      { label: "Respondent", value: "Crescent Digital", confidence: 0.99 },
      { label: "Dispute Type", value: "Contract Breach", confidence: 0.95 },
      { label: "Claim Summary", value: "Contracted $75k website delivery by Jan 15; six weeks late with broken features. Withheld final $25k and seeking partial refund of $50k already paid.", confidence: 0.96 },
      { label: "Amount in Dispute", value: "$75,000 (seeking partial refund of $50,000 paid + withholding $25,000 final payment)", confidence: 0.93 },
      { label: "Preferred Resolution", value: "Mediation", confidence: 0.97 },
    ],
  },

  // ============================================================
  // HEALTHCARE (5)
  // ============================================================
  {
    slug: "patient-intake",
    name: "Patient Intake",
    category: "healthcare",
    description:
      "Parse patient information, medical history, and current concerns from intake messages.",
    longDescription:
      "Patients describe their health situation in their own words before appointments. This template extracts demographics, chief complaint, relevant medical history, current medications, allergies, and insurance information from natural language, pre-populating the intake form so clinical staff can verify rather than transcribe.",
    icon: "user-round",
    fields: [
      { name: "patient_name", label: "Patient Name", type: "text", required: true },
      { name: "date_of_birth", label: "Date of Birth", type: "date", required: true },
      { name: "phone", label: "Phone", type: "phone", required: true },
      { name: "chief_complaint", label: "Chief Complaint", type: "text", required: true },
      { name: "current_medications", label: "Current Medications", type: "text", required: false },
      { name: "allergies", label: "Known Allergies", type: "text", required: false },
      { name: "insurance_provider", label: "Insurance Provider", type: "text", required: false },
    ],
    exampleInput:
      "I'm calling to set up a new patient visit. My name is David Moreno, born June 12, 1983. I've been having persistent lower back pain for about three months, worse in the mornings. I take metformin for Type 2 diabetes and lisinopril for blood pressure. Allergic to sulfa drugs. My insurance is through Blue Cross PPO. Best number is 858-443-2190.",
    exampleOutput: [
      { label: "Patient Name", value: "David Moreno", confidence: 0.99 },
      { label: "Date of Birth", value: "1983-06-12", confidence: 0.98 },
      { label: "Phone", value: "858-443-2190", confidence: 0.99 },
      { label: "Chief Complaint", value: "Persistent lower back pain for 3 months, worse in mornings", confidence: 0.97 },
      { label: "Current Medications", value: "Metformin (Type 2 diabetes), Lisinopril (blood pressure)", confidence: 0.98 },
      { label: "Known Allergies", value: "Sulfa drugs", confidence: 0.99 },
      { label: "Insurance Provider", value: "Blue Cross PPO", confidence: 0.97 },
    ],
  },
  {
    slug: "referral",
    name: "Patient Referral",
    category: "healthcare",
    description:
      "Extract referral details including referring provider, patient info, and clinical reason.",
    longDescription:
      "Referral letters from primary care to specialists contain critical clinical context that often gets lost in fax-and-phone workflows. This template captures the referring provider, patient demographics, clinical indication, relevant test results, urgency level, and any specific specialist or facility requested.",
    icon: "arrow-right-left",
    fields: [
      { name: "patient_name", label: "Patient Name", type: "text", required: true },
      { name: "date_of_birth", label: "Date of Birth", type: "date", required: true },
      { name: "referring_provider", label: "Referring Provider", type: "text", required: true },
      { name: "referring_facility", label: "Referring Facility", type: "text", required: false },
      { name: "specialist_type", label: "Specialist Type", type: "text", required: true },
      { name: "clinical_reason", label: "Clinical Reason", type: "text", required: true },
      { name: "urgency", label: "Urgency", type: "select", required: true, options: ["Routine", "Urgent", "Emergent"] },
    ],
    exampleInput:
      "Dr. Sarah Lehman at Pine Valley Family Medicine is referring patient Margaret Cho (DOB 11/28/1971) to a gastroenterologist. Mrs. Cho has had unexplained weight loss of 15 lbs over 4 months with intermittent abdominal pain and a family history of colon cancer. Recent CBC was normal but FOB was positive. We'd like her seen within two weeks if possible.",
    exampleOutput: [
      { label: "Patient Name", value: "Margaret Cho", confidence: 0.99 },
      { label: "Date of Birth", value: "1971-11-28", confidence: 0.98 },
      { label: "Referring Provider", value: "Dr. Sarah Lehman", confidence: 0.99 },
      { label: "Referring Facility", value: "Pine Valley Family Medicine", confidence: 0.98 },
      { label: "Specialist Type", value: "Gastroenterologist", confidence: 0.99 },
      { label: "Clinical Reason", value: "Unexplained 15lb weight loss over 4 months, intermittent abdominal pain, positive FOB, family history of colon cancer", confidence: 0.97 },
      { label: "Urgency", value: "Urgent", confidence: 0.94 },
    ],
  },
  {
    slug: "prescription-refill",
    name: "Prescription Refill",
    category: "healthcare",
    description:
      "Parse prescription refill requests capturing medication, dosage, pharmacy, and prescriber details.",
    longDescription:
      "Patients call or message requesting refills using brand names, generic names, or descriptions of the pill itself. This template identifies the medication, dosage, quantity, prescribing doctor, preferred pharmacy, and any reported issues with the current prescription, streamlining the refill authorization process.",
    icon: "pill",
    fields: [
      { name: "patient_name", label: "Patient Name", type: "text", required: true },
      { name: "date_of_birth", label: "Date of Birth", type: "date", required: true },
      { name: "medication_name", label: "Medication Name", type: "text", required: true },
      { name: "dosage", label: "Dosage", type: "text", required: true },
      { name: "prescribing_doctor", label: "Prescribing Doctor", type: "text", required: false },
      { name: "pharmacy", label: "Preferred Pharmacy", type: "text", required: false },
      { name: "refills_remaining", label: "Refills Remaining", type: "number", required: false },
    ],
    exampleInput:
      "Hi, this is Janet Wu, date of birth March 3rd 1968. I need to refill my atorvastatin 40mg. Dr. Patel prescribed it and I usually pick up at the CVS on Main Street in Brookfield. I think I'm out of refills on this one so it might need a new authorization. I take one tablet at bedtime.",
    exampleOutput: [
      { label: "Patient Name", value: "Janet Wu", confidence: 0.99 },
      { label: "Date of Birth", value: "1968-03-03", confidence: 0.97 },
      { label: "Medication Name", value: "Atorvastatin", confidence: 0.99 },
      { label: "Dosage", value: "40mg, one tablet at bedtime", confidence: 0.98 },
      { label: "Prescribing Doctor", value: "Dr. Patel", confidence: 0.98 },
      { label: "Preferred Pharmacy", value: "CVS on Main Street, Brookfield", confidence: 0.96 },
      { label: "Refills Remaining", value: "0 (needs new authorization)", confidence: 0.88 },
    ],
  },
  {
    slug: "symptom-report",
    name: "Symptom Report",
    category: "healthcare",
    description:
      "Structure patient symptom descriptions including onset, severity, triggers, and associated symptoms.",
    longDescription:
      "Patients describe symptoms using colloquial language, tangential details, and inconsistent timelines. This template extracts the primary symptom, onset date, severity rating, aggravating and relieving factors, associated symptoms, and self-treatment attempts, giving clinicians a structured pre-visit summary.",
    icon: "stethoscope",
    fields: [
      { name: "patient_name", label: "Patient Name", type: "text", required: true },
      { name: "primary_symptom", label: "Primary Symptom", type: "text", required: true },
      { name: "onset_date", label: "Onset Date", type: "text", required: true },
      { name: "severity", label: "Severity (1-10)", type: "number", required: true, validation: { min: 1, max: 10 } },
      { name: "triggers", label: "Triggers / Aggravating Factors", type: "text", required: false },
      { name: "associated_symptoms", label: "Associated Symptoms", type: "text", required: false },
      { name: "self_treatment", label: "Self-Treatment Attempted", type: "text", required: false },
    ],
    exampleInput:
      "I'm Ahmed Rashid and I've been getting these crushing headaches behind my right eye for about two weeks. They come on mostly in the late afternoon, maybe a 7 out of 10 pain level. Sometimes I get nauseous with it and light makes it worse. I've tried ibuprofen and it takes the edge off for a few hours but doesn't get rid of it. I also noticed my right eye gets watery when the headache is bad.",
    exampleOutput: [
      { label: "Patient Name", value: "Ahmed Rashid", confidence: 0.99 },
      { label: "Primary Symptom", value: "Crushing headaches behind right eye", confidence: 0.98 },
      { label: "Onset Date", value: "Approximately 2 weeks ago", confidence: 0.93 },
      { label: "Severity (1-10)", value: "7", confidence: 0.99 },
      { label: "Triggers / Aggravating Factors", value: "Late afternoon onset, light sensitivity", confidence: 0.94 },
      { label: "Associated Symptoms", value: "Nausea, photosensitivity, right eye lacrimation (watering)", confidence: 0.96 },
      { label: "Self-Treatment Attempted", value: "Ibuprofen (partial temporary relief, a few hours)", confidence: 0.97 },
    ],
  },
  {
    slug: "appointment-request",
    name: "Appointment Request",
    category: "healthcare",
    description:
      "Extract appointment scheduling details including provider preference, reason, and availability.",
    longDescription:
      "Patients request appointments through portals, voicemail, and email with wildly different levels of detail. This template captures the patient identity, preferred provider, visit reason, scheduling preferences, and any urgency indicators, enabling scheduling staff to book appropriate appointment types and durations without callbacks.",
    icon: "calendar-check",
    fields: [
      { name: "patient_name", label: "Patient Name", type: "text", required: true },
      { name: "phone", label: "Phone", type: "phone", required: true },
      { name: "preferred_provider", label: "Preferred Provider", type: "text", required: false },
      { name: "visit_reason", label: "Visit Reason", type: "text", required: true },
      { name: "appointment_type", label: "Appointment Type", type: "select", required: true, options: ["New Patient", "Follow-Up", "Annual Physical", "Urgent", "Telehealth"] },
      { name: "preferred_times", label: "Preferred Times", type: "text", required: false },
      { name: "is_urgent", label: "Urgent", type: "boolean", required: true },
    ],
    exampleInput:
      "This is Lisa Brennan, 617-224-8903. I need a follow-up with Dr. Navarro about my thyroid levels. My last bloodwork from two weeks ago showed my TSH was high again so she wanted to see me to adjust my levothyroxine. Not urgent but I'd like to get in within the next couple of weeks. Mornings work best, ideally before 10am on a Tuesday or Wednesday.",
    exampleOutput: [
      { label: "Patient Name", value: "Lisa Brennan", confidence: 0.99 },
      { label: "Phone", value: "617-224-8903", confidence: 0.99 },
      { label: "Preferred Provider", value: "Dr. Navarro", confidence: 0.99 },
      { label: "Visit Reason", value: "Follow-up on elevated TSH levels to adjust levothyroxine dosage", confidence: 0.96 },
      { label: "Appointment Type", value: "Follow-Up", confidence: 0.98 },
      { label: "Preferred Times", value: "Mornings before 10am, Tuesdays or Wednesdays, within next 2 weeks", confidence: 0.95 },
      { label: "Urgent", value: "No", confidence: 0.97 },
    ],
  },

  // ============================================================
  // INSURANCE (5)
  // ============================================================
  {
    slug: "insurance-claim",
    name: "Insurance Claim",
    category: "insurance",
    description:
      "Parse insurance claim submissions including incident details, damages, and supporting documentation.",
    longDescription:
      "Policyholders report claims in emotional, disorganised narratives that mix critical facts with irrelevant detail. This template extracts the policy number, incident date and location, description of loss, estimated damages, and any third parties involved, creating a structured first notice of loss that adjusters can immediately work with.",
    icon: "file-warning",
    fields: [
      { name: "policyholder_name", label: "Policyholder Name", type: "text", required: true },
      { name: "policy_number", label: "Policy Number", type: "text", required: true },
      { name: "email", label: "Email", type: "email", required: true },
      { name: "incident_date", label: "Incident Date", type: "date", required: true },
      { name: "incident_description", label: "Incident Description", type: "text", required: true },
      { name: "estimated_damages", label: "Estimated Damages", type: "text", required: false },
      { name: "third_parties", label: "Third Parties Involved", type: "text", required: false },
      { name: "police_report", label: "Police Report Filed", type: "boolean", required: false },
    ],
    exampleInput:
      "I need to file a claim. A tree branch fell on my car during the storm on March 22nd in my driveway. I'm Brian Kessler, policy HO-4482917. The windshield is completely shattered and the roof has a huge dent. I got a preliminary estimate from Caliber Collision for $4,200. No other vehicles or people involved, didn't file a police report since it was weather-related. Email is b.kessler@outlook.com.",
    exampleOutput: [
      { label: "Policyholder Name", value: "Brian Kessler", confidence: 0.99 },
      { label: "Policy Number", value: "HO-4482917", confidence: 0.99 },
      { label: "Email", value: "b.kessler@outlook.com", confidence: 0.99 },
      { label: "Incident Date", value: "2026-03-22", confidence: 0.98 },
      { label: "Incident Description", value: "Tree branch fell on car during storm while parked in driveway. Windshield shattered and roof dented.", confidence: 0.97 },
      { label: "Estimated Damages", value: "$4,200 (preliminary estimate from Caliber Collision)", confidence: 0.98 },
      { label: "Third Parties Involved", value: "None", confidence: 0.97 },
      { label: "Police Report Filed", value: "No", confidence: 0.98 },
    ],
  },
  {
    slug: "policy-change",
    name: "Policy Change Request",
    category: "insurance",
    description:
      "Extract policy modification requests including coverage changes, address updates, and vehicle additions.",
    longDescription:
      "Policyholders request changes for dozens of reasons: new address, new vehicle, added driver, coverage adjustment, payment method switch. This template identifies the policy, the specific change requested, the effective date, and any supporting details, so underwriters can process changes without extended phone calls.",
    icon: "settings",
    fields: [
      { name: "policyholder_name", label: "Policyholder Name", type: "text", required: true },
      { name: "policy_number", label: "Policy Number", type: "text", required: true },
      { name: "email", label: "Email", type: "email", required: true },
      { name: "change_type", label: "Change Type", type: "select", required: true, options: ["Address", "Vehicle", "Driver", "Coverage", "Payment", "Cancellation", "Other"] },
      { name: "change_details", label: "Change Details", type: "text", required: true },
      { name: "effective_date", label: "Effective Date", type: "date", required: false },
    ],
    exampleInput:
      "Hi, I'm Theresa Flanagan on policy AU-7739201. I just bought a 2026 Honda CR-V Hybrid (VIN: 2HKRW2H50RH604817) and need to add it to my auto policy. I'm also removing the 2019 Civic that I traded in. I'd like coverage to start April 10th. My email is tflanagan@comcast.net and I want the same comprehensive and collision levels as my other vehicle.",
    exampleOutput: [
      { label: "Policyholder Name", value: "Theresa Flanagan", confidence: 0.99 },
      { label: "Policy Number", value: "AU-7739201", confidence: 0.99 },
      { label: "Email", value: "tflanagan@comcast.net", confidence: 0.99 },
      { label: "Change Type", value: "Vehicle", confidence: 0.98 },
      { label: "Change Details", value: "Add 2026 Honda CR-V Hybrid (VIN: 2HKRW2H50RH604817) with same comprehensive/collision coverage; remove 2019 Civic (traded in)", confidence: 0.96 },
      { label: "Effective Date", value: "2026-04-10", confidence: 0.99 },
    ],
  },
  {
    slug: "coverage-inquiry",
    name: "Coverage Inquiry",
    category: "insurance",
    description:
      "Parse coverage questions to identify the scenario, policy type, and specific coverage concern.",
    longDescription:
      "Policyholders ask whether they are covered for specific scenarios using hypothetical or real situations. This template extracts the policy reference, the scenario being asked about, the specific coverage type in question, and any time-sensitive factors, enabling agents to pull up the right policy sections and respond accurately.",
    icon: "help-circle",
    fields: [
      { name: "policyholder_name", label: "Policyholder Name", type: "text", required: true },
      { name: "policy_number", label: "Policy Number", type: "text", required: false },
      { name: "email", label: "Email", type: "email", required: true },
      { name: "scenario", label: "Scenario", type: "text", required: true },
      { name: "coverage_type", label: "Coverage Type", type: "select", required: false, options: ["Auto", "Home", "Health", "Life", "Business", "Travel", "Other"] },
      { name: "time_sensitive", label: "Time Sensitive", type: "boolean", required: true },
    ],
    exampleInput:
      "I'm Elena Vasquez, policy HB-3320157, elena.v@yahoo.com. My basement flooded last night from a burst pipe and there's about two inches of standing water. I'm wondering if my homeowner's policy covers the water damage and whether I need to use one of your preferred restoration companies or if I can call my own. This is pretty urgent since the water is still sitting there.",
    exampleOutput: [
      { label: "Policyholder Name", value: "Elena Vasquez", confidence: 0.99 },
      { label: "Policy Number", value: "HB-3320157", confidence: 0.99 },
      { label: "Email", value: "elena.v@yahoo.com", confidence: 0.99 },
      { label: "Scenario", value: "Basement flooding from burst pipe with 2 inches of standing water. Asking about water damage coverage and whether preferred vs own restoration company is required.", confidence: 0.96 },
      { label: "Coverage Type", value: "Home", confidence: 0.98 },
      { label: "Time Sensitive", value: "Yes", confidence: 0.97 },
    ],
  },
  {
    slug: "damage-assessment",
    name: "Damage Assessment",
    category: "insurance",
    description:
      "Structure property or vehicle damage descriptions with location, extent, cause, and estimated costs.",
    longDescription:
      "Adjusters and policyholders describe damage in varied detail levels. This template captures the property or vehicle identification, damage cause, affected areas, severity classification, repair estimates, and whether the property is still usable or habitable, providing a structured assessment that feeds directly into claims processing.",
    icon: "scan-search",
    fields: [
      { name: "assessor_name", label: "Assessor / Reporter Name", type: "text", required: true },
      { name: "claim_number", label: "Claim Number", type: "text", required: true },
      { name: "property_address", label: "Property / Vehicle ID", type: "text", required: true },
      { name: "damage_cause", label: "Damage Cause", type: "text", required: true },
      { name: "affected_areas", label: "Affected Areas", type: "text", required: true },
      { name: "severity", label: "Severity", type: "select", required: true, options: ["Minor", "Moderate", "Major", "Total Loss"] },
      { name: "estimated_repair_cost", label: "Estimated Repair Cost", type: "text", required: false },
      { name: "habitable_usable", label: "Habitable / Usable", type: "boolean", required: true },
    ],
    exampleInput:
      "Field assessment for claim CL-20260401-882. The property at 45 Birchwood Lane, Stamford CT was impacted by the March 30th hailstorm. I'm the adjuster, Rick Donovan. The roof has significant granule loss across roughly 60% of the south-facing slope with three penetration points. Gutters on the south and east sides are crushed. Two skylights are cracked. Siding damage is cosmetic only. Preliminary repair estimate is $18,500. The home is still habitable but I'd classify this as moderate to major damage.",
    exampleOutput: [
      { label: "Assessor / Reporter Name", value: "Rick Donovan", confidence: 0.99 },
      { label: "Claim Number", value: "CL-20260401-882", confidence: 0.99 },
      { label: "Property / Vehicle ID", value: "45 Birchwood Lane, Stamford, CT", confidence: 0.99 },
      { label: "Damage Cause", value: "Hailstorm (March 30th)", confidence: 0.98 },
      { label: "Affected Areas", value: "Roof (60% granule loss south slope, 3 penetration points), gutters (south and east crushed), 2 skylights cracked, cosmetic siding damage", confidence: 0.96 },
      { label: "Severity", value: "Major", confidence: 0.91 },
      { label: "Estimated Repair Cost", value: "$18,500", confidence: 0.99 },
      { label: "Habitable / Usable", value: "Yes", confidence: 0.98 },
    ],
  },
  {
    slug: "beneficiary-update",
    name: "Beneficiary Update",
    category: "insurance",
    description:
      "Parse beneficiary change requests with new designee details, relationship, and allocation percentages.",
    longDescription:
      "Life events trigger beneficiary changes that policyholders communicate informally. This template extracts the policy reference, current beneficiary being replaced, new beneficiary details including relationship and allocation percentage, and the triggering event, ensuring accurate updates without back-and-forth clarification.",
    icon: "users",
    fields: [
      { name: "policyholder_name", label: "Policyholder Name", type: "text", required: true },
      { name: "policy_number", label: "Policy Number", type: "text", required: true },
      { name: "email", label: "Email", type: "email", required: true },
      { name: "new_beneficiary_name", label: "New Beneficiary Name", type: "text", required: true },
      { name: "relationship", label: "Relationship", type: "text", required: true },
      { name: "allocation_percentage", label: "Allocation Percentage", type: "number", required: true, validation: { min: 1, max: 100 } },
      { name: "reason_for_change", label: "Reason for Change", type: "text", required: false },
    ],
    exampleInput:
      "I need to update the beneficiary on my life insurance policy LI-5501288. I'm George Nakamura, george.nakamura@icloud.com. I recently remarried and want to change my primary beneficiary from my ex-wife to my current wife, Linda Nakamura. She should receive 100% as sole primary beneficiary. Her date of birth is August 14, 1980 and her SSN ends in 4472.",
    exampleOutput: [
      { label: "Policyholder Name", value: "George Nakamura", confidence: 0.99 },
      { label: "Policy Number", value: "LI-5501288", confidence: 0.99 },
      { label: "Email", value: "george.nakamura@icloud.com", confidence: 0.99 },
      { label: "New Beneficiary Name", value: "Linda Nakamura", confidence: 0.99 },
      { label: "Relationship", value: "Spouse (current wife)", confidence: 0.98 },
      { label: "Allocation Percentage", value: "100", confidence: 0.99 },
      { label: "Reason for Change", value: "Remarriage; replacing ex-wife as primary beneficiary", confidence: 0.95 },
    ],
  },

  // ============================================================
  // HR (5)
  // ============================================================
  {
    slug: "job-application",
    name: "Job Application",
    category: "hr",
    description:
      "Extract candidate details, experience, and qualifications from unstructured application messages.",
    longDescription:
      "Candidates apply through email, LinkedIn messages, and referral introductions with wildly different formats. This template pulls out name, contact info, target role, years of experience, key skills, availability, and salary expectations, creating a standardised candidate record for your ATS without manual data entry.",
    icon: "briefcase",
    fields: [
      { name: "candidate_name", label: "Candidate Name", type: "text", required: true },
      { name: "email", label: "Email", type: "email", required: true },
      { name: "phone", label: "Phone", type: "phone", required: false },
      { name: "target_role", label: "Target Role", type: "text", required: true },
      { name: "years_experience", label: "Years of Experience", type: "number", required: false },
      { name: "key_skills", label: "Key Skills", type: "text", required: true },
      { name: "availability", label: "Availability", type: "text", required: false },
      { name: "salary_expectation", label: "Salary Expectation", type: "text", required: false },
    ],
    exampleInput:
      "Hi, I saw the Senior Product Designer posting on your careers page and I'd love to throw my hat in. I'm Chloe Everett, 8 years in product design with a focus on B2B SaaS. I've led design systems at two scale-ups and I'm proficient in Figma, prototyping, and user research. Currently wrapping up a contract that ends May 1st so I could start mid-May. Looking for something in the $140-160k range. Email is chloe.e.design@gmail.com, phone 503-871-4422.",
    exampleOutput: [
      { label: "Candidate Name", value: "Chloe Everett", confidence: 0.99 },
      { label: "Email", value: "chloe.e.design@gmail.com", confidence: 0.99 },
      { label: "Phone", value: "503-871-4422", confidence: 0.99 },
      { label: "Target Role", value: "Senior Product Designer", confidence: 0.99 },
      { label: "Years of Experience", value: "8", confidence: 0.98 },
      { label: "Key Skills", value: "Product design (B2B SaaS), design systems leadership, Figma, prototyping, user research", confidence: 0.95 },
      { label: "Availability", value: "Mid-May 2026 (current contract ends May 1st)", confidence: 0.96 },
      { label: "Salary Expectation", value: "$140,000 - $160,000", confidence: 0.98 },
    ],
  },
  {
    slug: "leave-request",
    name: "Leave Request",
    category: "hr",
    description:
      "Parse employee leave requests capturing dates, type, reason, and coverage arrangements.",
    longDescription:
      "Employees request time off through chat, email, and informal messages that mix dates, reasons, and coverage plans. This template extracts the employee identity, leave type, exact dates, reason, whether coverage has been arranged, and any partial-day details, feeding directly into your HRIS leave management module.",
    icon: "calendar-off",
    fields: [
      { name: "employee_name", label: "Employee Name", type: "text", required: true },
      { name: "email", label: "Email", type: "email", required: true },
      { name: "leave_type", label: "Leave Type", type: "select", required: true, options: ["Annual Leave", "Sick Leave", "Personal", "Bereavement", "Parental", "Jury Duty", "Other"] },
      { name: "start_date", label: "Start Date", type: "date", required: true },
      { name: "end_date", label: "End Date", type: "date", required: true },
      { name: "reason", label: "Reason", type: "text", required: false },
      { name: "coverage_arranged", label: "Coverage Arranged", type: "boolean", required: true },
    ],
    exampleInput:
      "Hi manager, I need to take bereavement leave next week. My grandmother passed away on Sunday and the funeral is on Thursday in Portland. I'd like to take Tuesday April 8th through Friday April 11th. I've already spoken to Raj and he's agreed to cover my client calls while I'm out. Thanks, Nina Chowdhury (nina.c@company.com).",
    exampleOutput: [
      { label: "Employee Name", value: "Nina Chowdhury", confidence: 0.99 },
      { label: "Email", value: "nina.c@company.com", confidence: 0.99 },
      { label: "Leave Type", value: "Bereavement", confidence: 0.99 },
      { label: "Start Date", value: "2026-04-08", confidence: 0.97 },
      { label: "End Date", value: "2026-04-11", confidence: 0.97 },
      { label: "Reason", value: "Grandmother passed away; funeral in Portland on Thursday", confidence: 0.96 },
      { label: "Coverage Arranged", value: "Yes", confidence: 0.98 },
    ],
  },
  {
    slug: "expense-report",
    name: "Expense Report",
    category: "hr",
    description:
      "Extract expense details from informal submissions including amounts, categories, and business justification.",
    longDescription:
      "Employees submit expenses as email forwards, photos of receipts with captions, and rambling descriptions. This template captures the employee, expense date, category, amount, currency, business justification, and receipt availability, creating structured records that finance can approve without chasing details.",
    icon: "receipt",
    fields: [
      { name: "employee_name", label: "Employee Name", type: "text", required: true },
      { name: "email", label: "Email", type: "email", required: true },
      { name: "expense_date", label: "Expense Date", type: "date", required: true },
      { name: "category", label: "Category", type: "select", required: true, options: ["Travel", "Meals", "Software", "Equipment", "Training", "Client Entertainment", "Other"] },
      { name: "amount", label: "Amount", type: "text", required: true },
      { name: "business_purpose", label: "Business Purpose", type: "text", required: true },
      { name: "has_receipt", label: "Receipt Attached", type: "boolean", required: true },
    ],
    exampleInput:
      "Submitting expenses from the Chicago client visit last week. I'm Derek Olsen (derek.olsen@company.com). March 31st: flight to O'Hare $387, hotel at Hyatt Regency $224/night for two nights ($448 total), Uber from airport $42. Also took the client team out for dinner at Gibson's on April 1st, that was $312 for four people. I have receipts for everything except the Uber which I can pull from the app.",
    exampleOutput: [
      { label: "Employee Name", value: "Derek Olsen", confidence: 0.99 },
      { label: "Email", value: "derek.olsen@company.com", confidence: 0.99 },
      { label: "Expense Date", value: "2026-03-31 to 2026-04-01", confidence: 0.94 },
      { label: "Category", value: "Travel", confidence: 0.90 },
      { label: "Amount", value: "$1,189 total (flight $387, hotel $448, Uber $42, dinner $312)", confidence: 0.96 },
      { label: "Business Purpose", value: "Chicago client visit - travel, accommodation, and client dinner", confidence: 0.95 },
      { label: "Receipt Attached", value: "Yes", confidence: 0.88 },
    ],
  },
  {
    slug: "incident-report",
    name: "Workplace Incident Report",
    category: "hr",
    description:
      "Structure workplace incident reports with details on what happened, who was involved, and injuries.",
    longDescription:
      "Workplace incidents are reported in stressful moments with scattered details. This template extracts the reporter, date and location, what happened, who was involved, any injuries sustained, immediate actions taken, and witness information, creating compliant incident records from natural descriptions.",
    icon: "alert-triangle",
    fields: [
      { name: "reporter_name", label: "Reporter Name", type: "text", required: true },
      { name: "email", label: "Email", type: "email", required: true },
      { name: "incident_date", label: "Incident Date", type: "date", required: true },
      { name: "location", label: "Location", type: "text", required: true },
      { name: "description", label: "Incident Description", type: "text", required: true },
      { name: "injuries", label: "Injuries", type: "text", required: true },
      { name: "witnesses", label: "Witnesses", type: "text", required: false },
      { name: "immediate_action", label: "Immediate Action Taken", type: "text", required: false },
    ],
    exampleInput:
      "Reporting an incident from this morning around 9:15am in the warehouse loading bay at Building C. A forklift operated by Tony Marchetti clipped a stack of pallets which fell and struck a pedestrian worker, Sam Duggan. Sam has a bruised left shoulder and a cut on his forearm that needed first aid. Building security (Pete Lawson) and I were both present. We applied first aid and Sam declined to go to the ER. The area has been cordoned off. Reporting this as Carlos Medina, safety lead, c.medina@companyops.com.",
    exampleOutput: [
      { label: "Reporter Name", value: "Carlos Medina", confidence: 0.99 },
      { label: "Email", value: "c.medina@companyops.com", confidence: 0.99 },
      { label: "Incident Date", value: "2026-04-05", confidence: 0.89 },
      { label: "Location", value: "Warehouse loading bay, Building C", confidence: 0.98 },
      { label: "Incident Description", value: "Forklift operated by Tony Marchetti clipped pallet stack, which fell and struck pedestrian worker Sam Duggan at approximately 9:15am", confidence: 0.97 },
      { label: "Injuries", value: "Sam Duggan: bruised left shoulder, cut on left forearm (first aid administered, declined ER)", confidence: 0.96 },
      { label: "Witnesses", value: "Pete Lawson (building security), Carlos Medina (reporter)", confidence: 0.94 },
      { label: "Immediate Action Taken", value: "First aid applied, area cordoned off", confidence: 0.97 },
    ],
  },
  {
    slug: "onboarding-checklist",
    name: "Onboarding Checklist",
    category: "hr",
    description:
      "Extract new hire information for onboarding including equipment needs, access requirements, and start details.",
    longDescription:
      "Hiring managers communicate new starter details across emails and chat messages. This template consolidates the new hire name, role, start date, manager, equipment requirements, system access needs, and any special onboarding considerations into a structured checklist that IT, facilities, and HR can act on independently.",
    icon: "clipboard-list",
    fields: [
      { name: "new_hire_name", label: "New Hire Name", type: "text", required: true },
      { name: "email", label: "Personal Email", type: "email", required: true },
      { name: "role", label: "Role", type: "text", required: true },
      { name: "department", label: "Department", type: "text", required: true },
      { name: "start_date", label: "Start Date", type: "date", required: true },
      { name: "manager", label: "Reporting Manager", type: "text", required: true },
      { name: "equipment_needed", label: "Equipment Needed", type: "text", required: false },
      { name: "system_access", label: "System Access Required", type: "text", required: false },
    ],
    exampleInput:
      "Hey HR, we have a new joiner starting April 21st. Anika Petrova, she's coming in as a Data Engineer on the Platform team reporting to me (Jess Thornton). She'll need a MacBook Pro 16-inch with 64GB RAM, dual monitors, and access to Snowflake, Airflow, GitHub Enterprise, and our internal Jupyter hub. Her personal email for sending the offer paperwork is anika.petrova@proton.me. She's relocating from Austin so she might need a day or two to sort housing.",
    exampleOutput: [
      { label: "New Hire Name", value: "Anika Petrova", confidence: 0.99 },
      { label: "Personal Email", value: "anika.petrova@proton.me", confidence: 0.99 },
      { label: "Role", value: "Data Engineer", confidence: 0.99 },
      { label: "Department", value: "Platform", confidence: 0.96 },
      { label: "Start Date", value: "2026-04-21", confidence: 0.99 },
      { label: "Reporting Manager", value: "Jess Thornton", confidence: 0.97 },
      { label: "Equipment Needed", value: "MacBook Pro 16-inch (64GB RAM), dual monitors", confidence: 0.98 },
      { label: "System Access Required", value: "Snowflake, Airflow, GitHub Enterprise, internal Jupyter Hub", confidence: 0.97 },
    ],
  },

  // ============================================================
  // ENGINEERING (5)
  // ============================================================
  {
    slug: "bug-report",
    name: "Bug Report",
    category: "engineering",
    description:
      "Parse bug reports from users or QA into structured tickets with reproduction steps and severity.",
    longDescription:
      "Bug reports from users, QA, and internal teams arrive with wildly different quality and detail levels. This template extracts the component affected, steps to reproduce, expected vs actual behaviour, severity, environment details, and any error messages, turning messy reports into actionable tickets your engineering team can triage immediately.",
    icon: "bug",
    fields: [
      { name: "reporter_name", label: "Reporter", type: "text", required: true },
      { name: "component", label: "Component / Feature", type: "text", required: true },
      { name: "summary", label: "Bug Summary", type: "text", required: true },
      { name: "steps_to_reproduce", label: "Steps to Reproduce", type: "text", required: true },
      { name: "expected_behaviour", label: "Expected Behaviour", type: "text", required: false },
      { name: "actual_behaviour", label: "Actual Behaviour", type: "text", required: true },
      { name: "severity", label: "Severity", type: "select", required: true, options: ["Low", "Medium", "High", "Critical"] },
      { name: "environment", label: "Environment", type: "text", required: false },
    ],
    exampleInput:
      "Found a bad one in production. When a user submits a form with more than 20 fields, the extraction API returns a 504 timeout after about 30 seconds. Tried it three times with our enterprise demo form (the 24-field insurance intake). Works fine with shorter forms. Chrome 124 on macOS. The spinner just hangs and then shows a generic error message instead of the extracted data. This is blocking our sales demo tomorrow. Reported by Wei Zhang.",
    exampleOutput: [
      { label: "Reporter", value: "Wei Zhang", confidence: 0.99 },
      { label: "Component / Feature", value: "Extraction API", confidence: 0.96 },
      { label: "Bug Summary", value: "Extraction API returns 504 timeout on forms with more than 20 fields", confidence: 0.97 },
      { label: "Steps to Reproduce", value: "1. Submit a form with 20+ fields (e.g., 24-field insurance intake demo form). 2. Wait ~30 seconds. 3. Observe 504 timeout.", confidence: 0.93 },
      { label: "Expected Behaviour", value: "Extraction completes and returns structured data", confidence: 0.92 },
      { label: "Actual Behaviour", value: "Spinner hangs for 30 seconds, then 504 timeout with generic error message instead of extracted data", confidence: 0.97 },
      { label: "Severity", value: "Critical", confidence: 0.94 },
      { label: "Environment", value: "Production, Chrome 124, macOS", confidence: 0.96 },
    ],
  },
  {
    slug: "change-request",
    name: "Change Request",
    category: "engineering",
    description:
      "Structure change requests with scope, justification, risk assessment, and rollback plan.",
    longDescription:
      "Infrastructure and application changes need formal documentation for change advisory boards. This template captures the change description, business justification, affected systems, risk level, implementation window, rollback plan, and approvers needed, turning a Slack message into a proper change request record.",
    icon: "git-pull-request",
    fields: [
      { name: "requester_name", label: "Requester", type: "text", required: true },
      { name: "change_title", label: "Change Title", type: "text", required: true },
      { name: "change_description", label: "Change Description", type: "text", required: true },
      { name: "justification", label: "Business Justification", type: "text", required: true },
      { name: "affected_systems", label: "Affected Systems", type: "text", required: true },
      { name: "risk_level", label: "Risk Level", type: "select", required: true, options: ["Low", "Medium", "High"] },
      { name: "implementation_window", label: "Implementation Window", type: "text", required: true },
      { name: "rollback_plan", label: "Rollback Plan", type: "text", required: false },
    ],
    exampleInput:
      "Need to submit a change request for migrating the primary Postgres database from RDS db.r6g.xlarge to db.r6g.2xlarge. We've been hitting 85% CPU during peak hours and query latency is creeping up. The migration requires a brief maintenance window with about 6 minutes of downtime during the failover. Planning to do it Saturday April 12th between 2-4am ET. If anything goes wrong we can fail back to the old instance within 10 minutes since we're keeping it warm for 24 hours. Affects the main API, the analytics pipeline, and the webhook processor. Submitted by Maria Santos from the infrastructure team.",
    exampleOutput: [
      { label: "Requester", value: "Maria Santos", confidence: 0.99 },
      { label: "Change Title", value: "Postgres RDS instance upgrade (db.r6g.xlarge to db.r6g.2xlarge)", confidence: 0.95 },
      { label: "Change Description", value: "Migrate primary Postgres database from RDS db.r6g.xlarge to db.r6g.2xlarge with approximately 6 minutes downtime during failover", confidence: 0.97 },
      { label: "Business Justification", value: "85% CPU utilisation during peak hours with increasing query latency", confidence: 0.96 },
      { label: "Affected Systems", value: "Main API, analytics pipeline, webhook processor", confidence: 0.98 },
      { label: "Risk Level", value: "Medium", confidence: 0.91 },
      { label: "Implementation Window", value: "Saturday April 12th, 2:00-4:00am ET", confidence: 0.98 },
      { label: "Rollback Plan", value: "Fail back to old instance within 10 minutes; old instance kept warm for 24 hours", confidence: 0.97 },
    ],
  },
  {
    slug: "incident-postmortem",
    name: "Incident Postmortem",
    category: "engineering",
    description:
      "Structure incident postmortem narratives into timeline, root cause, impact, and action items.",
    longDescription:
      "Post-incident reviews produce lengthy narratives that need to be distilled into structured records for tracking and learning. This template captures the incident summary, timeline, root cause, customer impact, detection method, resolution steps, and follow-up action items, creating a consistent postmortem format across your engineering organisation.",
    icon: "file-clock",
    fields: [
      { name: "author_name", label: "Author", type: "text", required: true },
      { name: "incident_title", label: "Incident Title", type: "text", required: true },
      { name: "incident_date", label: "Incident Date", type: "date", required: true },
      { name: "duration", label: "Duration", type: "text", required: true },
      { name: "root_cause", label: "Root Cause", type: "text", required: true },
      { name: "impact", label: "Customer Impact", type: "text", required: true },
      { name: "severity", label: "Severity", type: "select", required: true, options: ["SEV1", "SEV2", "SEV3", "SEV4"] },
      { name: "action_items", label: "Action Items", type: "text", required: true },
    ],
    exampleInput:
      "Postmortem for the April 2nd checkout outage, written by Owen Park. At 14:22 UTC our payment processing started returning 500 errors. Root cause was a Stripe webhook handler that wasn't handling a new event type (payment_method.automatically_updated) introduced in Stripe API 2026-03-15. The unhandled event caused our webhook processor to crash-loop, which backed up the queue and eventually starved the checkout flow of payment confirmations. About 340 customers saw failed checkouts over 47 minutes. We detected it through PagerDuty when error rate exceeded 5%. Fixed by deploying a catch-all handler and reprocessing the queue. Need to add webhook event type validation, set up a Stripe API changelog monitor, and load test the webhook queue under backpressure.",
    exampleOutput: [
      { label: "Author", value: "Owen Park", confidence: 0.99 },
      { label: "Incident Title", value: "Checkout Outage - Stripe Webhook Handler Crash Loop", confidence: 0.93 },
      { label: "Incident Date", value: "2026-04-02", confidence: 0.99 },
      { label: "Duration", value: "47 minutes", confidence: 0.98 },
      { label: "Root Cause", value: "Unhandled Stripe webhook event type (payment_method.automatically_updated) from API 2026-03-15 caused webhook processor crash-loop, backing up queue and starving checkout flow", confidence: 0.97 },
      { label: "Customer Impact", value: "~340 customers experienced failed checkouts", confidence: 0.98 },
      { label: "Severity", value: "SEV2", confidence: 0.90 },
      { label: "Action Items", value: "1. Add webhook event type validation/catch-all. 2. Set up Stripe API changelog monitor. 3. Load test webhook queue under backpressure.", confidence: 0.95 },
    ],
  },
  {
    slug: "deployment-request",
    name: "Deployment Request",
    category: "engineering",
    description:
      "Parse deployment requests capturing version, environment, dependencies, and approval status.",
    longDescription:
      "Deployment requests arrive as Slack messages, emails, or PR descriptions with varying detail. This template captures the service and version being deployed, target environment, required dependencies, pre-deployment checks, deployment window, and whether required approvals are in place, standardising your release process.",
    icon: "rocket",
    fields: [
      { name: "requester_name", label: "Requester", type: "text", required: true },
      { name: "service_name", label: "Service Name", type: "text", required: true },
      { name: "version", label: "Version / Commit", type: "text", required: true },
      { name: "target_environment", label: "Target Environment", type: "select", required: true, options: ["Staging", "Production", "Canary"] },
      { name: "dependencies", label: "Dependencies", type: "text", required: false },
      { name: "deployment_window", label: "Deployment Window", type: "text", required: true },
      { name: "has_approval", label: "Approval Obtained", type: "boolean", required: true },
    ],
    exampleInput:
      "Ready to push extraction-service v2.14.0 (commit abc8f3e) to production. This includes the batch processing optimisation and the new confidence scoring model. Depends on the ML model registry update that Kai deployed yesterday to staging (model-registry v1.8.2 needs to be in prod first). Staging tests all green. I got sign-off from Jenn (engineering lead) and Priya (product). Planning to deploy during low-traffic window tonight between 11pm and midnight PT. Requested by Amir Hassan.",
    exampleOutput: [
      { label: "Requester", value: "Amir Hassan", confidence: 0.99 },
      { label: "Service Name", value: "extraction-service", confidence: 0.99 },
      { label: "Version / Commit", value: "v2.14.0 (abc8f3e)", confidence: 0.99 },
      { label: "Target Environment", value: "Production", confidence: 0.99 },
      { label: "Dependencies", value: "model-registry v1.8.2 must be deployed to production first (currently in staging)", confidence: 0.95 },
      { label: "Deployment Window", value: "Tonight 11:00pm - 12:00am PT", confidence: 0.97 },
      { label: "Approval Obtained", value: "Yes", confidence: 0.96 },
    ],
  },
  {
    slug: "security-vulnerability",
    name: "Security Vulnerability",
    category: "engineering",
    description:
      "Structure vulnerability reports with affected components, severity scoring, and remediation steps.",
    longDescription:
      "Security vulnerability reports come from automated scanners, penetration testers, and bug bounty researchers in vastly different formats. This template normalises them into affected component, vulnerability type, CVSS-style severity, attack vector, proof of concept, and recommended remediation, enabling your security team to triage and prioritize consistently.",
    icon: "shield-alert",
    fields: [
      { name: "reporter_name", label: "Reporter", type: "text", required: true },
      { name: "email", label: "Email", type: "email", required: true },
      { name: "vulnerability_type", label: "Vulnerability Type", type: "select", required: true, options: ["XSS", "SQL Injection", "SSRF", "IDOR", "Authentication Bypass", "Data Exposure", "CSRF", "RCE", "Other"] },
      { name: "affected_component", label: "Affected Component", type: "text", required: true },
      { name: "severity", label: "Severity", type: "select", required: true, options: ["Informational", "Low", "Medium", "High", "Critical"] },
      { name: "description", label: "Description", type: "text", required: true },
      { name: "remediation", label: "Recommended Remediation", type: "text", required: false },
    ],
    exampleInput:
      "Security report from Jake Underwood (jake@whitehatsec.io). I found an IDOR vulnerability in your API endpoint GET /api/v2/forms/:formId/submissions. By incrementing the formId parameter, an authenticated user can access submission data belonging to other organisations. I was able to read 15 other orgs' form submissions from my test account. No rate limiting on the endpoint either. This is high severity since it exposes PII. Recommend adding organisation-scoped authorisation checks on all resource endpoints and implementing rate limiting.",
    exampleOutput: [
      { label: "Reporter", value: "Jake Underwood", confidence: 0.99 },
      { label: "Email", value: "jake@whitehatsec.io", confidence: 0.99 },
      { label: "Vulnerability Type", value: "IDOR", confidence: 0.99 },
      { label: "Affected Component", value: "GET /api/v2/forms/:formId/submissions", confidence: 0.99 },
      { label: "Severity", value: "High", confidence: 0.96 },
      { label: "Description", value: "Authenticated users can access other organisations' form submissions by incrementing formId parameter. No rate limiting. PII exposure confirmed across 15 organisations from test account.", confidence: 0.97 },
      { label: "Recommended Remediation", value: "Add organisation-scoped authorisation checks on all resource endpoints; implement rate limiting", confidence: 0.95 },
    ],
  },

  // ============================================================
  // PROPERTY (5)
  // ============================================================
  {
    slug: "maintenance-request",
    name: "Maintenance Request",
    category: "property",
    description:
      "Parse tenant maintenance requests capturing unit, issue, urgency, and access instructions.",
    longDescription:
      "Tenants report maintenance issues through texts, emails, and portal messages with unpredictable detail levels. This template extracts the property and unit, issue description, urgency level, preferred scheduling, access instructions, and whether the issue affects habitability, routing requests to the right trade at the right priority.",
    icon: "wrench",
    fields: [
      { name: "tenant_name", label: "Tenant Name", type: "text", required: true },
      { name: "phone", label: "Phone", type: "phone", required: true },
      { name: "unit", label: "Unit / Address", type: "text", required: true },
      { name: "issue_description", label: "Issue Description", type: "text", required: true },
      { name: "urgency", label: "Urgency", type: "select", required: true, options: ["Low", "Medium", "High", "Emergency"] },
      { name: "preferred_schedule", label: "Preferred Schedule", type: "text", required: false },
      { name: "access_instructions", label: "Access Instructions", type: "text", required: false },
      { name: "affects_habitability", label: "Affects Habitability", type: "boolean", required: true },
    ],
    exampleInput:
      "Hi, this is Mariana Solano in unit 4B at Oakridge Apartments. The kitchen faucet has been dripping nonstop since yesterday morning and now there's a small puddle forming under the cabinet. Not an emergency yet but it's getting worse. I work from home so any weekday is fine for someone to come by. The spare key is in the lockbox by the back door, code 7742. My number is 469-330-8115.",
    exampleOutput: [
      { label: "Tenant Name", value: "Mariana Solano", confidence: 0.99 },
      { label: "Phone", value: "469-330-8115", confidence: 0.99 },
      { label: "Unit / Address", value: "Unit 4B, Oakridge Apartments", confidence: 0.99 },
      { label: "Issue Description", value: "Kitchen faucet dripping nonstop since yesterday, puddle forming under cabinet and worsening", confidence: 0.97 },
      { label: "Urgency", value: "Medium", confidence: 0.91 },
      { label: "Preferred Schedule", value: "Any weekday (tenant works from home)", confidence: 0.95 },
      { label: "Access Instructions", value: "Spare key in lockbox by back door, code 7742", confidence: 0.99 },
      { label: "Affects Habitability", value: "No", confidence: 0.89 },
    ],
  },
  {
    slug: "tenant-application",
    name: "Tenant Application",
    category: "property",
    description:
      "Extract tenant application details including employment, income, rental history, and references.",
    longDescription:
      "Prospective tenants inquire about properties with varying levels of self-disclosure. This template captures their personal details, employment and income information, current living situation, desired move-in date, number of occupants, pet information, and landlord references, creating a pre-screening record before the formal application.",
    icon: "home",
    fields: [
      { name: "applicant_name", label: "Applicant Name", type: "text", required: true },
      { name: "email", label: "Email", type: "email", required: true },
      { name: "phone", label: "Phone", type: "phone", required: true },
      { name: "employer", label: "Employer", type: "text", required: false },
      { name: "annual_income", label: "Annual Income", type: "text", required: false },
      { name: "desired_move_in", label: "Desired Move-In Date", type: "date", required: true },
      { name: "occupants", label: "Number of Occupants", type: "number", required: true },
      { name: "pets", label: "Pets", type: "text", required: false },
    ],
    exampleInput:
      "Hello, I'm interested in the 2-bedroom at 118 Elm Street listed at $1,850/month. My name is Jordan Blake, jordan.blake92@gmail.com, 720-445-1133. I'm a software developer at Atlassian making about $115k. It would be me and my partner, plus we have a medium-sized dog (golden retriever, 55 lbs, house-trained). Looking to move in around May 1st. I've been at my current rental for three years with no issues and can provide my landlord's reference.",
    exampleOutput: [
      { label: "Applicant Name", value: "Jordan Blake", confidence: 0.99 },
      { label: "Email", value: "jordan.blake92@gmail.com", confidence: 0.99 },
      { label: "Phone", value: "720-445-1133", confidence: 0.99 },
      { label: "Employer", value: "Atlassian", confidence: 0.99 },
      { label: "Annual Income", value: "$115,000", confidence: 0.98 },
      { label: "Desired Move-In Date", value: "2026-05-01", confidence: 0.97 },
      { label: "Number of Occupants", value: "2", confidence: 0.96 },
      { label: "Pets", value: "Golden retriever, 55 lbs, house-trained", confidence: 0.98 },
    ],
  },
  {
    slug: "property-inspection",
    name: "Property Inspection",
    category: "property",
    description:
      "Structure inspection findings with room-by-room details, condition ratings, and required repairs.",
    longDescription:
      "Property inspections generate narrative reports that need to be broken into specific findings by area. This template captures the property, inspection date, inspector, overall condition, room-by-room findings, required repairs, and estimated costs, turning a walkthrough narrative into an actionable maintenance plan.",
    icon: "search",
    fields: [
      { name: "inspector_name", label: "Inspector", type: "text", required: true },
      { name: "property_address", label: "Property Address", type: "text", required: true },
      { name: "inspection_date", label: "Inspection Date", type: "date", required: true },
      { name: "overall_condition", label: "Overall Condition", type: "select", required: true, options: ["Excellent", "Good", "Fair", "Poor"] },
      { name: "findings", label: "Key Findings", type: "text", required: true },
      { name: "required_repairs", label: "Required Repairs", type: "text", required: true },
      { name: "estimated_cost", label: "Estimated Repair Cost", type: "text", required: false },
    ],
    exampleInput:
      "Move-out inspection completed today April 5th by Angela Rivera at 2240 Park Avenue, Unit 7. Overall the unit is in fair condition. Living room has scuff marks on the hardwood but no deep scratches. Kitchen is clean but the dishwasher door seal is cracked and leaking slightly. Bathroom: grout needs resealing around the tub and there's a missing towel bar. Bedroom closet has a broken sliding door track. Walls throughout need repainting due to multiple nail holes and some crayon marks in the hallway. I'd estimate $1,200-1,500 for all repairs including paint.",
    exampleOutput: [
      { label: "Inspector", value: "Angela Rivera", confidence: 0.99 },
      { label: "Property Address", value: "2240 Park Avenue, Unit 7", confidence: 0.99 },
      { label: "Inspection Date", value: "2026-04-05", confidence: 0.97 },
      { label: "Overall Condition", value: "Fair", confidence: 0.99 },
      { label: "Key Findings", value: "Living room: hardwood scuff marks. Kitchen: cracked dishwasher door seal (leaking). Bathroom: grout needs resealing, missing towel bar. Bedroom: broken closet sliding door track. Walls: nail holes throughout, crayon marks in hallway.", confidence: 0.96 },
      { label: "Required Repairs", value: "Replace dishwasher door seal, reseal tub grout, replace towel bar, fix closet door track, repaint all walls", confidence: 0.94 },
      { label: "Estimated Repair Cost", value: "$1,200 - $1,500", confidence: 0.97 },
    ],
  },
  {
    slug: "lease-inquiry",
    name: "Lease Inquiry",
    category: "property",
    description:
      "Extract prospective tenant questions about available properties, terms, and viewing requests.",
    longDescription:
      "Prospective tenants send enquiries mixing questions about availability, terms, pet policies, and viewing requests. This template extracts the property of interest, the prospect's key requirements, specific questions, budget range, and scheduling preferences for viewings, enabling leasing agents to respond with targeted information.",
    icon: "key",
    fields: [
      { name: "prospect_name", label: "Prospect Name", type: "text", required: true },
      { name: "email", label: "Email", type: "email", required: true },
      { name: "phone", label: "Phone", type: "phone", required: false },
      { name: "property_interest", label: "Property of Interest", type: "text", required: true },
      { name: "requirements", label: "Key Requirements", type: "text", required: true },
      { name: "budget", label: "Budget", type: "text", required: false },
      { name: "questions", label: "Specific Questions", type: "text", required: false },
      { name: "viewing_preference", label: "Viewing Preference", type: "text", required: false },
    ],
    exampleInput:
      "Hi, I found your listing for the ground-floor 1-bed at Westbrook Court on Zoopla. I'm Callum Bright (callum.bright@hotmail.co.uk, 07912 554 881). A few questions: is the parking space included in the rent or extra? Do you allow cats? And what's the minimum lease term? My budget is around 900-1,000 a month. I'm available for a viewing any evening after 5:30 or Saturday mornings.",
    exampleOutput: [
      { label: "Prospect Name", value: "Callum Bright", confidence: 0.99 },
      { label: "Email", value: "callum.bright@hotmail.co.uk", confidence: 0.99 },
      { label: "Phone", value: "07912 554 881", confidence: 0.99 },
      { label: "Property of Interest", value: "Ground-floor 1-bed at Westbrook Court (Zoopla listing)", confidence: 0.97 },
      { label: "Key Requirements", value: "Ground floor, cat-friendly, parking", confidence: 0.90 },
      { label: "Budget", value: "900 - 1,000/month", confidence: 0.97 },
      { label: "Specific Questions", value: "1. Is parking included or extra? 2. Are cats allowed? 3. What is the minimum lease term?", confidence: 0.96 },
      { label: "Viewing Preference", value: "Evenings after 5:30pm or Saturday mornings", confidence: 0.95 },
    ],
  },
  {
    slug: "move-out-request",
    name: "Move-Out Request",
    category: "property",
    description:
      "Parse tenant move-out notices capturing departure date, forwarding address, and deposit return details.",
    longDescription:
      "Tenants give notice in informal messages that may or may not include all the details property managers need. This template extracts the tenant identity, unit, intended move-out date, reason for leaving, forwarding address for deposit return, and any early termination considerations, ensuring no critical detail gets missed in the transition process.",
    icon: "log-out",
    fields: [
      { name: "tenant_name", label: "Tenant Name", type: "text", required: true },
      { name: "email", label: "Email", type: "email", required: true },
      { name: "unit", label: "Unit / Address", type: "text", required: true },
      { name: "move_out_date", label: "Move-Out Date", type: "date", required: true },
      { name: "reason", label: "Reason for Leaving", type: "text", required: false },
      { name: "forwarding_address", label: "Forwarding Address", type: "text", required: false },
      { name: "early_termination", label: "Early Termination", type: "boolean", required: true },
    ],
    exampleInput:
      "Hi, this is my formal notice that I'll be vacating unit 12A at Riverside Gardens at the end of May. My lease runs through June 30th so I know this is early. I'm relocating to Denver for a new job. Please send my deposit return to my parents' house at 88 Willow Drive, Naperville IL 60540. Happy to help find a replacement tenant to avoid the early termination fee. My name is Leo Castillo, leo.castillo@proton.me.",
    exampleOutput: [
      { label: "Tenant Name", value: "Leo Castillo", confidence: 0.99 },
      { label: "Email", value: "leo.castillo@proton.me", confidence: 0.99 },
      { label: "Unit / Address", value: "Unit 12A, Riverside Gardens", confidence: 0.99 },
      { label: "Move-Out Date", value: "2026-05-31", confidence: 0.93 },
      { label: "Reason for Leaving", value: "Job relocation to Denver", confidence: 0.97 },
      { label: "Forwarding Address", value: "88 Willow Drive, Naperville, IL 60540", confidence: 0.99 },
      { label: "Early Termination", value: "Yes", confidence: 0.97 },
    ],
  },
];
