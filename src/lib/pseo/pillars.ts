export type SeoPillar = {
  slug: string;
  title: string;
  description: string;
  eyebrow: string;
  h1: string;
  intro: string;
  primaryKeyword: string;
  proofPoints: { metric: string; label: string }[];
  sections: { title: string; body: string }[];
  workflow: { title: string; body: string }[];
  useCases: string[];
  faqs: { question: string; answer: string }[];
  related: { href: string; label: string; description: string }[];
};

export const seoPillars = {
  aiFormBuilder: {
    slug: "ai-form-builder",
    title: "AI Form Builder for Free-Text Intake",
    description:
      "Build AI forms that let people write naturally while Sift Forms extracts structured fields, scores confidence, and sends clean data to your tools.",
    eyebrow: "AI form builder",
    h1: "AI forms that turn free-text answers into structured data",
    intro:
      "Sift Forms is an AI form builder for teams that need better intake data, not longer forms. Define the fields you need once, embed the widget, and let visitors describe their request in their own words.",
    primaryKeyword: "AI form builder",
    proofPoints: [
      { metric: "5 min", label: "to launch a form" },
      { metric: "120+", label: "languages supported by AI extraction" },
      { metric: "API", label: "webhooks and REST endpoints included" },
    ],
    sections: [
      {
        title: "Why AI forms beat long forms",
        body:
          "Traditional form builders make users do the structuring work. Sift Forms reverses that pattern: users write one clear message, then AI extracts names, dates, budgets, urgency, categories, and custom fields.",
      },
      {
        title: "Built for operational intake",
        body:
          "Use it for support tickets, lead qualification, client intake, claims, applications, bug reports, quote requests, and any workflow where the details arrive messy but your team needs structured data.",
      },
      {
        title: "Human-readable and machine-ready",
        body:
          "Every submission keeps the original message alongside extracted fields and confidence scores, so teams can review context while still routing clean JSON to CRMs, help desks, spreadsheets, and internal tools.",
      },
    ],
    workflow: [
      {
        title: "Define the fields",
        body:
          "Choose fields such as contact name, company, issue type, urgency, budget, policy number, or custom values that match your workflow.",
      },
      {
        title: "Collect natural language",
        body:
          "Embed the Sift Forms widget on any page and let users explain the situation without navigating a rigid multi-step form.",
      },
      {
        title: "Extract and route",
        body:
          "Sift Forms returns structured JSON, confidence scores, and webhook events so downstream systems receive data they can use immediately.",
      },
    ],
    useCases: [
      "Replace contact forms with AI intake",
      "Qualify sales enquiries before CRM entry",
      "Classify support requests by category and urgency",
      "Turn client briefs into scoped intake records",
    ],
    faqs: [
      {
        question: "Is Sift Forms a traditional drag-and-drop form builder?",
        answer:
          "No. Sift Forms is for AI-first intake. You define the data fields you need, then users write naturally and AI extracts those fields from the response.",
      },
      {
        question: "Can I still embed Sift Forms on my website?",
        answer:
          "Yes. Sift Forms ships as an embeddable widget and also exposes API endpoints for teams that want a custom front end.",
      },
      {
        question: "What happens when the AI is unsure?",
        answer:
          "Each extracted field includes confidence information so your workflow can flag low-confidence values for review instead of blindly accepting them.",
      },
    ],
    related: [
      {
        href: "/ai-intake-forms",
        label: "AI intake forms",
        description: "Use AI to capture and classify inbound requests.",
      },
      {
        href: "/natural-language-form-builder",
        label: "Natural language form builder",
        description: "Let users answer forms in plain language.",
      },
      {
        href: "/templates/lead-intake",
        label: "Lead intake template",
        description: "Extract structured sales data from free-text leads.",
      },
    ],
  },
  aiIntakeForms: {
    slug: "ai-intake-forms",
    title: "AI Intake Forms for Support, Sales, and Operations",
    description:
      "Use Sift Forms to replace static intake forms with AI forms that extract, classify, and route structured request data.",
    eyebrow: "AI intake forms",
    h1: "AI intake forms that understand the whole request",
    intro:
      "Sift Forms helps teams capture complete intake data without forcing people through rigid form fields. Visitors explain what they need, and AI turns the message into structured data your team can act on.",
    primaryKeyword: "AI intake forms",
    proofPoints: [
      { metric: "1 input", label: "for the full user story" },
      { metric: "JSON", label: "for downstream workflows" },
      { metric: "Scores", label: "for confidence and review" },
    ],
    sections: [
      {
        title: "Better intake starts with better context",
        body:
          "Static forms collect isolated answers. AI intake forms preserve the full story, then extract the exact fields your team needs for triage, qualification, and routing.",
      },
      {
        title: "Useful across high-friction workflows",
        body:
          "Sift Forms fits support, legal, healthcare, insurance, real estate, HR, education, and professional services workflows where people often need to describe a situation in their own words.",
      },
      {
        title: "Structured enough for automation",
        body:
          "Submissions can trigger webhooks, create CRM records, open tickets, append rows to spreadsheets, or feed internal dashboards without manual copying.",
      },
    ],
    workflow: [
      {
        title: "Ask for the request",
        body:
          "Prompt the user to describe what happened, what they need, or what they want to accomplish.",
      },
      {
        title: "Extract the intake fields",
        body:
          "Sift Forms identifies key fields such as contact details, request type, urgency, dates, products, budgets, and next steps.",
      },
      {
        title: "Send it to the right place",
        body:
          "Route completed records to Slack, HubSpot, Zendesk, Google Sheets, Make, Zapier, or your own webhook receiver.",
      },
    ],
    useCases: [
      "Client intake for agencies and services firms",
      "Support triage for SaaS products",
      "Insurance claim intake",
      "Patient request intake",
    ],
    faqs: [
      {
        question: "What is an AI intake form?",
        answer:
          "An AI intake form captures a natural-language request and uses AI extraction to produce structured fields for review, routing, and automation.",
      },
      {
        question: "Do users need to learn a special format?",
        answer:
          "No. Users can write normally. The schema tells Sift Forms what to extract from the message.",
      },
      {
        question: "Can Sift Forms replace my current intake form?",
        answer:
          "For workflows where users need to explain context, yes. You can start with a template, customize fields, and embed the new intake form on your site.",
      },
    ],
    related: [
      {
        href: "/use-cases/client-intake",
        label: "Client intake use case",
        description: "Capture project details without back-and-forth emails.",
      },
      {
        href: "/for/law-firms",
        label: "Sift Forms for law firms",
        description: "Turn legal enquiries into structured matter intake.",
      },
      {
        href: "/contact-form-data-extraction",
        label: "Contact form extraction",
        description: "Extract better data from inbound contact forms.",
      },
    ],
  },
  naturalLanguageFormBuilder: {
    slug: "natural-language-form-builder",
    title: "Natural Language Form Builder",
    description:
      "Create natural language forms where users write one message and Sift Forms extracts clean structured data for your workflow.",
    eyebrow: "Natural language form builder",
    h1: "A natural language form builder for messy real-world answers",
    intro:
      "Sift Forms lets users answer in plain English instead of wrestling with rigid fields. Your team still gets the structured data it needs, with the original message preserved for context.",
    primaryKeyword: "natural language form builder",
    proofPoints: [
      { metric: "Plain text", label: "for the user input" },
      { metric: "Fields", label: "for your operations team" },
      { metric: "Embed", label: "on any website" },
    ],
    sections: [
      {
        title: "Users should not have to think like your database",
        body:
          "Most forms ask users to split one story across dozens of boxes. Natural language forms let users describe the request once, then use AI to structure it behind the scenes.",
      },
      {
        title: "Designed for ambiguity",
        body:
          "People mention dates, amounts, symptoms, roles, products, constraints, and urgency in different orders. Sift Forms extracts those signals from the whole message instead of relying on perfect field completion.",
      },
      {
        title: "Flexible enough for custom workflows",
        body:
          "Define your own schema, choose required fields, inspect confidence, and connect the extracted output to the tools your team already uses.",
      },
    ],
    workflow: [
      {
        title: "Write a useful prompt",
        body:
          "Ask the user to describe the request, issue, claim, lead, application, or brief in their own words.",
      },
      {
        title: "Map the schema",
        body:
          "Tell Sift Forms which fields to extract and which fields are required for the workflow to proceed.",
      },
      {
        title: "Review or automate",
        body:
          "Use confidence scores to decide what can flow automatically and what should be reviewed by a person.",
      },
    ],
    useCases: [
      "Open-ended support forms",
      "Quote and estimate requests",
      "Professional services intake",
      "Complex application forms",
    ],
    faqs: [
      {
        question: "How is this different from a form builder with AI suggestions?",
        answer:
          "Many tools use AI to help create traditional forms. Sift Forms uses AI at submission time to extract structured data from a natural-language answer.",
      },
      {
        question: "Can I require specific information?",
        answer:
          "Yes. Required fields can be defined in the schema, and missing required information can be flagged for follow-up.",
      },
      {
        question: "Does this work for long answers?",
        answer:
          "Yes. Sift Forms is designed for free-text intake where the useful details may be spread across a paragraph or longer message.",
      },
    ],
    related: [
      {
        href: "/ai-form-builder",
        label: "AI form builder",
        description: "Build forms around AI extraction, not field fatigue.",
      },
      {
        href: "/templates/support-ticket",
        label: "Support ticket template",
        description: "Turn free-text support messages into tickets.",
      },
      {
        href: "/docs/embed",
        label: "Embed docs",
        description: "Add Sift Forms to your site with a script tag.",
      },
    ],
  },
  formDataExtractionApi: {
    slug: "form-data-extraction-api",
    title: "Form Data Extraction API",
    description:
      "Use the Sift Forms API to extract structured fields from free-text submissions and send clean JSON to your application.",
    eyebrow: "Form data extraction API",
    h1: "Extract structured form data from free-text submissions",
    intro:
      "Sift Forms gives developers an API for turning messy user submissions into structured JSON. Send text plus a schema, receive extracted fields, confidence scores, warnings, and follow-up requirements.",
    primaryKeyword: "form data extraction API",
    proofPoints: [
      { metric: "REST", label: "API for extraction" },
      { metric: "Webhooks", label: "for completed submissions" },
      { metric: "Schemas", label: "for custom field mapping" },
    ],
    sections: [
      {
        title: "A practical API for unstructured form answers",
        body:
          "Instead of forcing a custom parser into every intake workflow, define a schema once and let Sift Forms extract names, emails, amounts, categories, urgency, and custom fields from the raw submission.",
      },
      {
        title: "Built for product teams",
        body:
          "Use the API behind your own UI, combine it with the hosted widget, or route completed submissions into internal tools through webhooks.",
      },
      {
        title: "Safer automation with confidence signals",
        body:
          "Every extraction includes confidence and warnings, making it easier to decide whether to auto-route, ask for missing details, or send a record for review.",
      },
    ],
    workflow: [
      {
        title: "Create a schema",
        body:
          "Define the fields and required values your workflow needs in the Sift Forms dashboard.",
      },
      {
        title: "POST the text",
        body:
          "Call the extraction endpoint with the raw message and schema ID from your application.",
      },
      {
        title: "Use the JSON",
        body:
          "Store the submission, trigger webhooks, create tickets, update records, or ask for missing required fields.",
      },
    ],
    useCases: [
      "Custom intake UIs",
      "AI extraction inside existing products",
      "Webhook-first automation",
      "Back-office data entry reduction",
    ],
    faqs: [
      {
        question: "Can I use Sift Forms without the widget?",
        answer:
          "Yes. Developers can call the API directly and build their own front-end experience.",
      },
      {
        question: "Does the API return confidence scores?",
        answer:
          "Yes. Confidence information is returned with extracted values so your application can handle uncertain fields appropriately.",
      },
      {
        question: "Can I send extracted data to my own system?",
        answer:
          "Yes. Sift Forms supports webhooks and API access so completed submissions can flow into your own endpoints.",
      },
    ],
    related: [
      {
        href: "/docs/api",
        label: "API documentation",
        description: "See endpoint examples and response shapes.",
      },
      {
        href: "/integrations/webhook",
        label: "Webhook integration",
        description: "Send structured extraction data anywhere.",
      },
      {
        href: "/docs/widget",
        label: "Widget documentation",
        description: "Use the hosted widget when you do not need custom UI.",
      },
    ],
  },
  contactFormDataExtraction: {
    slug: "contact-form-data-extraction",
    title: "Contact Form Data Extraction",
    description:
      "Replace generic contact forms with AI extraction that turns inbound messages into structured lead, support, and intake data.",
    eyebrow: "Contact form data extraction",
    h1: "Turn contact form messages into structured intake data",
    intro:
      "Most contact forms collect a name, email, and a vague message. Sift Forms extracts the useful details inside that message so sales, support, and operations teams know what to do next.",
    primaryKeyword: "contact form data extraction",
    proofPoints: [
      { metric: "Intent", label: "extracted from the message" },
      { metric: "Routing", label: "by category and urgency" },
      { metric: "CRM", label: "ready lead fields" },
    ],
    sections: [
      {
        title: "Better than another generic message box",
        body:
          "Sift Forms keeps the low-friction contact form experience while extracting structured fields such as company, request type, budget, timeline, product, issue category, and urgency.",
      },
      {
        title: "Route the right request to the right team",
        body:
          "A sales enquiry, bug report, partnership request, quote request, and support issue can all arrive through the same form. AI extraction helps classify and route each one.",
      },
      {
        title: "Use it with your existing stack",
        body:
          "Send extracted contact data to HubSpot, Salesforce, Zendesk, Slack, Google Sheets, Zapier, Make, or a custom webhook endpoint.",
      },
    ],
    workflow: [
      {
        title: "Replace the contact form",
        body:
          "Embed a Sift Forms intake widget where your current contact form lives.",
      },
      {
        title: "Extract intent and details",
        body:
          "Pull out contact details, organization, reason for contact, urgency, budget, deadline, and any workflow-specific fields.",
      },
      {
        title: "Trigger follow-up",
        body:
          "Create CRM records, route support issues, notify Slack channels, or send high-value enquiries to the right person.",
      },
    ],
    useCases: [
      "Inbound sales qualification",
      "Support triage from contact pages",
      "Partnership enquiry routing",
      "Quote request extraction",
    ],
    faqs: [
      {
        question: "Can Sift Forms replace a website contact form?",
        answer:
          "Yes. You can embed Sift Forms on a contact page and extract structured data from the message instead of only collecting raw text.",
      },
      {
        question: "Can it tell sales and support messages apart?",
        answer:
          "Yes. You can include intent, category, or request type in your schema so Sift Forms classifies the message for routing.",
      },
      {
        question: "Does this work with CRM tools?",
        answer:
          "Yes. Use webhooks, Zapier, Make, or direct integrations to push extracted contact data into CRM and support systems.",
      },
    ],
    related: [
      {
        href: "/templates/lead-intake",
        label: "Lead intake template",
        description: "Extract CRM-ready data from inbound enquiries.",
      },
      {
        href: "/integrations/hubspot",
        label: "HubSpot integration",
        description: "Create or update CRM records from extracted data.",
      },
      {
        href: "/ai-intake-forms",
        label: "AI intake forms",
        description: "Capture richer intake data from open-ended requests.",
      },
    ],
  },
  typeformAiAlternative: {
    slug: "typeform-ai-alternative",
    title: "Typeform AI Alternative for Free-Text Forms",
    description:
      "Compare Sift Forms with Typeform for AI-first intake, natural language submissions, structured extraction, webhooks, and API workflows.",
    eyebrow: "Typeform AI alternative",
    h1: "A Typeform AI alternative for teams that need extracted data",
    intro:
      "Typeform is strong for polished surveys and structured forms. Sift Forms is different: users write naturally, and AI extracts the structured data your team needs for intake, routing, and automation.",
    primaryKeyword: "Typeform AI alternative",
    proofPoints: [
      { metric: "AI-first", label: "submission extraction" },
      { metric: "Schema", label: "driven output fields" },
      { metric: "Webhook", label: "ready automation" },
    ],
    sections: [
      {
        title: "When Typeform is the right fit",
        body:
          "Use Typeform when you need a polished traditional form, survey, quiz, or multi-step lead capture flow with carefully designed questions.",
      },
      {
        title: "When Sift Forms is the better fit",
        body:
          "Use Sift Forms when users need to explain a situation and your team needs structured output such as intent, category, urgency, budget, dates, contact fields, and custom workflow data.",
      },
      {
        title: "The difference is where AI sits",
        body:
          "Many form tools use AI to help create forms. Sift Forms uses AI at submission time to understand the user message and extract the operational data inside it.",
      },
    ],
    workflow: [
      {
        title: "Define an extraction schema",
        body:
          "List the fields you would normally ask across a long Typeform flow.",
      },
      {
        title: "Ask one open-ended question",
        body:
          "Let the user describe the issue, request, lead, claim, or brief in their own words.",
      },
      {
        title: "Send structured data downstream",
        body:
          "Use extracted JSON, confidence scores, and webhooks to move the request into your CRM, support queue, spreadsheet, or backend.",
      },
    ],
    useCases: [
      "Replacing long lead forms",
      "Collecting support context",
      "Routing free-text enquiries",
      "Turning form messages into CRM fields",
    ],
    faqs: [
      {
        question: "Is Sift Forms a direct Typeform replacement?",
        answer:
          "Not exactly. Sift Forms replaces traditional forms when free-text intake and structured extraction are more useful than a multi-step field-based form.",
      },
      {
        question: "Does Sift Forms have AI form generation like Typeform?",
        answer:
          "Sift Forms focuses on AI extraction from submissions. The core value is turning natural-language answers into reliable structured data.",
      },
      {
        question: "Can I compare Sift Forms and Typeform feature by feature?",
        answer:
          "Yes. The detailed Sift vs Typeform comparison covers use cases, pricing model differences, and when each tool is the better choice.",
      },
    ],
    related: [
      {
        href: "/alternative/typeform",
        label: "Typeform alternative",
        description: "See the broader alternative page.",
      },
      {
        href: "/compare/sift-vs-typeform",
        label: "Sift Forms vs Typeform",
        description: "Compare features, tradeoffs, and fit.",
      },
      {
        href: "/ai-form-builder",
        label: "AI form builder",
        description: "Learn how Sift Forms builds around extraction.",
      },
    ],
  },
} satisfies Record<string, SeoPillar>;

export const seoPillarList = Object.values(seoPillars);
