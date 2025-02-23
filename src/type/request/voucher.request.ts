import * as yup from "yup";
import {addVoucherSchema, editVoucherSchema} from "@/schema/voucher.schema.ts";

export type EditVoucherRequest =  yup.InferType<typeof editVoucherSchema>
export type AddVoucherRequest =  yup.InferType<typeof addVoucherSchema>