export type Competitor = {
  slug: string;
  name: string;
  description: string;
  website: string;
  pricing: string;
  paradigm: "form-builder" | "survey" | "all-in-one";
  features: {
    name: string;
    sift: boolean | string;
    competitor: boolean | string;
  }[];
  siftAdvantages: string[];
  competitorAdvantages: string[];
  bestFor: string;
  switchReason: string;
  faqs: { question: string; answer: string }[];
};

const sharedFeatures = (overrides: Record<string, boolean | string>) => [
  {
    name: "AI text extraction",
    sift: true,
    competitor: overrides["AI text extraction"] ?? false,
  },
  {
    name: "Natural language input",
    sift: true,
    competitor: overrides["Natural language input"] ?? false,
  },
  {
    name: "Drag-and-drop builder",
    sift: "Not needed — AI extracts from freeform text" as string,
    competitor: overrides["Drag-and-drop builder"] ?? true,
  },
  {
    name: "Widget embedding",
    sift: true,
    competitor: overrides["Widget embedding"] ?? true,
  },
  {
    name: "API access",
    sift: "Growth plan and above" as string,
    competitor: overrides["API access"] ?? false,
  },
  {
    name: "Webhook integrations",
    sift: true,
    competitor: overrides["Webhook integrations"] ?? true,
  },
  {
    name: "File/image processing",
    sift: true,
    competitor: overrides["File/image processing"] ?? false,
  },
  {
    name: "Conditional logic",
    sift: "AI-driven" as string,
    competitor: overrides["Conditional logic"] ?? true,
  },
  {
    name: "Multi-language support",
    sift: "120+ via AI" as string,
    competitor: overrides["Multi-language support"] ?? false,
  },
  {
    name: "Custom branding",
    sift: "Coming soon" as string,
    competitor: overrides["Custom branding"] ?? true,
  },
];

