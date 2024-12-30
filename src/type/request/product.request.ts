import * as yup from "yup";
import {addProductSchema, editProductSchema} from "@/schema/product.schema.ts";

export type AddProductRequest =  yup.InferType<typeof addProductSchema>
export type EditProductRequest =  yup.InferType<typeof editProductSchema>