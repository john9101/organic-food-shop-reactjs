import * as yup from "yup";
import {
    addAccountAddressSchema,
    changePasswordAccountSchema, editAccountAddressSchema,
    editAccountInfoSchema
} from "@/schema/auth-account-user.schema.ts";

export type EditAccountInfoRequest = yup.InferType<typeof editAccountInfoSchema>;
export type ChangePasswordAccountRequest = yup.InferType<typeof changePasswordAccountSchema>;
export type AddAccountAddressRequest = yup.InferType<typeof addAccountAddressSchema>;
export type EditAccountAddressRequest = yup.InferType<typeof editAccountAddressSchema>;