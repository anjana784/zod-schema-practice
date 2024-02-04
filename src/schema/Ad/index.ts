import { z } from "zod";
import { CategorySchema } from "../Category";

const CommonAdSchema = z
  .object({
    title: z.string({
      required_error: "Title is required",
      invalid_type_error: "Title should be a string",
    }),
  })
  .strict();

export const propertySubCategories = ["house", "apartment"];
export const vehiclesSubCategories = ["car", "motorcycle", "truck"];

export const AdSchema = CategorySchema.merge(CommonAdSchema).superRefine(
  (data, ctx) => {
    // If mainCategory is vehicles, subCategory should be vehicle sub categories
    if (data.mainCategory === "vehicles") {
      if (vehiclesSubCategories.includes(data.subCategory)) {
        return true;
      } else {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Invalid subCategory for vehicles",
          path: ["subCategory"],
          fatal: true,
        });
        return z.never();
      }
    }

    // If mainCategory is property, subCategory should be property sub categories
    if (data.mainCategory === "property") {
      if (propertySubCategories.includes(data.subCategory)) {
        return true;
      } else {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Invalid subCategory for property",
          path: ["subCategory"],
          fatal: true,
        });
        return z.never();
      }
    }
  }
);

export type AdType = z.infer<typeof AdSchema>;
