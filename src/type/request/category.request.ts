import * as yup from "yup";
import {addCategorySchema, editCategorySchema} from "@/schema/category.schema.ts";

export type AddCategoryRequest = yup.InferType<typeof addCategorySchema>
export type EditCategoryRequest = yup.InferType<typeof editCategorySchema>