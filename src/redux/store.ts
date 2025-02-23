import {Action, configureStore, ThunkAction} from "@reduxjs/toolkit";
import accountReducer from '@/redux/slice/account.slice.ts';
import productReducer from '@/redux/slice/product.slice.ts';
import cartReducer from '@/redux/slice/cart.slice.ts';
import orderReducer from '@/redux/slice/order.slice.ts';
import userReducer from '@/redux/slice/user.slice.ts';
import categoryReducer from '@/redux/slice/category.slice.ts';
import brandReducer from '@/redux/slice/brand.slice.ts';
import voucherReducer from '@/redux/slice/voucher.slice.ts';
import commentReducer from '@/redux/slice/comment.slice.ts';
import authenticationReduce from '@/redux/slice/authentication.slice.ts';

export const store = configureStore({
    reducer: {
        'authentication': authenticationReduce,
        'account': accountReducer,
        'product': productReducer,
        'cart': cartReducer,
        'order': orderReducer,
        'user': userReducer,
        'category': categoryReducer,
        'brand': brandReducer,
        'voucher': voucherReducer,
        'comment': commentReducer,
    }
})

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>;