import { z } from "zod";

export const CategorySchema = z
  .object({
    mainCategory: z.enum(["vehicles", "property"]),
    subCategory: z.enum(["car", "motorcycle", "truck", "house", "apartment"]),
  })
  .strict();

export type CategoryType = z.infer<typeof CategorySchema>;
