import type { Metadata } from "next";
import { SeoPillarPage } from "@/components/pseo/seo-pillar-page";
import { createMetadata } from "@/lib/pseo/metadata";
import { seoPillars } from "@/lib/pseo/pillars";

const pillar = seoPillars.formDataExtractionApi;

export const metadata: Metadata = createMetadata({
  title: pillar.title,
  description: pillar.description,
  path: `/${pillar.slug}`,
});

export default function FormDataExtractionApiPage() {
  return <SeoPillarPage pillar={pillar} />;
}
