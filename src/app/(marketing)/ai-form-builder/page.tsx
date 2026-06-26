import type { Metadata } from "next";
import { SeoPillarPage } from "@/components/pseo/seo-pillar-page";
import { createMetadata } from "@/lib/pseo/metadata";
import { seoPillars } from "@/lib/pseo/pillars";

const pillar = seoPillars.aiFormBuilder;

export const metadata: Metadata = createMetadata({
  title: pillar.title,
  description: pillar.description,
  path: `/${pillar.slug}`,
});

export default function AiFormBuilderPage() {
  return <SeoPillarPage pillar={pillar} />;
}
