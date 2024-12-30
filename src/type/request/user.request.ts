import * as yup from "yup";
import {addCustomerSchema, editCustomerSchema,} from "@/schema/auth-user.schema.ts";

export type AddCustomerRequest =  yup.InferType<typeof addCustomerSchema>
export type EditCustomerRequest = yup.InferType<typeof editCustomerSchema>