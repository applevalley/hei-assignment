import { z } from "zod";

export const ImageInfo = z.object({
  key: z.string(),
  url: z.string(),
  size: z.number().or(z.undefined()),
  lastModified: z.date().or(z.undefined()),
});

export type ImageType = z.infer<typeof ImageInfo>;
