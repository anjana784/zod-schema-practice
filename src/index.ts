import { z } from "zod";
import { CategorySchema, CategoryType } from "./schema/Category";

const data: CategoryType = {
  mainCategory: "property",
  subCategory: "house",
};

const result = CategorySchema.safeParse(data);

if (result.success) {
  console.log("Data is valid", result.data);
} else {
  console.log("Data is invalid", result.error.issues[0]);
}
