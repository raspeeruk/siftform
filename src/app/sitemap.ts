import type { MetadataRoute } from "next";
import { pseoTemplates } from "@/lib/pseo/templates";
import { industries } from "@/lib/pseo/industries";
import { useCases } from "@/lib/pseo/use-cases";
import { competitors } from "@/lib/pseo/competitors";
import { integrations } from "@/lib/pseo/integrations";
import { embedPlatforms } from "@/lib/pseo/embed-platforms";

const BASE_URL = "https://siftforms.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: now, changeFrequency: "weekly", priority: 1.0 },
    { url: `${BASE_URL}/pricing`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE_URL}/templates`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE_URL}/use-cases`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE_URL}/integrations`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/docs/api`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE_URL}/docs/widget`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE_URL}/docs/embed`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
  ];

  const templatePages: MetadataRoute.Sitemap = pseoTemplates.map((t) => ({
    url: `${BASE_URL}/templates/${t.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const industryPages: MetadataRoute.Sitemap = industries.map((i) => ({
    url: `${BASE_URL}/for/${i.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const useCasePages: MetadataRoute.Sitemap = useCases.map((u) => ({
    url: `${BASE_URL}/use-cases/${u.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const comparePages: MetadataRoute.Sitemap = competitors.map((c) => ({
    url: `${BASE_URL}/compare/sift-vs-${c.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const alternativePages: MetadataRoute.Sitemap = competitors.map((c) => ({
    url: `${BASE_URL}/alternative/${c.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const integrationPages: MetadataRoute.Sitemap = integrations.map((i) => ({
    url: `${BASE_URL}/integrations/${i.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const embedPlatformPages: MetadataRoute.Sitemap = embedPlatforms.map((p) => ({
    url: `${BASE_URL}/docs/embed/${p.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [
    ...staticPages,
    ...templatePages,
    ...industryPages,
    ...useCasePages,
    ...comparePages,
    ...alternativePages,
    ...integrationPages,
    ...embedPlatformPages,
  ];
}
