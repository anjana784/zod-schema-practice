import { z } from "zod";

const propertySubCategories = ["house", "apartment"];
const vehiclesSubCategories = ["car", "motorcycle", "truck"];

const propertySubCategoriesLiteral = ["house", "apartment"] as const;
const vehicleSubCategoriesLiteral = ["car", "motorcycle", "truck"] as const;

type VehicleSubCategoriesType = (typeof vehicleSubCategoriesLiteral)[number];

type PropertySubCategoriesType = (typeof propertySubCategoriesLiteral)[number];

export const AdSchema = z
  .object({
    //main category
    mainCategory: z.enum(["vehicle", "property"]),

    // sub category
    subCategory: z.enum(["car", "motorcycle", "truck", "house", "apartment"]),

    //ad title
    title: z.string({
      required_error: "Title is required",
      invalid_type_error: "Title should be a string",
    }),

    //ad description
    description: z.string({
      required_error: "Description is required",
      invalid_type_error: "Description should be a string",
    }),

    //location
    location: z.object({
      district: z.string({
        required_error: "District is required",
        invalid_type_error: "District should be a string",
      }),
      city: z.string({
        required_error: "City is required",
        invalid_type_error: "City should be a string",
      }),
      address: z.string({
        required_error: "Address is required",
        invalid_type_error: "Address should be a string",
      }),
    }),

    //images
    images: z.array(z.string()).optional(),

    //contact
    contact: z.object({
      name: z.string({
        required_error: "Name is required",
        invalid_type_error: "Name should be a string",
      }),
      email: z
        .string({
          invalid_type_error: "Email should be a string",
        })
        .optional(),
      phone: z.string({
        required_error: "Phone is required",
        invalid_type_error: "Phone should be a string",
      }),
    }),

    //negotiable
    negotiable: z.boolean({
      required_error: "Negotiable is required",
      invalid_type_error: "Negotiable should be a boolean",
    }),

    //payment period
    paymentPeriod: z.enum([
      "perYear",
      "perMonth",
      "perWeek",
      "perDay",
      "perHour",
    ]),
  })
  .strict()
  .superRefine((data, ctx: z.RefinementCtx): void => {
    /**
     * validate sub categories against to each main category
     */
    // If mainCategory is vehicles, subCategory should be vehicle sub categories
    if (data.mainCategory === "vehicle") {
      if (vehiclesSubCategories.includes(data.subCategory)) {
        return;
      } else {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Invalid subCategory for vehicles",
          path: ["subCategory"],
          fatal: true,
        });
        return;
      }
    }

    // If mainCategory is property, subCategory should be property sub categories
    if (data.mainCategory === "property") {
      if (propertySubCategories.includes(data.subCategory)) {
        return;
      } else {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Invalid subCategory for property",
          path: ["subCategory"],
          fatal: true,
        });
        return;
      }
    }
    /**---------------------------------------------------------------------------------------------**/
  });

// get infered type from the ad schema
type InferedByAdSchema = z.infer<typeof AdSchema>;

//omit main category and sub category
type WithoutCategories = Omit<
  InferedByAdSchema,
  "mainCategory" | "subCategory"
>;

export type AdType = WithoutCategories &
  (
    | { mainCategory: "vehicle"; subCategory: VehicleSubCategoriesType }
    | { mainCategory: "property"; subCategory: PropertySubCategoriesType }
  );

export type VehicleType = Extract<AdType, { mainCategory: "vehicle" }>;
export type PropertyType = Extract<AdType, { mainCategory: "property" }>;
