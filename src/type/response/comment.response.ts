import {CommentItemType} from "@/type/comment.type.ts";

export type AddedCommentResponse = {
    id: number
    content: string
    created_at: Date
    commentator_name: string
    is_deleted: boolean
}

export type GotCommentsOfProductResponse = {
    items: CommentItemType[]
}

export type RepliedCommentResponse = {
    replied_id: number
    id: number
    commentator_name: string
    created_at: Date
    content: string
    is_deleted: boolean
}