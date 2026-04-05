export type Integration = {
  slug: string;
  name: string;
  description: string;
  logo: string;
  category:
    | "automation"
    | "crm"
    | "project-management"
    | "communication"
    | "database"
    | "website"
    | "support";
  headline: string;
  howItWorks: string;
  setupSteps: string[];
  dataMapping: {
    siftField: string;
    targetField: string;
    description: string;
  }[];
  useCases: string[];
  faqs: { question: string; answer: string }[];
};

export const integrations: Integration[] = [
  // ─────────────────────────────────────────────
  // 1. Zapier
  // ─────────────────────────────────────────────
  {
    slug: "zapier",
    name: "Zapier",
    description:
      "Connect Sift form extractions to 5,000+ apps through Zapier. Automatically route structured data from every submission to your entire tool stack.",
    logo: "\u26A1",
    category: "automation",
    headline: "Send Sift Extractions to 5,000+ Apps with Zapier",
    howItWorks:
      "Sift sends a structured JSON webhook every time a form submission is processed. Point that webhook at a Zapier Catch Hook trigger and your Zap fires instantly. Map Sift's extracted fields to any downstream app — CRM, spreadsheet, email tool, database — without writing a single line of code.",
    setupSteps: [
      "Create a new Zap in Zapier and choose 'Webhooks by Zapier' as the trigger, then select 'Catch Hook'.",
      "Copy the webhook URL Zapier gives you.",
      "In your Sift dashboard, open the form you want to connect and paste the Zapier webhook URL into the Webhooks section.",
      "Submit a test entry through your Sift form so Zapier can detect the payload structure.",
      "Add your downstream action (Google Sheets, HubSpot, Slack, etc.), map the extracted fields, and turn the Zap on.",
    ],
    dataMapping: [
      {
        siftField: "extraction.full_name",
        targetField: "Zap Input: Name",
        description:
          "The extracted full name from the submission is available as a mappable field in every downstream Zap step.",
      },
      {
        siftField: "extraction.email",
        targetField: "Zap Input: Email",
        description:
          "Extracted email addresses pass through to any app that accepts an email field — Mailchimp, HubSpot, Google Contacts, etc.",
      },
      {
        siftField: "extraction.message",
        targetField: "Zap Input: Message Body",
        description:
          "The full extracted message or description, ready to populate note fields, ticket bodies, or document content.",
      },
      {
        siftField: "extraction.category",
        targetField: "Zap Input: Category",
        description:
          "AI-classified category of the submission, useful for routing logic (filters, paths) inside Zapier.",
      },
      {
        siftField: "metadata.submitted_at",
        targetField: "Zap Input: Timestamp",
        description:
          "ISO timestamp of when the form was submitted, usable for date-based filters or logging.",
      },
    ],
    useCases: [
      "Route inbound sales enquiries from your website contact form directly into your CRM with extracted name, email, company, and intent fields — no manual data entry.",
      "Trigger an onboarding email sequence in Mailchimp or ConvertKit the moment someone submits an application form.",
      "Log every customer feedback submission into a Google Sheet with sentiment, category, and urgency already classified by Sift.",
      "Create a Trello card or Asana task automatically when a bug report comes through, complete with reproduction steps extracted from the free-text description.",
    ],
    faqs: [
      {
        question: "Do I need a paid Zapier plan to use this?",
        answer:
          "Zapier's free plan supports webhook triggers, so you can start with no cost. Paid plans give you multi-step Zaps and higher volume.",
      },
      {
        question: "What format does Sift send to Zapier?",
        answer:
          "Sift sends a JSON POST request containing the extracted fields, the raw submission data, form metadata, and a timestamp. Zapier automatically parses this into mappable fields.",
      },
      {
        question: "Can I send different forms to different Zaps?",
        answer:
          "Yes. Each Sift form has its own webhook configuration, so you can point each form at a different Zapier Catch Hook URL.",
      },
      {
        question: "Is there a delay between submission and the Zap firing?",
        answer:
          "Sift sends the webhook within seconds of extraction completing. Zapier processes webhook triggers in near real-time on paid plans and within a few minutes on the free plan.",
      },
    ],
  },

  // ─────────────────────────────────────────────
  // 2. Make (formerly Integromat)
  // ─────────────────────────────────────────────
  {
    slug: "make",
    name: "Make",
    description:
      "Build visual automation workflows powered by Sift form extractions. Make's drag-and-drop scenario builder turns every submission into a multi-step process.",
    logo: "\uD83D\uDD2E",
    category: "automation",
    headline: "Build Visual Workflows from Sift Extractions with Make",
    howItWorks:
      "Every Sift form extraction fires a webhook to Make's Custom Webhook module, which becomes the first node in your scenario. From there you can branch, filter, transform, and route the extracted data through hundreds of modules — all in Make's visual canvas. Complex multi-step automations that would need code elsewhere are just drag-and-drop here.",
    setupSteps: [
      "Create a new scenario in Make and add a 'Custom Webhook' module as the trigger.",
      "Copy the webhook URL that Make generates for the module.",
      "In your Sift dashboard, paste the Make webhook URL into your form's Webhooks configuration.",
      "Click 'Run once' in Make, then submit a test entry through your Sift form to capture the data structure.",
      "Add downstream modules (router, filter, HTTP, app-specific), map the extracted fields, and activate the scenario.",
    ],
    dataMapping: [
      {
        siftField: "extraction.company_name",
        targetField: "Module Input: Company",
        description:
          "Extracted company name feeds into CRM modules, enrichment APIs, or spreadsheet rows.",
      },
      {
        siftField: "extraction.phone",
        targetField: "Module Input: Phone Number",
        description:
          "Phone numbers extracted from free-text submissions, ready for SMS modules or contact records.",
      },
      {
        siftField: "extraction.urgency",
        targetField: "Module Input: Priority",
        description:
          "AI-assessed urgency level that can drive router logic — high urgency goes to Slack, low urgency goes to a spreadsheet.",
      },
      {
        siftField: "extraction.request_type",
        targetField: "Module Input: Type",
        description:
          "Classified request type (support, sales, partnership, etc.) used to branch scenarios with Make's router module.",
      },
    ],
    useCases: [
      "Build a lead qualification pipeline: extract company name and size from a contact form, enrich with Clearbit, score the lead, and route hot leads to Slack while adding cold leads to a nurture sequence.",
      "Create a multilingual support workflow: detect language from the submission, translate with DeepL, classify urgency, then create a ticket in the right team's queue.",
      "Automate event registrations: extract attendee details, check capacity in Airtable, send confirmation via Gmail, and add to a Google Calendar event.",
      "Run a content pipeline: extract topic and brief from a request form, generate a draft outline with an AI module, and post it to Notion for editorial review.",
    ],
    faqs: [
      {
        question: "How does Make compare to Zapier for Sift integrations?",
        answer:
          "Both receive the same webhook from Sift. Make excels at complex branching scenarios with its visual canvas and router modules, while Zapier is simpler for linear one-trigger-one-action flows.",
      },
      {
        question: "Can I process multiple forms in one Make scenario?",
        answer:
          "You can use a single webhook URL for multiple forms and use Make's router module to branch based on the form ID included in the payload. Or create separate scenarios per form for cleaner organisation.",
      },
      {
        question: "What happens if Make is down when Sift sends a webhook?",
        answer:
          "Sift retries failed webhook deliveries with exponential backoff. Make also has a webhook queue that buffers incoming requests, so transient downtime rarely causes data loss.",
      },
    ],
  },

  // ─────────────────────────────────────────────
  // 3. Slack
  // ─────────────────────────────────────────────
  {
    slug: "slack",
    name: "Slack",
    description:
      "Post Sift form extractions directly to Slack channels. Get instant notifications with structured data every time someone submits a form.",
    logo: "\uD83D\uDCAC",
    category: "communication",
    headline: "Get Instant Slack Notifications for Every Form Submission",
    howItWorks:
      "Sift sends a structured webhook payload whenever a form submission is extracted. By pointing that webhook at a Slack Incoming Webhook URL, each submission appears as a formatted message in your chosen channel. For richer formatting, route through Zapier or Make to build Slack Block Kit messages with buttons and sections.",
    setupSteps: [
      "In Slack, go to your workspace settings and create an Incoming Webhook for the channel you want notifications in.",
      "Copy the Slack Incoming Webhook URL.",
      "In your Sift dashboard, add the Slack webhook URL to your form's Webhooks configuration.",
      "Submit a test form entry and verify the message appears in your Slack channel.",
      "Optionally, route through Zapier or Make to customise the message format with Block Kit elements.",
    ],
    dataMapping: [
      {
        siftField: "extraction.full_name",
        targetField: "Slack Message: Submitter Name",
        description:
          "Displayed as the bold header of the Slack notification so your team immediately sees who submitted.",
      },
      {
        siftField: "extraction.email",
        targetField: "Slack Message: Contact Email",
        description:
          "Included as a clickable mailto link in the message body for quick follow-up.",
      },
      {
        siftField: "extraction.summary",
        targetField: "Slack Message: Body Text",
        description:
          "AI-generated summary of the submission, providing context without your team having to read the full text.",
      },
      {
        siftField: "extraction.sentiment",
        targetField: "Slack Message: Emoji Indicator",
        description:
          "Sentiment score mapped to an emoji (positive, neutral, negative) for at-a-glance triage.",
      },
    ],
    useCases: [
      "Alert your sales team in #leads the moment a high-intent enquiry comes through, with extracted company name, budget range, and timeline.",
      "Notify your support team in #support-triage when a customer reports an issue, with urgency level and category pre-classified.",
      "Post a daily digest of form submissions to #product-feedback so the whole team stays informed without checking a dashboard.",
      "Send real-time alerts to a private channel when VIP customers (matched by email domain) submit any form.",
    ],
    faqs: [
      {
        question: "Can I send to different Slack channels based on form content?",
        answer:
          "Not with a direct Slack webhook alone, but you can route through Zapier or Make and use Sift's extracted category or urgency fields to choose the destination channel.",
      },
      {
        question: "Will Slack messages include all extracted fields?",
        answer:
          "When using a direct webhook, Sift sends the full JSON payload. For formatted messages with specific fields, route through Zapier/Make to build a custom Slack Block Kit message.",
      },
      {
        question:
          "Can I get Slack notifications only for certain types of submissions?",
        answer:
          "Yes. Use Zapier or Make as a middleware layer and add a filter step that checks Sift's extracted fields (e.g., only forward submissions where urgency is 'high').",
      },
    ],
  },

  // ─────────────────────────────────────────────
  // 4. HubSpot
  // ─────────────────────────────────────────────
  {
    slug: "hubspot",
    name: "HubSpot",
    description:
      "Automatically create HubSpot contacts and deals from Sift form extractions. Turn every website submission into a CRM record with zero manual entry.",
    logo: "\uD83E\uDDF2",
    category: "crm",
    headline: "Turn Form Submissions into HubSpot Contacts and Deals Automatically",
    howItWorks:
      "When someone submits a form powered by Sift, the AI extracts structured fields like name, email, company, and intent. A webhook delivers this data to Zapier or Make, which then creates or updates a HubSpot contact and optionally creates a deal with the extracted budget and timeline. Your sales team gets a fully populated CRM record without touching a keyboard.",
    setupSteps: [
      "Set up a Zapier Zap or Make scenario with a webhook trigger (see the Zapier or Make integration guide).",
      "Add a HubSpot 'Create or Update Contact' action step and connect your HubSpot account.",
      "Map Sift's extracted fields (name, email, company, phone) to HubSpot contact properties.",
      "Optionally add a second step to create a HubSpot Deal, mapping extracted budget and timeline to deal properties.",
      "Activate the automation and submit a test form to verify the contact appears in HubSpot.",
    ],
    dataMapping: [
      {
        siftField: "extraction.full_name",
        targetField: "HubSpot: Contact Name",
        description:
          "Extracted full name split into first and last name fields in the HubSpot contact record.",
      },
      {
        siftField: "extraction.email",
        targetField: "HubSpot: Email",
        description:
          "Primary email address used for contact deduplication and record matching in HubSpot.",
      },
      {
        siftField: "extraction.company_name",
        targetField: "HubSpot: Company",
        description:
          "Company name used to associate the contact with a HubSpot company record.",
      },
      {
        siftField: "extraction.budget",
        targetField: "HubSpot: Deal Amount",
        description:
          "Extracted budget or project value mapped to the deal amount field for pipeline reporting.",
      },
      {
        siftField: "extraction.intent",
        targetField: "HubSpot: Lead Status",
        description:
          "AI-classified intent (buying, researching, comparing) mapped to lead status for prioritisation.",
      },
    ],
    useCases: [
      "Capture inbound leads from a 'Request a Demo' form and create HubSpot contacts with extracted role, company size, and use case — sales reps get a full brief before the call.",
      "Route partnership enquiries into a separate HubSpot pipeline with extracted partner type, proposed terms, and timeline.",
      "Enrich existing HubSpot contacts: when a known email submits a new form, update their record with the latest extracted data rather than creating a duplicate.",
      "Trigger HubSpot workflows based on Sift's extracted category — sales enquiries enter a nurture sequence, support requests get routed to the service hub.",
    ],
    faqs: [
      {
        question: "Does this require a paid HubSpot plan?",
        answer:
          "HubSpot's free CRM supports contact and deal creation via Zapier/Make. Paid plans give you workflows and advanced automation triggered by the new records.",
      },
      {
        question: "How does deduplication work?",
        answer:
          "HubSpot deduplicates contacts by email address. If a Sift extraction contains an email that already exists in HubSpot, the Zapier/Make step can be configured to update the existing record instead of creating a duplicate.",
      },
      {
        question: "Can Sift create HubSpot deals automatically?",
        answer:
          "Yes. Add a second action step in your Zap or Make scenario to create a deal associated with the contact. Map Sift's extracted budget, timeline, and intent fields to the deal properties.",
      },
      {
        question: "What if Sift extracts a field that doesn't exist in HubSpot?",
        answer:
          "Create a custom property in HubSpot first, then map the Sift field to it. Common additions include 'Source Form', 'AI Category', and 'Urgency Level'.",
      },
    ],
  },

  // ─────────────────────────────────────────────
  // 5. Salesforce
  // ─────────────────────────────────────────────
  {
    slug: "salesforce",
    name: "Salesforce",
    description:
      "Push Sift form extractions into Salesforce as leads, contacts, or cases. AI-structured data flows directly into your Salesforce org with no middleware code.",
    logo: "\u2601\uFE0F",
    category: "crm",
    headline: "Push AI-Extracted Form Data Straight into Salesforce",
    howItWorks:
      "Sift extracts structured data from every form submission and sends it as a JSON webhook. Zapier or Make receives the webhook and uses the Salesforce connector to create leads, contacts, accounts, or cases with the extracted fields already mapped. Your Salesforce admins don't need to build any custom integration — just configure the field mapping once and every future submission flows in automatically.",
    setupSteps: [
      "Create a Zapier Zap or Make scenario with a webhook trigger pointed at your Sift form.",
      "Add a Salesforce action step (Create Lead, Create Contact, or Create Case) and authenticate your Salesforce org.",
      "Map Sift's extracted fields to Salesforce object fields — name, email, company, description, and any custom fields.",
      "Set up a Salesforce assignment rule or flow to route the new record to the right owner based on extracted attributes.",
      "Test with a form submission and verify the record appears in Salesforce with all fields populated.",
    ],
    dataMapping: [
      {
        siftField: "extraction.full_name",
        targetField: "Salesforce: Lead Name",
        description:
          "Full name parsed into FirstName and LastName fields on the Salesforce Lead object.",
      },
      {
        siftField: "extraction.email",
        targetField: "Salesforce: Email",
        description:
          "Email address for the lead or contact record, used for matching and communication.",
      },
      {
        siftField: "extraction.company_name",
        targetField: "Salesforce: Company",
        description:
          "Company name mapped to the Lead Company field or used to link to an existing Account.",
      },
      {
        siftField: "extraction.description",
        targetField: "Salesforce: Description",
        description:
          "The full extracted message or enquiry details, stored in the Description field for rep context.",
      },
      {
        siftField: "extraction.source_form",
        targetField: "Salesforce: Lead Source",
        description:
          "The Sift form name mapped to Lead Source so you can track which forms generate the most pipeline.",
      },
    ],
    useCases: [
      "Capture enterprise leads from a gated whitepaper download form — Sift extracts name, title, company, and interest area, and Salesforce gets a fully qualified lead record.",
      "Create Salesforce Cases from customer complaint forms with AI-extracted issue category, product name, and severity level.",
      "Feed partner application forms into a custom Salesforce object with extracted business type, revenue range, and proposed integration details.",
      "Track event registrations as Salesforce Campaign Members with extracted attendee details, session preferences, and dietary requirements.",
    ],
    faqs: [
      {
        question: "Which Salesforce editions does this work with?",
        answer:
          "Any Salesforce edition that supports API access (Professional with API add-on, Enterprise, Unlimited, or Developer). The connection goes through Zapier or Make's Salesforce connector.",
      },
      {
        question: "Can I update existing Salesforce records instead of creating new ones?",
        answer:
          "Yes. Both Zapier and Make support 'Find or Create' actions for Salesforce. They'll search by email or another unique field and update the existing record if found.",
      },
      {
        question: "How do I map to custom Salesforce fields?",
        answer:
          "Custom fields appear automatically in the Zapier/Make field mapping interface once you connect your Salesforce org. Map any Sift extracted field to any custom field using the API name.",
      },
    ],
  },

  // ─────────────────────────────────────────────
  // 6. Airtable
  // ─────────────────────────────────────────────
  {
    slug: "airtable",
    name: "Airtable",
    description:
      "Add Sift form extractions as rows in Airtable bases. Build structured databases from unstructured form submissions without any manual data entry.",
    logo: "\uD83D\uDCCA",
    category: "database",
    headline: "Turn Every Form Submission into a Structured Airtable Row",
    howItWorks:
      "Sift's AI extracts structured fields from each form submission and fires a webhook. Zapier or Make catches the webhook and creates a new record in your Airtable base with each extracted field mapped to a column. You get a clean, filterable, sortable database of submissions without anyone having to copy-paste from emails or manually enter data.",
    setupSteps: [
      "Create an Airtable base with columns matching the fields you want to capture (Name, Email, Category, Message, etc.).",
      "Set up a Zapier Zap or Make scenario with a webhook trigger connected to your Sift form.",
      "Add an Airtable 'Create Record' action step and connect your Airtable account.",
      "Map each Sift extracted field to the corresponding Airtable column.",
      "Test the flow with a submission and check that the new row appears correctly in your base.",
    ],
    dataMapping: [
      {
        siftField: "extraction.full_name",
        targetField: "Airtable: Name (Single Line Text)",
        description:
          "Extracted name populates the Name column for contact identification and filtering.",
      },
      {
        siftField: "extraction.email",
        targetField: "Airtable: Email (Email Field)",
        description:
          "Email address stored in Airtable's native email field type, enabling clickable mailto links and validation.",
      },
      {
        siftField: "extraction.category",
        targetField: "Airtable: Category (Single Select)",
        description:
          "AI-classified category mapped to a Single Select field for filtering and Kanban views.",
      },
      {
        siftField: "extraction.summary",
        targetField: "Airtable: Summary (Long Text)",
        description:
          "AI-generated summary of the submission stored in a rich text field for quick scanning.",
      },
      {
        siftField: "metadata.submitted_at",
        targetField: "Airtable: Submitted (Date Field)",
        description:
          "Submission timestamp stored as an Airtable date field for chronological sorting and date-range filtering.",
      },
    ],
    useCases: [
      "Build a customer feedback database: every feedback form submission becomes a row with extracted sentiment, feature request, and priority — then use Airtable views to analyse trends.",
      "Track job applications: extract candidate name, email, role applied for, experience level, and key skills into a structured hiring pipeline base.",
      "Maintain a vendor enquiry tracker: extract company details, service offered, pricing, and availability from inbound vendor forms.",
      "Create a research participant database: extract demographic info, availability, and research interests from sign-up forms for your UX research team.",
    ],
    faqs: [
      {
        question: "Can Sift create linked records across multiple Airtable tables?",
        answer:
          "Yes, through Zapier or Make. Create the primary record first, then add a second step to create a linked record in another table using the record ID from the first step.",
      },
      {
        question: "What happens if Sift extracts a category that doesn't exist in my Single Select field?",
        answer:
          "Airtable will either reject the value or auto-create the option, depending on your Zapier/Make settings. We recommend enabling 'typecast' in the Airtable API step to auto-create new select options.",
      },
      {
        question: "Is there a row limit?",
        answer:
          "Airtable's free plan allows 1,000 records per base. Paid plans support up to 500,000 records. The Sift webhook has no limit on its side.",
      },
    ],
  },

  // ─────────────────────────────────────────────
  // 7. Notion
  // ─────────────────────────────────────────────
  {
    slug: "notion",
    name: "Notion",
    description:
      "Create Notion database entries from Sift form extractions. Every submission becomes a structured page in your team's workspace, ready for review and action.",
    logo: "\uD83D\uDDD2\uFE0F",
    category: "database",
    headline: "Create Notion Database Entries from Every Form Submission",
    howItWorks:
      "Sift extracts structured data from form submissions and sends it via webhook. Zapier or Make receives the data and creates a new page in your Notion database with extracted fields mapped to database properties. Your team can then use Notion's views, filters, and relations to manage and process submissions entirely within their existing workspace.",
    setupSteps: [
      "Create a Notion database with properties matching your expected extracted fields (Name, Email, Status, Category, etc.).",
      "Set up a Zapier Zap or Make scenario with a webhook trigger for your Sift form.",
      "Add a Notion 'Create Database Item' action and connect your Notion workspace.",
      "Map Sift's extracted fields to Notion database properties.",
      "Submit a test entry and confirm the page appears in your Notion database with correct property values.",
    ],
    dataMapping: [
      {
        siftField: "extraction.full_name",
        targetField: "Notion: Name (Title Property)",
        description:
          "The extracted name becomes the page title in the Notion database, making it easy to identify entries at a glance.",
      },
      {
        siftField: "extraction.category",
        targetField: "Notion: Category (Select Property)",
        description:
          "AI-classified category mapped to a Select property for Kanban board views and filtered lists.",
      },
      {
        siftField: "extraction.description",
        targetField: "Notion: Details (Page Body)",
        description:
          "The full extracted description written into the Notion page body as rich text content.",
      },
      {
        siftField: "extraction.urgency",
        targetField: "Notion: Priority (Select Property)",
        description:
          "AI-assessed urgency mapped to a priority Select property for triage and sorting.",
      },
    ],
    useCases: [
      "Manage a product feedback pipeline: each submission becomes a Notion page with extracted feature request, user type, and priority — product managers triage using a Kanban board.",
      "Run a content request system: writers submit briefs through a form, Sift extracts topic, audience, format, and deadline, and a Notion database tracks the editorial calendar.",
      "Organise partnership enquiries: extract partner details, proposed terms, and mutual benefits into a Notion CRM database your business development team already uses.",
      "Track conference talk proposals: extract speaker name, talk title, abstract, and topic tags into a review database where your programme committee votes and comments.",
    ],
    faqs: [
      {
        question: "Can I add content to the Notion page body, not just properties?",
        answer:
          "Yes. Zapier and Make both support adding content blocks to the page body. You can map Sift's extracted description or summary into the page content as a paragraph block.",
      },
      {
        question: "Does this work with Notion's Relations and Rollups?",
        answer:
          "You can set Relation properties if you know the related page ID. For most use cases, it's simpler to use Select properties and let your team manually link related items in Notion.",
      },
      {
        question:
          "How do I set a default Status for new entries?",
        answer:
          "In the Zapier/Make action step, set the Status property to a static value like 'New' or 'Needs Review'. You can also use Sift's extracted urgency to set different statuses dynamically.",
      },
    ],
  },

  // ─────────────────────────────────────────────
  // 8. Google Sheets
  // ─────────────────────────────────────────────
  {
    slug: "google-sheets",
    name: "Google Sheets",
    description:
      "Append Sift form extractions as rows in Google Sheets. Build live spreadsheets of structured submission data that your whole team can access and analyse.",
    logo: "\uD83D\uDCC4",
    category: "database",
    headline: "Append AI-Extracted Form Data to Google Sheets Automatically",
    howItWorks:
      "Every time a form is submitted, Sift extracts the structured fields and fires a webhook. Zapier or Make catches it and appends a new row to your Google Sheet with each extracted field in its own column. The spreadsheet updates in real time, giving your team a live view of all submissions with data that's already cleaned and categorised by AI.",
    setupSteps: [
      "Create a Google Sheet with column headers matching the fields you want to capture (Name, Email, Category, Sentiment, etc.).",
      "Set up a Zapier Zap or Make scenario with a webhook trigger connected to your Sift form.",
      "Add a Google Sheets 'Create Spreadsheet Row' action and connect your Google account.",
      "Map each Sift extracted field to the corresponding spreadsheet column.",
      "Test with a submission and verify the row appears in your sheet with all fields correctly populated.",
    ],
    dataMapping: [
      {
        siftField: "extraction.full_name",
        targetField: "Google Sheets: Column A (Name)",
        description:
          "Extracted name appended to the Name column for identification and lookup.",
      },
      {
        siftField: "extraction.email",
        targetField: "Google Sheets: Column B (Email)",
        description:
          "Email address in its own column, ready for VLOOKUP, mail merge, or export to other tools.",
      },
      {
        siftField: "extraction.category",
        targetField: "Google Sheets: Column C (Category)",
        description:
          "AI-classified category enabling pivot tables and chart breakdowns by submission type.",
      },
      {
        siftField: "extraction.sentiment",
        targetField: "Google Sheets: Column D (Sentiment)",
        description:
          "Sentiment score (positive/neutral/negative) for trend analysis and conditional formatting.",
      },
      {
        siftField: "metadata.submitted_at",
        targetField: "Google Sheets: Column E (Date)",
        description:
          "Timestamp for chronological ordering and date-based filtering or charting.",
      },
    ],
    useCases: [
      "Create a live dashboard of customer enquiries: product managers and sales reps monitor a shared sheet with extracted fields, using conditional formatting to highlight urgent submissions.",
      "Build a survey response database: Sift extracts structured answers from open-ended survey responses, making them analysable with pivot tables and charts.",
      "Track event registration data: extract attendee details, session preferences, and dietary needs into a spreadsheet that your events team shares with caterers and venue staff.",
      "Maintain a competitive intelligence log: submit competitor announcements through a form, Sift extracts company, product, pricing, and positioning into an analyst-ready spreadsheet.",
    ],
    faqs: [
      {
        question: "Can I write to a specific sheet tab within a workbook?",
        answer:
          "Yes. Both Zapier and Make let you select the specific sheet (tab) within a Google Sheets workbook when configuring the action step.",
      },
      {
        question: "What if my column headers change?",
        answer:
          "If you rename or reorder columns, you'll need to update the field mapping in your Zapier Zap or Make scenario. The column header names must match what the automation expects.",
      },
      {
        question: "Is there a row limit for Google Sheets?",
        answer:
          "Google Sheets supports up to 10 million cells per spreadsheet. For high-volume forms, consider archiving older rows periodically or switching to Airtable or a database for larger datasets.",
      },
    ],
  },

  // ─────────────────────────────────────────────
  // 9. Jira
  // ─────────────────────────────────────────────
  {
    slug: "jira",
    name: "Jira",
    description:
      "Create Jira issues from Sift form extractions. Bug reports, feature requests, and feedback automatically become structured tickets in your engineering backlog.",
    logo: "\uD83D\uDD35",
    category: "project-management",
    headline: "Turn Form Submissions into Jira Issues Automatically",
    howItWorks:
      "When users submit bug reports, feature requests, or feedback through a Sift-powered form, the AI extracts structured fields like issue type, severity, steps to reproduce, and affected component. A webhook sends this data through Zapier or Make, which creates a Jira issue with the right project, issue type, priority, and description — all without anyone manually filing a ticket.",
    setupSteps: [
      "Set up a Zapier Zap or Make scenario with a webhook trigger connected to your Sift form.",
      "Add a Jira 'Create Issue' action step and connect your Jira Cloud instance.",
      "Select the target project and issue type (Bug, Story, Task, etc.).",
      "Map Sift's extracted fields to Jira issue fields — summary, description, priority, labels, and any custom fields.",
      "Test with a form submission and verify the issue appears in your Jira backlog with correct fields.",
    ],
    dataMapping: [
      {
        siftField: "extraction.issue_title",
        targetField: "Jira: Summary",
        description:
          "AI-generated concise title for the issue, derived from the user's freeform description.",
      },
      {
        siftField: "extraction.description",
        targetField: "Jira: Description",
        description:
          "Full extracted details including steps to reproduce, expected behaviour, and actual behaviour.",
      },
      {
        siftField: "extraction.severity",
        targetField: "Jira: Priority",
        description:
          "AI-assessed severity mapped to Jira priority levels (Critical, High, Medium, Low).",
      },
      {
        siftField: "extraction.component",
        targetField: "Jira: Component",
        description:
          "Extracted product area or component name mapped to Jira's Component field for team routing.",
      },
      {
        siftField: "extraction.reporter_email",
        targetField: "Jira: Reporter (Custom Field)",
        description:
          "Submitter's email stored in a custom field since external users aren't typically Jira users.",
      },
    ],
    useCases: [
      "Automate bug triage: users describe issues in plain English, Sift extracts severity, component, and reproduction steps, and a Jira Bug is created in the right team's backlog.",
      "Capture feature requests from customers: extract the requested feature, use case, and business impact into Jira Stories for product backlog grooming.",
      "Create Jira Tasks from internal request forms: operations teams submit infrastructure or tooling requests and Sift structures them into actionable tickets.",
      "Route QA findings: testers submit issues through a form, Sift extracts test case ID, environment, and failure details, and Jira tickets are created with all context attached.",
    ],
    faqs: [
      {
        question: "Can I assign the Jira issue to a specific person?",
        answer:
          "Yes. In the Zapier/Make action step, you can set the Assignee field to a specific Jira user, or use Sift's extracted component to dynamically assign based on your team's routing rules.",
      },
      {
        question: "Does this work with Jira Server or only Jira Cloud?",
        answer:
          "Zapier and Make's Jira connectors work with Jira Cloud. For Jira Server or Data Center, you'll need to use the generic webhook integration with Jira's REST API.",
      },
      {
        question:
          "Can I add the submission as a Jira comment instead of a new issue?",
        answer:
          "Yes. Use a 'Find Issue' step first (searching by a custom field like submitter email) and then an 'Add Comment' step instead of 'Create Issue'.",
      },
    ],
  },

  // ─────────────────────────────────────────────
  // 10. Linear
  // ─────────────────────────────────────────────
  {
    slug: "linear",
    name: "Linear",
    description:
      "Create Linear issues from Sift form extractions. Customer feedback and bug reports flow directly into your product team's workflow as structured, prioritised issues.",
    logo: "\u25B3",
    category: "project-management",
    headline: "Stream Customer Feedback into Linear as Prioritised Issues",
    howItWorks:
      "Sift extracts structured data from feedback forms, bug reports, or feature requests and sends it via webhook. Zapier or Make creates a Linear issue with the extracted title, description, priority, and labels. Your product team sees fully contextualised issues in their existing Linear workflow without anyone manually copying information from emails or form responses.",
    setupSteps: [
      "Set up a Zapier Zap or Make scenario with a webhook trigger connected to your Sift form.",
      "Add a Linear 'Create Issue' action step and connect your Linear workspace.",
      "Select the target team and project within Linear.",
      "Map Sift's extracted fields to Linear issue fields — title, description, priority, and labels.",
      "Submit a test form entry and verify the issue appears in your Linear team's triage queue.",
    ],
    dataMapping: [
      {
        siftField: "extraction.issue_title",
        targetField: "Linear: Title",
        description:
          "AI-generated issue title that's concise and actionable, derived from the user's freeform input.",
      },
      {
        siftField: "extraction.description",
        targetField: "Linear: Description (Markdown)",
        description:
          "Full extracted details formatted as Markdown for Linear's rich text description field.",
      },
      {
        siftField: "extraction.priority",
        targetField: "Linear: Priority",
        description:
          "AI-assessed priority (Urgent, High, Medium, Low, None) mapped to Linear's priority levels.",
      },
      {
        siftField: "extraction.category",
        targetField: "Linear: Label",
        description:
          "Extracted category (Bug, Feature Request, Improvement, Question) mapped to Linear labels.",
      },
    ],
    useCases: [
      "Pipe customer feedback from your website directly into Linear: product managers see structured issues with extracted pain points, feature requests, and user context.",
      "Automate bug intake: users report issues in natural language, Sift extracts the structured details, and Linear gets a triaged issue with severity and component.",
      "Capture internal improvement requests: team members submit ideas through a form and they arrive in Linear's backlog with extracted impact assessment and effort estimate.",
      "Track beta tester feedback: extract feature ratings, suggested improvements, and bug reports from beta feedback forms into a dedicated Linear project.",
    ],
    faqs: [
      {
        question: "Can I assign Linear issues to specific team members?",
        answer:
          "Yes. In the Zapier/Make step, you can set the assignee to a specific Linear user. You can also leave it unassigned for your team's triage workflow to handle.",
      },
      {
        question: "Does this work with Linear's Cycles and Projects?",
        answer:
          "You can assign new issues to a specific project. Cycle assignment is typically done manually during planning, but you can set a default cycle in the automation if needed.",
      },
      {
        question: "Can I attach the original form submission to the Linear issue?",
        answer:
          "Yes. Include Sift's raw submission data or a link to the submission in the issue description. You can also add the submitter's email as a comment for follow-up context.",
      },
    ],
  },

  // ─────────────────────────────────────────────
  // 11. Zendesk
  // ─────────────────────────────────────────────
  {
    slug: "zendesk",
    name: "Zendesk",
    description:
      "Create Zendesk tickets from Sift form extractions. Every customer submission becomes a structured, categorised support ticket ready for your agents to resolve.",
    logo: "\uD83C\uDFAB",
    category: "support",
    headline: "Create Pre-Categorised Zendesk Tickets from Every Submission",
    howItWorks:
      "Sift extracts structured data from support forms — issue type, urgency, product area, customer details — and sends it via webhook. Zapier or Make creates a Zendesk ticket with the extracted fields mapped to ticket properties. Agents receive tickets that are already categorised, prioritised, and enriched with context, cutting triage time dramatically.",
    setupSteps: [
      "Set up a Zapier Zap or Make scenario with a webhook trigger connected to your Sift form.",
      "Add a Zendesk 'Create Ticket' action step and connect your Zendesk instance.",
      "Map Sift's extracted fields to Zendesk ticket fields — subject, description, priority, type, and custom fields.",
      "Configure ticket assignment rules in Zendesk to route new tickets to the right group based on extracted category.",
      "Test with a form submission and verify the ticket appears in your Zendesk queue with all fields populated.",
    ],
    dataMapping: [
      {
        siftField: "extraction.issue_title",
        targetField: "Zendesk: Subject",
        description:
          "AI-generated concise subject line for the ticket, derived from the customer's description.",
      },
      {
        siftField: "extraction.description",
        targetField: "Zendesk: Description",
        description:
          "Full extracted issue details including context, steps taken, and desired resolution.",
      },
      {
        siftField: "extraction.urgency",
        targetField: "Zendesk: Priority",
        description:
          "AI-assessed urgency mapped to Zendesk priority levels (Urgent, High, Normal, Low).",
      },
      {
        siftField: "extraction.category",
        targetField: "Zendesk: Type / Tags",
        description:
          "Extracted issue category applied as a ticket type or tags for routing and reporting.",
      },
      {
        siftField: "extraction.email",
        targetField: "Zendesk: Requester Email",
        description:
          "Customer email used to match or create the Zendesk requester profile.",
      },
    ],
    useCases: [
      "Replace your generic contact form with Sift: customers describe issues in their own words and Zendesk gets structured tickets with category, urgency, and product area pre-filled.",
      "Capture warranty claims: extract product name, purchase date, issue description, and proof of purchase into Zendesk tickets with custom fields for your claims team.",
      "Handle billing enquiries: Sift extracts account identifier, billing period, and issue type so agents can pull up the right account before even reading the ticket.",
      "Process return requests: extract order number, item, reason for return, and preferred resolution (refund/exchange) into structured tickets for your fulfilment team.",
    ],
    faqs: [
      {
        question: "Can I create tickets for users who don't have a Zendesk account?",
        answer:
          "Yes. Zendesk automatically creates a requester profile from the email address. The customer receives email notifications about their ticket without needing a Zendesk login.",
      },
      {
        question: "How do I route tickets to the right agent group?",
        answer:
          "Use Zendesk's built-in triggers or automations to route based on the tags or custom fields that Sift's extracted category populates. Alternatively, set the Group field directly in the Zapier/Make step.",
      },
      {
        question: "Can I attach files from the form submission?",
        answer:
          "If your Sift form collects file uploads, the file URLs are included in the webhook payload. You can pass these URLs to Zendesk as ticket attachments via the Zapier/Make step.",
      },
    ],
  },

  // ─────────────────────────────────────────────
  // 12. Intercom
  // ─────────────────────────────────────────────
  {
    slug: "intercom",
    name: "Intercom",
    description:
      "Create Intercom conversations from Sift form extractions. Every form submission becomes a tracked conversation with full context, ready for your team to pick up.",
    logo: "\uD83D\uDCE8",
    category: "support",
    headline: "Turn Form Submissions into Intercom Conversations with Full Context",
    howItWorks:
      "Sift extracts structured fields from form submissions and sends them via webhook. Zapier or Make creates an Intercom conversation (or updates a user's profile and sends an in-app message) with the extracted details. Your support team sees conversations that already contain the customer's name, issue type, and relevant context — no back-and-forth needed to understand the problem.",
    setupSteps: [
      "Set up a Zapier Zap or Make scenario with a webhook trigger connected to your Sift form.",
      "Add an Intercom action step — either 'Create User' followed by 'Create Conversation', or 'Send In-App Message'.",
      "Connect your Intercom workspace and configure the action.",
      "Map Sift's extracted fields to Intercom attributes — name, email, custom attributes, and message body.",
      "Test with a submission and verify the conversation or message appears in your Intercom inbox.",
    ],
    dataMapping: [
      {
        siftField: "extraction.full_name",
        targetField: "Intercom: User Name",
        description:
          "Extracted name used to create or match an Intercom user profile.",
      },
      {
        siftField: "extraction.email",
        targetField: "Intercom: User Email",
        description:
          "Email address for user identification and matching with existing Intercom contacts.",
      },
      {
        siftField: "extraction.description",
        targetField: "Intercom: Message Body",
        description:
          "Full extracted message content delivered as the opening message of the Intercom conversation.",
      },
      {
        siftField: "extraction.category",
        targetField: "Intercom: Conversation Tag",
        description:
          "AI-classified category applied as a conversation tag for routing and analytics.",
      },
    ],
    useCases: [
      "Convert contact form submissions into Intercom conversations: your support team responds within the Intercom inbox and customers get replies via email — a unified experience.",
      "Enrich Intercom user profiles with extracted data: when a user submits a form, update their Intercom profile with company name, plan type, or account ID from the extraction.",
      "Trigger targeted follow-ups: route high-value lead submissions to a sales rep's Intercom inbox with extracted budget, timeline, and decision criteria.",
      "Capture pre-sale questions: product enquiries submitted through a form become Intercom conversations tagged with the product category and urgency level.",
    ],
    faqs: [
      {
        question: "Will this create duplicate Intercom users?",
        answer:
          "Intercom deduplicates by email address. If the extracted email matches an existing contact, the conversation is associated with their existing profile.",
      },
      {
        question: "Can I assign conversations to a specific Intercom team?",
        answer:
          "Yes. Use the Zapier/Make step to assign the conversation to a specific team inbox, or use Intercom's own assignment rules based on the tags applied from Sift's extracted category.",
      },
      {
        question: "Does the customer see the Intercom conversation?",
        answer:
          "If the customer has the Intercom Messenger on your site, they'll see replies in the chat widget. Otherwise, they receive email notifications for any agent replies.",
      },
    ],
  },

  // ─────────────────────────────────────────────
  // 13. WordPress
  // ─────────────────────────────────────────────
  {
    slug: "wordpress",
    name: "WordPress",
    description:
      "Embed the Sift form widget on any WordPress site. Add AI-powered form extraction to your WordPress pages with a simple code snippet or plugin.",
    logo: "\uD83C\uDF10",
    category: "website",
    headline: "Add AI-Powered Form Extraction to Your WordPress Site",
    howItWorks:
      "Sift provides a lightweight JavaScript widget that you embed on any WordPress page. When visitors submit the form, Sift's AI extracts structured data from their responses in real time. You can add the widget using a Custom HTML block in the WordPress editor, a shortcode in a text widget, or by pasting the snippet into your theme's template files. No WordPress plugin installation required.",
    setupSteps: [
      "Copy the Sift widget embed code from your Sift dashboard (it's a single <script> tag with your form ID).",
      "In WordPress, edit the page where you want the form and add a Custom HTML block.",
      "Paste the Sift embed code into the HTML block.",
      "Publish or update the page and verify the form renders correctly.",
      "Optionally, add the snippet to your theme's header.php or footer.php for site-wide availability.",
    ],
    dataMapping: [
      {
        siftField: "Widget: Form ID",
        targetField: "WordPress: Page / Post",
        description:
          "Each Sift form has a unique ID embedded in the widget code. Place different form IDs on different WordPress pages.",
      },
      {
        siftField: "Widget: Theme",
        targetField: "WordPress: Site Design",
        description:
          "The Sift widget inherits your site's font stack by default, or you can customise its appearance with CSS overrides.",
      },
      {
        siftField: "Widget: Callback URL",
        targetField: "WordPress: Thank You Page",
        description:
          "Configure a redirect URL in the widget settings to send users to a WordPress thank-you page after submission.",
      },
    ],
    useCases: [
      "Replace your WordPress contact form with a Sift-powered form that extracts structured data from every enquiry — no more reading through walls of text.",
      "Add a customer feedback widget to your WooCommerce store's order confirmation page that extracts sentiment, product mentioned, and specific feedback.",
      "Embed a job application form on your WordPress careers page that extracts candidate details, skills, and experience into structured data.",
      "Place a lead capture form on your WordPress landing pages that extracts company size, budget, and intent for your sales team.",
    ],
    faqs: [
      {
        question: "Do I need to install a WordPress plugin?",
        answer:
          "No. The Sift widget is a standard JavaScript embed that works in any Custom HTML block. No plugin installation, no PHP dependencies, no WordPress version compatibility issues.",
      },
      {
        question: "Will the widget slow down my WordPress site?",
        answer:
          "The Sift widget script is under 15KB gzipped and loads asynchronously, so it won't block your page rendering. It has no impact on your Core Web Vitals scores.",
      },
      {
        question: "Does it work with page builders like Elementor or Divi?",
        answer:
          "Yes. Every major WordPress page builder has an HTML or code embed element. Paste the Sift widget code into that element and it works identically to a native WordPress HTML block.",
      },
      {
        question: "Can I style the form to match my WordPress theme?",
        answer:
          "The widget inherits your site's base font family. You can further customise colours, spacing, and borders using the CSS custom properties documented in Sift's widget guide.",
      },
    ],
  },

  // ─────────────────────────────────────────────
  // 14. Webflow
  // ─────────────────────────────────────────────
  {
    slug: "webflow",
    name: "Webflow",
    description:
      "Embed the Sift form widget on your Webflow site. Add AI-powered extraction to any Webflow page with a simple embed component — no custom code project required.",
    logo: "\uD83D\uDD37",
    category: "website",
    headline: "Add AI-Powered Form Extraction to Your Webflow Site",
    howItWorks:
      "Sift's JavaScript widget embeds into any Webflow page using Webflow's native Embed component. Drop the component onto your canvas, paste the Sift script tag, and publish. The form renders within your Webflow layout and sends structured extractions via webhook whenever a visitor submits. No Webflow custom code plan is needed — the Embed component is available on all Webflow plans.",
    setupSteps: [
      "Copy the Sift widget embed code from your Sift dashboard.",
      "In the Webflow Designer, drag an Embed component onto the page where you want the form.",
      "Paste the Sift widget code into the Embed component's code editor.",
      "Style the surrounding Webflow container (width, padding, background) to match your page design.",
      "Publish your Webflow site and verify the form renders and submits correctly on the live URL.",
    ],
    dataMapping: [
      {
        siftField: "Widget: Form ID",
        targetField: "Webflow: Embed Component",
        description:
          "The form ID in the embed code determines which Sift form renders in each Webflow Embed component.",
      },
      {
        siftField: "Widget: Container Width",
        targetField: "Webflow: Parent Div Styles",
        description:
          "The widget fills its container's width, so control sizing through Webflow's parent element styles.",
      },
      {
        siftField: "Widget: Success Redirect",
        targetField: "Webflow: Thank You Page",
        description:
          "Set a redirect URL in the widget config to send users to a Webflow thank-you page after submission.",
      },
    ],
    useCases: [
      "Replace Webflow's native form with a Sift-powered form that extracts structured data — get categorised, prioritised submissions instead of raw text blobs.",
      "Add a product enquiry form to your Webflow marketing site that extracts company size, use case, and budget range for your sales team.",
      "Embed a beta sign-up form on a Webflow launch page that extracts role, company type, and primary interest into structured data for segmentation.",
      "Place a support request form on your Webflow help centre that extracts issue type, severity, and product area before creating a ticket.",
    ],
    faqs: [
      {
        question: "Do I need Webflow's custom code plan to use this?",
        answer:
          "No. The Embed component is available on all Webflow plans, including the free plan. You only need the custom code plan if you want to add scripts to the site-wide <head> or <body> tags.",
      },
      {
        question: "Will the form inherit my Webflow site's styles?",
        answer:
          "The Sift widget picks up your site's base font family from CSS inheritance. For deeper customisation, use CSS custom properties in a Webflow Custom Code block to override widget colours and spacing.",
      },
      {
        question:
          "Can I use Webflow's form submissions alongside Sift?",
        answer:
          "The Sift widget replaces Webflow's native form entirely — submissions go through Sift, not Webflow's form handler. This gives you AI extraction capabilities that Webflow forms don't have.",
      },
    ],
  },

  // ─────────────────────────────────────────────
  // 15. Webhook (Custom)
  // ─────────────────────────────────────────────
  {
    slug: "webhook",
    name: "Webhook",
    description:
      "Send Sift form extractions to any HTTP endpoint. The universal integration method — receive structured JSON at your own API, serverless function, or backend service.",
    logo: "\uD83D\uDD17",
    category: "automation",
    headline: "Send Structured Extractions to Any HTTP Endpoint",
    howItWorks:
      "Sift sends a POST request with a JSON payload to your specified URL every time a form submission is extracted. The payload contains the extracted fields, raw submission data, form metadata, and a timestamp. You can point this at any HTTP endpoint — your own API server, a serverless function (AWS Lambda, Vercel, Cloudflare Workers), a backend service, or any tool that accepts webhooks. This is the universal building block that powers all other Sift integrations.",
    setupSteps: [
      "Set up an HTTP endpoint that accepts POST requests with a JSON body — this can be a serverless function, an API route, or any web server.",
      "In your Sift dashboard, open the form you want to connect and add your endpoint URL in the Webhooks section.",
      "Optionally configure a webhook signing secret to verify that incoming requests genuinely come from Sift.",
      "Submit a test form entry and inspect the payload your endpoint receives to confirm the structure.",
      "Implement your business logic: parse the extracted fields, validate the signature, and process the data as needed.",
    ],
    dataMapping: [
      {
        siftField: "extraction.*",
        targetField: "JSON Body: extraction object",
        description:
          "All AI-extracted fields are nested under the 'extraction' key in the JSON payload. Field names match your form's extraction schema.",
      },
      {
        siftField: "raw_submission",
        targetField: "JSON Body: raw_submission object",
        description:
          "The original unprocessed form data is included alongside the extraction for reference and auditing.",
      },
      {
        siftField: "metadata.form_id",
        targetField: "JSON Body: metadata.form_id",
        description:
          "Unique form identifier so your endpoint can distinguish between submissions from different Sift forms.",
      },
      {
        siftField: "metadata.submitted_at",
        targetField: "JSON Body: metadata.submitted_at",
        description:
          "ISO 8601 timestamp of when the form was submitted, useful for ordering and deduplication.",
      },
      {
        siftField: "metadata.signature",
        targetField: "HTTP Header: X-Sift-Signature",
        description:
          "HMAC-SHA256 signature of the payload body using your webhook secret, for verifying authenticity.",
      },
    ],
    useCases: [
      "Build a custom lead scoring API: receive Sift extractions at your serverless function, score the lead based on extracted company size and intent, and write the result to your database.",
      "Feed a machine learning pipeline: send extracted customer feedback data to your own API for sentiment analysis, topic modelling, or trend detection beyond what Sift provides out of the box.",
      "Integrate with legacy systems: receive the webhook at a middleware service that transforms the JSON payload into the format your legacy CRM or ERP expects.",
      "Power real-time dashboards: send every extraction to a WebSocket server that pushes live updates to an internal dashboard showing submission volume, categories, and sentiment in real time.",
    ],
    faqs: [
      {
        question: "What does the webhook payload look like?",
        answer:
          "The payload is a JSON object with three top-level keys: 'extraction' (the AI-extracted fields), 'raw_submission' (original form data), and 'metadata' (form_id, submitted_at, submission_id). The exact fields under 'extraction' depend on your form's configuration.",
      },
      {
        question: "How do I verify the webhook is from Sift?",
        answer:
          "Sift includes an X-Sift-Signature header containing an HMAC-SHA256 hash of the request body signed with your webhook secret. Compute the same hash on your end and compare to verify authenticity.",
      },
      {
        question: "What happens if my endpoint is down?",
        answer:
          "Sift retries failed webhook deliveries up to 5 times with exponential backoff (1s, 10s, 60s, 5m, 30m). If all retries fail, the delivery is marked as failed in your Sift dashboard and can be manually retried.",
      },
      {
        question: "Can I send to multiple webhook URLs?",
        answer:
          "Yes. Each Sift form supports multiple webhook URLs. Every extraction is sent to all configured endpoints simultaneously, so you can fan out to multiple systems from a single form.",
      },
    ],
  },
];
