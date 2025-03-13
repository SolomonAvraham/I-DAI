import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://www.i-dai.com",
      lastModified: new Date(),
    },
  ];
}
