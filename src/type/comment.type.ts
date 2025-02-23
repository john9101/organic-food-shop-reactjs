export type CommentItemType = {
    id: number
    content: string
    created_at: Date
    commentator_name: string
    is_visible?: boolean
    is_deleted: boolean
    child_items?: CommentItemType[]
}