import * as yup from "yup";
import {loginSchema, registerSchema} from "@/schema/auth-account-user.schema.ts";

export type RegisterRequest = yup.InferType<typeof registerSchema>;
export type LoginRequest = yup.InferType<typeof loginSchema>;
