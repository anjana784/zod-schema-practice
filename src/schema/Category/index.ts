import { z } from "zod";

export const CategorySchema = z
  .object({
    mainCategory: z.enum(["vehicles", "property", "electronics"]),
    subCategory: z.enum([
      "car",
      "motorcycle",
      "truck",
      "house",
      "apartment",
      "phone",
      "laptop",
      "tablet",
    ]),
  })
  .superRefine((data, ctx) => {
    // If mainCategory is vehicles, subCategory should be car, motorcycle or truck
    if (data.mainCategory === "vehicles") {
      if (["car", "motorcycle", "truck"].includes(data.subCategory)) {
        return true;
      } else {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Invalid subCategory for vehicles",
          path: ["subCategory"],
        });
        return false;
      }
    }

    // If mainCategory is property, subCategory should be house or apartment
    if (data.mainCategory === "property") {
      if (["house", "apartment"].includes(data.subCategory)) {
        return true;
      } else {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Invalid subCategory for property",
          path: ["subCategory"],
        });
        return false;
      }
    }

    // If mainCategory is electronics, subCategory should be phone, laptop or tablet
    if (data.mainCategory === "electronics") {
      if (["phone", "laptop", "tablet"].includes(data.subCategory)) {
        return true;
      } else {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Invalid subCategory for electronics",
          path: ["subCategory"],
        });
        return false;
      }
    }
  });

export type CategoryType = z.infer<typeof CategorySchema>;
