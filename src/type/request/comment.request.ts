import * as yup from "yup";
import {addCommentSchema, replyCommentSchema} from "@/schema/comment.schema.ts";

export type AddCommentRequest = yup.InferType<typeof addCommentSchema>;
export type ReplyCommentRequest = yup.InferType<typeof replyCommentSchema>;