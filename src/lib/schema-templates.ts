import { SchemaField } from "@/lib/db/schema";

export type SchemaTemplate = {
  name: string;
  description: string;
  icon: string;
  fields: SchemaField[];
};

export const schemaTemplates: SchemaTemplate[] = [
  {
    name: "Support Ticket",
    description: "Extract customer support details from natural language descriptions",
    icon: "ticket",
    fields: [
      { name: "customer_name", label: "Customer Name", type: "text", required: true, description: "Full name of the person submitting" },
      { name: "email", label: "Email", type: "email", required: true, description: "Contact email address" },
      { name: "issue_type", label: "Issue Type", type: "select", required: true, description: "Category of the support issue", options: ["Billing", "Technical", "Account", "Feature Request", "Bug Report", "Other"] },
      { name: "priority", label: "Priority", type: "select", required: false, description: "Urgency level", options: ["Low", "Medium", "High", "Critical"] },
      { name: "account_id", label: "Account ID", type: "text", required: false, description: "Customer account or reference number" },
      { name: "description", label: "Issue Description", type: "text", required: true, description: "Summary of the problem" },
    ],
  },
  {
    name: "Lead Intake",
    description: "Capture inbound lead information from enquiry messages",
    icon: "user-plus",
    fields: [
      { name: "name", label: "Full Name", type: "text", required: true, description: "Person's full name" },
      { name: "email", label: "Email", type: "email", required: true, description: "Business email" },
      { name: "phone", label: "Phone", type: "phone", required: false, description: "Phone number with country code" },
      { name: "company", label: "Company", type: "text", required: false, description: "Company or organization name" },
      { name: "role", label: "Job Title", type: "text", required: false, description: "Their role or job title" },
      { name: "interest", label: "Interest", type: "text", required: true, description: "What they're interested in or looking for" },
      { name: "budget", label: "Budget", type: "text", required: false, description: "Stated or implied budget range" },
      { name: "timeline", label: "Timeline", type: "text", required: false, description: "When they need a solution" },
    ],
  },
  {
    name: "Legal Intake",
    description: "Structure initial legal consultation requests",
    icon: "scale",
    fields: [
      { name: "client_name", label: "Client Name", type: "text", required: true, description: "Full legal name" },
      { name: "email", label: "Email", type: "email", required: true, description: "Contact email" },
      { name: "phone", label: "Phone", type: "phone", required: false, description: "Phone number" },
      { name: "case_type", label: "Case Type", type: "select", required: true, description: "Area of law", options: ["Family", "Criminal", "Personal Injury", "Employment", "Real Estate", "Business", "Immigration", "Other"] },
      { name: "opposing_party", label: "Opposing Party", type: "text", required: false, description: "Name of the other party involved" },
      { name: "incident_date", label: "Incident Date", type: "date", required: false, description: "When the incident occurred" },
      { name: "urgency", label: "Urgency", type: "select", required: false, description: "How urgent is this matter", options: ["Routine", "Urgent", "Emergency"] },
      { name: "summary", label: "Case Summary", type: "text", required: true, description: "Brief description of the legal matter" },
    ],
  },
  {
    name: "Insurance Claim",
    description: "Extract details from insurance claim descriptions",
    icon: "shield",
    fields: [
      { name: "claimant_name", label: "Claimant Name", type: "text", required: true, description: "Name of the person filing" },
      { name: "policy_number", label: "Policy Number", type: "text", required: false, description: "Insurance policy reference" },
      { name: "claim_type", label: "Claim Type", type: "select", required: true, description: "Type of insurance claim", options: ["Auto", "Home", "Health", "Life", "Business", "Travel", "Other"] },
      { name: "incident_date", label: "Incident Date", type: "date", required: true, description: "Date of the incident" },
      { name: "incident_location", label: "Location", type: "text", required: false, description: "Where the incident occurred" },
      { name: "estimated_damage", label: "Estimated Damage", type: "number", required: false, description: "Estimated cost of damage in dollars" },
      { name: "injuries", label: "Injuries", type: "boolean", required: false, description: "Were there any injuries" },
      { name: "description", label: "Incident Description", type: "text", required: true, description: "What happened" },
    ],
  },
  {
    name: "Bug Report",
    description: "Structure bug reports from user descriptions",
    icon: "bug",
    fields: [
      { name: "reporter_email", label: "Reporter Email", type: "email", required: true, description: "Email of the person reporting" },
      { name: "severity", label: "Severity", type: "select", required: true, description: "How severe is the bug", options: ["Cosmetic", "Minor", "Major", "Critical", "Blocker"] },
      { name: "component", label: "Component", type: "text", required: false, description: "Which part of the product is affected" },
      { name: "steps_to_reproduce", label: "Steps to Reproduce", type: "text", required: true, description: "How to trigger the bug" },
      { name: "expected_behavior", label: "Expected Behavior", type: "text", required: false, description: "What should happen" },
      { name: "actual_behavior", label: "Actual Behavior", type: "text", required: true, description: "What actually happens" },
      { name: "browser", label: "Browser/Environment", type: "text", required: false, description: "Browser, OS, or device info" },
    ],
  },
  {
    name: "Customer Feedback",
    description: "Extract structured feedback from customer messages",
    icon: "message",
    fields: [
      { name: "customer_name", label: "Customer Name", type: "text", required: false, description: "Name if provided" },
      { name: "email", label: "Email", type: "email", required: false, description: "Contact email" },
      { name: "sentiment", label: "Sentiment", type: "select", required: true, description: "Overall tone of the feedback", options: ["Very Positive", "Positive", "Neutral", "Negative", "Very Negative"] },
      { name: "category", label: "Category", type: "select", required: true, description: "What the feedback is about", options: ["Product", "Service", "Pricing", "UX/Design", "Performance", "Support", "Other"] },
      { name: "rating", label: "Rating", type: "number", required: false, description: "Numeric rating if given (1-10)", validation: { min: 1, max: 10 } },
      { name: "summary", label: "Feedback Summary", type: "text", required: true, description: "Key points from the feedback" },
      { name: "would_recommend", label: "Would Recommend", type: "boolean", required: false, description: "Whether they would recommend to others" },
    ],
  },
];
