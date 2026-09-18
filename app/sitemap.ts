import type { MetadataRoute } from "next";

import { BRAND } from "@/lib/brand";
import { INSIGHTS } from "@/lib/insights";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = BRAND.domain;
  const now = new Date();

  const routes = [
    { path: "/", priority: 1 },
    { path: "/ams", priority: 0.9 },
    { path: "/nexyra", priority: 0.9 },
    { path: "/nexyra/os", priority: 0.9 },
    { path: "/nexyra/service-desk", priority: 0.9 },
    { path: "/services", priority: 0.8 },
    { path: "/about", priority: 0.7 },
    { path: "/case-studies", priority: 0.7 },
    { path: "/insights", priority: 0.7 },
    { path: "/staffing", priority: 0.6 },
    { path: "/training", priority: 0.6 },
    { path: "/ai-consultation", priority: 0.6 },
    { path: "/platform", priority: 0.5 },
    { path: "/contact", priority: 0.8 },
  ];

  return [
    ...routes.map((route) => ({
      url: `${base}${route.path}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: route.priority,
    })),
    ...INSIGHTS.map((insight) => ({
      url: `${base}/insights/${insight.slug}`,
      lastModified: now,
      changeFrequency: "yearly" as const,
      priority: 0.5,
    })),
  ];
}
