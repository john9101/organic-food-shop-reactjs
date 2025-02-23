import {
    AddedCommentResponse,
    GotCommentsOfProductResponse,
    RepliedCommentResponse,
} from "@/type/response/comment.response.ts";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {AddCommentRequest, ReplyCommentRequest} from "@/type/request/comment.request.ts";
import {commentApi} from "@/api/comment.api.ts";
interface IState {
    isLoading: boolean
    comment: {
        ofProduct: GotCommentsOfProductResponse | null
        added: AddedCommentResponse | null,
        replied: RepliedCommentResponse | null
    }
}

const initialState: IState = {
    isLoading: true,
    comment: {
        ofProduct: null,
        added: null,
        replied: null,
    }
}

export const getCommentsOfProduct = createAsyncThunk<GotCommentsOfProductResponse, number>(
    'comment/getCommentsOfProduct', async (id,thunkAPI) => {
        const response = await commentApi.getCommentsOfProduct(id, thunkAPI);
        return thunkAPI.fulfillWithValue(response.data.data);
    }
);

export const addComment = createAsyncThunk<AddedCommentResponse, {body: AddCommentRequest, productId: number}>(
    'comment/addComment', async ({body,productId},thunkAPI) => {
        const response = await commentApi.addComment(body, productId, thunkAPI);
        return thunkAPI.fulfillWithValue(response.data.data);
    }
);

export const replyComment = createAsyncThunk<RepliedCommentResponse, {repliedId: number, body: ReplyCommentRequest}>(
    'comment/replyComment', async ({repliedId, body},thunkAPI) => {
        const response = await commentApi.replyComment(repliedId, body, thunkAPI);
        return thunkAPI.fulfillWithValue(response.data.data);
    }
);

const commentSlice = createSlice({
    name: 'comment',
    initialState,
    reducers: {
        resetCommentsOfProduct: (state) => {
            state.isLoading = false;
            state.comment.ofProduct = null;
        },
        resetAddedComment: (state) => {
            state.isLoading = false;
            state.comment.added = null;
        },
        resetRepliedComment: (state) => {
            state.isLoading = false;
            state.comment.replied = null;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getCommentsOfProduct.pending, (state, action) => {
            if (action.payload){
                state.isLoading = true
            }
        })
        builder.addCase(getCommentsOfProduct.fulfilled, (state, action) => {
            if(action.payload){
                state.isLoading = false
                state.comment.ofProduct = action.payload
            }
        })
        builder.addCase(getCommentsOfProduct.rejected, (state, action) => {
            if (action.payload){
                state.isLoading = false
            }
        })

        builder.addCase(addComment.pending, (state, action) => {
            if (action.payload){
                state.isLoading = true
            }
        })
        builder.addCase(addComment.fulfilled, (state, action) => {
            if(action.payload){
                state.isLoading = false
                state.comment.added = action.payload
                state.comment.ofProduct!.items.push(state.comment.added);
            }
        })
        builder.addCase(addComment.rejected, (state, action) => {
            if (action.payload){
                state.isLoading = false
            }
        })

        builder.addCase(replyComment.pending, (state, action) => {
            if (action.payload){
                state.isLoading = true
            }
        })
        builder.addCase(replyComment.fulfilled, (state, action) => {
            if(action.payload){
                state.isLoading = false
                state.comment.replied = action.payload
                const repliedComment = state.comment.ofProduct!.items.find(item => item.id === action.payload.replied_id)
                if(repliedComment){
                    repliedComment.child_items!.push(state.comment.replied)
                }
            }
        })
        builder.addCase(replyComment.rejected, (state, action) => {
            if (action.payload){
                state.isLoading = false
            }
        })
    }
})

export const {resetCommentsOfProduct, resetAddedComment, resetRepliedComment} = commentSlice.actions;

export default commentSlice.reducer;