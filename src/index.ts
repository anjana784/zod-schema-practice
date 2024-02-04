import { z } from "zod";
import { CategorySchema, CategoryType } from "./schema/Category";
import { AdSchema } from "./schema/Ad";

const propertySubCategories = ["house", "apartment"] as const;
const vehiclesSubCategories = ["car", "motorcycle", "truck"] as const;

type propertySubCategoriesType = (typeof propertySubCategories)[number];
type vehiclesSubCategoriesType = (typeof vehiclesSubCategories)[number];

type AdType = { title: string } & (
  | { mainCategory: "vehicles"; subCategory: vehiclesSubCategoriesType }
  | { mainCategory: "property"; subCategory: propertySubCategoriesType }
);

const data: AdType = {
  title: "House for sale",
  mainCategory: "vehicles",
  subCategory: "truck",
};

const result = AdSchema.safeParse(data);

if (result.success) {
  console.log("Data is valid", result.data);
} else {
  console.log("Data is invalid", result.error.issues[0]);
}
