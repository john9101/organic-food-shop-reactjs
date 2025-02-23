import * as yup from "yup";

export const commentSchema = yup.object().shape({
    content: yup.string().required("Nội dung bình luận không được bỏ trống")
})

export const addCommentSchema = commentSchema
export const replyCommentSchema = commentSchema