export const competitors: Competitor[] = [
  // ─── 1. Typeform ──────────────────────────────────────────────────
  {
    slug: "typeform",
    name: "Typeform",
    description:
      "A conversational form builder known for its one-question-at-a-time interface and polished design.",
    website: "https://www.typeform.com",
    pricing: "From $25/month (Basic)",
    paradigm: "form-builder",
    features: sharedFeatures({
      "AI text extraction": false,
      "Natural language input": false,
      "Drag-and-drop builder": true,
      "Widget embedding": true,
      "API access": true,
      "Webhook integrations": true,
      "File/image processing": "File upload only",
      "Conditional logic": true,
      "Multi-language support": "Manual translation",
      "Custom branding": true,
    }),
    siftAdvantages: [
      "Users write naturally instead of clicking through 15+ screens — completion rates jump dramatically",
      "AI extracts structured data from messy, real-world text — no rigid field validation blocking submissions",
      "Handles documents and images natively — upload a photo of a business card and get structured contact data",
      "Starts at $29/month with 500 extractions — Typeform charges $25/month for just 100 responses",
    ],
    competitorAdvantages: [
      "Beautiful, polished UI with extensive design customisation and brand kits",
      "Massive integration ecosystem with 120+ native connectors (Zapier, HubSpot, Salesforce, etc.)",
    ],
    bestFor:
      "Teams that need visually stunning branded surveys with extensive third-party integrations and don't mind the per-response pricing model.",
    switchReason:
      "Typeform's one-question-at-a-time flow creates long, tedious experiences for data-heavy forms. Sift lets users dump all their information at once and AI handles the rest.",
    faqs: [
      {
        question: "Is Sift a Typeform alternative?",
        answer:
          "Sift takes a fundamentally different approach. Where Typeform presents questions one at a time, Sift lets users describe their situation in plain language and uses AI to extract structured data. This means fewer drop-offs and richer responses — especially for complex forms with 10+ fields.",
      },
      {
        question: "Can I migrate from Typeform to Sift?",
        answer:
          "Yes. Define your schema in Sift matching your Typeform fields, swap the embed code, and your users can start submitting via natural language immediately. Your webhook endpoints stay the same.",
      },
      {
        question: "How does Sift's pricing compare to Typeform?",
        answer:
          "Typeform's Basic plan starts at $25/month for 100 responses. Sift's Starter plan is $29/month for 500 extractions — 5x the volume for a similar price. Sift's Growth plan at $79/month includes 2,000 extractions and full API access.",
      },
    ],
  },

  // ─── 2. Jotform ──────────────────────────────────────────────────
  {
    slug: "jotform",
    name: "Jotform",
    description:
      "A feature-rich form builder with 10,000+ templates, payment collection, and a generous free tier.",
    website: "https://www.jotform.com",
    pricing: "Free (5 forms / 100 submissions), from $34/month (Bronze)",
    paradigm: "form-builder",
    features: sharedFeatures({
      "AI text extraction": false,
      "Natural language input": false,
      "Drag-and-drop builder": true,
      "Widget embedding": true,
      "API access": true,
      "Webhook integrations": true,
      "File/image processing": "File upload only",
      "Conditional logic": true,
      "Multi-language support": "Manual translation via form settings",
      "Custom branding": true,
    }),
    siftAdvantages: [
      "No more designing 30-field forms that users abandon halfway through — one text box replaces them all",
      "AI understands context, so a user writing 'I run a 12-person agency in Manchester' fills company size, type, and location in one sentence",
      "Process uploaded documents (invoices, receipts, business cards) directly into structured data",
      "Purpose-built for data extraction — not a general form builder trying to bolt on AI features",
    ],
    competitorAdvantages: [
      "10,000+ pre-built templates covering virtually every use case imaginable",
      "Built-in payment processing (Stripe, PayPal, Square) and PDF generation without add-ons",
    ],
    bestFor:
      "Teams that want a huge template library, built-in payment collection, and a traditional form-building experience with a generous free plan.",
    switchReason:
      "Jotform's template-heavy approach still forces users through rigid field-by-field forms. Sift eliminates form fatigue entirely — users tell you what you need to know, and AI does the parsing.",
    faqs: [
      {
        question: "Why choose Sift over Jotform?",
        answer:
          "Jotform is excellent for traditional forms, but Sift solves a different problem: extracting structured data from unstructured input. If your forms have high abandonment rates or you're collecting complex information that doesn't fit neatly into dropdowns and text fields, Sift will dramatically improve completion rates.",
      },
      {
        question: "Does Sift have templates like Jotform?",
        answer:
          "Sift uses schemas instead of templates. You define the data fields you need, and AI handles the input format. This means you don't need hundreds of templates — one schema adapts to however your users choose to express their information.",
      },
      {
        question: "Can Sift handle payments like Jotform?",
        answer:
          "Sift is focused on data extraction rather than payment collection. For payment workflows, you can use Sift to capture order details via natural language and pipe the structured data to Stripe or your payment processor via webhooks.",
      },
    ],
  },

  // ─── 3. Google Forms ─────────────────────────────────────────────
  {
    slug: "google-forms",
    name: "Google Forms",
    description:
      "Google's free, no-frills form tool tightly integrated with Google Sheets, Drive, and Workspace.",
    website: "https://forms.google.com",
    pricing: "Free (with Google account), Workspace plans from $7/user/month",
    paradigm: "form-builder",
    features: sharedFeatures({
      "AI text extraction": false,
      "Natural language input": false,
      "Drag-and-drop builder": "Basic editor (not drag-and-drop)",
      "Widget embedding": true,
      "API access": "Via Apps Script",
      "Webhook integrations": "Via Apps Script or add-ons",
      "File/image processing": "File upload to Drive",
      "Conditional logic": "Basic section branching",
      "Multi-language support": "Manual — duplicate form per language",
      "Custom branding": "Limited — header image and colour only",
    }),
    siftAdvantages: [
      "AI understands natural language — users write freely instead of picking from rigid multiple-choice options",
      "Process images and documents directly — no need for separate file-to-data workflows",
      "Purpose-built API and webhooks — no Apps Script workarounds needed for integrations",
      "120+ languages supported automatically via AI, no manual translation required",
    ],
    competitorAdvantages: [
      "Completely free with unlimited forms and responses — hard to beat on price",
      "Native Google Workspace integration means zero setup for Sheets, Drive, and Gmail workflows",
    ],
    bestFor:
      "Teams already deep in Google Workspace who need simple, free surveys and don't require advanced data processing or custom integrations.",
    switchReason:
      "Google Forms works for simple surveys, but it falls apart when you need to collect complex, unstructured information. Sift handles messy real-world input that would require dozens of Google Form fields.",
    faqs: [
      {
        question: "Why pay for Sift when Google Forms is free?",
        answer:
          "Google Forms works well for simple questionnaires. Sift solves a different problem — extracting structured data from unstructured text and documents. If you're building 20-field forms, dealing with low completion rates, or manually processing free-text responses into spreadsheets, Sift pays for itself in time saved.",
      },
      {
        question: "Can Sift send data to Google Sheets like Google Forms?",
        answer:
          "Yes. Use Sift's webhook integrations to push extracted data to Google Sheets via Zapier, Make, or a simple Apps Script webhook receiver. The data arrives already structured and validated by AI.",
      },
      {
        question: "Does Sift work with Google Workspace?",
        answer:
          "Sift is platform-agnostic. It works via embeddable widgets and API endpoints that integrate with any stack, including Google Workspace, through webhooks and standard APIs.",
      },
    ],
  },

  // ─── 4. Tally ─────────────────────────────────────────────────────
  {
    slug: "tally",
    name: "Tally",
    description:
      "A free-to-use form builder with a Notion-like editing experience and no limits on the free plan's core features.",
    website: "https://tally.so",
    pricing: "Free (unlimited forms & submissions), Pro from $29/month",
    paradigm: "form-builder",
    features: sharedFeatures({
      "AI text extraction": false,
      "Natural language input": false,
      "Drag-and-drop builder": "Notion-style block editor",
      "Widget embedding": true,
      "API access": false,
      "Webhook integrations": true,
      "File/image processing": "File upload only",
      "Conditional logic": true,
      "Multi-language support": "Manual translation",
      "Custom branding": "Pro plan",
    }),
    siftAdvantages: [
      "Replace long multi-step forms with a single natural language input — users complete in seconds, not minutes",
      "AI-powered extraction means you get clean, structured data even from messy, rambling responses",
      "Full API access on Growth plan for building custom workflows and automations",
      "Native document and image processing — upload a receipt and get line items extracted automatically",
    ],
    competitorAdvantages: [
      "Incredibly generous free tier with unlimited forms, submissions, and most features included",
      "Notion-like editing experience feels intuitive and modern for teams already using block-based tools",
    ],
    bestFor:
      "Startups and small teams who want a modern, free form builder with a clean UX and don't need AI-powered data extraction.",
    switchReason:
      "Tally makes beautiful forms, but they're still forms — users still click through field after field. Sift eliminates the form entirely and lets users communicate naturally.",
    faqs: [
      {
        question: "Tally is free — why should I pay for Sift?",
        answer:
          "Tally is a great free form builder, but it's still a traditional form. If your use case involves complex data collection where users struggle with rigid fields — intake forms, applications, support requests — Sift's AI extraction will dramatically improve both completion rates and data quality. The ROI from fewer abandoned submissions typically exceeds the subscription cost.",
      },
      {
        question: "Is Sift's editing experience as nice as Tally's?",
        answer:
          "Sift doesn't have a form editor because there's no form to edit. You define a data schema (the fields you need), and Sift generates an AI-powered input widget. The complexity lives in the AI, not the UI builder.",
      },
      {
        question: "Can I use Sift and Tally together?",
        answer:
          "Absolutely. Use Tally for simple surveys and feedback forms where traditional fields work well, and Sift for complex data intake where natural language input shines. They serve different purposes.",
      },
    ],
  },

  // ─── 5. Fillout ───────────────────────────────────────────────────
  {
    slug: "fillout",
    name: "Fillout",
    description:
      "A modern form builder that connects directly to Airtable, Notion, Google Sheets, and other databases as backends.",
    website: "https://www.fillout.com",
    pricing: "Free (1,000 responses/month), from $19/month (Starter)",
    paradigm: "form-builder",
    features: sharedFeatures({
      "AI text extraction": false,
      "Natural language input": false,
      "Drag-and-drop builder": true,
      "Widget embedding": true,
      "API access": "Business plan",
      "Webhook integrations": true,
      "File/image processing": "File upload only",
      "Conditional logic": true,
      "Multi-language support": "Manual translation",
      "Custom branding": true,
    }),
    siftAdvantages: [
      "Users describe their situation naturally instead of navigating complex multi-step forms",
      "AI extracts and validates data in real time — catches inconsistencies a traditional form can't detect",
      "Process documents and images directly into structured records without manual data entry",
      "No need to design conditional branching logic — AI understands context and extracts what's relevant",
    ],
    competitorAdvantages: [
      "Native database integrations (Airtable, Notion, Supabase) act as form backends without any middleware",
      "Scheduling, payment, and e-signature features built directly into the form builder",
    ],
    bestFor:
      "Teams using Airtable or Notion as their database who want forms that write directly to their existing tables without Zapier or custom code.",
    switchReason:
      "Fillout excels at connecting forms to databases, but users still have to fill in every field manually. Sift lets users paste a paragraph and the AI populates your database fields automatically.",
    faqs: [
      {
        question: "Does Sift integrate with Airtable like Fillout?",
        answer:
          "Sift sends structured JSON via webhooks and API, which connects to Airtable through Zapier, Make, or Airtable's API. While it's not a native one-click integration like Fillout's, the data arrives pre-structured and validated by AI, often cleaner than what comes through traditional form fields.",
      },
      {
        question: "Can Sift handle scheduling and payments like Fillout?",
        answer:
          "Sift focuses on AI-powered data extraction rather than scheduling or payments. For those needs, pipe Sift's structured output to Calendly, Stripe, or similar services via webhooks.",
      },
      {
        question: "How does Sift compare to Fillout on pricing?",
        answer:
          "Fillout starts at $19/month with 1,000 responses. Sift starts at $29/month with 500 AI-powered extractions. The difference is what you get: Fillout gives you traditional form responses, Sift gives you AI-extracted structured data from freeform text, documents, and images.",
      },
    ],
  },

  // ─── 6. Wufoo ─────────────────────────────────────────────────────
  {
    slug: "wufoo",
    name: "Wufoo",
    description:
      "One of the original online form builders, now owned by SurveyMonkey, with payment collection and basic reporting.",
    website: "https://www.wufoo.com",
    pricing: "Free (5 forms / 100 entries), from $14.08/month (Starter)",
    paradigm: "form-builder",
    features: sharedFeatures({
      "AI text extraction": false,
      "Natural language input": false,
      "Drag-and-drop builder": true,
      "Widget embedding": true,
      "API access": true,
      "Webhook integrations": "Via WebHook integration",
      "File/image processing": "File upload only",
      "Conditional logic": "Basic skip logic",
      "Multi-language support": false,
      "Custom branding": "Paid plans",
    }),
    siftAdvantages: [
      "Modern AI-first architecture vs Wufoo's ageing interface that hasn't had a major update in years",
      "Natural language input eliminates the friction of traditional multi-field forms",
      "Built-in document and image processing — extract data from photos and PDFs automatically",
      "120+ languages supported natively via AI — Wufoo has no multi-language support",
    ],
    competitorAdvantages: [
      "Very cheap entry point at $14/month with payment collection included",
      "Long track record and SurveyMonkey's enterprise backing for stability",
    ],
    bestFor:
      "Small businesses that need a cheap, reliable form builder with payment collection and don't need modern features or AI capabilities.",
    switchReason:
      "Wufoo was groundbreaking in 2006 but hasn't kept pace with modern expectations. Sift represents where data collection is heading — AI-powered, natural language, zero form fatigue.",
    faqs: [
      {
        question: "Is Sift more modern than Wufoo?",
        answer:
          "Significantly. Wufoo pioneered online forms but its core architecture dates back to the mid-2000s. Sift is built from the ground up on AI extraction, processing natural language and documents in ways that weren't possible when Wufoo was created.",
      },
      {
        question: "Can Sift collect payments like Wufoo?",
        answer:
          "Sift focuses on data extraction. For payment workflows, you can extract order information via natural language and send the structured data to Stripe or PayPal via webhooks. This actually gives you more flexibility than Wufoo's built-in payment fields.",
      },
      {
        question: "Is Wufoo still being actively developed?",
        answer:
          "Wufoo receives maintenance updates under SurveyMonkey's ownership, but major feature development has slowed considerably. Sift is actively developed with AI capabilities improving continuously as language models advance.",
      },
    ],
  },

  // ─── 7. Cognito Forms ────────────────────────────────────────────
  {
    slug: "cognito-forms",
    name: "Cognito Forms",
    description:
      "A powerful form builder with advanced calculations, repeating sections, and payment processing at a competitive price.",
    website: "https://www.cognitoforms.com",
    pricing: "Free (unlimited forms), from $15/month (Pro)",
    paradigm: "form-builder",
    features: sharedFeatures({
      "AI text extraction": false,
      "Natural language input": false,
      "Drag-and-drop builder": true,
      "Widget embedding": true,
      "API access": "Team plan ($35/month)",
      "Webhook integrations": "Via Zapier or API",
      "File/image processing": "File upload only",
      "Conditional logic": true,
      "Multi-language support": "Manual translation",
      "Custom branding": true,
    }),
    siftAdvantages: [
      "No form-building required — define your schema and AI handles the entire input experience",
      "Processes documents, images, and freeform text into structured data automatically",
      "AI-driven validation catches semantic errors, not just format errors (e.g. revenue vs employee count plausibility)",
      "120+ languages without any manual translation or form duplication",
    ],
    competitorAdvantages: [
      "Advanced calculation fields and repeating sections ideal for order forms, invoices, and expense reports",
      "Generous free tier with unlimited forms and a well-designed conditional logic builder",
    ],
    bestFor:
      "Organisations that need complex calculated forms with repeating line items, like order forms or expense reports, at an affordable price.",
    switchReason:
      "Cognito Forms is powerful for structured, calculation-heavy forms. But when your users need to provide narrative information — project briefs, support requests, intake details — Sift's natural language approach captures far more data with far less friction.",
    faqs: [
      {
        question: "Can Sift handle calculations like Cognito Forms?",
        answer:
          "Sift's AI can extract and compute values mentioned in text (e.g. 'I need 50 units at $12 each' extracts quantity, unit price, and total). For complex multi-line calculated forms like invoices, Cognito Forms' dedicated calculation engine may be more appropriate.",
      },
      {
        question: "Does Sift support repeating sections?",
        answer:
          "Sift handles repeating data naturally. A user can write 'I have three employees: John (developer, $80K), Sarah (designer, $75K), and Mike (PM, $90K)' and Sift extracts an array of structured records. No repeating section UI needed.",
      },
      {
        question: "How do the free tiers compare?",
        answer:
          "Cognito Forms offers unlimited free forms with basic features. Sift doesn't have a free tier — it starts at $29/month because every submission uses AI processing. The value proposition is different: Cognito saves money, Sift saves time and captures better data.",
      },
    ],
  },

  // ─── 8. Paperform ────────────────────────────────────────────────
  {
    slug: "paperform",
    name: "Paperform",
    description:
      "A form builder that doubles as a landing page creator, blending rich content with form fields in a document-style editor.",
    website: "https://paperform.co",
    pricing: "From $24/month (Essentials)",
    paradigm: "form-builder",
    features: sharedFeatures({
      "AI text extraction": false,
      "Natural language input": false,
      "Drag-and-drop builder": "Document-style guided editor",
      "Widget embedding": true,
      "API access": "Business plan ($159/month)",
      "Webhook integrations": true,
      "File/image processing": "File upload and product images",
      "Conditional logic": true,
      "Multi-language support": "Manual translation",
      "Custom branding": true,
    }),
    siftAdvantages: [
      "Sift eliminates the form entirely — users write naturally instead of scrolling through a long document-style page",
      "AI extraction means you don't need to design conditional logic paths — the AI understands context automatically",
      "Native document processing turns uploaded files into structured data, not just attachments",
      "API access at $79/month vs Paperform's $159/month for the same capability",
    ],
    competitorAdvantages: [
      "Beautiful document-style pages that combine rich content, images, and videos with form fields — great as standalone landing pages",
      "Built-in appointment scheduling, e-commerce features, and extensive native integrations (3,000+)",
    ],
    bestFor:
      "Businesses that want their form to double as a content-rich landing page with built-in scheduling and e-commerce capabilities.",
    switchReason:
      "Paperform creates beautiful pages, but they're still traditional forms underneath. Sift removes the friction of filling in fields entirely — users communicate naturally and AI handles the structure.",
    faqs: [
      {
        question: "Can Sift replace Paperform as a landing page?",
        answer:
          "Sift is a data extraction tool, not a landing page builder. If you need a content-rich page with embedded form fields, Paperform is better suited. If you need to extract structured data from natural language input, Sift is the right choice. Many teams use a landing page builder alongside Sift's embedded widget.",
      },
      {
        question: "How does Sift's AI compare to filling out a Paperform?",
        answer:
          "A typical Paperform with 15 fields takes 3-5 minutes to complete. With Sift, a user can describe the same information in 30 seconds of natural writing, and AI extracts all 15 data points. Completion rates are dramatically higher.",
      },
      {
        question: "Does Sift have scheduling features like Paperform?",
        answer:
          "No. Sift is laser-focused on AI data extraction. For scheduling, integrate Sift with Calendly, Cal.com, or similar tools via webhooks.",
      },
    ],
  },

  // ─── 9. Formstack ────────────────────────────────────────────────
  {
    slug: "formstack",
    name: "Formstack",
    description:
      "An enterprise-grade workflow platform combining forms, document generation, and electronic signatures with deep compliance features.",
    website: "https://www.formstack.com",
    pricing: "From $50/month (Starter, billed annually)",
    paradigm: "all-in-one",
    features: sharedFeatures({
      "AI text extraction": false,
      "Natural language input": false,
      "Drag-and-drop builder": true,
      "Widget embedding": true,
      "API access": true,
      "Webhook integrations": true,
      "File/image processing": "File upload and document generation",
      "Conditional logic": true,
      "Multi-language support": "Manual translation",
      "Custom branding": true,
    }),
    siftAdvantages: [
      "10x simpler setup — define a schema vs designing complex enterprise form workflows",
      "Users complete submissions in seconds with natural language instead of navigating multi-page enterprise forms",
      "AI validation catches semantic errors that rule-based validation misses entirely",
      "Starting at $29/month vs Formstack's $50/month minimum — significantly lower entry point",
    ],
    competitorAdvantages: [
      "Full workflow suite with document generation, e-signatures, and approval workflows in one platform",
      "HIPAA compliance, SOC 2 certification, and enterprise security features for regulated industries",
    ],
    bestFor:
      "Enterprise teams in regulated industries (healthcare, finance, government) that need HIPAA-compliant forms with document generation, e-signatures, and audit trails.",
    switchReason:
      "Formstack is built for enterprise compliance workflows. If your primary need is collecting complex data efficiently rather than managing document workflows, Sift's AI-first approach gets better data in less time at a fraction of the cost.",
    faqs: [
      {
        question: "Is Sift HIPAA compliant like Formstack?",
        answer:
          "Sift is not currently HIPAA certified. If you're collecting protected health information and need BAA agreements and HIPAA compliance, Formstack is the appropriate choice. Sift is focused on general-purpose AI data extraction for non-regulated use cases.",
      },
      {
        question: "Can Sift generate documents like Formstack?",
        answer:
          "Sift focuses on the input side — extracting structured data from unstructured text. For document generation from that data, connect Sift to a tool like PandaDoc or DocuSign via webhooks.",
      },
      {
        question: "How does Sift handle enterprise needs?",
        answer:
          "Sift's Scale plan ($199/month) includes 10,000 extractions, unlimited schemas and webhooks, and full API access. For enterprise-specific needs like SSO, custom data retention, or on-premise deployment, contact our team.",
      },
    ],
  },

  // ─── 10. Formbricks ──────────────────────────────────────────────
  {
    slug: "formbricks",
    name: "Formbricks",
    description:
      "An open-source survey and experience management platform with in-app surveys, website pop-ups, and link surveys.",
    website: "https://formbricks.com",
    pricing: "Free (self-hosted), Cloud from $30/month",
    paradigm: "survey",
    features: sharedFeatures({
      "AI text extraction": false,
      "Natural language input": false,
      "Drag-and-drop builder": true,
      "Widget embedding": "In-app survey widget",
      "API access": true,
      "Webhook integrations": true,
      "File/image processing": false,
      "Conditional logic": true,
      "Multi-language support": "Community translations",
      "Custom branding": true,
    }),
    siftAdvantages: [
      "AI extracts structured data from freeform text — fundamentally different from traditional survey questions",
      "Process documents, images, and PDFs directly into structured records",
      "No self-hosting complexity — Sift is fully managed with zero infrastructure overhead",
      "120+ languages automatically via AI, no community translations or manual setup needed",
    ],
    competitorAdvantages: [
      "Fully open-source — self-host for free with complete control over your data and no vendor lock-in",
      "Purpose-built for in-app experience surveys with user targeting, event triggers, and product analytics integration",
    ],
    bestFor:
      "Product teams that want open-source, self-hosted in-app surveys with user targeting and don't mind managing their own infrastructure.",
    switchReason:
      "Formbricks is great for in-app micro-surveys and NPS scores. When you need to collect complex, narrative data — support tickets, applications, intake forms — Sift's AI approach captures richer information with less friction.",
    faqs: [
      {
        question: "Is Sift open source like Formbricks?",
        answer:
          "No, Sift is a managed SaaS product. This means zero infrastructure to maintain, automatic updates, and no DevOps overhead. If open source and self-hosting are requirements, Formbricks is the better choice.",
      },
      {
        question: "Can Sift do in-app surveys like Formbricks?",
        answer:
          "Sift's embeddable widget can be placed in your app, but it's designed for data collection rather than micro-surveys. For NPS scores, feature feedback, and quick polls, Formbricks' purpose-built survey triggers are more appropriate.",
      },
      {
        question: "Which is better for complex data collection?",
        answer:
          "Sift excels at complex data collection. Where Formbricks would need a 20-question survey, Sift lets users describe everything in natural language and AI extracts the structured data. For simple NPS or satisfaction surveys, Formbricks is the better fit.",
      },
    ],
  },

  // ─── 11. SurveyMonkey ────────────────────────────────────────────
  {
    slug: "surveymonkey",
    name: "SurveyMonkey",
    description:
      "The world's most recognised survey platform with advanced analytics, AI-powered survey creation, and enterprise-grade features.",
    website: "https://www.surveymonkey.com",
    pricing: "Free (10 questions / 25 responses), from $25/month (Individual Advantage)",
    paradigm: "survey",
    features: sharedFeatures({
      "AI text extraction": false,
      "Natural language input": false,
      "Drag-and-drop builder": true,
      "Widget embedding": true,
      "API access": "Premier plan ($75+/month)",
      "Webhook integrations": "Via integrations and API",
      "File/image processing": false,
      "Conditional logic": true,
      "Multi-language support": "50+ languages (manual setup)",
      "Custom branding": "Paid plans",
    }),
    siftAdvantages: [
      "Collects unstructured, narrative responses and turns them into structured data — SurveyMonkey only processes structured survey answers",
      "Users complete in seconds instead of clicking through multi-page surveys",
      "Native document and image processing — extract data from uploaded files automatically",
      "API access at $79/month vs SurveyMonkey's $75+/month Premier plan, with more extraction volume included",
    ],
    competitorAdvantages: [
      "Industry-leading survey analytics with benchmarking, sentiment analysis, and statistical significance testing",
      "Massive brand recognition, trusted by 98% of the Fortune 500, with extensive academic and research question banks",
    ],
    bestFor:
      "Research teams and enterprises that need statistically rigorous surveys with benchmarking, advanced analytics, and established academic question banks.",
    switchReason:
      "SurveyMonkey is built for structured surveys and statistical analysis. If you're using it for data intake, applications, or lead capture — where people are providing information rather than answering research questions — Sift's natural language approach is dramatically more efficient.",
    faqs: [
      {
        question: "Is Sift a survey tool like SurveyMonkey?",
        answer:
          "No. SurveyMonkey is a survey and research platform — it asks structured questions and analyses aggregated responses. Sift is a data extraction tool — it takes unstructured text and produces structured data. They solve fundamentally different problems, though there's overlap in use cases like lead capture and intake forms.",
      },
      {
        question: "Can Sift analyse responses like SurveyMonkey?",
        answer:
          "Sift provides confidence scores and cross-field validation for each extraction, but it doesn't offer survey-style analytics like response distributions, benchmarking, or statistical testing. For research and survey analytics, SurveyMonkey is the better tool.",
      },
      {
        question: "Which should I choose for lead capture forms?",
        answer:
          "For lead capture, Sift is likely the better choice. Prospects can describe their needs naturally ('I run a 50-person SaaS company looking for a CRM that integrates with Salesforce') and Sift extracts company size, industry, requirements, and integrations. With SurveyMonkey, they'd click through 10+ dropdown fields.",
      },
    ],
  },

  // ─── 12. Microsoft Forms ─────────────────────────────────────────
  {
    slug: "microsoft-forms",
    name: "Microsoft Forms",
    description:
      "Microsoft's form and quiz builder, tightly integrated with Microsoft 365, Teams, SharePoint, and Power Automate.",
    website: "https://forms.microsoft.com",
    pricing: "Included with Microsoft 365 (from $6/user/month)",
    paradigm: "form-builder",
    features: sharedFeatures({
      "AI text extraction": false,
      "Natural language input": false,
      "Drag-and-drop builder": "Basic linear editor",
      "Widget embedding": "Via SharePoint or Teams embed",
      "API access": "Via Microsoft Graph API",
      "Webhook integrations": "Via Power Automate",
      "File/image processing": "File upload only",
      "Conditional logic": "Basic branching",
      "Multi-language support": "Via Translator integration",
      "Custom branding": "Limited — themes and header image",
    }),
    siftAdvantages: [
      "AI-powered natural language input vs Microsoft Forms' rigid field-by-field approach",
      "Works anywhere — not locked into the Microsoft 365 ecosystem",
      "Document and image processing built in — no Power Automate flows needed to extract file data",
      "120+ languages automatically vs manual Translator integration setup",
    ],
    competitorAdvantages: [
      "Included free with Microsoft 365 — no additional cost for existing M365 organisations",
      "Deep integration with Teams, SharePoint, Power Automate, and the entire Microsoft ecosystem for enterprise workflows",
    ],
    bestFor:
      "Organisations already on Microsoft 365 that want simple internal forms and quizzes tightly integrated with Teams, SharePoint, and Power Automate.",
    switchReason:
      "Microsoft Forms is convenient for M365 shops but limited in capability. Sift's AI extraction handles complex data collection that would require Power Automate flows and multiple Microsoft tools to replicate.",
    faqs: [
      {
        question: "Why use Sift instead of Microsoft Forms if we're already on M365?",
        answer:
          "Microsoft Forms is fine for simple internal polls, quizzes, and basic feedback. When you need to collect complex information — client intake, project briefs, support requests — Sift's natural language approach captures far richer data. The question is whether the use case justifies a dedicated tool.",
      },
      {
        question: "Can Sift integrate with Power Automate?",
        answer:
          "Yes. Sift's webhook output can trigger Power Automate flows via HTTP triggers. The structured JSON data Sift produces maps cleanly to Power Automate's data parsing capabilities.",
      },
      {
        question: "Does Sift work within Microsoft Teams?",
        answer:
          "Sift's embeddable widget can be added to a Teams tab via URL embedding. It's not a native Teams app, but the widget works within any web container including Teams' built-in browser.",
      },
    ],
  },

  // ─── 13. Weavely ─────────────────────────────────────────────────
  {
    slug: "weavely",
    name: "Weavely",
    description:
      "A Figma-to-form tool that lets designers create forms directly in Figma and publish them as working web forms.",
    website: "https://www.weavely.ai",
    pricing: "Free (3 forms), Pro from $16/month",
    paradigm: "form-builder",
    features: sharedFeatures({
      "AI text extraction": false,
      "Natural language input": false,
      "Drag-and-drop builder": "Figma-based design",
      "Widget embedding": true,
      "API access": false,
      "Webhook integrations": "Via Zapier",
      "File/image processing": false,
      "Conditional logic": "Basic logic",
      "Multi-language support": false,
      "Custom branding": "Full design control via Figma",
    }),
    siftAdvantages: [
      "No design tool required — define a schema and get a working AI-powered input widget instantly",
      "AI extracts structured data from natural language — no form fields to design or maintain",
      "Full API and webhook support for building custom workflows and integrations",
      "Process documents and images directly — Weavely is text-field-only",
    ],
    competitorAdvantages: [
      "Pixel-perfect form design using Figma — ultimate creative control over every visual element",
      "Designers work in their native tool (Figma) with zero learning curve for the form-building process",
    ],
    bestFor:
      "Design-led teams that want pixel-perfect branded forms designed in Figma and published without developer involvement.",
    switchReason:
      "Weavely gives designers total visual control, but the end result is still a traditional form. Sift removes the need for form design entirely — users write naturally and AI handles the structure, which means faster deployment and higher completion rates.",
    faqs: [
      {
        question: "Can Sift match Weavely's design quality?",
        answer:
          "Sift takes a different approach. Instead of designing beautiful multi-field forms, Sift provides a clean text input widget where users describe their information naturally. The design is intentionally minimal because the AI does the heavy lifting. If pixel-perfect form aesthetics are critical to your brand, Weavely is the better choice.",
      },
      {
        question: "Do I need Figma to use Sift?",
        answer:
          "No. Sift requires zero design tools. You define your data schema (the fields you need), and Sift generates an embeddable widget. There's no visual form to design because users type naturally instead of filling in fields.",
      },
      {
        question: "Which ships faster — Sift or Weavely?",
        answer:
          "Sift ships faster. Define a schema, grab the embed code, and you're live. Weavely requires designing the form in Figma first, then publishing. Sift can go from zero to production in minutes.",
      },
    ],
  },
];
