import * as yup from "yup";
import {sendCommentSchema} from "@/schema/send.schema.ts";

export type SendCommentRequest = yup.InferType<typeof sendCommentSchema>;