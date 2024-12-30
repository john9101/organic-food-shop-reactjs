import * as yup from "yup";

export const sendCommentSchema = yup.object().shape({
    message: yup.string().required()
})