import instance from "@/util/http.ts";
import {SuccessApiResponse} from "@/type/response/api.type.ts";
import {AddCommentRequest, ReplyCommentRequest} from "@/type/request/comment.request.ts";
import {
    AddedCommentResponse,
    GotCommentsOfProductResponse,
    RepliedCommentResponse
} from "@/type/response/comment.response.ts";

export const commentApi = {
    addComment: (body: AddCommentRequest, productId: number, thunkAPI: {signal :AbortSignal}) => {
        return instance.post<SuccessApiResponse<AddedCommentResponse>>(`/comments/products/${productId}`, body, {
            signal: thunkAPI.signal
        });
    },
    getCommentsOfProduct: (productId: number, thunkAPI: {signal :AbortSignal}) => {
        return instance.get<SuccessApiResponse<GotCommentsOfProductResponse>>(`/comments/products/${productId}`, {
            signal: thunkAPI.signal
        })
    },
    replyComment: (repliedId: number, body: ReplyCommentRequest, thunkAPI: {signal :AbortSignal}) => {
        return instance.patch<SuccessApiResponse<RepliedCommentResponse>>(`/comments/${repliedId}`, body, {
            signal: thunkAPI.signal
        })
    }
}