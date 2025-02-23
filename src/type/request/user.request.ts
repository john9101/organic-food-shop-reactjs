import * as yup from "yup";
import {
    addCustomerSchema,
    addEmployeeSchema,
    editCustomerSchema,
    editEmployeeSchema,
} from "@/schema/auth-account-user.schema.ts";

export type AddCustomerRequest =  yup.InferType<typeof addCustomerSchema>
export type EditCustomerRequest = yup.InferType<typeof editCustomerSchema>
export type AddEmployeeRequest = yup.InferType<typeof addEmployeeSchema>
export type EditEmployeeRequest = yup.InferType<typeof editEmployeeSchema>