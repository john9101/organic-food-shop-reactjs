import * as yup from "yup";
import {placeOrderSchema} from "@/schema/order.schema.ts";

export type PlaceOrderRequest = yup.InferType<typeof placeOrderSchema>;