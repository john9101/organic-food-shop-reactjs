import * as yup from "yup";
import {addBrandSchema, editBrandSchema} from "@/schema/brand.schema.ts";

export type AddBrandRequest = yup.InferType<typeof addBrandSchema>
export type EditBrandRequest = yup.InferType<typeof editBrandSchema>