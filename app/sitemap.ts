import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://examsafexa.example.com";
  return [
    { url: `${base}/`, lastModified: new Date(), priority: 1 },
    { url: `${base}/how-it-works`, lastModified: new Date(), priority: 0.7 },
    { url: `${base}/register`, lastModified: new Date(), priority: 0.8 },
    { url: `${base}/login`, lastModified: new Date(), priority: 0.5 },
  ];
}
