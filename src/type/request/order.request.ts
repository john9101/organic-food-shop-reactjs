import * as yup from "yup";
import {addOrderSchema, editOrderSchema, placeOrderSchema} from "@/schema/order.schema.ts";

export type PlaceOrderRequest = yup.InferType<typeof placeOrderSchema>;
export type AddOrderRequest = yup.InferType<typeof addOrderSchema>;
export type EditOrderRequest = yup.InferType<typeof editOrderSchema>;